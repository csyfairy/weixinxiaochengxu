// pages/player/player.js

const app = getApp();

import { updateMyPlayListRequest } from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 显示歌词或者图片 (pic表示显示头像, lyric表示显示歌词)
    songInfoType: "lyric",
    // 当前播放的歌曲
    song: null,
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
  // 初始化数据
  initData() {
    this.setData({
      // 获取当前正在播放的音乐信息
      song: app.globalData.song, 
      // 获取当前歌曲的歌词
      lyricArr: this.lyric(app.globalData.song ? app.globalData.song.lyric : ""),
      // 默认歌词从第一行开始
      line: 0,
      // 获取当前播放的歌曲总时间
      duration: app.globalData.player.duration || 0,
      // 获取当前音乐的播放或暂停
      isPlaying: !app.globalData.player.paused,
      // 获取当前音乐的播放类型
      playType: app.globalData.playType
    });
    // 设置本页标题为歌曲名
    wx.setNavigationBarTitle({
      title: this.data.song ? this.data.song.name : "未播放",
    })
    //检测歌曲是否被收藏（在我的歌单里面）
    this.checkInMyPlayList()
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    // 初始化数据
    this.initData()
    console.log(this.data.song)
    // 给app.js中注册音乐进度更新函数
    app.timeupdate = this.musicUpdate;
    // 给app.js中注册歌词更新函数
    app.updateLyric = this.updateLyric;
    // 给app.js中注册音乐可播放函数,初始化数据
    app.setCDCover.push(this.initData)
  },

   //点击切换歌词或者图片
  switchLyricOrPic() {
    if (this.data.songInfoType == "lyric") {
      this.setData({
        songInfoType: "pic"
      })
    } else {
      this.setData({
        songInfoType: "lyric"
      })
    }
  },

  // 音乐进度更新函数, 参数是当前音乐播放的时间
  musicUpdate(time){
    // 更新本地数据
    this.setData({
      current: time,  // 更新音乐播放时间
      // 更新进度条进度
      progress: time / this.data.duration * 100    
    });

    // 更新歌词展示, (计算当前显示歌词的函数)
    for (let i = this.data.lyricArr.length - 1; i >= 0; i--) {
      let item = this.data.lyricArr[i];
      // item.time <=  time 倒着遍历找到了当前正在播放的歌词
      // 如果这句歌词的起始时间,小于当前歌曲的播放时间,说明已经播放到了这句歌词
      if (item.time <= time) {
        // this.data.line == i 从上一行唱到了下一行
        if (this.data.line != i) {
          this.setData({
            line: i   // 更新当前行数
          });
        }
        break;
      }
    }
  },

  // 通过滑动条手动调节进度
  progressChange(e) {
    // 是音频管理器跳转到对应的位置，单位 s
    app.globalData.player.seek(e.detail.value / 100 * this.data.duration);
  },

  // 上一首
  prevClick(){
    // 先停止当前播放的音乐
    app.globalData.player.stop();
    // 调用播放上一首的函数
    app.playPrev();
    // 刷新本地的显示数据
    this.initData();
    // 切换音乐之后默认播放
    this.setData({
      isPlaying: true
    })
  },

  // 播放暂停
  pauseOrPlayClick(){
    if (this.data.isPlaying) {
      app.globalData.player.pause();
    } else {
      app.globalData.player.play();
    }
    this.setData({
      isPlaying: app.globalData.player.paused
    })
  },

  // 下一首
  nextClick(){
    app.globalData.player.stop();
    app.playNext();
    this.initData();
    this.setData({
      isPlaying: true
    })
  },

  // 同步歌词
  updateLyric(lyric){
    this.setData({
      lyricArr: this.lyric(lyric)
    })
  },

  // 切换播放类型
  switchPlayType(e){
    this.setData({
      playType: e.currentTarget.dataset.type
    });
    // 全局记录播放类型
    app.globalData.playType = e.currentTarget.dataset.type;
  },

  // 收藏与取消收藏
  favoriteClick(){
    if(!app.globalData.uid){
      wx.showModal({
        title: '温馨提示',
        content: "需要登录",
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return;
    }
    
    let op = this.data.isFavorite ? "del" : "add";
    updateMyPlayListRequest(op, app.globalData.myPlayListId, this.data.song.id).then(data => {
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

  /**
   * 检测歌曲是否被收藏（在我的歌单里面）
   */
  checkInMyPlayList() {
    // console.log(this.data.song.id);
    // console.log(app.globalData.myPlayList);
    this.setData({
      isFavorite: app.globalData.myPlayList.some((s) => {
        //如果我的收藏歌单中的某一个歌曲id和当前正在播放的歌曲id相同,说明此音乐已收藏
        return s.id == this.data.song.id;
      })
    })
  },

  // 格式化歌词的函数, 歌词默认是字符串需要格式化成数组
  lyric(lrc){
    // 存放歌词数据的临时数组
    let temp = [];
    // 正则匹配
    let reg = /\[(\d{2}):(\d{2})\.(\d{1,3})\](.*)/g;
    let result = reg.exec(lrc);
    while(result != null) {
      // console.log(result);
      // 计算这句歌词显示的时刻点(秒数), 跟player播放器的播放秒数对应
      let time = result[1] * 60 + result[2] * 1 + result[3] * 1 / 1000;
      // 拿到匹配的歌词
      let content = result[4]
      // 把这句歌词的时间和内容转化成对象结构,存入歌词数组
      temp.push({ time, content });
      // 继续匹配下一句歌词
      result = reg.exec(lrc);
    }
    // 返回格式化完成的歌词数组
    return temp;
  },










  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})