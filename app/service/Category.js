'use strict';

const { DELETE_FLAG } = require('../extend/constant');

const Service = require('egg').Service;

class Category extends Service {


  /**
   * 异步获取类别列表
   * 
   * 此方法用于获取数据库中所有类别的列表，并按照类别ID降序排列
   * 使用了Egg.js框架的ctx.model.Category.findAll方法来查询数据库
   * 
   * @returns {Promise<Array>} 返回一个包含所有类别的数组
   */
  async list() {
    return this.ctx.model.Category.findAll({
      order: [['id', 'desc']],
    })
  }

  /**
   * 根据类别ID异步查找类别
   * 此函数使用categoryId作为过滤条件，从数据库中查找对应类别
   * 它还通过设置deleteFlag为NO来确保只查找未删除的记录
   * 
   * @param {number} categoryId - 要查找的类别ID
   * @returns {Promise<Category|null>} - 返回找到的类别实例或null
   */
  async findByCategoryId(categoryId) {
    return this.ctx.model.Category.findOne({ where: { categoryId: categoryId, deleteFlag: DELETE_FLAG.NO } })
  }

}

module.exports = Category;
