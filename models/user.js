var Sequelize = require('sequelize');


// adds a UserId foreign key to the `Tweet` table
User.hasMany(Tweet);
Tweet.belongsTo(User);

module.exports = function(db) {
    var User = db.define('User', {
        name: Sequelize.STRING,
        pictureUrl: Sequelize.STRING
    }, {
        timestamps: false  // this will deactivate the time columns
    });

    return User;
};
