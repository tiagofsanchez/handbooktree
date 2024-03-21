const CardListing = ({ name, subdomain }) => {
  return (
    <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <div className="border-t border-stone-200 p-4 dark:border-stone-700">
        <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white">
          {name}
        </h3>
        {/* <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
          descriptions
        </p> */}
      </div>
      <div className="absolute bottom-4 flex w-full justify-between space-x-4 px-4">
        <div className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700">
          {subdomain} ↗
        </div>
      </div>
    </div>
  );
};

export default CardListing;
