import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function getUserMembership(workspaceId: string, userId: string) {
  return prisma.membership.findFirst({
    where: { workspaceId, userId },
  });
}

export function canInvite(role: Role) {
  // Owners & Managers can invite; Clients cannot
  return role === "OWNER" || role === "MANAGER";
}

export function isValidInviteRole(role: Role) {
  // You can invite CLIENT or MANAGER (never OWNER)
  return role === "CLIENT" || role === "MANAGER";
}
