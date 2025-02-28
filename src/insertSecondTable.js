import pkg from "pg"
import dotenv from "dotenv";

dotenv.config({
    path:"../.env"
})

const {Client}=pkg

const client = new Client({
  connectionString: process.env.LOCAL_POSTGRESQL_URI,
})

async function insertIntoTable(user_id,city,country,street,pincode) {
    try {
        await client.connect()
        const insertQuery=`INSERT INTO addresses(user_id,city,country,street,pincode)
        VALUES ($1,$2,$3,$4,$5)
            `
        const value=[user_id,city,country,street,pincode]
        const result=await client.query(insertQuery,value)
        console.log(result)
    } catch (error) {
        console.log("Error during insertion in db",error)
    }
}

insertIntoTable(1,'New York','USA','123 Broadway St','100001')