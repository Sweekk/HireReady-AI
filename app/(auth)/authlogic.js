import { authFeature, googleProvider } from "../../lib/firebaseApp";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";

export async function loginWiththeEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(
      authFeature,
      email,
      password
    );

    const user = result.user;

    if (!user.emailVerified) {
      alert("Email is not verified");
      return null;
    }

    const token = await user.getIdToken();

    localStorage.setItem("token", token);

    const response = await fetch("/api/auth", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Backend authentication failed");
    }

    return token;
  } catch (error) {
    console.error(error);
    alert("Invalid credentials");
    return null;
  }
}

export async function createAccount(email, password) {
  try {
    const result = await createUserWithEmailAndPassword(
      authFeature,
      email,
      password
    );

    await sendEmailVerification(result.user);

    alert("Verification email sent. Please verify before logging in.");
    return true;
  } catch (error) {
    console.error(error);
    alert("Signup failed");
    return false;
  }
}

export async function ResetEmail(email) {
  try {
    await sendPasswordResetEmail(authFeature, email);
    alert("Password reset email sent");
  } catch (error) {
    console.error(error);
    alert("Failed to send reset email");
  }
}

export async function googlelogin() {
  try {
    const result = await signInWithPopup(authFeature, googleProvider);

    const token = await result.user.getIdToken();

    localStorage.setItem("token", token);

    return token;
  } catch (error) {
    console.error(error);
    alert("Google login failed");
    return null;
  }
}
  