/**
 * @description 封装MD5加密
 * @author 王子豪
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../config/sectetKey')

function md5(str){
    const md5 = crypto.createHash('md5')
    return md5.update(str).digest('hex')//hex代表16进制
}

function doMd5(val){
    const pwd = `password=${val}&key=${CRYPTO_SECRET_KEY}`
    return md5(pwd)
}

module.exports = doMd5