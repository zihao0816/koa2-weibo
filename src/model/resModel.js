/**
 * @description 设计返回数据格式
 * @author 王子豪
 */
class ResModel{
    constructor({errno,data,message}){
        this.errno = errno
        if(data){
            this.data = data
        }

        if(message){
            this.message = message
        }
    }
}

class SucessModel extends ResModel{
    constructor({ data={} }){
        super({
            errno:0,
            data
        })
    }
}

class ErrorModel extends ResModel{
    constructor({errno,message}){
        super({
            errno,
            message
        })
    }
}

module.exports = {
    SucessModel,
    ErrorModel
}