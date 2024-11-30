const authMiddleware = require('./middleware/authMiddleware');
const { validateRegister, validateLogin, validateOrderPay, validateCreateUserAddress } = require('./middleware/validate');

module.exports = app => {
  const { router, controller } = app;
  //用户路由
  router.post('/user/register',validateRegister, controller.user.register);
  router.post('/user/login', validateLogin, controller.user.login);
  router.get('/user/getUser',authMiddleware, controller.user.getUser);
  router.post('/user/logout', controller.user.logout);
  //类目路由
  router.get('/category/list', controller.category.getCategorys);

  //购物车路由
  router.get('/cart/list', authMiddleware, controller.cart.getCarts);
  router.get('/cart/sum', authMiddleware, controller.cart.sum);
  router.post('/cart/add', authMiddleware, controller.cart.addCart);
  router.put('/cart/selectAll', authMiddleware, controller.cart.selectAll);
  router.put('/cart/unSelectAll', authMiddleware, controller.cart.unSelectAll);
  router.delete('/cart/:productId', authMiddleware, controller.cart.deleteCart);
  router.put('/cart/:productId', authMiddleware, controller.cart.updateCount);

  //订单路由
  router.get('/order/pages', authMiddleware, controller.orderInfo.getOrders);
  router.post('/order/create', authMiddleware, controller.orderInfo.create);
  router.get('/order/:orderNo', authMiddleware, controller.orderInfo.detail);
  router.post('/order/pay', authMiddleware, validateOrderPay, controller.orderInfo.pay);
  router.put('/order/:orderNo', authMiddleware, controller.orderInfo.cancel);

  //商品路由
  router.get('/product/pages', controller.product.getProducts);
  router.get('/product/:productId', controller.product.detail);

  //地址路由
  router.get('/address/pages',authMiddleware, controller.userAddress.pages);
  router.post('/address/add', authMiddleware, validateCreateUserAddress, controller.userAddress.add);
  router.get('/address/:addressId', authMiddleware, controller.userAddress.detail);
  router.put('/address/:addressId', authMiddleware, validateCreateUserAddress, controller.userAddress.updateUserById);
  router.delete('/address/:addressId',authMiddleware,  controller.userAddress.deleteUserById);
};