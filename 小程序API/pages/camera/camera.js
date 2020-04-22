// pages/camera/camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cameraShow: false,
    // 控制相机朝向
    cameraDirection: "back",
    // 上传按钮控制
    updateBtn: true,
    // 保存按钮控制
    saveBtn: false,

  },

  // 上传相册
  getImage() {
    // self 指当前页对象
    console.log(this)
    const self = this;
    // 提示框
    // wx.showToast({
    //   title: "标题",
    // })

    // 确认框
    // wx.showModal({
    //   title: '标题',
    //   content: '123',
    // })

    // 加载框
    // wx.showLoading({
    //   title: '123',
    // })

    // 选择框
    wx.showActionSheet({
      itemList: ["打开相机", "相册选择相册"],
      success(res) {
        // 索引 0 1
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          console.log()
          self.openCamera()
        } else if (res.tapIndex == 1) {
          self.openImage()
        }
      },
      // 取消按钮、内存不足时执行
      fail(res) {
        console.log(res.errMsg)
      }
    })

  },
  // 打开相机
  openCamera() {
    console.log("相机")
    this.setData({
      cameraShow: true
    })
  },
  //前后相机 
  cameraChange() {
    this.setData({
      cameraDirection: this.data.cameraDirection == "back" ? "front" : "back"
    })
  },
  // 拍照按钮
  makephoto() {
    const self = this;
    //   wx.createCameraContext 系统相机对象
    var CameraContext = wx.createCameraContext(this)
    CameraContext.takePhoto({
      // 成像质量
      quality: "high",
      success(res) {
        // 临时保存路径
        // console.log(res.tempImagePath)
        self.setData({
          photoPath: res.tempImagePath,
          updateBtn: false,
          saveBtn: true,
        })
      },
      // 内存不足执行
      fail() {

      },
      complete() {
        self.setData({
          cameraShow: false,
        })
      }
    })
  },
  // 保存图片
  saveImage() {
    if (this.data.photoPath) {
      wx.saveImageToPhotosAlbum({
        filePath: this.data.photoPath,
        success() {
          wx.showToast({
            title: '保存成功',
          })
        }
      })

    } else {
      wx.showToast({
        title: '图片不存在',
        icon: "none"
      })
    }


  },



  // 打开相册
  openImage() {
    const self = this;
    console.log("相册")
    // 调用本地相册
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res)
        // 把选中的图片路径记录下来并展示
        self.setData({
          photoPath: res.tempFilePaths[0],
          updateBtn: false,
          saveBtn: true,
        })
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