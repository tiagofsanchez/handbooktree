import LayoutAll from "@/components/site/LayoutAll";
import supabase from "@/lib/supabase";

const LocalTipsPage = ({ listingData, guidesData }) => {
  return (
    <LayoutAll {...listingData}>
      <h1>Local guides Page</h1>
    </LayoutAll>
  );
};

export default LocalTipsPage;

export async function getStaticProps({ params: { site } }) {
  const { data } = await supabase
    .from("listings")
    .select(`id, name, listing_url `)
    .eq("subdomain", site);

  const { data: guidesData } = await supabase
    .from("guides")
    .select("*")
    .eq("listing_id", data[0].id);

  return {
    props: {
      listingData: data[0],
      guidesData,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const { data } = await supabase.from("listings").select("subdomain");
  const paths = data?.map((d) => {
    return {
      params:
        d.domain === null ? { site: "null" } : { site: d.subdomain } || [],
    };
  });

  return {
    paths,
    fallback: false,
  };
}
