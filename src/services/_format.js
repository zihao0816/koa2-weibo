/**
 * @description 默认用户头像picture
 * @author 王子豪
 */

function _formatUserPicture(obj){
    if(obj.picture==null){
        obj.picture = 'https://dwz.cn/rnTnftZs'
    }
    return obj
}
/**
 * 
 * @param {Array|Object} list  
 */
function formatUser(list){
    if(list==null){
        return list
    }
    if(list instanceof Array){
        return list.map(_formatUserPicture)
    }

    //单个对象
    return _formatUserPicture(list)
}

module.exports = formatUser
