import { prisma } from "@/server/db";


export const POST =async(req:Request)=>{
    const {data}=await req.json();
    console.log("clerk webhook",data);
    const email =data.email_addresses[0].email_address;
    const name =data.first_name;
    const image =data.image_url;
    const id = data.id;

    await prisma.user.create({
        data:{
            email,
            name,
            image,
            id
        }
    });
    return new Response("webhook received",{status:200});

}