const { Category } = require("../db");
const catergories = [
	"Food",
	"Bills and Payments",
	"Home",
	"Transport",
	"Shopping",
	"Health and Hygiene",
	"Fun",
	"Other",
];
const addCategories = async () => {
	try {
		const result = await Category.findAndCountAll();
		if (!result.count) {
			catergories.forEach((category) => {
				Category.create({
					name: category,
				});
			});
		} else {
			console.log("Categories added: ", result.count);
		}
	} catch (error) {
		console.error("Error addCategories:", error);
	}
};

module.exports = addCategories;
