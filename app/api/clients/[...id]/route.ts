import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const client = await prisma.client.findUnique({
    where: { id: params.id },
    include: { invoices: true, conversations: true },
  });

  return client ? NextResponse.json(client) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
