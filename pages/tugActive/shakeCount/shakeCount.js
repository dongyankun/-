Page({
  data: {
    count: 0,
    nickname: wx.getStorageSync('nickName'),
    portrait: wx.getStorageSync('portrait'),
    bodyColor:"",
    fontColor:"",
    maxTime:30,
    camp: wx.getStorageSync('camp'),
    totalNum:0,
    myCount:0
  },

  onShow: function () {
    var that = this
    var campTeam = wx.getStorageSync('camp')
    this.setData({
      portrait: wx.getStorageSync('portrait'),
      nickname: wx.getStorageSync('nickName'),
      camp: wx.getStorageSync('camp')
    })
    if (campTeam==="红"){
      that.setData({
        bodyColor:"linear-gradient(180deg,#f76083,#f82254);",
        fontColor: "#f82254"
      })
    }else{
      that.setData({
        bodyColor: "linear-gradient(180deg,#52a5f4,#004ef5);",
        fontColor: "#004ef5"
      })
    }
    // console.log(this.data.bodyColor)
    var openId = wx.getStorageSync('OpenId')

    // wx.request({
    //   url: 'https://data.xinxueshuo.cn/nsi-1.0/activity/TugOfWar_Count.do',
    //   method:"post",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success:function(msg){
    //     // console.log(msg.data.data)
    //     if (campTeam == "红"){
    //       that.setData({
    //         totalNum: msg.data.data.red
    //       })
    //     }else{
    //       that.setData({
    //         totalNum:msg.data.data.blue
    //       })
    //     }
    //   }
    // })
 
  wx.request({
    url: 'https://data.xinxueshuo.cn/nsi-1.0/activity/TugOfWar_MyNumber.do',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data:{
      'openid': openId
    },
    method:"post",
    success:function(msg){
      // console.log(msg)
      // console.log(msg.data.data.index06)
      that.setData({
        myCount: msg.data.data.index06
      })
    }
  })
    // var countTimer=setInterval(this.countDown,1000)
  },
  onHide: function () {
    this.isShow = false;
  }
})