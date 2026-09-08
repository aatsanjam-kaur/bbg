import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  ClipboardList,
  FileScan,
  HeartPulse,
  LineChart,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BBG — AI-Powered Osteoarthritis Early Screening Platform" },
      {
        name: "description",
        content:
          "Detect osteoarthritis earlier with AI screening, video gait analysis, KOOS risk assessment, X-ray grading and healthcare worker review.",
      },
      { property: "og:title", content: "BBG — AI-Powered Osteoarthritis Early Screening" },
      {
        property: "og:description",
        content: "AI screening, gait analysis, risk assessment and care recommendations for early OA detection.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: BrainCircuit, title: "AI Screening", text: "Questionnaire and gait signals combined into one explainable risk score." },
  { icon: Activity, title: "Video Gait Analysis", text: "Record or upload a walking video for symmetry and stability metrics." },
  { icon: LineChart, title: "Risk Assessment", text: "KOOS subscale scoring with BMI and age adjusted risk banding." },
  { icon: FileScan, title: "X-Ray Analysis", text: "Radiographic grading with joint space and osteophyte findings." },
  { icon: Stethoscope, title: "Healthcare Worker Dashboard", text: "Review submitted cases and decide the care pathway." },
  { icon: Users, title: "Patient Monitoring", text: "Track high-risk patients, appointments and follow-up decisions." },
];

const workflow = [
  "Questionnaire",
  "Gait Analysis",
  "AI Assessment",
  "Risk Score",
  "Care Pathway",
  "Healthcare Review",
];

const benefits = [
  { title: "Early Detection", text: "Catch joint degeneration before irreversible damage sets in." },
  { title: "Reduced Treatment Costs", text: "Conservative care started early costs a fraction of late surgery." },
  { title: "Faster Referrals", text: "High-risk cases reach a specialist without months of waiting." },
  { title: "Better Rural Access", text: "A phone camera and a questionnaire replace a first specialist visit." },
  { title: "Improved Outcomes", text: "Personalised pathways keep patients mobile for longer." },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground">
              BBG
            </span>
            <span className="font-display text-base font-semibold">Better Bone Guidance</span>
          </div>
          <Button asChild size="lg" className="rounded-full">
            <Link to="/get-started">Get Started</Link>
          </Button>
        </div>
      </header>

      <section className="bbg-hero-blob relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <span className="fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" /> Clinically structured KOOS screening
          </span>
          <h1 className="fade-up mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">
            AI-Powered Osteoarthritis Early Screening Platform
          </h1>
          <p className="fade-up mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Helping patients and healthcare workers detect Osteoarthritis earlier through AI-driven screening, gait
            analysis, risk assessment, and care recommendations.
          </p>
          <div className="fade-up mt-9 flex justify-center">
            <Button asChild size="lg" className="rounded-full px-8 text-base shadow-soft">
              <Link to="/get-started">
                Get Started <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["42", "KOOS items"],
              ["5", "Subscale scores"],
              ["3", "Risk bands"],
              ["1", "Unified report"],
            ].map(([n, l]) => (
              <div key={l} className="card-soft px-4 py-5">
                <p className="font-display text-3xl font-bold text-foreground">{n}</p>
                <p className="mt-1 text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Everything the screening pathway needs</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          One platform for patients, health workers and the AI models in between.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card-soft p-6 transition-transform hover:-translate-y-1">
              <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bbg-gradient py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">How the screening works</h2>
          <div className="mt-12 flex flex-wrap items-stretch justify-center gap-3">
            {workflow.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="card-soft flex min-w-[9.5rem] flex-col items-center px-5 py-4 text-center">
                  <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="mt-2 text-sm font-semibold">{step}</span>
                </div>
                {i < workflow.length - 1 && <ArrowRight className="hidden size-5 text-primary lg:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Why earlier screening matters</h2>
            <p className="mt-4 text-muted-foreground">
              Osteoarthritis is usually found once cartilage loss is advanced. BBG moves the first assessment to the
              community, where it costs almost nothing to run.
            </p>
            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-warning/25 p-4 text-sm text-warning-foreground">
              <HeartPulse className="size-5 shrink-0" />
              Screening support only — it does not replace clinical diagnosis.
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((b) => (
              <div key={b.title} className="card-soft p-5">
                <ClipboardList className="size-5 text-primary" />
                <h3 className="mt-3 font-semibold">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24">
        <div className="card-soft bbg-hero-blob p-10 text-center">
          <h2 className="text-3xl font-bold">Start your screening in minutes</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Complete the KOOS questionnaire, record a short walking video, and get an AI risk assessment reviewed by a
            healthcare worker.
          </p>
          <Button asChild size="lg" className="mt-7 rounded-full px-8">
            <Link to="/get-started">Get Started</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        BBG — Better Bone Guidance · Early osteoarthritis screening platform
      </footer>
    </div>
  );
}
