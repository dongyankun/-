var WxParse=require('../../wxParse/wxParse.js')
Page({
  data: {
    detail: null,
    content:""
  },
  onLoad: function (option) {
    wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
      title: '加载中',
      icon: 'loading',
    })
    var that = this
    setTimeout(function(){
        wx.request({
          url: 'https://data.xinxueshuo.cn/nsi-1.0/manager/article/getStatistics.do?articleId=' + option.id, 
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            
          }
        })
    },5000)
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/article/detail.do?articleId=' + option.id, 
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading()
        // console.log(res.data.data)
        that.setData({
          detail: res.data.data,
          content: WxParse.wxParse('content', 'html', res.data.data.articleContent, that, 0)
        })
      }
    })
  },
  onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage: function () {
    let flagname = this.data.detail.title
    let outfitid = this.data.detail.id
    return {
      title: flagname,
      path: 'pages/newsDetail/newsDetail?id=' + outfitid
    }
  },
})