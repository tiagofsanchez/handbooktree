import CardListing from "@/components/app/card-listing";
import { CreateListingDialog } from "@/components/app/create-listing-dialog";
import Layout from "@/components/app/Layout";
import { Button } from "@/components/ui/button";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

// TODO:
// Done: button to add more listings
// Done: Modal to add the listings

const ListingsPage = ({ userListings, userId }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const refreshData = () => {
    void router.replace(router.asPath, undefined, {
      scroll: false,
    });
  };

  return (
    <Layout className="relative">
      <CreateListingDialog
        userId={userId}
        open={open}
        setOpen={setOpen}
        refreshData={refreshData}
      />
      <div className="p-5 space-y-8">
        <h1 className="text-3xl font-extrabold">Your listings</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {userListings &&
            userListings.map((listing) => (
              <CardListing
                id={listing.id}
                key={listing.id}
                name={listing.name}
                subdomain={listing.subdomain}
              />
            ))}
        </div>
      </div>
      <Button
        variant="ghost"
        className="fixed  bottom-4 right-4 bg-stone-200/30 rounded  p-2 hover:bg-gradient-to-br hover:to-pink-300 hover:from-rose-900"
        onClick={() => setOpen(!open)}
      >
        <CirclePlus size={32} />
      </Button>
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { data: user } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("listings")
    .select("*")
    .eq("profile_id", user.user.id);

  return {
    props: {
      userListings: data,
      userId: user?.user.id,
    },
  };
};

export default ListingsPage;
