import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="m-5">
        <h1 className="font-sans font-bold text-center text-6xl md:text-5xl lg:text-6xl leading-snug text-gray-700">
          Welcome to Evotec <br />
          Mflix Movie Dashboard
        </h1>
      </div>
      <div className="flex flex-row space-x-4">
        <div>
          <Link href="/login">
            <Button className="bg-blue-500 w-[120px] text-xs hover:bg-blue-400 text-blue-950">
              Login
            </Button>
          </Link>
        </div>
        <span>or</span>
        <div>
          <Link href="/register">
            <Button className="bg-green-500 w-[120px] text-xs hover:bg-green-400 text-green-950">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
