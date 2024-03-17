import { Globe, LayoutDashboard, Menu, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

// TO DOS IN THIS NAV
// DONE: menu button on and off
// DONE: all the tabs that should be there
// any other links that you might need
// Link to the landing page of the app (at the moment it opens a new app)

const tabs = [
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
    icon: <Globe width={18} />,
  },
  {
    name: "Settings",
    href: "/settings",
    tab: "/app/settings",
    icon: <Settings width={18} />,
  },
];

const Nav = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  return (
    <>
      <button
        className="fixed top-4 right-4 z-20 bg-stone-200/30 rounded-md p-2 sm:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu className="" />
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
              target="_blank"
              rel="noopener noreferrer"
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
                    <stop stop-color="#FF23B4" stop-opacity="0.89" />
                    <stop offset="1" stop-color="#FFADE3" stop-opacity="0.63" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_43_32"
                    x1="14.25"
                    y1="3.75"
                    x2="14.25"
                    y2="26.25"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FF23B4" stop-opacity="0.89" />
                    <stop offset="1" stop-color="#FFADE3" stop-opacity="0.63" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_43_32"
                    x1="20.25"
                    y1="3.77405"
                    x2="20.25"
                    y2="26.2741"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FF23B4" stop-opacity="0.89" />
                    <stop offset="1" stop-color="#FFADE3" stop-opacity="0.63" />
                  </linearGradient>
                </defs>
              </svg>
            </Link>
          </div>
          <div className="grid gap-1">
            {tabs.map(({ name, href, icon, tab }) => (
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
