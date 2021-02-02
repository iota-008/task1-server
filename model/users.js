import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	userName: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	DOB: { type: Date, default: null },
	accountCreatedAt: { type: Date, default: new Date() },
	profilePicture: { type: String, default: null },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
