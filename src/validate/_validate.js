/**
 * @description 初始化校验工具ajv
 * @author 王子豪
 */
const Ajv  = require('ajv')
const ajv = new Ajv({
    // allowErrors:true//校验所有错误(比较慢)
})
/**
 * 
 * @param {Object} schema json schema 校验规则
 * @param {Object} data 待校验数据
 */
function validate (schema,data={}){
    const valid = ajv.validate(schema,data)

    if(!valid){
        return ajv.errors[0]
    }
}


module.exports = validate



