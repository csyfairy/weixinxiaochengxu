// components/recommend-music/recommend-music.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songsList: null
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
    musicClick() {
      // console.log(this.data.songsList)
      app.globalData.player.stop();
      app.setMusic(this.data.songsList);
      app.globalData.currentPlayList = null;
      app.globalData.playType = "single"
    }
  }
})
