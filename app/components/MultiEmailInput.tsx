import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Props {
  emails: string[];
  setEmails: (emails: string[]) => void;
}

export default function MultiEmailInput({ emails, setEmails }: Props) {
  const [emailInput, setEmailInput] = useState("");

  const addEmail = () => {
    if (emailInput.includes("@") && !emails.includes(emailInput)) {
      setEmails([...emails, emailInput]);
      setEmailInput("");
    }
  };

  const removeEmail = (index: number) => {
    const updated = [...emails];
    updated.splice(index, 1);
    setEmails(updated);
  };

  return (
    <div>
      <strong>Emails</strong>
      <div className="flex flex-wrap gap-2 mt-2">
        {emails.map((email, i) => (
          <Badge key={i} variant="outline" className="flex items-center gap-1">
            {email}
            <X className="h-3 w-3 cursor-pointer" onClick={() => removeEmail(i)} />
          </Badge>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <Input
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Add email"
        />
        <Button variant="outline" onClick={addEmail}>
          Add
        </Button>
      </div>
    </div>
  );
}
