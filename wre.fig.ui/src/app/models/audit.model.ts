/** Matches the API's AuditLogDto exactly (camelCase from JSON serializer) */
export interface AlertDto {
  id:          number;
  action:      string;
  entityType:  string;
  entityId:    string;
  description: string;
  performedBy: string;
  performedAt: string;   // ISO 8601 datetime string
  branchId:    number | null;
}
