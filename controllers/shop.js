const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getIndex = (req, res, next) => {
    // console.log('In another middleware');

    Product.fetchAll()
    .then(([rows, fieldData])=>{
        res.render('shop/index', {
            prods: rows,
            pageTitle: "Welcome to shop",
            path: '/',
        });
    })
    .catch((err)=>{
        console.log(err);
    });

};

exports.getProducts = (req, res, next) => {

    Product.fetchAll()
    .then(([rows, fieldData])=>{
        //console.log(fieldData)
        res.render('shop/product-list', {
            prods: rows,
            pageTitle: "All Products",
            path: '/products',
        
        });
    })
    .catch((err)=>{
        console.log(err);
    });

};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;

    Product.findById(prodId)
    .then(([product])=>{
        // console.log(product);
        res.render('shop/product-detail', { 
            product: product[0],
            pageTitle:product[0].title, 
            path:"/products" 
        });
    })
    .catch((err)=>{
        console.log(err);
    });


};

exports.getCart = (req, res, next) => {

    Cart.getCart(cart => {
        Product.fetchAll(products => {

            const cartProducts = [];
            for(product of products){

                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }

            res.render('shop/cart', {
                pageTitle: "Your Cart",
                path: '/cart',
                products: cartProducts,
            });
        })
    })
    
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findById(prodId, (product) => {
        Cart.addToCart(prodId,product.price);
    });

    res.redirect('/cart');
};

exports.deleteCartProduct = (req,res,next) => {
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

