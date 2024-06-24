import { currentProfile } from "@/lib/curent-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}: {params: {serverId: string}}
){
    try{
       const profile = await currentProfile();
       
       if(!profile){
        return new NextResponse("Unauthorized", {status: 401});
       }

       if(!params.serverId){
        return new NextResponse("server Id is missing", {status: 400});
       }

       const server = await db.server.update({
        where: {
            id: params.serverId,
            // person leaving the server should not be the admin
            profileId: {
                not: profile.id
            },
            // member trying to leave the server, should actually be present in this server
            members: {
                some: {
                    profileId: profile.id
                }
            }
        },
        data: {
           members: {
              deleteMany: {
                profileId: profile.id
              }
           } 
        }
       });

       return NextResponse.json(server);
    }catch(error){
        console.log(error);
        return new NextResponse("Internal Error", {status: 500});
    }
}