import { currentProfile } from "@/lib/curent-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

export const NavigationSideBar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 w-full h-full flex flex-col py-3 items-center text-primary dark:bg-[#1E1F22]">
      <NavigationAction />
      <Separator className="h-[2px] w-10 mx-auto bg-zinc-300 rounded-md dark:bg-zinc-700" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4"><NavigationItem
            id={server.id}
            imageUrl={server.imageUrl}
            name={server.name}
          /></div>
        ))}
      </ScrollArea>
      <div className="flex flex-col items-center gap-y-4 mt-auto pb-3">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" appearance={{elements: {avatarBox: "size-[48px]"}}}/>
      </div>
    </div>
  );
};
