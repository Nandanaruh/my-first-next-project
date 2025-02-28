import { Wrench, FileCode2, Construction } from "lucide-react";
export default function SettingsPage() {
  return (
    <div className="flex flex-col justify-center items-center mt-60">
      <div className="flex flex-row items-center justify-center">
        <div className="-my-5">
          <Wrench className="text-green-500 size-10" />
        </div>
        <div>
          <FileCode2 className="text-red-500 size-20 -mx-2" />
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
