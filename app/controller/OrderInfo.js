'use strict';

const Controller = require('egg').Controller;
const {
  DELETE_FLAG,
  NUMBER,
  ORDER_STATUS,
  PAY_TYPE,
  SELECTED
} = require('../extend/constant')
const { successResponse, errorResponse } = require('../utils/response');
const formatDate = require('../utils/formatDate'); // 根据你的文件结构调整路径

class OrderInfoController extends Controller {

  // 分页获取所有订单
  async getOrders() {
    const ctx = this.ctx
    const userId = ctx.user.id
    const { currrent = 1, size = 10 } = ctx.query;
    try {
      const users = await this.service.orderInfo.findAndCountAll({ userId, currrent, size });
      const result = {
        current: parseInt(currrent),
        size: parseInt(size),
        pages: Math.ceil(users.count / parseInt(size)),
        total: users.count,
        records: users.rows.map(item => {
          const newItem = {
            ...item.dataValues,
            createTime: formatDate(item.dataValues.createTime),
            updateTime: formatDate(item.dataValues.updateTime),
            paymentTime: formatDate(item.dataValues.paymentTime)
          }
          return newItem
        })
      }
      ctx.body = successResponse(result)
    } catch (error) {
      ctx.body = errorResponse(error.message)
    }
  };

  // 创建订单
  async create() {
    const ctx = this.ctx
    try {
      const userId = ctx.user.id
      const { addressId } = ctx.request.body;
      if (!addressId) {
        return ctx.body = errorResponse('addressId is required')
      }
      //校验地址是否有效
      const address = await ctx.service.userAddress.findByAddressId(addressId);
      if (!address) {
        return ctx.body = errorResponse('当前地址已不存在，请重新添加地址')
      }
      //从购物车获取商品
      const carts = await ctx.service.cart.findByUserIdAndSelected(userId, SELECTED.YES);
      if (!carts || carts.length === 0) {
        return ctx.body = errorResponse('恭喜您的购物车已经被清空了，再加一车吧')
      }
      //根据时间戳创建订单号
      const orderNo = Date.now();
      let totalOrderPrice = NUMBER.ZERO;
      carts.forEach(async (cart) => {
        //查看商品
        const product = await ctx.service.product.findEnaleByProductId(cart.productId);
        if (!product || product.stock <= NUMBER.ZERO) {
          return ctx.body = errorResponse('商品库存不足,请选择其它产品')
        }
        //构建商品明细
        const orderDetail = {
          orderNo: orderNo,
          orderDetailNo: Date.now() + Math.floor(Math.random() * 10).toString().padStart(5, '0'),
          currentUnitPrice: product.price,
          productId: product.productId,
          productMainImage: product.mainImage,
          productName: product.name,
          productPrice: product.price,
          quantity: cart.quantity,
          totalPrice: cart.productTotalPrice,
          status: ORDER_STATUS.UN_PAY,
          statusDesc: '待支付',
          userId: userId,
          createUser: userId,
          deleteFlag: DELETE_FLAG.NO
        }
        //获取活动信息
        const activity = await ctx.service.activity.findByActivityId(product.activityId);
        if (activity) {
          orderDetail.activityId = activity.activityId;
          orderDetail.activityName = activity.name;
          orderDetail.mainImage = activity.mainImage;
        }
        totalOrderPrice += cart.productTotalPrice
        //订单状态记录
        const orderStatusRecord = {
          orderNo: orderNo,
          orderDetailNo: orderDetail.orderDetailNo,
          status: ORDER_STATUS.UN_PAY,
          statusDesc: '待支付',
          productId: product.productId,
          productName: product.name,
          deleteFlag: DELETE_FLAG.NO
        }
        await ctx.service.orderDetail.create(orderDetail);
        await ctx.service.orderStatusRecord.create(orderStatusRecord);
        //删除购物车
        await ctx.service.cart.update(cart.id, {deleteFlag: DELETE_FLAG.YES, updateTime: new Date() });
      })
      //创建订单主信息
      const orderInfo = await ctx.service.orderInfo.create({
        orderNo: orderNo,
        totalPrice: totalOrderPrice,
        userId: userId,
        addressId: addressId,
        province: address.province,
        city: address.city,
        area: address.area,
        street: address.street,
        postCode: address.postCode,
        receiveName: address.receiveName,
        receivePhone: address.receivePhone,
        payment: totalOrderPrice,
        paymentType: PAY_TYPE.ONLINE,
        paymengTypeDesc: '在线支付',
        status: ORDER_STATUS.UN_PAY,
        statusDesc: '待支付',
        userId: userId,
        createUser: userId,
        deleteFlag: DELETE_FLAG.NO
      })
      ctx.body = successResponse(orderInfo)
    } catch (error) {
      console.log(error)
      ctx.body = errorResponse(error.message);
    }
  }

  //根据订单编号查询明细
  async detail() {
    const ctx = this.ctx
    const userId = ctx.user.id
    const orderNo = ctx.params.orderNo;
    if (!orderNo) {
      return ctx.body = errorResponse('订单编号不能为空')
    }
    try {

      let orderDto = await ctx.service.orderInfo.findByOrderNoAndUserId(orderNo, userId)
      if (!orderDto) {
        return ctx.body = errorResponse('订单不存在')
      }
      orderDto.dataValues.createTime = formatDate(orderDto.createTime);
      orderDto.dataValues.updateTime = formatDate(orderDto.updateTime);
      //查询并返回订单明细
      const orderDetailsDto =  await ctx.service.orderDetail.findByOrderNo(orderNo)
      if (orderDetailsDto || orderDetailsDto.length != 0) {
        orderDto.dataValues.details = orderDetailsDto
        orderDetailsDto.forEach(item => {
          item.dataValues.createTime = formatDate(item.createTime);
          item.dataValues.updateTime = formatDate(item.updateTime);
        })
      }


      ctx.body = successResponse(orderDto)
    } catch (error) {
      ctx.body = errorResponse(error.message)
    }

  }

  //付款
  async pay() {
    try {
      const ctx = this.ctx;
      const userId = ctx.user.id
      const { orderNo } = ctx.request.body;
      //校验订单信息
      const order = await ctx.service.orderInfo.findByOrderNoAndUserId(orderNo, userId);
      if (!order) {
        return ctx.body = errorResponse('订单不存在')
      }
      if (order.userId != userId) {
        return ctx.body = errorResponse('订单不属于当前用户')
      }
      //校验订单状态
      if (order.status != ORDER_STATUS.UN_PAY) {
        return ctx.body = errorResponse('订单状态异常')
      }
      //更新订单状态
      await ctx.service.orderInfo.update(order.id, { status: ORDER_STATUS.PAY, statusDesc: '已付款', paymentTime: new Date(), updateTime: new Date() });
      //查询并更新订单明细
      const orderDetails = await ctx.service.orderDetail.findByOrderNo(orderNo);
      orderDetails.forEach(async (orderDetail) => {
        await ctx.service.orderDetail.update(orderDetail.id, { status: ORDER_STATUS.PAY, statusDesc: '已付款', updateTime: new Date() });
      })
      //查询并更新订单记录
      const orderStatusRecords = await ctx.service.orderStatusRecord.findByOrderNo(orderNo);
      orderStatusRecords.forEach(async (orderStatusRecord) => {
        await ctx.service.orderStatusRecord.update(orderStatusRecord.id, { status: ORDER_STATUS.PAY, statusDesc: '已付款' });
      })
      ctx.body = successResponse('支付成功')
    } catch (error) {
      ctx.body = errorResponse(error.message);
    }
  }

  //取消
  async cancel() {
    const ctx = this.ctx
    try {
      const userId = ctx.user.id
      const orderNo = ctx.params.orderNo;
      //查询订单是否存在
      const order = await ctx.service.orderInfo.findByOrderNoAndUserId(orderNo, userId);
      if (!order) {
        return ctx.body = errorResponse('订单不存在')
      }
      if (order.userId != userId) {
        return ctx.body = errorResponse('订单不属于当前用户')
      }
      //校验订单状态
      if (order.status != ORDER_STATUS.UN_PAY) {
        return ctx.body = errorResponse('当前订单状态不能取消')
      }
      await ctx.service.orderInfo.update(order.id, { status: ORDER_STATUS.CANCEL, statusDesc: '已取消', cancelTime: new Date(), updateTime: new Date() });
      const orderDetails = await ctx.service.orderDetail.findByOrderNo(orderNo);
      orderDetails.forEach(async (orderDetail) => {
        await ctx.service.orderDetail.update(orderDetail.id, { status: ORDER_STATUS.CANCEL, statusDesc: '已取消' });
      })
      const orderStatusRecords = await ctx.service.orderStatusRecord.findByOrderNo(orderNo);
      orderStatusRecords.forEach(async (orderStatusRecord) => {
        await ctx.service.orderStatusRecord.update(orderStatusRecord.id, { status: ORDER_STATUS.CANCEL, statusDesc: '已取消' });
      })
      ctx.body = successResponse('取消成功')
    } catch (error) {
      console.log(error)
      ctx.body = errorResponse(error.message)
    }

  }
}

module.exports = OrderInfoController;
