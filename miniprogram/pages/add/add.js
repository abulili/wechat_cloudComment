// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: ""
  },
  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },
  submit(e) {
    var content = this.data.inputVal;
    wx.cloud.callFunction({
      name: "addMessageMain",
      data: {
        authorID: "temp",
        authorName:"temp",
        content:content
      }
    }).then(res=>{
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