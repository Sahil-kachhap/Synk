import { currentProfile } from "@/lib/curent-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";

export const ServerSidebar = async ({ serverId }: { serverId: string }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
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

  const textChannels = server?.channels.filter(
    (channel) => channel.channel === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.channel === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.channel === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!server) {
    return redirect("/");
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="size-full flex flex-col text-primary bg-[#F2F3F5] dark:bg-[#2b2d31]">
        <ServerHeader server={server} role={role}/>
    </div>
  );
};
