'use strict';

const { DELETE_FLAG } = require('../extend/constant');

const Service = require('egg').Service;

class OrderInfo extends Service {
  async findAndCountAll({ userId, current = 0, size = 10 }) {
    return this.ctx.model.OrderInfo.findAndCountAll({
      where: {
        userId: userId,
        deleteFlag: DELETE_FLAG.NO
      },
      current,
      size,
      order: [['id', 'desc']],
    });
  }

  async find(id) {
    const orderInfo = await this.ctx.model.OrderInfo.findByPk(id);
    if (!orderInfo) {
      this.ctx.throw(404, 'orderInfo not found');
    }
    return orderInfo;
  }

  /**
   * 根据订单号和用户ID异步查找用户
   * 
   * 此函数尝试通过订单号和用户ID在OrderInfo模型中查找未删除的用户订单信息
   * 如果找不到匹配的记录，则抛出404错误，提示用户未找到
   * 
   * @param {string} orderNo 订单号，用于查找特定的订单
   * @param {string} userId 用户ID，用于查找属于特定用户的订单
   * @returns {Promise} 返回一个Promise对象，包含找到的用户订单信息，如果没有找到则抛出错误
   */
  async findByOrderNoAndUserId(orderNo, userId) {
    // 使用订单号、用户ID和删除标志在OrderInfo模型中查找未删除的用户订单信息
    return await this.ctx.model.OrderInfo.findOne({
      where: {
        orderNo: orderNo,
        userId: userId,
        deleteFlag: DELETE_FLAG.NO
      }
    });
  }

  /**
   * 根据订单号异步查找订单信息
   * 此函数用于通过订单号在数据库中查询未删除的订单信息
   * 它利用了Sequelize的findOne方法来实现查询
   * 
   * @param {string} orderNo 订单号，用于查询特定的订单信息
   * @returns {Promise<OrderInfo|null>} 返回一个Promise，解析为OrderInfo实例或null
   * 如果找到匹配的订单信息且未被删除，则返回OrderInfo实例，否则返回null
   */
  async findByOrderNo(orderNo) {
    return await this.ctx.model.OrderInfo.findOne({
      where: {
        orderNo: orderNo,
        deleteFlag: DELETE_FLAG.NO
      }
    });
  }

  async create(order) {
    return this.ctx.model.OrderInfo.create(order);
  }

  async update({ id, updates }) {
    return this.ctx.model.OrderInfo.update(updates, {
      where: {
        id: id,
      }
    });
  }

  
}

module.exports = OrderInfo;
