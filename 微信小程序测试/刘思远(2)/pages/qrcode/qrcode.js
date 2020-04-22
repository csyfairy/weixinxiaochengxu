import qrCode from '../../utils/weapp-qrcode.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    message:'hello',
    showQrcode: false
  },
  makeQrcode(){
    this.setData({
      showQrcode:true
    })
    new qrCode('myQrcode',{
      text:this.data.message,
      width:200,
      height:200,
      padding:12,
      correntLevel:qrCode.CorrectLevel.H,
      callback:(res)=>{
        this.setData({
          qrCodePath:res.path
        })
      }
    })
  },
  updateMsg(e){
    this.setData({
      message:e.detail.value
    })  
  },
  saveQrcode(){
    wx.saveImageToPhotosAlbum({
      filePath: this.data.qrCodePath,
      success:()=>{
        wx.showToast({
          title: '二维码已保存',
        })
        this.setData({
          showQrcode: false
        })
      },
      fail(){
        wx.showToast({
          title: '二维码保存失败',
        })
      }
    })
  },
  scanQrcode(){
    wx.scanCode({
      success: (res) => {
        this.setData({
          codeInfo:res.result
        })
        wx.vibrateShort()
      },
      fail: function(res) {},
      complete: function(res) {},
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