export interface EmployeeListDto {
  id:              number;
  name:            string;
  email:           string | null;
  jobTitle:        string | null;
  resourceTypes:   string[];
  defaultShift:    string;
  truckAssignment: string | null;
  truckId:         string | null;
  managerName:     string | null;
  workPhone:       string | null;
  workMobilePhone: string | null;
  isActive:        boolean;
  branchId:        number;
  branchName:      string;
}

export interface CreateEmployeeDto {
  name:            string;
  email:           string | null;
  jobTitle:        string | null;
  resourceTypes:   string[];
  defaultShift:    string;
  truckAssignment: string | null;
  truckId:         string | null;
  managerName:     string | null;
  workPhone:       string | null;
  workMobilePhone: string | null;
  branchId:        number;
}

export interface EditEmployeeDto {
  name:            string;
  email:           string | null;
  jobTitle:        string | null;
  resourceTypes:   string[];
  defaultShift:    string;
  truckAssignment: string | null;
  truckId:         string | null;
  managerName:     string | null;
  workPhone:       string | null;
  workMobilePhone: string | null;
  branchId:        number;
  isActive:        boolean;
}
