import dotenv from "dotenv";
import pkg from "pg";

dotenv.config({
  path: "../.env",
});

const {Client}=pkg;

const client = new Client({
  connectionString: process.env.LOCAL_POSTGRESQL_URI,
});

async function getUserAndAddressFromTable(id) {
  try {
    await client.connect()
    const query = `SELECT u.id,u.email,a.city,a.country,a.street,a.pincode
  FROM users u
  JOIN addresses a ON u.id=a.user_id
  WHERE u.id=$1
  `;
    const result = await client.query(query, [id]);
    if (result.rows.length === 0) {
      console.log("no record found fom this id");
    }
    console.log(result.rows);
  } catch (err) {
    console.log("Error during fetching user and address", err);
  } finally {
    await client.end();
  }
}

getUserAndAddressFromTable("2");
