import Layout from "@/components/app/Layout";
import TipTap from "@/components/form/tiptap";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import DOMPurify from "dompurify"; 

// TODO
// Managing state
// Wrap this in a form so that it is able to save stuff
// Connect to supabase for the backend where this will be saved
// Think about what is the best option to save getHTML or getJSON and
// Add title for inputForm

const GuidePage = ({ guideData }) => {
  const [editorContent, setEditorContent] = useState(guideData.description);
  const handleContentChange = (reason) => {
    setEditorContent(reason);
  };

  const sanitizedHTML = DOMPurify.sanitize(editorContent)

  return (
    <Layout listing_id={guideData.listing_id}>
      <div className="p-5">
        <TipTap
          description={editorContent}
          placeholder="Your guide..."
          onChange={(newContent) => handleContentChange(newContent)}
        />
        <div className="bg-stone-500 mt-5 p-3" dangerouslySetInnerHTML={{__html: sanitizedHTML}}/>
      </div>
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
