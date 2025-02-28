import pkg from "pg";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const {Client}=pkg;

const client = new Client({
  connectionString: process.env.LOCAL_POSTGRESQL_URI,
});

async function createAddressTable(){
  await client.connect()
  const result=await client.query(`CREATE TABLE addresses(
     id SERIAL PRIMARY KEY,
     user_id INT NOT NULL,
     city VARCHAR(50) NOT NULL,
     country VARCHAR(100) NOT NULL,
     street VARCHAR(100) NOT NULL,
     pincode VARCHAR(20),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    `)
}

createAddressTable()