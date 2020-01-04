/**
 * @description utiles api
 * @author 王子豪
 */

const router = require('koa-router')()
const {loginCheck}= require('../../middlewares/routeCkeck')
const koaForm = require('formidable-upload-koa')
const {uploadFile} = require('../../controller/utiles')
router.prefix('/api/utils')


//上传图片
router.post('/upload',loginCheck,koaForm(),async(ctx,next)=>{
    const file = ctx.req.files['file']
    const {name,path,size,type} = file
    ctx.body = await uploadFile({name,filePath:path,size,type})

})
module.exports = router
