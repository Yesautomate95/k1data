"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("qwerty");
    // Clear any previous error
    setError("");
    setSubmitting(true);

    // Send the login request to your API
    try {
      // wait 10 seconds
      // await (new Promise(resolve => setTimeout(resolve, 5000)))

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      // Handle successful login, e.g., redirect or show success message
      console.log("Login successful!");
      router.push("/services/k1-ocr");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className={cn(
        "flex flex-col gap-6 md:scale-110  lg:scale-[1.25]",
        className
      )}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your login details
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            name="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center">
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline text-[var(--brand-yellow)]"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        {error ? <p className="text-red-500 text-sm">{error}</p> : null}
        <Button disabled={submitting} type="submit" className="w-full">
          {submitting ? "Logging in..." : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a
          href="#"
          className="underline underline-offset-4 text-[var(--brand-yellow)]"
        >
          Sign up
        </a>
      </div>
    </form>
  );
}
