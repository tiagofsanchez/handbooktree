import {
  ChevronLeft,
  LayoutDashboard,
  Menu,
  Notebook,
  Home,
  Settings,
  Edit,
  Captions,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

// TO DOS IN THIS NAV
// any other links that you might need

const Nav = ({ children, listing_id }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();

  const tabsToRender = useMemo(() => {
    if (router.pathname === "/app/listing/[id]") {
      return [
        {
          name: "back to listings",
          href: "/listings",
          tab: "/app/listings",
          icon: <ChevronLeft width={18} />,
        },
        {
          name: "Description",
          href: `${router.asPath}`,
          tab: `${router.pathname}`,
          icon: <Captions width={18} />,
        },
        {
          name: "Guides",
          href: `${router.asPath}/guides`,
          tab: `${router.pathname}/guides`,
          icon: <Notebook width={18} />,
        },
        {
          name: "Settings",
          href: `${router.asPath}/settings`,
          tab: `${router.pathname}/settings`,
          icon: <Settings width={18} />,
        },
      ];
    } else if (router.pathname === "/app/listing/[id]/guides") {
      return [
        {
          name: "back to listings",
          href: "/listings",
          tab: "/app/listings",
          icon: <ChevronLeft width={18} />,
        },
        {
          name: "Description",
          href: `/listing/${router.query.id}`,
          tab: `/app/listing/${router.query.id}`,
          icon: <Captions width={18} />,
        },
        {
          name: "Guides",
          href: `${router.asPath}`,
          tab: `${router.pathname}`,
          icon: <Notebook width={18} />,
        },
        {
          name: "Settings",
          href: `${router.asPath}/settings`,
          tab: `${router.pathname}/settings`,
          icon: <Settings width={18} />,
        },
      ];
    } else if (router.pathname === "/app/guide/[id]") {
      return [
        {
          name: "back to guides",
          href: `/listing/${listing_id}/guides`,
          icon: <ChevronLeft width={18} />,
        },
        {
          name: "Editor",
          href: `${router.asPath} `,
          tab: `${router.pathname}`,
          icon: <Edit width={18} />,
        },
        {
          name: "Settings",
          href: `${router.asPath}/settings`,
          tab: `${router.pathname}/settings`,
          icon: <Settings width={18} />,
        },
      ];
    } else if (router.pathname === "/app/guide/[id]/settings") {
      return [
        {
          name: "back to guides",
          href: `/listing/${listing_id}`,
          icon: <ChevronLeft width={18} />,
        },
        {
          name: "Editor",
          href: `/guide/${router.query.id} `,
          icon: <Edit width={18} />,
        },
        {
          name: "Settings",
          href: `${router.asPath}`,
          tab: `${router.pathname}`,
          icon: <Settings width={18} />,
        },
      ];
    } else if (router.pathname === "/app/listing/[id]/settings") {
      return [
        {
          name: "back to listings",
          href: `/listing/${router.query.id}`,
          icon: <ChevronLeft width={18} />,
        },
        {
          name: "Guides",
          href: `/listing/${router.query.id}`,
          icon: <Notebook width={18} />,
        },
        {
          name: "Settings",
          href: `${router.asPath}`,
          tab: `${router.pathname}`,
          icon: <Settings width={18} />,
        },
      ];
    } else {
      return [
        {
          name: "Dashboard",
          href: "/",
          tab: "/app",
          icon: <LayoutDashboard width={18} />,
        },
        {
          name: "Listings",
          href: "/listings",
          tab: "/app/listings",
          icon: <Home width={18} />,
        },
        {
          name: "Settings",
          href: "/settings",
          tab: "/app/settings",
          icon: <Settings width={18} />,
        },
      ];
    }
  }, [router]);

  return (
    <>
      <button
        className="fixed top-4 right-4 z-20 bg-stone-200/30 rounded-md p-2 sm:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
            <Link
              href="/"
              className="rounded-lg p-1.5 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4.5"
                  y="3.75"
                  width="6"
                  height="22.5"
                  rx="0.75"
                  fill="url(#paint0_linear_43_32)"
                />
                <rect
                  x="11.25"
                  y="3.75"
                  width="6"
                  height="22.5"
                  rx="0.75"
                  fill="url(#paint1_linear_43_32)"
                />
                <rect
                  x="17.25"
                  y="3.77405"
                  width="6"
                  height="22.5"
                  rx="0.75"
                  transform="rotate(-7.41161 17.25 3.77405)"
                  fill="url(#paint2_linear_43_32)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_43_32"
                    x1="7.5"
                    y1="3.75"
                    x2="7.5"
                    y2="26.25"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF23B4" stopOpacity="0.89" />
                    <stop offset="1" stopColor="#FFADE3" stopOpacity="0.63" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_43_32"
                    x1="14.25"
                    y1="3.75"
                    x2="14.25"
                    y2="26.25"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF23B4" stopOpacity="0.89" />
                    <stop offset="1" stopColor="#FFADE3" stopOpacity="0.63" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_43_32"
                    x1="20.25"
                    y1="3.77405"
                    x2="20.25"
                    y2="26.2741"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF23B4" stopOpacity="0.89" />
                    <stop offset="1" stopColor="#FFADE3" stopOpacity="0.63" />
                  </linearGradient>
                </defs>
              </svg>
            </Link>
          </div>
          <div className="grid gap-1">
            {tabsToRender.map(({ name, href, icon, tab }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  router.pathname === tab
                    ? "bg-stone-200 text-black dark:bg-stone-700"
                    : ""
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="grid gap-1">
            {/* {externalLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <p>↗</p>
              </a>
            ))} */}
          </div>
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
};

export default Nav;
