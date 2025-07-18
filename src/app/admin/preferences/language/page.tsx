"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { updateUserPreferences, getUserPreferences } from "@/utils/preferences";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "zh", label: "Chinese" },
];

export default function LanguagePreferencesPage() {
  const supabase = createClient();
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const prefs = await getUserPreferences(user.id);
        if (prefs?.language) {
          setLanguage(prefs.language);
        }
      }
      setLoading(false);
    };
    fetchPreferences();
  }, [supabase]);

  const handleChange = async (newLang: string) => {
    setLanguage(newLang);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await updateUserPreferences(user.id, { language: newLang });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );
  }

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Language Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label htmlFor="language">Select your preferred language</Label>
          <Select value={language} onValueChange={handleChange}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
