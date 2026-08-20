"use client";

import { Badge } from "@/components/ui/badge";
import skillCategories from "@/data/skills.json";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const Skills = () => {
  const { ref, inView } = useInView();

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
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
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern software and AI-powered
            applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="space-y-4 p-6 rounded-2xl bg-white/70 border border-primary/10 shadow-soft hover:shadow-glow transition-smooth hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold text-primary mb-6">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className="text-base px-4 py-2 bg-primary/5 text-foreground border border-primary/15 hover:bg-primary/15 hover:border-primary/30 hover:scale-105 transition-smooth cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
