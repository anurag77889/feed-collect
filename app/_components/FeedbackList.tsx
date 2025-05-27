/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function FeedbackList() {
  const { data, error, isLoading, mutate } = useSWR("/api/feedback", fetcher);

  if (isLoading) return <p>Loading feedbacks....</p>;
  if (error) return <p>Error loading feedbacks.</p>;
  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-2">List of Feedbacks: </h2>
        <button
          onClick={() => mutate()}
          className="mb-4 bg-black px-4 py-2 rounded"
        >
          🔄 Refresh
        </button>
      </div>
      <ul className="space-y-4">
        {data.feedbacks.map((fb: any, i: number) => (
          <li key={i} className="border rounded p-3">
            <p className="font-semibold">{fb.name}</p>
            <p>{fb.feedback}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(fb.date).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;
