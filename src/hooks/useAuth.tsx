import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: "patient" | "healthcare_worker";
  age: number | null;
  sex: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  medical_history: string | null;
  worker_id: string | null;
  organization: string | null;
};

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async (s: Session | null) => {
      if (!active) return;
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        const { data } = await supabase.from("profiles").select("*").eq("id", s.user.id).maybeSingle();
        if (active) setProfile((data as Profile | null) ?? null);
      } else {
        setProfile(null);
      }
      if (active) setLoading(false);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      void load(s);
    });
    void supabase.auth.getSession().then(({ data }) => load(data.session));

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, user, profile, loading, isWorker: profile?.role === "healthcare_worker" };
}
