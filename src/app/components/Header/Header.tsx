"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 bg-gray-800">
      <div className="container flex flex-wrap items-center justify-between gap-y-4 py-4">
        <div className="flex items-center space-x-4">
          {pathname !== "/" && (
            <Link
              href="/"
              className="rounded-md bg-gray-600 px-4 py-2 text-sm font-bold hover:bg-gray-500"
            >
              Back to Movies
            </Link>
          )}
          {pathname !== "/mylist" && (
            <Link
              href="/mylist"
              className="rounded-md bg-gray-600 px-4 py-2 text-sm font-bold hover:bg-gray-500"
            >
              My Rated Movies
            </Link>
          )}
        </div>
        {pathname === "/" && <SearchBar />}
      </div>
    </header>
  );
};

export default Header;
