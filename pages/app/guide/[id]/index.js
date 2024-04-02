import Layout from "@/components/app/Layout";
import TipTap from "@/components/form/tiptap";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { Button } from "@/components/ui/button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast, Toaster } from "sonner";

// TODO
// Done: Managing state
// Done: Wrap this in a form so that it is able to save stuff
// Done: Connect to supabase for the backend where this will be saved
// Done: Think about what is the best option to save getHTML or getJSON and

// Add title for inputForm
// Add header to the guides page

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
        <form onSubmit={handleSubmit} className="space-y-2">
          <TipTap
            name="tiptap"
            description={editorContent}
            placeholder="Your guide..."
            onChange={(newContent) => handleContentChange(newContent)}
          />
          <div className="flex justify-end">
            <Button type="submit" className="w-32 ">
              Update
            </Button>
          </div>
        </form>
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
