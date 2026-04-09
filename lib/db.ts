import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    // No DB configured yet — return a "stub" client that won't crash at import
    // time. Calls that hit the DB will throw at runtime, not at startup.
    console.warn(
      "[StayLux] DATABASE_URL is not set. DB queries will fail at runtime."
    );
    // Still create a PrismaClient — with the pg adapter using a placeholder
    // URL so it can at least be imported without error. Auth session route
    // won't crash the whole server.
    const pool = new pg.Pool({
      connectionString: "postgresql://user:pass@localhost:5432/placeholder",
    });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  }

  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });
}

export const db = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
