// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  var contentId = event.contentId;
  var userId =  event.userId;
  var content = event.content;
  return await db.collection("messagePart")
  .add({
    data: {
      content: content,
      contentId: contentId,
      time: new Date(),
      userId: userId,
      readed: false
    }
  })

}