const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node_shop',
    password:'st34lthfr34k'
});

module.exports = pool.promise();