import pkg from "pg";
import dotenv from "dotenv";

dotenv.config({
    path:"../.env"
})

console.log(process.env.LOCAL_POSTGRESQL_DB_URI ? "Not null" : "Null");

const {Client}=pkg;

const client = new Client({
  connectionString: process.env.LOCAL_POSTGRESQL_DB_URI
});

async function readUserFromTable(email){
    try{
  await client.connect()
  const read= `
    SELECT * FROM users
    WHERE email=$1  
    `
    const value=[email];
   const result=await client.query(read,value);
   if(result.rows.length>0){
    console.log('User found:',result.rows[0])
   }
   else{
    console.log('No user found with the given email')
   }
    }catch(err){
        console.log("Erro during the reading",err)
    }
}

readUserFromTable('user2@example.com')

