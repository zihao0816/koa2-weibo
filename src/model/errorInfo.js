/**
 * @description 错误信息统一处理
 * @author 王子豪
 */
const isExistInfo ={errno:'1003',message:'该用户名未注册'}
const registerInfo = {errno:'1002',message:'注册失败'}
const registerSuccess = {errno:'1004',message:'用户名已存在'}
const jsonScrema = {errno:'1009',message:'字段校验出现错误'}
const loginErrorInfo =  {errno:'1001',message:'用户名或密码错误'}
const isloginInfo =  {errno:'1005',message:'您尚未登录'}
const delUserInfo = {errno:'1006',message:'删除用户失败'}
const uploadSizeInfo={errno:'1007',message:'文件体积超过1m'}
const changeUserInfo ={errno:'1008',message:'修改用户基本信息失败'}

module.exports={
    isExistInfo,
    registerInfo,
    registerSuccess,
    jsonScrema,
    loginErrorInfo,
    isloginInfo,
    delUserInfo,
    uploadSizeInfo,
    changeUserInfo

}