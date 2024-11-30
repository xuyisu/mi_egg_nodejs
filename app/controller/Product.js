'use strict';

const formatDate = require('../utils/formatDate');
const { successResponse, errorResponse } = require('../utils/response');

const Controller = require('egg').Controller;

class ProductController extends Controller {

  // 获取商品列表
  async getProducts() {
    const { ctx } = this;
    try {
      const { currrent = 1, size = 10, categoryId } = ctx.query;
      const products = await ctx.service.product.findAndCountAll({ currrent, size, categoryId });
      const result = {
        current: parseInt(currrent),
        size: parseInt(size),
        pages: Math.ceil(products.count / parseInt(size)),
        total: products.count,
        records: products.rows.map(item => {
          const newItem = {
            ...item.dataValues,
            createTime: formatDate(item.dataValues.createTime),
            updateTime: formatDate(item.dataValues.updateTime),
            paymentTime: formatDate(item.dataValues.paymentTime)
          }
          return newItem
        })
      }
      ctx.body = successResponse(result);
    } catch (err) {
      ctx.body = errorResponse(err.message);
    }
  }
  // 获取商品列表
  async detail() {
    const { ctx } = this;
    try {
      const productId = ctx.params.productId
      if (!productId) {
        return ctx.body = errorResponse('商品id不能为空');
      }
      const product = await ctx.service.product.findByProductId(productId)
      if (!product) {
        return ctx.body = errorResponse('商品不存在');
      }
      product.dataValues.createTime = formatDate(product.createTime);
      product.dataValues.updateTime = formatDate(product.updateTime);
      ctx.body = successResponse(product);
    } catch (err) {
      ctx.body = errorResponse(err.message);
    }
  }

}

module.exports = ProductController;
