export function ok<T>(data: T, init?: ResponseInit) {
  return Response.json(data, init);
}
export function err(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}
