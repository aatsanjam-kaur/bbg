CREATE POLICY "own media upload" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id IN ('gait-videos','xray-images') AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "own media read" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id IN ('gait-videos','xray-images') AND ((storage.foldername(name))[1] = auth.uid()::text OR public.has_role(auth.uid(), 'healthcare_worker')));

CREATE POLICY "own media delete" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id IN ('gait-videos','xray-images') AND (storage.foldername(name))[1] = auth.uid()::text);