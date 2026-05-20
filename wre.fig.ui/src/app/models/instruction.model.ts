export interface BranchInstructionsDto {
  branchId: number;
  sections: SectionDto[];
}

export interface SectionDto {
  key: string;
  title: string;
  shortTitle: string;
  position: number;
  lines: InstructionLineDto[];
}

export interface InstructionLineDto {
  id: number;
  content: string;
  isHighlighted: boolean;
  sortOrder: number;
  updatedByName: string | null;
  updatedAt: string;
}
