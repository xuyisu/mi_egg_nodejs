const crypto = require('crypto');

/**
 * 对输入字符串进行 MD5 加密
 * @param {string} input - 要加密的字符串
 * @returns {string} - 加密后的 MD5 哈希值（十六进制表示）
 */
function md5Encrypt(input) {
    return crypto.createHash('md5').update(input).digest('hex');
}

module.exports = {
    md5Encrypt
};