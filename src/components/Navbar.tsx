"use client";

import { Github, Linkedin, Facebook, FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    "https://drive.google.com/file/d/1qIoG2ElEVUyAtDFY6kgGn8Jz0iJEtVLW/view?usp=drive_link";

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
            <span className="text-xl sm:text-2xl font-bold text-gradient">
              LMM
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("about")} className={navLinkClass}>
              About
            </button>
            <button onClick={() => scrollToSection("skills")} className={navLinkClass}>
              Skills
            </button>
            <button onClick={() => scrollToSection("projects")} className={navLinkClass}>
              Projects
            </button>
            <button onClick={() => scrollToSection("contact")} className={navLinkClass}>
              Contact
            </button>
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
              <button
                onClick={() => scrollToSection("about")}
                className="text-foreground hover:text-primary transition-smooth text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="text-foreground hover:text-primary transition-smooth text-left"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-foreground hover:text-primary transition-smooth text-left"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-foreground hover:text-primary transition-smooth text-left"
              >
                Contact
              </button>

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
