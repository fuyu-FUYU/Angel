//app.js
App({
  onLaunch: function () {
    this.zc()
  },
  onShow() {
    this.getD();
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
  //注册到后台
  zc() {
    var that = this;
    wx.login({
      success(res) {
        //console.log('wx.login:',res)
        let { code } = res;
        wx.getUserInfo({
          success: (result) => {
            //console.log(res)
            let { encryptedData, iv, userInfo } = result
            wx.request({
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              url: `https://api.it120.cc/fyy/user/wxapp/register/complex`,

              data: {
                code, encryptedData, iv
              },
              success(resut) {
                // console.log('登录返回',resut)
                if (resut.code == 10000) {
                  wx.showToast({
                    title: '用户已注册',
                  })
                  that.getD();
                }
                else {
                  that.lg();
                  that.globalData.userInfo = userInfo
                }
              }
            })

          }
        })
      }
    })
  },
  getD() {
    let token = wx.getStorageSync('token');
    wx.request({
      url: 'https://api.it120.cc/fyy/shopping-cart/info?token=' + token,
      success: (res) => {
        if (res.data.code === 700) {
          wx.removeTabBarBadge({//移除tabbar右上角的文本
            index: 2,	//tabbar下标
          })
        }
        else {
          let num = res.data.data.number
          wx.setTabBarBadge({
            index: 2,
            text: JSON.stringify(num)
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})