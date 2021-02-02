import jsonwebtoken from "jsonwebtoken";
import Users from "../model/users.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const registerUser = async ( req, res ) =>
{

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	try {
		const userData = new Users({
			userName: req.body.userName,
			password: hashedPassword,
			email: req.body.email,
			DOB: req.body.DOB,
			profilePicture: req.body.profilePicture,

		});
		const userExists = await Users.findOne({ userName: req.body.userName });

		if (userExists) return res.json({ message: `username not available` });
		const emailExists = await Users.findOne({

			email: req.body.email,
		});
		if ( emailExists ) return res.json( { message: `email already registered` } );
		// console.log("reached");
		const user = await userData.save();
		// console.log("saved");
		// const payload = { _id: user._id, userName: user.userName };
		const payload = user;
		jsonwebtoken.sign(
			{ expiresIn: 604800, data: payload },
			process.env.JWT_SECRET_KEY,
			(err, token) => {
				// console.log(token);
				return res.status(201).json({
					success: true,
					message: "Registration Successful!",
					accessToken: token,
					error:err,
					// expiresIn: "1d",
					// user: user,
				});
			}
		);
	} catch (error) {
		return res.status(409).json({
			message: error,
		});
	}
};

export const loginUser = async (req, res) => {
	try {
		var user = await Users.findOne({ email: req.body.email });
		if (!user) {
			return res.status(400).json({ message: "invalid email id" });
		}
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(400).json({ message: "invalid password" });
		else {
			// const payload = { _id: user._id, userName: user.userName };
			const payload = user;
			jsonwebtoken.sign(
				{ expiresIn: 604800, data: payload },
				process.env.JWT_SECRET_KEY,
				(err, token) => {
					return res.status(201).json({
						success: true,
						message: "Authentication successful!",
						accessToken: token,
						// expiresIn: "1d",
						// user: user,
					});
				}
			);
		}
	} catch (error) {
		return res.status(409).json({
			message: error.message,
		});
	}
};

export const logoutUser = async (req, res) => {
	try {
		return res.json({ message: `Logged out Successfully` });
	} catch (error) {
		// console.log(e);
		return res.status(409).json({
			message: error,
		});
	}
};
