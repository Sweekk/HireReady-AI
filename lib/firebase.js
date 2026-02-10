import admin from "firebase-admin";
  console.log({
  project: process.env.PROJECT_ID,
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY?.length
});
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
