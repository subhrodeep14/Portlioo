// app/api/invoices/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";

const InvoiceSchema = z.object({
  workspaceId: z.string(),
  clientId: z.string(),
  projectId: z.string().optional(),
  issueDate: z.string().optional(),
  dueDate: z.string().optional(),
  currency: z.string().min(3).max(3).default("USD"),
  items: z.array(
    z.object({
      description: z.string(),
      qty: z.number().min(1),
      unitCents: z.number().min(0),
    })
  ),
});

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const data = InvoiceSchema.parse(body);

    const subtotal = data.items.reduce((s, i) => s + i.qty * i.unitCents, 0);
    const tax = Math.round(subtotal * 0.1); // Example: 10% tax
    const total = subtotal + tax;

    const invoice = await prisma.invoice.create({
      data: {
        workspaceId: data.workspaceId,
        clientId: data.clientId,
        projectId: data.projectId,
        issueDate: data.issueDate ? new Date(data.issueDate) : undefined,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        currency: data.currency,
        subtotalCents: subtotal,
        taxCents: tax,
        totalCents: total,
        items: {
          create: data.items.map((item) => ({
            description: item.description,
            qty: item.qty,
            unitCents: item.unitCents,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    const errorMessage = typeof error === "object" && error !== null && "message" in error
      ? (error as { message: string }).message
      : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
