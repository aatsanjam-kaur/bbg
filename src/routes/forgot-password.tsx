import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — BBG" },
      { name: "description", content: "Request a password reset link for your BBG account." },
      { property: "og:title", content: "Reset your BBG password" },
      { property: "og:description", content: "Request a password reset link." },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = z.string().trim().email().max(255).safeParse(email);
    if (!parsed.success) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);
    const { error: err } = await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (err) {
      toast.error(err.message);
      return;
    }
    setSent(true);
    toast.success("Reset link sent");
  };

  return (
    <AuthLayout title="Forgot Password" subtitle="We'll email you a link to set a new password.">
      <form onSubmit={submit} className="card-soft space-y-5 p-6 sm:p-8">
        {sent ? (
          <p className="text-sm text-muted-foreground">
            If an account exists for <span className="font-medium text-foreground">{email}</span>, a reset link is on
            its way.
          </p>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full rounded-full" disabled={loading}>
              {loading ? "Sending…" : "Send reset link"}
            </Button>
          </>
        )}
        <p className="text-center text-sm">
          <Link to="/login" className="text-muted-foreground underline underline-offset-4">
            Back to login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
