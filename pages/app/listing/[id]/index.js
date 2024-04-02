import Layout from "@/components/app/Layout";
import ListingPageHeader from "@/components/app/listingPageHeader";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { CirclePlus, Notebook } from "lucide-react";
import Link from "next/link";

// TODOS:
// What happens where there are no guides - show a no guide page
// DONE: Guides section with all the guides that the user will have been putting together
// Adding guides drawer

const ListingPage = ({ listingData, guidesData }) => {
  return (
    <Layout>
      <div className="p-5">
        <ListingPageHeader
          listingData={listingData}
          icon={<Notebook width={32} />}
          title="Guides"
        />
        <div className="grid gap-5 mt-5">
          {guidesData.map((guide) => (
            <Card
              key={guide.id}
              className="border border-stone-200  shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white"
            >
              <Link href={`/guide/${guide.id}`}>
                <CardHeader>
                  <CardTitle>{guide.title}</CardTitle>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </div>
      <button
        variant="ghost"
        className="fixed bottom-4 right-4 bg-wite rounded  p-2 isolate shadow backdrop-blur-3xl ring-1 ring-stone-200/30 flex gap-2"
        // onClick={() => setOpen(!open)}
      >
      
        <CirclePlus />
        add a guide
      </button>
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
