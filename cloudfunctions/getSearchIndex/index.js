// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  var content = event.content;
  return db.collection("messageMain").where(_.or([
    {
      'authorName': db.RegExp({
        regexp:'.*' + content + '.*',
        options:'i'
      })
    },
    {
      'content': db.RegExp({
        regexp:'.*' + content + '.*',
        options:'i'
      })
    },
    {
      'title': db.RegExp({
        regexp:'.*' + content + '.*',
        options:'i'
      })
    }
  ]))
}