'use strict';

const { DELETE_FLAG } = require('../extend/constant');
const formatDate = require('../utils/formatDate');
const { successResponse, errorResponse } = require('../utils/response');

const Controller = require('egg').Controller;

class UserAddressController extends Controller {
  async pages() {
    const { ctx } = this;
    try {
      const userId = ctx.user.id
      const { currrent = 1, size = 10 } = ctx.query;
      const userAddressList = await ctx.service.userAddress.findAndCountAll({ currrent, size, userId })
      const result = {
        current: parseInt(currrent),
        size: parseInt(size),
        pages: Math.ceil(userAddressList.count / parseInt(size)),
        total: userAddressList.count,
        records: userAddressList.rows.map(item => {
          const newItem = {
            ...item.dataValues,
            createTime: formatDate(item.dataValues.createTime),
            updateTime: formatDate(item.dataValues.updateTime),
            paymentTime: formatDate(item.dataValues.paymentTime)
          }
          return newItem
        })
      }
      ctx.body = successResponse(result);
    } catch (err) {
      ctx.body = errorResponse(err.message);
    }
  };

  // 新增
  async add() {
    const { ctx } = this
    try {
      const userId = ctx.user.id
      const newUserAddress = ctx.request.body
      newUserAddress.createUser = userId;
      newUserAddress.updateUser = userId;
      newUserAddress.addressId = Date.now()
      await ctx.service.userAddress.create(newUserAddress)
      ctx.body = successResponse(newUserAddress)
    } catch (err) {
      ctx.body = errorResponse(err.message)
    }
  };

  // 详情
  async detail() {
    const { ctx } = this;
    try {
      const addressId = ctx.params.addressId
      //根据地址id  查询地址信息
      const userAddress = await ctx.service.userAddress.findByAddressId(addressId)
      if (!userAddress) {
        return ctx.body = errorResponse('地址不存在')
      }
      userAddress.dataValues.createTime = formatDate(userAddress.createTime)
      userAddress.dataValues.updateTime = formatDate(userAddress.updateTime)
      ctx.body = successResponse(userAddress)
    } catch (err) {
      ctx.body = errorResponse(err.message)
    }
  };

  // 修改
  async updateUserById() {
    const { ctx } = this;
    try {
      const userId = ctx.user.id
      const addressId = ctx.params.addressId
      if (!addressId) {
        return ctx.body = errorResponse('地址id不能为空')
      }
      const userAddress = await ctx.service.userAddress.findByAddressId(addressId)
      if (!userAddress) {
        return ctx.body = errorResponse('地址不存在')
      }
      const userAddressNew = ctx.request.body
      userAddressNew.updateUser = userId
      userAddressNew.updateTime = new Date()
      await ctx.service.userAddress.update({ id: userAddress.id, updates: userAddressNew })
      ctx.body = successResponse()
    } catch (err) {
      ctx.body = errorResponse(err.message)
    }
  };

  // 删除
  async deleteUserById() {
    const { ctx } = this;
    try {
      const userId = ctx.user.id
      const addressId = ctx.params.addressId
      if (!addressId) {
        return ctx.body = errorResponse('地址id不能为空')
      }
      const userAddress = await ctx.service.userAddress.findByAddressId(addressId)
      if (!userAddress) {
        return ctx.body = errorResponse('地址不存在')
      }
      userAddress.deleteFlag = DELETE_FLAG.YES
      userAddress.updateUser = userId
      userAddress.updateTime = new Date()
      await ctx.service.userAddress.update({ id: userAddress.id, updates: userAddress })
      ctx.body = successResponse()
    } catch (err) {
      ctx.body = errorResponse(err.message)
    }
  }
}

module.exports = UserAddressController;
