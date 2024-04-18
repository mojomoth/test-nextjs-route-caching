export async function GET() {
  return Response.json({
    ramdom: Math.random(),
    desc: "This route is not cachced and is just script with `POST` method.",
  });
}

export async function POST() {
  return Response.json({ foo: "bar" });
}
