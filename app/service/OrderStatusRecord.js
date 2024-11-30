'use strict';

const Service = require('egg').Service;

class OrderStatusRecord extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.OrderStatusRecord.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const orderStatusRecord = await this.ctx.model.OrderStatusRecord.findByPk(id);
    if (!orderStatusRecord) {
      this.ctx.throw(404, 'orderStatusRecord not found');
    }
    return orderStatusRecord;
  }

  async findByOrderNo(orderNo) {
    return await this.ctx.model.OrderStatusRecord.findAll({where: { orderNo: orderNo }});
  }

  async create(orderStatusRecord) {
    return this.ctx.model.OrderStatusRecord.create(orderStatusRecord);
  }

  async update({ id, updates }) {
    return this.ctx.model.OrderStatusRecord.update(updates, {
      where: {
        id: id,
      }
    });
  }

  
}

module.exports = OrderStatusRecord;
