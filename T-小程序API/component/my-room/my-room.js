// component/my-room/my-room.js
Component({
  options: {
    // 组件配置项  isolated 表示组件样式隔离
    styleIsolation: 'isolated'
  },
  properties: {
    // 这里定义了room属性，属性值可以在组件使用时通过父组件传递进来
    room : Object
  },
  data: {
    // 这里是一些组件内部数据,动态数据和默认数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    // 点击房间跳转到直播间的函数
    enterRoom(e){
      console.log(this.data.room)  // 组件中的data数据和组件属性数据
      console.log(e.currentTarget.dataset) // 事件目标标签的data属性数据
      wx.navigateTo({
        // 跳转到直播间页面,并通过url传参
        url: '/pages/douyu-room/douyu-room?roomName=' + this.data.room.roomName + "&rid=" + e.currentTarget.dataset.rid
      })
    }

  }
})

