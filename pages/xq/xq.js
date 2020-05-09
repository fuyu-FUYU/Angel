// pages/xq/xq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    content: "",
    number:1,
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  shocang(e){

     let id = e.currentTarget.dataset.id;
    let token = wx.getStorageSync('token')

    if(this.data.show==false){
      wx.request({
        url: `https://api.it120.cc/fyy/shop/goods/fav/add?goodsId=${id}&token=${token}`,
        success: (res) => {

          this.setData({
            show: true
          })
        }
      })
      console.log(id)
    }else{

      wx.request({
        url: `https://api.it120.cc/fyy/shop/goods/fav/delete?goodsId=${id}&token=${token}`,
        success: (res) => {

          this.setData({
            show: false
          })
        }
      })
    }
    
  },
  onLoad: function (options) {
    let token = wx.getStorageSync('token')

    wx.request({
      url: `https://api.it120.cc/fyy/shop/goods/fav/check?goodsId=${options.id}&token=${token}`,
      success: (res) => {

        // console.log(res)
        if (res.data.data == "已收藏") {

          this.setData({
            show: true
          })
          console.log("已收藏")

        } else {
          console.log("未收藏")
        }

      }
    })




    wx.request({
      url: 'https://api.it120.cc/fyy/shop/goods/detail?id=' + options.id,
      success: (res) => {
        // 
        let str = res.data.data.content;
        // 
        // console.log(res.data.data)
        this.setData({
          list: res.data.data,
          content: str.replace(/\<img/g, '<img style="width:100%"')
          //这里吧需要的正则替换一下，解决样式问题
        })
        console.log(this.data.list)
      }
    })
  },

  addShop(){
    this.showModal();
  },
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  quxiao(){
    this.hideModal()
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  onChange(event) {
    this.setData({
      number: event.detail
    })
    // console.log(this.data.number);
  },
  goGwc(e)   {
        let id = e.currentTarget.dataset.id;
            console.log(id)
        let token = "ecf9379e-a954-4573-819d-4d3a196fa4df";
        let num = this.data.number;
        wx.request({
            method: 'POST',
            url:  `https://api.it120.cc/fyy/shopping-cart/add?goodsId=${id}&number=${num}&token=${token}`,
            success: (res) => {
                console.log(res)
              if (res.data.msg === "请提交sku参数")         {
                          wx.showToast({
                              title:  '缺少sku参数',
                              icon:  'none',
                              duration:  2000
                          })
                          this.setData({  show:  false  });
                      }
                      else         {
                          wx.showToast({
                              title:  '加入购物车',
                              icon:  'success',
                              duration:  2000
                          })
                          this.setData({  show:  false  });
                      }
            }
        })

      wx.switchTab({
        url: "/pages/index/index",
      })
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