//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    outfitdetail:'',
    outfitid:'',
  },
  tapName(data){
    console.log(data)
  },
  lower:function(){
    this.data.pageNum=this.data.pageNum+1
    this.ajaxlist()
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clickMe:function(){
    wx.reLaunch({
      url:'../index/index'
    })
  },
  ajaxlist(){
    var that=this
    let wxdata=this.data
    wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
        title: '加载中',
        icon: 'loading',
    });
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/school/detail.do?schoolId='+wxdata.outfitid,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        for (var value in res.data.data) {
          if(res.data.data[value]==0){
            res.data.data[value]='暂无'
          }
        };
        that.setData({
            outfitdetail: res.data.data,
        })
        wx.setNavigationBarTitle({
          title: res.data.data.schoolName
        })
        wx.hideLoading();
      }
    })
  },
  onLoad: function (options) {
    this.data.outfitid=options.id
    this.ajaxlist()
    // var that=this
  },
  onShareAppMessage:function(){
    let flagname=this.data.outfitdetail.schoolName
    let outfitid=this.data.outfitid
      return {
        title:flagname,
        path: 'pages/home/detail/index?id='+outfitid
      }
  },
  onReady(){
     wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })
  },
  onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  getUserInfo: function(e) {
    
  }
})
