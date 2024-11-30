'use strict';

const { DELETE_FLAG } = require('../extend/constant');

const Service = require('egg').Service;

// 分页查询购物车列表
class Cart extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Cart.findAndCountAll({
      offset,
      limit,
      order: [['id', 'desc']],
    });
  }

  // 获取用户购物车列表
  async findByUserId(userId) {
    return await this.ctx.model.Cart.findAll({ where: { userId: userId, deleteFlag: DELETE_FLAG.NO } });
  }


  /**
   * 根据用户ID和选择状态异步查询购物车项
   * 此函数用于根据用户的ID和购物车项的选择状态来查询购物车中的所有符合条件的项
   * 它仅返回未被删除的项，通过设置deleteFlag为NO来确保这一点
   * 
   * @param {number} userId - 用户ID，用于筛选购物车项
   * @param {boolean} selected - 选择状态，用于筛选购物车项
   * @returns {Promise<Array<Object>>} 返回一个Promise，解析为一个包含购物车项的数组
   */
  async findByUserIdAndSelected(userId, selected) {
    return await this.ctx.model.Cart.findAll({ where: { userId: userId, selected: selected, deleteFlag: DELETE_FLAG.NO } });
  }

  // 根据用户id和商品id查询购物车信息
  async findByUserIdAndProductId(userId, productId) {
    return await this.ctx.model.Cart.findOne({ where: { userId: userId, productId: productId, deleteFlag: DELETE_FLAG.NO } });
  }

  // 根据用户统计购物车数量
  async countByUserId(userId) {
    return await this.ctx.model.Cart.count({ where: { userId: userId, deleteFlag: DELETE_FLAG.NO } });
  }

  // 根据主键查询购物车信息
  async find(id) {
    const cart = await this.ctx.model.Cart.findByPk(id);
    if (!cart) {
      this.ctx.throw(404, 'cart not found');
    }
    return cart;
  }

  // 创建购物车
  async save(cart) {
    //如果id 不为空更新，否则新增
    if (cart.id) {
      return this.ctx.model.Cart.update(cart, { where: { id: cart.id } });
    } else {
      return this.ctx.model.Cart.create(cart);
    }
  }

  async update(id, updates) {
    return this.ctx.model.Cart.update(updates, {
      where: {
        id: id,
      }
    });
  }


}

module.exports = Cart;
