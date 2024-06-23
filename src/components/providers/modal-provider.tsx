"use client"
import { useEffect, useState } from "react";
import { CreateServerModal } from "../modals/create-server-modal";
import { InviteModal } from "../modals/invite-modal";
import { EditServerModal } from "../modals/edit-modal";
import { MemberModal } from "../modals/member-modal";

export const ModalProvider = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  if(!isMounted){
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MemberModal />
    </>
  );
};
