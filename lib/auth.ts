import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function requireUser() {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return {
      userId: null,
      errorResponse: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { userId: session.user.id, errorResponse: null };
}
