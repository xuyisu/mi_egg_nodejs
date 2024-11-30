'use strict';

const { DELETE_FLAG } = require('../extend/constant');

const Service = require('egg').Service;

class OrderDetail extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.OrderDetail.findAndCountAll({
      offset,
      limit,
      order: [['id', 'desc']],
    });
  }

  async find(id) {
    const orderDetail = await this.ctx.model.OrderDetail.findByPk(id);
    if (!orderDetail) {
      this.ctx.throw(404, 'orderDetail not found');
    }
    return orderDetail;
  }

  async findByOrderNo(orderNo) {
    return await this.ctx.model.OrderDetail.findAll({ where: { orderNo: orderNo, deleteFlag: DELETE_FLAG.NO }});
  }

  async create(orderDetail) {
    return this.ctx.model.OrderDetail.create(orderDetail);
  }

  async update({ id, updates }) {
    return this.ctx.model.OrderDetail.update(updates, {
      where: {
        id: id,
      }
    });
  }

  
}

module.exports = OrderDetail;
