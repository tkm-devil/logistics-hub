"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { updateUserPreferences, getUserPreferences } from "@/utils/preferences";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Search,
  Moon,
  Sun,
  Check,
  Globe,
  ChevronDown,
  Star,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/constants/languages";

export default function LanguagePreferencesPage() {
  const supabase = createClient();
  const [language, setLanguage] = useState("en");
  const [fallbackLanguage, setFallbackLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Filter languages based on search
  const filteredLanguages = languages.filter(
    (lang) =>
      lang.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.native.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected language details
  const selectedLang = languages.find((lang) => lang.code === language);

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split("-")[0];
    const supportedLang = languages.find((lang) => lang.code === browserLang);
    if (supportedLang) {
      setDetectedLanguage(supportedLang.code);
    }

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    setDarkMode(savedTheme === "dark");

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

  // Use detected language
  const useDetectedLanguage = () => {
    if (detectedLanguage) {
      handleLanguageChange(detectedLanguage);
    }
  };

  const handleLanguageChange = async (newLang: string) => {
    setSaving(true);
    setLanguage(newLang);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await updateUserPreferences(user.id, {
        language: newLang,
      });
    }

    setSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleFallbackChange = async (newFallback: string) => {
    setFallbackLanguage(newFallback);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await updateUserPreferences(user.id, {
        language: language,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading preferences...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-all duration-500 ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* Header with theme toggle */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Language Preferences
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Detected Language Banner */}
        {detectedLanguage && detectedLanguage !== language && (
          <Card className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {languages.find((l) => l.code === detectedLanguage)?.flag}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      We detected{" "}
                      {
                        languages.find((l) => l.code === detectedLanguage)
                          ?.label
                      }
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Would you like to use this as your language?
                    </p>
                  </div>
                </div>
                <Button
                  onClick={useDetectedLanguage}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Use This Language
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main Language Selection */}
          <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 border-white/20 dark:border-gray-700/20 shadow-xl shadow-gray-200/20 dark:shadow-gray-900/20 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/30 dark:hover:shadow-gray-900/30">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Star className="h-5 w-5 text-yellow-500" />
                Primary Language
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This will be your main interface language
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/50 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm"
                />
              </div>

              {/* Language Grid */}
              <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                {filteredLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    disabled={saving}
                    className={`p-3 rounded-lg border transition-all duration-200 text-left hover:scale-[1.02] hover:shadow-md ${
                      language === lang.code
                        ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 ring-2 ring-blue-500/50"
                        : "bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {lang.label}
                          </span>
                          {language === lang.code && (
                            <Check className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {lang.native}
                        </span>
                      </div>
                      {saving && language === lang.code && (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preview and Fallback */}
          <div className="space-y-6">
            {/* Language Preview */}
            <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 border-white/20 dark:border-gray-700/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedLang && (
                  <div className="text-center p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
                    <div className="text-4xl mb-3">{selectedLang.flag}</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {selectedLang.native}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      {selectedLang.preview}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-300">
            <Check className="h-5 w-5" />
            Language preferences saved!
          </div>
        )}
      </div>
    </div>
  );
}
