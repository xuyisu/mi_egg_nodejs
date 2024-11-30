'use strict'

const { NUMBER, SELECTED, CART_UPDATE_TYPE } = require('../extend/constant')
const { successResponse, errorResponse } = require('../utils/response')

const Controller = require('egg').Controller

class CartController extends Controller {
  // 获取用户购物车列表
  async getCarts() {
    const ctx = this.ctx
    try {

      const userId = ctx.user.id
      const carts = await ctx.service.cart.findByUserId(userId)
      if (carts.length === 0) {
        return ctx.body = successResponse([])
      }
      //统计总金额
      let cartTotalPrice = carts.reduce((acc, cur) => {
        return (acc * NUMBER.ONE_HUNDRED + cur.productTotalPrice * NUMBER.ONE_HUNDRED) / NUMBER.ONE_HUNDRED
      }, NUMBER.ZERO);
      //计算总数量
      let cartTotalQuantity = carts.reduce((acc, cur) => acc + cur.quantity, NUMBER.ZERO)
      let selectedAll = true
      carts.forEach(item => {
        if (item.selected < SELECTED.YES) {
          selectedAll = false
        }
      })

      //构建返回的新对象
      const result = {
        cartTotalPrice: cartTotalPrice,
        cartTotalQuantity: cartTotalQuantity,
        selectedAll: selectedAll,
        cartProductList: carts
      }
      ctx.body = successResponse(result)
    } catch (err) {
      ctx.body = errorResponse(err.message)
    }
  }

  // 添加商品到购物车
  async addCart() {
    const ctx = this.ctx
    //获取商品id
    const productId = ctx.request.body.productId
    if (!productId) {
      return ctx.body = errorResponse('商品id不能为空')
    }
    //查询商品是否已存在
    const product = await ctx.service.product.findEnaleByProductId(productId)
    if (!product) {
      return ctx.body = errorResponse('当前商品已下架或删除')
    }
    //查询当前商品是否已添加购物车 TODO 用户id 待完善
    const userId = ctx.user.id
    let cart = await ctx.service.cart.findByUserIdAndProductId(userId, productId)

    if (!cart) {
      //新增，记录价格和数量
      cart = {
        activityId: product.activityId,
        userId: userId,
        createUser: userId,
        productId: productId,
        productSubtitle: product.subtitle,
        productUnitPrice: product.price,
        productMainImage: product.mainImage,
        productTotalPrice: product.price,
        productName: product.name,
        quantity: 1,
        selected: 1,
        productTotalPrice: product.price,
      }
      //检查活动信息
      if (product.activityId) {
        const activity = await ctx.service.activity.findByActivityId(product.activityId)
        if (activity) {
          //存在，记录活动名称
          cart.activityName = activity.name
        }
      }
      await ctx.service.cart.save(cart)
    } else {
      cart.updateTime = new Date()
      cart.quantity = cart.quantity + NUMBER.ONE
      cart.productTotalPrice = cart.quantity * cart.productUnitPrice
      await ctx.service.cart.save(cart)
    }
    await this.sum();
  }

  // 购物车商品数量
  async sum() {
    const ctx = this.ctx
    const userId = ctx.user.id
    //统计当前用户购物车商品数量
    const countCart = await ctx.service.cart.countByUserId(userId)
    ctx.body = successResponse(countCart);
  }

  async updateCount() {
    const ctx = this.ctx
    const productId = ctx.params.productId
    const cartCountChangeReq = ctx.request.body
    const userId = ctx.user.id
    if (!productId) {
      return ctx.body = errorResponse('商品id不能为空')
    }
    if (!cartCountChangeReq) {
      return ctx.body = errorResponse('参数错误')
    }
    //校验商品是否已存在
    const product = await ctx.service.product.findEnaleByProductId(productId)
    if (!product) {
      return ctx.body = errorResponse('当前商品已下架或删除')
    }
    //查询商品是否已添加
    const cart = await ctx.service.cart.findByUserIdAndProductId(userId, productId)
    if (!cart) {
      return ctx.body = errorResponse('购物车已不存在该商品')
    }
    cart.updateTime = new Date()
    if (CART_UPDATE_TYPE.ADD === cartCountChangeReq.type) {
      cart.quantity = cart.quantity + NUMBER.ONE
    } else {
      if (cart.quantity <= NUMBER.ONE) {
        return ctx.body = errorResponse('不能再减了,要减没了')
      }
      cart.quantity = cart.quantity - NUMBER.ONE
    }
    cart.productTotalPrice = cart.quantity * cart.productUnitPrice
    cart.selected = cartCountChangeReq.selected
    cart.updateUser = userId
    await ctx.service.cart.save(cart)
    ctx.body = successResponse()
  }


  //根据商品id删除购物车
  async deleteCart() {
    const ctx = this.ctx
    const productId = ctx.params.productId
    const userId = ctx.user.id
    if (!productId) {
      return ctx.body = errorResponse('商品id不能为空')
    }
    //查询商品是否已添加
    const cart = await ctx.service.cart.findByUserIdAndProductId(userId, productId)
    if (!cart) {
      return ctx.body = errorResponse('购物车已不存在该商品')
    }
    cart.deleteFlag = DELETE_FLAG.YES
    cart.deleteUser = userId
    cart.updateTime = new Date()
    await ctx.service.cart.save(cart)
    ctx.body = successResponse()
  }

  //购物车全选
  async selectAll() {
    const ctx = this.ctx
    const userId = ctx.user.id
    //查询当前用户购物车商品未选择的，设置未选择
    const cartList = await ctx.service.cart.findByUserIdAndSelected(userId, SELECTED.NO)
    if (cartList.length === NUMBER.ZERO) {
      return ctx.body = successResponse()
    }
    cartList.forEach(item => {
      item.selected = SELECTED.YES
      item.updateTime = new Date()
      item.updateUser = userId
      this.ctx.service.cart.save(item)
    })
    ctx.body = successResponse()
  }

  //购物车全不选
  async unSelectAll() {
    const ctx = this.ctx
    const userId = ctx.user.id
    //查询当前用户购物车商品未选择的，设置未选择
    const cartList = await ctx.service.cart.findByUserIdAndSelected(userId, SELECTED.YES)
    if (cartList.length === NUMBER.ZERO) {
      return ctx.body = successResponse()
    }
    cartList.forEach(item => {
      item.selected = 0
      item.updateTime = new Date()
      item.updateUser = userId
      this.ctx.service.cart.save(item)
    })
    ctx.body = successResponse()
  }
}

module.exports = CartController
