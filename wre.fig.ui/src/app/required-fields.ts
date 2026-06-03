/**
 * Required field definitions for forms.
 * Centralises validation rules so they stay consistent across components.
 */

export const REQUIRED_FIELDS = {
  USER: ['fullName', 'email', 'role', 'password'] as const,
  TECHNICIAN: ['name', 'branchId'] as const,
  LOGIN: ['email', 'password'] as const,
} as const;

export const FIELD_MAX_LENGTHS = {
  FULL_NAME:       100,
  EMAIL:           256,
  PASSWORD_MIN:    8,
  NOTE:            2000,
  FEEDBACK_COMMENT:1000,
  JOB_TITLE:       100,
} as const;
