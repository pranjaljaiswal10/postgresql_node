import pkg from "pg";
import dotenv from "dotenv";

dotenv.config({
  path:"./.env"
})



const { Client } = pkg;

const client = new Client({
  connectionString:
    "postgresql://chaiaurcode:chaiaurcode@localhost:5432/chaiDB",
});

async function insertUserInTable(username, email, password) {
  try {
    await client.connect();
    const insertQuery = ` 
      INSERT INTO users(username,email,password)
      VALUES ($1,$2,$3)
        `;
    const value = [username, email, password];
    const result = await client.query(insertQuery, value);
    console.log("Insertion successful", result);
  } catch (err) {
    console.error("Error during the insertion", err);
  }
}

insertUserInTable("username2", "user2@example.com", "user_password");
