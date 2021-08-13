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
    const product = new Product(title,price,description,imageUrl)

    product.save()
    .then(result => {
        //console.log(result);
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

    Product.findById(prodId)
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

    const updatedProduct = new Product(updatedTitle,updatedPrice,updatedDescription,updatedImageUrl,prodId);

    updatedProduct
        .save()
        .then(result => {
            console.log("Updated product");
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};


exports.postDeleteProduct = (req, res, next) => {

    const prodId = req.body.productId;

  Product.deleteById(prodId)
        .then(() => {
            console.log('product destroyed');
            res.redirect('/admin/products');

        })
        .catch(err => console.log(err));


};



exports.getAdminProducts = (req, res, next) => {

   Product.fetchAll()
   .then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: "Products",
            path: '/admin/products',
            activeShop: true,
            productsCSS: true
        });
   });

};