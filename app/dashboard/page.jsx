import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MovieData from "./movie-data";
import UserData from "./user-data";

export default function MoviesPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Movies Management</CardTitle>
          <CardDescription>
            View and manage all listed movie entries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-[186px]">
                <LoaderCircle className="animate-spin duration-1000 text-blue-500" />
              </div>
            }
          >
            <MovieData />
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View all users on the MFlix dashboard.
              </CardDescription>
            </CardHeader>
            <UserData />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
