module.exports = (sequelize, DataTypes) => {
	const Posts = sequelize.define("Posts", {
		title: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		postText: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});

	Posts.associate = (models) => {
		Posts.hasMany(models.Comments, { onDelete: "cascade" });
	};
	return Posts;
};
