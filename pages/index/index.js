//index.js
const { getGoodsList, getBanner, getGoodsCate } = require('../../network/api.js');


//获取应用实例
const app = getApp()

Page({
  data: {
      banner:[],
      list:[],
      tuijian:[],
      pintuan:[],
      msg:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goss(){
    wx.navigateTo({
      url: '/pages/ss/ss',
    })
  },
  onLoad: function () {

    getGoodsList().then((res) => {
      console.log(res)
      if (res.code == 0) {
        let msg = []
        let msg2 = []
        let msg3 = []

        res.data.forEach((i) => {
          if (i.recommendStatusStr === '推荐') {
            msg.push(i)
          }
        })


        res.data.forEach((i) => {
          if (i.pingtuan === true) {
            msg2.push(i)
          }
        })

        res.data.forEach((i) => {
          if (i.recommendStatusStr === '普通') {
            msg3.push(i)
          }
        })

        this.setData({
          tuijian: msg,
          pintuan: msg2,
          msg: msg3

        })
        // console.log(this.data.tuijian)
        console.log(this.data.msg)
      }

    })

    getBanner().then((res)=>{
      if (res.code === 0) {
        let msg = []

        res.data.forEach((i) => {
          if (i.type === 'index') {
            msg.push(i)
          }
        })
        this.setData({
          banner: msg
        })
        // console.log(this.data.banner)
      }
    })
    getGoodsCate().then((res)=>{

      if (res.code === 0) {
        this.setData({
          list: res.data
        })
      }

    })

  },
  golist(e){
    var id = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index

    console.log(id)

    wx.reLaunch({
      url: `/pages/list/list?id=${id}&index=${index}`,
    })
  },
  goxq(e){

    let id =e.currentTarget.dataset.item

    console.log(id)


      wx.navigateTo({
        url: `/pages/xq/xq?id=${id}`,
      })


  }


})
