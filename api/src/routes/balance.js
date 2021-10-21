const { Auth, Category, Balance } = require("../db");
const router = require("express").Router();
const authorization = require("./middlewares/authorization");

//GET
router.get("/", authorization, async (req, res, next) => {
	const limit = 10;
	const { page = 1, category } = req.query;
	try {
		let result;
		if (page && category) {
			result = await Balance.findAndCountAll({
				distinct: true,
				offset: (parseInt(page) - 1) * limit,
				limit,
				where: {
					authId: req.user,
					category,
				},
				attributes: ["id", "concept", "amount", "date", "type"],
				order: [["id", "desc"]],
			});
		} else if (page) {
			result = await Balance.findAndCountAll({
				distinct: true,
				offset: (parseInt(page) - 1) * limit,
				limit,
				where: {
					authId: req.user,
				},
				attributes: ["id", "concept", "amount", "date", "type"],
				order: [["id", "desc"]],
			});
		}
		res.send({
			count: result.count,
			pages: Math.ceil(result.count / limit),
			page: parseInt(page),
			results: result.rows,
		});
	} catch (error) {
		next(error);
	}
});

//POST
router.post("/", authorization, async (req, res, next) => {
	const { concept, amount, date, category, type } = req.body;
	try {
		if (concept && amount && date && category && type) {
			const newBudget = await Balance.create({
				concept,
				amount,
				date,
				category,
				type,
			});
			await newBudget.setAuth(req.user);
			res.send(newBudget);
		} else {
			res
				.status(422)
				.send({ message: "Did not receive enough data to create new budget." });
		}
	} catch (error) {
		next(error);
	}
});

// DELETE
router.delete("/:id", authorization, async (req, res, next) => {
	const { id } = req.params;
	try {
		await Balance.destroy({
			where: {
				id,
			},
		});
		res.send({ message: "Budget was deleted success." });
	} catch (error) {
		next(error);
	}
});

//PUT
router.put("/", authorization, async (req, res, next) => {
	const { concept, amount, date, category, budgetId } = req.body;
	try {
		await Balance.update(
			{
				concept,
				amount,
				date,
				category,
			},
			{
				where: {
					id: budgetId,
				},
			}
		);
		res.send({ message: "Budget was updated success." });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
