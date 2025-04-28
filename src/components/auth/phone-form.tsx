"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "lucide-react";

const formSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^\+?[0-9]+$/, "Please enter a valid phone number"),
});

type PhoneFormProps = {
  onSubmit: (phone: string) => void;
};

export function PhoneForm({ onSubmit }: PhoneFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Format phone number (ensure it has country code)
      let formattedPhone = values.phone;
      if (!formattedPhone.startsWith("+")) {
        // Default to India country code if none provided
        formattedPhone = "+91" + formattedPhone.replace(/^0/, "");
      }

      await onSubmit(formattedPhone);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    {...field}
                    placeholder="+91 9876543210"
                    className="pl-10"
                    type="tel"
                    autoComplete="tel"
                    disabled={isLoading}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Checking..." : "Continue"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          We&apos;ll send you a one-time password to verify your phone
        </p>
      </form>
    </Form>
  );
}
