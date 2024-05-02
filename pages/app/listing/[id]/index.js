import Layout from "@/components/app/Layout";
import CreateGuideDialog from "@/components/app/create-guide-dialog";
import ListingPageHeader from "@/components/app/listingPageHeader";
import TipTap from "@/components/form/tiptap";
import { Button } from "@/components/ui/button";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { Notebook } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ListingPage = ({ listingData, guidesData, listingId }) => {
  const [editorContent, setEditorContent] = useState();
  const handleContentChange = (reason) => {
    setEditorContent(reason);
  };
  return (
    <Layout>
      <div className="p-5">
        <ListingPageHeader
          listingData={listingData}
          icon={<Notebook width={32} />}
          title="A summary description about your listing"
        />
        <div className="mt-5">
          <form className="">
            <TipTap
              name="tiptap"
              description={editorContent}
              placeholder="Description about your listing..."
              onChange={(newContent) => handleContentChange(newContent)}
            />
            <div className="flex flex-col items-center justify-center space-y-2 rounded-b border border-stone-200 bg-stone-100 p-2 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-8">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Update your guide description
              </p>
              <Button type="submit" className="w-32 ">
                Update
              </Button>
            </div>
          </form>
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
      listingId: id,
    },
  };
};

export default ListingPage;
