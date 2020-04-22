// pages/storage/storage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 大图显示图片索引
    currentIndex: 0,
    // 控制大图是否显示
    showBigImg: false,
    photoPaths: [
      "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg",
      "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg",
      "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
    ]
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
    this.setData({
      showBigImg: true,
      currentIndex: e.currentTarget.dataset.index
    });
    console.log(e);
  },

  // 隐藏大图的操作
  hideBig() {
    this.setData({
      showBigImg: false
    })
  },


// 把图片路径列表保存到本地的函数
save(){
  wx.setStorage({
    key: 'photos',
    data: this.data.photoPaths
  })
},

// 删除图片的函数
removeImg(){
    wx.showModal({
      title: '删除确认',
      content: '是否要删除这张照片',
      success: (res) =>{
        if(res.confirm){
          console.log('用户点击确定');
          // 通过大图当前展示的图片索引把图片路径从路径列表中删除
          let temp = this.data.photoPaths;
          temp.splice(this.data.currentIndex, 1)
          this.setData({
            photoPaths: temp
          })
          // 如果当前删除的是最后一张图，删除之后索引越界，要索引减一
          if (this.data.currentIndex == this.data.photoPaths.length) {
            this.setData({
              currentIndex: this.data.currentIndex - 1
            })
          }
          if (this.data.currentIndex == -1) {
            // 如果所有照片都删除掉，最终索引会变成-1，此时要关闭大图
            this.hideBig();
          }
          // 更新本地数据
          this.save()
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
},

// 上一张
prevImg(){
  if(this.data.currentIndex>0){
    this.setData({
      currentIndex: this.data.currentIndex - 1
    })
  }else{
    wx.showToast({
      title: '已经是第一张了',
      icon: 'none'
    })
  }
},
// 下一张
nextImg(){
  if(this.data.currentIndex<this.data.photoPaths.length-1){
    this.setData({
      currentIndex: this.data.currentIndex + 1
    })
  }else{
    wx.showToast({
      title: '已经是最后一张了',
      icon: 'none'
    })
  }
},











  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 当页面加载时读取本地数据
    wx.getStorage({
      key: 'photos',
      success: (res) =>{
        this.setData({
          photoPaths:res.data
        })
      },
    })
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