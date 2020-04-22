// components/recommend-list/recommend-list.js
const app = getApp()
import { userPlayListInfo } from "../../utils/network.js"

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommendList: {
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
      // console.log("歌单")
      userPlayListInfo(e.currentTarget.dataset.id).then(data => {
        app.setCurrentPlayList(data.playlist.tracks, 0);
      })
    }
  }
})
