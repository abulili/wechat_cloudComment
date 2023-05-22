// pages/self/self.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    avatarUrl: defaultAvatarUrl,
    loginStatus: '登录',
    username: '默认昵称',
    openid: '',
    userId: '',
    focus: false,
    admin: false
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  myHistory() {
    if(this.data.openid == undefined) 
    wx.switchTab({
      url: '../self/self'
    })
    else 
    wx.navigateTo({
      url: '../myHistory/myHistory?userId=' + this.data.userId + '&admin=' + this.data.admin
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
    if(typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 3
      })
    }
    var that = this;
    // 进行登录
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          that.setData({
            code: res.code
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  loginShow() {
  // 连数据库查
  wx.cloud.callFunction({
    name: 'getUser',
    data: {
      openid: this.data.openid
    }
  })
  .then(res=>{
    console.log(res.result.data);
    if(res.result.data == '') {
      wx.cloud.callFunction({
        name: 'addUser',
        data: {
          openid: this.data.openid
        }
      })
      .then(res=>{
        wx.cloud.callFunction({
          name: 'getUser',
          data: {
            openid: this.data.openid
          }
        })
        .then(res=>{
          this.setData({
            username:res.result.data[0].userName,
            userId: res.result.data[0]._id,
            admin: res.result.data[0].admin
          })
          console.log(res.result.data[0]._id)
        })
      })
    }
    else {
      this.setData({
        username:res.result.data[0].userName,
        userId: res.result.data[0]._id,
        admin: res.result.data[0].admin
      })
    }
  })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },
  updateName(event) {
    this.setData({
      username: event.detail.value
    })
    wx.cloud.callFunction({
      name: 'updateUser',
      data: {
        userName: this.data.username,
        userId: this.data.userId
      }
    })
  },
  btn(){
    // 暂时不需要UnionID
        var that = this;
        wx.cloud.callFunction({
          name:'login',
          data: {
            code: that.data.code
          },
          success:res=>{
            console.log(res);
            that.setData({
              loginStatus: '已登录',
              openid: res.result.openid
            })
            console.log(that.data.openid);
            // 连数据库查
            that.loginShow();
          }
        })
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

  }
})