import Head from "next/head";
import { Inter } from "next/font/google";
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
    image: "https://www.yourwebsite.com/og-image.jpg",
    type: "website",
    site_name: "Your Website Name",
  },
  twitter: {
    card: "summary_large_image",
    title: "HandbookTree",
    description:
      "The only place your guests get a smooth, stress-free experience. Build your app today!",
    image: "https://www.yourwebsite.com/twitter-image.jpg",
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
      <header>
        {/* Navigation Component */}
        <nav>
          {/* Your navigation links */}
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">House Guides</a>
            </li>
            <li>
              <a href="/guides">Local Guides</a>
            </li>
            <li>
              <a href="/form">Newsletter</a>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>
      </header>

      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        {children}
      </main>
      <footer>
        <p>Made with ❤️ by the HandbookTree team</p>
      </footer>
    </>
  );
};

export default Layout;
