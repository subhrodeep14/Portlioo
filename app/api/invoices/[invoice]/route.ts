// app/api/invoices/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: { items: true, payments: true },
    });

    if (!invoice)
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

    return NextResponse.json(invoice);
  } catch (error) {
    const errorMessage = typeof error === "object" && error !== null && "message" in error
      ? (error as { message: string }).message
      : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
const UpdateInvoiceSchema = z.object({
  status: z.enum(["DRAFT", "PENDING", "APPROVED", "PAID"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { status } = UpdateInvoiceSchema.parse(body);

    const invoice = await prisma.invoice.update({
      where: { id: params.id },
      data: { status: status as import("@prisma/client").InvoiceStatus },
    });

    return NextResponse.json(invoice);
  } catch (error) {
    const errorMessage = typeof error === "object" && error !== null && "message" in error
      ? (error as { message: string }).message
      : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}