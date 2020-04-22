// component/news-item/news-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: { // 属性名
      type: Object,
    },
    timeArr:{
      type: Object,
    },
    index:{
      type: Number,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    month:"",
    thisdate:"",
    bool:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击跳转详情
    enterDetail(e) {
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
  },
  lifetimes: {
    attached: function () {
    // console.log(this.data.index,"/////")
    this.setData({
      month: this.data.item.ga_prefix.substring(0, 2),
      thisdate: this.data.item.ga_prefix.substring(2, 4)
    })
  },
  }
})
