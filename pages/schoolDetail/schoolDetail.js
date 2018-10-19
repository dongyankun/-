//获取应用实例
const app = getApp()

Page({
  onLoad: function (option) {
    console.log("schoolDetail接收到的参数："+option.School_Id)
    // console.log(option)

    // 发起请求
    // wx.request({
    //   url: 'https://data.xinxueshuo.cn/nsi-1.0/school/detail.do', //仅为示例，并非真实的接口地址
    //   data: {
    //     searchKey: value,
    //     pageNum: '1',
    //     pageSize: '20',
    //     orderBy: "Load_Time-desc"
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //     that.setData({
    //       list: res.data.data.list,
    //     })
    //   }
    // })

  }
})