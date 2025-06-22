import express, {Router} from "express"
import { getAllUsers, findUserById, userSiginup, updateUserById, patchUserById, deleteUserByEmail } from "../Controller/userController"

const router = Router()


router.get("/getallusers", getAllUsers)
router.get("/finduserbyid", findUserById)
router.post("/usersignup", userSiginup)
router.put("/patchuserbyid", patchUserById)
router.put("/updateuserbyid", updateUserById)
router.delete("/deleteuserbyemail", deleteUserByEmail)


export default router
