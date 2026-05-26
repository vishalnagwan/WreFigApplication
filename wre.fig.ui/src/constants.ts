export const APP_TITLE      = 'FIG';
export const APP_FULL_TITLE = 'FIG - Field Information Guide';

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
    'Search & Filtering',
    'Notifications & Bell Icon',
    'Page Performance',
    'Pinning & Favorites',
    'Missing Feature / General Suggestion',
  ],
  Schedule: [
    'Branch Header',
    'Branch Instructions Display',
    'Branch Instructions Capture',
    'Schedule Grid Layout',
    'Status Legends',
    'Status Assignment',
    'Multi Assignment of Statuses',
    'Driver Info Panel',
    'Supervisor Notes',
    'Change History',
    'Page Performance',
    'Missing Feature / General Suggestion',
  ],
  Compliance: [
    'Overall Layout',
    'Compliance Metrics',
    'Region & Branch Display',
    'Status Indicators',
    'Last Updated Timestamp',
    'Month Selection',
    'Missing Feature / General Suggestion',
  ],
  Alerts: [
    'Time Window Grouping',
    'Alert Content & Readability',
    'Old → New Status Change Display',
    'Filter Options',
    'Notification Badge',
    'Missing Feature / General Suggestion',
  ],
  Users: [
    'User Table Display',
    'Role Labels & Descriptions',
    'Create/Edit User Functionality',
    'Branch Assignment UX',
    'User Deactivation Flow',
    'Missing Feature / General Suggestion',
  ],
  Technician: [
    'Technician Table Display',
    'Create/Edit Functionality',
    'Resource Type Assignment',
    'Search & Filtering',
    'Missing Feature / General Suggestion',
  ],
};

// Placeholder hints shown in the feedback textarea for each category
export const FEEDBACK_PLACEHOLDERS: Record<string, string> = {
  // ── Home ──
  'Layout & Visual Design':
    'Share feedback on colors, spacing, fonts, visual appeal, or layout improvements on the home screen.',
  'Region Grouping':
    'Is the region grouping helpful? Should branches be grouped differently or shown in a different order?',
  'Branch Cards':
    'How can branch cards be improved? Consider fill rate display, card layout, click behavior, or missing information.',
  'Fill Rate Display':
    'Feedback on how fill rates are shown — accuracy, color coding, thresholds, or how the percentage is calculated.',
  'Month Navigation':
    'Suggestions for navigating between months — arrows, date picker, default month shown, or navigation speed.',
  'Search & Filtering':
    'How should search and filtering work? What fields should be searchable or filterable on this page?',
  'Notifications & Bell Icon':
    'This feature is not yet implemented. Share what notifications would be most useful — status changes, compliance alerts, or schedule updates.',
  'Page Performance':
    'Is the page loading slowly or responding with delays? Describe what you observed and when it happens.',
  'Pinning & Favorites':
    'Would pinning or favoriting specific branches be useful? How should pinned branches be displayed or prioritized?',

  // ── Schedule ──
  'Branch Header':
    'Feedback on the branch header — information shown, layout, or quick actions that would be helpful.',
  'Branch Instructions Display':
    'How are branch instructions displayed? Is the location, formatting, or visibility adequate?',
  'Branch Instructions Capture':
    'How can adding or editing branch instructions be improved? Consider the form layout, save experience, or character limits.',
  'Schedule Grid Layout':
    'Feedback on the grid — column widths, row heights, date display, scrolling behavior, or overall readability.',
  'Status Legends':
    'Are status legends clear and easy to find? Suggest additions, removals, or formatting changes.',
  'Status Assignment':
    'Feedback on assigning a status to an employee — click behavior, confirmation, ease of use, or errors encountered.',
  'Multi Assignment of Statuses':
    'Suggestions for assigning the same status to multiple employees at once — selection method, bulk apply, or undo support.',
  'Driver Info Panel':
    'Feedback on the driver info panel — information shown, layout, change history display, or overall usability.',
  'Supervisor Notes':
    'How can supervisor notes be improved? Consider adding, viewing, editing, or the date/context shown for each note.',
  'Change History':
    'Is the change history showing the right information? Feedback on filtering, date range, or clarity of individual entries.',

  // ── Compliance ──
  'Overall Layout':
    'Feedback on the compliance page layout — sections, spacing, or navigation between regions and branches.',
  'Compliance Metrics':
    'Are compliance metrics accurate and easy to understand? Suggest improvements to how they are calculated or displayed.',
  'Region & Branch Display':
    'How are regions and branches displayed? Suggest ordering, grouping, or filtering improvements.',
  'Status Indicators':
    'Feedback on the color coding or icons used to show compliance status — thresholds, labels, or visual clarity.',
  'Last Updated Timestamp':
    'Is the last updated timestamp accurate and easy to find? Suggest improvements to its placement or format.',
  'Month Selection':
    'Feedback on selecting or navigating between months — ease of use, default month shown, or missing options.',

  // ── Alerts ──
  'Time Window Grouping':
    'Feedback on how alerts are grouped by time — 24h / 48h / 72h windows, labels, or the default view shown.',
  'Alert Content & Readability':
    'Are alert messages clear and easy to read? Suggest improvements to wording, formatting, or level of detail.',
  'Old → New Status Change Display':
    'Feedback on how the old and new status are shown in each alert — format, colors, or missing context.',
  'Filter Options':
    'Suggestions for filtering alerts — by branch, role, status type, date range, or urgency level.',
  'Notification Badge':
    'Feedback on the alert badge in the nav — when it appears, when it clears, or how the count is determined.',

  // ── Users ──
  'User Table Display':
    'Feedback on the user table — columns shown, sorting, filtering, or how role and branch information is displayed.',
  'Role Labels & Descriptions':
    'Are role names and descriptions clear? Suggest better labels or descriptions for any role.',
  'Create/Edit User Functionality':
    'Feedback on creating or editing a user — form fields, validation messages, branch assignment, password rules, or save behavior.',
  'Branch Assignment UX':
    'How can assigning branches to a user be improved? Consider the selection UI, search, or bulk assignment.',
  'User Deactivation Flow':
    'Feedback on deactivating a user — confirmation steps, what happens to their data, or reactivation process.',

  // ── Technician ──
  'Technician Table Display':
    'Feedback on the technician table — columns shown, sorting, filtering, or how resource types are displayed.',
  'Create/Edit Functionality':
    'Feedback on creating or editing a technician — form fields, validation, resource type assignment, or save behavior.',
  'Resource Type Assignment':
    'How can assigning resource types to a technician be improved? Consider the selection UI or available options.',

  // ── Shared ──
  'Missing Feature / General Suggestion':
    'Describe any feature that is missing or share a general improvement suggestion for this page.',
};

export const RESOURCE_TYPES = [
  'Bulk Hauling', 'CCTV', 'Drain Cleaning', 'Inside Grease (IG)', 'Install',
  'Lift Station', 'Mechanic', 'Plumbing', 'Projects', 'Pumping',
  'Repair', 'Roll Off', 'Technician', 'Trailer', 'Vactor'
] as const;
