import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';

// GET – List all invoices for the logged-in user
export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const invoices = await prisma.invoice.findMany({
    where: { userId: session.user.id },
    include: { client: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(invoices);
}

// POST – Create a new invoice
export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, amount, dueDate, clientId } = body;

    if (!title || !amount || !dueDate || !clientId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const invoice = await prisma.invoice.create({
      data: {
        title,
        amount,
        dueDate: new Date(dueDate),
        clientId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
