// pages/myHistory/myHistory.js
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
    wx.cloud.callFunction({
      name: "getWxContent"
    })
    .then(res=> {
      console.log(res);
      this.setData({
        openid:res.result.openid
      })
    })
    .then(res=>{
      wx.cloud.callFunction({
        name: "getMyStar",
        data: {
          openid: this.data.openid
        }
      })
      .then(res=>{
        console.log(res);
        var oldData = this.data.starList;
        var newData = oldData.concat(res.result.data[0].userStar);
        this.setData({
          starList: newData
        })
        console.log(this.data.starList)
      })
      .then(res=> {
        this.loadMyStar();
      })
    })
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
    if(this.data.openid == undefined) 
    wx.switchTab({
      url: '../self/self'
    })
    else
    this.getdata();
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
    var cnt = res.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name: "delMyStar",
      data: {
        cnt: cnt
      }
    })
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