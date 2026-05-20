export const APP_TITLE      = 'FIG';
export const APP_FULL_TITLE = 'FIG (Field Information Guide)';

export const ROLES = {
  Admin:              'Admin',
  FieldSupervisor:    'FieldSupervisor',
  DispatchSupervisor: 'DispatchSupervisor',
  Planner:            'Planner',
  Dispatcher:         'Dispatcher',
  OtherEmployee:      'OtherEmployee'
} as const;

export const EDIT_ROLES = [
  ROLES.Admin,
  ROLES.FieldSupervisor,
  ROLES.DispatchSupervisor,
  ROLES.Planner,
  ROLES.Dispatcher
];

export const INSTRUCTION_EDIT_ROLES = [
  ROLES.Admin,
  ROLES.FieldSupervisor,
  ROLES.DispatchSupervisor,
  ROLES.Planner,
  ROLES.Dispatcher
];

export const REGION_ORDER = ['Mid-Atlantic', 'Mid-South', 'South', 'North'];

export const STATUS_CODES = ['WA', 'WP', 'O', 'CO', 'OC', 'TR', 'HD', 'WX'] as const;

export const RESOURCE_TYPES = [
  'Bulk Hauling', 'CCTV', 'Drain Cleaning', 'Inside Grease (IG)', 'Install',
  'Lift Station', 'Mechanic', 'Plumbing', 'Projects', 'Pumping',
  'Repair', 'Roll Off', 'Technician', 'Trailer', 'Vactor'
] as const;
