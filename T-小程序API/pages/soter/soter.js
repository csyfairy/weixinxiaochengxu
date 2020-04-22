// pages/soter/soter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: "while",
    bgc : "green",
    title: "打开私密相册",
    showImgs: false,
    photoPaths : [
      "https://07imgmini.eastday.com/mobile/20200304/2020030410_5ea3b0925fa14b5789a1dbf22ddb8205_3555_wmk.jpg",
      "https://imgmini.eastday.com/pushimg/20200113/114x66_1578901549975105.gif",
      "https://s3m.nzwgs.com/galileo/764173-b13d080dd2c0841afb2a94e060587d6a.jpg",
      "https://s3m.nzwgs.com/galileo/853764-63322fe57d4be6b7a4930b498660ff80.jpg",
    ],
    // 控制大图是否显示
    showBigImg: false,
    // 大图显示路径
    currentImgPath: "https://07imgmini.eastday.com/mobile/20200304/2020030410_5ea3b0925fa14b5789a1dbf22ddb8205_3555_wmk.jpg"
  },

  // 执行生物认证的函数(指纹,人脸识别)
  startSoter(){
    const self = this;
    // 开始生物认证
    wx.startSoterAuthentication({
      // 支持的生物认证方式fingerPrint指纹,facial人脸
      requestAuthModes: ["fingerPrint","facial"],
      // 挑战因子,主要负责数据安全
      challenge: '呵呵',
      // 提示信息
      authContent: "请伸出你的手指",
      // 验证成功的回调
      success(){
        wx.showToast({
          title: '验证通过',
        })

        // 隐藏生物认证按钮,并显示私密相册
        self.setData({
          showImgs: true
        })
      },
      fail(){
        self.setData({
          color: "red",
          bgc: "gray",
          title: "生物认证失败"
        })
      }
    })
  },

  // 上传图片的函数
  updateBtn(){
    wx.chooseImage({
      count: 9,
      success: (res)=>{
        this.setData({
          photoPaths: this.data.photoPaths.concat(res.tempFilePaths)
        })
      },
    })
  },

  // 展示大图的函数
  showBig(e){
    console.log(e)
    this.setData({
      showBigImg: true,
      currentImgPath: e.currentTarget.dataset.url
    })
  },

  // 隐藏大图的函数
  hideBig(){
    this.setData({
      showBigImg: false
    })
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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