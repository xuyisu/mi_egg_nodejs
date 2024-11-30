'use strict';

const { PRODUCT_STATUS, DELETE_FLAG } = require('../extend/constant');
const { generateToken } = require('../utils/jwtUtils');
const { md5Encrypt } = require('../utils/md5');
const { errorResponse, successResponse } = require('../utils/response');
const Controller = require('egg').Controller;

class UserController extends Controller {
  // 注册
  async register() {
    const ctx = this.ctx
    const newUser = ctx.request.body;
    try {
      newUser.status = PRODUCT_STATUS.ENABLE
      await ctx.service.user.create(newUser);
      ctx.body = successResponse(newUser);
    } catch (err) {
      ctx.body = errorResponse(err.message);
    }
  };

  // 登录
  async login() {
    const ctx = this.ctx
    try {
      //获取用户名密码
      const { userName, password } = ctx.request.body
      const user = await ctx.service.user.findByUserNameAndEnable(userName)
      if (!user) {
        return ctx.body = errorResponse('用不存在')
      }

      if (user.password !== md5Encrypt(password)) {
        return ctx.body = errorResponse('密码错误')
      }
      //生成jwt信息
      const userResp = {
        id: user.id,
        userName: user.userName,
        email: user.email,
        phone: user.phone
      }
      const token = generateToken(userResp)
      userResp.token = token;
      ctx.body = successResponse(userResp)
    } catch (err) {
      ctx.body = errorResponse(err.message)
    }
  };

  // 获取用户信息
  async getUser() {
    const ctx = this.ctx
    try {
      ctx.body = successResponse(ctx.user)
    } catch (err) {
      ctx.body = errorResponse(err.message)
    }
  };

  // 退出登录
  async logout() {
    const ctx = this.ctx
    try {
      console.log('logout 请求');
      ctx.body = successResponse();
    } catch (err) {
      ctx.body = errorResponse(err.message);
    }
  }
}

module.exports = UserController;
