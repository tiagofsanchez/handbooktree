import Head from "next/head";
import ListingImage from "./ListingImage";
import NavMenu from "./NavMenu";

// TODO
// OG feature

const Layout = ({ name, listing_url, children }) => {
  const metadata = {
    title: `HandbookTree - ${name}`,
    description:
      "The only place your guests get a smooth, stress-free experience.",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1.0",
    og: {
      title: `HandbookTree - ${name}`,
      description:
        "The only place your guests get a smooth, stress-free experience.",
      url: "https://www.yourwebsite.com/",
      // image: "https://www.yourwebsite.com/og-image.jpg",
      type: "website",
      site_name: "HandbookTree",
    },
    twitter: {
      card: "summary_large_image",
      title: `HandbookTree - ${name}`,
      description:
        "The only place your guests get a smooth, stress-free experience.",
      // image: "https://www.yourwebsite.com/twitter-image.jpg",
    },
  };

  return (
    <>
      <Head>
        {/* SEO */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta charSet={metadata.charset} />
        <meta name="viewport" content={metadata.viewport} />

        {/* Open Graph (OG) Tags */}
        <meta property="og:title" content={metadata.og.title} />
        <meta property="og:description" content={metadata.og.description} />
        <meta property="og:url" content={metadata.og.url} />
        <meta property="og:image" content={metadata.og.image} />
        <meta property="og:type" content={metadata.og.type} />
        <meta property="og:site_name" content={metadata.og.site_name} />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.image} />
      </Head>
      <header className="max-w-3xl m-auto px-3 py-8 space-y-3 bg-stone-100 grid justify-center rounded-xl mt-3  ">
        <ListingImage url={listing_url} width={150} height={150} />
        <h1 className="text-2xl capitalize text-center font-extrabold">
          {name}
        </h1>
        {/* <NavMenu /> */}
      </header>
      <main className="p-5 m-auto max-w-3xl">{children}</main>

      <footer className="text-center p-4 mt-10 ">
        <p>
          Made with ❤️ by the{" "}
          <span className="font-extrabold text-pink-600 ">HandbookTree</span>{" "}
          team
        </p>
      </footer>
    </>
  );
};

export default Layout;
