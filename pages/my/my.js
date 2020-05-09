Page({
  data: {
    userInfo: {},
    num: 0,
    show: true,
    flag: true
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  lj() {
    this.setData({ show: true })
    //this.getTf()
  },

  onLoad: function () {

  },
  tc() {
    let token = wx.getStorageSync('token')
    wx.request({
      url: `https://api.it120.cc/fyy/user/loginout?token=${token}`,
      header: {
        'content-type': ' application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: {},
          show: true,
          flag: true
        })
      }
    })
    wx.removeStorageSync('token')
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  //收藏页面
  sc() {
    wx.navigateTo({
      url: '/pages/sc/sc',
    })
  },
  getTf() {
    let token = wx.getStorageSync('token')
    wx.request({
      url: `https://api.it120.cc/fyy/user/detail?token=${token}`,
      success: (res) => {
        console.log(res)
        if (res.data.code == 0) {
          //如果后台有这个用户，说明已经登录过了
          // 调用na这个方法，获取用户信息渲染到页面
          this.na();
          this.setData({
            show: false,
            flag: true
          })
        }
        else {
          this.setData({
            show: true,
            flag: false
          })
        }
      }
    })
  },
  onShow() {
    
  },
  yx() {
    this.lg();
    this.getTf()
  },
  zb() {
    console.log(this.data.flag)
    this.setData({
      show: false,
      flag: false
    })
    //this.getTf();
  },
  na() {
    wx.getUserInfo({
      success: (ress) => {
        console.log(ress)
        this.setData({
          userInfo: ress.userInfo
        })
      }
    })
  },
  lg() {
    wx.login({
      success(res) {
        //console.log('wx.login:',res)
        let { code } = res;
        wx.request({
          url: 'https://api.it120.cc/fyy/user/wxapp/login?code=' + code,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success(result) {
            //console.log('登录返回',result)
            wx.setStorageSync('token', result.data.data.token)
          }
        })
      }
    })
  },
})
