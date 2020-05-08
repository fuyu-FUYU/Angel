// pages/sc/sc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    show:true
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
  getData()
  {
    wx.showLoading({
      title: '',
    })
    let token=wx.getStorageSync('token');
      wx.request({
        method:'POST',
        url: `https://api.it120.cc/fyy/shop/goods/fav/list?token=${token}`,
        success:(res)=>{
          wx.hideLoading()
          //console.log(res)
          if(res.data.code===700)
          {
            this.setData({
              list:[],
              show:true
            })
          }
          else
          {
            this.setData({
              list:res.data.data,
              show:false
            })
          }
        }
      })
  },
  onShow: function () {
   this.getData();
  },
  //进入详情
  add(e)
  {
    let id=e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/xq/xq?id='+id,
    })
  },
  del(e)
  {
    let id=e.currentTarget.dataset.id;
    let gd=e.currentTarget.dataset.gd;
    let token=wx.getStorageSync('token');
      wx.request({
        method:'POST',
        url: `https://api.it120.cc/fyy/shop/goods/fav/delete?goodsId=${gd}&id=${id}&token=${token}`,
        success:(res)=>{
          console.log(res)
          if(res.data.code===0)
          {
            this.getData();
          }
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