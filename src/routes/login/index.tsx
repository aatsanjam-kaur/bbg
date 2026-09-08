import { createFileRoute, Link } from "@tanstack/react-router";
import { Stethoscope, User } from "lucide-react";
import { AuthLayout, ChoiceCard } from "@/components/AuthLayout";

export const Route = createFileRoute("/login/")({
  head: () => ({
    meta: [
      { title: "Login — BBG Screening Platform" },
      { name: "description", content: "Log in to BBG as a patient or as a healthcare worker." },
      { property: "og:title", content: "Login to BBG" },
      { property: "og:description", content: "Access your BBG screening account." },
    ],
  }),
  component: LoginChoice,
});

function LoginChoice() {
  return (
    <AuthLayout title="Login As" subtitle="Select the type of account you use.">
      <div className="grid gap-4 sm:grid-cols-2">
        <ChoiceCard icon={User} title="Patient" text="Screening, results and reports" to="/login/patient" />
        <ChoiceCard
          icon={Stethoscope}
          title="Healthcare Worker"
          text="Review cases and set care pathways"
          to="/login/worker"
        />
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link to="/signup" className="font-medium text-primary underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
