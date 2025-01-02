import RegisterForm from "./register-form";
//Server component for SSR - Sever Side Rendering
export default function RegisterPage() {
  return (
    <div className="container mx-auto">
      <RegisterForm title="Register" />
    </div>
  );
}
