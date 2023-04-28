// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    url: ["/pages/index/index","/pages/like/like","/pages/message/message","/pages/self/self"]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      var page = event.detail;
      wx.showLoading({
        title: '数据加载中...',
        mask: true
      })
      wx.switchTab({
        url: this.data.url[page]
      }).then(res=>{
        
        wx.hideLoading()
      })
      // this.setData({ active: page}) 
      // 三个页面都要写代码啊，接收跳转的参数，从而设置当前页面selected的值 -后面再来
    }
  }
})
