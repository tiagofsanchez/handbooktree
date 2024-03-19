import subdomains from "@/utils/subdomains";

// TO DOs
// Connect to supabase listings
// Structure and layout of the listings


const SitePage = ({ site }) => {
  return <h1>SitePage - {site} </h1>;
};

export default SitePage;

export async function getStaticProps({ params: { site } }) {
  return {
    props: {
      site,
    },
    revalidate: 3600,
  };
}
export async function getStaticPaths() {
  const data = subdomains;

  const paths = data?.map((d) => {
    return {
      params: d.domain === null ? { site: "null" } : { site: d.domain } || [],
    };
  });

  return {
    paths,
    fallback: false,
  };
}
