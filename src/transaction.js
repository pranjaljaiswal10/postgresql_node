import pkg from "pg";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const { Client } = pkg;

const client = new Client({
  connectionString: process.env.LOCAL_POSTGRESQL_URI,
});

async function insertUserAndAddresses(
  username,
  email,
  password,
  city,
  country,
  street,
  pincode
) {
    try{
    await client.connect()
    await client.query('BEGIN')
    const insertUserText=`INSERT INTO users (username,email,password)
    VALUES ($1,$2,$3)
    RETURNING id;
    `
    const userRes=await client.query(insertUserText,[username,email,password])
    const user_id=userRes.rows[0].id;

    const inseryAddressText=`INSERT INTO addresses(user_id,city,country,street,pincode)
    VALUES ($1,$2,$3,$4,$5)
    `
    await client.query(inseryAddressText,[user_id,city,country,street,pincode])
    
    await client.query('COMMIT')
    
    console.log('User and address inserted successfully')
    }catch(err){
        await client.query('ROLLBACK')
        console.log('Error during transaction,rolled back',err)
     throw err;
    }
    finally{
        await client.end()
    }
}

insertUserAndAddresses(
  "johndoe",
  "john.doe@example.com",
  "securepassword123",
  "New York",
  "USA",
  "123 Broadway St",
  "10001"
);
