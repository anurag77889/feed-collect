"use client";
import { useSession } from "next-auth/react";

import React from "react";
import LogoutButton from "../_components/LogoutButton";

function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="p-5 min-h-screen flex justify-center items-center flex-col">
      <div className="p-10 border-2 rounded-lg ">
        <h1 className="text-4xl font-bold mb-4 border-b-white border-b-4 w-fit">
          Welcome to Feedcollect
        </h1>
        <h1 className="text-2xl font-xl">
          Name : {session?.user?.name || "User"}
        </h1>
        <h1 className="text-2xl font-xl">
          Email : {session?.user?.email || "Not found"}
        </h1>
        <LogoutButton />
      </div>
    </div>
  );
}

export default DashboardPage;
