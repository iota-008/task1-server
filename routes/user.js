import { loginUser, registerUser,logoutUser } from "../controllers/user.js";
import express from "express";

const routerUser = express.Router();

routerUser.post("/login", loginUser);
routerUser.post( "/register", registerUser );
routerUser.post("/logout",logoutUser);

export default routerUser;
