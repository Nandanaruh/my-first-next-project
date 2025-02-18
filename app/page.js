import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center">
        <Image
          className="rounded-full mb-5 border border-gray-400 brightness-100 transition-transform duration-300 hover:brightness-110 hover:scale-105 hover:shadow-lg"
          src="/nandana.jpg"
          alt="Nandana Rathanayaka"
          title="Nandana Rathanayaka"
          width={300}
          height={300}
          priority
        />
        <ol className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            <h4 className="text-center text-xl font-semibold text-gray-900">
              Welcome to Evotec Mflix Movie Dashboard.{" "}
            </h4>
          </li>
          <li>
            <div className="flex flex-row space-x-4 items-center justify-start">
              <div className="text-sm text-gray-500 font-medium space-x-1">
                <Button variant="outline">
                  <a
                    href="/register"
                    className="text-xs text-gray-700 no-underline"
                  >
                    Sign Up
                  </a>
                </Button>
              </div>
              <div className="text-xs text-gray-500 font-medium  space-x-1">
                <Button variant="outline">
                  <a
                    href="/login"
                    className="text-xs text-gray-700 no-underline"
                  >
                    Sign In
                  </a>
                </Button>
              </div>
            </div>
          </li>
        </ol>
      </main>
    </div>
  );
}
