// pages/media/media.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 记录当前录音的时间
    recordTime: 0,
    // 记录录音地址和时长, 数组中放对象, 
    recordPaths: [],
    // 视频地址
    src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    // 弹幕列表
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '男主好帅!!!!!!',
        color: '#00ff00',
        time: 2
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#0000ff',
        time: 3
      }
    ],
    // 当前输入框输入的弹幕信息
    danmu: ""
  },

  onLoad: function () {
    // 创建 InnerAudioContext 音频对象
    this.audio = wx.createInnerAudioContext()
    // 初始化音频对象
    this.audio.src = "/img/deFenJiQiao.mp3"

    // 创建视频对象
    this.videoContext = wx.createVideoContext("myVideo", this)


    // 创建录音管理器
    this.recorderManager = wx.getRecorderManager()
    // 监听开始录音事件
    this.recorderManager.onStart(function(){
      // 开启计时器,记录当前录音的时间
      this.timer = setInterval(()=>{
        this.setData({
          recordTime : this.data.recordTime + 1
        })
      }, 100)
    }.bind(this))
    // 监听停止录音事件
    this.recorderManager.onStop(function(res){
      // 停止计时器
      clearInterval(this.timer)
      // 把录音文件的本地临时地址记录下来
      var temp = this.data.recordPaths;
      temp.push({"path": res.tempFilePath, "time": (res.duration/1000).toFixed(2)})
      this.setData({
        recordPaths : temp,
        recordTime : 0
      })
    }.bind(this))

  },

  // 播放音频
  play(){
    this.audio.play();
  },

  // 暂停音频
  pause(){
    this.audio.pause();
  },

  // 开始录音
  startRecord(){
    // 用录音管理器开始录音 (得到的是一个音频文件地址)
    this.recorderManager.start({
      // 限制录音时长, 单位 ms
      duration: 6000
    })
    
    // 已停止维护的老API (得到的是base64编码的录音文件地址)
    // wx.startRecord({
    //   // 录音完成执行的回调
    //   success: res=>{
    //     var temp = this.data.recordPaths;
    //     temp.push(res.tempFilePath)
    //     this.setData({
    //       recordPaths: temp,
    //     })
    //   }
    // })
  },

  // 结束录音
  stopRecord(){
    // 用录音管理器结束录音
    this.recorderManager.stop()

    // 已停止维护的老API
    // wx.stopRecord();
  },

  // 播放录音的函数
  playRecord(e){
    console.log(e.currentTarget.dataset.path)
    // 已停止维护的老API,播放这个录音文件 (只能播放wx.startRecord()的录音)
    // wx.playVoice({
    //   filePath: e.currentTarget.dataset.path
    // })

    // 用新API音频对象播放
    this.audio.src = e.currentTarget.dataset.path;
    this.audio.play()
  },


  // 弹幕输入框数据同步
  bindInputBlur(e){
    // 记录输入的弹幕信息
    this.setData({
      danmu : e.detail.value
    })
  },

  // 选择视频
  getVideo(){
    // 拍摄视频或从手机相册中选视频
    wx.chooseVideo({
      sourceType: ['album', 'camera'] , //视频来源
      success:res=>{
        // 记录选则的这个视频
        this.setData({
          src: res.tempFilePath
        })
      }
    })
  },

  // 发送弹幕
  sendDanmu(){
    // 用视频对象发送弹幕
    this.videoContext.sendDanmu({
      text: this.data.danmu,
      color: this.getRandomColor()
    })
    // 重置输入框
    this.setData({
      danmu : ""
    })
  },

  // 随机颜色的函数
  getRandomColor() {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
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