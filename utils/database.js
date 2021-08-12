const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;


const mongoConnect = callback => {
    MongoClient.connect(
        "mongodb+srv://muoki:st34lthfr34k@cluster0.za0ve.mongodb.net/shop?retryWrites=true&w=majority"
    )
    .then(client =>{
        console.log("connected!");
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
    });
}

const getDb = () => {
    if (_db){
        return _db;
    }

    throw "No database found";
}

// module.exports = mongoConnect;

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
