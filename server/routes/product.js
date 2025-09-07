const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const ProductController = require('../controller/productController');
const SellerController = require('../controller/sellerController');
const UserController = require('../controller/userController');
const auth = require('../middleware/auth');
const authUser = require('../middleware/authUser');
const ReviewController = require('../controller/reviewController')
const DashboardController = require('../controller/dashboardController');
const CartController = require('../controller/cartContoller');

router.get('/products', ProductController.getProducts);
router.get('/products/category-list', ProductController.getCategoryList);
router.get('/products/category/:category', ProductController.getProductByCategory);
router.get('/products/search', ProductController.searchProducts);
router.get('/products/:id', ProductController.getProductById);

router.get('/seller/products', auth, ProductController.getProductsBySeller);
router.get('/seller/products/search', auth, ProductController.searchProductsByAdmin);
router.get('/seller/products/:category', auth, ProductController.getProductByCategorySeller);
router.post('/products/create', auth, upload.single('file'), ProductController.createProduct);
router.put('/products/:id', upload.single('file'), ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);


router.get('/admin', SellerController.getSellers);
router.get('/admin/dashboard/products', auth, DashboardController.getProducts)

router.get('/seller', auth, SellerController.getSellerById);
router.post('/admin/login', SellerController.sellerLogin);
router.post('/admin/create', SellerController.createSeller)
router.put('/admin/:id', SellerController.updateSeller);
router.delete('/admin/:id', SellerController.deleteSeller);

router.post('/user/signup', UserController.createUser);
router.post('/user/login', UserController.loginUser);

router.get('/reviews/:id', ReviewController.getReview);
router.post('/review/create', ReviewController.createReview);

router.post('/cart/add', authUser, CartController.createCart);
router.get('/cart/get', authUser, CartController.getCart);
router.patch('/cart/update', authUser, CartController.updateQuantity);
router.delete('/cart/remove/:productId', authUser, CartController.removeItem);
router.delete('/cart/clear', authUser, CartController.clearCart);

module.exports = router;
