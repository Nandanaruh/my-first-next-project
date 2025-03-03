import Image from "next/image";
export default function SettingsPage() {
  return (
    <div className="flex flex-col justify-center items-center mt-60">
      <div className="flex flex-row items-center justify-center">
        <div className="-my-0">
          <Image
            src="/construction-tool.png"
            alt="construction-tool"
            title="Construction Tool"
            width={160}
            height={160}
            className="w-20 h-auto aspect-auto brightness-90 transition-transform duration-300 hover:brightness-105 hover:scale-105 hover:shadow-lg"
            priority
          />
        </div>
      </div>
      <div>
        <span className="font-sans font-bold text-center text-2xl text-blue-700">
          We are coming soon...
        </span>
      </div>
    </div>
  );
}
