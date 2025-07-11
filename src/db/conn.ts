import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from "@app/helpers/index.ts";

const db_url = config('DATABASE_URL') as string
const conn = drizzle(db_url)

export {
	conn
}
