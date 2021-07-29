const express = require('express');
const path =  require('path');

const shopController = require('../controllers/shop');


const router = express.Router();


router.get('/',shopController.getIndex);
router.get('/products',shopController.getProducts);
router.get('/products/:productId',shopController.getProduct);
router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.post('/cart-delete-item',shopController.deleteCartProduct);
router.get('/orders',shopController.getOrders);
router.get('/checkout',shopController.getCheckout);
router.post('/create-order',shopController.postCreateOrder);






module.exports = router;