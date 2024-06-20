import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";
import React from "react";

const MainLayout = async ({children}:{children: React.ReactNode}) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] flex-col z-30 fixed inset-y-0">
        <NavigationSideBar />
      </div>
      <main className="h-full md:pl-[72px]">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
