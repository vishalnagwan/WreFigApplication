export interface UserListDto {
  id:                string;
  fullName:          string;
  email:             string;
  role:              string;
  isActive:          boolean;
  branchIds:         number[];
  branchNames:       string[];
  resourceTypeNames: string[];
}

export interface CreateUserDto {
  fullName: string;
  email: string;
  password: string;
  role: string;
  branchIds: number[];
  resourceTypeNames: string[];
}

export interface EditUserDto {
  fullName: string;
  email: string;
  password: string | null;
  role: string;
  branchIds: number[];
  resourceTypeNames: string[];
  isActive: boolean;
}
