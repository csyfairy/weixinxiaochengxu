// components/recommend-list/recommend-list.js
const app = getApp()

import { userPlayListInfoRequest } from "../../utils/network.js"

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
    listItemClick(e){
      // console.log(e.currentTarget.dataset.id);
      // 根据某个歌单id，获取歌单里面所有的歌曲
      userPlayListInfoRequest(e.currentTarget.dataset.id).then(data => {
        // console.log(data)
        // 把歌单中的歌曲列表放入全局app中,并开始播放列表中的第一首
        app.setCurrentPlayList(data.playlist.tracks);
      });
    }
  }
})
