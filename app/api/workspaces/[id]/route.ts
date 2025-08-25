import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ok, err } from "@/lib/response";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuth();

    const workspace = await prisma.workspace.findFirst({
      where: {
        id: params.id,
        memberships: { some: { userId: (user as any).id } },
      },
      include: {
        memberships: {
          where: { userId: (user as any).id },
          select: { role: true },
        },
      },
    });

    if (!workspace) return err("Not found", 404);

    // include viewer's role in a friendly field
    const viewerRole = workspace.memberships[0]?.role ?? null;
    const { memberships, ...rest } = workspace as any;
    return ok({ ...rest, viewerRole });
  } catch (e: any) {
    const status = e?.status ?? 500;
    return err(e?.message ?? "Internal error", status);
  }
}
