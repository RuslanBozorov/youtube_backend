import { Pool } from "pg";
import { config } from "dotenv";
config()

const pool = new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD
})


async function db_connect(){
    try {
        pool.connect()
        console.log("✅Database connected");
        
    } catch (error) {
        console.log("❌Database deconnected",error.message);
    }
}


db_connect()

export default pool