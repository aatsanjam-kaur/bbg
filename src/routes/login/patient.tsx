import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/components/AuthLayout";
import { LoginForm } from "@/components/LoginForm";

export const Route = createFileRoute("/login/patient")({
  head: () => ({
    meta: [
      { title: "Patient Login — BBG" },
      { name: "description", content: "Sign in to your BBG patient account to continue your OA screening." },
      { property: "og:title", content: "Patient Login — BBG" },
      { property: "og:description", content: "Continue your osteoarthritis screening journey." },
    ],
  }),
  component: () => (
    <AuthLayout title="Patient Login" subtitle="Continue your osteoarthritis screening.">
      <LoginForm role="patient" />
    </AuthLayout>
  ),
});
