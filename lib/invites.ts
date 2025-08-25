import crypto from "crypto";

export function generateInviteToken() {
  return crypto.randomBytes(24).toString("hex");
}

export function inviteExpiry(hours = 72) {
  const d = new Date();
  d.setHours(d.getHours() + hours);
  return d;
}

export function inviteAcceptUrl(token: string) {
  const base = process.env.APP_URL || "http://localhost:3000";
  return `${base}/invite?token=${encodeURIComponent(token)}`;
}
