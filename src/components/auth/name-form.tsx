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
import { ArrowLeft, Loader2, UserIcon } from "lucide-react";

// Enhanced name validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name should only contain letters and spaces",
    })
    .refine((val) => val.trim().length > 0, {
      message: "Name cannot be empty or just spaces",
    }),
});

type NameFormProps = {
  onSubmit: (name: string) => void;
  onBack: () => void;
};

export function NameForm({ onSubmit, onBack }: NameFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Trim and properly capitalize name
      const formattedName = values.name
        .trim()
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

      await onSubmit(formattedName);
    } catch (error) {
      console.error("Error submitting name:", error);
      form.setError("name", {
        type: "manual",
        message: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Your Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    {...field}
                    placeholder="Enter your full name"
                    className="pl-10 py-6 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                    disabled={isLoading}
                    aria-required="true"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-2">
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Continue"
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={onBack}
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
}
