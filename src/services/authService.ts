import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";

import { auth } from "../firebase/firebase";


let recaptchaVerifier: RecaptchaVerifier | null = null;

let confirmationResult: ConfirmationResult | null = null;

export const initializeRecaptcha = () => {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
  }

  return recaptchaVerifier;
};

export const sendOtpService = async (phone: string) => {
  const verifier = initializeRecaptcha();

  confirmationResult = await signInWithPhoneNumber(
    auth,
    phone,
    verifier
  );

  return confirmationResult;
};

export const verifyOtpService = async (otp: string) => {
  if (!confirmationResult) {
    throw new Error("OTP session expired");
  }

  return confirmationResult.confirm(otp);
};