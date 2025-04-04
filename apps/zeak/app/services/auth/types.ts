export interface AuthSession {
  userSessionId: string;
  accessToken: string;
  refreshToken: string;
  userId: string;
  companyId: string;
  email: string;
  expiresIn: number;
  expiresAt: number;
}

export interface UserAuthSessionInfo {
  userId: string;
  device: any;
  location: string;
  ipAddress: string;
  status: "Logged In" | "Logged Out";
  sessionActivity: "Inactive" | "Active";
  metadata: any;
  createdBy: string;
}

export enum UserStatus {
  LoggedIn = "Logged In",
  LoggedOut = "Logged Out",
}

export enum SessionActivity {
  Active = "Active",
  Inactive = "Inactive",
}
