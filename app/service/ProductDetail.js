'use strict';

const Service = require('egg').Service;

class ProductDetail extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.ProductDetail.findAndCountAll({
      offset,
      limit,
      order: [['id', 'desc']],
    });
  }

  /**
   * 根据订单号查找产品详情
   * 
   * 此函数使用订单号作为查询条件，从数据库中查找对应的产品详情记录
   * 它仅返回未删除的记录（deleteFlag标记为NO）
   * 
   * @param {string} orderNo 订单号，用作查询条件
   * @returns {Promise<Array<Object>>} 返回一个Promise，解析为产品详情的数组
   */
  async findByOrderNo(orderNo) {
    return await this.ctx.model.ProductDetail.findAll({
      where: {
        orderNo: orderNo,
        deleteFlag: DELETE_FLAG.NO
      }
    })
  }

  async find(id) {
    const productDetail = await this.ctx.model.ProductDetail.findByPk(id);
    if (!productDetail) {
      this.ctx.throw(404, 'productDetail not found');
    }
    return productDetail;
  }

  async create(productDetail) {
    return this.ctx.model.ProductDetail.create(productDetail);
  }

  async update({ id, updates }) {
    return this.ctx.model.ProductDetail.update(updates, {
      where: {
        id: id,
      }
    });
  }

  
}

module.exports = ProductDetail;
