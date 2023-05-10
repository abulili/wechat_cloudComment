// pages/myHistory/myHistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starList:[],
    contentList:[]
  },
  getdata() {
    wx.cloud.callFunction({
      name: "getMyStar",
      data: {
        _id: "2cc84e26644b13c40a748fae22cc8c02"
      }
    })
    .then(res=>{
      var oldData = this.data.starList;
      var newData = oldData.concat(res.result.data.userStar);
      this.setData({
        starList: newData
      })
    })
    .then(res=> {
      this.loadMyStar();
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad(options) {
    this.getdata();
  },
  async loadMyStar() {
    for (const element of this.data.starList) {
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
      console.log("?");
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