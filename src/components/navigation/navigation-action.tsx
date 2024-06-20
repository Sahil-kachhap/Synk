"use client";

import { Plus } from "lucide-react";
import { ActionToolTip } from "../action-tooltip";
import { useModal } from "../../../hooks/use-modal-store";

export const NavigationAction = () => {
  const {onOpen} = useModal();
  return (
    <div>
      <ActionToolTip label="Add a server" side="right" align="center">  
      <button className="group flex items-center" onClick={() => onOpen("createServer")}>
        <div className="flex h-[48px] w-[48px] mx-3 rounded-[24px] group-hover:rounded-[16px] bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 items-center justify-center overflow-hidden transition-all">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
        </div>
      </button>
      </ActionToolTip>
    </div>
  );
};
