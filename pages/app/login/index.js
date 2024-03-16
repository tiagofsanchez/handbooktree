import { useSession } from "@supabase/auth-helpers-react";
import AuthForm from "@/components/app/AuthForm";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      void router.replace("/");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-6 lg:px-56 ">
      <AuthForm />
    </div>
  );
};

export default LoginPage;
