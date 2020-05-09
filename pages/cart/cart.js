// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      show:false,
      price:0
  },
  goindex(){
    wx:wx.switchTab({
      url: '/pages/index/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  jian(e){
    let  item = e.currentTarget.dataset.item;
    let token = wx.getStorageSync('token');
    item.number--
    wx.request({
      url: `https://api.it120.cc/fyy/shopping-cart/modifyNumber?key=${item.key}&number=${item.number}&token=${token}`,
      method: 'POST',
      success: (res) => {
        //console.log(res.data.data.items)
        this.data.list = res.data.data.items
        var parice = res.data.data.price
        this.setData({
          list: this.data.list,
          price: parice
        })
      }
    })
  },


  jia(e)   {
        let item = e.currentTarget.dataset.item;
    let token = wx.getStorageSync('token');
        item.number++
        wx.request({
            url:  `https://api.it120.cc/fyy/shopping-cart/modifyNumber?key=${item.key}&number=${item.number}&token=${token}`,
            method: 'POST',
            success: (res) => {
                //console.log(res.data.data.items)
              this.data.list = res.data.data.items
              var parice = res.data.data.price
                this.setData({
                    list: this.data.list,
                    price: parice
                })
            }
        })
    },
  del(e){
    let  item = e.currentTarget.dataset.item;
    let token = wx.getStorageSync('token');
    wx.request({
      url: `https://api.it120.cc/fyy/shopping-cart/remove?key=${item.key}&token=${token}`,
      method: 'POST',
      success: (res) => {
        //console.log(res.data.data.items)

        if(res.data.code===700){
         var nn= this.data.list.number
          this.setData({
            list: [],
            nn:0,
            show:true
          })

        } else {
          this.data.list = res.data.data.items
          var parice = res.data.data.price

          this.setData({
            list: this.data.list,
            price: parice

          })
        }
      }
    })
  },
  order(){
    wx.navigateTo({
      url: '/pages/dd/dd',
    })
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
    let token = wx.getStorageSync('token')
      wx.request({
        url: `https://api.it120.cc/fyy/shopping-cart/info?token=${token}`,
        success:(res)=>{
          console.log(res)
          var parice = res.data.data.price

          this.setData({
            list: res.data.data.items,
            price: parice
          })

          console.log(this.data.list)

        }
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