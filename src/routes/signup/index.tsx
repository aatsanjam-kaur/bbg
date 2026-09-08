import { createFileRoute, Link } from "@tanstack/react-router";
import { Stethoscope, User } from "lucide-react";
import { AuthLayout, ChoiceCard } from "@/components/AuthLayout";

export const Route = createFileRoute("/signup/")({
  head: () => ({
    meta: [
      { title: "Sign Up — BBG Screening Platform" },
      { name: "description", content: "Create a BBG account as a patient or healthcare worker." },
      { property: "og:title", content: "Sign Up for BBG" },
      { property: "og:description", content: "Create your BBG osteoarthritis screening account." },
    ],
  }),
  component: SignupChoice,
});

function SignupChoice() {
  return (
    <AuthLayout title="Sign Up As" subtitle="Tell us how you will use BBG.">
      <div className="grid gap-4 sm:grid-cols-2">
        <ChoiceCard icon={User} title="Patient" text="Screen yourself and track results" to="/signup/patient" />
        <ChoiceCard
          icon={Stethoscope}
          title="Healthcare Worker"
          text="Review patients and manage care"
          to="/signup/worker"
        />
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already registered?{" "}
        <Link to="/login" className="font-medium text-primary underline underline-offset-4">
          Login instead
        </Link>
      </p>
    </AuthLayout>
  );
}
