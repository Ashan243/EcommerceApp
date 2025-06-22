
import express from "express"

import * as routers from "./Routes/index"
import http from "http"
const app = express()
import dotenv from "dotenv"
import { connectionPool } from "./Database/db"


dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/v1/users", routers.userRoutes)






const PORT = process.env.PORT || 3000

app.listen(3000, () => {
    console.log("Listening on port: " + PORT)
    connectionPool.connect()
})

