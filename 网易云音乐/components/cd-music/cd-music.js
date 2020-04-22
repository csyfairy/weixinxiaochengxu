// components/cd-music/cd-music.js

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
    // 当前播放器是否正在播放
    isPlaying: false,
    // 当前播放歌曲的封面图片url
    url: "/images/cd.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到播放页
    goToPlayer(){
      wx.navigateTo({
        url: '/pages/player/player',
      })
    }
  },

  // 组件生命周期函数
  lifetimes: {
    //挂载函数,当组件挂载时,
    ready() {
      // 设置CD封面的函数
      this.setCover = (song) => {
        // 如果存在当前播放给的音乐,就设置封面
        if (song) {
          this.setData({
            isPlaying: !app.globalData.player.paused,
            url: song.al ? song.al.picUrl : song.album.picUrl
          });
        }
      }
      this.setCover(app.globalData.song);
      // 把组件中的函数传入全局app中, 这样全局app可以修改当前cd封面了
      app.setCDCover.push(this.setCover)

      // 在app中注册开始播放的函数
      app.playFun.push(()=>{
        this.setData({
          isPlaying: true
        });
      })

      // 在app中注册暂停播放的函数
      app.pauseFun.push(() =>{
        this.setData({
          isPlaying: false
        });
      })

      // 在app中注册播放结束的函数
      app.endFun.push(() =>{
        this.setData({
          isPlaying: false
        });
      })

    }
  }
})
