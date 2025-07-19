
import { CompanyProfile } from "@/app/types/profile";

export async function fetchCompanyProfileFromGPT(url: string): Promise<Partial<CompanyProfile>> {
  const res = await fetch("/api/generate-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile from API");
  }

  const { profile } = await res.json();
  return profile;
}