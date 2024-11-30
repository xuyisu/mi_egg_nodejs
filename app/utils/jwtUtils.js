// jwtUtils.js
const jwt = require('jsonwebtoken');
const secretKey = 'bunubvubdbvdiubifbd787347293'; // 请使用更安全的密钥

/**
 * 生成 JWT
 * @param {Object} payload - JWT 的负载数据
 * @param {number} expiresIn - JWT 的过期时间（秒）
 * @returns {string} - 生成的 JWT
 */
function generateToken(payload, expiresIn = 3600*24) {
    return jwt.sign(payload, secretKey, { expiresIn: `${expiresIn}s` });
}

/**
 * 验证 JWT
 * @param {string} token - 要验证的 JWT
 * @returns {Object|null} - 解码后的负载数据或 null（如果验证失败）
 */
function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};