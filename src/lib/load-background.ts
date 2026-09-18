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

export function loadEducation(): Education[] {
  return readCsv("Education.csv")
    .map((row) => ({
      school: row["School Name"] ?? "",
      startDate: row["Start Date"] ?? "",
      endDate: row["End Date"] ?? "",
      notes: row["Notes"] ?? "",
      degree: row["Degree Name"] ?? "",
      activities: row["Activities"] ?? "",
    }))
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

export function loadPositions(): Position[] {
  return readCsv("Positions.csv")
    .map((row) => ({
      company: row["Company Name"] ?? "",
      title: row["Title"] ?? "",
      description: row["Description"] ?? "",
      location: row["Location"] ?? "",
      startedOn: row["Started On"] ?? "",
      finishedOn: row["Finished On"] ?? "",
    }))
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
