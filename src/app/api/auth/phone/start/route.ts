import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();

    // Create reCAPTCHA verifier
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved
        },
      }
    );

    // Send verification code
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );

    return NextResponse.json({
      verificationId: confirmationResult.verificationId,
    });
  } catch (error) {
    console.error("Error in phone auth start:", error);
    return NextResponse.json(
      { error: "Failed to start phone authentication" },
      { status: 500 }
    );
  }
}
