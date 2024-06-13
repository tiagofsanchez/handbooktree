import HomePageHero from "@/components/home/HomePageHero";
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
      <section id="house_guides">House Guides</section>
      <section id="local_guides">Local Guides</section>
      <section id="newsletter">Newsletter</section>
    </Layout>
  );
}
