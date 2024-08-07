import Layout from "@/components/app/Layout";
import CreateGuideDialog from "@/components/app/create-guide-dialog";
import ListingPageHeader from "@/components/app/listingPageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { CirclePlus, Notebook } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// TODOS:
// What happens where there are no guides - show a no guide page
// DONE: Guides section with all the guides that the user have been putting together
// Adding guides drawer

const ListingPage = ({ listingData, guidesData, listingId }) => {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <CreateGuideDialog open={open} setOpen={setOpen} listingId={listingId} />
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
      <Button
        className="fixed bottom-4 right-4 flex gap-2 "
        onClick={() => setOpen(!open)}
      >
        <CirclePlus />
        add a guide
      </Button>
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
      listingId: id,
    },
  };
};

export default ListingPage;
