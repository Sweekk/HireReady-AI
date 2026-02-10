
// export const runtime = "nodejs";
// import { NextResponse } from "next/server";
// import { verifyUser } from "@/utils/verifyUser";

// export async function GET(request) {
//   try {
//     const user = await verifyUser(request);

//     return NextResponse.json({ user });
//   } catch {
//     return NextResponse.json(
//       { message: "Unauthorized" },
//       { status: 401 }
//     );
//   }
// }

export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { resumeParser } from "@/utils/verifyUser";

export async function GET(request) {
  try {
    const user = await resumeParser(request);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("GET /api/auth error:", error.message);
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}


export async function POST(request) {
  try {
    const user = await resumeParser(request);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("POST /api/auth error:", error.message);
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}