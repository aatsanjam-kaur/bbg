export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string
          detail: string | null
          id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          detail?: string | null
          id?: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          detail?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          centre: string
          created_at: string
          id: string
          mode: string
          notes: string | null
          patient_id: string
          scheduled_at: string
          status: string
        }
        Insert: {
          centre: string
          created_at?: string
          id?: string
          mode?: string
          notes?: string | null
          patient_id: string
          scheduled_at: string
          status?: string
        }
        Update: {
          centre?: string
          created_at?: string
          id?: string
          mode?: string
          notes?: string | null
          patient_id?: string
          scheduled_at?: string
          status?: string
        }
        Relationships: []
      }
      care_decisions: {
        Row: {
          created_at: string
          decision: string
          id: string
          notes: string | null
          patient_id: string
          worker_id: string
        }
        Insert: {
          created_at?: string
          decision: string
          id?: string
          notes?: string | null
          patient_id: string
          worker_id: string
        }
        Update: {
          created_at?: string
          decision?: string
          id?: string
          notes?: string | null
          patient_id?: string
          worker_id?: string
        }
        Relationships: []
      }
      final_reports: {
        Row: {
          created_at: string
          id: string
          patient_id: string
          recommendations: Json
          screening_id: string | null
          severity_score: number | null
          shared_with_worker: boolean
          summary: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          patient_id: string
          recommendations?: Json
          screening_id?: string | null
          severity_score?: number | null
          shared_with_worker?: boolean
          summary?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          patient_id?: string
          recommendations?: Json
          screening_id?: string | null
          severity_score?: number | null
          shared_with_worker?: boolean
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "final_reports_screening_id_fkey"
            columns: ["screening_id"]
            isOneToOne: false
            referencedRelation: "screenings"
            referencedColumns: ["id"]
          },
        ]
      }
      gait_analyses: {
        Row: {
          analysis_results: Json
          created_at: string
          gait_score: number | null
          id: string
          patient_id: string
          video_url: string | null
        }
        Insert: {
          analysis_results?: Json
          created_at?: string
          gait_score?: number | null
          id?: string
          patient_id: string
          video_url?: string | null
        }
        Update: {
          analysis_results?: Json
          created_at?: string
          gait_score?: number | null
          id?: string
          patient_id?: string
          video_url?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          read: boolean
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          read?: boolean
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          read?: boolean
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          created_at: string
          email: string
          full_name: string
          height_cm: number | null
          id: string
          medical_history: string | null
          organization: string | null
          phone: string | null
          role: Database["public"]["Enums"]["app_role"]
          sex: string | null
          updated_at: string
          weight_kg: number | null
          worker_id: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string
          email?: string
          full_name?: string
          height_cm?: number | null
          id: string
          medical_history?: string | null
          organization?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          sex?: string | null
          updated_at?: string
          weight_kg?: number | null
          worker_id?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string
          email?: string
          full_name?: string
          height_cm?: number | null
          id?: string
          medical_history?: string | null
          organization?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          sex?: string | null
          updated_at?: string
          weight_kg?: number | null
          worker_id?: string | null
        }
        Relationships: []
      }
      questionnaires: {
        Row: {
          age: number | null
          bmi: number | null
          created_at: string
          height_cm: number | null
          id: string
          koos_total: number | null
          patient_id: string
          responses: Json
          risk_score: number | null
          sex: string | null
          subscale_scores: Json
          weight_kg: number | null
        }
        Insert: {
          age?: number | null
          bmi?: number | null
          created_at?: string
          height_cm?: number | null
          id?: string
          koos_total?: number | null
          patient_id: string
          responses?: Json
          risk_score?: number | null
          sex?: string | null
          subscale_scores?: Json
          weight_kg?: number | null
        }
        Update: {
          age?: number | null
          bmi?: number | null
          created_at?: string
          height_cm?: number | null
          id?: string
          koos_total?: number | null
          patient_id?: string
          responses?: Json
          risk_score?: number | null
          sex?: string | null
          subscale_scores?: Json
          weight_kg?: number | null
        }
        Relationships: []
      }
      screenings: {
        Row: {
          combined_score: number | null
          confidence: number | null
          created_at: string
          gait_id: string | null
          id: string
          patient_id: string
          questionnaire_id: string | null
          risk: Database["public"]["Enums"]["risk_level"]
          xray_id: string | null
        }
        Insert: {
          combined_score?: number | null
          confidence?: number | null
          created_at?: string
          gait_id?: string | null
          id?: string
          patient_id: string
          questionnaire_id?: string | null
          risk?: Database["public"]["Enums"]["risk_level"]
          xray_id?: string | null
        }
        Update: {
          combined_score?: number | null
          confidence?: number | null
          created_at?: string
          gait_id?: string | null
          id?: string
          patient_id?: string
          questionnaire_id?: string | null
          risk?: Database["public"]["Enums"]["risk_level"]
          xray_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "screenings_gait_id_fkey"
            columns: ["gait_id"]
            isOneToOne: false
            referencedRelation: "gait_analyses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "screenings_questionnaire_id_fkey"
            columns: ["questionnaire_id"]
            isOneToOne: false
            referencedRelation: "questionnaires"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "screenings_xray_id_fkey"
            columns: ["xray_id"]
            isOneToOne: false
            referencedRelation: "xray_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      xray_reports: {
        Row: {
          ai_results: Json
          created_at: string
          id: string
          image_url: string | null
          patient_id: string
          severity_grade: number | null
        }
        Insert: {
          ai_results?: Json
          created_at?: string
          id?: string
          image_url?: string | null
          patient_id: string
          severity_grade?: number | null
        }
        Update: {
          ai_results?: Json
          created_at?: string
          id?: string
          image_url?: string | null
          patient_id?: string
          severity_grade?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "patient" | "healthcare_worker"
      risk_level: "low" | "medium" | "high"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["patient", "healthcare_worker"],
      risk_level: ["low", "medium", "high"],
    },
  },
} as const
