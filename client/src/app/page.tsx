import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <main className="glass card max-w-4xl w-full text-center">
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="relative h-16 w-16 rounded-xl border-2 border-primary bg-white/10 p-3 shadow-lg">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              <path d="M32 4L12 14V32c0 14.36 10.64 26.24 24 28 13.36-1.76 24-13.64 24-28V14L32 4Z" fill="currentColor" className="text-primary" />
              <path d="M24 30C24 28.3431 25.3431 27 27 27H37C38.6569 27 40 28.3431 40 30V35C40 36.6569 38.6569 38 37 38H30C28.3431 38 27 36.6569 27 35V30Z" fill="currentColor" className="text-accent" />
              <path d="M30 33H34" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="28" cy="24" r="2.5" fill="currentColor" className="text-accent" />
              <circle cx="36" cy="22" r="2.5" fill="currentColor" className="text-accent" />
              <path d="M28 24L36 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent" />
            </svg>
          </div>
          <div>
            <h1 className="text-5xl font-bold gradient-text mb-2">PayAI Guardian</h1>
            <p className="text-lg text-foreground-secondary">Secure AI fintech for modern payments</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-foreground">
            AI-Powered Payment Security
          </h2>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            Experience next-generation payment protection with our advanced AI fraud detection,
            real-time transaction monitoring, and intelligent risk assessment.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <button className="btn-primary px-8 py-3 text-lg">
              Get Started
            </button>
            <button className="btn-outline px-8 py-3 text-lg">
              Learn More
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
