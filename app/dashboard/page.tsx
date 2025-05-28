"use client";
import { useSession } from "next-auth/react";

import React from "react";
import LogoutButton from "../_components/LogoutButton";
import useSWR from "swr";
import AddFeedbackButton from "../_components/AddFeedbackButton";
import FeedbackList from "../_components/FeedbackList";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function DashboardPage() {
  const { data, error, isLoading } = useSWR("/api/profile", fetcher);
  const { status } = useSession();
  if (status === "loading")
    return (
      <p className="flex items-center justify-center text-center text-3xl  font-mono text-black">
        Loading session..
      </p>
    );
  if (isLoading)
    return (
      <p className="flex items-center justify-center text-center text-3xl  font-mono text-black">
        Loading user data...
      </p>
    );
  if (error)
    return (
      <p className="flex items-center justify-center text-center text-3xl  font-mono text-red-600">
        Failed to load user data
      </p>
    );

  return (
    <div className="p-5 bg-amber-300 min-h-screen flex justify-center items-center flex-col sm:flex-col">
      <div className="p-6 sm:p-4 border-2 rounded-lg w-full max-w-2xl sm:w-[95%] sm:border-black sm:flex-col">
        <h1 className="text-3xl sm:text-5xl font-bold font-mono mb-4 border-b-4 border-black w-fit text-black">
          Welcome to Feedcollect
        </h1>
        <div className="flex flex-col gap-2">
          <h1 className="text-black font-mono text-xl sm:text-2xl break-words">
            Name : {data.name || "User"}
          </h1>
          <h1 className="text-black font-mono text-xl sm:text-2xl break-words mb-4">
            Email : {data.email || "Not found"}
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <AddFeedbackButton />
          <LogoutButton />
        </div>
        <div className="mt-4 text-black">
          <FeedbackList />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
