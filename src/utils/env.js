
/**
 * @description 环境变量
 * @author 王子豪
*/

const env = process.env.NODE_ENV

module.exports = {
    isDev: env == 'dev',
    notDev: env != 'dev',
    isPro: env == 'production',
    notPro: env != 'production',
    isTest: env == 'jest',
    notTest: env != 'jest'
}