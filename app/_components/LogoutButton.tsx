"use client";
import { signOut } from "next-auth/react";
import React from "react";

function LogoutButton() {
  return (
    <>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-6 w-fit sm:w-fit bg-red-600 text-white cursor-pointer text-lg font-mono px-4 py-2 rounded-3xl hover:bg-red-700 hover:scale-90"
      >
        Sign Out
      </button>
    </>
  );
}

export default LogoutButton;
