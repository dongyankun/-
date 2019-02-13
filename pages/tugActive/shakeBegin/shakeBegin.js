Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:0,
    maxTime: 30,
    bodyColor: "",
    fontColor: "",
    nickname: wx.getStorageSync('nickName'),
    portrait: wx.getStorageSync('portrait'),
    upBubbel:true,
    circleColor:""
  },
  countDown(){
    if(this.data.maxTime>0){
      this.data.maxTime--
      this.setData({
        maxTime: this.data.maxTime
      })
    }else{
      clearInterval(this.countTimer)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  isShow: false,
  
  onShow: function () {
    this.setData({
      nickname: wx.getStorageSync('nickName'),
      portrait: wx.getStorageSync('portrait'),
    })
    var that = this
    if (wx.getStorageSync('camp') == "红") {
      that.setData({
        bodyColor: "linear-gradient(180deg,#f76083,#f82254);",
        fontColor: "#f82254", 
        circleColor:"#f76083"
      })
    } else {
      that.setData({
        bodyColor: "linear-gradient(180deg,#52a5f4,#004ef5);",
        fontColor: "#004ef5",
        circleColor: "#52a5f4"
      })
    }

    this.isShow = true;
    var num = 0
    var currentNum = 0
    var bubbelNum=0
    wx.onAccelerometerChange(function (e) {
      
      if (!that.isShow) {
        return
      }
      if (that.data.maxTime > 0) {
        
        if (e.x > 0.7 && e.y > 0.7 || e.x > 0.7 && e.z > 0.7 || e.y > 0.7 && e.z > 0.7) {
          num++
          wx.vibrateLong()
          that.setData({
            isShake: true,
            count: num
          })
          // console.log(count)
        } else {
          that.setData({
            isShake: false
          })
        }
      }
    })
    var openId = wx.getStorageSync('OpenId')
    var bubbelTimer=setInterval(function(){
      if (that.data.count != bubbelNum) {
        that.setData({
          upBubbel: false
        })
      }
      else{
        that.setData({
          upBubbel: true
        })
      }
      bubbelNum=that.data.count
    },1000)
    var timer = setInterval(function () {
      if (that.data.count != currentNum) {
        console.log(that.data.upBubbel)
        wx.request({
          url: 'https://data.xinxueshuo.cn/nsi-1.0/activity/TugOfWar_update.do',
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            'openid': openId,
            'number': that.data.count
          },
          success: function (msg) {
            console.log(msg)
          }
        })
        currentNum = that.data.count
      }
    }, 3000)

    var countTimer = setInterval(this.countDown, 1000)
    setTimeout(function(){
      wx.redirectTo({
        url: '../shakeCount/shakeCount',
      })
    },30000)
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