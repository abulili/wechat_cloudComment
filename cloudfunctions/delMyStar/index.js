// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  var cnt = event.cnt;
  if(cnt == undefined || cnt === "") {
    return await db.collection('userlist')
    .doc("d9c7841e644b13560001959123456f5c")
    .update({
      data: {
        userStar: _.pop()
      }
    })
  }
  else {
    return await  db.collection('userlist')
    .doc('d9c7841e644b13560001959123456f5c')
    .update({
        data: {
          userStar: _.pull(cnt)
        }
      })
  }
}