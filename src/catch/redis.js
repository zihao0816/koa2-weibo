const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

//创建redis客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

//监听redis是否有错误
redisClient.on('error', err => {
    console.log('redis error', err)
})

/**
 * redis set
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间 单位s
*/

//设置set
function set(key, val, timeout = 60 * 60) {
    if (typeof val == 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)//存key和val
    redisClient.expire(key, timeout)//设置key的过期时间
}

/**
 * redis get
 * @param {string} key 键
*/
function get(key){
    let promise = new Promise((resolve,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err)
                return 
            }

            if(val==null){
                reject(null)
                return 
            }
            try{
                resolve(
                    JSON.parse(val)
                )
            }catch(e){
                resolve(val)
            }
        })
    })
    return promise
}


module.exports = {
    set,
    get 
}


