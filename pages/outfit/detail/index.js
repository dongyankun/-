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
  clickMe:function(){
    wx.reLaunch({
      url:'../index/index'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
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
      url: 'https://data.xinxueshuo.cn/nsi-1.0/manager/institution/detail.do?institutionId='+wxdata.outfitid, //仅为示例，并非真实的接口地址
      // data: {
      //   searchKey:wxdata.searchKey,
      //   pageNum:wxdata.pageNum,
      //   pageSize:'10',
      // },
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
        wx.setNavigationBarTitle({
          title: res.data.data.name
        })
        that.setData({
            outfitdetail: res.data.data,
        })
        wx.hideLoading();
      }
    })
  },
  onLoad: function (options) {
    console.log(options)
    this.data.outfitid=options.id
    this.ajaxlist()
    // var that=this
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
  onShareAppMessage:function(){
    let flagname=this.data.outfitdetail.name
    let outfitid=this.data.outfitid
      return {
        title:flagname,
        path: 'pages/outfit/detail/index?id='+outfitid
      }
  },
  onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  getUserInfo: function(e) {
    
  }
})
