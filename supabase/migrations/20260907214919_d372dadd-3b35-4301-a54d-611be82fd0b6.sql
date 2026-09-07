CREATE TYPE public.app_role AS ENUM ('patient', 'healthcare_worker');
CREATE TYPE public.risk_level AS ENUM ('low', 'medium', 'high');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT,
  role public.app_role NOT NULL DEFAULT 'patient',
  age INT,
  sex TEXT,
  height_cm NUMERIC,
  weight_kg NUMERIC,
  medical_history TEXT,
  worker_id TEXT,
  organization TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "profiles own read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(), 'healthcare_worker'));
CREATE POLICY "profiles own insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles own update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE r public.app_role;
BEGIN
  r := COALESCE(NULLIF(NEW.raw_user_meta_data ->> 'role', ''), 'patient')::public.app_role;
  INSERT INTO public.profiles (id, full_name, email, phone, role, age, sex, worker_id, organization)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.email, ''),
    NEW.raw_user_meta_data ->> 'phone',
    r,
    NULLIF(NEW.raw_user_meta_data ->> 'age', '')::INT,
    NEW.raw_user_meta_data ->> 'sex',
    NEW.raw_user_meta_data ->> 'worker_id',
    NEW.raw_user_meta_data ->> 'organization'
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, r) ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.questionnaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  responses JSONB NOT NULL DEFAULT '{}'::jsonb,
  age INT, sex TEXT, height_cm NUMERIC, weight_kg NUMERIC, bmi NUMERIC,
  subscale_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
  koos_total NUMERIC,
  risk_score NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.gait_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  video_url TEXT,
  analysis_results JSONB NOT NULL DEFAULT '{}'::jsonb,
  gait_score NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.xray_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  image_url TEXT,
  ai_results JSONB NOT NULL DEFAULT '{}'::jsonb,
  severity_grade INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.screenings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  questionnaire_id UUID REFERENCES public.questionnaires ON DELETE SET NULL,
  gait_id UUID REFERENCES public.gait_analyses ON DELETE SET NULL,
  xray_id UUID REFERENCES public.xray_reports ON DELETE SET NULL,
  risk public.risk_level NOT NULL DEFAULT 'low',
  confidence NUMERIC,
  combined_score NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.final_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  screening_id UUID REFERENCES public.screenings ON DELETE SET NULL,
  recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
  severity_score NUMERIC,
  summary TEXT,
  shared_with_worker BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  centre TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'clinic',
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'requested',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.care_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  worker_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  decision TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  action TEXT NOT NULL,
  detail TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.questionnaires, public.gait_analyses, public.xray_reports, public.screenings, public.final_reports, public.appointments, public.care_decisions, public.notifications, public.activity_logs TO authenticated;
GRANT ALL ON public.questionnaires, public.gait_analyses, public.xray_reports, public.screenings, public.final_reports, public.appointments, public.care_decisions, public.notifications, public.activity_logs TO service_role;

ALTER TABLE public.questionnaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gait_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xray_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screenings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.final_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "q read" ON public.questionnaires FOR SELECT TO authenticated USING (auth.uid() = patient_id OR public.has_role(auth.uid(), 'healthcare_worker'));
CREATE POLICY "q write" ON public.questionnaires FOR INSERT TO authenticated WITH CHECK (auth.uid() = patient_id);
CREATE POLICY "q update" ON public.questionnaires FOR UPDATE TO authenticated USING (auth.uid() = patient_id) WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "g read" ON public.gait_analyses FOR SELECT TO authenticated USING (auth.uid() = patient_id OR public.has_role(auth.uid(), 'healthcare_worker'));
CREATE POLICY "g write" ON public.gait_analyses FOR INSERT TO authenticated WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "x read" ON public.xray_reports FOR SELECT TO authenticated USING (auth.uid() = patient_id OR public.has_role(auth.uid(), 'healthcare_worker'));
CREATE POLICY "x write" ON public.xray_reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "s read" ON public.screenings FOR SELECT TO authenticated USING (auth.uid() = patient_id OR public.has_role(auth.uid(), 'healthcare_worker'));
CREATE POLICY "s write" ON public.screenings FOR INSERT TO authenticated WITH CHECK (auth.uid() = patient_id);
CREATE POLICY "s update" ON public.screenings FOR UPDATE TO authenticated USING (auth.uid() = patient_id) WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "r read" ON public.final_reports FOR SELECT TO authenticated USING (auth.uid() = patient_id OR public.has_role(auth.uid(), 'healthcare_worker'));
CREATE POLICY "r write" ON public.final_reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = patient_id);
CREATE POLICY "r update" ON public.final_reports FOR UPDATE TO authenticated USING (auth.uid() = patient_id) WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "a read" ON public.appointments FOR SELECT TO authenticated USING (auth.uid() = patient_id OR public.has_role(auth.uid(), 'healthcare_worker'));
CREATE POLICY "a write" ON public.appointments FOR INSERT TO authenticated WITH CHECK (auth.uid() = patient_id);
CREATE POLICY "a update" ON public.appointments FOR UPDATE TO authenticated USING (auth.uid() = patient_id OR public.has_role(auth.uid(), 'healthcare_worker')) WITH CHECK (true);

CREATE POLICY "cd read" ON public.care_decisions FOR SELECT TO authenticated USING (auth.uid() = patient_id OR public.has_role(auth.uid(), 'healthcare_worker'));
CREATE POLICY "cd write" ON public.care_decisions FOR INSERT TO authenticated WITH CHECK (auth.uid() = worker_id AND public.has_role(auth.uid(), 'healthcare_worker'));

CREATE POLICY "n read" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "n write" ON public.notifications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "n update" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "log read" ON public.activity_logs FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'healthcare_worker'));
CREATE POLICY "log write" ON public.activity_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);