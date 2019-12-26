/**
 * @description 
 * @author 王子豪
*/

const request = require('supertest')
const app  = require('../src/app').callback()

module.exports = request(app)