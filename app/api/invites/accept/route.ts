import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ok, err } from "@/lib/response";
import { z } from "zod";

const AcceptInvite = z.object({
  token: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const json = await req.json();
    const parsed = AcceptInvite.safeParse(json);
    if (!parsed.success) return err("Invalid input", 400);

    const invite = await prisma.invite.findUnique({
      where: { token: parsed.data.token },
      include: { workspace: true },
    });

    if (!invite) return err("Invalid token", 400);
    if (invite.consumedAt) return err("Invite already used", 400);
    if (invite.expiresAt < new Date()) return err("Invite expired", 400);

    // If invite is bound to an email, enforce it
    // (user.email comes from NextAuth; ensure adapter stores it)
    const currentEmail = (user as any).email;
    if (invite.email && (!currentEmail || invite.email.toLowerCase() !== currentEmail.toLowerCase())) {
      return err("This invite is not for your email", 403);
    }

    // If already a member, just mark consumed and return
    const existing = await prisma.membership.findFirst({
      where: { workspaceId: invite.workspaceId, userId: (user as any).id },
    });

    if (!existing) {
      await prisma.membership.create({
        data: {
          workspaceId: invite.workspaceId,
          userId: (user as any).id,
          role: invite.role,
        },
      });
    }

    await prisma.invite.update({
      where: { id: invite.id },
      data: { consumedAt: new Date() },
    });

    return ok({
      workspaceId: invite.workspaceId,
      workspaceName: invite.workspace.name,
      roleGranted: existing ? existing.role : invite.role,
      status: "accepted",
    });
  } catch (e: any) {
    const status = e?.status ?? 500;
    return err(e?.message ?? "Internal error", status);
  }
}
