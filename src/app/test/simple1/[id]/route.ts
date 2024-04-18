import { type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return Response.json({
    ramdom: Math.random(),
    params,
    desc: "This route is not cachced and only uses `GET` method with params.",
  });
}
