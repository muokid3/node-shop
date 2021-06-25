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
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;

    }

    save() {
        getProductsFromFile(products => {

            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);

                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;

                fs.writeFile(file, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });

            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(file, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }


        });

    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(pId, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === pId);
            cb(product);
        });
    }
}