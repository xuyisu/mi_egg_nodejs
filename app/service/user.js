'use strict';

const { DELETE_FLAG, PRODUCT_STATUS } = require('../extend/constant');

const Service = require('egg').Service;

class User extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.User.findAndCountAll({
      offset,
      limit,
      order: [['id', 'desc']],
    });
  }

  async find(id) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  /**
   * 根据用户名查询用户且确保用户处于启用状态
   * 此函数用于在数据库中查找指定用户名的用户，并确保该用户未被删除且状态为启用
   * 使用异步方式执行数据库查询操作
   * 
   * @param {string} userName - 需要查询的用户名
   * @returns {Promise<User|null>} 返回一个Promise，解析为User实例或null
   * 如果找到匹配的用户且用户未被删除并处于启用状态，则返回User实例，否则返回null
   */
  async findByUserNameAndEnable(userName) {
    return await this.ctx.model.User.findOne({ where: { userName: userName, deleteFlag: DELETE_FLAG.NO, status: PRODUCT_STATUS.ENABLE } })
  }

  async create(user) {
    return this.ctx.model.User.create(user);
  }

  async update({ id, updates }) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }


}

module.exports = User;
