Page({
  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    dataList: [],
    searchC: '',
    searchList: []
  },
  onSearch(event) {
    this.setData({
      searchC: event.detail
    })
    
    wx.navigateTo({
      url: '../serachIndex/serachIndex?searchC=' + this.data.searchC
    }) 
  },
  getData(num = 5, page = 0) {
    wx.cloud.callFunction({
      name: "getMessageMain",
      data: {
        contentId: "",
        authorID: ""
      }
    })
    .then(res=>{
      // console.log(res.result.data)
      var oldData = this.data.dataList;
      var newData = oldData.concat(res.result.data);
      this.setData({
        dataList: newData
      })
    })
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  clickRow(res) {
    var {authorid, id} = res.currentTarget.dataset;
    wx.navigateTo({
      url: '../content/content?contentId=' + id + '&authorID=' + authorid
    })
  },
  clickRelease() {
    wx.navigateTo({
      url: '../add/add'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})