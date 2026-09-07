import { supabase } from "@/integrations/supabase/client";

export async function notify(userId: string, title: string, body?: string) {
  await supabase.from("notifications").insert({ user_id: userId, title, body: body ?? null });
}

export async function logActivity(userId: string, action: string, detail?: string) {
  await supabase.from("activity_logs").insert({ user_id: userId, action, detail: detail ?? null });
}

/** Notify every healthcare worker (used for consultation requests and shared reports). */
export async function notifyWorkers(title: string, body: string) {
  const { data } = await supabase.from("profiles").select("id").eq("role", "healthcare_worker");
  const rows = (data ?? []).map((w: { id: string }) => ({ user_id: w.id, title, body }));
  if (rows.length) await supabase.from("notifications").insert(rows);
}
