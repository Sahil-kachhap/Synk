"use client";
import { cn } from "@/lib/utils";
import { ActionToolTip } from "../action-tooltip";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const router = useRouter();
  const params = useParams();
  
  const onClick = () => {
    router.push(`/servers/${id}`);
  }

  return (
    <ActionToolTip side="right" align="center" label={name}>
      <button className="group relative flex items-center" onClick={onClick}>
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div className={cn("relative group flex mx-3 size-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden", params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]")}>
            <Image src={imageUrl} alt="Channel" className="object-cover" fill/>
        </div>
      </button>
    </ActionToolTip>
  );
};
