// pages/soter/soter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: "white",
    bgc: "#ffooff",
    title: "打开私密相册",
    showImg: false,
    photoPaths: ["https://gw.alicdn.com/bao/uploaded/i1/4145993181/O1CN01vsc4w41ZMwT0gQm48_!!0-item_pic.jpg_230x230", "https://gw.alicdn.com/bao/uploaded/i2/2204102814612/O1CN01J7uZRe1jwLEz9LLwZ_!!0-item_pic.jpg_230x230", "https://gw.alicdn.com/bao/uploaded/i1/678185896/O1CN01iD5GBO1tQPmwUQlXK_!!0-item_pic.jpg_230x230", "https://gw.alicdn.com/bao/uploaded/i3/2240225493/O1CN01whAWMr1qRqB0Wi5JM_!!0-item_pic.jpg_230x230", "https://gw.alicdn.com/bao/uploaded/i2/2187138540/O1CN01y6UABF2CxMy0Uu73f_!!0-item_pic.jpg_230x230"],
    showBigImg: false,
    currentPath: "https://gw.alicdn.com/bao/uploaded/i2/2187138540/O1CN01y6UABF2CxMy0Uu73f_!!0-item_pic.jpg_230x230",

  },
  // 执行生物认证的函数
  startSoter() {
    const self = this;
    wx.startSoterAuthentication({
      requestAuthModes: ["fingerPrint", "facial"],
      challenge: '赫赫',
      authContent: "伸出手指",
      success() {
        wx.showToast({
          title: '验证成功',
        })

        // 隐藏生物认证按钮，并显示相册
        self.setData({
          showImg: true
        })
      },
      fail() {
        self.setData({
          color: "red",
          bgc: "blue",
          title: "认证失败"
        })
      }
    })
  },
  updateBtn() {

    wx.chooseImage({
      count: 9,
      success: (res) => {
        this.setData({
          photoPaths: this.data.photoPaths.concat(res.tempFilePaths)
        })
      },
    })
  },

  // 展示大图
  showImg(e) {
    console.log(e)
    this.setData({
      showBigImg: true,
      currentPath: e.currentTarget.dataset.url
    })
  },
  hideImg() {
    this.setData({
      showBigImg: false
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})