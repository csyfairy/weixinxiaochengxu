const app = getApp();

var self = null;

Component({
  properties: {

  },
  data: {
    url: "/images/cd.png",
    isPlaying: false
  },
  methods: {
    // setCover() {
    //   // 当前函数会在app.js中调用,所以函数中的this会指向app
    //   // console.log("--->",this)
    //   // console.log("===>",self)
    //   // console.log(app.globalData.song)
    //   // 如果存在当前播放给的音乐,就设置封面
    //   if (app.globalData.song) {
    //     // console.log(app.globalData.song)
    //     // let p = app.globalData.song.album.picUrl ? app.globalData.song.album.picUrl : app.globalData.song.album.artist.img1v1Url
    //     self.setData({
    //       isPlaying: true,
    //       url: app.globalData.song.al ? app.globalData.song.al.picUrl : app.globalData.song.album.artist.img1v1Url
    //     });
    //     // console.log('--->', app.globalData.song.album.picUrl)
    //   }

    // },

    musicClick() {
      wx.navigateTo({
        url: '/pages/player/player',
      })
    }
  },
  lifetimes: {
    ready() {
      // // console.log("组件挂载")
      // self = this;
      // this.setCover()
      // app.globalData.setCDCover.push(this.setCover)
      this.setCover = (song) => {
        if (song) {
          this.setData({
            isPlaying: true,
            url: song.al ? song.al.picUrl : song.album.picUrl
          })
        }
      }
      this.setCover(app.globalData.song);
      app.setCDCover.push(this.setCover)

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