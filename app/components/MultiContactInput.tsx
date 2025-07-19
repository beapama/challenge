import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Props {
  contacts: string[];
  setContacts: (contacts: string[]) => void;
}

export default function MultiContactInput({ contacts, setContacts }: Props) {
  const [contactInput, setContactInput] = useState("");

  const addContact = () => {
    if (!contacts.includes(contactInput)) {
      setContacts([...contacts, contactInput]);
      setContactInput("");
    }
  };

  const removeContact = (index: number) => {
    const updated = [...contacts];
    updated.splice(index, 1);
    setContacts(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addContact();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Point of Contact</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {contacts.map((contact, i) => (
          <Badge key={i} variant="outline" className="flex items-center gap-1">
            {contact}
            <X className="h-3 w-3 cursor-pointer" onClick={() => removeContact(i)} />
          </Badge>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <Input
          value={contactInput}
          onChange={(e) => setContactInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add contact"
        />
        <Button variant="outline" onClick={addContact}>
          Add
        </Button>
      </div>
    </div>
  );
}
