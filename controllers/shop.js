const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    // console.log('In another middleware');
    const products = Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: "Welcome to shop",
            path: '/',
            formsCSS: true,
            productsCSS: true
        });

    
    });

    
};

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: "All Products",
            path: '/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productsCSS: true
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId);
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: "Your Cart",
        path: '/cart',
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

