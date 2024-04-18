import { headers } from "next/headers";

export async function GET() {
  headers();
  return Response.json({ ramdom: Math.random() });
}

export async function POST() {
  headers();
  return Response.json({ ramdom: Math.random() });
}
