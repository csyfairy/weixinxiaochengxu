// pages/storage/storage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigImg: false,
    photoPath: [
      "https://bkimg.cdn.bcebos.com/pic/c2cec3fdfc03924583b3a2158594a4c27d1e25a1?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxODA=,xp_5,yp_5",
      "https://bkimg.cdn.bcebos.com/pic/f703738da97739123fcbca84fa198618377ae262?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxMTY=,xp_5,yp_5",
      "https://bkimg.cdn.bcebos.com/pic/3812b31bb051f81909c84cafd8b44aed2f73e762?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2U5Mg==,xp_5,yp_5",
      "https://bkimg.cdn.bcebos.com/pic/b21bb051f8198618a6aaa06148ed2e738ad4e662?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5",
      "https://bkimg.cdn.bcebos.com/pic/377adab44aed2e731f04c9c98501a18b86d6fa62?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxMTY=,xp_5,yp_5"
    ],
    currentIndex:0
  },
  showBig(e) {
    this.setData({
      bigImg: true,
      currentIndex: e.target.dataset.index
    })
  },
  updateBtn() {
    wx.chooseImage({
      count: 9,
      success: (res) => {
        this.setData({
          photoPath: this.data.photoPath.concat(res.tempFilePaths)
        },()=>{
          this.save('photoPath',this.data.photoPath)
        })
      },
    })
  },
  hideBig() {
    this.setData({
      bigImg: false
    })
  },
  save(key,data){
    wx.setStorage({
      key,data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'photoPath',
      success : (res) => {
        this.setData({photoPath:res.data})
      }
    })
  },
  removeImg(){
      let temp = this.data.photoPath
      temp.splice(this.data.currentIndex,1)
      
      if (this.data.currentIndex == -1){
        this.hideBig()
      }
      this.setData({
        photoPath:temp
      },()=>{
        this.save('photoPath', temp)
      })

      console.log(this.data.photoPath.length)
      if (this.data.currentIndex == this.data.photoPath.length) {
        this.setData({
          currentIndex: this.data.currentIndex - 1
        })
      }
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