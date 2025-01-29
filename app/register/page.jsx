//This page for SSR

import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import RegisterForm from "./register-form";
export default async function RegisterPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="bg-blue-50/90 container mx-auto">
      <RegisterForm title="Register" />
    </div>
  );
}
