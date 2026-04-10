import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";

// export default db = drizzle(process.env.DATABASE_URL);
const db = drizzle(process.env.DATABASE_URL);

export default db;
