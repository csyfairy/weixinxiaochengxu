// pages/soter/soter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color:'#fff',
    bgco:'green',
    title:'打开私密相册',
    showImgs:true,
    // 当前大图显示路径
    currentImgPath:'/img/0.jpg',
    // 控制大图是否显示
    showBigImg:false,
    photoPaths:[
      "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg",
      "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg",
      "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
    ]
  },
// 执行生物验证的函数(指纹和人脸识别)
  startSoter(){
    let self = this
    // 开始生物认证
    wx.startSoterAuthentication({
      // 生物认证方式：支持 fingerPrint指纹，facial人脸
      requestAuthModes: ["fingerPrint","facial"],
      // 挑战因子，主要负责数据安全
      challenge: '挑战因子',
      // 提示信息
      authContent:"请伸出你的手指",
      // 验证成功的回调
      success(){
        wx.showToast({
          title: '验证通过',
        })
      // 隐藏生物认证按钮，并显示私密相册
      self.setData({
        showImgs:true
      })
      },
      fail(){
        self.setData({
          color:'red',
          bgco:"gray",
          title:"生物认证失败"
        })
      }
    })
  },

  // 上传图片的函数
  updateBtn(){
    wx.chooseImage({
      count:9,
      success: (res)=>{
        this.setData({
          photoPaths:this.data.photoPaths.concat(res.tempFilePaths)
        })
      },
    })
  },

// 展示大图的函数
showBig(e){
  this.setData({
    showBigImg:true,
    currentImgPath:e.currentTarget.dataset.url
  });
  console.log(e);
},

// 隐藏大图的操作
hideBig(){
  this.setData({
    showBigImg:false
  })
},















  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = '白衣'
    backgroundAudioManager.epname = '风起天阑'
    backgroundAudioManager.singer = '河图'
    backgroundAudioManager.coverImgUrl = 'https://p2.music.126.net/Jcv5rY1Pq6u9dPrPZYH0lQ==/58274116284443.jpg?param=34y34'
    backgroundAudioManager.src = 'https://m701.music.126.net/20200304175547/4215513fcf076c8b0e58aafff756f176/jdyyaac/535a/035f/0052/d020a12f0145392b15d4782227ed121b.m4a'
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