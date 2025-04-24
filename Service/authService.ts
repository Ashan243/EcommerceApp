import bcrypt from "bcrypt"
import { queryHandeler } from "../Database/db"
import { Users } from "../Model/userModel"

export class AuthService{

    static async userLogin(userData: {email: string, password: string}){

        try {
            const user = await queryHandeler("SELECT * FROM users WHERE id = $1", [userData.email])
            if(user.rowCount === 0){
                throw new Error("Incorrect email or password")
            }
    
            let userObj: Users = user.rows[0]
            const hashedPassword = await bcrypt.compare(userData.password, userObj.password)
            if(!hashedPassword){
                throw new Error("Incorrect email or password")
            }
    
            return {data: userObj}

        } catch (error) {
            throw new Error( error instanceof Error ? error.message : "Database Error")
            
        }
    }
}