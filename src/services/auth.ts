export type PublicUser = { id: string; name: string; email: string };
type UserRecord = PublicUser & { passwordHash: string };

const USERS_KEY = "demo_users";
const SESSION_KEY = "demo_session";

function readUsers(): UserRecord[] {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}
function writeUsers(list: UserRecord[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}
async function sha256(text: string) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<PublicUser> {
  const users = readUsers();

  const exists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (exists) throw new Error("ამ ელფოსტით მომხმარებელი უკვე არსებობს");

  const passwordHash = await sha256(password);

  const user: UserRecord = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash,
  };
  users.push(user);
  writeUsers(users);

  const token = crypto.randomUUID();
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token, userId: user.id }));

  const { ...pub } = user;
  return pub;
}

export async function logIn(
  email: string,
  password: string
): Promise<PublicUser> {
  const users = readUsers();
  const hash = await sha256(password);

  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === hash
  );
  if (!user) throw new Error("ელფოსტა ან პაროლი არასწორია");

  const token = crypto.randomUUID();
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token, userId: user.id }));

  const { ...pub } = user;
  return pub;
}

export function logOut() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): PublicUser | null {
  const sess = localStorage.getItem(SESSION_KEY);
  if (!sess) return null;

  const { userId } = JSON.parse(sess) as { token: string; userId: string };
  const u = readUsers().find((u) => u.id === userId);
  if (!u) return null;

  const { ...pub } = u;
  return pub;
}
