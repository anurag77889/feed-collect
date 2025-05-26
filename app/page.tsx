import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-5">
      <h1 className="text-xl font-bold">
        Feed Collect - One Stop Solution for Feedback Collection
      </h1>
      <Link
        href={"/login"}
        className="bg-black text-white font-mono px-4 py-2 rounded-3xl cursor-pointer hover:bg-white hover:text-black transition hover:scale-90"
      >
        Login
      </Link>
    </div>
  );
}
