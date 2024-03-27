import Layout from "@/components/app/Layout";
import ListingPageHeader from "@/components/app/listinPageHeader";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

// TODOS:
// DONE: Header for the page in order to have the page with the proper name in the page header
// DONE: Need to link to the page that the user actually built
// Show all guides
// DONE: Guides in supabase
// Guides UI 
// What happens where there are no guides - show a no guide page
// Guides section with all the guides that the user will have been putting together

const ListingPage = ({ listingData, guidesData }) => {
  return (
    <Layout>
      <div className="p-5">
        <ListingPageHeader listingData={listingData} />
        <div className="grid gap-5 mt-5">
          {guidesData.map((guide) => (
            <Card
              key={guide.id}
              className="border border-stone-200  shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white"
            >
              <CardHeader>
                <CardTitle>{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
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

  const { data: guides } = await supabase
    .from("guides")
    .select("id, title , description ")
    .eq("listing_id", id);

  return {
    props: {
      listingData: data[0],
      guidesData: guides,
    },
  };
};

export default ListingPage;
