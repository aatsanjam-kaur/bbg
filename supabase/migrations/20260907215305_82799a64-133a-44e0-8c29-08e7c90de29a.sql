CREATE OR REPLACE FUNCTION public.notify_all_workers(_title text, _body text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN; END IF;
  INSERT INTO public.notifications (user_id, title, body)
  SELECT id, _title, _body FROM public.profiles WHERE role = 'healthcare_worker';
END;
$$;
REVOKE ALL ON FUNCTION public.notify_all_workers(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.notify_all_workers(text, text) TO authenticated, service_role;