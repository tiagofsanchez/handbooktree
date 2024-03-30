import Layout from "@/components/app/Layout";
import TipTap from "@/components/form/tiptap";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

// TODO
// Try to implement the Formik framework with TipTap
// Connect to supabase for the backend
// Add title for inputForm

const GuidePage = ({ guideData }) => {
  const [editorContent, setEditorContent] = useState(guideData.description);
  const handleContentChange = (reason) => {
    setEditorContent(reason);
  };

  console.log(editorContent)
  return (
    <Layout listing_id={guideData.listing_id}>
      <div className="p-5">
        <TipTap
          description={editorContent}
          placeholder="Your guide..."
          onChange={(newContent) => handleContentChange(newContent)}
        />
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
