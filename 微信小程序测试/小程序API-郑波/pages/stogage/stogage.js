// pages/stogage/stogage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // showImage: false,
    photoPath: [
      "http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
      "http://b2-q.mafengwo.net/s5/M00/91/06/wKgB3FH_RVuATULaAAH7UzpKp6043.jpeg",
      "http://bbs.lyd.com.cn/data/attachment/forum/dvbbs/2009-10/2009102511405945827.jpg",
      "http://a3.att.hudong.com/65/38/16300534049378135355388981738.jpg",
      "http://a4.att.hudong.com/22/59/19300001325156131228593878903.jpg"
    ],
    // 控制大图显示
    showpge: false,
    // 当前大图显示图片索引
    currentIndex: 0,
  },


  // 上传图片的函数
  updataBtn() {
    wx.chooseImage({
      success: (res) => {
        // 更新图片列表
        this.setData({
          photoPath: this.data.photoPath.concat(res.tempFilePaths)
        })
        // 保存到本地
        this.save();
      },
    })
  },
  // 展示大图函数
  showBig(e) {
    console.log(e)
    this.setData({
      showpge: true,
      currentIndex: e.currentTarget.dataset.url
    })
  },
  // 取消大图展示
  hideBig() {
    this.setData({
      showpge: false,
    })
  },

  // 把图片路径列表保存到本地列表
  save() {
    wx.setStorage({
      key: 'photos',
      data: this.data.photoPath,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  当页面加载时读取本地数据
    wx.getStorage({
      key: 'photos',
      success: (res) => {
        this.setData({
          photoPath: res.data
        })
      },
    })
  },



  // 删除图片的函数
  removeImg() {
    wx.showModal({
      title: '删除确认',
      content: '是否要删除这张照片',
      confirmColor: "#f00",
      success: (res) => {
        // 点击确认按钮
        if (res.confirm) {
          // 通过当前大图展示的索引把图片从路径列表中删除
          var temp = this.data.photoPath;
          temp.splice(this.data.currentIndex, 1)
          this.setData({
            photoPath: temp
          })


          // 如果当前删除的是最后一张图,删除之后索引越界,要索引减一
          if (this.data.currentIndex == this.data.photoPath.length) {
            this.setData({
              currentIndex: this.data.currentIndex - 1
            })
          }
          // 如果所有照片都删除了,最终索引会变成负一,此时关闭大图
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
  prevImg() {
    if (this.data.currentIndex > 0) {
      this.setData({
        currentIndex: this.data.currentIndex - 1
      })
    } else {
      wx.showToast({
        title: '已经是第一张了',
        icon: "none"
      })
    }

  },
  // 切换下一张
  nextImg() {
    if (this.data.currentIndex < this.data.photoPath.length - 1) {
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