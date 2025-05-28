"use client";
import { zodResolver } from "@hookform/resolvers/zod";

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
    <div className="bg-amber-300 min-w-screen">
      <div className="min-h-screen flex justify-center items-center">
        <div className="p-15 rounded-lg bg-black">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
            <div className="flex flex-col gap-3">
              <label className="block font-mono font-semibold text-2xl text-amber-300">
                Name
              </label>
              <input
                {...register("name")}
                className="border p-3 text-white w-full rounded border-white font-mono placeholder:text-white"
                placeholder="Enter your cute name 🥰"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label className="block font-semibold font-mono text-2xl text-amber-300">
                Feedback
              </label>
              <textarea
                {...register("feedback")}
                className="border p-3 font-mono text-white w-full rounded border-white placeholder:text-white placeholder:font-mono"
                placeholder="Enter your valuable words for me 😅"
              />
              {errors.feedback && (
                <p className="text-red-500 text-sm">
                  {errors.feedback.message}
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black border-2 border-amber-300 shadow-lg text-white font-mono px-4 py-2 rounded cursor-pointer hover:bg-amber-300 hover:text-black hover:border-amber-300 hover:scale-[90%]"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <Back2Dashboard />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FeedbackForm;
