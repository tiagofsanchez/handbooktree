import Layout from "@/components/app/Layout";
import TipTap from "@/components/form/tiptap";
import TipTapForm from "@/components/form/tipTapForm";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";


// TODO
// Try to implement the Formik framework with TipTap
// Connect to supabase for the backend
// Add title for inputForm

const GuidePage = ({ guideData }) => {
  return (
    <Layout listing_id={guideData.listing_id}>
      <div className="p-5">
        <TipTap
          description={guideData.description}
          placeholder="Your guide..."
        />
        <TipTapForm
          description={guideData.description}
          placeholder="Your guide..."
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
