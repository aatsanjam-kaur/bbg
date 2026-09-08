import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const base = {
  full_name: z.string().trim().min(2, "Enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Digits and + - ( ) only"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  password: z.string().min(8, "Use at least 8 characters").max(72),
};

const patientSchema = z.object({
  ...base,
  age: z.coerce.number().int().min(1, "Enter a valid age").max(120),
  sex: z.string().min(1, "Select your sex"),
});

const workerSchema = z.object({
  ...base,
  worker_id: z.string().trim().min(2, "Enter your healthcare worker ID").max(50),
  organization: z.string().trim().min(2, "Enter your organization").max(120),
});

type Values = Record<string, string>;

export function SignupForm({ role }: { role: "patient" | "healthcare_worker" }) {
  const navigate = useNavigate();
  const isPatient = role === "patient";
  const [values, setValues] = useState<Values>({
    full_name: "",
    age: "",
    sex: "",
    phone: "",
    email: "",
    password: "",
    worker_id: "",
    organization: "",
  });
  const [errors, setErrors] = useState<Values>({});
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setValues((prev) => ({ ...prev, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const schema = isPatient ? patientSchema : workerSchema;
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Values = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    const metadata: Record<string, string> = {
      role,
      full_name: values["full_name"] ?? "",
      phone: values["phone"] ?? "",
    };
    if (isPatient) {
      metadata["age"] = values["age"] ?? "";
      metadata["sex"] = values["sex"] ?? "";
    } else {
      metadata["worker_id"] = values["worker_id"] ?? "";
      metadata["organization"] = values["organization"] ?? "";
    }

    const { data, error } = await supabase.auth.signUp({
      email: (values["email"] ?? "").trim(),
      password: values["password"] ?? "",
      options: { emailRedirectTo: window.location.origin, data: metadata },
    });

    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (!data.session) {
      toast.success("Account created. Check your email to confirm, then log in.");
      void navigate({ to: isPatient ? "/login/patient" : "/login/worker" });
      return;
    }
    toast.success("Account created");
    void navigate({ to: isPatient ? "/patient" : "/worker" });
  };

  const field = (name: string, label: string, type = "text", placeholder = "") => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        value={values[name] ?? ""}
        placeholder={placeholder}
        onChange={(e) => set(name, e.target.value)}
      />
      {errors[name] && <p className="text-xs text-destructive">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} className="card-soft space-y-5 p-6 sm:p-8">
      {field("full_name", "Full Name", "text", "Jane Doe")}
      {isPatient ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {field("age", "Age", "number", "45")}
          <div className="space-y-2">
            <Label htmlFor="sex">Gender</Label>
            <Select value={values["sex"] ?? ""} onValueChange={(v) => set("sex", v)}>
              <SelectTrigger id="sex">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors["sex"] && <p className="text-xs text-destructive">{errors["sex"]}</p>}
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {field("worker_id", "Healthcare Worker ID", "text", "HW-10293")}
          {field("organization", "Organization", "text", "District Health Centre")}
        </div>
      )}
      {field("phone", "Phone Number", "tel", "+91 98765 43210")}
      {field("email", "Email", "email", "you@example.com")}
      {field("password", "Password", "password", "At least 8 characters")}

      <Button type="submit" size="lg" className="w-full rounded-full" disabled={loading}>
        {loading ? "Creating account…" : "Create Account"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already registered?{" "}
        <Link
          to={isPatient ? "/login/patient" : "/login/worker"}
          className="font-medium text-primary underline underline-offset-4"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
