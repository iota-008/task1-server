// import passport_verify from "./passport-verify.js";
import { Home } from "../controllers/Home.js";
import express from "express";
import passport from "passport";

const routerHome = express.Router();

routerHome.get(
	"/home",
	passport.authenticate("jwt", { session: false }),
	Home
);
// router.post("/register", registerUser);

export default routerHome;
