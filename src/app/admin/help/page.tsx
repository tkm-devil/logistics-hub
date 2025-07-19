"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Github, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function HelpAndSupportPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Documentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground">
            Visit our guides and developer documentation to learn how to use the
            system.
          </p>
          <Button variant="link" asChild>
            <Link href="https://github.com/your-repo" target="_blank">
              <Github className="mr-2 h-4 w-4" /> GitHub Repository
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact & Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground">
            Need help? Reach out via email or GitHub.
          </p>
          <div className="space-x-2">
            <Button variant="outline" asChild>
              <Link href="mailto:support@example.com">
                <Mail className="mr-2 h-4 w-4" /> support@example.com
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://github.com/your-repo/issues" target="_blank">
                <HelpCircle className="mr-2 h-4 w-4" /> Report an Issue
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How do I update my profile information?
              </AccordionTrigger>
              <AccordionContent>
                Navigate to your avatar → Profile Settings to edit your name,
                email, and more.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Where can I change my language preference?
              </AccordionTrigger>
              <AccordionContent>
                Open Preferences in the topbar and select Language.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What is the Beta Features section?
              </AccordionTrigger>
              <AccordionContent>
                It's a showcase of experimental features. Toggle them under
                Preferences → Beta
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Can I customize my dashboard layout?
              </AccordionTrigger>
              <AccordionContent>
                Yes, go to Preferences → Layout and choose your preferred
                settings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Where can I report a bug?</AccordionTrigger>
              <AccordionContent>
                Use the GitHub issues link above to submit a report or feature
                request.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>
                Why is the theme resetting after login?
              </AccordionTrigger>
              <AccordionContent>
                Ensure you've saved your theme in Supabase preferences, not just
                local storage.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>Is there a dark mode?</AccordionTrigger>
              <AccordionContent>
                Yes, go to Preferences → Appearance and choose Dark or System.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>
                How can I sign out from all devices?
              </AccordionTrigger>
              <AccordionContent>
                Under Security, click Sign Out of All Sessions to revoke tokens
                across devices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>What if I forget my password?</AccordionTrigger>
              <AccordionContent>
                Use the “Forgot Password” option on the login page to reset via
                email.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
              <AccordionTrigger>
                Is this panel mobile-friendly?
              </AccordionTrigger>
              <AccordionContent>
                Yes, the UI is responsive and supports tablets and phones.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-11">
              <AccordionTrigger>
                Can I collapse the sidebar by default?
              </AccordionTrigger>
              <AccordionContent>
                Go to Preferences → Layout and set Sidebar Collapsed = true.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-12">
              <AccordionTrigger>
                Are there keyboard shortcuts available?
              </AccordionTrigger>
              <AccordionContent>
                Not yet, but planned in future updates.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-13">
              <AccordionTrigger>
                What is the 'Smart Sidebar' feature in Beta?
              </AccordionTrigger>
              <AccordionContent>
                It auto-hides or expands the sidebar based on your activity
                (demo only).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-14">
              <AccordionTrigger>
                How do I report a bug or request a feature?
              </AccordionTrigger>
              <AccordionContent>
                Use the “Report an Issue” button or visit our GitHub repo.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-15">
              <AccordionTrigger>
                Can I reset all my preferences?
              </AccordionTrigger>
              <AccordionContent>
                Yes, inside Preferences dropdown → click “Reset Preferences”.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
