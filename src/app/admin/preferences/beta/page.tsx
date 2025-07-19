"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { getUserPreferences, updateUserPreferences } from "@/utils/preferences";

type BetaFeatureKey = "ai_summaries" | "fast_routing" | "advanced_analytics" | "smart_sidebar" | "predictive_notifications";

const FEATURE_LABELS: Record<BetaFeatureKey, string> = {
  ai_summaries: "AI Summaries",
  fast_routing: "Fast Page Transitions",
  advanced_analytics: "Advanced Analytics",
  smart_sidebar: "Smart Sidebar",
  predictive_notifications: "Predictive Notifications",
};

export default function BetaPreferencesPage() {
  const supabase = createClient();

  const [userId, setUserId] = useState<string | null>(null);
  const [enabledFeatures, setEnabledFeatures] = useState<Set<BetaFeatureKey>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);

      const prefs = await getUserPreferences(user.id);
      if (prefs?.beta_features_enabled) {
        // Simulate a few features as enabled (for demo)
        setEnabledFeatures(new Set(["fast_routing", "ai_summaries"]));
      }

      setLoading(false);
    };

    fetch();
  }, [supabase]);

  const toggleFeature = (key: BetaFeatureKey) => {
    setEnabledFeatures((prev) => {
      const copy = new Set(prev);
      copy.has(key) ? copy.delete(key) : copy.add(key);
      return copy;
    });
  };

  const savePreferences = async () => {
    if (!userId) return;
    setSaving(true);

    const anyEnabled = enabledFeatures.size > 0;

    await updateUserPreferences(userId, {
      beta_features_enabled: anyEnabled,
    });

    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Beta Features</h1>
      <p className="text-muted-foreground mb-4">
        Enable experimental features. These may change or be removed at any time.
      </p>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Available Beta Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(FEATURE_LABELS).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={key}>{label}</Label>
              <Switch
                id={key}
                checked={enabledFeatures.has(key as BetaFeatureKey)}
                onCheckedChange={() => toggleFeature(key as BetaFeatureKey)}
              />
            </div>
          ))}
          <Button onClick={savePreferences} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
