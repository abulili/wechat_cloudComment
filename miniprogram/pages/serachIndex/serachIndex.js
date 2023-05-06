// pages/serachIndex/serachIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchC: '',
    searchList:[]
  },
  getData() {
    //到时候添一个loading
    // 要搜索内容、作者、标题来得到结果 + 模糊查询
    wx.cloud.callFunction({
      name:"getSearchIndex",
      data: {
        content: this.data.searchC
      }
    })
    .then(res=>{
      var oldData = this.data.searchList;
      var newData = oldData.concat(res.result.data);
      this.setData({
        searchList: newData
      })
    })
  },
  clickRow(res) {
    var {authorid, id} = res.currentTarget.dataset;
    wx.navigateTo({
      url: '../content/content?contentId=' + id + '&authorID=' + authorid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      searchC: options.searchC
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