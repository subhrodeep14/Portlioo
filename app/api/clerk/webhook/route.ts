import { db } from "@/server/db";


export const POST =async(req:Request)=>{
    const {data}=await req.json();
    console.log("clerk webhook",data);
    const email =data.email_Addresses[0].email_Address;
    const name =data.first_Name;
    const image =data.image_url;
    const id = data.id;

    await db.user.create({
        data:{
            email,
            name,
            image,
            id
        }
    });
    return new Response("webhook received",{status:200});

}