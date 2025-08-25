import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInviteEmail(to: string, link: string, workspaceName: string) {
  await resend.emails.send({
    from: "noreply@yourapp.example", // set a verified sender domain
    to,
    subject: `You're invited to ${workspaceName}`,
    html: `
      <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
        <h2>You've been invited to join <em>${workspaceName}</em></h2>
        <p>Click the button below to accept the invitation:</p>
        <p><a href="${link}" style="background:#111;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;">Accept Invite</a></p>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p><code>${link}</code></p>
      </div>
    `,
  });
}
