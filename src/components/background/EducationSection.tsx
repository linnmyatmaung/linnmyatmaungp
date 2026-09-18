"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useInView } from "@/hooks/use-in-view";
import { formatDateRange, type Education } from "@/lib/background";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

type EducationSectionProps = {
  items: Education[];
};

const EducationSection = ({ items }: EducationSectionProps) => {
  const { ref, inView } = useInView();

  return (
    <section
      id="education"
      ref={ref}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative"
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
            <span className="text-gradient">Education</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic foundations in engineering and computer science
          </p>
        </div>

        <div className="relative space-y-6">
          <div className="absolute left-6 top-4 bottom-4 w-px bg-primary/20 hidden sm:block" />

          {items.map((item, index) => (
            <Card
              key={`${item.school}-${item.degree}`}
              className="gradient-card border-border/80 hover:border-primary/40 transition-smooth p-6 sm:pl-8 group hover:shadow-glow hover:-translate-y-1 bg-white/80 backdrop-blur-sm relative sm:ml-6"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute -left-9 top-7 hidden sm:flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 bg-white shadow-soft">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-white border border-border/70 overflow-hidden flex items-center justify-center shadow-soft group-hover:scale-105 transition-smooth">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt={`${item.school} logo`}
                      width={64}
                      height={64}
                      className={cn(
                        "h-full w-full",
                        item.logo.includes("utycc")
                          ? "object-cover"
                          : "object-contain p-1"
                      )}
                    />
                  ) : (
                    <GraduationCap className="h-7 w-7 text-primary" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-primary mb-1">
                    {formatDateRange(item.startDate, item.endDate)}
                  </p>
                  <h3 className="text-xl font-semibold mb-1">{item.degree}</h3>
                  <p className="text-muted-foreground">{item.school}</p>
                  {item.notes ? (
                    <p className="text-sm text-muted-foreground mt-2">{item.notes}</p>
                  ) : null}
                  {item.activities ? (
                    <p className="text-sm text-muted-foreground mt-2">{item.activities}</p>
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

export default EducationSection;
