import Nav from "./nav";
import { LogOut } from "lucide-react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import extractUsername from "../../utils/extractUsername";

// TO DO
// DONE: get the profile of the user
// DONE: get the sign out button with the redirect to the login page
// Change the Nav for when the user

const Layout = ({ children, listing_id }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const session = useSession();

  async function onSignOut() {
    const { error } = await supabase.auth.signOut();
    router.push(`/login`);
  }

  const userName = extractUsername(session?.user?.email);

  return (
    <div>
      <Nav listing_id={listing_id}>
        <div className="flex justify-between items-center gap-2 mt-3">
          <p className="text-sm">{userName}</p>
          <button onClick={onSignOut}>
            <LogOut width={18} />
          </button>
        </div>
      </Nav>
      <div className="min-h-screen dark:bg-black sm:pl-60 ">{children}</div>
    </div>
  );
};

export default Layout;
