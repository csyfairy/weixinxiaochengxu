// pages/animate/animate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义view组件的动画对象
    boxAni:null,
    // 左侧城市出发地
    fromCity:'驻马店',
    // 右侧城市出发地
    toCity:'郑州',
    leftAni: null,// 左侧城市的移动动画
    rightAni: null,// 右侧城市的移动动画
    // 控制城市动画切换
    offset:false
  },

// 点击按钮执行动画函数
  beginAnimate(){
    
    // 2，设置动画效果
    // myAnimation = myAnimation.backgroundColor('#00f')
    // myAnimation = myAnimation.width('200rpx')
    // myAnimation = myAnimation.height('200rpx')
    // // 把以上三个动画设置成一组动画
    // myAnimation.step()

    // 以上三个动画效果可以连写为：
    this.myAnimation.backgroundColor('#00f').width('200rpx').height('200rpx').step();
    this.myAnimation.opacity(1).width('100rpx').height('100rpx').step();
  // 再添加一组动画
  this.myAnimation.backgroundColor('#ff0').rotate(180).step();
  // 第三组动画，还原样式，形成循环
  
    // 3,导出动画对象
    this.setData({
      boxAni:this.myAnimation.export()
    })
  // 给需要执行动画的标签绑定animation=‘{{boxAni}}’对象即可
  },

// 城市切换动画
  changeCity(){
    if(!this.animationLeft||!this.animationRight){
      // 左侧城市的移动动画
      this.animationLeft = wx.createAnimation({})
      // 右侧城市的移动动画
      this.animationRight = wx.createAnimation({})
    }
    // 判断当前view视图是否有偏移，控制不同的动画方向
    if(this.data.offset){
      // 设置还原动画效果
      this.animationLeft.translateX('0').step()
      this.animationRight.translateX('0').step()
    }else{
      // 设置动画效果
      this.animationLeft.translateX('500rpx').step()
      this.animationRight.translateX('-500rpx').step()
    }
    this.setData({
      leftAni: this.animationLeft.export(),
      rightAni: this.animationRight.export(),
      offset:!this.data.offset
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
    // 1，创建一个动画实例对象 animation
    this.myAnimation = wx.createAnimation({
      duration: 1000,//动画时间
      timingFunction: 'linear',//动画速度函数
      delay: 0,//动画延迟
      transformOrigin: '50% 50% 0',//变换基准点
    })
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