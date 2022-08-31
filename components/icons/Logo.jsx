/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

export default function Logo(props) {
  return (
    <div {...props}>
      <Link href="/" aria-label="Home page" passHref>
        <img
          className="w-full h-full p-1 cursor-pointer"
          src="/favicon.jpg"
          alt="Boat Used Part Search logo"
          layout="fill"
        />
      </Link>
    </div>
  );
}
