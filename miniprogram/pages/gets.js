function getUser(authorID,openid) {
  return wx.cloud.callFunction({
    name: 'getUser',
    data: {
      authorID: authorID,
      openid: openid
    }
  })
}
function getSearchIndex(searchC) {
  return wx.cloud.callFunction({
    name:"getSearchIndex",
    data: {
      content: searchC
    }
  })
}
function getMessageMain(userId,index,contentId){
  let content = contentId;
  if(content == undefined) content = "";
  return wx.cloud.callFunction({
    name: "getMessageMain",
    data: {
      contentId: content,
      authorID: userId,
      index: index
    }
  })
}
function delMessageMain(_id){
  return wx.cloud.callFunction({
    name: "delMessageMain",
    data: {
      _id: _id
    }
  })
}
function updateMessageRead(_id) {
  return wx.cloud.callFunction({
    name: "updateMessageRead",
    data: {
      id: _id
    }
  })
}
function getMyStar(openid) {
  return wx.cloud.callFunction({
    name: "getMyStar",
    data: {
      openid: openid
    }
  })
}
function delMyStar(cnt,contentId,userID){
  return wx.cloud.callFunction({
    name: "delMyStar",
    data: {
      cnt: cnt,
      contentId: contentId,
      userID: userID
    }
  })
}
function getMessagePart(contentId) {
  return wx.cloud.callFunction({
    name: "getMessagePart",
    data: {
      contentId: contentId
    }
  })
}
function addMessagePart(userId,contentId,content,userName) {
  return wx.cloud.callFunction({
    name: "addMessagePart",
    data: {
      userId:userId,
      contentId:contentId,
      content: content,
      userName: userName
    }
  })
}
function addMyStar(userID,contentId) {
  return wx.cloud.callFunction({
    name: "addMyStar",
    data: {
      userID: userID,
      contentId: contentId
    }
  })
}
function delMyJob(contentId,userID){
  return wx.cloud.callFunction({
    name: "delMyJob",
    data: {
      contentId: contentId,
      userID: userID
    }
  })
}
function addMyJob(contentId,userID) {
  return wx.cloud.callFunction({
    name: "addMyJob",
    data: {
      contentId: contentId,
      userID: userID
    }
  })
}
function addMessageMain(authorID,authorName,content) {
  return wx.cloud.callFunction({
      name: "addMessageMain",
      data: {
        authorID: authorID,
        authorName:authorName,
        content:content
      }
  })
}
function updateUser(username,userId) {
  return wx.cloud.callFunction({
    name: 'updateUser',
    data: {
      userName: username,
      userId: userId
    }
  })
}
module.exports.getUser = getUser;
module.exports.getSearchIndex = getSearchIndex;
module.exports.getMessageMain = getMessageMain;
module.exports.delMessageMain = delMessageMain;
module.exports.updateMessageRead = updateMessageRead;
module.exports.getMyStar = getMyStar;
module.exports.delMyStar = delMyStar;
module.exports.getMessagePart = getMessagePart;
module.exports.addMessagePart = addMessagePart;
module.exports.addMyStar = addMyStar;
module.exports.delMyJob = delMyJob;
module.exports.addMyJob = addMyJob;
module.exports.addMessageMain = addMessageMain;
module.exports.updateUser = updateUser;