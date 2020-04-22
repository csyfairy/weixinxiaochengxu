// component/my-room/my-room.js
Component({
  options:{//组件配置项 islated表示组件样式隔离
    styleIsolation:'islated'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    room: { // 属性名
      type: Object,
    },
    innerText:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 这里是组件的内部数据，动态数据和默认数据
    domeData:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 自定义方法
    customMethod:function(){

    },
    // 点击房间跳转到直播间函数
    enterRoom(e){
      // 组件中的data数据
      console.log(this)
      // 事件目标的自定义data-属性
      console.log(e.currentTarget.dataset.rid)
      wx.navigateTo({
        // 跳转到房间直播页面，并通过url传参
        url: '/pages/room-item/room-item?roomName='+this.data.room.roomName+'&rid='+e.currentTarget.dataset.rid,
      })
    }
  }
})
