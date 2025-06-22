
import { QueryResult } from "pg";
import { queryHandler } from "../Database/db";
import { connectionPool } from "../Database/db";
import bcrypt from "bcrypt"
import cuid from "cuid"



//1. Basket - Processing a basket received from the client
//2. Send response back to the user + add the neccessary order info to the database
//basket Model
//user model + RBAC
//item model
export interface Users{

    id: string
    name: string
    username: string
    email: string
    password: string
}


const getAllUsers = async(): Promise<Users[]> =>{
    const user = await connectionPool.query("SELECT * FROM ecomuser")
    return user.rows
}



const usersignup = async(userData: Users): Promise<QueryResult<Users>> =>{

    const {name, username, email, password} = userData
    const id = cuid()
    const hashedPassword = await bcrypt.hash(password, 15)
    const user = await queryHandler("INSERT INTO ecomuser (id, name, username, email, password) VALUES ($1,$2,$3,$4,$5) RETURNING *", [id, name, username, email, hashedPassword])
    console.log(user.rows[0])


    return user
}


const findUserById = async(id: string): Promise<QueryResult<Users>> =>{
    const user = await queryHandler("SELECT * FROM ecomuser WHERE id = $1", [id])
    return user.rows[0]
}


const patchUserById = async(id: string, updates: Partial<Users>): Promise<void | QueryResult<any>> =>{

    const fieldNames = Object.keys(updates)

    if(fieldNames.length === 0){
        throw new Error("No Data Found")
    }
    
    const fieldValues = Object.values(updates)
    
    if(fieldValues.length === 0){
        throw new Error("No Data Found")
    }

    const user = await queryHandler(`UPDATE ecomuser SET ${fieldNames[0]} = $1 WHERE id = $2`, [fieldValues[0], id])
    return user.rows[0]
}


const updateUserById = async(id: string, updates: Partial<Users>): Promise<QueryResult<any>> =>{

    const fieldNames = Object.keys(updates)
    if(fieldNames.length === 0){
        throw new Error("No Data Found")
    }

    const fieldValues = Object.values(updates)
    if(fieldValues.length === 0){
        throw new Error("No Data Found")
    }

    const keyMap = fieldNames.map((fields, index) => `${fields} = $${index + 1}`).join(", ") //$1, $2, $3
    // email = "ash321@gmail.com", mobile = "+1 918 342 213", username = "Ash321" WHERE id = $4

    const user = await queryHandler(`UPDATE ecomuser SET ${keyMap} WHERE id = $${fieldNames.length + 1} RETURNING *`, [...fieldValues, id])
    return user.rows[0]

}



const deleteByEmail = async(email: string): Promise<void> =>{

    if(email.includes("@")){
        await queryHandler("DELETE FROM ecomuser WHERE email = $1 RETURNING *", [email]) 
    }

    console.log("email must contain an @")

}



export {

    findUserById,
    patchUserById,
    updateUserById,
    deleteByEmail,
    usersignup,
    getAllUsers
}