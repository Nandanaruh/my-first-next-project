import SidePanel from "./components/side-panel";
import UserNav from "./components/user-nav";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Side panel */}
      <aside className="w-64 overflow-y-auto border-r bg-white shadow-lg">
        <SidePanel />
      </aside>
      <div className="bg-pink-100 flex flex-1 flex-col overflow-hidden">
        {/* Dashboard header */}
        <header className="flex bg-white h-16 items-center justify-between gap-4 border-b px-6 shadow-sm">
          <div className="flex flex-row">
            <h1 className="text-2xl font-bold text-blue-700">
              MFlix Dashboard
            </h1>
            <div className="mx-3">
              <Button variant="outline">
                <Search /> Search
              </Button>
            </div>
          </div>
          <UserNav className="end" />
        </header>
        {/* Dashboard page */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
