Page({
  data:{
    authorizationstatus:false,
    nickName:'',
    avatarUrl:''
  },
  authorization(){
    var that=this
    wx.getUserInfo({
        success: function(res) {
            console.log(res)
            var userInfo = res.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            var gender = userInfo.gender //性别 0：未知、1：男、2：女
            var province = userInfo.province
            var city = userInfo.city
            var country = userInfo.country
            that.setData({
              nickName:nickName,
              avatarUrl:avatarUrl
            })
            let code=wx.getStorageSync('code')
            // wx.request({
            //   url: 'http://192.168.0.54:8080/nsi-1.0/wxPay/decodeUserInfo.do', 
            //   data: {
            //     type:'1',
            //     code:code,
            //     iv:res.iv,
            //     encryptedData:res.encryptedData
            //   },
            //   method:'post',             
            //   header: {
            //   'content-type': 'application/x-www-form-urlencoded'
            //   },
            //   success(res) {
            //     console.log(res)
            //   }
            // })








            console.log(userInfo,nickName,avatarUrl,gender,province,city,country)
        }
    })
  },
  onLoad: function (option) {
    
  },
  onShow(e) {
    var that=this
    wx.getSetting({
      success (res) {
        let data=res.authSetting
        that.setData({
          authorizationstatus:!data['scope.userInfo']
        })
        if(data['scope.userInfo']){
          that.authorization()
        }
      }
    })
  },
})
