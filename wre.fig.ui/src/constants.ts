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

// ── Feedback ────────────────────────────────────────────────────────────────

export const FEEDBACK_CATEGORIES: Record<string, string[]> = {
  Home: [
    'Layout & Visual Design',
    'Region Grouping',
    'Branch Cards',
    'Fill Rate Display',
    'Month Navigation',
    'Pinning & Favorites',
    'Notifications & Bell Icon',
    'Search & Filtering',
    'Performance',
    'Missing Feature / General Suggestion',
    'Miscellaneous',
  ],
  Schedule: [
    'Branch Header',
    'Branch Instructions Display',
    'Branch Instructions Capture',
    'Schedule Grid Layout',
    'Status Legends',
    'Status Assignment',
    'Batch Operations',
    'Driver Info Panel',
    'Supervisor Notes',
    'Change History',
    'Performance',
    'Missing Feature / General Suggestion',
    'Miscellaneous',
  ],
  Compliance: [
    'Overall Layout',
    'Compliance Metrics',
    'Region & Branch Display',
    'Status Indicators',
    'Last Updated Timestamp',
    'Date / Month Selection',
    'Export / Download',
    'Missing Feature / General Suggestion',
    'Miscellaneous',
  ],
  Alerts: [
    'Time Window Grouping',
    'Alert Content & Readability',
    'Old → New Status Display',
    'Filter Options',
    'Branch Scoping',
    'Notification Badge',
    'Missing Feature / General Suggestion',
    'Miscellaneous',
  ],
  Users: [
    'User Table Display',
    'Role Labels & Descriptions',
    'Create / Edit User Form',
    'Branch Assignment UX',
    'User Deactivation Flow',
    'Missing Feature / General Suggestion',
    'Miscellaneous',
  ],
  Technician: [
    'Technician Table Display',
    'Create / Edit Form',
    'Resource Type Assignment',
    'Search & Filtering',
    'Missing Feature / General Suggestion',
    'Miscellaneous',
  ],
};

export const RESOURCE_TYPES = [
  'Bulk Hauling', 'CCTV', 'Drain Cleaning', 'Inside Grease (IG)', 'Install',
  'Lift Station', 'Mechanic', 'Plumbing', 'Projects', 'Pumping',
  'Repair', 'Roll Off', 'Technician', 'Trailer', 'Vactor'
] as const;
