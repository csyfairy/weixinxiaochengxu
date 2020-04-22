// pages/media/media.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 记录当前录音的时间
    recordTime: 0,
    // 记录录音地址,和时长,数组中放时长
    recordPaths: [],
    // 视频地址变量
    src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    // 弹幕列表
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 2s 出现的弹幕',
        color: '#00ff00',
        time: 2
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }
    ],
    // 当前输入框输入的弹幕信息
    danmu:""
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.audio = wx.createInnerAudioContext()

    // 初始化音频对象
    this.audio.src = "/img/deFenJiQiao.mp3"

    // 创建录音管理器
    this.recorderManager = wx.getRecorderManager();
    // 监听开始录音开始事件
    this.recorderManager.onStart(() => {
      // 开启计时器,记录当前录音的时间
      this.timer = setInterval(() => {
        this.setData({
          recordTime: this.data.recordTime + 1 
        })
      }, 100)
    })


// 监听录音停止
    this.recorderManager.onStop((res) => {
      // 停止计时器
      clearInterval(this.timer)

      // 播放
      wx.playVoice({
        filePath: res.tempFilePath,
        fail: (err) => {
          console.log(err)
        }
      })

      // 把录音文件的本地地址记录下来
      var temp = this.data.recordPaths
      temp.push({ "path": res.tempFilePath, "time": (res.duration / 1000).toFixed(2)})
      this.setData({
        recordPaths: temp,
        recordTime: 0
      })

    })


    // 创建视频对象
    this.videoContext = wx.createVideoContext("myVideo", this)
  },

  // 监听录音结束事件




  // 播放音频
  play() {
    this.audio.play();
  },
  // 暂停音频
  pause() {
    this.audio.pause();
  },


  // 开始录音
  startRecord() {
    // // 使用录音管理器(得到的是一个文件地址)
    this.recorderManager.start({
      // 限制录音时长 单位毫秒 
      duration: 6000,
      format: "mp3"
    })

    // 已停止维护老api (得到的是bass64编码的录音,新api得到的是一段视频文件)
    // wx.startRecord({
    //   // 录音完成执行的回调
    //   success: (res) => {
    //     var temp = this.data.recordPaths
    //     temp.push(res.tempFilePath)
    //     this.setData({
    //       recordPaths: temp
    //     })
    //   }
    // })
  },
  // 结束录音
  stopRecord() {
    // 用录音管理器结束录音
    this.recorderManager.stop()

    // 老API
    // wx.stopRecord()
  },

  // 老API播放录音的函数,只能播 wx.startRecord的录音
  playRecord(e) {
    console.log(e.currentTarget.dataset.path)
    //   wx.playVoice({
    //     filePath: e.currentTarget.dataset.path,
    //   })

    // 用新API音频对象
    this.audio.src = e.currentTarget.dataset.path;
    this.audio.play();
  },



  // 弹幕数据
  bindInputBlur(e) {
    // 用全局变量记录输入的弹幕信息
    this.danmu = e.detail.value
  },


// 选择视频
  getVideo(e){
    // 拍摄视频或从手机相册中选择
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      success:(res)=>{
        this.setData({
          src:res.tempFilePath,
        })
      }
    })
  },

  // 发送弹幕
  sendDanmu() {
    this.videoContext.sendDanmu({
      text: this.danmu,
      color: this.getRandomColor()
    })
  },

  getRandomColor() {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  },

  // 选择视频









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