/**
 * Default values used across the application.
 * Add feature-specific defaults here rather than scattering magic values in components.
 */

export const DEFAULT_YEAR  = new Date().getFullYear();
export const DEFAULT_MONTH = new Date().getMonth() + 1;

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE     = 100;

export const DEFAULT_SHIFT = 'AM' as const;

export const COMPLIANCE_GREEN_THRESHOLD = 85;   // ≥ 85% = green
export const COMPLIANCE_AMBER_THRESHOLD = 75;   // ≥ 75% = amber, < 75% = red
