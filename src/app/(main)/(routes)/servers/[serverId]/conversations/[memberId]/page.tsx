import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { getorCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/curent-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MemberIDPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
}

const MemberIDPage = async ({ params }: MemberIDPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getorCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />
      <ChatMessages
        name={otherMember.profile.name}
        chatId={conversation.id}
        member={currentMember}
        type="conversation"
        apiUrl="/api/direct-messages"
        paramKey="conversationId"
        paramValue={conversation.id}
        socketUrl="/api/socket/direct-messages"
        socketQuery={{
          conversationId: conversation.id,
        }}
      />
      <ChatInput
        name={otherMember.profile.name}
        apiUrl="/api/socket/direct-messages"
        type="conversation"
        query={{
          conversationId: conversation.id,
        }}
      />
    </div>
  );
};

export default MemberIDPage;
