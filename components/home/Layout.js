import Head from "next/head";
import { Inter } from "next/font/google";
import { Button } from "../ui/button";
const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "HandbookTree",
  description:
    "The only place your guests get a smooth, stress-free experience. Build your app today!",
  charset: "UTF-8",
  viewport: "width=device-width, initial-scale=1.0",
  og: {
    title: "HandbookTree",
    description:
      "The only place your guests get a smooth, stress-free experience. Build your app today!",
    url: "https://www.yourwebsite.com/",
    // image: "https://www.yourwebsite.com/og-image.jpg",
    type: "website",
    site_name: "HandbookTree",
  },
  twitter: {
    card: "summary_large_image",
    title: "HandbookTree",
    description:
      "The only place your guests get a smooth, stress-free experience. Build your app today!",
    // image: "https://www.yourwebsite.com/twitter-image.jpg",
  },
};

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        {/* Basic SEO Tags */}
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
      <header className="mt-5 flex justify-between container mx-auto max-w-screen-xl px-4">
        {/* Navigation Component */}
        <nav className="text-center flex">
          {/* Your navigation links */}
          <ul className="flex gap-2 m-auto">
            <li className="font-extrabold rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800 flex gap-1">
              <a href="#house_guides">House Guides</a>
            </li>
            <li className="font-extrabold rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800 flex gap-1">
              <a href="#local_guides">Local Guides</a>
            </li>
            <li className="font-extrabold rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800 flex gap-1">
              <a href="#newsletter">Newsletter</a>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>
        <Button>Sign in</Button>
      </header>

      <main
        className={`container mx-auto max-w-screen-xl px-4 mt-10 ${inter.className} space-y-32`}
      >
        {children}
      </main>
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
