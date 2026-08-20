"use client";

import { Card } from "@/components/ui/card";
import { Bot, Code, Database } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const About = () => {
  const { ref, inView } = useInView();

  const highlights = [
    {
      icon: Code,
      title: "Software Development",
      description:
        "Creating responsive and interactive applications with React, TypeScript, and modern frameworks.",
    },
    {
      icon: Bot,
      title: "AI Engineering",
      description:
        "Building intelligent systems with LangChain, LLMs, and AI-powered features for real-world products.",
    },
    {
      icon: Database,
      title: "Full-Stack Solutions",
      description:
        "End-to-end development from concept to deployment with scalable APIs and robust backends.",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-secondary/40"
      style={{ zIndex: 1 }}
    >
      <div
        className={cn(
          "container mx-auto max-w-6xl section-reveal",
          inView && "visible"
        )}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate Software Developer and AI Engineer with expertise in
            building modern, intelligent applications. I love turning complex
            problems into simple, beautiful, and intuitive solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {highlights.map((highlight, index) => (
            <Card
              key={index}
              className="gradient-card border-border/80 hover:border-primary/40 transition-smooth p-6 group hover:shadow-glow hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-smooth">
                  <highlight.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{highlight.title}</h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
