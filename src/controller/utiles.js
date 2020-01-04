/**
 * @description utiles controller api
 * @author 王子豪
 */
const {SucessModel,ErrorModel} = require('../model/resModel')
const {uploadSizeInfo} = require('../model/errorInfo')
const fse = require('fs-extra')
const path = require('path')
//上传图片业务处理
const MAX_SIZE = 1024*1024*1024//文件最大体积
const UPLOAD_FILES  = path.join(__dirname,'..','..','uploadfiles')//存储目录
//判断文件缓存目录是否存在
fse.pathExists(UPLOAD_FILES).then(exist=>{
    if(!exist){
        fse.ensureDir(UPLOAD_FILES)
    }
})  
/**
 * 
 * @param {string} name 文件名称 
 * @param {number} size 文件大小 
 * @param {string} type 文件类型 
 * @param {string} filePath 文件缓存目录 
 */
async function uploadFile({name,size,type,filePath}){
    if(size>MAX_SIZE){
        await fse.remove(filePath)//把图片从缓存目录删除
        return new ErrorModel(uploadSizeInfo)
    } 
    //移动文件
    const fileName = Date.now()+'.'+name
    const fileUploadPath = path.join(UPLOAD_FILES,fileName)
    await fse.move(filePath,fileUploadPath)

    return new SucessModel({url:'/'+fileName})
}

module.exports={
    uploadFile
}
