// pages/myHistory/myHistory.js
var app = getApp();
const gets = require('../gets');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starList:[],
    contentList:[],
    openid: '',
    userId: ''
  },
  getdata() {
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
      wx.showLoading({
        title: '加载中',
      })
      if(app.userId == '') 
        wx.switchTab({
          url: '../self/self'
      })
      this.setData({
        openid: app.openid
      })
      let Promise1 = new Promise((resolve,reject)=>{
        resolve(gets.getMyStar(this.data.openid))
      })
      Promise1
      .then(res=>{
        console.log(res);
        let oldData = this.data.starList;
        let newData = oldData.concat(res.result.data[0].userStar);
        this.setData({
          starList: newData
        })
        console.log(this.data.starList)
      })
      .then(res=> {
        this.loadMyStar();
      })
      .then(res=>{
        wx.hideLoading();
      })
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad(options) {
    if(typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 1
      })
    }
  },
  async loadMyStar() {
    for (const element of this.data.starList) {
        console.log(element)
      const res = await wx.cloud.callFunction({
        name: "getMessageMain",
        data: {
          contentId: element,
          authorID: ""
        }
      });
      this.data.contentList.push(res.result.data);
    }
    this.setData({
      contentList: this.data.contentList
    });
  },
  del(res) {
    let cnt = res.currentTarget.dataset.id;
    let Promise1 = new Promise((resolve,reject)=>{
      resolve(gets.delMyStar(cnt))
    })
    Promise1
    .then(res=>{
      //对页面刷新
      this.setData({
        contentList: [],
        starList:[]
      })
      this.getdata()
    })
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
    this.getdata();
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