import Layout from "@/components/app/Layout";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const GuidePage = ({ guideData }) => {
  return (
    <Layout listing_id={guideData.listing_id}>
      <h1>GuidePage</h1>
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
