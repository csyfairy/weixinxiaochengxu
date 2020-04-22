//app.js

import {
  userInfoRequest,
  songUrl,
  checkMusic,
  lyricRequest,
  userPlayListInfo,
  userPlaylist
} from "/utils/network.js"

App({
  // 小程序启动函数
  onLaunch: function () {
    // 全局唯一播放
    this.globalData.player = wx.getBackgroundAudioManager();

    // 监听音频可播放状态事件
    this.globalData.player.onCanplay(() => {
      if (this.setCDCover.length > 0) {
        this.setCDCover.forEach(function (funItem) {
          funItem(this.globalData.song);
        }.bind(this))
      }
    })

    this.globalData.player.onTimeUpdate(() => {
      if (this.timeupdate) {
        this.timeupdate(this.globalData.player.currentTime);
      }
    })

    // 监听暂停事件
    this.globalData.player.onPlay(() => {
      if (this.playFun.length > 0) {
        this.playFun.forEach(funItem => {
          funItem();
        })
      }
    })
    //监听暂停播放事件
    this.globalData.player.onPause(() => {
      if (this.pauseFun.length > 0) {
        this.pauseFun.forEach(funItem => {
          funItem();
        })
      }
    })

    this.globalData.player.onEnded(() => {
      if (!this.globalData.currentPlayList) {
        this.setMusic(this.globalData.song);
      } else {
        this.playNext();
      }
      if (this.endFun.length > 0) {
        this.endFun.forEach(funItem => {
          funItem();
        })
      }
    })

    // 初始化账号信息
    this.initData();


  },
  // 初始化数据
  initData() {
    // 从本地读取用户的uid
    this.globalData.uid = wx.getStorageSync("uid");
    // 如果有uid，那么就可以来获取用户信息
    if (this.globalData.uid) {
      // 发起网络请求，获取用户信息
      userInfoRequest(this.globalData.uid).then(data => {
        // console.log(2, data.profile)
        this.globalData.userInfo = data.profile;
      }).catch(err => {
        wx.showToast({
          title: err.message,
          icon: "none"
        })
      });
    }

    userPlaylist(this.globalData.uid).then(data => {
      // console.log(data)
      this.globalData.myPlayListId = data.playlist[0].id
      this.refreshMyPlayList(data.playlist[0].id)
    })
  },

  refreshMyPlayList(id) {
    userPlayListInfo(id).then(data => {
      // console.log(data)
      this.globalData.currentPlayList = data.playlist.tracks;
      this.globalData.myPlayList = data.playlist.tracks;
      this.setCurrentPlayList(this.globalData.currentPlayList, 0)
    })
  },

  setMusic(song) {
    // this.globalData.player.stop();
    this.globalData.song = song
    checkMusic(song.id).then(data => {
      // console.log(data)
      if (data.success) {
        songUrl(song.id).then(res => {
          // console.log(res)
          if (!res.data[0].url) {
            return
          }
          this.globalData.player.src = res.data[0].url; // 音频地址, 
          this.globalData.player.title = song.name; // 音频标题(必填)
        })
        lyricRequest(song.id).then(lyricdata => {
          if (lyricdata.lrc) {
            this.globalData.song.lyric = lyricdata.lrc.lyric;
            // 更新歌词
            if (this.updateLyric) {
              this.updateLyric(lyricdata.lrc.lyric)
            }
          } else {
            this.globalData.song.lyric = "";
          }
        })
      } else {
        wx.showToast({
          title: data.message,
          icon: 'none',
        })
      }
    })


  },

  setCurrentPlayList(list, index) {
    this.globalData.currentPlayList = list;
    // 设置当前正在播放歌曲的索引(默认先播放第一首)
    this.globalData.currentPlayIndex = index;
    this.setMusic(this.globalData.currentPlayList[this.globalData.currentPlayIndex])
    this.globalData.playType = "loop"
  },

  // 播放上一首
  playPrev() {
    let index = 0;
    switch (this.globalData.playType) {
      case "loop":
        index = this.globalData.currentPlayIndex - 1
        if (index < 0) {
          index = this.globalData.currentPlayList.length - 1;
        }
        break;
      case "random":
        var count = this.globalData.currentPlayIndex.length;
        index = Math.floor(Math.random() * count)
        break;
      case "single":
        index = this.globalData.currentPlayIndex
        break;
      default:
        break;
    }
    // this.globalData.currentPlayIndex = index;
    this.setCurrentPlayList(this.globalData.currentPlayList, index)
  },

  playNext() {
    let index = 0;
    switch (this.globalData.playType) {
      case "loop":
        index = this.globalData.currentPlayIndex + 1
        if (index > this.globalData.currentPlayList.length - 1) {
          index = 0;
        }
        break;
      case "random":
        var count = this.globalData.currentPlayIndex.length;
        index = Math.floor(Math.random() * count)
        break;
      case "single":
        index = this.globalData.currentPlayIndex
        break;
      default:
        break;
    }
    // this.globalData.currentPlayIndex = index;
    this.setCurrentPlayList(this.globalData.currentPlayList, index)
  },


  globalData: {
    // 用户的userId
    uid: "",
    // 账号信息
    userInfo: null,
    player: null,
    song: null,
    currentPlayList: null,
    // 我的收藏歌单(用户歌单)
    myPlayList: null,
    // 我的收藏歌单的ID
    myPlayListId: null,
    currentPlayIndex: 0,
    playType: "loop",
  },
  setCDCover: [],
  timeupdate: null,
  updateLyric: null,
  // 点击暂停暂停
  playFun: [],
  // 点击播放
  pauseFun: [],
  // 播放结束函数
  endFun: []

  // 如果一个数据状态改变需要同步显示到多个界面,就需要用到通知机制/同步机制
  // 1.在app.js中定义全局变量,用于记录各个页面的数据同步函数
  // 2.在需要数据同步的页面创建本地函数,然后注册给app.js的全局变量
})