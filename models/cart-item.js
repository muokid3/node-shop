const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const CartItem = sequelize.define('cartItem',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        alloNull:false
    },
    quantity: Sequelize.INTEGER
});

module.exports = CartItem;