const { v4: uuidv4 } = require("uuid");
const { Auth } = require("../db");
const router = require("express").Router();
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res, next) => {
	const { email, password } = req.body;

	try {
		if (!email || !password)
			return res.status(401).send({ message: "User invalidated" });
		const user = await Auth.findOne({
			where: {
				email,
			},
		});

		if (!user) {
			return res.status(401).send({ message: "User invalidated" });
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword)
			return res.status(401).send({ message: "User invalidated" });

		const token = jwtGenerator(user.id);
		return res.send({
			token,
			email: user.email,
			userName: user.userName,
		});
	} catch (error) {
		next(error);
	}
});

router.post("/register", async (req, res, next) => {
	const { email, password, userName } = req.body;
	if (email && password && userName) {
		try {
			const findUser = await Auth.findOne({ where: { email } });
			if (findUser)
				return res.status(401).send({ message: "User currently exists" });

			const saltRound = 10;
			const salt = await bcrypt.genSalt(saltRound);
			const bcryptPassword = await bcrypt.hash(password, salt);

			const user = await Auth.create({
				id: uuidv4(),
				email,
				password: bcryptPassword,
				userName,
			});

			const token = jwtGenerator(user.email);
			res.send({
				token,
				userName: user.userName,
				email: user.email,
			});
		} catch (error) {
			next(error);
		}
	} else {
		res
			.status(401)
			.send({ message: "Did not receive enough data to create new user" });
	}
});
module.exports = router;
