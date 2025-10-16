export async function fetchUsers() {
  const r = await fetch("/data/users.json");
  return r.json();
}
export async function fetchComments() {
  const r = await fetch("/data/comments.json");
  return r.json();
}
