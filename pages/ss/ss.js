// pages/ss/ss.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      lists:[],
      inputVlaue:''
  },
  // 监{听input的值
  wc(){ 
  
    var list2 = []
    console.log(this.data.list)
     this.data.lists.forEach((m)=>{
       console.log(m.name)
      //  console.log()
       if (m.name == this.data.inputVlaue)  {
            console.log(111)
         list2.push(m)        
       }
     })
    this.setData({
      list: list2
    })
  },
  value(e){
    // var value = e.detail.value
      console.log(e.detail.value)
      this.setData({
        inputVlaue:e.detail.value
      })


  },
  goxq(e) {
    let id = e.currentTarget.dataset.item
    // console.log(id)

    wx.navigateTo({
      url: `/pages/xq/xq?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://api.it120.cc/fyy/shop/goods/list',
      success:(res)=>{
        this.setData({
          list: res.data.data,
          lists:res.data.data
        })
        console.log(this.data.list)
      }
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