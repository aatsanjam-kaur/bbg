import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

export function LoginForm({ role }: { role: "patient" | "healthcare_worker" }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    if (error || !data.user) {
      setLoading(false);
      toast.error(error?.message ?? "Could not sign in");
      return;
    }
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).maybeSingle();
    const actual = (profile as { role?: string } | null)?.role ?? "patient";
    if (actual !== role) {
      await supabase.auth.signOut();
      setLoading(false);
      toast.error(
        actual === "patient"
          ? "This is a patient account. Please use the patient login."
          : "This is a healthcare worker account. Please use the healthcare worker login.",
      );
      return;
    }
    toast.success("Welcome back");
    void navigate({ to: actual === "patient" ? "/patient" : "/worker" });
  };

  return (
    <form onSubmit={submit} className="card-soft space-y-5 p-6 sm:p-8">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          placeholder="••••••••"
        />
        {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
      </div>
      <Button type="submit" className="w-full rounded-full" size="lg" disabled={loading}>
        {loading ? "Signing in…" : "Login"}
      </Button>
      <div className="flex items-center justify-between text-sm">
        <Link to="/forgot-password" className="text-muted-foreground underline underline-offset-4">
          Forgot password?
        </Link>
        <Link
          to={role === "patient" ? "/signup/patient" : "/signup/worker"}
          className="font-medium text-primary underline underline-offset-4"
        >
          Create account
        </Link>
      </div>
    </form>
  );
}
