import Layout from "@/components/app/Layout";
import ListingPageHeader from "@/components/app/listinPageHeader";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

// TODOS:
// DONE: Header for the page in order to have the page with the proper name in the page header
// DONE: Need to link to the page that the user actually built
// Show all guides
// Guides in supabase
// Guides section with all the guides that the user will have been putting together

const ListingPage = ({ listingData }) => {
  return (
    <Layout>
      <div className="p-5">
        <ListingPageHeader listingData={listingData} />
        <h2 className=" text-lg mt-5">Existing guides</h2>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const supabase = createPagesServerClient(ctx);

  const { data } = await supabase
    .from("listings")
    .select("name, subdomain")
    .eq("id", id);

  return {
    props: {
      listingData: data[0],
    },
  };
};

export default ListingPage;
