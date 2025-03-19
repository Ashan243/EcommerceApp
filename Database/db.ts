import {Pool} from "pg"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"
import { error } from "console"


dotenv.config()



export const connectionPool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Gu1tarman",
    database: "EcommerceApp"
    
})

const executeSetup = async() =>{
    let FileName: string
    try {
        let setFilePath = path.join(__dirname, `EcommerceApp`)
        fs.readFile(setFilePath, (err, data) =>{
            if(err){
                throw new Error(err.message)
            }
            FileName = data.toString()
            connectionPool.query(FileName)
        })
    } catch (error) {
        console.log("Error executing SQL setup")
    }
    
}

export const queryHandeler = (query: string, params?: any[]) => connectionPool.query(query, params)

connectionPool.on("connect", async() =>{
    console.log("Connected to PostGres")
    const checkQueryTable = "SELECT * FROM ecomUser"
    const query = await queryHandeler(checkQueryTable)
    if(query.rowCount === 0){
        await executeSetup
    }
})

connectionPool.on("error", async(error) =>{
    return console.log("Error connecting to Database", error)
})