import { Notebook, Phone, Map } from "lucide-react";

const NavMenu = () => {
  return (
    <nav className="text-center flex">
      <ul className="flex gap-2 m-auto">
        <li className="rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800 flex gap-1">
          <Notebook width={18} />
          <a href="#house-guides">House guides</a>
        </li>
        <li className="rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800 flex gap-1">
          <Map width={18} />
          <a href="#local-guides">Local guides</a>
        </li>
        {/* <li className="rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800 flex gap-1">
          <Phone width={18} />
          <a href="#contact">Contact</a>
        </li> */}
      </ul>
    </nav>
  );
};

export default NavMenu;
