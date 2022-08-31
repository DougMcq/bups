import Link from "next/link";
import { useRouter } from "next/router";
import { clsx } from "clsx";
import links from "../data/data";

export default function Navigation() {
  let router = useRouter();

  return (
    <nav className={clsx("text-sm lg:text-base py-0 my-0")}>
      <ul role="list" className="flex flex-row space-x-3 items-center pr-3">
        {links.map((link) => (
          <li
            key={link.pageTitle}
            className={clsx(
              link.url === router.pathname
                ? "font-bold text-dark border-r-4 sm:border-r-0 sm:border-b-4 border-black underline sm:no-underline flex pl-2 sm:pl-0"
                : "text-gray-800 hover:text-black hover:scale-110 flex"
            )}
          >
            <Link href={link.url}>
              <a className="no-underline">{link.pageTitle}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
