/**
 * @description blog数据校验格式
 * @author 王子豪
 */
const validate = require('./_validate')
// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {
            type: 'string',
            maxLength: 255
        },
    }
}

//执行校验

function blogValidate(data={}){
    return validate(SCHEMA,data)
}

module.exports =blogValidate