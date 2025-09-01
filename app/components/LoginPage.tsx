"use client";

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
} from "./CustomFormField";

const formSchema = z.object({
  serverurl: z.string().url({
    message: "Server URL must be a valid URL.",
  }),
  apikey: z.string().min(10, {
    message: "API key must be at least 10 characters.",
  }),
});

export const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serverurl: "",
      apikey: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-grey-700 p-4">
      <Card className="w-full max-w-md">
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
                placeholder="Enter your server URL"
              />
              <CustomFormField
                control={form.control}
                name="apikey"
                fieldType={FormFieldType.PASSWORD}
                label="API Key"
                placeholder="••••••••••••"
              />
              <Button type="submit" className="w-full bg-gray-300 text-black hover:bg-gray-400">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;

