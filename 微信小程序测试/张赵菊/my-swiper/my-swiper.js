// component/my-swiper/my-swiper.js
Component({
  options: {
    styleIsolation: 'islated'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    swiperList: { // 属性名
      type: Array,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // color: rgba(100, 165, 177, 0.3)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 自定义方法
    customMethod: function () {

    },
    // 点击房间跳转到直播间函数
    enterRoom(e) {
      // 组件中的data数据
      // console.log(this)
      // 事件目标的自定义data-属性
      console.log(e.currentTarget.dataset.url)
      console.log(this)
      wx.navigateTo({
        // 跳转到房间直播页面，并通过url传参
        url: '/pages/news/news-detail/news-detail?id=' + e.currentTarget.dataset.url,
      })
    }
  }
})
