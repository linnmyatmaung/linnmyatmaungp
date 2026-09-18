import { readFileSync } from "fs";
import { join } from "path";
import { isValid, parse as parseDate } from "date-fns";
import { parseCsv } from "@/lib/csv";
import { getDrivePreviewUrl } from "@/lib/drive";
import type { Certification, Education, Position } from "@/lib/background";

function readCsv(filename: string): Record<string, string>[] {
  const path = join(process.cwd(), "src", "data", filename);
  return parseCsv(readFileSync(path, "utf8"));
}

function monthYearValue(value: string): number {
  if (!value) return 0;
  const date = parseDate(value, "MMM yyyy", new Date());
  return isValid(date) ? date.getTime() : 0;
}

function educationLogo(school: string): string | null {
  const name = school.toLowerCase();
  if (name.includes("people")) return "/images/education/uopeople.png";
  if (
    name.includes("yatanarpon") ||
    name.includes("yadanabon") ||
    name.includes("cyber city") ||
    name.includes("utycc")
  ) {
    return "/images/education/utycc.png";
  }
  return null;
}

export function loadEducation(): Education[] {
  return readCsv("Education.csv")
    .map((row) => {
      const school = row["School Name"] ?? "";
      return {
        school,
        startDate: row["Start Date"] ?? "",
        endDate: row["End Date"] ?? "",
        notes: row["Notes"] ?? "",
        degree: row["Degree Name"] ?? "",
        activities: row["Activities"] ?? "",
        logo: educationLogo(school),
      };
    })
    .filter((item) => item.school)
    .sort((a, b) => {
      const aPinned = a.degree.toLowerCase().includes("bachelor of engineering")
        ? 0
        : 1;
      const bPinned = b.degree.toLowerCase().includes("bachelor of engineering")
        ? 0
        : 1;
      if (aPinned !== bPinned) return aPinned - bPinned;
      return monthYearValue(b.startDate) - monthYearValue(a.startDate);
    });
}

function positionLogo(company: string): string | null {
  const name = company.toLowerCase();
  if (name.includes("healthy") || name.includes("happy")) {
    return "/images/positions/hnh.png";
  }
  if (name.includes("asean youth") || name.includes("ayo")) {
    return "/images/positions/ayo.png";
  }
  if (name.includes("galaxy")) {
    return "/images/positions/galaxy.png";
  }
  return null;
}

export function loadPositions(): Position[] {
  return readCsv("Positions.csv")
    .map((row) => {
      const company = row["Company Name"] ?? "";
      return {
        company,
        title: row["Title"] ?? "",
        description: row["Description"] ?? "",
        location: row["Location"] ?? "",
        startedOn: row["Started On"] ?? "",
        finishedOn: row["Finished On"] ?? "",
        logo: positionLogo(company),
      };
    })
    .filter((item) => item.company || item.title)
    .sort((a, b) => monthYearValue(b.startedOn) - monthYearValue(a.startedOn));
}

export function loadCertifications(): Certification[] {
  return readCsv("Certifications.csv")
    .map((row) => {
      const url = row["Url"] ?? "";
      const previewUrl = getDrivePreviewUrl(url);

      return {
        name: row["Name"] ?? "",
        url,
        authority: row["Authority"] ?? "",
        startedOn: row["Started On"] ?? "",
        finishedOn: row["Finished On"] ?? "",
        licenseNumber: row["License Number"] ?? "",
        previewUrl,
        isDrive: Boolean(previewUrl),
      };
    })
    .filter((item) => item.name)
    .sort((a, b) => monthYearValue(b.startedOn) - monthYearValue(a.startedOn));
}
