export async function GET() {
  return Response.json({
    ramdom: Math.random(),
    desc: "This route is cachced and only uses `GET` method.",
  });
}
