// pages/myHistory/myHistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentList:[],
    authorID: '',
    admin: false
  },
  getdata() {
    var index = '';
    if(this.data.admin === true) index = 'index';
    wx.cloud.callFunction({
      name: "getMessageMain",
      data: {
        contentId: "",
        authorID: this.data.authorID,
        index: index
      }
    })
    .then(res=>{
      var oldData = this.data.contentList;
      var newData = oldData.concat(res.result.data);
      this.setData({
        contentList: newData
      })
    })
  },
  clickRow(res) {
    var {authorid, id} = res.currentTarget.dataset;
    wx.navigateTo({
      url: '../content/content?contentId=' + id + '&authorID=' + authorid
    })
  },
  del(res) {
    // 这个没用户暂时测试不了，到时候写了登录再测试
    var _id = res.currentTarget.dataset.id;
    console.log(_id);
    wx.cloud.callFunction({
      name: "delMessageMain",
      data: {
        _id: _id
      }
    })
    .then(res=>{
      //对页面刷新
      this.setData({
        contentList:[]
      })
      this.getdata()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad(options) {
    this.setData({
      authorID: options.userId,
      admin: options.admin
    })
    this.getdata();
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