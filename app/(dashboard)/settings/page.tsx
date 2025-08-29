"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Trash2
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and application settings.
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <CardTitle>Profile Settings</CardTitle>
          </div>
          <CardDescription>
            Update your personal information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter your first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Enter your last name" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
            <p className="text-xs text-muted-foreground">
              Your email will be used for notifications and account recovery
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Organization (Optional)</Label>
            <Input id="organization" placeholder="Enter your organization" />
          </div>

          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
          <CardDescription>
            Choose how you want to be notified about poll activity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="emailNotifications" />
              <Label htmlFor="emailNotifications">Email notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="newVotes" />
              <Label htmlFor="newVotes">New votes on my polls</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="pollExpiration" />
              <Label htmlFor="pollExpiration">Poll expiration reminders</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="weeklyDigest" />
              <Label htmlFor="weeklyDigest">Weekly activity digest</Label>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Privacy & Security</CardTitle>
          </div>
          <CardDescription>
            Manage your privacy settings and account security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Default Poll Visibility</Label>
                <p className="text-sm text-muted-foreground">
                  Choose the default visibility for new polls
                </p>
              </div>
              <Badge variant="outline">Public</Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="showInDirectory" />
              <Label htmlFor="showInDirectory">Show my polls in public directory</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="allowAnonymous" />
              <Label htmlFor="allowAnonymous">Allow anonymous voting by default</Label>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Change Password</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Update your password to keep your account secure
                </p>
                <div className="space-y-3 max-w-sm">
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                  <Button size="sm">Update Password</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <CardTitle>Appearance</CardTitle>
          </div>
          <CardDescription>
            Customize the look and feel of your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Theme</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Choose your preferred color scheme
              </p>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">Light</Button>
                <Button variant="default" size="sm">Dark</Button>
                <Button variant="outline" size="sm">System</Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Appearance
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Integration Settings */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <CardTitle>Integrations</CardTitle>
          </div>
          <CardDescription>
            Connect with external services and tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Globe className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Integration with popular tools like Slack, Microsoft Teams, and Zapier will be available soon.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-0 shadow-md border-destructive/20">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </div>
          <CardDescription>
            Permanent actions that cannot be undone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
              <div>
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
