class AuthService {
  private readonly API_URL = "http://localhost:3001/auth";

  async startPhoneAuth(phoneNumber: string) {
    try {
      const response = await fetch(`${this.API_URL}/phone/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to start phone authentication");
      }

      return response.json();
    } catch (error) {
      console.error("Error starting phone auth:", error);
      throw error;
    }
  }

  async verifyOTP(verificationId: string, otp: string) {
    try {
      const response = await fetch(`${this.API_URL}/phone/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationId, otp }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to verify OTP");
      }

      return response.json();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  }
}

export const authService = new AuthService();
