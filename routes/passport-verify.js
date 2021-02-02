import pjwt from "passport-jwt";
import User from "../model/users.js";
import dotenv from "dotenv";
// import passport from "passport";
dotenv.config();

const JwtStrategy = pjwt.Strategy;
const ExtractJwt = pjwt.ExtractJwt;

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET_KEY,
	algoritms: ["RS256"],
};

export default (passport) => {
	console.log("reached verify");
	passport.use(
		new JwtStrategy(options, (payload, done) => {
			console.log("payload : ", payload);
			User.findOne({ _id: payload.data._id }, (err, user) => {
				if (err) {
					return done(err);
				} else if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			});
		})
	);
};
