'use strict';

const { PRODUCT_STATUS, DELETE_FLAG } = require('../extend/constant');

const Service = require('egg').Service;

class Product extends Service {
  async list({ currrent = 1, size = 10, categoryId }) {
    return this.ctx.model.Product.findAll({
      where: {
        categoryId: categoryId,
        deleteFlag: DELETE_FLAG.NO
      },
      limit: parseInt(size),
      offset: (parseInt(currrent) - 1) * parseInt(size),
      order: [['id', 'desc']],
    });
  }

  async findAndCountAll({current = 0, size = 10 ,categoryId}) {
    return this.ctx.model.Product.findAndCountAll({
      where: {
        categoryId: categoryId,
        deleteFlag: DELETE_FLAG.NO
      },
      current,
      size,
      order: [['id', 'desc']],
    });
  }


  async find(id) {
    const product = await this.ctx.model.Product.findByPk(id);
    if (!product) {
      this.ctx.throw(404, 'product not found');
    }
    return product;
  }


  // 根据商品id查询启用未删除的商品
  async findEnaleByProductId(productId) {
    return await this.ctx.model.Product.findOne({ where: { productId: productId, status: PRODUCT_STATUS.ENABLE, deleteFlag: DELETE_FLAG.NO } });
  }

  /**
   * 根据产品ID查找产品
   * 
   * 此方法用于通过产品ID来查找数据库中状态为启用且未被删除的产品
   * 它利用了数据库查询的异步特性，确保在查找操作完成后再继续执行后续代码
   * 
   * @param {string} productId - 用于查找的产品ID
   * @returns {Promise} 返回一个Promise对象，解析为找到的产品实例或null
   */
  async findByProductId(productId) {
    return await this.ctx.model.Product.findOne({ where: { productId: productId, deleteFlag: DELETE_FLAG.NO } });
  }

  async create(product) {
    return this.ctx.model.Product.create(product);
  }

  async update({ id, updates }) {
    return this.ctx.model.Product.update(updates, {
      where: {
        id: id,
      }
    });
  }


}

module.exports = Product;
