Component({
  options: {
    // 组件配置项 isolated表示组件样式隔离
    styleIsolation: 'isolated'
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定


    // 这里定义了room属性，属性值可以在组件使用时通过父组件传递过来
    daysList: Object,

  },
  data: {
    // 这里是一些组件内部数据

    time: 0,
    someData: {

    }
  },
  methods: {
    // 这里是一个自定义方法
    zhihuNews(e) {
      // console.log(e.currentTarget.dataset)
      var data = e.currentTarget.dataset;
      wx.navigateTo({
        // 通过url传参,跳转到直播间页面,并通过url传参
        url: '/pages/zhihu-room/zhihu-room?name=' + e.currentTarget.dataset.name + "&url=" + e.currentTarget.dataset.url,

      })
    }


  },
  attached: function () {



    // var week = new Date().getDay();
    // console.log(week)
    // console.log(this.properties.daysList)
    var index = this.properties.daysList.date.length - 4;
    // console.log(index)
    var year = this.properties.daysList.date.substr(0, 4) * 1
    var month = this.properties.daysList.date.substr(index, 2) * 1
    // console.log(month)
    var day = this.properties.daysList.date.substr(index + 2) * 1
    // console.log(day)
    var a = year + "-" + month + "-" + day
    var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var week = weekArray[new Date(a).getDay()]
    // console.log(week)a

    this.setData({
      time: year + "年" + month + "月" + day + "日   " + week
    })
    // console.log(this.data.time)
  }
})


