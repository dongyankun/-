Page({
  data:{
    activeData:'',
    activeData2:''
  },
  makesure(){
    console.log(this.data.activeData)
    console.log(this.data.activeData2)
      wx.request({
          url: 'http://data.xinxueshuo.cn/nsi-1.0/User_api', 
          data: {
            whereFrom:'feedback',
            Callback:'jQuery111108933486386263263_1542164218228',
            UserName:'undefinedUser',
            content:'',
            Contact:'',
            _:'1542164218229'
          },
          success(res) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2500
              })
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
