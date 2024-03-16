import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// TO DO
// Auth with social (Google) so that it is easy for the user to sign in to the app
// Email, need to send a proper email

export default function AuthForm() {
  const supabase = createClientComponentClient();

  return (
    <div className="sm:w-1/2 sm:m-auto">
      <h1 className="text-4xl font-extrabold mb-10 text-center">Log in</h1>
      <Auth
        supabaseClient={supabase}
        providers={[]}
        appearance={{
          theme: ThemeSupa,
        }}
        theme="dark"
      />
    </div>
  );
}
