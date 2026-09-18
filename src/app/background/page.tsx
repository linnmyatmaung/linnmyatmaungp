import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeBackground from "@/components/ThreeBackground";
import Chatbot from "@/components/Chatbot";
import EducationSection from "@/components/background/EducationSection";
import PositionsSection from "@/components/background/PositionsSection";
import CertificationsCarousel from "@/components/background/CertificationsCarousel";
import {
  loadCertifications,
  loadEducation,
  loadPositions,
} from "@/lib/load-background";

export const metadata: Metadata = {
  title: "Background | Linn Myat Maung",
  description:
    "Education, professional experience, and certifications of Linn Myat Maung — Software Developer and AI Engineer.",
};

export default function BackgroundPage() {
  const education = loadEducation();
  const positions = loadPositions();
  const certifications = loadCertifications();

  return (
    <main className="min-h-screen">
      <ThreeBackground />
      <Navbar />

      <header
        className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 relative text-center"
        style={{ zIndex: 1 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          My <span className="text-gradient">Background</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Education, roles, and certificates that shaped my path as a software
          developer and AI engineer.
        </p>
      </header>

      <EducationSection items={education} />
      <PositionsSection items={positions} />
      <CertificationsCarousel items={certifications} />
      <Footer />
      <Chatbot />
    </main>
  );
}
