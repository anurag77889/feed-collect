import Link from "next/link";
import React from "react";

function Back2Dashboard() {
  return (
    <div>
      <Link href={"/dashboard"}>
        <button className="bg-green-600 text-white px-3 py-2 rounded cursor-pointer ">
          Dashboard
        </button>
      </Link>
    </div>
  );
}

export default Back2Dashboard;
