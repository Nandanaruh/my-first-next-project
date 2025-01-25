import LoginForm from "./login-form";
//Server component for SSR - Sever Side Rendering
export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-black">
      <LoginForm title="Sign in to Dashboard" />
    </div>
  );
}
