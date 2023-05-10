// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  var id = event.id;
  return await db.collection("messagePart")
  .where({
    _id: _.eq("0122a587644b15460a6ddef33bb5a0e7")
  })
  .update({
    data: {
      readed: true
    }
  })
}