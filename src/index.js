import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  connectionString:
    "postgresql://neondb_owner:npg_xLPC36fQhjJk@ep-sparkling-resonance-a58btd6e-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
});

async function createUserTable() {
  await client.connect();
  const result = await client.query(`
      CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
  console.log(result);
}

createUserTable();
