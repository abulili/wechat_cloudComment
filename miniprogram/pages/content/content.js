// pages/content/content.js
const gets = require('../gets');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked: false,
    starChecked: false,
    goodJobChecked: false,
    value: '',
    contentId: '',
    dataList: [],
    commentList: [],
    authorID: '',
    userID: '',
    jobList: [],
    starList: [],
    userList: [],
    partList: [],
    inputVal: '',
    openid: '',
    userName: ''
  },
  getData() {
    // 当前登录用户
    // wx.cloud.callFunction({
    //   name: "getWxContent"
    // })
    // .then(res=> {
    //   this.setData({
    //     openid:res.result.openid
    //   })
    // })
    // .then(res=>{
      // wx.cloud.callFunction({
      //   name: 'getUser',
      //   data: {
      //     authorID: '',
      //     openid: this.data.openid
      //   }
      // })
      this.setData({
        openid: app.openid
      })
      let Promise1 = new Promise((resolve,reject)=>{
        resolve(gets.getUser('',this.data.openid))
      })
      Promise1
      .then(res=>{
        this.setData({
          userID: res.result.data[0]._id,
          jobList: res.result.data[0].goodJob,
          starList: res.result.data[0].userStar,
          userName: res.result.data[0].userName
        })
        // console.log(res.result.data[0].goodJob);
        this.juedge();
      })
    // })
    // 当前的内容
    // wx.cloud.callFunction({
    //   name: "getMessageMain",
    //   data: {
    //     contentId: this.data.contentId,
    //     authorID: ""
    //   }
    // })
    let Promise2 = new Promise((resolve,reject)=>{
      resolve(gets.getMessageMain('','',this.data.contentId))
    })
    Promise2
    .then(res=>{
      let oldData = this.data.dataList;
      let newData = oldData.concat(res.result.data);
      this.setData({
        dataList: newData
      })
    })
    // wx.cloud.callFunction({
    //   name: "getUser",
    //   data: {
    //     authorID: this.data.authorID
    //   }
    // })
    let Promise3 = new Promise((resolve,reject)=>{
      resolve(gets.getUser(this.data.authorID,''))
    })
    Promise3
    .then(res=>{
      let oldData = this.data.userList;
      let newData = oldData.concat(res.result.data);
      this.setData({
        userList: newData
      })
    })

    // 到时候再来分页 + 联合查用户名
    // wx.cloud.callFunction({
    //   name: "getMessagePart",
    //   data: {
    //     contentId: this.data.contentId
    //   }
    // })
    let Promise4 = new Promise((resolve,reject)=>{
      resolve(gets.getMessagePart(this.data.contentId))
    })
    Promise4
    .then(res=>{
      let oldData = this.data.commentList;
      let newData = oldData.concat(res.result.data);
      this.setData({
        commentList: newData
      })
      // 又要查
      console.log(this.data.commentList);
    })
    .then(res=>{
      wx.hideLoading();
    })
    // 来分part，也可以偷懒查看更多恢复，还是要查，或者联合...
    //先弄一两条放在这里判断，点了更多回复再另一个数据库查询
    // 不会，先放放

  },
  bindText(e) {
    this.setData({
      inputVal:e.detail
    }) 
  },
  submit(e) {
    let content = this.data.inputVal;
    let contentId = this.data.contentId;
    let userId =  this.data.userID;
    let userName = this.data.userName;
    console.log(contentId + ' ' + userId + ' ' + userName);
    console.log(userId.length);
    if(userId.length == 0) {
      wx.switchTab({
        url: '../self/self'
      })
    }
    // wx.cloud.callFunction({
    //   name: "addMessagePart",
    //   data: {
    //     userId:userId,
    //     contentId:contentId,
    //     content: content,
    //     userName: userName
    //   }
    // })
    let Promise1 = new Promise((resolve,reject)=>{
      resolve(gets.getSearchIndex(this.data.searchC))
    })
    Promise1.then(res=>{
      console.log('y')
    })
    //刷新页面 告诉说成功了
    this.setData({
      inputVal: ''
    })
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      contentId: options.contentId,
      authorID: options.authorID
    })
    // console.log(this.data.authorID)
    this.getData();
    //在一开始的时候就去看他有没有收藏
  },
  starMessage() {
    if(this.data.userId == '' || this.data.userName == "") {
      wx.switchTab({
        url: '../self/self'
      })
    }
    if(this.data.starChecked === false) {
      this.setData({
        starChecked: true
       })
      // wx.cloud.callFunction({
      //   name: "addMyStar",
      //   data: {
      //     userID: this.data.userID,
      //     contentId: this.data.contentId
      //   }
      // })
      let Promise1 = new Promise((resolve,reject)=>{
        resolve(gets.addMyStar(this.data.userID,this.data.contentId))
      })
      Promise1;
    }
    else {
      //就把它删了 由于按序插入所以直接pop
      this.setData({
        starChecked: false
       })
      // wx.cloud.callFunction({
      //   name: "delMyStar",
      //   data: {
      //     contentId: this.data.contentId,
      //     userID: this.data.userID
      //   }
      // })
      let Promise1 = new Promise((resolve,reject)=>{
        resolve(gets.delMyStar("",this.data.contentId,this.data.userID))
      })
      Promise1;
    }
  },
  goodJob() {
    if(this.data.userId == '' || this.data.userName == '') {
      wx.switchTab({
        url: '../self/self'
      })
    }
    if(this.data.goodJobChecked === true) {
      this.setData({
        goodJobChecked: false
      })
      // wx.cloud.callFunction({
      //   name: "delMyJob",
      //   data: {
      //     contentId: this.data.contentId,
      //     userID: this.data.userID
      //   }
      // })
      let Promise1 = new Promise((resolve,reject)=>{
        resolve(gets.delMyJob(this.data.contentId,this.data.userID))
      })
      Promise1;
    }
    else {
      this.setData({
        goodJobChecked: true
      })
      // wx.cloud.callFunction({
      //   name: "addMyJob",
      //   data: {
      //     contentId: this.data.contentId,
      //     userID: this.data.userID
      //   }
      // })
      let Promise1 = new Promise((resolve,reject)=>{
        resolve(gets.addMyJob(this.data.contentId,this.data.userID))
      })
      Promise1;
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  juedge() {
    // 判断是否点了赞和评论了 - 当前登录用户
    if(this.data.jobList.indexOf(this.data.contentId) == -1) {
      this.setData({
        goodJobChecked: false
      })
    }
    else {
      this.setData({
        goodJobChecked: true
      })
    }
    if(this.data.starList.indexOf(this.data.contentId) == -1) {
      this.setData({
        starChecked: false
      })
    }
    else {
      this.setData({
        starChecked: true
      })
    }
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
  onShare() {
    this.setData({
      isChecked: true
     })
    //  到时候再来
    setTimeout(()=>{
      this.setData({
        isChecked: false
       })
    }, 1000)
    this.onShareAppMessage();
  },  
  onShareAppMessage(res){
    
  }
})