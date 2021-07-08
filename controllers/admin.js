const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // console.log('In another middleware');
    res.render('admin/edit-product', {
        pageTitle: "Add product",
        path: '/admin/add-product',
        editing: false,

    });
};

exports.postAddProduct = (req, res, next) => {
    //console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
    })
        .then(result => { console.log(result) })
        .catch(errr => { console.log(errr) });


};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;

    if (!editMode) {
        res.redirect('/');
    }

    const prodId = req.params.productId;

    Product.findById(prodId, (product) => {

        if (!product) {
            return res.redirect('/');
        }

        res.render('admin/edit-product', {
            pageTitle: "Edit product",
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });


};


exports.postEditProduct = (req, res, next) => {

    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);
    updatedProduct.save();

    res.redirect('/admin/products');

};


exports.postDeleteProduct = (req, res, next) => {

    const prodId = req.body.productId;

    Product.deleteById(prodId);

    res.redirect('/admin/products');

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