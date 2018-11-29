Page({
  data:{
    activeData:'',
    activeData2:''
  },
  makesure(){
    wx.showLoading({
      title:'加载中'
    })
      let username=wx.getStorageSync('nickName')
      wx.request({
          url: 'https://data.xinxueshuo.cn/nsi-1.0/User_api', 
          data: {
            whereFrom:'feedback',
            Callback:'jQuery111108933486386263263_1542164218228',
            UserName:'undefinedUser',
            content:username+':'+this.data.activeData,
            Contact:this.data.activeData2,
            _:'1542164218229'
          },
          success(res) {
             wx.hideLoading()
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2500
              })
              setTimeout(function(){
                wx.navigateBack({
                  delta:1
                })
              },1000)
          }
        })
  },
  active1(e){
    this.setData({
      activeData: e.detail.value
    })
  },
  active2(e){
    this.setData({
      activeData2: e.detail.value
    })
  },
  authorization(){
    
  },
  onLoad: function (option) {
    
  },
  onShow(e) {
    
  },
})
