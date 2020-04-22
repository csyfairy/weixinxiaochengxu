// components/play-list/play-list.js

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 当前播放的列表
    playList: [],
    // 当前播放歌曲的图片
    picUrl: "/images/cd.png",
    // 当前列表是否展开
    isOpen: false,
    // 当前播放器是否正在播放
    isPlaying: false,
    // 当前播放歌曲的索引
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openOrClose(){
      this.setData({
        isOpen: !this.data.isOpen
      });
    },
    itemClick(e){
      // 1.获取索引
      app.globalData.currentPlayIndex = e.currentTarget.dataset.index;
      // 2.获取当前歌曲song信息, 开始播放
      app.setMusic(e.currentTarget.dataset.song);
      // 3, 更新本地数据
      this.setData({
        picUrl: app.globalData.song.al ? app.globalData.song.al.picUrl : "/images/cd.png",
        currentIndex: e.currentTarget.dataset.index,
        isOpen: false,
        isPlaying: true,
      });
    }
  },

  /**
   * 组件的生命周期函数
   */
  lifetimes: {
    ready(){
      // 初始化本地数据
      this.setData({
        playList: app.globalData.currentPlayList,
        picUrl: app.globalData.song.al ? app.globalData.song.al.picUrl : "/images/cd.png",
        currentIndex: app.globalData.currentPlayIndex,
        isPlaying: !app.globalData.player.paused
      });


      // 注册全局函数

      // 在app中注册可播放的函数,设置CD封面
      app.setCDCover.push(() => {
        this.setData({
          picUrl: app.globalData.song.al ? app.globalData.song.al.picUrl : "/images/cd.png",
          currentIndex: app.globalData.currentPlayIndex
        });
      })

      // 在app中注册开始播放的函数
      app.playFun.push(() => {
        this.setData({
          isPlaying: true
        });
      })

      // 在app中注册暂停播放的函数
      app.pauseFun.push(() => {
        this.setData({
          isPlaying: false
        });
      })

      // 在app中注册播放结束的函数
      app.endFun.push(() => {
        this.setData({
          isPlaying: false
        });
      })
    }
  }
})
