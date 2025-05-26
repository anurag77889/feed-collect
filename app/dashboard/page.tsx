"use client";
import { useSession } from "next-auth/react";

import React from "react";
import LogoutButton from "../_components/LogoutButton";
import useSWR from "swr";
import AddFeedbackButton from "../_components/AddFeedbackButton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function DashboardPage() {
  const { data, error, isLoading } = useSWR("/api/profile", fetcher);
  const { status } = useSession();
  if (status === "loading") return <p>Loading session..</p>;
  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p className="text-red-600">Failed to load user data</p>;

  return (
    <div className="p-5 min-h-screen flex justify-center items-center flex-col">
      <div className="p-10 border-2 rounded-lg ">
        <h1 className="text-4xl font-bold mb-4 border-b-white border-b-4 w-fit">
          Welcome to Feedcollect
        </h1>
        <h1 className="text-2xl font-xl">Name : {data.name || "User"}</h1>
        <h1 className="text-2xl font-xl">
          Email : {data.email || "Not found"}
        </h1>
        <div className="flex flex-row justify-between">
          <AddFeedbackButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
