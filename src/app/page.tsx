import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Studio3</h1>

        <div className="text-center sm:text-left max-w-md">
          <h2 className="text-xl font-semibold mb-4">Fitness for Everyone</h2>
          <p className="mb-6">
            Experience the best workouts with Studio3. Join our community and
            transform your fitness journey today.
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-[#b0fb50] text-black gap-2 hover:bg-[#9fdc4f] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/trial"
          >
            Get 7-Day Trial for $7
          </Link>
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-[#b0fb50] text-black gap-2 hover:bg-[#9fdc4f] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/credits"
          >
            Buy Workout Credits
          </Link>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Studio3. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
