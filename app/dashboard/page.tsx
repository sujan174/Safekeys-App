"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // --- IMPROVEMENT: Import useRouter
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Define a type for the secret object
interface Secret {
  id: string;
  Description: string;
  File: string;
  Commit: string;
  receivedAt: string;
}

const DashboardPage = () => {
  const router = useRouter(); // --- IMPROVEMENT: Initialize router for navigation
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSecrets = async () => {
    const serverUrl = sessionStorage.getItem("serverUrl");
    const apiKey = sessionStorage.getItem("apiKey");

    if (!serverUrl || !apiKey) {
      router.push("/login"); // --- IMPROVEMENT: Use router for smoother navigation
      return;
    }

    try {
      const response = await fetch(`${serverUrl}/secrets`, {
        headers: {
          "x-api-key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch secrets. Please log in again.");
      }

      const data = await response.json();
      const secretsArray = Object.entries(data).map(
        ([id, secret]: [string, any]) => ({
          ...secret,
          id,
        })
      );
      setSecrets(secretsArray);
    } catch (err) { // --- FIX: Wrapped catch block in curly braces and improved type safety
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSecrets();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("serverUrl");
    sessionStorage.removeItem("apiKey");
    console.log("Logging out and clearing session...");
    router.push("/login"); // --- IMPROVEMENT: Use router for smoother navigation
  };

  return (
    <div className="flex min-h-screen w-full items-start  bg-gray-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-4">
      <Card className="w-full max-w-4xl border-0 bg-background/60 shadow-xl backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl">Secrets Vault</CardTitle>
            <CardDescription>
              A list of secrets retrieved from your vault server.
            </CardDescription>
          </div>
          <Button onClick={handleLogout} variant="destructive">
            Log Out
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="ml-4 text-muted-foreground">Loading secrets...</p>
            </div>
          ) : error ? (
            <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
              <h4 className="font-semibold">Error</h4>
              <p>{error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-white/10">
                  <tr className="text-left">
                    <th className="p-3 font-medium">Description</th>
                    <th className="p-3 font-medium">File</th>
                    <th className="p-3 font-medium">Discovered</th>
                  </tr>
                </thead>
                <tbody>
                  {secrets.length > 0 ? (
                    secrets.map((secret) => (
                      <tr key={secret.id} className="border-t border-white/10">
                        <td className="p-3">{secret.Description}</td>
                        <td className="p-3 font-mono">{secret.File}</td>
                        <td className="p-3 text-muted-foreground">
                          {new Date(secret.receivedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-t border-white/10">
                      <td
                        colSpan={3}
                        className="p-8 text-center text-muted-foreground"
                      >
                        No secrets found in the vault.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;