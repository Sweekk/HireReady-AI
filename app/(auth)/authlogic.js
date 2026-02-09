import { authFeature ,googleProvider} from "../../lib/firebaseApp";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
export async function loginWiththeEmail(email, password) {
  // the firebase logic

  try {
    const result = await signInWithEmailAndPassword(
      authFeature,
      email,
      password,
    );

    console.log(JSON.stringify(result));
    const user = result.user;
    if (!user.emailVerified) {
      alert("Email is not verified");
      return;
    } 
    
    const token = await user.getIdToken();
    console.log("Firebase ID Token:",token);
    console.log("sending token to backend");
    
    const response = await fetch("/api/auth", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("Backend response:",data);
    return token;
  } catch (exception) {
    console.log(JSON.stringify(exception));
    alert("Invalid credentials");
  }
}

export async function createAccount(email, password) {
  // the firebase logic
  try {
    const result = await createUserWithEmailAndPassword(
      authFeature,
      email,
      password,
    );
    console.log(JSON.stringify(result));
    await sendEmailVerification(result.user);
  } catch (exception) {
    console.log(JSON.stringify(exception));
  }
}

export async function ResetEmail(email) {
  // the firebase logic
  try {
    const result = await sendPasswordResetEmail(authFeature, email);
    console.log(JSON.stringify(result));
  } catch (exception) {
    console.log(JSON.stringify(exception));
  }
}

export async function googlelogin() {
    try {
      const result = await signInWithPopup(authFeature, googleProvider);
      console.log("User:", result.user);
    } catch (error) {
      console.error(error);
    }
  
}