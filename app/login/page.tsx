"use client";
import { signIn } from "next-auth/react";
import React from "react";

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-5">
      <h1 className="text-3xl font-bold">Login to Feedback Board</h1>
      <button
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
        className="px-5 py-2 bg-black text-white rounded font-mono border-2 cursor-pointer"
      >
        Sign in with Github
      </button>
    </div>
  );
}

export default LoginPage;
