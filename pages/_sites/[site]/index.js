import Layout from "@/components/site/Layout";
import DOMPurify from "isomorphic-dompurify";
import supabase from "@/lib/supabase";
import { Notebook, Phone, Map } from "lucide-react";
import LocalGuidesList from "@/components/site/LocalGuidesList";
import { Button } from "@/components/ui/button";

// TO DOs
// Connect to supabase listings
// Structure and layout of the listings

const SitePage = ({ listingData, guidesData }) => {
  const sanitizedHTML = DOMPurify?.sanitize(listingData.description);
  console.log(guidesData);

  return (
    <Layout name={listingData.name} listing_url={listingData.listing_url}>
      <main className="p-5 m-auto max-w-3xl space-y-3 ">
        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        <div className="space-y-20">
          <section id="house-guides" className="space-y-4 mt-12">
            <div className="flex gap-1 items-center justify-center">
              <Notebook width={32} />
              <h1 className="text-xl font-bold">House guides</h1>
            </div>
            <LocalGuidesList />
            <div className="text-center">
              <Button variant="secondary">All House Guides</Button>
            </div>
          </section>
          <section id="local-guides" className="space-y-4">
            <div className="flex gap-1 items-center justify-center">
              <Map width={32} />
              <h1 className="text-xl font-bold">Local tips</h1>
            </div>
            <LocalGuidesList />
            <div className="text-center">
              <Button variant="secondary">All Local Tips</Button>
            </div>
          </section>
          <section id="contact" className="space-y-4 ">
            <div className="flex gap-1 items-center justify-center">
              <Phone width={32} />{" "}
              <h1 className="text-xl font-bold">Contact</h1>
            </div>
          </section>
        </div>
        <footer>
          <p>Footer</p>
        </footer>
      </main>
    </Layout>
  );
};

export default SitePage;

export async function getStaticProps({ params: { site } }) {
  const { data } = await supabase
    .from("listings")
    .select("*")
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
