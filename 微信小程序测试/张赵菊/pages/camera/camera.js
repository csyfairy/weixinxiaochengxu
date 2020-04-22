// pages/camera/camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制相机显示隐藏的变量
    showCamera:false,
    // 控制相机的朝向
    cameraDirection:'back'
  },

// 点击上传图片按钮时执行的函数
  getImage(){
    // 使用self记录this的值，保证this不为空
    const self = this;
    // 完成提示框，会自动隐藏
    // wx.showToast({
    //   title: '标题',
    // })
// 提示确认框
    // wx.showModal({
    //   title: '标题',
    //   content: '内容',
    // })
    // 加载框
    // wx.showLoading({
    //   title: '正在加载...',
    // })
    // 弹出选择框
    wx.showActionSheet({
      itemList: ["打开相机","从相册选择"],
      // 打开成功的回调函数
      success(res){
        // 两个选项索引分别是0和1
        console.log(res.tapIndex)
        if(res.tapIndex==0){
          // 在回调中this为空
          // console.log(this);
          self.openCamera()
        }else if(res.tapIndex==1){
          self.openlocationImages()
        }
      },
      // 点击取消按钮，执行fail回调
      fail(res){
        console.log("取消选择或内从不足")
      }
    })
  },

// 打开系统相机的函数
openCamera(){
  console.log("相机");
  // 修改bool数据，显示相机标签
  this.setData({
    showCamera:true
  })
},
// 打开本地相册的函数
openlocationImages(){
  const self = this;
  console.log("相册");
  // 调用本地相册API
  wx.chooseImage({
    // 最多可以选择的图片个数，最大9
    count:1,
    success: function(res) {
      console.log(res)
      // 选中的图片路径记录下来并展示
  self.setData({
    photoPath: res.tempFilePaths[0]
  })
    },
  })
},
// 切换前置后置相机的函数
changeCamera(){
// 修改控制相机朝向的动态数据即可
this.setData({
  cameraDirection:this.data.cameraDirection=='back'?'front':'back'
});
console.log(this.data.cameraDirection)
},

// 保存照片的函数
saveImage(){
  let photo = this.data.photoPath;
  if(photo){
  // 调用微信保存图片的API
  wx.saveImageToPhotosAlbum({
    filePath: photo,
    success(){
      wx.showToast({
        title: '保存完成',
      })
    }
  });
  }else{
    wx.showToast({
      title: '图片不存在',
      icon:'none'
    })
  }
},





// 点击拍照按钮
makePhoto(){
  const self = this;
// 获取系统相机对象CameraContext
let ComeraContext = wx.createCameraContext(this);
// 使用相机对象拍摄一张照片
  ComeraContext.takePhoto({
    // 成像质量
    quality:"high",
    success(res){
      // tempImagePath是照片在内存中的临时路径
      console.log(res.tempImagePath);
      // 设置数据，记录照片路径并隐藏相机
      self.setData({
        photoPath:res.tempImagePath,
        showCamera:false
      })
    },
    // 拍照失败的回调
    fail(){
      console.log("内存不足或权限限制")
    },
    // 拍照完成，不管是成功还是失败，都关闭相机
    complete(){
      self.setData({
        showCamera:false
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