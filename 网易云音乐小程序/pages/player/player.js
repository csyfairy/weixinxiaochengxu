// pages/player/player.js

const app = getApp();
import { playlistTracks } from "../../utils/network.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前播放的歌曲
    song: null,
    // 显示歌词或者图片 (pic表示显示头像, lyric表示显示歌词)
    songInfoType: "pic",
    // 歌词数组
    lyricArr: null,
    // 当前唱到哪一行了 
    line: 0,
    // 歌曲播放进度
    progress: 0,
    // 歌曲播放当前时间
    current: 0,
    // 歌曲播放总时间
    duration: 0,
    // 是否处于播放状态
    isPlaying: true,
    // 当前的播放类型（loop循环播放 single单曲循环 random随机播放）
    playType: "loop",
    // 当前歌曲是否被收藏
    isFavorite: false
  },

  //初始化歌曲信息
  initData() {
    // console.log(app.globalData.player.duration)

    this.setData({
      // 显示当前歌曲对象
      song: app.globalData.song,
      // 获取当前歌词
      lyricArr: this.lyric(app.globalData.song ? app.globalData.song.lyric : ""),
      // 默认歌词从第一行开始
      line: 0,
      // 获取当前播放的歌曲总时间
      duration: app.globalData.player.duration || 0,
      // 获取当前音乐的播放或暂停
      isPlaying: !app.globalData.player.paused,
      // 获取当前音乐的播放类型
      playType: app.globalData.playType,
      isPlaying: true
    })
    wx: wx.setNavigationBarTitle({
      title: this.data.song ? this.data.song.name : "未知",
    })
  },

  // 点击切换歌词或者图片
  switchLyricOrPic() {
    if (this.data.songInfoType == "pic") {
      this.setData({
        songInfoType: "lyric"
      })
    } else {
      this.setData({
        songInfoType: "pic"
      })
    }
  },

  //  格式化歌词的函数
  lyric(lrc) {
    let temp = [];
    let reg = /\[(\d{2}):(\d{2})\.(\d{1,3})\](.*)/g;
    let result = reg.exec(lrc);
    // console.log(result)
    while (result != null) {
      let time = result[1] * 60 + result[2] * 1 + result[3] * 1 / 1000;
      let content = result[4];
      // console.log(time,"12131",content)
      temp.push({
        time,
        content
      });
      result = reg.exec(lrc);
    }
    return temp;
  },

  // 音乐进度更新函数
  musicUpdate(time) {
    // console.log(time)
    // 更新本地数据
    this.setData({
      current: time, // 更新音乐播放时间
      // 更新进度条进度
      progress: time / this.data.duration * 100
    });
    for (let i = this.data.lyricArr.length - 1; i >= 0; i--) {
      let item = this.data.lyricArr[i];
      if (item.time <= time) {
        if (this.data.line != i) {
          this.setData({
            line: i
          })
        }
        break;
      }
    }
  },

  // 通过滑动手动调节进度
  progressChange(e) {
    app.globalData.player.seek(e.detail.value / 100 * this.data.duration)
  },

  // 播放暂停按钮
  pauseOrPlayClick() {

    if (this.data.isPlaying) {
      app.globalData.player.pause();
    } else {
      app.globalData.player.play();
    }
    this.setData({
      isPlaying: app.globalData.player.paused
    })
  },

  // 点击上一首
  prevClick() {
    app.globalData.player.stop();
    app.playPrev();
    // 刷新本地的显示数据
    this.initData();
    // 切换音乐之后默认播放
    this.setData({
      isPlaying: true
    })
  },

  // 点击下一首
  nextClick() {
    app.globalData.player.stop();
    app.playNext();
    this.initData();
    this.setData({
      isPlaying: true
    })
  },

  // 切换播放类型
  switchPlayType(e) {
    this.setData({
      playType: e.currentTarget.dataset.type
    })
    app.globalData.playType = e.currentTarget.dataset.type;
  },

  // 同步歌词
  updateLyric(lyr) {
    this.setData({
      lyricArr: this.lyric(lyr)
    })
  },

  // 点击关注或取消关注
  favoriteClick() {

    if (!app.globalData.uid) {
      wx.showModal({
        title: '温馨提示',
        content: '需要登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return
    }

    let op = this.data.isFavorite ? "del" : "add";
    playlistTracks(op, app.globalData.myPlayListId, this.data.song.id).then(data => {
      if (data.code == 200) {
        if (op == "del") {
          // 删除操作
          this.setData({
            isFavorite: false
          });
          // 从本地我的歌单中找到这首音乐,删掉
          for (let i = 0; i < app.globalData.myPlayList.length; i++) {
            if (app.globalData.myPlayList[i].id == this.data.song.id) {
              app.globalData.myPlayList.splice(i, 1);
              break;
            }
          }
          console.log("取消收藏")
        } else if (op == "add") {
          // 增加操作
          this.setData({
            isFavorite: true
          });
          // 把这个音乐添加到本地歌单, (更新本地歌单)
          app.globalData.myPlayList.push(this.data.song);
          console.log("收藏")
        }
      }
    });
  },


  // 判断首歌曲是否被收藏
  checkInMyPlayList() {
    // console.log(app.globalData.myPlayList)
    this.setData({
      isFavorite: app.globalData.myPlayList.some((s) => {
        //如果我的收藏歌单中的某一个歌曲id和当前正在播放的歌曲id相同,说明此音乐已收藏
        return s.id == this.data.song.id;
      })
    })
    // console.log(this.data.isFavorite)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
    this.checkInMyPlayList();
    // 给app.js中注册音乐进度更新函数
    app.timeupdate = this.musicUpdate;
    app.updateLyric = this.updateLyric
    app.setCDCover.push(this.initData)
  },

  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () { },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})