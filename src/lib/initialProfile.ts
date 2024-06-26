import { currentUser, redirectToSignIn } from "@clerk/nextjs"
import { db } from "./db";

export const initialProfile = async () => {
    const user = await currentUser();

    if(!user){
        return redirectToSignIn();
    }

    const profile = await db.profile.findUnique({
        where: {userId: user.id}
    });

    if(profile){
        return profile;
    }

    const newUserProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl
        }
    });

   return newUserProfile; 
}