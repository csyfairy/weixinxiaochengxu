// pages/soter/soter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: "while",
    bgc: "#00ff00",
    title: "打开私密相册",
    showImage: false,
    photoPath: [
      "http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
      "http://b2-q.mafengwo.net/s5/M00/91/06/wKgB3FH_RVuATULaAAH7UzpKp6043.jpeg",
"http://bbs.lyd.com.cn/data/attachment/forum/dvbbs/2009-10/2009102511405945827.jpg",
      "http://a3.att.hudong.com/65/38/16300534049378135355388981738.jpg",
      "http://a4.att.hudong.com/22/59/19300001325156131228593878903.jpg"
    ],
    // 控制大图显示
    showpge:false,
    // 当前大图显示路径
    currentImgPath: "http://b2-q.mafengwo.net/s5/M00/91/06/wKgB3FH_RVuATULaAAH7UzpKp6043.jpeg",
  },


  // 执行生物认证函数(指纹,人脸识别)
  startSoter() {
    const self = this;
    // 生物认证方式
    wx.startSoterAuthentication({
      // fingerPrint指纹  facial人脸
      requestAuthModes: ["fingerPrint", "facial"],
      // 挑战因子,主要构造数据安全
      challenge: '呵呵',
      // 提示信息
      authContent: "请伸出手指",
      // 验证成功
      success(res) {
        wx.showToast({
          title: '验证通过',
        })
        // 隐藏认证按钮显示私密相册
        self.setData({
          showImage: true
        })
      },
      fail() {
        self.setData({
          color: "red",
          bgc: "gray",
          title: "生物验证失败"
        })

        self.setData({
          showImage: true
        })
      }
    })
  },

  // 上传图片的函数
  updataBtn(){
    wx.chooseImage({
      success: (res)=> {
        this.setData({
          photoPath: this.data.photoPath.concat(res.tempFilePaths)
        })
      },
    })
  },
  showBig(e){
    console.log(e)
    this.setData({
      showpge:true,
      currentImgPath: e.currentTarget.dataset.url
    })
  },
  hideBig(){
    this.setData({
      showpge: false,
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