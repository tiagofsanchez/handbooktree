import HomePageGuides from "@/components/home/HomePageGuides";
import HomePageHero from "@/components/home/HomePageHero";
import HomePageLocals from "@/components/home/HomePageLocals";
import Layout from "@/components/home/Layout";
import NewsletterForm from "@/components/home/Newsletter";

// TODO pseudo code
// Head and OG
// HERO
// DONE: House Guides
// DONE: Local Guides
// Form
// Connecting to Airtable? 
// Telling the user that they just subscribe
// DONE: Footer

export default function Home() {
  return (
    <Layout>
      <HomePageHero />
      <HomePageGuides />
      <HomePageLocals />
      <NewsletterForm />
    </Layout>
  );
}
