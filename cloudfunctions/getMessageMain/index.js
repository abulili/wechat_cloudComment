// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  var contentId = event.contentId;
  var authorID = event.authorID;
  if(contentId == "" && authorID == "") {
    return await db.collection("messageMain").get()
  }
  else if(authorID == "")
    return await db.collection("messageMain")
    .doc(contentId)
    .get()
  return await db.collection("messageMain")
  .where({
    authorID:authorID
  })
  .get()
}