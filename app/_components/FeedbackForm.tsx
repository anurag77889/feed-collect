"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { z } from "zod";

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
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            {...register("name")}
            className="border p-2 w-full rounded"
            placeholder="Enter your cute name 🥰"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block font-semibold">Feedback</label>
          <textarea
            {...register("feedback")}
            className="border p-2 w-full rounded"
            placeholder="Enter your valuable words for me 😅"
          />
          {errors.feedback && (
            <p className="text-red-500 text-sm">{errors.feedback.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}

export default FeedbackForm;
