import Link from "next/link";
import React from "react";

function Back2Dashboard() {
  return (
    <div>
      <Link href={"/dashboard"}>
        <button className="bg-black border-2 border-amber-300 shadow-lg text-white font-mono px-3 py-2 rounded cursor-pointer hover:bg-amber-300 hover:text-black hover:border-amber-300 hover:scale-[90%]">
          Dashboard
        </button>
      </Link>
    </div>
  );
}

export default Back2Dashboard;
