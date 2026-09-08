import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/components/AuthLayout";
import { SignupForm } from "@/components/SignupForm";

export const Route = createFileRoute("/signup/patient")({
  head: () => ({
    meta: [
      { title: "Patient Sign Up — BBG" },
      { name: "description", content: "Create a BBG patient account to start your osteoarthritis screening." },
      { property: "og:title", content: "Patient Sign Up — BBG" },
      { property: "og:description", content: "Start your osteoarthritis screening with BBG." },
    ],
  }),
  component: () => (
    <AuthLayout title="Patient Sign Up" subtitle="Create your screening profile.">
      <SignupForm role="patient" />
    </AuthLayout>
  ),
});
