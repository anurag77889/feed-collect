"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { z } from "zod";
import Back2Dashboard from "./Back2Dashboard";

const feedbackSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

function FeedbackForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error submitting feedback: ", errorData);
        toast("Failed to submit feedback");
        return;
      }
      toast("Feedback submitted!");
      reset();
    } catch (error) {
      console.error("Error: ", error);
      toast("Something went wrong");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="border-2 p-15 rounded-lg bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div className="flex flex-col gap-3">
            <label className="block font-semibold text-2xl text-black">
              Name
            </label>
            <input
              {...register("name")}
              className="border p-3 w-full rounded border-black placeholder:text-black"
              placeholder="Enter your cute name 🥰"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label className="block font-semibold text-2xl text-black">
              Feedback
            </label>
            <textarea
              {...register("feedback")}
              className="border p-3 w-full rounded border-black placeholder:text-black "
              placeholder="Enter your valuable words for me 😅"
            />
            {errors.feedback && (
              <p className="text-red-500 text-sm">{errors.feedback.message}</p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 shadow-lg text-white px-4 py-2 rounded cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <Back2Dashboard />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
