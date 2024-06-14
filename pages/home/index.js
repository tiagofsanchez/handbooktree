import HomePageGuides from "@/components/home/HomePageGuides";
import HomePageHero from "@/components/home/HomePageHero";
import HomePageLocals from "@/components/home/HomePageLocals";
import Layout from "@/components/home/Layout";

// TODO pseudo code
// Head and OG
// HERO
// House Guides
// Local Guides
// Form
// Footer

export default function Home() {
  return (
    <Layout>
      <HomePageHero />
      <HomePageGuides />
      <HomePageLocals />
      <section id="newsletter">Newsletter</section>
    </Layout>
  );
}
