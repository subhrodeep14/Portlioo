import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';

export async function GET() {
  const { userId, errorResponse } = await requireUser();
  if (!userId) return errorResponse!;

  const clients = await prisma.client.findMany({
    where: { userId },
    include: { invoices: true, conversations: true },
  });

  return NextResponse.json(clients);
}

export async function POST(req: Request) {
  const { userId, errorResponse } = await requireUser();
  if (!userId) return errorResponse!;

  const { name, email } = await req.json();
  if (!name || !email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const client = await prisma.client.create({
    data: { name, email, userId },
  });

  return NextResponse.json(client, { status: 201 });
}
