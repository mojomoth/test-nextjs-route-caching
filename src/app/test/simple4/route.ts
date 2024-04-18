export async function POST() {
  return Response.json({
    ramdom: Math.random(),
    desc: "This route is not cachced and only uses `POST` method.",
  });
}
