import UserService from "../Service/userService";
import { AuthService } from "../Service/authService";
import {Request, Response, NextFunction} from "express"



export const getAllUsers = async(req: Request, res: Response, next: NextFunction) =>{

    const user = await UserService.getAllUsers()
    return user
    
}

export const userSiginup = async(req: Request, res: Response, next: NextFunction) =>{

    const user = await UserService.userSiginup(req.body)
    return user
    
}

export const findUserById = async(req: Request, res: Response, next: NextFunction) =>{

    const user = await UserService.findUserByid(req.body)
    return user
    
}

export const patchUserById = async(req: Request, res: Response, next: NextFunction) =>{

    const user = await UserService.patchUserByid(req.body.id, req.body)
    return user
    
}

export const updateUserById = async(req: Request, res: Response, next: NextFunction) =>{

    const user = await UserService.updateUserByid(req.body.id, req.body)
    return user
    
}

export const deleteUserByEmail = async(req: Request, res: Response, next: NextFunction) =>{

    const user = await UserService.deleteUserByEmail(req.body)
    return user
    
}

