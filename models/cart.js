const path = require('path');
const fs = require('fs');

const rootPath = require('../utils/path');

const file = path.join(rootPath, 'data', 'cart.json');


module.exports = class Cart {
    static addToCart(id, productPrice) {
        //search the previous cart
       
        fs.readFile(file, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
           
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            //analyse cart, find existung product

            const existsingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existsingProduct = cart.products[existsingProductIndex];
            let updatedProduct;

            //addd new product or increase quantity
            if(existsingProduct){
                updatedProduct = {...existsingProduct};
                updatedProduct.qty = updatedProduct.qty +1;
                cart.products = [...cart.products];
                cart.products[existsingProductIndex] = updatedProduct;
            }else{
                updatedProduct = {id:id, qty:1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(file, JSON.stringify(cart), err => {
                console.log(err);
            });

        });

    }


    static deleteProduct (id, productPrice){
        fs.readFile(file, (err, fileContent) => {
            if(err){
                return;
            }


            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(prod => prod.id === id);

            if(!product){
                return;
            }
            const productQty = product.qty;

            updatedCart.products = updatedCart.products.filter(prod =>prod.id !== id);

            console.log("total price"+updatedCart.totalPrice);
            console.log("product price "+productPrice);
            console.log("product qty "+productQty);

            //updatedCart.totalPrice = updatedCart.totalPrice - productQty * productPrice;
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(file, JSON.stringify(updatedCart), err => {
                console.log(err);
            });

        });
    }

    static getCart(cb){
        fs.readFile(file, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            

            if(err){
                cb(null)
            }else{
                cb(cart);
            }
        });
    }
}