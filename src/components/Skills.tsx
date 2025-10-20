import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
        "JavaScript",
        "Redux",
        "Vue.js",
      ],
    },
    {
      category: "Backend",
      skills: [
        "Node.js",
        "Express",
        "Python",
        "Django",
        "Sprong BootI",
        "REST APIs",
        "GraphQL",
        "Microservices",
      ],
    },
    {
      category: "Database & Cloud",
      skills: [
        "PostgreSQL",
        "MongoDB",
        "MySQL",
        "Redis",
        "AWS",
        "Docker",
        "Kubernetes",
        "Firebase",
      ],
    },
    {
      category: "Tools & Others",
      skills: [
        "Git",
        "GitHub",
        "CI/CD",
        "Jest",
        "Webpack",
        "Vite",
        "Linux",
        "Agile",
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable web
            applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary mb-6">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className="text-base px-4 py-2 bg-card hover:bg-primary/20 hover:border-primary transition-smooth cursor-default"
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
