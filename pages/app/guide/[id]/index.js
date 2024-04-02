import Layout from "@/components/app/Layout";
import TipTap from "@/components/form/tiptap";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { Button } from "@/components/ui/button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast, Toaster } from "sonner";
import GuidePageHeader from "@/components/app/guidePageHeader";
import { Notebook } from "lucide-react";
import InputForm from "@/components/form/inputForm";

// TODO
// Done: Managing state
// Done: Wrap this in a form so that it is able to save stuff
// Done: Connect to supabase for the backend where this will be saved
// Done: Think about what is the best option to save getHTML or getJSON and

// Add title for inputForm
// Add header to the guides page
// Abstract the TipTap form so that I can use that elsewhere with ease

const GuidePage = ({ guideData }) => {
  const supabase = useSupabaseClient();
  const [editorContent, setEditorContent] = useState(guideData.description);
  const handleContentChange = (reason) => {
    setEditorContent(reason);
  };

  const sanitizedHTML = DOMPurify?.sanitize(editorContent);

  async function updateGuideDescription({ id, description }) {
    try {
      const updates = {
        description,
        id: id,
        updated_at: new Date().toISOString(),
      };
      let { error } = await supabase
        .from("guides")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
      toast.success("You have updated your guide");
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateGuideDescription({ id: guideData.id, description: sanitizedHTML });
  }

  return (
    <Layout listing_id={guideData.listing_id}>
      <div className="p-5">
        <GuidePageHeader
          title={guideData.title}
          icon={<Notebook width={32} />}
        />
        <div className="mt-5 space-y-5">
          <InputForm />
          <form onSubmit={handleSubmit} className="">
            <TipTap
              name="tiptap"
              description={editorContent}
              placeholder="Your guide..."
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
        {/* <div
          className="bg-stone-500 mt-5 p-3"
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        /> */}
      </div>
      <Toaster />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const supabase = createPagesServerClient(ctx);

  const { data } = await supabase
    .from("guides")
    .select("id, title , description, listing_id ")
    .eq("id", id);
  return {
    props: {
      guideData: data[0],
    },
  };
};

export default GuidePage;
