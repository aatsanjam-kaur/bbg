import type { ComponentType, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function AuthLayout({
  title,
  subtitle,
  children,
  wide,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="bbg-hero-blob min-h-screen px-4 py-10">
      <div className="mx-auto flex max-w-6xl justify-center">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground">
            BBG
          </span>
          <span className="font-display text-base font-semibold">Better Bone Guidance</span>
        </Link>
      </div>
      <div className={`mx-auto ${wide ? "max-w-2xl" : "max-w-xl"} fade-up`}>
        <h1 className="text-center text-3xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-center text-muted-foreground">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

export function ChoiceCard({
  icon: Icon,
  title,
  text,
  to,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="card-soft group flex flex-col items-start gap-3 p-6 transition-all hover:-translate-y-1 hover:border-primary"
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
        <Icon className="size-6" />
      </span>
      <span className="font-display text-xl font-semibold">{title}</span>
      <span className="text-sm text-muted-foreground">{text}</span>
      <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Continue <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
