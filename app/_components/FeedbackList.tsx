"use client";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function FeedbackList() {
  const { data, error, isLoading, mutate } = useSWR("/api/feedback", fetcher);

  if (isLoading) return <p>Loading feedbacks....</p>;
  if (error) return <p>Error loading feedbacks...</p>;
  return <div>FeedbackList</div>;
}

export default FeedbackList;
