import admin from "firebase-admin";

if (!admin.apps.length) {
  if (!process.env.PROJECT_ID || !process.env.CLIENT_EMAIL || !process.env.PRIVATE_KEY) {
    throw new Error(
      "Missing Firebase environment variables: PROJECT_ID, CLIENT_EMAIL, or PRIVATE_KEY"
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const adminAuth = admin.auth();
export const adminDB = admin.firestore();