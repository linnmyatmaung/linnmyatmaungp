import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const projects = [
    {
      title: "Personal Chatbot with LangChain",
      description:
        "A personal chatbot web app with real-time conversation, memory, and customizable prompts, featuring an admin dashboard for management.",
      tech: ["LangChain", "React", "Express.js", "MySQL", "Socket.io"],
      github: "https://github.com/linnmyatmaung/Generative_AI",
      live: "https://github.com/linnmyatmaung/Generative_AI",
    },
    {
      title: "Bus Management System & Digital E-ticket Purchasing",
      description:
        "A bus ticketing and management system with real-time booking, route management, and AI chatbot support.",
      tech: ["Spring Boot", "React", "Python", "MySQL"],
      github: "https://github.com/linnmyatmaung/triphub_thymeleaf",
      live: "https://triphubbusticket.vercel.app/",
    },
    {
      title: "Scannova: QR/Barcode Card System",
      description:
        "A secure QR/barcode-powered platform for ID card generation, scanning, and real-time verification.",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/linnmyatmaung/SmartEvent",
      live: "https://drive.google.com/file/d/1C-LYLwZl-a1rUQ3QIyWclWLiZEQNVFd0/view",
    },
    {
      title: "UTYCC King/Queen Voting System",
      description:
        "A web-based voting platform with an admin dashboard to manage agendas and view real-time results.",
      tech: [
        "TypeScript",
        "Express.js",
        "TypeORM",
        "React",
        "Socket.io",
        "JWT",
        "MySQL",
        "Cloudinary",
      ],
      github: "https://github.com/linnmyatmaung/utycc-welcome",
      live: "https://github.com/linnmyatmaung/utycc-welcome",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing my skills and experience in
            full-stack development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="gradient-card border-border hover:border-primary transition-smooth group hover:shadow-glow"
            >
              <CardHeader>
                <CardTitle className="text-2xl group-hover:text-primary transition-smooth">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tech Stack */}
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

                {/* Action Buttons */}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
