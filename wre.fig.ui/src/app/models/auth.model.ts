export interface LoginRequest {
  email:    string;
  password: string;
}

export interface LoginResponse {
  token:     string;
  userId:    string;
  fullName:  string;
  email:     string;
  role:      string;
  expiresAt: string;
}

export interface AuthUser {
  userId:   string;
  fullName: string;
  email:    string;
  role:     string;
}
