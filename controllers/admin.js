const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // console.log('In another middleware');
    res.render('admin/add-product', {
        pageTitle: "Add product",
        path: '/admin/add-product',
        formsCSS: true,
        productsCSS: true
    });
};

exports.postAddProduct = (req, res, next) => {
    //console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title,imageUrl,price,description);
    product.save();
    res.redirect('/');

};



exports.getAdminProducts = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: "Products",
            path: '/admin/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productsCSS: true
        });
    });

};