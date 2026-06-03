/**
 * Table column definitions and default filter config for each management page.
 * Used to drive dynamic column visibility and sorting.
 */

export interface ColumnDef {
  field:   string;
  header:  string;
  visible: boolean;
  sortable?: boolean;
}

export const USER_TABLE_COLUMNS: ColumnDef[] = [
  { field: 'fullName',   header: 'Name',     visible: true,  sortable: true  },
  { field: 'email',      header: 'Email',    visible: true,  sortable: true  },
  { field: 'role',       header: 'Role',     visible: true,  sortable: true  },
  { field: 'branchNames',header: 'Branches', visible: true,  sortable: false },
  { field: 'isActive',   header: 'Status',   visible: true,  sortable: true  },
];

export const TECHNICIAN_TABLE_COLUMNS: ColumnDef[] = [
  { field: 'name',          header: 'Name',           visible: true,  sortable: true  },
  { field: 'email',         header: 'Email',          visible: true,  sortable: true  },
  { field: 'branchName',    header: 'Branch',         visible: true,  sortable: true  },
  { field: 'resourceTypes', header: 'Resource Types', visible: true,  sortable: false },
  { field: 'defaultShift',  header: 'Shift',          visible: true,  sortable: true  },
  { field: 'workPhone',     header: 'Phone',          visible: true,  sortable: false },
  { field: 'isActive',      header: 'Status',         visible: true,  sortable: true  },
];

export const COMPLIANCE_TABLE_COLUMNS: ColumnDef[] = [
  { field: 'branchName',   header: 'Branch',         visible: true,  sortable: true  },
  { field: 'fillRate',     header: 'Fill Rate',      visible: true,  sortable: true  },
  { field: 'daysComplete', header: 'Days Complete',  visible: true,  sortable: true  },
  { field: 'lastUpdated',  header: 'Last Updated',   visible: true,  sortable: true  },
  { field: 'status',       header: 'Status',         visible: true,  sortable: true  },
];
