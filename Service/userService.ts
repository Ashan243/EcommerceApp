import * as userModel from "../Model/userModel"


export class UserService{

    static async getAllUsers(){
        return await userModel.getAllUsers()
    }

    static async userSiginup(userData: userModel.Users){
        return await userModel.usersignup(userData)
    }


    static async findUserByid(id: string){
        return await userModel.findUserById(id)
    }
    
    static async patchUserByid(id: string, updates: userModel.Users){
        return await userModel.patchUserById(id, updates)
    }

    static async updateUserByid(id: string, updates: userModel.Users){
        return await userModel.updateUserById(id, updates)
    }

    static async deleteUserByEmail(email: string){
        return await userModel.deleteByEmail(email)
    }
    
}


export default UserService