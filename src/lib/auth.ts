import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import prisma from "./prisma";

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "jivan-dhara-ngo-secure-jwt-session-secret-key-2026-production"
);

export const COOKIE_NAME = "jdo_auth_token";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
  memberId?: string | null;
  membershipId?: string | null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(payload: SessionPayload): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return token;
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(COOKIE_NAME);
    if (!tokenCookie?.value) return null;

    const { payload } = await jwtVerify(tokenCookie.value, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        member: {
          include: {
            payments: {
              orderBy: { createdAt: "desc" },
            },
          },
        },
      },
    });
    return user;
  } catch (err) {
    console.error("Error getting current user:", err);
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  const adminRoles = ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "MEMBERSHIP_MANAGER", "FINANCE_MANAGER"];
  if (!adminRoles.includes(session.role)) {
    throw new Error("Forbidden: Admin access required");
  }
  return session;
}
