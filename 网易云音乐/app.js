//app.js

import { 
  userInfoRequest,
  songUrlRequest,
  lyricRequest,
  userPlayListIdRequest,
  userPlayListInfoRequest,
} from "/utils/network.js"

App({
  // 小程序启动函数
  onLaunch: function () {
    //获取全局唯一的背景音频管理器。 小程序切入后台，如果音频处于播放状态，可以继续播放
    this.globalData.player = wx.getBackgroundAudioManager();

    // 添加一系列监听事件

    // 监听背景音频进入可播放状态事件。 但不保证后面可以流畅播放,在这里在这里设置CD封面
    this.globalData.player.onCanplay(() => {
      if (this.setCDCover.length > 0) {
        this.setCDCover.forEach(function (funItem) {
          funItem(this.globalData.song);
        }.bind(this))
      }
    })

    // 监听背景音频开始播放事件, 在这里使CD开始旋转
    this.globalData.player.onPlay(() => {
      if (this.playFun.length > 0) {
        this.playFun.forEach(funItem=>{
          funItem();
        })
      }
    })

    // 监听背景音频暂停事件,在这里使CD停止旋转
    this.globalData.player.onPause(() => {
      if (this.pauseFun.length > 0) {
        this.pauseFun.forEach(funItem => {
          funItem();
        })
      }
    })

    // 监听背景音频播放进度更新事件，只有小程序在前台时会回调,在这里更新进度条和时间
    this.globalData.player.onTimeUpdate(()=>{
      if(this.timeupdate) {
        this.timeupdate(this.globalData.player.currentTime);
      }
    })

    // 监听背景音频自然播放结束事件, 在这里跳转到下一首音乐
    this.globalData.player.onEnded(() => {
      // 如果播放列表为空, 就重播
      if (!this.globalData.currentPlayList) {
        this.setMusic(this.globalData.song);
        return;
      }
      // 如果有播放列表,就播放下一首
      this.playNext()

      // 调用播放结束的函数
      if (this.endFun.length > 0) {
        this.endFun.forEach(funItem => {
          funItem();
        })
      }
    })

    // 监听背景音频播放错误事件
    this.globalData.player.onError(() => {
      console.log("音频播放错误");
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
        this.globalData.userInfo = data.profile;
      }).catch(err => {
        wx.showToast({
          title: err.message,
          icon: "none"
        })
      });

      // 发起网络请求，获取用户歌单id（s）
      userPlayListIdRequest(this.globalData.uid).then(data => {
        // console.log(data)
        // 获取的是用户的所有歌单, 不包含歌单信息
        this.globalData.myPlayListId = data.playlist[0].id;
        // 根据歌单id，获取歌单详情
        this.refreshMyPlayList(data.playlist[0].id);
      });
    }
  },
  // 刷新歌单信息
  refreshMyPlayList(id) {
    // 发起网络请求，获取歌单详细信息
    userPlayListInfoRequest(id).then(data => {
      console.log(data)
      // 当前可能在播放我的歌单（currentPlayList = myPlayList）
      // 当前也能在播放其他歌单（currentPlayList = 其他歌单）
      if (this.globalData.currentPlayList == this.globalData.myPlayList) {
        this.globalData.currentPlayList = data.playlist.tracks;
        // 获取对应歌曲，进行播放准备
        let song = this.globalData.currentPlayList[this.globalData.currentPlayIndex];
        // 默认开始播放用户歌单中的第一首音乐
        this.setMusic(song);
      }
      // 刷新我的歌单
      this.globalData.myPlayList = data.playlist.tracks;
    });
  },
  // 设置播放器歌曲路径、名字等信息
  setMusic(song) {
    console.log(song);
    // 记录当前正在播放的歌曲
    this.globalData.song = song;
    // 使用音乐id请求歌曲的url
    songUrlRequest(song.id).then(urldata => {
      // console.log(urldata)
      // 即使你有歌曲id，也可能拿不到歌曲url（有些歌曲需要vip或者会员）
      if (!urldata.data[0].url) { return }
      // 播放歌曲
      this.globalData.player.src = urldata.data[0].url;  // 音频地址, 
      this.globalData.player.title = song.name;   // 音频标题(必填)
      // this.globalData.player.play();   //设置音频url后自动播放

      // 请求歌词
      lyricRequest(song.id).then(lyricdata => {
        // console.log(lyricdata)
        if (lyricdata.lrc) {
          this.globalData.song.lyric = lyricdata.lrc.lyric;
          // 更新歌词
          if (this.updateLyric){
            this.updateLyric(lyricdata.lrc.lyric)
          }
        } else {
          this.globalData.song.lyric = "";
        }
      });
    });
  },
  // 重置当前播放列表
  setCurrentPlayList(list) {
    // 记录当前播放的歌单
    this.globalData.currentPlayList = list;
    // 设置当前正在播放歌曲的索引(默认先播放第一首)
    this.globalData.currentPlayIndex = 0;
    // 开始播放歌单中的第一首
    this.setMusic(this.globalData.currentPlayList[this.globalData.currentPlayIndex]);
    // 播放类型设置为顺序播放
    this.globalData.playType = "loop"
  },
  // 播放下一首
  playNext() {
    // 用变量记录下一首音乐在当前歌单中的索引
    let index = 0;
    switch (this.globalData.playType) {
      case "loop":
        index = this.globalData.currentPlayIndex + 1;
        if (index >= this.globalData.currentPlayList.length) {
          index = 0;
        }
        break;
      case "single":
        index = this.globalData.currentPlayIndex
        break;
      case "random":
        var count = this.globalData.currentPlayList.length;
        index = Math.floor(Math.random() * count)
        break;
      default:
        break;
    }
    // 更新当前播放索引
    this.globalData.currentPlayIndex = index;
    // console.log(index)
    // 重新开始播放索引的音乐
    this.setMusic(this.globalData.currentPlayList[this.globalData.currentPlayIndex]);
  },

  // 播放上一首
  playPrev() {
    let index = 0;
    switch (this.globalData.playType) {
      case "loop":
        index = this.globalData.currentPlayIndex - 1;
        if (index < 0) {
          index = this.globalData.currentPlayList.length - 1
        }
        break;
      case "single":
        index = this.globalData.currentPlayIndex
        break;
      case "random":
        var count = this.globalData.currentPlayList.length;
        index = Math.floor(Math.random() * count)
        break;
      default:
        break;
    }
    this.globalData.currentPlayIndex = index;
    this.setMusic(this.globalData.currentPlayList[this.globalData.currentPlayIndex]);
  },

  // 全局状态管理数据
  globalData: {
    // 用户的userId
    uid: "",
    // 账号信息
    userInfo: null,
    // 全局唯一的音乐播放器对象
    player: null,
    // 当前正在播放的歌曲
    song: null,
    // 我的收藏歌单(用户歌单)
    myPlayList: null,
    // 我的收藏歌单的ID
    myPlayListId : null,
    // 当前正在播放的歌单
    currentPlayList: null,
    // 当前正在播放歌曲的索引
    currentPlayIndex: 0,
    // 定义当前歌曲的播放类型（loop循环播放 single单曲循环 random随机播放）
    playType: "loop",
  },


  // 修改CD封面的函数, 因为有多个页面创建了cd小浮标, 所以就有多个cd小浮标组件, 每一个组件中都有一个设置封面的函数, 所以需要把每一个组件的函数记录下来, 统一设置每一个组件中的CD封面(通知机制)
  setCDCover: [],

  // 音乐开始播放的函数组
  playFun: [],

  // 音乐暂停播放的函数组
  pauseFun: [],

  // 音乐自然播放结束的函数组
  endFun:[],

  // 音乐进度更新函数
  timeupdate: null,

  // 更新歌词的函数
  updateLyric: null,

  //  如果一个数据状态的改变需要同步显示到多个界面, 就需要用到(通知机制/同步机制),实现步骤: 
  // 1, 在app.js中定义全局变量, 用于记录各个页面的数据同步函数
  // 2, 在需要数据同步的页面创建本地函数,然后注册给app.js中的全局变量 (把本地函数添加到全局数组)
  // 3, 在app.js中监测数据变化, 调用全局变量中的函数, 进行数据同步


})