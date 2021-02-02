import bcrypt from "bcrypt";
import Users from "../model/users.js";
import mongoose from "mongoose";

export const Home = async (req, res) => {
	try {
		// console.log("req-body", req.body);
		return res
			.status(200)
			.json({ message: "authentication successfull", success: true });
	} catch (error) {
		res.json({ message: error.message });
	}
};
