Page({
  data:{
    count:0
  },
  isShow: false,
  onShow: function () {
    var that=this
    this.isShow = true;
    var num=0
    wx.onAccelerometerChange(function (e) {
      if (!that.isShow) {
        return
      }
      console.log(e.x)
      console.log(e.y)
      console.log(e.z)
      if (e.x > 1 && e.y > 1 ) {
        num++
        wx.vibrateLong()
        that.setData({
          count: num
        })
        console.log(count)
        wx.showToast({
          title: '摇一摇成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  onHide: function () {
    this.isShow = false;
  }
})