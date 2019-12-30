/**
 * @description 错误信息统一处理
 * @author 王子豪
 */
const isExistInfo ={errno:'1003',message:'该用户名未注册'}
const registerInfo = {errno:'1002',message:'注册失败'}
const registerSuccess = {errno:'1004',message:'用户名已存在'}
const jsonScrema = {errno:'1009',message:'字段校验出现错误'}

module.exports={
    isExistInfo,
    registerInfo,
    registerSuccess,
    jsonScrema
}