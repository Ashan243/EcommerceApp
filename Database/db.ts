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
    let fileName: string
    try {
        let setFilePath = await path.join(__dirname, `setup.sql`)
        
        await fs.readFile(setFilePath, (err, data) =>{
            if(err){
                throw new Error(err.message)
            }
            fileName = data.toString()
            connectionPool.query(fileName)
            
        })
    } catch (error) {
        console.log("Error executing SQL setup")
    }
    
}



export const queryHandler = (query: string, params?: any[]) => connectionPool.query(query, params)



connectionPool.on("connect", async() =>{
    console.log("Connected to PostGres")
    const checkTable = "SELECT * FROM ecomuser"
    const query = await queryHandler(checkTable)

    if(query.rowCount === 0){
        await executeSetup()
        
    }

    

})

connectionPool.on("error", async(error) =>{
    return console.log("Error connecting to Database", error)
})



