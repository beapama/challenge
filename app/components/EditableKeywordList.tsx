import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface EditableKeywordListProps {
  label: string;
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

export default function EditableKeywordList({
  label,
  keywords,
  setKeywords,
}: EditableKeywordListProps) {
  const [inputValue, setInputValue] = useState("");

  const addKeyword = () => {
    if (inputValue.trim()) {
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeKeyword = (index: number) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  return (
    <div>
      <strong>{label}</strong>
      <div className="flex flex-wrap gap-2 mt-2">
        {keywords.map((keyword, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {keyword}
            <X className="h-3 w-3 cursor-pointer" onClick={() => removeKeyword(index)} />
          </Badge>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add keyword"
        />
        <Button onClick={addKeyword} variant="outline">
           Add
        </Button>
      </div>
    </div>
  );
}
