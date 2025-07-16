export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      incidents: {
        Row: {
          assigned_to: string | null
          coordinates: unknown | null
          created_at: string | null
          description: string | null
          id: string
          location: string | null
          reported_by: string
          resolution_notes: string | null
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string | null
          shipment_id: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          coordinates?: unknown | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          reported_by: string
          resolution_notes?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
          shipment_id: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          coordinates?: unknown | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          reported_by?: string
          resolution_notes?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
          shipment_id?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incidents_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidents_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidents_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidents_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "active_shipments_dashboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidents_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipment_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidents_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          expiry_date: string | null
          fragile: boolean | null
          hazardous: boolean | null
          id: string
          name: string
          quantity: number
          shipment_id: string | null
          sku: string | null
          temperature_sensitive: boolean | null
          unit: string | null
          updated_at: string | null
          value: number | null
          volume_m3: number | null
          warehouse_id: string | null
          weight_kg: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          expiry_date?: string | null
          fragile?: boolean | null
          hazardous?: boolean | null
          id?: string
          name: string
          quantity: number
          shipment_id?: string | null
          sku?: string | null
          temperature_sensitive?: boolean | null
          unit?: string | null
          updated_at?: string | null
          value?: number | null
          volume_m3?: number | null
          warehouse_id?: string | null
          weight_kg?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          expiry_date?: string | null
          fragile?: boolean | null
          hazardous?: boolean | null
          id?: string
          name?: string
          quantity?: number
          shipment_id?: string | null
          sku?: string | null
          temperature_sensitive?: boolean | null
          unit?: string | null
          updated_at?: string | null
          value?: number | null
          volume_m3?: number | null
          warehouse_id?: string | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_items_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "active_shipments_dashboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_items_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipment_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_items_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_items_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          message: string
          priority: string | null
          read: boolean | null
          read_at: string | null
          related_incident_id: string | null
          related_shipment_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          message: string
          priority?: string | null
          read?: boolean | null
          read_at?: string | null
          related_incident_id?: string | null
          related_shipment_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          message?: string
          priority?: string | null
          read?: boolean | null
          read_at?: string | null
          related_incident_id?: string | null
          related_shipment_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_related_incident_id_fkey"
            columns: ["related_incident_id"]
            isOneToOne: false
            referencedRelation: "incidents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_shipment_id_fkey"
            columns: ["related_shipment_id"]
            isOneToOne: false
            referencedRelation: "active_shipments_dashboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_shipment_id_fkey"
            columns: ["related_shipment_id"]
            isOneToOne: false
            referencedRelation: "shipment_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_shipment_id_fkey"
            columns: ["related_shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      shipment_updates: {
        Row: {
          coordinates: unknown | null
          created_at: string | null
          id: string
          is_automated: boolean | null
          location: string | null
          note: string | null
          shipment_id: string
          status: string
          updated_by: string | null
        }
        Insert: {
          coordinates?: unknown | null
          created_at?: string | null
          id?: string
          is_automated?: boolean | null
          location?: string | null
          note?: string | null
          shipment_id: string
          status: string
          updated_by?: string | null
        }
        Update: {
          coordinates?: unknown | null
          created_at?: string | null
          id?: string
          is_automated?: boolean | null
          location?: string | null
          note?: string | null
          shipment_id?: string
          status?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipment_updates_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "active_shipments_dashboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipment_updates_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipment_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipment_updates_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipment_updates_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          actual_delivery_time: string | null
          actual_pickup_time: string | null
          client_id: string
          cost: number | null
          created_at: string | null
          delivered_at: string | null
          description: string | null
          destination: string
          destination_coordinates: unknown | null
          destination_warehouse_id: string | null
          driver_id: string | null
          estimated_delivery: string | null
          fragile: boolean | null
          id: string
          origin: string
          origin_coordinates: unknown | null
          origin_warehouse_id: string | null
          priority: string | null
          scheduled_date: string | null
          scheduled_time: string | null
          special_instructions: string | null
          status: string
          temperature_sensitive: boolean | null
          title: string
          total_volume_m3: number | null
          total_weight_kg: number | null
          tracking_number: string | null
          updated_at: string | null
          vehicle_id: string | null
        }
        Insert: {
          actual_delivery_time?: string | null
          actual_pickup_time?: string | null
          client_id: string
          cost?: number | null
          created_at?: string | null
          delivered_at?: string | null
          description?: string | null
          destination: string
          destination_coordinates?: unknown | null
          destination_warehouse_id?: string | null
          driver_id?: string | null
          estimated_delivery?: string | null
          fragile?: boolean | null
          id?: string
          origin: string
          origin_coordinates?: unknown | null
          origin_warehouse_id?: string | null
          priority?: string | null
          scheduled_date?: string | null
          scheduled_time?: string | null
          special_instructions?: string | null
          status?: string
          temperature_sensitive?: boolean | null
          title: string
          total_volume_m3?: number | null
          total_weight_kg?: number | null
          tracking_number?: string | null
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Update: {
          actual_delivery_time?: string | null
          actual_pickup_time?: string | null
          client_id?: string
          cost?: number | null
          created_at?: string | null
          delivered_at?: string | null
          description?: string | null
          destination?: string
          destination_coordinates?: unknown | null
          destination_warehouse_id?: string | null
          driver_id?: string | null
          estimated_delivery?: string | null
          fragile?: boolean | null
          id?: string
          origin?: string
          origin_coordinates?: unknown | null
          origin_warehouse_id?: string | null
          priority?: string | null
          scheduled_date?: string | null
          scheduled_time?: string | null
          special_instructions?: string | null
          status?: string
          temperature_sensitive?: boolean | null
          title?: string
          total_volume_m3?: number | null
          total_weight_kg?: number | null
          tracking_number?: string | null
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_destination_warehouse_id_fkey"
            columns: ["destination_warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_origin_warehouse_id_fkey"
            columns: ["origin_warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          role_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          role_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          role_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          capacity_kg: number | null
          created_at: string | null
          driver_id: string | null
          fuel_type: string | null
          id: string
          last_maintenance: string | null
          license_plate: string
          make: string | null
          model: string | null
          next_maintenance: string | null
          status: string
          type: string
          updated_at: string | null
          warehouse_id: string | null
          year: number | null
        }
        Insert: {
          capacity_kg?: number | null
          created_at?: string | null
          driver_id?: string | null
          fuel_type?: string | null
          id?: string
          last_maintenance?: string | null
          license_plate: string
          make?: string | null
          model?: string | null
          next_maintenance?: string | null
          status?: string
          type: string
          updated_at?: string | null
          warehouse_id?: string | null
          year?: number | null
        }
        Update: {
          capacity_kg?: number | null
          created_at?: string | null
          driver_id?: string | null
          fuel_type?: string | null
          id?: string
          last_maintenance?: string | null
          license_plate?: string
          make?: string | null
          model?: string | null
          next_maintenance?: string | null
          status?: string
          type?: string
          updated_at?: string | null
          warehouse_id?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      warehouses: {
        Row: {
          address: string | null
          capacity_m3: number | null
          coordinates: unknown | null
          created_at: string | null
          id: string
          is_active: boolean | null
          location: string
          manager_id: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          capacity_m3?: number | null
          coordinates?: unknown | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          location: string
          manager_id?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          capacity_m3?: number | null
          coordinates?: unknown | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          location?: string
          manager_id?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "warehouses_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      active_shipments_dashboard: {
        Row: {
          client_name: string | null
          destination: string | null
          driver_name: string | null
          id: string | null
          incident_count: number | null
          license_plate: string | null
          origin: string | null
          priority: string | null
          scheduled_date: string | null
          status: string | null
          title: string | null
          tracking_number: string | null
        }
        Relationships: []
      }
      shipment_details: {
        Row: {
          actual_delivery_time: string | null
          actual_pickup_time: string | null
          client_email: string | null
          client_id: string | null
          client_name: string | null
          client_role: string | null
          cost: number | null
          created_at: string | null
          delivered_at: string | null
          description: string | null
          destination: string | null
          destination_coordinates: unknown | null
          destination_warehouse_id: string | null
          driver_id: string | null
          driver_name: string | null
          estimated_delivery: string | null
          fragile: boolean | null
          id: string | null
          license_plate: string | null
          origin: string | null
          origin_coordinates: unknown | null
          origin_warehouse_id: string | null
          priority: string | null
          scheduled_date: string | null
          scheduled_time: string | null
          special_instructions: string | null
          status: string | null
          temperature_sensitive: boolean | null
          title: string | null
          total_volume_m3: number | null
          total_weight_kg: number | null
          tracking_number: string | null
          updated_at: string | null
          vehicle_id: string | null
          vehicle_type: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_destination_warehouse_id_fkey"
            columns: ["destination_warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_origin_warehouse_id_fkey"
            columns: ["origin_warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      shipment_timeline: {
        Row: {
          coordinates: unknown | null
          created_at: string | null
          id: string | null
          is_automated: boolean | null
          location: string | null
          note: string | null
          shipment_id: string | null
          shipment_title: string | null
          status: string | null
          tracking_number: string | null
          updated_by: string | null
          updated_by_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipment_updates_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "active_shipments_dashboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipment_updates_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipment_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipment_updates_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipment_updates_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      verify_schema: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
