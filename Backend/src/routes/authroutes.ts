import { Router } from "express";
import { loginUser, registerUser, welcomePage } from "../controllers/authcontroller";
import { verifyToken } from "../middlewares";

const authroutes= Router()

authroutes.post("/register", registerUser)
authroutes.post("/login", loginUser)
authroutes.get("",verifyToken, welcomePage)


export default authroutes