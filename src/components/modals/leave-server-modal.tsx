"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "../ui/dialog";
import { useModal } from "../../../hooks/use-modal-store";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

export const LeaveServerModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const { server } = data;

  const isModalOpen = isOpen && type === "leaveServer";

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try{
      setIsLoading(true);
      await axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
      router.push("/");
    }catch(error){
        console.log(error);
    }finally{
        setIsLoading(false);
    }
  }

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Leave Server
              <DialogDescription className="text-center text-zinc-500">
                Are you sure, you want to leave <span className="font-semibold text-indigo-500">{server?.name}</span> ?
              </DialogDescription>
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <div className="flex items-center justify-between w-full">
                <Button disabled={isLoading} variant={"ghost"} onClick={onClose}>Cancel</Button>
                <Button disabled={isLoading} onClick={onClick} variant={"primary"}>Confirm</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
