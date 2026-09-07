import { supabase } from "@/integrations/supabase/client";

export async function notify(userId: string, title: string, body?: string) {
  await supabase.from("notifications").insert({ user_id: userId, title, body: body ?? null });
}

export async function logActivity(userId: string, action: string, detail?: string) {
  await supabase.from("activity_logs").insert({ user_id: userId, action, detail: detail ?? null });
}

/** Notify every healthcare worker (consultation requests, shared reports). */
export async function notifyWorkers(title: string, body: string) {
  await supabase.rpc("notify_all_workers", { _title: title, _body: body });
}
