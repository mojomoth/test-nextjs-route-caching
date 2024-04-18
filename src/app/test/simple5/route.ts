import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  console.log(query);
  return Response.json({
    ramdom: Math.random(),
    desc: "This route is not cachced and only uses `GET` method with query params.",
  });
}
