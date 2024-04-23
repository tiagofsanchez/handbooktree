import Layout from "@/components/app/Layout";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";


// TODO
// Delete the guide on the settings

const SettingsPage = ({ guideData }) => {
  return (
    <Layout listing_id={guideData.listing_id}>
      <h1>Guides Setting Page</h1>{" "}
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const supabase = createPagesServerClient(ctx);

  const { data } = await supabase
    .from("guides")
    .select("id, listing_id")
    .eq("id", id);

  return {
    props: {
      guideData: data[0],
    },
  };
};

export default SettingsPage;
