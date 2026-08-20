"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      style={{ zIndex: 1 }}
    >
      {/* Hero gradient overlay (subtle, so 3D bg shows through) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/82 to-pink-50/78 backdrop-blur-[2px]" />

      {/* Ambient blobs */}
      <div className="absolute top-24 -left-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-16 -right-16 w-96 h-96 bg-primary-glow/16 rounded-full blur-3xl animate-blob animation-delay-300" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ──────────── WIDER gap between photo and text ──────────── */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-36 items-center max-w-6xl mx-auto">

          {/* ── Photo column ── */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-1 animate-scale-in">
            <div className="relative">
              {/* Spinning glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary via-primary-glow to-accent opacity-35 blur-md animate-spin-slow" />
              {/* Dashed border ring */}
              <div className="absolute -inset-1 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />

              {/* Profile photo */}
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white shadow-glow animate-float">
                <Image
                  src="/images/linnmyatmaung.png"
                  alt="Linn Myat Maung — Software Developer & AI Engineer"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 288px, 320px"
                />
              </div>

              {/* Availability badge */}
              <div className="absolute -bottom-3 -right-3 bg-white rounded-2xl px-4 py-2 shadow-card border border-primary/10 animate-fade-in animation-delay-500">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  Available for work
                </div>
              </div>
            </div>
          </div>

          {/* ── Text column ── */}
          <div className="text-center lg:text-left order-2 lg:order-2 lg:pl-4 text-foreground drop-shadow-[0_1px_16px_rgba(255,255,255,0.9)]">
            <p className="inline-flex items-center gap-2 text-primary font-semibold mb-6 px-4 py-1.5 rounded-full bg-white/85 border border-primary/20 shadow-soft animate-fade-in-up opacity-0">
              Hello, I&apos;m Linn Myat Maung
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight tracking-tight animate-fade-in-up opacity-0 animation-delay-100">
              Software Developer
              <br />
              <span className="text-gradient">/ AI Engineer</span>
            </h1>

            <p className="text-lg sm:text-xl text-foreground/75 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up opacity-0 animation-delay-200">
              Building intelligent software and AI-powered experiences with
              modern technologies. Passionate about clean code, smart systems,
              and delightful user interfaces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up opacity-0 animation-delay-300">
              <Button
                onClick={() => scrollToSection("projects")}
                className="gradient-primary text-white hover:opacity-90 transition-smooth shadow-glow text-lg px-8 py-6 rounded-full"
              >
                View My Work
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary transition-smooth text-lg px-8 py-6 rounded-full bg-white/60 backdrop-blur-sm"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex justify-center animate-fade-in opacity-0 animation-delay-500">
          <button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-smooth group"
            aria-label="Scroll down"
          >
            <span className="text-sm tracking-widest uppercase">Scroll</span>
            <ArrowDown className="h-5 w-5 animate-bounce group-hover:text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
