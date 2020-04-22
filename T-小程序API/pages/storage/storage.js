// pages/storage/storage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoPaths: [
      "https://07imgmini.eastday.com/mobile/20200304/2020030410_5ea3b0925fa14b5789a1dbf22ddb8205_3555_wmk.jpg",
      "https://imgmini.eastday.com/pushimg/20200113/114x66_1578901549975105.gif",
      "https://s3m.nzwgs.com/galileo/764173-b13d080dd2c0841afb2a94e060587d6a.jpg",
      "https://s3m.nzwgs.com/galileo/853764-63322fe57d4be6b7a4930b498660ff80.jpg",
    ],
    // 控制大图是否显示
    showBigImg: false,
    // 大图显示的图片索引
    currentIndex: 0
  },


  // 上传图片的函数
  updateBtn() {
    wx.chooseImage({
      count: 9,
      success: (res) => {
        // 更新图片列表
        this.setData({
          photoPaths: this.data.photoPaths.concat(res.tempFilePaths)
        })
        // 保存到本地
        this.save();
      },
    })
  },

  // 展示大图的函数
  showBig(e) {
    console.log(e)
    this.setData({
      showBigImg: true,
      currentIndex: e.currentTarget.dataset.index
    })
  },

  // 隐藏大图的函数
  hideBig() {
    this.setData({
      showBigImg: false
    })
  },

  // 把图片路径列表保存到本地的函数
  save(){
    wx.setStorage({
      key: 'photos',
      data: this.data.photoPaths,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 当页面加载时读取本地数据,
      wx.getStorage({
        key: 'photos',
        success: (res)=> {
          this.setData({
            photoPaths : res.data
          })
        },
      })
  },

  // 删除图片的函数
  removeImg(){
    // 弹出删除确认框
    wx.showModal({
      title: '删除确认',
      content: '是否要删除这张照片',
      confirmColor: "#f00",
      success: (res)=>{
        // 如果点击了确认按钮
        if(res.confirm){
          // 通过当前大图展示的图片索引把图片路径从路径列表中删除
          var temp = this.data.photoPaths;
          temp.splice(this.data.currentIndex, 1)
          this.setData({
            photoPaths: temp
          })
          // 如果删除的是最后一张图,删除之后,索引越界,要索引减一,
          if (this.data.currentIndex == this.data.photoPaths.length) {
            this.setData({
              currentIndex: this.data.currentIndex - 1
            })
          }
          // 如果所有照片都删除掉了,最终索引会变成-1,此时要关闭大图
          if (this.data.currentIndex == -1) {
            this.hideBig();
          }
          // 更新本地数据
          this.save();
        }
      }
    })
  },

  // 切换上一张
  prevImg(){
    if (this.data.currentIndex > 0){
      this.setData({
        currentIndex: this.data.currentIndex - 1
      })
    }else{
      wx.showToast({
        title: '已经是第一张了',
        icon: "none"
      })
    }
  },
  // 切换下一张
  nextImg() {
    if (this.data.currentIndex < this.data.photoPaths.length - 1) {
      this.setData({
        currentIndex: this.data.currentIndex + 1
      })
    } else {
      wx.showToast({
        title: '已经是最后一张了',
        icon: "none"
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