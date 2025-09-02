"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CustomFormField,
  FormFieldType,
} from "@/components/ui/CustomFormField";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  serverurl: z.string().url({
    message: "Server URL must be a valid URL.",
  }),
  apikey: z.string().min(10, {
    message: "API key must be at least 10 characters.",
  }),
});

export const LoginPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serverurl: "",
      apikey: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`${values.serverurl}/secrets`, {
        method: "GET",
        headers: {
          "x-api-key": values.apikey,
        },
      });
      if (response.ok) {
        console.log("Authentication successful");
        sessionStorage.setItem("serverUrl", values.serverurl);
        sessionStorage.setItem("apiKey", values.apikey);
        router.push("/dashboard");
        console.log("Redirecting to /dashboard");
      } else {
        form.setError("apikey", {
          type: "manual",
          message: "Authentication failed. Please check your credentials.",
        });
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      form.setError("serverurl", {
        type: "manual",
        message: "Could not connect to the server.",
      });
    }
  }

  return (
    // --- EDITED: Added a subtle gradient background ---
    <div className="flex h-screen w-full items-center justify-center bg-gray-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4">
      {/* --- EDITED: Applied new styles to the card --- */}
      <Card className="w-full max-w-md border-0 bg-background/60 shadow-xl backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">API Authentication</CardTitle>
          <CardDescription>
            Enter the server credentials to connect
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <CustomFormField
                control={form.control}
                name="serverurl"
                fieldType={FormFieldType.INPUT}
                label="Server URL"
                placeholder="https://your-server.com"
              />
              <CustomFormField
                control={form.control}
                name="apikey"
                fieldType={FormFieldType.PASSWORD}
                label="API Key"
                placeholder="••••••••••••"
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect" // Changed text for clarity
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;