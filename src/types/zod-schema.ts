import { z } from "zod";

// ================================================================
// ENUMS & CONSTANTS
// ================================================================

export const RoleEnum = z.enum([
  "admin",
  "driver",
  "client",
  "manager",
  "warehouse_staff",
]);
export const ShipmentStatusEnum = z.enum([
  "pending",
  "confirmed",
  "dispatched",
  "in_transit",
  "delivered",
  "cancelled",
  "returned",
]);
export const PriorityEnum = z.enum(["low", "normal", "high", "urgent"]);
export const VehicleTypeEnum = z.enum([
  "van",
  "truck",
  "motorcycle",
  "cargo_bike",
]);
export const VehicleStatusEnum = z.enum([
  "available",
  "in_service",
  "maintenance",
  "out_of_service",
]);
export const FuelTypeEnum = z.enum(["petrol", "diesel", "electric", "hybrid"]);
export const IncidentTypeEnum = z.enum([
  "delay",
  "damage",
  "theft",
  "accident",
  "weather",
  "mechanical",
  "other",
]);
export const SeverityEnum = z.enum(["low", "medium", "high", "critical"]);
export const NotificationTypeEnum = z.enum([
  "shipment_update",
  "incident_alert",
  "system_message",
  "reminder",
  "emergency",
]);
export const UnitEnum = z.enum(["pieces", "kg", "liters", "boxes", "pallets"]);
export const AuditActionEnum = z.enum([
  "CREATE",
  "READ",
  "UPDATE",
  "DELETE",
  "LOGIN",
  "LOGOUT",
]);

// ================================================================
// BASE SCHEMAS
// ================================================================

const UUIDSchema = z.string().uuid();
const EmailSchema = z.string().email();
const PhoneSchema = z.string().min(10).max(15).nullable();
const PositiveNumberSchema = z.number().positive();
const NonNegativeNumberSchema = z.number().min(0);
const DateTimeSchema = z.string().datetime().nullable();
const DateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .nullable();
const TimeSchema = z
  .string()
  .regex(/^\d{2}:\d{2}(:\d{2})?$/)
  .nullable();

// ================================================================
// ROLES SCHEMA
// ================================================================

export const RoleRowSchema = z.object({
  id: UUIDSchema,
  name: RoleEnum, // RoleEnum could be used if enforced
  description: z.string().nullable(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const RoleInsertSchema = z.object({
  id: UUIDSchema.optional(),
  name: RoleEnum,
  description: z.string().nullable().optional(),
  created_at: DateTimeSchema.optional(),
  updated_at: DateTimeSchema.optional(),
});

export const RoleUpdateSchema = z.object({
  id: UUIDSchema.optional(),
  name: RoleEnum.optional(),
  description: z.string().nullable().optional(),
  created_at: DateTimeSchema.optional(),
  updated_at: DateTimeSchema.optional(),
});

// ================================================================
// USERS SCHEMA
// ================================================================

export const UserRowSchema = z.object({
  id: UUIDSchema,
  name: z.string().min(2).max(100),
  email: EmailSchema,
  phone: PhoneSchema,
  role_id: UUIDSchema,
  is_active: z.boolean().nullable(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const UserInsertSchema = z.object({
  id: UUIDSchema,
  name: z.string().min(2).max(100),
  email: EmailSchema,
  phone: PhoneSchema,
  role_id: UUIDSchema,
  is_active: z.boolean().nullable().optional(),
  created_at: DateTimeSchema.optional(),
  updated_at: DateTimeSchema.optional(),
});

export const UserUpdateSchema = z.object({
  id: UUIDSchema.optional(),
  name: z.string().min(2).max(100).optional(),
  email: EmailSchema.optional(),
  phone: PhoneSchema.optional(),
  role_id: UUIDSchema.optional(),
  is_active: z.boolean().nullable().optional(),
  created_at: DateTimeSchema.optional(),
  updated_at: DateTimeSchema.optional(),
});

export const UpdateUserProfileSchema = z.object({
  name: z.string().min(2).max(100),
  phone: PhoneSchema,
});

// ================================================================
// WAREHOUSES SCHEMA
// ================================================================

export const WarehouseRowSchema = z.object({
  id: UUIDSchema,
  name: z.string().min(2).max(100),
  location: z.string().min(2).max(200),
  address: z.string().nullable(),
  coordinates: z.any().nullable(), // Consider z.object({ lat: z.number(), lng: z.number() }) if format known
  capacity_m3: PositiveNumberSchema.nullable(),
  manager_id: UUIDSchema.nullable(),
  is_active: z.boolean().nullable(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const WarehouseInsertSchema = z.object({
  id: UUIDSchema.optional(),
  name: z.string().min(2).max(100),
  location: z.string().min(2).max(200),
  address: z.string().nullable().optional(),
  coordinates: z.any().nullable().optional(),
  capacity_m3: PositiveNumberSchema.nullable().optional(),
  manager_id: UUIDSchema.nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  created_at: DateTimeSchema.optional(),
  updated_at: DateTimeSchema.optional(),
});

export const WarehouseUpdateSchema = z.object({
  id: UUIDSchema.optional(),
  name: z.string().min(2).max(100).optional(),
  location: z.string().min(2).max(200).optional(),
  address: z.string().nullable().optional(),
  coordinates: z.any().nullable().optional(),
  capacity_m3: PositiveNumberSchema.nullable().optional(),
  manager_id: UUIDSchema.nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  created_at: DateTimeSchema.optional(),
  updated_at: DateTimeSchema.optional(),
});

// ================================================================
// VEHICLES SCHEMA
// ================================================================

export const VehicleRowSchema = z.object({
  id: UUIDSchema,
  license_plate: z.string().min(3).max(20),
  type: VehicleTypeEnum, // VehicleTypeEnum could be used if enforced
  make: z.string().nullable(),
  model: z.string().nullable(),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .nullable(),
  capacity_kg: PositiveNumberSchema.nullable(),
  fuel_type: FuelTypeEnum.nullable(), // FuelTypeEnum could be used if enforced
  status: VehicleStatusEnum, // VehicleStatusEnum could be used if enforced
  last_maintenance: DateSchema,
  next_maintenance: DateSchema,
  driver_id: UUIDSchema.nullable(),
  warehouse_id: UUIDSchema.nullable(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const VehicleInsertSchema = z.object({
  id: UUIDSchema.optional(),
  license_plate: z.string().min(3).max(20),
  type: VehicleTypeEnum,
  make: z.string().nullable().optional(),
  model: z.string().nullable().optional(),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .nullable()
    .optional(),
  capacity_kg: PositiveNumberSchema.nullable().optional(),
  fuel_type: FuelTypeEnum.nullable().optional(),
  status: VehicleStatusEnum.optional(),
  last_maintenance: DateSchema.optional(),
  next_maintenance: DateSchema.optional(),
  driver_id: UUIDSchema.nullable().optional(),
  warehouse_id: UUIDSchema.nullable().optional(),
  created_at: DateTimeSchema.optional(),
  updated_at: DateTimeSchema.optional(),
});

export const VehicleUpdateSchema = z.object({
  id: UUIDSchema.optional(),
  license_plate: z.string().min(3).max(20).optional(),
  type: VehicleTypeEnum.optional(),
  make: z.string().nullable().optional(),
  model: z.string().nullable().optional(),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .nullable()
    .optional(),
  capacity_kg: PositiveNumberSchema.nullable().optional(),
  fuel_type: FuelTypeEnum.nullable().optional(),
  status: VehicleStatusEnum.optional(),
  last_maintenance: DateSchema.optional(),
  next_maintenance: DateSchema.optional(),
  driver_id: UUIDSchema.nullable().optional(),
  warehouse_id: UUIDSchema.nullable().optional(),
  created_at: DateTimeSchema.optional(),
  updated_at: DateTimeSchema.optional(),
});

// ================================================================
// SHIPMENTS SCHEMA
// ================================================================

export const ShipmentRowSchema = z.object({
  id: UUIDSchema,
  title: z.string().min(3).max(200),
  description: z.string().nullable(),
  status: ShipmentStatusEnum, // ShipmentStatusEnum could be used if enforced
  priority: PriorityEnum.nullable(), // PriorityEnum could be used if enforced
  origin: z.string().min(2).max(500),
  destination: z.string().min(2).max(500),
  origin_coordinates: z.any().nullable(),
  destination_coordinates: z.any().nullable(),
  client_id: UUIDSchema,
  driver_id: UUIDSchema.nullable(),
  vehicle_id: UUIDSchema.nullable(),
  origin_warehouse_id: UUIDSchema.nullable(),
  destination_warehouse_id: UUIDSchema.nullable(),
  scheduled_date: DateSchema,
  scheduled_time: TimeSchema,
  estimated_delivery: DateTimeSchema,
  actual_pickup_time: DateTimeSchema,
  actual_delivery_time: DateTimeSchema,
  delivered_at: DateTimeSchema,
  total_weight_kg: NonNegativeNumberSchema.nullable(),
  total_volume_m3: NonNegativeNumberSchema.nullable(),
  fragile: z.boolean().nullable(),
  temperature_sensitive: z.boolean().nullable(),
  special_instructions: z.string().nullable(),
  tracking_number: z.string().nullable(),
  cost: NonNegativeNumberSchema.nullable(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const ShipmentInsertSchema = z.object({
  id: UUIDSchema.optional(),
  title: z.string().min(3).max(200),
  description: z.string().nullable().optional(),
  status: ShipmentStatusEnum.optional(),
  priority: PriorityEnum.nullable().optional(),
  origin: z.string().min(2).max(500),
  destination: z.string().min(2).max(500),
  origin_coordinates: z.any().nullable().optional(),
  destination_coordinates: z.any().nullable().optional(),
  client_id: UUIDSchema,
  driver_id: UUIDSchema.nullable().optional(),
  vehicle_id: UUIDSchema.nullable().optional(),
  origin_warehouse_id: UUIDSchema.nullable().optional(),
  destination_warehouse_id: UUIDSchema.nullable().optional(),
  scheduled_date: DateSchema.optional(),
  scheduled_time: TimeSchema.optional(),
  estimated_delivery: DateTimeSchema.optional(),
  actual_pickup_time: DateTimeSchema.optional(),
  actual_delivery_time: DateTimeSchema.optional(),
  delivered_at: DateTimeSchema.optional(),
  total_weight_kg: NonNegativeNumberSchema.nullable().optional(),
  total_volume_m3: NonNegativeNumberSchema.nullable().optional(),
  fragile: z.boolean().nullable().optional(),
  temperature_sensitive: z.boolean().nullable().optional(),
  special_instructions: z.string().nullable().optional(),
  tracking_number: z.string().nullable().optional(),
  cost: NonNegativeNumberSchema.nullable().optional(),
  created_at: DateTimeSchema.optional(),
  updated_at: DateTimeSchema.optional(),
});

export const ShipmentUpdateSchema = z.object({
  id: UUIDSchema.optional(),
  title: z.string().min(3).max(200).optional(),
  description: z.string().nullable().optional(),
  status: ShipmentStatusEnum.optional(),
  priority: PriorityEnum.nullable().optional(),
  origin: z.string().min(2).max(500).optional(),
  destination: z.string().min(2).max(500).optional(),
  origin_coordinates: z.any().nullable().optional(),
  destination_coordinates: z.any().nullable().optional(),
  client_id: UUIDSchema.optional(),
  driver_id: UUIDSchema.nullable().optional(),
  vehicle_id: UUIDSchema.nullable().optional(),
  origin_warehouse_id: UUIDSchema.nullable().optional(),
  destination_warehouse_id: UUIDSchema.nullable().optional(),
  scheduled_date: DateSchema.optional(),
  scheduled_time: TimeSchema.optional(),
  estimated_delivery: DateTimeSchema.optional(),
  actual_pickup_time: DateTimeSchema.optional(),
  actual_delivery_time: DateTimeSchema.optional(),
  delivered_at: DateTimeSchema.optional(),
  total_weight_kg: NonNegativeNumberSchema.nullable().optional(),
  total_volume_m3: NonNegativeNumberSchema.nullable().optional(),
  fragile: z.boolean().nullable().optional(),
  temperature_sensitive: z.boolean().nullable().optional(),
  special_instructions: z.string().nullable().optional(),
  tracking_number: z.string().nullable().optional(),
  cost: NonNegativeNumberSchema.nullable().optional(),
  created_at: DateTimeSchema.optional(),
  updated_at: DateTimeSchema.optional(),
});

export const UpdateShipmentStatusSchema = z.object({
  status: ShipmentStatusEnum, // ShipmentStatusEnum could be used if enforced
  location: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
});

// ================================================================
// SHIPMENT UPDATES SCHEMA
// ================================================================

export const ShipmentUpdateRowSchema = z.object({
  id: UUIDSchema,
  shipment_id: UUIDSchema,
  status: z.string(),
  location: z.string().nullable(),
  coordinates: z.any().nullable(),
  note: z.string().nullable(),
  updated_by: UUIDSchema.nullable(),
  is_automated: z.boolean().nullable(),
  created_at: DateTimeSchema,
});

export const ShipmentUpdateInsertSchema = z.object({
  id: UUIDSchema.optional(),
  shipment_id: UUIDSchema,
  status: z.string(),
  location: z.string().nullable().optional(),
  coordinates: z.any().nullable().optional(),
  note: z.string().nullable().optional(),
  updated_by: UUIDSchema.nullable().optional(),
  is_automated: z.boolean().nullable().optional(),
  created_at: DateTimeSchema.optional(),
});

export const ShipmentUpdateUpdateSchema = z.object({
  id: UUIDSchema.optional(),
  shipment_id: UUIDSchema.optional(),
  status: z.string().optional(),
  location: z.string().nullable().optional(),
  coordinates: z.any().nullable().optional(),
  note: z.string().nullable().optional(),
  updated_by: UUIDSchema.nullable().optional(),
  is_automated: z.boolean().nullable().optional(),
  created_at: DateTimeSchema.optional(),
});

// ================================================================
// INVENTORY ITEMS SCHEMA
// ================================================================

export const InventoryItemRowSchema = z.object({
  id: UUIDSchema,
  shipment_id: UUIDSchema.nullable(),
  warehouse_id: UUIDSchema.nullable(),
  name: z.string().min(2).max(200),
  description: z.string().nullable(),
  sku: z.string().nullable(),
  category: z.string().nullable(),
  quantity: NonNegativeNumberSchema,
  unit: UnitEnum.nullable(), // UnitEnum could be used if enforced
  weight_kg: NonNegativeNumberSchema.nullable(),
  volume_m3: NonNegativeNumberSchema.nullable(),
  value: NonNegativeNumberSchema.nullable(),
  fragile: z.boolean().nullable(),
  temperature_sensitive: z.boolean().nullable(),
  hazardous: z.boolean().nullable(),
  expiry_date: DateSchema,
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const InventoryItemInsertSchema = z.object({
  id: UUIDSchema.optional(),
  shipment_id: UUIDSchema.nullable().optional(),
  warehouse_id: UUIDSchema.nullable().optional(),
  name: z.string().min(2).max(200),
  description: z.string().nullable().optional(),
  sku: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  quantity: NonNegativeNumberSchema,
  unit: UnitEnum.nullable().optional(),
  weight_kg: NonNegativeNumberSchema.nullable().optional(),
  volume_m3: NonNegativeNumberSchema.nullable().optional(),
  value: NonNegativeNumberSchema.nullable().optional(),
  fragile: z.boolean().nullable().optional(),
  temperature_sensitive: z.boolean().nullable().optional(),
  hazardous: z.boolean().nullable().optional(),
  expiry_date: DateSchema.optional(),
  created_at: DateTimeSchema.optional(),
  updated_at: DateTimeSchema.optional(),
});

export const InventoryItemUpdateSchema = z.object({
  id: UUIDSchema.optional(),
  shipment_id: UUIDSchema.nullable().optional(),
  warehouse_id: UUIDSchema.nullable().optional(),
  name: z.string().min(2).max(200).optional(),
  description: z.string().nullable().optional(),
  sku: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  quantity: NonNegativeNumberSchema.optional(),
  unit: UnitEnum.nullable().optional(),
  weight_kg: NonNegativeNumberSchema.nullable().optional(),
  volume_m3: NonNegativeNumberSchema.nullable().optional(),
  value: NonNegativeNumberSchema.nullable().optional(),
  fragile: z.boolean().nullable().optional(),
  temperature_sensitive: z.boolean().nullable().optional(),
  hazardous: z.boolean().nullable().optional(),
  expiry_date: DateSchema.optional(),
  created_at: DateTimeSchema.optional(),
  updated_at: DateTimeSchema.optional(),
});

// ================================================================
// INCIDENTS SCHEMA
// ================================================================

export const IncidentRowSchema = z.object({
  id: UUIDSchema,
  shipment_id: UUIDSchema,
  type: IncidentTypeEnum, // IncidentTypeEnum could be used if enforced
  severity: SeverityEnum.nullable(), // SeverityEnum could be used if enforced
  title: z.string().min(3).max(200),
  description: z.string().nullable(),
  location: z.string().nullable(),
  coordinates: z.any().nullable(),
  reported_by: UUIDSchema,
  assigned_to: UUIDSchema.nullable(),
  resolved: z.boolean().nullable(),
  resolution_notes: z.string().nullable(),
  resolved_at: DateTimeSchema,
  resolved_by: UUIDSchema.nullable(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const IncidentInsertSchema = z.object({
  id: UUIDSchema.optional(),
  shipment_id: UUIDSchema,
  type: IncidentTypeEnum,
  severity: SeverityEnum.nullable().optional(),
  title: z.string().min(3).max(200),
  description: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  coordinates: z.any().nullable().optional(),
  reported_by: UUIDSchema,
  assigned_to: UUIDSchema.nullable().optional(),
  resolved: z.boolean().nullable().optional(),
  resolution_notes: z.string().nullable().optional(),
  resolved_at: DateTimeSchema.optional(),
  resolved_by: UUIDSchema.nullable().optional(),
  created_at: DateTimeSchema.optional(),
  updated_at: DateTimeSchema.optional(),
});

export const IncidentUpdateSchema = z.object({
  id: UUIDSchema.optional(),
  shipment_id: UUIDSchema.optional(),
  type: IncidentTypeEnum.optional(),
  severity: SeverityEnum.nullable().optional(),
  title: z.string().min(3).max(200).optional(),
  description: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  coordinates: z.any().nullable().optional(),
  reported_by: UUIDSchema.optional(),
  assigned_to: UUIDSchema.nullable().optional(),
  resolved: z.boolean().nullable().optional(),
  resolution_notes: z.string().nullable().optional(),
  resolved_at: DateTimeSchema.optional(),
  resolved_by: UUIDSchema.nullable().optional(),
  created_at: DateTimeSchema.optional(),
  updated_at: DateTimeSchema.optional(),
});

export const ResolveIncidentSchema = z.object({
  resolution_notes: z.string().min(10).max(1000).nullable(),
});

// ================================================================
// NOTIFICATIONS SCHEMA
// ================================================================

export const NotificationRowSchema = z.object({
  id: UUIDSchema,
  user_id: UUIDSchema,
  type: NotificationTypeEnum, // NotificationTypeEnum could be used if enforced
  title: z.string().min(3).max(200),
  message: z.string().min(1).max(1000),
  related_shipment_id: UUIDSchema.nullable(),
  related_incident_id: UUIDSchema.nullable(),
  priority: PriorityEnum.nullable(), // PriorityEnum could be used if enforced
  read: z.boolean().nullable(),
  read_at: DateTimeSchema,
  expires_at: DateTimeSchema,
  created_at: DateTimeSchema,
});

export const NotificationInsertSchema = z.object({
  id: UUIDSchema.optional(),
  user_id: UUIDSchema,
  type: NotificationTypeEnum,
  title: z.string().min(3).max(200),
  message: z.string().min(1).max(1000),
  related_shipment_id: UUIDSchema.nullable().optional(),
  related_incident_id: UUIDSchema.nullable().optional(),
  priority: PriorityEnum.nullable().optional(),
  read: z.boolean().nullable().optional(),
  read_at: DateTimeSchema.optional(),
  expires_at: DateTimeSchema.optional(),
  created_at: DateTimeSchema.optional(),
});

export const NotificationUpdateSchema = z.object({
  id: UUIDSchema.optional(),
  user_id: UUIDSchema.optional(),
  type: NotificationTypeEnum.optional(),
  title: z.string().min(3).max(200).optional(),
  message: z.string().min(1).max(1000).optional(),
  related_shipment_id: UUIDSchema.nullable().optional(),
  related_incident_id: UUIDSchema.nullable().optional(),
  priority: PriorityEnum.nullable().optional(),
  read: z.boolean().nullable().optional(),
  read_at: DateTimeSchema.optional(),
  expires_at: DateTimeSchema.optional(),
  created_at: DateTimeSchema.optional(),
});

export const MarkNotificationReadSchema = z.object({
  read: z.boolean(),
});

// ================================================================
// AUDIT LOGS SCHEMA
// ================================================================

export const AuditLogRowSchema = z.object({
  id: UUIDSchema,
  user_id: UUIDSchema.nullable(),
  action: AuditActionEnum, // AuditActionEnum could be used if enforced
  table_name: z.string(),
  record_id: UUIDSchema.nullable(),
  old_values: z.any().nullable(), // JSON; consider z.record() if structure known
  new_values: z.any().nullable(), // JSON; consider z.record() if structure known
  ip_address: z.any().nullable(), // Consider z.string() if IP format known
  user_agent: z.string().nullable(),
  created_at: DateTimeSchema,
});

// ================================================================
// USER PREFERENCES SCHEMA
// ================================================================

export const UserPreferenceRowSchema = z.object({
  user_id: UUIDSchema,
  beta_features_enabled: z.boolean().nullable(),
  language: z.string().nullable(),
  notifications_enabled: z.boolean().nullable(),
  sidebar_collapsed: z.boolean().nullable(),
  theme: z.string().nullable(),
  timezone: z.string().nullable(),
  updated_at: DateTimeSchema,
});

export const UserPreferenceInsertSchema = z.object({
  user_id: UUIDSchema,
  beta_features_enabled: z.boolean().nullable().optional(),
  language: z.string().nullable().optional(),
  notifications_enabled: z.boolean().nullable().optional(),
  sidebar_collapsed: z.boolean().nullable().optional(),
  theme: z.string().nullable().optional(),
  timezone: z.string().nullable().optional(),
  updated_at: DateTimeSchema.optional(),
});

export const UserPreferenceUpdateSchema = z.object({
  user_id: UUIDSchema.optional(),
  beta_features_enabled: z.boolean().nullable().optional(),
  language: z.string().nullable().optional(),
  notifications_enabled: z.boolean().nullable().optional(),
  sidebar_collapsed: z.boolean().nullable().optional(),
  theme: z.string().nullable().optional(),
  timezone: z.string().nullable().optional(),
  updated_at: DateTimeSchema.optional(),
});

// ================================================================
// VIEWS SCHEMAS
// ================================================================

export const ActiveShipmentsDashboardRowSchema = z.object({
  id: UUIDSchema.nullable(),
  title: z.string().nullable(),
  client_name: z.string().nullable(),
  driver_name: z.string().nullable(),
  origin: z.string().nullable(),
  destination: z.string().nullable(),
  priority: z.string().nullable(),
  scheduled_date: DateSchema,
  status: z.string().nullable(),
  tracking_number: z.string().nullable(),
  license_plate: z.string().nullable(),
  incident_count: z.number().nullable(),
});

export const ShipmentDetailsRowSchema = z.object({
  id: UUIDSchema.nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  status: z.string().nullable(),
  priority: z.string().nullable(),
  origin: z.string().nullable(),
  destination: z.string().nullable(),
  origin_coordinates: z.any().nullable(),
  destination_coordinates: z.any().nullable(),
  client_id: UUIDSchema.nullable(),
  client_name: z.string().nullable(),
  client_email: z.string().nullable(),
  client_role: z.string().nullable(),
  driver_id: UUIDSchema.nullable(),
  driver_name: z.string().nullable(),
  vehicle_id: UUIDSchema.nullable(),
  license_plate: z.string().nullable(),
  vehicle_type: z.string().nullable(),
  origin_warehouse_id: UUIDSchema.nullable(),
  destination_warehouse_id: UUIDSchema.nullable(),
  scheduled_date: DateSchema,
  scheduled_time: TimeSchema,
  estimated_delivery: DateTimeSchema,
  actual_pickup_time: DateTimeSchema,
  actual_delivery_time: DateTimeSchema,
  delivered_at: DateTimeSchema,
  total_weight_kg: NonNegativeNumberSchema.nullable(),
  total_volume_m3: NonNegativeNumberSchema.nullable(),
  fragile: z.boolean().nullable(),
  temperature_sensitive: z.boolean().nullable(),
  special_instructions: z.string().nullable(),
  tracking_number: z.string().nullable(),
  cost: NonNegativeNumberSchema.nullable(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const ShipmentTimelineRowSchema = z.object({
  id: UUIDSchema.nullable(),
  shipment_id: UUIDSchema.nullable(),
  shipment_title: z.string().nullable(),
  status: z.string().nullable(),
  location: z.string().nullable(),
  coordinates: z.any().nullable(),
  note: z.string().nullable(),
  updated_by: UUIDSchema.nullable(),
  updated_by_name: z.string().nullable(),
  is_automated: z.boolean().nullable(),
  created_at: DateTimeSchema,
  tracking_number: z.string().nullable(),
});

export const UserRolesViewRowSchema = z.object({
  user_id: UUIDSchema.nullable(),
  role: z.string().nullable(),
});

// ================================================================
// DASHBOARD & ANALYTICS SCHEMAS
// ================================================================

export const ShipmentStatsSchema = z.object({
  total_shipments: z.number(),
  pending_shipments: z.number(),
  in_transit_shipments: z.number(),
  delivered_shipments: z.number(),
  cancelled_shipments: z.number(),
  total_revenue: z.number(),
  avg_delivery_time: z.number(),
});

export const DriverStatsSchema = z.object({
  driver_id: UUIDSchema,
  driver_name: z.string(),
  total_shipments: z.number(),
  completed_shipments: z.number(),
  active_shipments: z.number(),
  avg_rating: z.number().optional(),
  total_distance: z.number().optional(),
});

export const VehicleStatsSchema = z.object({
  vehicle_id: UUIDSchema,
  license_plate: z.string(),
  total_shipments: z.number(),
  total_distance: z.number().optional(),
  fuel_consumption: z.number().optional(),
  maintenance_cost: z.number().optional(),
  utilization_rate: z.number(),
});

// ================================================================
// FORM SCHEMAS (for Admin Panel)
// ================================================================

export const QuickShipmentSchema = z.object({
  title: z.string().min(3).max(200),
  origin: z.string().min(2).max(500),
  destination: z.string().min(2).max(500),
  client_id: UUIDSchema,
  priority: z.string().nullable().optional(), // PriorityEnum could be used
  scheduled_date: DateSchema.optional(),
  fragile: z.boolean().nullable().default(false),
  temperature_sensitive: z.boolean().nullable().default(false),
});

export const UserRegistrationSchema = z
  .object({
    name: z.string().min(2).max(100),
    email: EmailSchema,
    phone: PhoneSchema,
    role_id: UUIDSchema,
    password: z.string().min(8).max(100),
    confirm_password: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, "Password is required"),
});

export const ShipmentFilterSchema = z.object({
  status: ShipmentStatusEnum.optional(), // ShipmentStatusEnum could be used
  priority: PriorityEnum.nullable().optional(), // PriorityEnum could be used
  client_id: UUIDSchema.optional(),
  driver_id: UUIDSchema.optional(),
  date_from: DateSchema.optional(),
  date_to: DateSchema.optional(),
  search: z.string().optional(),
});

export const UserFilterSchema = z.object({
  role_id: UUIDSchema.optional(),
  is_active: z.boolean().optional(),
  search: z.string().optional(),
});

// ================================================================
// TYPE EXPORTS
// ================================================================

export type Role = z.infer<typeof RoleRowSchema>;
export type CreateRole = z.infer<typeof RoleInsertSchema>;
export type UpdateRole = z.infer<typeof RoleUpdateSchema>;

export type User = z.infer<typeof UserRowSchema>;
export type CreateUser = z.infer<typeof UserInsertSchema>;
export type UpdateUser = z.infer<typeof UserUpdateSchema>;
export type UpdateUserProfile = z.infer<typeof UpdateUserProfileSchema>;

export type Warehouse = z.infer<typeof WarehouseRowSchema>;
export type CreateWarehouse = z.infer<typeof WarehouseInsertSchema>;
export type UpdateWarehouse = z.infer<typeof WarehouseUpdateSchema>;

export type Vehicle = z.infer<typeof VehicleRowSchema>;
export type CreateVehicle = z.infer<typeof VehicleInsertSchema>;
export type UpdateVehicle = z.infer<typeof VehicleUpdateSchema>;

export type Shipment = z.infer<typeof ShipmentRowSchema>;
export type CreateShipment = z.infer<typeof ShipmentInsertSchema>;
export type UpdateShipment = z.infer<typeof ShipmentUpdateSchema>;
export type UpdateShipmentStatus = z.infer<typeof UpdateShipmentStatusSchema>;

export type ShipmentUpdate = z.infer<typeof ShipmentUpdateRowSchema>;
export type CreateShipmentUpdate = z.infer<typeof ShipmentUpdateInsertSchema>;
export type UpdateShipmentUpdate = z.infer<typeof ShipmentUpdateUpdateSchema>;

export type InventoryItem = z.infer<typeof InventoryItemRowSchema>;
export type CreateInventoryItem = z.infer<typeof InventoryItemInsertSchema>;
export type UpdateInventoryItem = z.infer<typeof InventoryItemUpdateSchema>;

export type Incident = z.infer<typeof IncidentRowSchema>;
export type CreateIncident = z.infer<typeof IncidentInsertSchema>;
export type UpdateIncident = z.infer<typeof IncidentUpdateSchema>;
export type ResolveIncident = z.infer<typeof ResolveIncidentSchema>;

export type Notification = z.infer<typeof NotificationRowSchema>;
export type CreateNotification = z.infer<typeof NotificationInsertSchema>;
export type UpdateNotification = z.infer<typeof NotificationUpdateSchema>;
export type MarkNotificationRead = z.infer<typeof MarkNotificationReadSchema>;

export type AuditLog = z.infer<typeof AuditLogRowSchema>;

export type UserPreference = z.infer<typeof UserPreferenceRowSchema>;
export type CreateUserPreference = z.infer<typeof UserPreferenceInsertSchema>;
export type UpdateUserPreference = z.infer<typeof UserPreferenceUpdateSchema>;

export type ActiveShipmentsDashboard = z.infer<
  typeof ActiveShipmentsDashboardRowSchema
>;
export type ShipmentDetails = z.infer<typeof ShipmentDetailsRowSchema>;
export type ShipmentTimeline = z.infer<typeof ShipmentTimelineRowSchema>;
export type UserRolesView = z.infer<typeof UserRolesViewRowSchema>;

export type ShipmentStats = z.infer<typeof ShipmentStatsSchema>;
export type DriverStats = z.infer<typeof DriverStatsSchema>;
export type VehicleStats = z.infer<typeof VehicleStatsSchema>;

export type QuickShipment = z.infer<typeof QuickShipmentSchema>;
export type UserRegistration = z.infer<typeof UserRegistrationSchema>;
export type Login = z.infer<typeof LoginSchema>;

export type ShipmentFilter = z.infer<typeof ShipmentFilterSchema>;
export type UserFilter = z.infer<typeof UserFilterSchema>;

// ================================================================
// UTILITY FUNCTIONS
// ================================================================

export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  try {
    return {
      success: true,
      data: schema.parse(data),
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.issues,
      };
    }
    return {
      success: false,
      data: null,
      errors: [{ message: "Unknown validation error" }],
    };
  }
};

export const formatValidationErrors = (errors: z.ZodError["issues"]) => {
  return errors.reduce((acc: Record<string, string>, error) => {
    const field = error.path.join(".");
    acc[field] = error.message;
    return acc;
  }, {} as Record<string, string>);
};

export const createSafeParser = <T>(schema: z.ZodSchema<T>) => {
  return (data: unknown) => {
    const result = schema.safeParse(data);
    if (result.success) {
      return { success: true, data: result.data, errors: {} };
    }
    return {
      success: false,
      data: null,
      errors: formatValidationErrors(result.error.issues),
    };
  };
};

export const safeParseShipment = createSafeParser(ShipmentInsertSchema);
export const safeParseUser = createSafeParser(UserInsertSchema);
export const safeParseVehicle = createSafeParser(VehicleInsertSchema);
export const safeParseIncident = createSafeParser(IncidentInsertSchema);
export const safeParseLogin = createSafeParser(LoginSchema);
