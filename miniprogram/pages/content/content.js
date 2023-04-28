// pages/content/content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    contentId: '',
    dataList: [],
    commentList: [],
    authorID: '',
    userList: [],
    partList: []
  },
  getData() {
    wx.cloud.callFunction({
      name: "getMessageMain",
      data: {
        contentId: this.data.contentId
      }
    })
    .then(res=>{
      var oldData = this.data.dataList;
      var newData = oldData.concat(res.result.data);
      this.setData({
        dataList: newData
      })
    })
    
    wx.cloud.callFunction({
      name: "getUser",
      data: {
        authorID: this.data.authorID
      }
    })
    .then(res=>{
      var oldData = this.data.userList;
      var newData = oldData.concat(res.result.data);
      this.setData({
        userList: newData
      })
    })

    // 到时候再来分页 + 联合查用户名
    wx.cloud.callFunction({
      name: "getMessagePart",
      data: {
        contentId: this.data.contentId
      }
    })
    .then(res=>{
      var oldData = this.data.commentList;
      var newData = oldData.concat(res.result.data);
      this.setData({
        commentList: newData
      })
    })
    // 来分part，也可以偷懒查看更多恢复，还是要查，或者联合...
    // 不会，先放放

  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      contentId: options.contentId,
      authorID: options.authorID
    })
    this.getData();
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