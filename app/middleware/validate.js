// middleware/validate.js
const Joi = require('joi');
const { errorResponse } = require('../utils/response');
// 创建一个通用的校验中间件函数
const validate = (schema) => {
  return async (ctx, next) => {
    const { error } = schema.validate(ctx.request.body);
    if (error) {
      // 如果有校验错误，返回400 Bad Request和错误信息
      return ctx.body = errorResponse(error.message);
    }
    // 如果没有错误，继续处理请求
    await next();
  };
};

// 为不同的API端点定义校验规则，并导出中间件
const registerSchema = Joi.object({
  userName: Joi.string().required().min(3).max(20).error(() => new Error('用户名不能为空')),
  email: Joi.string().required().email().max(255).error(() => new Error('邮箱不能为空,请注意格式')),
  phone: Joi.string().required().max(11).error(() => new Error('手机号不能为空,且最大长度为11位')),
  password: Joi.string().required().min(6).max(20).error(() => new Error('密码不能为空,且长度在6-20位之间')),
});

const loginSchema = Joi.object({
  userName: Joi.string().required().min(3).max(20).error(() => new Error('用户名不能为空')),
  password: Joi.string().required().min(6).max(20).error(() => new Error('密码不能为空,且长度在6-20位之间')),
});

const orderPaySchema = Joi.object({
  orderNo: Joi.string().required().error(() => new Error('订单号不能为空')),
});

const createUserAddressSchema = Joi.object({
  receivePhone: Joi.string().required().error(() => new Error('收货人电话不能为空')),
  province: Joi.string().required().error(() => new Error('省份不能为空')),
  provinceCode: Joi.string().required().error(() => new Error('省份编码不能为空')),
  city: Joi.string().required().error(() => new Error('城市不能为空')),
  cityCode: Joi.string().required().error(() => new Error('城市编码不能为空')),
  area: Joi.string().required().error(() => new Error('区域不能为空')),
  areaCode: Joi.string().required().error(() => new Error('区域编码不能为空')),
  street: Joi.string().required().error(() => new Error('详细地址不能为空')),
  defaultFlag: Joi.number().allow(0, 1).error(() => new Error('默认地址标识只能是0或1')),
  postalCode: Joi.string().allow(null),
  addressLabel: Joi.number().allow(null),
  receiveName: Joi.string().allow(null),
});

exports.validateRegister = validate(registerSchema);
exports.validateLogin = validate(loginSchema);
exports.validateOrderPay = validate(orderPaySchema);
exports.validateCreateUserAddress = validate(createUserAddressSchema);