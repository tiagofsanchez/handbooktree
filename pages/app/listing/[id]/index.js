import Layout from "@/components/app/Layout";
import ListingPageHeader from "@/components/app/listingPageHeader";
import TipTap from "@/components/form/tiptap";
import { Button } from "@/components/ui/button";
import DOMPurify from "isomorphic-dompurify";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Notebook } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";

// TODO:
// Description: add the description to the listing
// Photo: add photo to the listing (this will be the main photo of the listing)

const ListingPage = ({ listingData }) => {
  const supabase = useSupabaseClient();
  const [editorContent, setEditorContent] = useState(listingData.description);
  const handleContentChange = (reason) => {
    setEditorContent(reason);
  };

  const sanitizedHTML = DOMPurify?.sanitize(editorContent);

  async function updateListDescription({ id, description }) {
    try {
      const updates = {
        id: id,
        description,
        updated_at: new Date().toISOString(),
      };
      let { error } = await supabase
        .from("listings")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
      toast.success("You have updated your listing description");
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateListDescription({ id: listingData.id, description: sanitizedHTML });
  }

  return (
    <Layout>
      <div className="p-5">
        <ListingPageHeader
          listingData={listingData}
          icon={<Notebook width={32} />}
          title="A summary description about your listing"
        />
        <div className="mt-5">
          <form className="" onSubmit={handleSubmit}>
            <TipTap
              name="tiptap"
              description={editorContent}
              placeholder="Description about your listing..."
              onChange={(newContent) => handleContentChange(newContent)}
            />
            <div className="flex flex-col items-center justify-center space-y-2 rounded-b border border-t-0 border-stone-200 bg-stone-100 p-2 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-8">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Update your description
              </p>
              <Button type="submit" className="w-32 ">
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const supabase = createPagesServerClient(ctx);

  const { data } = await supabase
    .from("listings")
    .select("id, name, subdomain, description")
    .eq("id", id);

  return {
    props: {
      listingData: data[0],
    },
  };
};

export default ListingPage;
