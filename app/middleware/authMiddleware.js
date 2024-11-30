// authMiddleware.js
const { verifyToken } = require('../utils/jwtUtils');
const { errorToken } = require('../utils/response');

/**
 * JWT 验证中间件
 * @param {Request} ctx - koa 请求对象
 * @param {Function} next - koa 的 next 函数
 */
async function authMiddleware (ctx, next) {
    const token = ctx.headers.authorization;

    if (!token) {
        return ctx.body = errorToken('token 缺失,请重新登录');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return ctx.body = errorToken('token 过期,请重新登录');
    }

    // 将解码后的负载数据附加到请求对象上，以便在后续中间件或路由处理器中使用
    ctx.user = decoded;

    await next(); // 调用 next 函数以继续处理请求
}

module.exports = authMiddleware;