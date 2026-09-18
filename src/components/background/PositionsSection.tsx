"use client";

import { Card } from "@/components/ui/card";
import { useInView } from "@/hooks/use-in-view";
import { formatDateRange, type Position } from "@/lib/background";
import { cn } from "@/lib/utils";
import { Briefcase, MapPin } from "lucide-react";

type PositionsSectionProps = {
  items: Position[];
};

const PositionsSection = ({ items }: PositionsSectionProps) => {
  const { ref, inView } = useInView();

  return (
    <section
      id="positions"
      ref={ref}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative bg-secondary/40"
      style={{ zIndex: 1 }}
    >
      <div
        className={cn(
          "container mx-auto max-w-4xl section-reveal",
          inView && "visible"
        )}
      >
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Roles where I built and managed web products
          </p>
        </div>

        <div className="relative space-y-6">
          <div className="absolute left-6 top-4 bottom-4 w-px bg-primary/20 hidden sm:block" />

          {items.map((item, index) => (
            <Card
              key={`${item.company}-${item.title}`}
              className="gradient-card border-border/80 hover:border-primary/40 transition-smooth p-6 sm:pl-8 group hover:shadow-glow hover:-translate-y-1 bg-white/80 backdrop-blur-sm relative sm:ml-6"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute -left-9 top-7 hidden sm:flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 bg-white shadow-soft">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-smooth">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-primary mb-1">
                    {formatDateRange(item.startedOn, item.finishedOn)}
                  </p>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.company}</p>
                  {item.location ? (
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </p>
                  ) : null}
                  {item.description ? (
                    <p className="text-muted-foreground mt-3">{item.description}</p>
                  ) : null}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PositionsSection;
