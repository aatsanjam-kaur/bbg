import { createFileRoute, Link } from "@tanstack/react-router";
import { LogIn, UserPlus } from "lucide-react";
import { AuthLayout, ChoiceCard } from "@/components/AuthLayout";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Get Started — BBG Osteoarthritis Screening" },
      { name: "description", content: "Log in or create a BBG account as a patient or healthcare worker." },
      { property: "og:title", content: "Get Started with BBG" },
      { property: "og:description", content: "Log in or create your BBG screening account." },
    ],
  }),
  component: GetStarted,
});

function GetStarted() {
  return (
    <AuthLayout title="Welcome to BBG" subtitle="Choose how you would like to continue.">
      <div className="grid gap-4 sm:grid-cols-2">
        <ChoiceCard icon={LogIn} title="Login" text="Already have an account" to="/login" />
        <ChoiceCard icon={UserPlus} title="Sign Up" text="Create a new account" to="/signup" />
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Link to="/" className="underline underline-offset-4">
          Back to home
        </Link>
      </p>
    </AuthLayout>
  );
}
