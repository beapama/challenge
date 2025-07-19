import EditableKeywordList from "./EditableKeywordList";
import MultiEmailInput from "./MultiEmailInput";
import MultiPOClInput from "./MultiContactInput";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CompanyProfile } from "@/app/types/profile";

type Props = {
  profile: CompanyProfile;
  setProfile: (profile: CompanyProfile) => void;
};

export default function ProfileCard({ profile, setProfile }: Props) {
  console.log("DEBUG: profile", profile);

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{profile.company_name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          value={profile.company_description}
          onChange={(e) =>
            setProfile({ ...profile, company_description: e.target.value })
          }
        />

        <EditableKeywordList
          label="Tier 1 Keywords"
          keywords={profile.tier1_keywords}
          setKeywords={(k) => setProfile({ ...profile, tier1_keywords: k })}
        />

        <EditableKeywordList
          label="Tier 2 Keywords"
          keywords={profile.tier2_keywords}
          setKeywords={(k) => setProfile({ ...profile, tier2_keywords: k })}
        />

        <MultiPOClInput
          contacts={profile.poc}
          setContacts={(poc) => setProfile({ ...profile, poc })}
        />

        <MultiEmailInput
          emails={profile.emails}
          setEmails={(emails) => setProfile({ ...profile, emails })}
        />

        <EditableKeywordList
          label="Service Lines"
          keywords={profile.service}
          setKeywords={(lines) => setProfile({ ...profile, service: lines })}
        />
      </CardContent>
    </Card>
  );
}