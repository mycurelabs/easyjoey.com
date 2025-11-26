import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-[calc(50%-4rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/30 to-primary/10 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-primary/50 transition-all">
              Announcing our latest updates.{" "}
              <a href="#features" className="font-semibold text-primary">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Simplify Your Clinic Management with{" "}
            <span className="text-primary">Easy Joey</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Streamline appointments, patient records, and billing all in one place. 
            Easy Joey is the modern clinic management system designed for healthcare 
            professionals who want to focus on what matters most - their patients.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="group">
              Get started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="group">
              <Play className="mr-2 h-4 w-4" />
              Watch demo
            </Button>
          </div>
        </div>

        {/* Hero image/dashboard preview */}
        <div className="mt-16 flow-root sm:mt-24">
          <div className="relative -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <div className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/80 h-48 sm:h-64 lg:h-96 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold">Dashboard Preview</h3>
                  <p className="mt-2 text-white/80 text-sm sm:text-base">Your clinic&apos;s command center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
