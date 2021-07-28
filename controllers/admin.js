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

    req.user
        .createProduct({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description,
        })
        .then(result => {
            console.log(result);
            res.redirect('/admin/products');
        })
        .catch(errr => { console.log(errr) });


};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;

    if (!editMode) {
        res.redirect('/');
    }

    const prodId = req.params.productId;

    Product.findByPk(prodId)
        .then(
            prod => {
                res.render('admin/edit-product', {
                    pageTitle: "Edit product",
                    path: '/admin/edit-product',
                    editing: editMode,
                    product: prod
                });
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        );


};


exports.postEditProduct = (req, res, next) => {

    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    Product.findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.imageUrl = updatedImageUrl;
            product.price = updatedPrice;
            product.description = updatedDescription;

            return product.save();
        })
        .then(result => {
            console.log("Updated product");
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));




};


exports.postDeleteProduct = (req, res, next) => {

    const prodId = req.body.productId;

    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log('product destroyed');
            res.redirect('/admin/products');

        })
        .catch(err => console.log(err));


};



exports.getAdminProducts = (req, res, next) => {

    //Product.findAll()
    req.user
        .getProducts()
        .then(
            products => {
                res.render('admin/products', {
                    prods: products,
                    pageTitle: "Products",
                    path: '/admin/products',
                    activeShop: true,
                    productsCSS: true
                });
            }
        )
        .catch(err => { console.log(err); });


};