// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  var _id = event._id;
  return await  db.collection('messageMain')
    .doc('0a933c0c6456fd0000005a7b63e48fe5')
    .remove()
}