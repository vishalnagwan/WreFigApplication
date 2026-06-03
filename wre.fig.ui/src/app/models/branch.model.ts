export interface BranchSummaryDto {
  branchId: number;
  branchName: string;
  city: string;
  state: string;
  regionName: string;
  isAcquisition: boolean;
  driverCount: number;
  fillRate: number;
  lastUpdated: string | null;
  hasNotes: boolean;
  status: string;
}

export interface ComplianceDto {
  year: number;
  month: number;
  averageFillRate: number;
  upToDateCount: number;
  belowThresholdCount: number;
  rows: BranchComplianceRowDto[];
}

export interface BranchComplianceRowDto {
  branchId: number;
  branchName: string;
  regionName: string;
  fillRate: number;
  daysComplete: number;
  totalWorkdays: number;
  lastUpdated: string | null;
  status: string;
}

export interface BranchListItem {
  id: number;
  name: string;
}
