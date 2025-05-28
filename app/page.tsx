import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-amber-300 min-h-screen flex justify-center items-center flex-col gap-6 ">
      <h1 className="flex flex-col text-7xl gap-5 text-shadow-black text-black font-mono">
        <strong className="shadow-md">Want to Review?</strong>
        <strong className="shadow-md">Use Feed Collect</strong>
      </h1>
      <Link
        href={"/login"}
        className="bg-black w-fit text-amber-300 font-mono font-sm px-10 py-3 rounded-3xl cursor-pointer hover:bg-amber-300 hover:text-black transition hover:scale-90 hover:font-sm hover:border-2 border-black"
      >
        Login
      </Link>
    </div>
  );
}
