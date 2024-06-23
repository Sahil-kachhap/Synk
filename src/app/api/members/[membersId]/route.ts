import { currentProfile } from "@/lib/curent-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { membersId: string } }
) {
  try {
    const { role } = await req.json();
    const { searchParams } = new URL(req.url);
    const profile = await currentProfile();

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server Id is missing", { status: 400 });
    }

    if (!params.membersId) {
      return new NextResponse("Member Id is missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.membersId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
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

export async function DELETE(
  req: Request,
  { params }: { params: { membersId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server Id is missing", { status: 400 });
    }

    if (!params.membersId) {
      return new NextResponse("Member Id is missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile?.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.membersId,
            profileId: {
              not: profile?.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
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
