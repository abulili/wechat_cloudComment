// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  var userId = event.authorID;
  var openid = event.openid;
  if(userId == '' || userId == undefined)
  return await db.collection("userlist")
  .where({
    openid: _.eq(openid)
  })
  .get()
  else 
    return await db.collection("userlist")
    .doc(userId)
    .get()
}