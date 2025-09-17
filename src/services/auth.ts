export type PublicUser = {
  id: string;
  name: string;
  email: string;
  address?: string;
};
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

  const nameRegex = /^[\p{L}][\p{L}'-]{1,}(?: [\p{L}'-]{2,})*$/u;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  if (!nameRegex.test(name.trim())) throw new Error("Name is incorrect.");
  if (!emailRegex.test(email.trim())) throw new Error("Email is invalid.");
  if (!passwordRegex.test(password))
    throw new Error(
      "The password must contain uppercase and lowercase letters, numbers, and symbols and be at least 8 characters long."
    );

  const exists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (exists) throw new Error("A user with this email address already exists.");

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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!emailRegex.test(email.trim())) throw new Error("Email is invalid.");
  const users = readUsers();
  const hash = await sha256(password);

  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === hash
  );
  if (!user) throw new Error("Email or password is incorrect.");

  const token = crypto.randomUUID();
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token, userId: user.id }));
  notifyAuthChange();

  const { ...pub } = user;
  return pub;
}

// Custom event for auth state changes
const AUTH_EVENT = 'authStateChange';

function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function logOut() {
  // Determine current user before removing the session
  const sess = localStorage.getItem(SESSION_KEY);
  if (sess) {
    try {
      const { userId } = JSON.parse(sess) as { token: string; userId: string };
      // Remove per-user favorites so wishlist is not saved after leaving the site
      localStorage.removeItem(`favorites_ids_${userId}`);
    } catch {}
  }
  // Also remove any legacy global favorites key
  localStorage.removeItem("favorites_ids");

  // Notify cart to clear UI without wiping persisted per-user cart
  try {
    window.dispatchEvent(new Event('cartLoggingOut'));
  } catch {}

  // Finally, remove the session and notify
  localStorage.removeItem(SESSION_KEY);
  // Inform listeners that favorites should be cleared immediately
  try {
    window.dispatchEvent(new Event('favoritesReset'));
  } catch {}
  notifyAuthChange();
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

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const users = readUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error("User not found");

  const currentHash = await sha256(currentPassword);
  if (currentHash !== user.passwordHash)
    throw new Error("Current password is incorrect");

  user.passwordHash = await sha256(newPassword);
  writeUsers(users);
}

export function updateNamePartsIfMissing(
  userId: string,
  parts: { firstName?: string; lastName?: string; address?: string }
): PublicUser {
  const users = readUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error("User not found");

  const nameTokens = user.name.trim().split(/\s+/).filter(Boolean);
  const currentFirst = nameTokens[0] ?? "";
  const currentLast = nameTokens.slice(1).join(" ");

  const requestedFirst = (parts.firstName ?? "").trim();
  const requestedLast = (parts.lastName ?? "").trim();
  const requestedAddress = (parts.address ?? "").trim();

  if (requestedFirst && currentFirst)
    throw new Error("First name is already set and cannot be changed");
  if (requestedLast && currentLast)
    throw new Error("Last name is already set and cannot be changed");

  const newFirst = currentFirst || requestedFirst;
  const newLast = currentLast || requestedLast;
  const newName = [newFirst, newLast].filter(Boolean).join(" ");

  if (requestedAddress && user.address)
    throw new Error("Address is already set and cannot be changed");
  const newAddress = user.address || requestedAddress || undefined;

  let touched = false;
  if (newName !== user.name) {
    user.name = newName;
    touched = true;
  }
  if (newAddress !== user.address) {
    user.address = newAddress;
    touched = true;
  }
  if (touched) writeUsers(users);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address,
  };
}
