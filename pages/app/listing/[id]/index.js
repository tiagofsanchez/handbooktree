import Layout from "@/components/app/layout";
import { Separator } from "@/components/ui/separator";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

// TODOS:
// DONE: Header for the page in order to have the page with the proper name in the page header
// DONE: Need to link to the page that the user actually built
// Show all guides
// Guides in supabase
// Guides section with all the guides that the user will have been putting together

const ListingPage = ({ listingData }) => {
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? `https://${listingData.subdomain}.brokertree.co`
      : `http://${listingData.subdomain}.localhost:3000`;
  return (
    <Layout>
      <div className="p-5">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold capitalize ">
            {listingData.name}
          </h1>
          <Link
            href={currentHost}
            target="_blank"
            rel="noopener noreferrer"
            className=" inline-flex truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {listingData.subdomain}.{process.env.NEXT_PUBLIC_ROOT_DOMAIN} ↗
          </Link>
        </div>
        <Separator className="mt-4" />
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
