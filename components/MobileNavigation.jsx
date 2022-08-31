import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Dialog } from "@headlessui/react";
import Logo from "./icons/Logo";
import MenuIcon from "./icons/MenuIcon";
import CloseIcon from "./icons/CloseIcon";
import links from "../data/data";
import Link from "next/link";
import { clsx } from "clsx";

export default function MobileNavigation() {
  let router = useRouter();
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function onRouteChange() {
      setIsOpen(false);
    }

    router.events.on("routeChangeComplete", onRouteChange);
    router.events.on("routeChangeError", onRouteChange);

    return () => {
      router.events.off("routeChangeComplete", onRouteChange);
      router.events.off("routeChangeError", onRouteChange);
    };
  }, [router, isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative"
        aria-label="Open navigation"
      >
        <MenuIcon className="h-6 w-6 stroke-black mt-2" />
      </button>
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        className="fixed inset-0 z-50 bg-black/40 flex items-start overflow-y-auto pr-10 backdrop-blur sm:hidden"
        aria-label="Navigation"
      >
        <Dialog.Panel className="min-h-full w-full max-w-xs bg-darkYellow px-4 pt-5 pb-12 sm:px-6 z-20">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation"
            >
              <CloseIcon className="h-6 w-6 stroke-black" />
            </button>
            <Logo className="h-9 w-16" />
          </div>
          <dl className="mt-6 ml-4 space-y-4 font-medium text-xl">
            {links.map((link) => (
              <dt
                key={link.pageTitle}
                className="text-xl text-left w-full flex justify-between items-start"
              >
                <Link href={link.url}>
                  <a
                    className={clsx(
                      link.url === router.pathname
                        ? "font-semibold text-dark border-b-4 border-black no-underline"
                        : "text-gray-800 hover:text-black hover:scale-110 no-underline"
                    )}
                  >
                    {link.pageTitle}
                  </a>
                </Link>
              </dt>
            ))}
          </dl>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
