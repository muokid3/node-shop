const path = require('path');
const fs = require('fs');

const rootPath = require('../utils/path');

const file = path.join(rootPath, 'data', 'products.json');



const getProductsFromFile = (cb) => {

    fs.readFile(file, (err, fileContent) => {

        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};


module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;

    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(file, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });

    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}