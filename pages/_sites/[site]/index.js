import Layout from "@/components/site/Layout";
import supabase from "@/lib/supabase";

// TO DOs
// Connect to supabase listings
// Structure and layout of the listings
//

const SitePage = ({ listingData }) => {
  return (
    <Layout
      name={listingData.name}
      listing_url={listingData.listing_url}
    ></Layout>
  );
};

export default SitePage;

export async function getStaticProps({ params: { site } }) {
  const { data } = await supabase
    .from("listings")
    .select("*")
    .eq("subdomain", site);

  return {
    props: {
      listingData: data[0],
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
