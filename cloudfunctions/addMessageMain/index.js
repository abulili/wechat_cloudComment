// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  var {authorID, authorName, content} = event;
  return await db.collection("messageMain").add({
    data: {
      authorID:authorID,
      authorName:authorName,
      content:content,
      starNum:0,
      time:new Date(),
      title:""
    }
  })
}