const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const authorization = async (req, res, next) => {
	try {
		let token;
		const jwtToken = req.headers["authorization"] || req.query.access_token;
		if (jwtToken.includes("Bearer")) {
			token = jwtToken.split(" ")[1];
		} else {
			token = jwtToken;
		}

		if (!token)
			return res.status(403).send({ message: "Authorization denied." });

		const payload = jwt.verify(token, JWT_SECRET);

		req.user = payload.user;
		next();
	} catch (error) {
		return res.status(403).send({ message: "Authorization denied." });
	}
};

module.exports = authorization;
