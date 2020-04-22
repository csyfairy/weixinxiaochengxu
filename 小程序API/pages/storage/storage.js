// pages/storage/storage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showImg: false,
    photoPaths: ["https://gw.alicdn.com/bao/uploaded/i1/4145993181/O1CN01vsc4w41ZMwT0gQm48_!!0-item_pic.jpg_230x230", "https://gw.alicdn.com/bao/uploaded/i2/2204102814612/O1CN01J7uZRe1jwLEz9LLwZ_!!0-item_pic.jpg_230x230", "https://gw.alicdn.com/bao/uploaded/i1/678185896/O1CN01iD5GBO1tQPmwUQlXK_!!0-item_pic.jpg_230x230", "https://gw.alicdn.com/bao/uploaded/i3/2240225493/O1CN01whAWMr1qRqB0Wi5JM_!!0-item_pic.jpg_230x230", "https://gw.alicdn.com/bao/uploaded/i2/2187138540/O1CN01y6UABF2CxMy0Uu73f_!!0-item_pic.jpg_230x230"],
    showBigImg: false,
    // 大图显示索引
    currentIndex: 0,
  },
  //上传图片 
  updateBtn() {
    wx.chooseImage({
      count: 9,
      success: (res) => {
        this.setData({
          photoPaths: this.data.photoPaths.concat(res.tempFilePaths)
        })
        // 保存图片
        this.save();
      },
    })
  },

  // 展示大图
  showImg(e) {
    console.log(e)
    this.setData({
      showBigImg: true,
      currentIndex: e.currentTarget.dataset.index
    })
  },
  hideImg() {
    this.setData({
      showBigImg: false
    })
  },
  // 本地保存
  save() {
    wx.setStorage({
      key: 'photos',
      data: this.data.photoPaths,
    })
  },

  // 删除
  removeImg() {
    // 通过索引删除
    var temp = this.data.photoPaths
    temp.splice(this.data.currentIndex, 1)
    this.setData({
      photoPaths: temp,
    })
    // 更新本地数据
    this.save();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 页面加载读取本地数据
    wx.getStorage({
      key: 'photos',
      success: (res) => {
        this.setData({
          photoPaths: res.data,
        })
      },
    })
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