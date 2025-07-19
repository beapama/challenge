import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    console.log("Generated profile data:", data);
    setProfile({ ...data, emails: [], poc: []} as CompanyProfile);
    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto mt-10 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Generate Company Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter company website (e.g. https://acme.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </Button>
        </CardContent>
      </Card>

      {profile && <ProfileCard profile={profile} setProfile={setProfile} />}
    </main>
  );
}
