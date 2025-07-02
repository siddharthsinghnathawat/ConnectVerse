"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const aiSettingsSchema = z.object({
  matchingThreshold: z.array(z.number()).min(1).max(1),
  enableInterestMatching: z.boolean().default(true),
  enableProfileCompleteness: z.boolean().default(false),
  priorityFactor: z.string({
    required_error: "Please select a priority factor.",
  }),
});

type AiSettingsFormValues = z.infer<typeof aiSettingsSchema>;

const defaultValues: Partial<AiSettingsFormValues> = {
  matchingThreshold: [75],
  enableInterestMatching: true,
  enableProfileCompleteness: false,
  priorityFactor: "experience",
};

export function AiSettingsForm() {
  const form = useForm<AiSettingsFormValues>({
    resolver: zodResolver(aiSettingsSchema),
    defaultValues,
  });

  function onSubmit(data: AiSettingsFormValues) {
    toast({
      title: "Settings Saved!",
      description: "Your AI matching settings have been updated.",
    });
    console.log(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Matching Algorithm</CardTitle>
        <CardDescription>Fine-tune the parameters for the AI-powered matching.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="matchingThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matching Threshold</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                      <span className="w-12 text-right">{field.value[0]}%</span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Set the minimum similarity score for a match to be considered.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priorityFactor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority Factor</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a factor to prioritize" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="experience">Shared Experience</SelectItem>
                      <SelectItem value="industry">Same Industry</SelectItem>
                      <SelectItem value="interests">Common Interests</SelectItem>
                      <SelectItem value="role">Complementary Roles</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Give more weight to a specific factor during matching.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enableInterestMatching"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Interest-Based Matching</FormLabel>
                    <FormDescription>
                      Allow the AI to match participants based on their stated interests.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enableProfileCompleteness"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Profile Completeness Boost</FormLabel>
                    <FormDescription>
                      Give a slight advantage to users with more complete profiles.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Save Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
