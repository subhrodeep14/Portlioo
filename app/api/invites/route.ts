import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ok, err } from "@/lib/response";
import { getUserMembership, canInvite, isValidInviteRole } from "@/lib/rbac";
import { generateInviteToken, inviteExpiry, inviteAcceptUrl } from "@/lib/invites";
import { sendInviteEmail } from "@/lib/mailer";
import { z } from "zod";
import { Role } from "@prisma/client";

const CreateInvite = z.object({
  workspaceId: z.string().min(1),
  role: z.nativeEnum(Role),
  email: z.string().email().optional(), // optional; link can be shared manually
  expiresInHours: z.number().int().min(1).max(336).optional(), // default 72h
});

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const json = await req.json();
    const parsed = CreateInvite.safeParse(json);
    if (!parsed.success) return err("Invalid input", 400);

    if (!isValidInviteRole(parsed.data.role)) {
      return err("Invite role must be CLIENT or MANAGER", 400);
    }

    const member = await getUserMembership(parsed.data.workspaceId, (user as any).id);
    if (!member) return err("Forbidden (not a member)", 403);
    if (!canInvite(member.role)) return err("Forbidden (insufficient role)", 403);

    const token = generateInviteToken();
    const expiresAt = inviteExpiry(parsed.data.expiresInHours ?? 72);

    const invite = await prisma.invite.create({
      data: {
        workspaceId: parsed.data.workspaceId,
        role: parsed.data.role,
        email: parsed.data.email,
        token,
        expiresAt,
      },
      include: { workspace: true },
    });

    // If email provided, send email now
    if (invite.email) {
      const link = inviteAcceptUrl(invite.token);
      await sendInviteEmail(invite.email, link, invite.workspace.name);
    }

    return ok({
      id: invite.id,
      workspaceId: invite.workspaceId,
      role: invite.role,
      email: invite.email,
      token: invite.token,        // return so you can show/copy the link if no email
      acceptUrl: inviteAcceptUrl(invite.token),
      expiresAt: invite.expiresAt,
    }, { status: 201 });
  } catch (e: any) {
    const status = e?.status ?? 500;
    return err(e?.message ?? "Internal error", status);
  }
}
