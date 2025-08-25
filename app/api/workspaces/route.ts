import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ok, err } from "@/lib/response";
import { z } from "zod";

const CreateWorkspace = z.object({
  name: z.string().min(2).max(80),
});

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const json = await req.json();
    const parsed = CreateWorkspace.safeParse(json);
    if (!parsed.success) return err("Invalid input", 400);

    const workspace = await prisma.workspace.create({
      data: {
        name: parsed.data.name,
        ownerId: (user as any).id,
        memberships: {
          create: { userId: (user as any).id, role: "OWNER" },
        },
      },
      include: { memberships: true },
    });

    return ok(workspace, { status: 201 });
  } catch (e: any) {
    const status = e?.status ?? 500;
    return err(e?.message ?? "Internal error", status);
  }
}
