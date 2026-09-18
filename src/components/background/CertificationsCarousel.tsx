"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import { formatDateRange, type Certification } from "@/lib/background";

type CertificationsCarouselProps = {
  items: Certification[];
};

const DEFAULT_CERT_NAME = "cursor ai hackathon";

const CertificationsCarousel = ({ items }: CertificationsCarouselProps) => {
  const { ref, inView } = useInView();
  const defaultIndex = useMemo(() => {
    const index = items.findIndex((item) =>
      item.name.toLowerCase().includes(DEFAULT_CERT_NAME)
    );
    return index >= 0 ? index : 0;
  }, [items]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(defaultIndex);

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
      id="certifications"
      ref={ref}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative"
      style={{ zIndex: 1 }}
    >
      <div
        className={cn(
          "container mx-auto max-w-6xl section-reveal",
          inView && "visible"
        )}
      >
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Certificates and awards — swipe to preview each file
          </p>
        </div>

        <div className="relative px-4 sm:px-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
              dragFree: false,
              startIndex: defaultIndex,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {items.map((item, index) => (
                <CarouselItem
                  key={`${item.name}-${item.startedOn}`}
                  className="pl-2 md:pl-4 basis-full md:basis-[80%] lg:basis-[70%]"
                >
                  <Card
                    className={cn(
                      "gradient-card border-border/80 overflow-hidden transition-all duration-500 group bg-white/90 backdrop-blur-sm",
                      current === index
                        ? "relative z-10 border-primary shadow-glow scale-[1.02] opacity-100"
                        : "opacity-55 scale-[0.94] hover:opacity-80"
                    )}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {item.isDrive && item.previewUrl ? (
                        <iframe
                          src={item.previewUrl}
                          title={`${item.name} certificate preview`}
                          className={cn(
                            "absolute inset-0 h-full w-full border-0",
                            current !== index && "pointer-events-none"
                          )}
                          allow="autoplay"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-primary/5 px-6 text-center">
                          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Award className="h-8 w-8 text-primary" />
                          </div>
                          <p className="text-muted-foreground max-w-sm">
                            This credential opens on an external verifier rather than a Drive file.
                          </p>
                        </div>
                      )}
                    </div>

                    <CardHeader>
                      <CardTitle className="text-2xl group-hover:text-primary transition-smooth">
                        {item.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-base">
                        {item.authority}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {item.startedOn ? (
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {formatDateRange(item.startedOn, item.finishedOn)}
                          </Badge>
                        ) : null}
                        {item.licenseNumber ? (
                          <Badge
                            variant="secondary"
                            className="bg-secondary text-muted-foreground border-border"
                          >
                            {item.licenseNumber}
                          </Badge>
                        ) : null}
                      </div>

                      {item.url ? (
                        <Button
                          className="w-full gradient-primary text-white hover:opacity-90 transition-smooth"
                          asChild
                        >
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open certificate
                          </a>
                        </Button>
                      ) : null}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-0 sm:-left-4 border-primary/20 bg-white/90 backdrop-blur-sm hover:bg-primary/10 hover:border-primary text-primary shadow-soft" />
            <CarouselNext className="right-0 sm:-right-4 border-primary/20 bg-white/90 backdrop-blur-sm hover:bg-primary/10 hover:border-primary text-primary shadow-soft" />
          </Carousel>

          <div className="flex justify-center flex-wrap gap-2 mt-8">
            {items.map((item, index) => (
              <button
                key={`${item.name}-dot`}
                type="button"
                aria-label={`Go to ${item.name}`}
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

export default CertificationsCarousel;
