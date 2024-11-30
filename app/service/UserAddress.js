'use strict';

const { DELETE_FLAG } = require('../extend/constant');

const Service = require('egg').Service;

class UserAddress extends Service {
  async list({ currrent = 1, size = 10, userId }) {
    return this.ctx.model.UserAddress.findAll({
      where: {
        createUser: userId,
        deleteFlag: DELETE_FLAG.NO
      },
      limit: parseInt(size),
      offset: (parseInt(currrent) - 1) * parseInt(size),
      order: [['id', 'desc']],
    });
  }

  async findAndCountAll({current = 0, size = 10 ,userId}) {
    return this.ctx.model.Product.findAndCountAll({
      where: {
        createUser: userId,
        deleteFlag: DELETE_FLAG.NO
      },
      current,
      size,
      order: [['id', 'desc']],
    });
  }


  async find(id) {
    const userAddress = await this.ctx.model.UserAddress.findByPk(id);
    if (!userAddress) {
      this.ctx.throw(404, 'userAddress not found');
    }
    return userAddress;
  }

  /**
   * 根据地址ID异步查找用户地址信息
   * 此函数用于通过地址ID来查询用户地址记录，同时确保查询的记录未被标记为删除
   * 
   * @param {number} addressId - 需要查找的地址ID
   * @returns {Promise<UserAddress|null>} - 返回找到的用户地址对象，如果没有找到则返回null
   */
  async findByAddressId(addressId) {
    return await this.ctx.model.UserAddress.findOne({ where: { addressId: addressId, deleteFlag: DELETE_FLAG.NO } })
  }

  async create(userAddress) {
    return this.ctx.model.UserAddress.create(userAddress);
  }

  async update({ id, updates }) {
    return this.ctx.model.UserAddress.update(updates, {
      where: {
        id: id,
      }
    });
  }


}

module.exports = UserAddress;
