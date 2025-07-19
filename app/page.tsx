"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { fetchCompanyProfileFromGPT } from "@/app/services/gptService";
import { CompanyProfile } from "@/app/types/profile";
import ProfileCard from "@/app/components/ProfileCard";

export default function Home() {
  const [url, setUrl] = useState("");
  const [profile, setProfile] =  useState<CompanyProfile>({
    company_name: "",
    company_description: "",
    service: [],
    tier1_keywords: [],
    tier2_keywords: [],
    poc: [],
    emails: [],
  });
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const data = await fetchCompanyProfileFromGPT(url);
    setProfile({ ...data, emails: [], poc: []} as CompanyProfile);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-5 px-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Generate Company Profile</h1>

      <Card className="p-4">
        <div className="flex gap-2">
          <Input
            className="flex-1 rounded-r-none"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            onClick={handleGenerate}
            className="rounded-l-none"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Generate"}
          </Button>
        </div>
      </Card>

      {profile && (
        <>
          <ProfileCard profile={profile} setProfile={setProfile} />
        </>
      )}
    </div>
  );
}