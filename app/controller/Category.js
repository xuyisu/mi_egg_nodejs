'use strict';

const { successResponse, errorResponse } = require('../utils/response');
const formatDate = require('../utils/formatDate'); // 根据你的文件结构调整路径

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async getCategorys() {
    const ctx = this.ctx;
    try {
      const categorys = await ctx.service.category.list();
      categorys.forEach(category => {
        category.dataValues.createTime = formatDate(category.createTime);
        category.dataValues.updateTime = formatDate(category.updateTime);
      })
      ctx.body = successResponse(categorys);
    } catch (err) {
      ctx.body = errorResponse(err.message);
    }
  }

}

module.exports = CategoryController;
