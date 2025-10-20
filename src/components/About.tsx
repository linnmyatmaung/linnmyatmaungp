import { Card } from "@/components/ui/card";
import { Code, Database, Globe } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces with React, TypeScript, and modern CSS frameworks.",
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Building scalable APIs and services with Node.js, Express, and various database solutions.",
    },
    {
      icon: Globe,
      title: "Full Stack Solutions",
      description: "End-to-end development from concept to deployment, ensuring seamless integration and performance.",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate full-stack developer with expertise in building modern web applications.
            I love turning complex problems into simple, beautiful, and intuitive solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {highlights.map((highlight, index) => (
            <Card
              key={index}
              className="gradient-card border-border hover:border-primary transition-smooth p-6 group hover:shadow-glow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
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
