// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  //对数组进行添加 没有解决重复字段
  var contentId = event.contentId;
  var _id = event.userID;
  return await db.collection("userlist")
  .where({
    _id: _.eq(_id)
  })
  .update({
    data: {
      // 咋感觉没用，是又延迟了吗
      goodJob: _.addToSet(contentId)
    }
  })
}