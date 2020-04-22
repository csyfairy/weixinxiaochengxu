


// pages/camera/camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制相机显示隐藏的变量
    showCamear:false,
    photoPath:'',
    cameraDirection:"back"
  },

  // 点击上传图片按钮时执行的函数
  getImage() {
    // 使用self记录this的值,保证this不为空
    const self = this;
    // 完成提示框,会自动隐藏
    // wx.showToast({
    //   title: '标题',
    // })
    // 提示确认框
    // wx.showModal({
    //   title: '标题',
    //   content: '内容',
    // })
    // wx.showLoading({
    //   title: '正在加载.....',
    // })

    // 选择弹出框,ios会从底部弹出,安卓从中间弹出
    wx.showActionSheet({
      itemList: ["打开相机", "从相册中选择"],
      // 打开成功的回调
      success(res) {
        // 两个选项索引分别是0和1
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          // 再回调中this为空
          // console.log(this)
          self.openCamera();
        } else if (res.tapIndex == 1) {
          self.openLoacalImage();
        }
      },
      //点击取消按钮,执行fail回调 
      fail(res) {
        console.log("取消选择,内存不足")
      },
      // 拍照完成不管成功失败都关闭相机
     
    })

  },

  // 打开系统相机的函数
  openCamera() {
    console.log("相机")
    // 修改bool显示相机标签
    this.setData({
      showCamear: true
    })
  },

  // 切换前后相机的按钮事件
  changeCamera(){
    // 修改相机的函数
    this.setData({
      cameraDirection: this.data.cameraDirection == "back" ? "front":"back"
    })
  },

  // 点击拍照的按钮
  makePhoto() {
    const self = this;
    // 获取系统相机
    var CameraContext = wx.createCameraContext(this);
    // 使用相机对象拍摄一张照片
    CameraContext.takePhoto({
      // 成像质量
      quality: "high",
      success(res) {
        // tempImagePath是图片照片在内存中的临时路径
        console.log(res.tempImagePath)
        // 设置数据,记录照片路径并隐藏相机
        self.setData({
          photoPath: res.tempImagePath,
          // showCamear: false
        })
      },
      // 拍照失败的回调
      fail() {
        console.log("内存不足,或权限限制")
      },
      complete() {
        self.setData({
          showCamear:false
        })
      }
    })
  },

  // 保存照片的函数
  saveImage(){
    var photo = this.data.photoPath;
    if(photo){
      //调用微信保存图片的API 
      wx.saveImageToPhotosAlbum({
        filePath: this.data.photoPath,
        success(){
          wx.showToast({
            title: '保存成功',
          })
        }
      })
    }else{
      wx.showToast({
        title: '图片不存在,保存失败',
        icon:"none"
      })
    }
   
  },
  

  // 打开本地相册的函数
  openLoacalImage() {
    var self = this;
    console.log("相册")
    wx.chooseImage({
      // 最多可以选择的图片个数,最大9
      count:1,
      success: function(res) {
        console.log(res)
        // 把选中的图片路径记录下来并展示
        self.setData({
          photoPath:res.tempFilePaths[0]
        })
      },
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