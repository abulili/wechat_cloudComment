// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  //对数组进行添加 没有解决重复字段
  var contentId = event.contentId;
  return await db.collection("userlist")
  .where({
    _id: _.eq("d9c7841e644b13560001959123456f5c")
  })
  .update({
    data: {
      userStar: _.push("2cc84e26644b254d0a75f8890cf4e366")
    }
  })
}