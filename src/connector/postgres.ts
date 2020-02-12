import dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config()

console.log(process.env.POSTGRES_HOST)
console.log(process.env.POSTGRES_DATABASE)
console.log(process.env.POSTGRES_USERNAME)
console.log(process.env.POSTGRES_PASSWORD)
const pool = new Pool({
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  keepAlive: true,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  user: process.env.POSTGRES_USERNAME
})

const connect = async () => {
  try {
    const client = await pool.connect()
    console.log("connected")
    return client
  } catch (e) {
    console.log(String(e))
  }
}

export const pg = async (query: string, values: any[]) => {
  const client = await connect()
  try {
    const result = (await client.query(query, values)).rows
    client.release()
    return result
  } catch (e) {
    client.release()
    throw e
  }
}
