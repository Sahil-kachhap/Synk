import { currentProfile } from "@/lib/curent-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { profile } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const { name, type } = await req.json();
    const profile = await currentProfile();

    if (!serverId) {
      return new NextResponse("Server Id is missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Channel cannot be named 'general'", {
        status: 400,
      });
    }

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile?.id,
            role: {
              in: [MemberRole.MODERATOR, MemberRole.ADMIN],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile?.id,
            name,
            channel: type,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
