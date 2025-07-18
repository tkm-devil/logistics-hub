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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import moment from "moment-timezone";

export default function TimezonePreferencesPage() {
  const supabase = createClient();
  const [timezone, setTimezone] = useState("UTC");
  const [loading, setLoading] = useState(true);

  const timezones = moment.tz.names().map((tz) => ({
    label: tz.replace(/_/g, " "),
    value: tz,
  }));

  useEffect(() => {
    const fetchPreferences = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const prefs = await getUserPreferences(user.id);
        if (prefs?.timezone) setTimezone(prefs.timezone);
      }
      setLoading(false);
    };
    fetchPreferences();
  }, [supabase]);

  const handleChange = async (tz: string) => {
    setTimezone(tz);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await updateUserPreferences(user.id, { timezone: tz });
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
        <CardTitle>Timezone Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label htmlFor="timezone">Select your preferred timezone</Label>
          <Select value={timezone} onValueChange={handleChange}>
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent className="max-h-72 overflow-y-scroll">
              {timezones.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
