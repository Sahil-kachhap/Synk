import { InitialModal } from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initialProfile";
import { Profile } from "@prisma/client";
import { redirect } from "next/navigation";

const setupPage = async () => {
  const profile: Profile = await initialProfile();

  const server = await db.server.findFirst({
      where:{
          members: {
              some: {
                  profileId: profile.id
              }
          }
      }
  });

  if(server){
      return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
};

export default setupPage;
