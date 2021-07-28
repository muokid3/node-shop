const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getIndex = (req, res, next) => {

    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: "Welcome to shop",
                path: '/',
            });
        })
        .catch(err => { console.log(err) });



};

exports.getProducts = (req, res, next) => {

    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: "All Products",
                path: '/products',

            });
        })
        .catch(err => { console.log(err) });



};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;

    Product.findByPk(prodId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: "/products"
            });
        })
        .catch((err) => {
            console.log(err);
        });


};

exports.getCart = (req, res, next) => {

    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        pageTitle: "Your Cart",
                        path: '/cart',
                        products: products,
                    });
                })
                .catch(err =>console.log(err));
        })
        .catch(err => console.log(err));

};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;

    req.user.getCart()
    .then(cart =>{

    })
    .catch(err =>console.log(err));

    //res.redirect('/cart');
};

exports.deleteCartProduct = (req, res, next) => {
    const productId = req.body.productId;

    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart');
    });
};




exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: "Your Orders",
        path: '/orders',
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: "Checkout",
        path: '/checkout',
    });
};

