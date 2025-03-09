import LoginForm from "./login-form";
//Server component for SSR - Sever Side Rendering
export default function LoginPage() {
  return (
    <div className="bg-blue-50/90 container mx-auto">
      <LoginForm title="Sign in to Dashboard" />
    </div>
  );
}
