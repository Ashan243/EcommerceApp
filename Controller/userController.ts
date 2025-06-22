import UserService from "../Service/userService";
import { AuthService } from "../Service/authService";
import {Request, Response, NextFunction} from "express"



export const getAllUsers = async(req: Request, res: Response, next: NextFunction) =>{

    try {
        const user = await UserService.getAllUsers()
        res.status(200).json({success: true, data: user})
    } catch (error) {
        next(error)
    }
    
}

export const userSiginup = async(req: Request, res: Response, next: NextFunction) =>{

    try {
        const user = await UserService.userSiginup(req.body)
        res.status(200).json({success: true, data: user})
        
    } catch (error) {
        next(error)
    }
}

export const findUserById = async(req: Request, res: Response, next: NextFunction) =>{

    try {
        const user = await UserService.findUserByid(req.body)
        res.status(200).json({success: true, data: user})
    
    } catch (error) {
        next(error)
    }
    
}

export const patchUserById = async(req: Request, res: Response, next: NextFunction) =>{

    try {
        const user = await UserService.patchUserByid(req.body.id, req.body)
        res.status(200).json({success: true, data: user})
    
    } catch (error) {
        next(error)
    }
    
}

export const updateUserById = async(req: Request, res: Response, next: NextFunction) =>{

    try {
        const user = await UserService.updateUserByid(req.body.id, req.body)
        res.status(200).json({success: true, data: user})
    
    } catch (error) {
        next(error)
    }
    
}

export const deleteUserByEmail = async(req: Request, res: Response, next: NextFunction) =>{

    try {
        const user = await UserService.deleteUserByEmail(req.body)
        res.status(200).json({success: true, data: user})
    
    } catch (error) {
        next(error)
    }
    
}

