import Head from "next/head";
import ListingImage from "./ListingImage";
import NavMenu from "./NavMenu";

// TODO
// OMG feature

const Layout = ({ name, listing_url, children }) => {
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
      {children}
    </div>
  );
};

export default Layout;
