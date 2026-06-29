import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "boda_admin_session";
const secret = new TextEncoder().encode(
  process.env.ADMIN_SECRET ?? "dev-secret-change-in-production"
);

export async function createAdminSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "boda2026";
  return password === expected;
}
