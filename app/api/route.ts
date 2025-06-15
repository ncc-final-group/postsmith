export async function GET(request: Request) {
  const a = process.env.API_SERVER;
  return Response.json({ message: 'asd', a: a }, { status: 200 });
}
