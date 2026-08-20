"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";


const Contact = () => {
  const { ref, inView } = useInView();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If EmailJS is not configured, fallback to mailto
    if (!serviceId || !templateId || !publicKey) {
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.open(
        `mailto:linnmyatmaung03@gmail.com?subject=${subject}&body=${body}`,
        "_blank"
      );
      toast({
        title: "Opening Email Client",
        description:
          "Your email client will open with the message pre-filled. EmailJS keys not set — see .env.local.example.",
      });
      setFormData({ name: "", email: "", message: "" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Message could not be sent");

      toast({
        title: "✅ Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast({
        title: "❌ Failed to Send",
        description:
          "Something went wrong. Please email me directly at linnmyatmaung03@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "linnmyatmaung03@gmail.com",
      href: "mailto:linnmyatmaung03@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+959 696265132",
      href: "tel:+959696265132",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Yangon, Myanmar",
      href: "https://maps.google.com/?q=Yangon,Myanmar",
    },
  ];

  return (
    <section
      id="contact"
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
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* ── Contact Form ── */}
          <Card className="gradient-card border-border/80 p-6 lg:p-8 bg-white/90 shadow-soft">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  disabled={isLoading}
                  className="bg-white border-border focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  disabled={isLoading}
                  className="bg-white border-border focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  disabled={isLoading}
                  rows={6}
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full gradient-primary text-white hover:opacity-90 transition-smooth shadow-glow text-lg py-6 rounded-full gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* ── Contact Info ── */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="gradient-card border-border/80 hover:border-primary/40 transition-smooth p-6 group hover:shadow-glow bg-white/90 hover:-translate-y-1"
              >
                <a
                  href={info.href}
                  className="flex items-start gap-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-smooth">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{info.label}</h3>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </a>
              </Card>
            ))}

            <Card className="gradient-card border-border/80 p-6 bg-white/90 shadow-soft">
              <h3 className="font-semibold text-lg mb-3">Let&apos;s Work Together</h3>
              <p className="text-muted-foreground">
                I&apos;m always interested in hearing about new projects and
                opportunities. Whether you have a question or just want to say
                hi, I&apos;ll try my best to get back to you!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
