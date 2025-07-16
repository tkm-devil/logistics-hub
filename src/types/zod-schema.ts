// src/types/zod-schemas.ts
import { z } from 'zod';

// ================================================================
// ENUMS & CONSTANTS
// ================================================================

export const RoleEnum = z.enum(['admin', 'driver', 'client', 'manager', 'warehouse_staff']);
export const ShipmentStatusEnum = z.enum([
  'pending', 'confirmed', 'dispatched', 'in_transit', 'delivered', 'cancelled', 'returned'
]);
export const PriorityEnum = z.enum(['low', 'normal', 'high', 'urgent']);
export const VehicleTypeEnum = z.enum(['van', 'truck', 'motorcycle', 'cargo_bike']);
export const VehicleStatusEnum = z.enum(['available', 'in_service', 'maintenance', 'out_of_service']);
export const FuelTypeEnum = z.enum(['petrol', 'diesel', 'electric', 'hybrid']);
export const IncidentTypeEnum = z.enum(['delay', 'damage', 'theft', 'accident', 'weather', 'mechanical', 'other']);
export const SeverityEnum = z.enum(['low', 'medium', 'high', 'critical']);
export const NotificationTypeEnum = z.enum(['shipment_update', 'incident_alert', 'system_message', 'reminder', 'emergency']);
export const UnitEnum = z.enum(['pieces', 'kg', 'liters', 'boxes', 'pallets']);
export const AuditActionEnum = z.enum(['CREATE', 'READ', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT']);

// ================================================================
// BASE SCHEMAS
// ================================================================

const UUIDSchema = z.string().uuid();
const EmailSchema = z.string().email();
const PhoneSchema = z.string().min(10).max(15).optional();
const PositiveNumberSchema = z.number().positive();
const NonNegativeNumberSchema = z.number().min(0);
const DateTimeSchema = z.string().datetime();
const DateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const TimeSchema = z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/);

// ================================================================
// ROLES SCHEMA
// ================================================================

export const RoleSchema = z.object({
  id: UUIDSchema,
  name: RoleEnum,
  description: z.string().optional(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const CreateRoleSchema = z.object({
  name: RoleEnum,
  description: z.string().optional(),
});

export const UpdateRoleSchema = CreateRoleSchema.partial();

// ================================================================
// USERS SCHEMA
// ================================================================

export const UserSchema = z.object({
  id: UUIDSchema,
  name: z.string().min(2).max(100),
  email: EmailSchema,
  phone: PhoneSchema,
  role_id: UUIDSchema,
  is_active: z.boolean().nullable().default(true),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const CreateUserSchema = z.object({
  id: UUIDSchema,
  name: z.string().min(2).max(100),
  email: EmailSchema,
  phone: PhoneSchema,
  role_id: UUIDSchema,
  is_active: z.boolean().nullable().default(true),
});

export const UpdateUserSchema = CreateUserSchema.partial();

// User profile update (for self-service)
export const UpdateUserProfileSchema = z.object({
  name: z.string().min(2).max(100),
  phone: PhoneSchema,
});

// ================================================================
// WAREHOUSES SCHEMA
// ================================================================

export const WarehouseSchema = z.object({
  id: UUIDSchema,
  name: z.string().min(2).max(100),
  location: z.string().min(2).max(200),
  address: z.string().optional(),
  coordinates: z.any().optional(), // POINT type as string
  capacity_m3: z.number().positive().max(99999999.99).optional(),
  manager_id: UUIDSchema.optional(),
  is_active: z.boolean().nullable().default(true),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const CreateWarehouseSchema = z.object({
  name: z.string().min(2).max(100),
  location: z.string().min(2).max(200),
  address: z.string().optional(),
  coordinates: z.any().optional(),
  capacity_m3: z.number().positive().max(99999999.99).optional(),
  manager_id: UUIDSchema.optional(),
  is_active: z.boolean().nullable().default(true),
});

export const UpdateWarehouseSchema = CreateWarehouseSchema.partial();

// ================================================================
// VEHICLES SCHEMA
// ================================================================

export const VehicleSchema = z.object({
  id: UUIDSchema,
  license_plate: z.string().min(3).max(20),
  type: VehicleTypeEnum,
  make: z.string().optional(),
  model: z.string().optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  capacity_kg: PositiveNumberSchema.optional(),
  fuel_type: FuelTypeEnum.optional(),
  status: VehicleStatusEnum.default('available'),
  last_maintenance: DateSchema.optional(),
  next_maintenance: DateSchema.optional(),
  driver_id: UUIDSchema.optional(),
  warehouse_id: UUIDSchema.optional(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const CreateVehicleSchema = z.object({
  license_plate: z.string().min(3).max(20),
  type: VehicleTypeEnum,
  make: z.string().optional(),
  model: z.string().optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  capacity_kg: PositiveNumberSchema.optional(),
  fuel_type: FuelTypeEnum.optional(),
  status: VehicleStatusEnum.default('available'),
  last_maintenance: DateSchema.optional(),
  next_maintenance: DateSchema.optional(),
  driver_id: UUIDSchema.optional(),
  warehouse_id: UUIDSchema.optional(),
});

export const UpdateVehicleSchema = CreateVehicleSchema.partial();

// ================================================================
// SHIPMENTS SCHEMA
// ================================================================

export const ShipmentSchema = z.object({
  id: UUIDSchema,
  title: z.string().min(3).max(200),
  description: z.string().optional(),
  status: ShipmentStatusEnum.default('pending'),
  priority: PriorityEnum.default('normal'),
  origin: z.string().min(2).max(500),
  destination: z.string().min(2).max(500),
  origin_coordinates: z.any().optional(),
  destination_coordinates: z.any().optional(),
  client_id: UUIDSchema,
  driver_id: UUIDSchema.optional(),
  vehicle_id: UUIDSchema.optional(),
  origin_warehouse_id: UUIDSchema.optional(),
  destination_warehouse_id: UUIDSchema.optional(),
  scheduled_date: DateSchema.optional(),
  scheduled_time: TimeSchema.optional(),
  estimated_delivery: DateTimeSchema.optional(),
  actual_pickup_time: DateTimeSchema.optional(),
  actual_delivery_time: DateTimeSchema.optional(),
  delivered_at: DateTimeSchema.optional(),
  total_weight_kg: z.number().min(0).max(99999999.99).optional(),
  total_volume_m3: z.number().min(0).max(99999999.99).optional(),
  fragile: z.boolean().nullable().default(false),
  temperature_sensitive: z.boolean().nullable().default(false),
  special_instructions: z.string().optional(),
  tracking_number: z.string().optional(),
  cost: z.number().min(0).max(99999999.99).optional(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const CreateShipmentSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().optional(),
  priority: PriorityEnum.default('normal'),
  origin: z.string().min(2).max(500),
  destination: z.string().min(2).max(500),
  origin_coordinates: z.any().optional(),
  destination_coordinates: z.any().optional(),
  client_id: UUIDSchema,
  driver_id: UUIDSchema.optional(),
  vehicle_id: UUIDSchema.optional(),
  origin_warehouse_id: UUIDSchema.optional(),
  destination_warehouse_id: UUIDSchema.optional(),
  scheduled_date: DateSchema.optional(),
  scheduled_time: TimeSchema.optional(),
  estimated_delivery: DateTimeSchema.optional(),
  total_weight_kg: z.number().min(0).max(99999999.99).optional(),
  total_volume_m3: z.number().min(0).max(99999999.99).optional(),
  fragile: z.boolean().nullable().default(false),
  temperature_sensitive: z.boolean().nullable().default(false),
  special_instructions: z.string().optional(),
  cost: z.number().min(0).max(99999999.99).optional(),
});

export const UpdateShipmentSchema = CreateShipmentSchema.partial();

// Status update schema (for drivers)
export const UpdateShipmentStatusSchema = z.object({
  status: ShipmentStatusEnum,
  location: z.string().optional(),
  note: z.string().optional(),
});

// ================================================================
// SHIPMENT UPDATES SCHEMA
// ================================================================

export const ShipmentUpdateSchema = z.object({
  id: UUIDSchema,
  shipment_id: UUIDSchema,
  status: z.enum([
    'created', 'confirmed', 'dispatched', 'picked_up', 'in_transit', 
    'out_for_delivery', 'delivered', 'delayed', 'cancelled', 'returned'
  ]),
  location: z.string().optional(),
  coordinates: z.any().optional(),
  note: z.string().optional(),
  updated_by: UUIDSchema.optional(),
  is_automated: z.boolean().nullable().default(false),
  created_at: DateTimeSchema,
});

export const CreateShipmentUpdateSchema = z.object({
  shipment_id: UUIDSchema,
  status: z.enum([
    'created', 'confirmed', 'dispatched', 'picked_up', 'in_transit', 
    'out_for_delivery', 'delivered', 'delayed', 'cancelled', 'returned'
  ]),
  location: z.string().optional(),
  coordinates: z.any().optional(),
  note: z.string().optional(),
  is_automated: z.boolean().nullable().default(false),
});

// ================================================================
// INVENTORY ITEMS SCHEMA
// ================================================================

export const InventoryItemSchema = z.object({
  id: UUIDSchema,
  shipment_id: UUIDSchema.optional(),
  warehouse_id: UUIDSchema.optional(),
  name: z.string().min(2).max(200),
  description: z.string().optional(),
  sku: z.string().optional(),
  category: z.string().optional(),
  quantity: NonNegativeNumberSchema,
  unit: UnitEnum.default('pieces'),
  weight_kg: z.number().min(0).max(99999999.99).optional(),
  volume_m3: z.number().min(0).max(99999999.99).optional(),
  value: z.number().min(0).max(99999999.99).optional(),
  fragile: z.boolean().nullable().default(false),
  temperature_sensitive: z.boolean().nullable().default(false),
  hazardous: z.boolean().nullable().default(false),
  expiry_date: DateSchema.optional(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const CreateInventoryItemSchema = z.object({
  shipment_id: UUIDSchema.optional(),
  warehouse_id: UUIDSchema.optional(),
  name: z.string().min(2).max(200),
  description: z.string().optional(),
  sku: z.string().optional(),
  category: z.string().optional(),
  quantity: NonNegativeNumberSchema,
  unit: UnitEnum.default('pieces'),
  weight_kg: z.number().min(0).max(99999999.99).optional(),
  volume_m3: z.number().min(0).max(99999999.99).optional(),
  value: z.number().min(0).max(99999999.99).optional(),
  fragile: z.boolean().nullable().default(false),
  temperature_sensitive: z.boolean().nullable().default(false),
  hazardous: z.boolean().nullable().default(false),
  expiry_date: DateSchema.optional(),
});

export const UpdateInventoryItemSchema = CreateInventoryItemSchema.partial();

// ================================================================
// INCIDENTS SCHEMA
// ================================================================

export const IncidentSchema = z.object({
  id: UUIDSchema,
  shipment_id: UUIDSchema,
  type: IncidentTypeEnum,
  severity: SeverityEnum.default('medium'),
  title: z.string().min(3).max(200),
  description: z.string().optional(),
  location: z.string().optional(),
  coordinates: z.any().optional(),
  reported_by: UUIDSchema,
  assigned_to: UUIDSchema.optional(),
  resolved: z.boolean().nullable().default(false),
  resolution_notes: z.string().optional(),
  resolved_at: DateTimeSchema.optional(),
  resolved_by: UUIDSchema.optional(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const CreateIncidentSchema = z.object({
  shipment_id: UUIDSchema,
  type: IncidentTypeEnum,
  severity: SeverityEnum.default('medium'),
  title: z.string().min(3).max(200),
  reported_by: UUIDSchema,
  description: z.string().optional(),
  location: z.string().optional(),
  coordinates: z.any().optional(),
  assigned_to: UUIDSchema.optional(),
});

export const UpdateIncidentSchema = CreateIncidentSchema.partial();

export const ResolveIncidentSchema = z.object({
  resolution_notes: z.string().min(10).max(1000),
});

// ================================================================
// NOTIFICATIONS SCHEMA
// ================================================================

export const NotificationSchema = z.object({
  id: UUIDSchema,
  user_id: UUIDSchema,
  type: NotificationTypeEnum,
  title: z.string().min(3).max(200),
  message: z.string().min(1).max(1000),
  related_shipment_id: UUIDSchema.optional(),
  related_incident_id: UUIDSchema.optional(),
  priority: PriorityEnum.default('normal'),
  read: z.boolean().nullable().default(false),
  read_at: DateTimeSchema.optional(),
  expires_at: DateTimeSchema.optional(),
  created_at: DateTimeSchema,
});

export const CreateNotificationSchema = z.object({
  user_id: UUIDSchema,
  type: NotificationTypeEnum,
  title: z.string().min(3).max(200),
  message: z.string().min(1).max(1000),
  related_shipment_id: UUIDSchema.optional(),
  related_incident_id: UUIDSchema.optional(),
  priority: PriorityEnum.default('normal'),
  expires_at: DateTimeSchema.optional(),
});

export const MarkNotificationReadSchema = z.object({
  read: z.boolean(),
});

// ================================================================
// AUDIT LOGS SCHEMA
// ================================================================

export const AuditLogSchema = z.object({
  id: UUIDSchema,
  user_id: UUIDSchema.optional(),
  action: AuditActionEnum,
  table_name: z.string(),
  record_id: UUIDSchema.optional(),
  old_values: z.record(z.string(), z.unknown()).optional(),
  new_values: z.record(z.string(), z.unknown()).optional(),
  ip_address: z.any().optional(),
  user_agent: z.string().optional(),
  created_at: DateTimeSchema,
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
  avg_delivery_time: z.number(), // in hours
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
  utilization_rate: z.number(), // percentage
});

// ================================================================
// FORM SCHEMAS (for Admin Panel)
// ================================================================

// Quick shipment creation form
export const QuickShipmentSchema = z.object({
  title: z.string().min(3).max(200),
  origin: z.string().min(2).max(500),
  destination: z.string().min(2).max(500),
  client_id: UUIDSchema,
  priority: PriorityEnum.default('normal'),
  scheduled_date: DateSchema.optional(),
  fragile: z.boolean().default(false),
  temperature_sensitive: z.boolean().default(false),
});

// User registration form
export const UserRegistrationSchema = z.object({
  name: z.string().min(2).max(100),
  email: EmailSchema,
  phone: PhoneSchema,
  role_id: UUIDSchema,
  password: z.string().min(8).max(100),
  confirm_password: z.string().min(8).max(100),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

// Login form
export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, "Password is required"),
});

// Search and filter schemas
export const ShipmentFilterSchema = z.object({
  status: ShipmentStatusEnum.optional(),
  priority: PriorityEnum.optional(),
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
// TYPE EXPORTS (inferred from schemas)
// ================================================================

export type Role = z.infer<typeof RoleSchema>;
export type CreateRole = z.infer<typeof CreateRoleSchema>;
export type UpdateRole = z.infer<typeof UpdateRoleSchema>;

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UpdateUserProfile = z.infer<typeof UpdateUserProfileSchema>;

export type Warehouse = z.infer<typeof WarehouseSchema>;
export type CreateWarehouse = z.infer<typeof CreateWarehouseSchema>;
export type UpdateWarehouse = z.infer<typeof UpdateWarehouseSchema>;

export type Vehicle = z.infer<typeof VehicleSchema>;
export type CreateVehicle = z.infer<typeof CreateVehicleSchema>;
export type UpdateVehicle = z.infer<typeof UpdateVehicleSchema>;

export type Shipment = z.infer<typeof ShipmentSchema>;
export type CreateShipment = z.infer<typeof CreateShipmentSchema>;
export type UpdateShipment = z.infer<typeof UpdateShipmentSchema>;
export type UpdateShipmentStatus = z.infer<typeof UpdateShipmentStatusSchema>;

export type ShipmentUpdate = z.infer<typeof ShipmentUpdateSchema>;
export type CreateShipmentUpdate = z.infer<typeof CreateShipmentUpdateSchema>;

export type InventoryItem = z.infer<typeof InventoryItemSchema>;
export type CreateInventoryItem = z.infer<typeof CreateInventoryItemSchema>;
export type UpdateInventoryItem = z.infer<typeof UpdateInventoryItemSchema>;

export type Incident = z.infer<typeof IncidentSchema>;
export type CreateIncident = z.infer<typeof CreateIncidentSchema>;
export type UpdateIncident = z.infer<typeof UpdateIncidentSchema>;
export type ResolveIncident = z.infer<typeof ResolveIncidentSchema>;

export type Notification = z.infer<typeof NotificationSchema>;
export type CreateNotification = z.infer<typeof CreateNotificationSchema>;
export type MarkNotificationRead = z.infer<typeof MarkNotificationReadSchema>;

export type AuditLog = z.infer<typeof AuditLogSchema>;

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

// Validate and parse data with error handling
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
      errors: [{ message: 'Unknown validation error' }],
    };
  }
};

// Format validation errors for display
export const formatValidationErrors = (errors: z.ZodError['issues']) => {
  return errors.reduce((acc: Record<string, string>, error) => {
    const field = error.path.join('.');
    acc[field] = error.message;
    return acc;
  }, {} as Record<string, string>);
};

// Create safe parsers for forms
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

// Pre-built safe parsers for common use cases
export const safeParseShipment = createSafeParser(CreateShipmentSchema);
export const safeParseUser = createSafeParser(CreateUserSchema);
export const safeParseVehicle = createSafeParser(CreateVehicleSchema);
export const safeParseIncident = createSafeParser(CreateIncidentSchema);
export const safeParseLogin = createSafeParser(LoginSchema);