// components/recommend-music/recommend-music.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommendMusic: {
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
    listItemClick(e) {
      // app.setMusic(this.data.recommendMusic[e.currentTarget.dataset.index])
      app.setCurrentPlayList(this.data.recommendMusic, e.currentTarget.dataset.index);
    }
  }
})
