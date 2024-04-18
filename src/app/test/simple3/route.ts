import { headers } from "next/headers";

export async function GET() {
  headers();
  return Response.json({
    ramdom: Math.random(),
    desc: "This route is not cachced and is just script with header function.",
  });
}
