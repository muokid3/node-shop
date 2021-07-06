
const db = require('../utils/database');
const Cart = require('./cart');



const getProductsFromFile = () => {

   
};


module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;

    }

    save() {
       return db.execute('insert into products (title,price,imageUrl,description) values (?, ?, ?, ?)',
        [this.title, this.price, this.imageUrl, this.description]);
    }

    static fetchAll() {
        return db.execute('select * from products');
    }



    static deleteById(id) {
       
    }

    static findById(pId) {
        return db.execute('select * from products where id = ?',[pId]);
    }
}