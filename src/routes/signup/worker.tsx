import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/components/AuthLayout";
import { SignupForm } from "@/components/SignupForm";

export const Route = createFileRoute("/signup/worker")({
  head: () => ({
    meta: [
      { title: "Healthcare Worker Sign Up — BBG" },
      { name: "description", content: "Register as a healthcare worker to review BBG screening cases." },
      { property: "og:title", content: "Healthcare Worker Sign Up — BBG" },
      { property: "og:description", content: "Register to review OA screening cases on BBG." },
    ],
  }),
  component: () => (
    <AuthLayout title="Healthcare Worker Sign Up" subtitle="Register your clinical profile.">
      <SignupForm role="healthcare_worker" />
    </AuthLayout>
  ),
});
