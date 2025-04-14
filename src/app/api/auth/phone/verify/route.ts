import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";

export async function POST(request: Request) {
  try {
    const { verificationId, otp } = await request.json();

    const credential = PhoneAuthProvider.credential(verificationId, otp);
    const result = await signInWithCredential(auth, credential);

    return NextResponse.json({
      user: {
        uid: result.user.uid,
        phoneNumber: result.user.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error in phone auth verify:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
