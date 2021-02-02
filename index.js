import mongoose from "mongoose";
// import session from "express-session";
import bodyParser from "body-parser";
import express from "express";
// import connectMongo from "connect-mongo";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import routerUser from "./routes/user.js";
import routerHome from "./routes/home.js";
import verify from "./routes/passport-verify.js";

dotenv.config();
// const MongoStore = connectMongo(session);
const app = express();

const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};
// const connection = mongoose.createConnection(
// 	process.env.CONNECTION_URL,
// 	dbOptions
// );

// const sessionStore = new MongoStore({
// 	mongooseConnection: connection,
// 	collection: "sessions",
// });
// app.use(
// 	session({
// 		secret: process.env.SESSION_SECRET,
// 		resave: false,
// 		saveUninitialized: true,
// 		store: sessionStore,
// 		cookie: {
// 			maxAge: 1000 * 60 * 60 * 24,
// 		},
// 	})
// );
verify(passport);
app.use(express.json());
app.use(
	bodyParser.json({
		limit: "30mb",
		extended: true,
	})
);
app.use(
	bodyParser.urlencoded({
		limit: "30mb",
		extended: true,
	})
);
app.use(passport.initialize());
app.use(cors());
app.use("/user", routerUser);
app.use("/me", routerHome);
app.get("/", (req, res) => {
	res.send("Welcome to Server");
});

const PORT = process.env.PORT || 5000;
mongoose
	.connect(process.env.CONNECTION_URL, dbOptions)
	.then(() => {
		app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
	})
	.catch((error) => console.log(error.mesage));
