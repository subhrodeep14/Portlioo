import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';

interface Params {
  params: { invoiceId: string };
}

// GET – Get invoice by ID
export async function GET(req: Request, { params }: Params) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id: params.invoiceId },
    include: { client: true },
  });

  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  return NextResponse.json(invoice);
}

// PATCH – Update invoice status (or other fields)
export async function PATCH(req: Request, { params }: Params) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { status, title, amount, dueDate } = body;

    const updatedInvoice = await prisma.invoice.update({
      where: { id: params.invoiceId },
      data: {
        status,
        title,
        amount,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    });

    return NextResponse.json(updatedInvoice);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE – Remove invoice
export async function DELETE(req: Request, { params }: Params) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.invoice.delete({
      where: { id: params.invoiceId },
    });

    return NextResponse.json({ message: "Invoice deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
