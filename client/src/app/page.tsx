import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-10 py-20 px-6 bg-white dark:bg-black sm:px-10">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 rounded-xl border-2 border-[#0A2540] bg-white p-2 shadow-sm">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              <path d="M32 4L12 14V32c0 14.36 10.64 26.24 24 28 13.36-1.76 24-13.64 24-28V14L32 4Z" fill="#0A2540" />
              <path d="M24 30C24 28.3431 25.3431 27 27 27H37C38.6569 27 40 28.3431 40 30V35C40 36.6569 38.6569 38 37 38H30C28.3431 38 27 36.6569 27 35V30Z" fill="#00D9E8" />
              <path d="M30 33H34" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <circle cx="28" cy="24" r="2.5" fill="#00D9E8" />
              <circle cx="36" cy="22" r="2.5" fill="#00D9E8" />
              <path d="M28 24L36 22" stroke="#00D9E8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-widest text-[#0A2540] dark:text-white">PayAI Guardian</h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-300">Secure AI fintech for modern payments</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h2 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file with your product content.
          </h2>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
