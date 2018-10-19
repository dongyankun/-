Page({
  data:{
    list:[],
    pageNum: 1,
    pageSize:10,
    bottomLoading:false,
    bottomisshow:true,
  },
  onLoad: function (option) {
    var that=this

    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/article/list.do', //仅为示例，并非真实的接口地址
      data: {
        'pageNum': this.data.pageNum,
        'pageSize': this.data.pageSize
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data.data.list)
        that.setData({
          list:res.data.data.list
        })
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    wx.vibrateShort()
    that.setData({
        bottomLoading: true,
    })
    // 显示加载图标
    // wx.showLoading({
    //   title: '玩命加载中',
    // })
    // 页数+1
    this.data.pageNum +=1
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/article/list.do',
      method: "GET",
      data: {
        'pageNum': this.data.pageNum,
        'pageSize': this.data.pageSize
      },
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        var listConcat = that.data.list.concat(res.data.data.list)
        // 回调函数
        // console.log(res)
        // 设置数据
        if(res.data.data.list.length>0){
          that.setData({
            list: listConcat,
            bottomisshow: true,
          })
        }
        // 隐藏加载框
        wx.hideLoading();
      }
    })

  },
  onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage: function () {
    let flagname = '新学说国际教育资讯'
    return {
      title: flagname,
      path: 'pages/news/news'
    }
  },
})
