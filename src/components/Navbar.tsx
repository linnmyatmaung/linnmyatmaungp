"use client";

import { Github, Linkedin, Facebook, FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const homeLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
] as const;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBackground = pathname === "/background";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [isHome]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/linnmyatmaung", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/linn-myat-maung-48b4a8355/",
      label: "LinkedIn",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/linn.myat.maung.662240",
      label: "Facebook",
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const cvLink =
    "https://drive.google.com/file/d/1N2ECfP55KZ-kiwAE2zZ737WzcVj52zTm";

  const navLinkClass =
    "text-foreground/80 hover:text-primary transition-smooth relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 transition-all duration-300",
        scrolled
          ? "glass-nav shadow-soft py-0"
          : "bg-white/72 backdrop-blur-md border-b border-primary/10 shadow-soft",
      )}
      style={{ zIndex: 50 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-gradient">
              LMM
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {homeLinks.map((link) =>
              isHome ? (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={navLinkClass}
                >
                  {link.label}
                </button>
              ) : (
                <Link key={link.id} href={`/#${link.id}`} className={navLinkClass}>
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/background"
              className={cn(navLinkClass, isBackground && "text-primary after:w-full")}
            >
              Background
            </Link>
            {isHome ? (
              <button onClick={() => scrollToSection("contact")} className={navLinkClass}>
                Contact
              </button>
            ) : (
              <Link href="/#contact" className={navLinkClass}>
                Contact
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary hover:scale-110 transition-smooth"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}

            <a href={cvLink} target="_blank" rel="noopener noreferrer">
              <Button className="gradient-primary text-white hover:opacity-90 transition-smooth shadow-glow rounded-full">
                <FileText className="h-4 w-4 mr-2" />
                View CV
              </Button>
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-smooth"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/10 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {homeLinks.map((link) =>
                isHome ? (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-foreground hover:text-primary transition-smooth text-left"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.id}
                    href={`/#${link.id}`}
                    className="text-foreground hover:text-primary transition-smooth text-left"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                href="/background"
                className={cn(
                  "text-foreground hover:text-primary transition-smooth text-left",
                  isBackground && "text-primary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Background
              </Link>
              {isHome ? (
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-foreground hover:text-primary transition-smooth text-left"
                >
                  Contact
                </button>
              ) : (
                <Link
                  href="/#contact"
                  className="text-foreground hover:text-primary transition-smooth text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              )}

              <div className="flex items-center space-x-4 pt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-smooth"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              <a href={cvLink} target="_blank" rel="noopener noreferrer">
                <Button className="gradient-primary text-white hover:opacity-90 transition-smooth shadow-glow w-full rounded-full">
                  <FileText className="h-4 w-4 mr-2" />
                  View CV
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
