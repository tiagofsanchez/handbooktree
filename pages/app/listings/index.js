import CardListing from "@/components/app/card-listing";
import { CreateListingDialog } from "@/components/app/create-listing-dialog";
import Layout from "@/components/app/Layout";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { list } from "postcss";

// TODO:
// Done: button to add more listings
// Done: Modal to add the listings

const listingsPage = ({ userListings }) => {
  return (
    <Layout>
      <CreateListingDialog />
      <div className="p-5 space-y-8">
        <h1 className="text-3xl font-extrabold">Your listings</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {userListings &&
            userListings.map((listing) => (
              <CardListing
                key={listing.id}
                name={listing.name}
                subdomain={listing.subdomain}
              />
            ))}
        </div>
      </div>
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
    },
  };
};

export default listingsPage;
