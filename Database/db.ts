import {Pool} from "pg"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"
import { error } from "console"
import EventEmitter from "events"


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
        let setFilePath = path.join(__dirname, `setup.sql`)
        fs.readFile(setFilePath, (err, data) =>{
            if(err){
                throw new Error(err.message)
            }
            FileName = data.toString()
            connectionPool.query(FileName)
            console.log(FileName)
        })
    } catch (error) {
        console.log("Error executing SQL setup")
    }
    
}


const existsLogic = `SELECT EXISTS (SELECT FROM Schemas.table WHERE users = 'users')`
export const queryHandeler = (query: string, params?: any[]) => connectionPool.query(query, params)


connectionPool.once("intialise",async() =>{
    await executeSetup()
})
connectionPool.on("connect", async() =>{
    console.log("Connected to PostGres")
    const query = await queryHandeler(existsLogic)

    if(!query){
        executeSetup()
    }
})

connectionPool.on("error", async(error) =>{
    return console.log("Error connecting to Database", error)
})



