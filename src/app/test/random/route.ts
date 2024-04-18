export async function GET() {
  console.log("Hello, World!", Math.random());
  return Response.json({ foo: "bar" });
}
