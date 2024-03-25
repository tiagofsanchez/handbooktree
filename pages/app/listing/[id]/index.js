import Layout from "@/components/app/Layout";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

// TODOS:
// Show all guides
// Header for the page in order to have the page with the proper name in the page header
// Guides section with all the guides that the user will have been putting together

const ListingPage = ({ listingData }) => {
  return (
    <Layout>
      <div className="p-5 space-y-8 wrap">
        <div className="flex gap-3 items-end">
          <h1 className="text-3xl font-extrabold ">{listingData.name}</h1>
          <p className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700">
            {listingData.subdomain} ↗
          </p>
        </div>
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
