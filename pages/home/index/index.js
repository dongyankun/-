//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    list:[],
    height:1000,
    pageNum:1,
    searchKey:'',
    listLength:'',
    liststatus:false,
    totalstatus:false,
    bottomLoading:false,
    bottomisshow:true,
    hideviews:false,
    yongjiu:false,
  },
  bindSearchEvent: function (e) {
    this.setData({
      searchKey: e.detail.value,
    })
    this.data.pageNum=1
    this.data.list.length=0
    this.ajaxlist()
  },
  
  lower:function(){
    if(this.data.pageNum*10>=this.data.listLength){
      wx.showToast({
        title:'没有更多了',
      })
      this.setData({
          bottomisshow: false,
      })
      return
    }
    wx.vibrateShort()
    this.data.pageNum=this.data.pageNum+1
    this.ajaxlist()
  },
  hideview(){
    wx.setStorageSync('scene', 1089)
    this.setData({
        hideviews: false,
        yongjiu:true,
    })
  },
  ajaxlist(){
    var that=this
    let wxdata=this.data
    that.setData({
        bottomLoading: true,
    })
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/school/list.do',
      data: {
        searchKey: wxdata.searchKey,
        pageNum:wxdata.pageNum,
        pageSize:'10',
        orderBy: "Load_Time-desc"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let flagdata=wxdata.list.concat(res.data.data.list)
        if(flagdata.length==0){
          that.setData({
            liststatus: true,
            bottomLoading: false,
            bottomisshow: false,
          })
        }else if(flagdata.length<10){
          that.setData({
            liststatus: false,
            bottomLoading: false,
            bottomisshow: false,
          })
        }else{
          that.setData({
            liststatus: false,
            bottomisshow: true,
          })
        }
        that.setData({
            totalstatus:true,
            listLength:res.data.data.total,
            list: flagdata,
        })
      }
    })
  },
  onLoad: function () {
    this.ajaxlist()
  },
  onShow(e) {
    //console.log(wx.getStorageSync('scene'))
    if(wx.getStorageSync('scene')!=1089){
      if(this.data.yongjiu){
        return
      }
      this.setData({
            hideviews:true,
      })
    }
    wx.showShareMenu({
      withShareTicket: true
    })
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
})
