const sequelize = require('../db')
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
});

const Lot = sequelize.define('lot', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    image: {type: DataTypes.BLOB},
    startTime: {type: DataTypes.DATE},
    endTime: {type: DataTypes.DATE},
    startPrice: {type: DataTypes.BIGINT},
    step: {type: DataTypes.BIGINT},
    currentStep: {type: DataTypes.INTEGER, defaultValue: 0},
    currentPrice: {type: DataTypes.BIGINT},
    status: {type: DataTypes.INTEGER, defaultValue: 0}
});
User.hasMany(Lot);

module.exports = {
    User,
    Lot
}

