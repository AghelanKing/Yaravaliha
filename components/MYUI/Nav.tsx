"use client";

import Link from "next/link";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { IoSearch } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "صفحه اصلی", href: "/" },
  { label: "محصولات", href: "/products" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

function Nav() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-3 flex justify-center w-full z-60">
      <div className="flex items-center justify-between px-5 border rounded-2xl w-[70%] bg-gray-200/30 backdrop-blur-xl">
        <div className="p-2">
          <Logo width={50} height={50} />
        </div>
        <ul className="flex gap-x-2">
          {navLinks.map((link) => (
            <Link
              className={`p-2 animateLi hover:text-primary ${pathname === link.href ? "active text-primary" : ""}`}
              href={link.href}
              key={link.label}
            >
              <li>{link.label}</li>
            </Link>
          ))}
        </ul>
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-lg text-foreground hover:bg-secondary"
            aria-label="جست‌وجو"
          >
            <IoSearch className="size-5!" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-lg text-foreground hover:bg-secondary"
            aria-label="سبد خرید"
          >
            <AiOutlineShoppingCart className="size-5!" />
          </Button>

          <Link href={"/login"}>
            <Button
              variant="outline"
              className="h-9 gap-2 rounded-lg border-primary/25 px-3.5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <HiOutlineUser className="size-5!" />
              ورود و عضویت
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
