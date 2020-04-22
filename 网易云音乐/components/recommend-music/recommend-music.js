// components/recommend-music/recommend-music.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommendMusic:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    listItemClick(e){
      // 全局设置当前播放的歌曲,并开始播放
      app.setMusic(this.data.recommendMusic[e.currentTarget.dataset.index]);
      // 清空当前播放列表
      app.globalData.currentPlayList = null;
      // 把播放类型自动设置为单曲循环
      app.globalData.playType = "single"
    }
  }
})
