import { useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const cvUrl = `${import.meta.env.BASE_URL}andrei_ciudacov_dotnet_developer.pdf`;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-4 glass" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="text-xl font-medium tracking-tight text-white hover:text-white/80 transition-colors">
          Andrei.
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="md:hidden text-white"
              aria-label="Open navigation menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="border-white/10 bg-background/95 px-6 pt-16 text-white backdrop-blur-xl"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Open the mobile navigation menu.</SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.name}>
                  <a
                    href={link.href}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.name}
                  </a>
                </SheetClose>
              ))}

              <SheetClose asChild>
                <a
                  href={cvUrl}
                  download
                  className="mt-4 rounded-2xl bg-white px-5 py-4 text-base font-medium text-black transition-colors hover:bg-white/90"
                >
                  Download CV
                </a>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
