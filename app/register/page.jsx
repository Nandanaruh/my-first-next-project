import RegisterForm from "./register-form";
//Server component for SSR - Sever Side Rendering
export default function RegisterPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-black">
      <RegisterForm title="Register"/>
    </div>
  );
}