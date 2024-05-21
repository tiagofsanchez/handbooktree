import Head from "next/head";
import ListingImage from "./ListingImage";
import NavMenu from "./NavMenu";

// TODO:

const Layout = ({ name, listing_url }) => {
  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <header className="max-w-3xl m-auto p-3 space-y-3 bg-stone-50  rounded-xl mt-3   ">
        <ListingImage url={listing_url} />
        <h1 className="text-2xl capitalize text-center font-extrabold">
          {name}
        </h1>
        <NavMenu />
      </header>
      <main className="p-5 m-auto max-w-3xl">
        <section id="house-guides">
          <h1>House guides</h1>
        </section>
        <section id="local-guides">
          <h1>Local guides</h1>
        </section>
        <section id="contact">
          <h1>Contact</h1>
        </section>
        <footer>
          <p>Footer</p>
        </footer>
      </main>
    </div>
  );
};

export default Layout;
