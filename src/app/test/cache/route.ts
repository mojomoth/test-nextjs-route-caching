export async function GET() {
  const foo = () => `"Hello, World!", ${Math.random()}`;
  console.log(foo());
  return Response.json({ foo: foo() });
}
