
const { getGoodsList, getGoodsCate } = require('../../network/api.js');


Page({
  /**
   * 页面的初始数据
   */
  data: {
    left: [],
    list: [],
    lists: [],
    indexs: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  goss() {
    wx.navigateTo({
      url: '/pages/ss/ss',
    })
  },
  onLoad: function(options) { 
    var id = options.id
    var index= options.index
    console.log(typeof (index))
    var arr = []
    // 获取右边的数据


    getGoodsList().then((res)=>{
      this.setData({
        lists: res.data
      })
      if (typeof (id) == 'undefined') {
        this.setData({
          list: res.data,
          lists: res.data
        })
        // console.log(this.data.list)
      } else {
        this.data.lists.forEach((m) => {
          // console.log(m)
          if (id == m.categoryId) {
            arr.push(m)
          }
        })
        this.setData({
          list: arr,
          indexs: Number(index)
        })

      }
    })

    
    // 获取左边的数据

    getGoodsCate().then((res)=>{
      this.setData({
        left: res.data,

      })
    })

    
  },
  right(e) {
    let  index = e.currentTarget.dataset.index;
    // console.log(index)
    let temp = []

      
    let  id = e.currentTarget.dataset.id;
    this.data.lists.forEach((m) => {
      if (m.categoryId === id) {
        temp.push(m)
      }
    })
    this.setData({
      list: temp,
      indexs: index
    })
  console.log(this.data.lists)
  },
  goxq(e) {
    let id = e.currentTarget.dataset.item
    // console.log(id)

    wx.navigateTo({
      url: `/pages/xq/xq?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})