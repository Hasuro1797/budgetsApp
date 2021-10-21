const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	sequelize.define(
		"balance",
		{
			concept: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			amount: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			category: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};
