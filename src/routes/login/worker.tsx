import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/components/AuthLayout";
import { LoginForm } from "@/components/LoginForm";

export const Route = createFileRoute("/login/worker")({
  head: () => ({
    meta: [
      { title: "Healthcare Worker Login — BBG" },
      { name: "description", content: "Sign in to review patient screening cases and set care pathways." },
      { property: "og:title", content: "Healthcare Worker Login — BBG" },
      { property: "og:description", content: "Review submitted OA screening cases." },
    ],
  }),
  component: () => (
    <AuthLayout title="Healthcare Worker Login" subtitle="Review cases and determine care pathways.">
      <LoginForm role="healthcare_worker" />
    </AuthLayout>
  ),
});
