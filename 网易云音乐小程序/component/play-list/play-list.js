// components/play-list/play-list.js

const app = getApp();
Component({

  properties: {

  },


  /**
   * 页面的初始数据
   */
  data: {
    playList: [],
    picUrl: "/images/cd.png",
    // 当前列表是否展开
    isOpen: false,
    // 当前播放器是否正在播放
    isPlaying: true,
    // 当前播放歌曲的索引
    currentIndex: 0
  },

  methods: {
    openOrClose() {
      this.setData({
        isOpen: !this.data.isOpen
      })
    },
    itemClick(e) {
      // console.log(e.currentTarget.dataset.index)
      // app.globalData.currentPlayIndex = e.currentTarget.dataset.index;
      app.setCurrentPlayList(this.data.playList, e.currentTarget.dataset.index)
      this.setData({
        picUrl: app.globalData.song.al ? app.globalData.song.al.picUrl : "/images/cd.png",
        currentIndex: app.globalData.currentPlayIndex,
        isOpen: false,
        isPlaying: true,
      })
    }
  },
  lifetimes: {
    ready() {
      this.setData({
        playList: app.globalData.currentPlayList,
        picUrl: app.globalData.song.al ? app.globalData.song.al.picUrl : "/images/cd.png",
        currentIndex: app.globalData.currentPlayIndex
      })

      app.setCDCover.push(() => {
        this.setData({
          picUrl: app.globalData.song.al ? app.globalData.song.al.picUrl : "/images/cd.png",
          currentIndex: app.globalData.currentPlayIndex,
        });
      })

      app.playFun.push(() => {
        this.setData({
          isPlaying: true
        });
      })
      app.pauseFun.push(() => {
        this.setData({
          isPlaying: false
        });
      })

      app.endFun.push(() => {
        this.setData({
          isPlaying: false
        });
      })
    }




  }

})