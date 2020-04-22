// pages/qrcode/qrcode.js
// 生成二维码 需要导入二维码插件
import qrCode from "../../utils/weapp-qrcode.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    showQRCode:false
  },
// 输入框的数据绑定函数
  updateMsg(e){
    
    console.log("000")
    console.log(e)
    this.setData({
      message:e.detail.value
    })
  },

  //生成二维码 的函数 
  makeQRCode(){
    if (this.data.message.length <= 0) {
      wx.showToast({
        title: '信息不能为空',
        icon: 'none'
      })
      return
    }
    // 渲染二维码之前，先显示canvas
    this.setData({
      showQRCode:true
    })
    // 调用创建二维码API,新建二维码
    // 参数有两个，第一个是二维码id名，和渲染这个二维码的画布对应
    // 第二个参数是二维码配置信息
    new qrCode('myQRCode',{
      // 二维码包含的信息
      text:this.data.message,
      // 二维码尺寸,默认单位px
      width:200,
      height:200,
      padding:12,//二维码内边距
      // 设置二维码的可识别度，L表示低，H表示高
      correntLevel:qrCode.CorrectLevel.H,
      // 二维码生成回调函数
      callback:(res)=>{
        // res.path就是生成二维码临时存放地址
        console.log(res)
        this.setData({
          qrCodePath:res.path,
          showQRCode:true
        })
      }
    })
  },

// 保存二维码
  saveQRCode(){
    wx.saveImageToPhotosAlbum({
      filePath: this.data.qrCodePath,
      success:()=>{
        wx.showToast({
          title: '二维码已保存',
        })
      },
      fail(){
        wx.showToast({
          title: '二维码保存失败',
          icon:'none'
        })
      }
    })

  },

// 扫描二维码的函数
  scanQRCode(){
    // 调用小程序扫描二维码的API
    wx.scanCode({
      // 扫描完成回调函数
      success:(res)=>{
        console.log(res.result);
        // 只能从相机扫码，不允许从相册选择图片
        onlyFormCamera:false,
        // 显示扫码结果
        this.setData({
          codeInfo:res.result
        })
        // 手机短震动
        wx.vibrateShort({
          // 手机长震动
          // wx.vibrateLong
        })
      }
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