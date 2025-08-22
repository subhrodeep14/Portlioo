
import { Webhook } from "svix";
import { prisma } from "@/server/db"
import { buffer } from "micro";


export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: any, res: any) {
    const payload = (await buffer(req)).toString();
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

    try {
        const evt = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });

        const { type, data } = evt as { type: string; data: any };

        if (type === "user.created" || type === "user.updated") {
            await prisma.user.upsert({
                where: { clerkId: data.id },
                update: {
                    email: data.email_addresses?.[0]?.email_address || "",
                    name: [data.first_name, data.last_name].filter(Boolean).join(" "),
                    imageUrl: data.image_url,
                },
                create: {
                    clerkId: data.id,
                    email: data.email_addresses?.[0]?.email_address || "",
                    name: [data.first_name, data.last_name].filter(Boolean).join(" "),
                    imageUrl: data.image_url,
                },
            });
        } else if (type === "user.deleted") {
            await prisma.user.delete({
                where: { clerkId: data.id },
            });
        }

        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Webhook Error:", err);
        res.status(400).json({ error: "Invalid signature" });
    }
}
