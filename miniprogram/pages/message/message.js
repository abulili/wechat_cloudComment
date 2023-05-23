// pages/message/message.js
const gets = require('../gets');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    notice: '暂无',
    contentList: [],
    messageList: [],
    openid:'',
    authorID: ''
  },
  clickRow(res) {
    let contentid = res.currentTarget.dataset.contentid;
    // console.log(contentid)
    wx.navigateTo({
      url: '../content/content?contentId=' + contentid + '&authorID=' + this.data.authorID
    })
  },
  del(res) {
    let _id = res.currentTarget.dataset.id;
    let Promise1 = new Promise((resolve,reject)=>{
      resolve(gets.updateMessageRead(_id))
    })
    Promise1.then(res=>{
      wx.showToast({
        title: '已读',
        icon: 'success',
        duration: 1500
      })
    })
  },
  getData() {
    // 到时候再统一下发消息，还不会，再说，先用数据库
    //遍历已有的帖子看回复为true的
    // console.log(this.data.openid)
    // wx.cloud.callFunction({
    //   name: 'getUser',
    //   data: {
    //     authorID: '',
    //     openid: this.data.openid
    //   }
    // })
    // let Promise1 = new Promise((resolve,reject)=>{
    //   resolve(gets.getUser('',this.data.openid))
    // })
    // Promise1
    // .then(res=>{
      this.setData({
        authorID: app.userId,
        openid: app.openid
      })
      console.log(this.data.authorID)
      if(this.data.authorID == "") {
        wx.switchTab({
          url: '../self/self'
        })
      }
    // })
    // .then(res=>{
      // 先看他发了哪些帖子得到contentid
      // wx.cloud.callFunction({
      //   name: "getMessageMain",
      //   data: {
      //     contentId: "",
      //     authorID: this.data.authorID
      //   }
      // })
      let Promise1 = new Promise((resolve,reject)=>{
        resolve(gets.getMessageMain(this.data.authorID,''))
      })
      Promise1 
      .then(res=>{
        console.log(this.data.authorID)
        let oldData = this.data.contentList;
        let newData = oldData.concat(res.result.data);
        this.setData({
          contentList: newData
        })
        console.log(newData);
      })
      .then(res=> {
        // 遍历得到帖子的id
        this.loadMyMessage()
      })
      .then(res=>{
        wx.hideLoading()
      })
    // })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 2
      })
    }
    // wx.cloud.callFunction({
    //   name: "getWxContent"
    // })
    // .then(res=> {
    //   console.log(res);
    //   this.setData({
    //     openid:res.result.openid
    //   })
    // })
    // .then(res=>{
      
      // console.log(app.openid);
      // 怎么这句判断没用，自动登录了好像
      if(app.openid == undefined)
      wx.switchTab({
        url: '/pages/self/self'
      })
      // else {
      //   this.getData()
      // }
    // })
  },
  async loadMyMessage() {
    for (const element of this.data.contentList) {
      console.log(element._id);
      const res = await wx.cloud.callFunction({
        name: "getMessagePart",
        data: {
          contentId: element._id,
          readed: "readed"
        }
      })
      this.data.messageList.push(res.result.data);
    }
    this.setData({
      messageList: this.data.messageList
    });
    console.log(this.data.messageList);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      contentList:[],
      messageList: []
    })
    wx.showLoading({
      title: '加载中',
    })
    this.getData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

})