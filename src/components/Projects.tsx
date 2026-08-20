"use client";

import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import projects from "@/data/projects.json";
import { useInView } from "@/hooks/use-in-view";

const Projects = () => {
  const { ref, inView } = useInView();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setCurrent(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section
      id="projects"
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
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing my skills in software development
            and AI engineering
          </p>
        </div>

        <div className="relative px-4 sm:px-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
              dragFree: false,
            }}
            plugins={[
              Autoplay({
                delay: 4500,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-[45%]"
                >
                  <Card
                    className={cn(
                      "gradient-card border-border/80 overflow-hidden transition-all duration-500 group bg-white/90 backdrop-blur-sm",
                      current === index
                        ? "border-primary/50 shadow-glow scale-[1.02]"
                        : "opacity-75 scale-[0.97] hover:opacity-90"
                    )}
                  >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <Image
                        src={project.thumbnail}
                        alt={`${project.title} thumbnail`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 520px"
                      />
                      {/* Fallback gradient thumbnail since all use same image */}
                      <div className="hidden">
                        <div className="text-center p-4">
                          <div className="text-4xl mb-2">🚀</div>
                          <p className="text-sm text-muted-foreground font-medium">
                            {project.title}
                          </p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                    </div>

                    <CardHeader>
                      <CardTitle className="text-2xl group-hover:text-primary transition-smooth">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-base line-clamp-3">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          variant="outline"
                          className="flex-1 border-primary text-primary hover:bg-primary/10 transition-smooth"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                        <Button
                          className="flex-1 gradient-primary text-white hover:opacity-90 transition-smooth"
                          asChild
                        >
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-0 sm:-left-4 border-primary/20 bg-white/90 backdrop-blur-sm hover:bg-primary/10 hover:border-primary text-primary shadow-soft" />
            <CarouselNext className="right-0 sm:-right-4 border-primary/20 bg-white/90 backdrop-blur-sm hover:bg-primary/10 hover:border-primary text-primary shadow-soft" />
          </Carousel>

          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to project ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  current === index
                    ? "w-8 bg-primary shadow-glow"
                    : "w-2 bg-muted-foreground/40 hover:bg-primary/60"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
