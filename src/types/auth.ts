export interface CheckUserResponse {
  isNewUser: boolean;
}

export interface VerifyOtpResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthCredentials {
  phoneNumber: string;
  name?: string;
}

export interface OtpVerification {
  phoneNumber: string;
  otp: string;
}

export interface ProfileUpdate {
  name: string;
}
