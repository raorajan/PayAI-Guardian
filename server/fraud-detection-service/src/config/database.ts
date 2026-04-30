import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import * as dotenv from 'dotenv';
import * as schema from '../models';

dotenv.config();

// Supabase Connection using PG protocol
const connectionString = process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`;

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });

export const connectDB = async (): Promise<void> => {
  try {
    await db.execute(sql`SELECT 1`);
    console.log('✅ Fraud Database (Supabase) connected successfully');
  } catch (error) {
    console.error('❌ Fraud Database connection failed:', error);
    process.exit(1);
  }
};
