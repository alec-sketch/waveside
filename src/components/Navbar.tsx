"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import WaveLogo from "./WaveLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/technologies", label: "Technologies" },
  { href: "/calculator", label: "Calculator" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-navy text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <WaveLogo className="w-8 h-8" />
            <span><span className="text-ocean-light">Wave</span>side</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-ocean text-white"
                    : "text-ocean-pale hover:bg-ocean/20 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile nav */}
          <div className="md:hidden flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 py-1 rounded text-xs font-medium ${
                  pathname === link.href
                    ? "bg-ocean text-white"
                    : "text-ocean-pale"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
