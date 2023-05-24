// pages/add/add.js
const gets = require('../gets');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    openid: ''
  },
  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },
  submit(e) {
    let content = this.data.inputVal;
    // wx.cloud.callFunction({
    //   name: "addMessageMain",
    //   data: {
    //     authorID: this.data.authorID,
    //     authorName:this.data.authorName,
    //     content:content
    //   }
  // })
    let Promise1 = new Promise((resolve,reject)=>{
      resolve(gets.addMessageMain(this.data.authorID,this.data.authorName,content))
    })
    Promise1
    .then(res=>{
      wx.navigateBack({
        delta: 1
      })
    })
  },
  bindTextAreaBlur(e) {
    this.setData({
      inputVal:e.detail.value
    }) 
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
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
      // wx.cloud.callFunction({
      //   name: 'getUser',
      //   data: {
      //     userId: '',
      //     openid: this.data.openid
      //   }
      // })
      this.setData({
        openid: app.openid,
        authorID: app.userId,
        authorName:app.userName
      })
      if(app.userId == "") {
        wx.switchTab({
          url: '../self/self',
        })
      }
      // let Promise1 = new Promise((resolve,reject)=>{
      //   resolve(gets.getUser('',this.data.openid))
      // })
      // Promise1
      // .then(res=>{
      //   this.setData({
      //     authorID: res.result.data[0]._id,
      //     authorName:res.result.data[0].userName
      //   })
      // })
    // })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})