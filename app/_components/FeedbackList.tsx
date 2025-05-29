/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function FeedbackList() {
  const {
    data: feedbacks,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/feedback", fetcher);

  if (isLoading) return <p>Loading feedbacks....</p>;
  if (error) return <p>Error loading feedbacks.</p>;
  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-mono font-semibold mb-2">
          List of Feedbacks:{" "}
        </h2>
        <button
          onClick={() => mutate()}
          className="mb-4 bg-black font-mono text-amber-300 cursor-pointer rounded-3xl px-4 py-2"
        >
          🔄 Refresh
        </button>
      </div>
      <ul className="space-y-4">
        {feedbacks.map((fb: any, i: number) => (
          <li key={i} className="border rounded p-3">
            <div className="flex flex-row justify-between items-center">
              <div>
                <p className="font-semibold font-mono text-xl">{fb.name}</p>
                <p className="font-mono text-md">{fb.feedback}</p>
              </div>
              <div>
                <p className="text-lg font-mono text-black mt-1">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;
