
import { QueryResult } from "pg";
import { queryHandeler } from "../Database/db";
import { connectionPool } from "../Database/db";
import bcrypt from "bcrypt"
import cuid from "cuid"


export interface ecomUser{

    id: string
    name: string
    username: string
    email: string
    password: string
}


const getAllUsers = async(): Promise<ecomUser[]> =>{
    const user = await connectionPool.query("SELECT * FROM ecomUser")
    return user.rows
}



const userSignup = async(userData: ecomUser): Promise<QueryResult<ecomUser>> =>{

    const {name, username, email, password} = userData
    const id = cuid()
    const hashedPassword = await bcrypt.hash(password, 15)
    const user = await queryHandeler("INSERT INTO (id, name, username, email, password) VALUES ($1,$2,$3,$4,$5) RETURNING *", [id, name, username, email, hashedPassword])
    console.log(user.rows[0])


    return user
}


const findUserById = async(id: string): Promise<QueryResult<ecomUser>> =>{
    const user = await queryHandeler("SELECT * FROM ecomUser WHERE id = $1", [id])
    return user.rows[0]
}


const patchUserById = async(id: string, updates: Partial<ecomUser>): Promise<void | QueryResult<any>> =>{

    const fieldNames = Object.keys(updates)

    if(fieldNames.length === 0){
        throw new Error("No Data Found")
    }
    
    const fieldValues = Object.values(updates)
    
    if(fieldValues.length === 0){
        throw new Error("No Data Found")
    }

    const user = await queryHandeler(`UPDATE ecomUser SET ${fieldNames[0]} = $1 WHERE id = $2`, [fieldValues[0], id])
    return user.rows[0]
}


const updateUserById = async(id: string, updates: Partial<ecomUser>): Promise<QueryResult<any>> =>{

    const fieldNames = Object.keys(updates)
    if(fieldNames.length === 0){
        throw new Error("No Data Found")
    }

    const fieldValues = Object.values(updates)
    if(fieldValues.length === 0){
        throw new Error("No Data Found")
    }

    const keyMap = fieldNames.map((fields, index) => `${fields} = $${index + 1}`).join(", ")

    const user = await queryHandeler(`UPDATE ecomUser SET ${keyMap} WHERE id = $${fieldNames.length + 1} RETURNING *`, [...fieldValues, id])
    return user.rows[0]

}