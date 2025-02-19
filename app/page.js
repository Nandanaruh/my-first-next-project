import { Button } from "@/components/ui/button";

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
          <Button className="bg-blue-500 w-[120px] hover:bg-blue-400">
            <a href="/login" className="text-xs text-blue-950 no-underline">
              Login
            </a>
          </Button>
        </div>
        <span>or</span>
        <div>
          <Button className="bg-green-500 w-[120px] hover:bg-green-400">
            <a href="/register" className="text-xs text-green-950 no-underline">
              Register
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
