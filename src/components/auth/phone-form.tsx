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
import { Button } from "@/lib/ui/button/button";
import { Loader2, PhoneIcon } from "lucide-react";

// Only 10 digit phone allowed
const formSchema = z.object({
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^[0-9]{10}$/, {
      message: "Please enter a valid 10-digit phone number",
    }),
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

  // Only allow digits and max 10 chars
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 10) value = value.slice(0, 10);
    form.setValue("phone", value);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await onSubmit(values.phone);
    } catch (error) {
      console.error("Error submitting phone:", error);
      form.setError("phone", {
        type: "manual",
        message: "Failed to verify phone number. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-7">
        <FormField
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-orange-700 font-bold uppercase tracking-wider text-xs mb-2">
                Phone Number
              </FormLabel>
              <FormControl>
                <div
                  className={`relative rounded-xl border bg-white transition-all duration-150 ${
                    fieldState.error
                      ? "border-red-400 focus-within:border-red-500"
                      : "border-orange-200 focus-within:border-orange-500"
                  } shadow-sm focus-within:shadow-md`}
                >
                  <PhoneIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
                  <Input
                    {...field}
                    placeholder="9876543210"
                    className="pl-10 py-4 rounded-xl border-none bg-transparent text-orange-700 font-medium text-base focus:ring-0"
                    type="tel"
                    autoComplete="tel"
                    disabled={isLoading}
                    aria-required="true"
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={handleInput}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500 mt-2" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-600 to-orange-400 hover:scale-105 hover:shadow-lg text-white py-6 rounded-2xl font-bold text-lg shadow-md transition-all duration-150"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Checking...
            </>
          ) : (
            "Continue"
          )}
        </Button>

        <p className="text-center text-sm text-orange-700/80 mt-2">
          We&apos;ll send you a one-time password to verify your phone
        </p>
      </form>
    </Form>
  );
}
