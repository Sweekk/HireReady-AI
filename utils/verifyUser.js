

// import { adminAuth } from "@/lib/firebase";

// export async function verifyUser(request) {
//   console.log("Auth header:", request.headers.get("authorization"));
//   const authHeader = request.headers.get("authorization");

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     throw new Error("Unauthorized");
//   }

//   const token = authHeader.split(" ")[1];
//   return await adminAuth.verifyIdToken(token);
// }


import { adminAuth } from "@/lib/firebase";

export async function resumeParser(request) {
  try {
    const authHeader = request.headers.get("authorization");

    console.log("DEBUG → Authorization header:", authHeader);

    if (!authHeader) {
      throw new Error("No Authorization header");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new Error("Invalid Authorization format");
    }

    const token = authHeader.split(" ")[1];

    console.log("DEBUG → Token received (first 20 chars):", token?.slice(0, 20));

    const decoded = await adminAuth.verifyIdToken(token);

    return decoded;
  } catch (error) {
    console.error(" ERROR:", error.message);
    throw new Error("Unauthorized");
  }
}
export const fileHandler = async (file) => {
  if (!file) {
    console.log("file corrupted");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/resume", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data.text;

  } catch (err) {
    console.log("Parsing Error:", err);
  }
};
