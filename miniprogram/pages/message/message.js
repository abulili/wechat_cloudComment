// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: '暂无',
    contentList: [],
    messageList: []
  },
  clickRow(res) {
    var contentid = res.currentTarget.dataset.contentid;
    // console.log(contentid)
    wx.navigateTo({
      url: '../content/content?contentId=' + contentid + '&authorID=' + "0d87e4aa644b174e000229f72192d010"
    })
  },
  del(res) {
    var _id = res.currentTarget.dataset;
    wx.cloud.callFunction({
      name: "updateMessageRead",
      data: {
        id: _id
      }
    })
  },
  btn() {
    wx.cloud.callFunction({
      name: "getWxContent"
    })
    .then(res=> {
      console.log(res);
    })
  },
  getData() {
    // 到时候再统一下发消息，还不会，再说，先用数据库
    //遍历已有的帖子看回复为true的

    // 先看他发了哪些帖子得到contentid
    wx.cloud.callFunction({
      name: "getMessageMain",
      data: {
        contentId: "",
        authorID: "0d87e4aa644b174e000229f72192d010"
      }
    })
    .then(res=>{
      var oldData = this.data.contentList;
      var newData = oldData.concat(res.result.data);
      this.setData({
        contentList: newData
      })
    })
    .then(res=> {
      // 遍历得到帖子的id
      this.loadMyMessage()
    })
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
    this.getData()
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
    console.log(this.data.messageList)
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