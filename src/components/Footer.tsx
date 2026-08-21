"use client";

import { Github, Linkedin, Facebook, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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

  return (
    <footer
      className="border-t border-primary/10 py-10 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm"
      style={{ zIndex: 1, position: "relative" }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>© {currentYear}, Linn Myat Maung. Made with</span>
          </div>

          <div className="flex items-center gap-4">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
