"use client";

import Link from "next/link";
import React from "react";

function AddFeedbackButton() {
  return (
    <>
      <Link href={"/addFeedback"}>
        <button className="mt-6 bg-blue-600 text-white cursor-pointer text-lg font-mono px-4 py-2 rounded-3xl hover:bg-blue-700 hover:scale-90">
          Add Feedback
        </button>
      </Link>
    </>
  );
}

export default AddFeedbackButton;
