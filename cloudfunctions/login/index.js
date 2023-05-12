// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');// npm install  request-promise
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  var code = event.code;
  const wxContext = cloud.getWXContext();
   var options = {
    url:encodeURI("https://api.weixin.qq.com/sns/jscode2session?appid=wx3b3753cf66d9fa23&secret=1fd26b8025fb7bdb8c6fd0ba821f7617&js_code=" + code + "&grant_type=authorization_code"),
    method:'GET'
  }
  return await rp(options)
    .then(function (res) {
      return res
    })
    .catch(function (err) {
      return '失败'
    });
}