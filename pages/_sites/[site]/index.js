import Layout from "@/components/site/Layout";
import DOMPurify from "isomorphic-dompurify";
import supabase from "@/lib/supabase";
import { Notebook, Map } from "lucide-react";
import GuidesList from "@/components/site/GuidesList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// TO DOs
// Structure and layout of the listings
// Prepare this for when there is no content

const SitePage = ({ listingData, guidesData }) => {
  const sanitizedHTML = DOMPurify?.sanitize(listingData.description);

  return (
    <Layout name={listingData.name} listing_url={listingData.listing_url}>
      <div className="space-y-20">
        <div
          className="mt-10"
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />
        <section id="house-guides" className="space-y-4">
          <div className="flex gap-1 items-center justify-center">
            <Notebook width={32} />
            <h1 className="text-xl font-bold">House guides</h1>
          </div>
          {guidesData.length !== 0 && <GuidesList guidesArray={guidesData} />}
          <div className="text-center">
            <Link href="/house-guides">
              <Button variant="secondary">All House Guides</Button>
            </Link>
          </div>
        </section>
        <section id="local-guides" className="space-y-4 ">
          <div className="flex gap-1 items-center justify-center">
            <Map width={32} />
            <h1 className="text-xl font-bold">Local tips</h1>
          </div>
          {/* <GuidesList /> */}
          <div className="text-center">
            <Link href="/local-guides">
              <Button variant="secondary">All Local Tips</Button>
            </Link>
          </div>
        </section>
        {/* <section id="contact" className="space-y-4 ">
            <div className="flex gap-1 items-center justify-center">
              <Phone width={32} />{" "}
              <h1 className="text-xl font-bold">Contact</h1>
            </div>
          </section> */}
      </div>
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
