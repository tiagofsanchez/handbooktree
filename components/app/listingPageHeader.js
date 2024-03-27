import { Separator } from "../ui/separator";
import Link from "next/link";

const ListingPageHeader = ({ listingData, icon, title }) => {
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? `https://${listingData.subdomain}.brokertree.co`
      : `http://${listingData.subdomain}.localhost:3000`;
  return (
    <>
      <div className="space-y-2">
        <Link
          href={currentHost}
          target="_blank"
          rel="noopener noreferrer"
          className=" inline-flex truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
        >
          {listingData.subdomain}.{process.env.NEXT_PUBLIC_ROOT_DOMAIN} ↗
        </Link>
        <h1 className="text-3xl font-extrabold capitalize flex gap-2 items-center  ">
          {icon}
          {listingData.name}
        </h1>
        <p>{title}</p>
      </div>
      <Separator className="mt-4" />{" "}
    </>
  );
};

export default ListingPageHeader;
