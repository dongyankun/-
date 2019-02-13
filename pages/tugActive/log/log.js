Page({
  confirmLog:function(){
    this.setData({
      isLoading:true
    })
    // 登录
    wx.login({
      success: res => {
        wx.setStorageSync('code', res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    var that = this
    wx.getUserInfo({
      success: function (res) {
        // console.log(res)
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        // var nickName = URLEncoder.encode(userInfo.nickName, "utf-8")
        // var nickName = URLEncoder.encode(userInfo.nickName, "utf-8")
        var portrait = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        that.setData({
          nickName: nickName,
          portrait: portrait, 
          authorizationstatus: false
        })
        wx.hideLoading()
        let code = wx.getStorageSync('code')
        wx.setStorageSync('nickName', nickName)
        wx.setStorageSync('portrait', portrait)
        wx.setStorageSync('number', 0)
        wx.request({
          url: 'https://data.xinxueshuo.cn/nsi-1.0/wxPay/decodeUserInfo.do', 
          data: {
            type:'1',
            code:code,
            iv:res.iv,
            encryptedData:res.encryptedData
          },
          method:'post',             
          header: {
          'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            // console.log(res)
            let sendOpenId = res.data.data.openId
            // console.log(sendOpenId)
            wx.setStorageSync('OpenId', sendOpenId)
            wx.redirectTo({
              url: '../camp/camp'
              // url: '../../pages/tugActive/camp/camp'
            })
          }
        })
        // console.log(userInfo, nickName, avatarUrl, gender, province, city, country)
      },
      complete: function () {
        wx.hideLoading()
      }
    })

    // 获取用户信息
    var that = this
    wx.getSetting({
      success(res) {
        let data = res.authSetting
        that.setData({
          authorizationstatus: !data['scope.userInfo']
        })
        if (data['scope.userInfo']) {
          if (wx.getStorageSync('nickName')) {
            that.setData({
              nickName: wx.getStorageSync('nickName'),
              avatarUrl: wx.getStorageSync('avatarUrl')
            })
          }
        }
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:false
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
  onShow: function () {
    // if(wx.getStorageSync('OpenId')){
    //   wx.redirectTo({
    //     url: '../shakeCount/shakeCount'
    //     // url: '../../pages/tugActive/camp/camp'
    //   })
    // }
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