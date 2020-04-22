// pages/qrcode/qrcode.js
// 生成二维码插件
import qrCode from "../../utils/weapp-qrcode.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: "你好",
    showQRCode: false
  },
  // 更新数据
  updateMSG(e) {
    console.log(e)
    this.setData({
      message: e.detail.value
    })
  },
  // 生成二维码
  makeQRcode() {
    if (this.data.message.length == 0) {
      wx.showToast({
        title: '信息不能为空',
        icon: "none"
      })
      return;
    }

    // 显示canvas
    this.setData({
      showQRCode: true
    })
    // 调用二维码API 
    // 参数一 二维码id名 和渲染的画布对应
    // 参数二 二维码配置信息
    new qrCode("myQRCode", {
      // 二维码包含信息
      text: this.data.message,
      // 二维码尺寸 默认 px
      width: 200,
      height: 200,
      // 白边
      padding: 12,
      // 二维码可识别度 L低  H高
      correntLevel: qrCode.CorrectLevel.H,
      callback: (res) => {
        console.log(res.path)
        this.setData({
          qrCodePath: res.path,

        })
      }

    })
  },
  // 保存二维码
  saveQRCode() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.qrCodePath,
      success() {
        wx.showToast({
          title: '保存成功',
        })
      },
      fail() {
        wx.showToast({
          title: '保存失败',
          icon: "none"
        })
      }
    })
  },
  // 扫描二维码函数
  scanQRCode() {
    // 扫描二维码API
    wx.scanCode({
      success: (res) => {
        // 是否只能从相机扫码
        onlyFromCamera: false,
        console.log(res.result)
        this.setData({
          scanResult: res.result
        })
        // 手机震动 短震动15ms
        wx.vibrateShort()
        // wx.vibrateLong()
      },
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