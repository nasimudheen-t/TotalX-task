import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";



let confirmationResult: ConfirmationResult | null = null;

// sendOtpService sets confirmationResult

export const verifyOtpService = async (otp: string) => {
  if (!confirmationResult) {
    throw new Error("OTP session expired.");
  }

  return await confirmationResult.confirm(otp);
};