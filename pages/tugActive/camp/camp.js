Page({
  switchCamp:function(event){
    function utf16toEntities(str) {
      var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
      str = str.replace(patt, function (char) {
        var H, L, code;
        if (char.length === 2) {
          H = char.charCodeAt(0); // 取出高位
          L = char.charCodeAt(1); // 取出低位
          code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
          return "&#" + code + ";";
        } else {
          return char;
        }
      });
      return str;
    }

    this.setData({
      isLoading:true,
    })
    // console.log(event.currentTarget.dataset.camp)
    var camp = event.currentTarget.dataset.camp,
     nickname = wx.getStorageSync('nickName'),
     portrait = wx.getStorageSync('portrait'),
     count = wx.getStorageSync('number'),
     OpenId = wx.getStorageSync('OpenId'),
     data={
       'nickname':nickname,
       'portrait': portrait,
       'openid':OpenId,
       'number':count,
       'camp': camp
     }
      // nickname = nickname.replace(/uD83C[uDF00-uDFFF]|uD83D[uDC00-uDE4F]/g, "");
      console.log(utf16toEntities(nickname).replace(/&#[0-9]{6};/g,""))
      wx.setStorageSync('camp', camp)
      wx.request({
        url: 'https://data.xinxueshuo.cn/nsi-1.0/activity/TugOfWar_Insert.do',
        data:data,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success:function(msg){
          // console.log(msg)
          wx.redirectTo({
            url: '../shakeBegin/shakeBegin'
            // url: '../../pages/tugActive/camp/camp'
          })
        }
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
    isLoading:false,
    nickname:wx.getStorageSync('nickName'),
    portrait:""
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
    this.setData({
      portrait: wx.getStorageSync('portrait'),
      nickname:wx.getStorageSync('nickName'),
    })
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