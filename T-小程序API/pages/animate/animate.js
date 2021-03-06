// pages/animate/animate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义view组件的动画对象
    boxAnimation: null,
    // 左侧城市名(出发地)
    fromCity: "信阳",
    // 右侧城市名(目的地)
    toCity: "郑州",
    // 左侧城市的移动动画
    aniLeftData : null,
    // 右侧城市的移动动画
    aniRightData: null,
    // 控制城市动画切换
    offset: false
  },

  // 点击按钮开始执行动画的函数
  beginAnimation(){
    // // 1, 创建一个动画实例 animation
    // var myAnimation = wx.createAnimation({
    //   duration: 400,  // 动画时间
    //   timingFunction: "linear",  // 动画速度函数
    //   delay : 0 ,  // 延时时间
    //   transformOrigin: "50% 50% 0"  // 变换基准点
    // })
    // // 用全局变量记录
    // this.myAnimation = myAnimation;

    // 2, 设置动画效果
    // myAnimation = myAnimation.backgroundColor("blue")
    // myAnimation = myAnimation.width("200rpx")
    // myAnimation = myAnimation.height("200rpx")
    // //把以上三个动画效果设置成一组动画,一组动画中的所有动画会同时开始，一组动画完成后才会进行下一组动画。
    // myAnimation.step()
    // 以上三个属性变化设置一组动画可以简写为: 
    // this.myAnimation.backgroundColor("blue").width("200rpx").height("200rpx").step()

    // 再添加一组动画,会在上一组动画执行结束后开始执行
    // 添加多组动画时,尽量一组改变一个样式, 否则可能造成后边多组同时执行现象
    this.myAnimation.width("200rpx").step()
    this.myAnimation.backgroundColor("blue").step()
    this.myAnimation.height("200rpx").step()
    this.myAnimation.opacity(0.3).step()
    this.myAnimation.backgroundColor("orange").step()
    this.myAnimation.scale(0.5,0.5).step()
    this.myAnimation.opacity(1).step()
    this.myAnimation.scale(1,1).step()
    this.myAnimation.width("100rpx").step()
    this.myAnimation.height("100rpx").step()
    this.myAnimation.backgroundColor("red").step()
    
    // 3, 把动画队列导出,赋值给view的动画对象
    this.setData({
      boxAnimation : this.myAnimation.export()
    })

    // 4, 在需要执行动画的标签上添加animation属性绑定导出的动画对象即可

  },

  // 执行旋转动画
  beginRotate(){
    // 设置旋转效果
    this.myAnimation.rotateX(180).step()
    this.myAnimation.rotateY(180).step()
    this.myAnimation.rotateZ(180).step()
    // 导出这一组动画
    this.setData({
      boxAnimation: this.myAnimation.export()
    })
  },

  // 移动动画
  beginMove(){
    this.myAnimation.translateY(100).step()
    this.myAnimation.translateX(-100).step()
    this.myAnimation.translateX(100).step()
    this.setData({
      boxAnimation: this.myAnimation.export()
    })
  },

  // 隐藏动画
  beginHide(){
    this.myAnimation.opacity(0).step()
    this.setData({
      boxAnimation: this.myAnimation.export()
    })
  },

  // 还原动画
  beginBack(){
    this.myAnimation.backgroundColor("red").width("100rpx").height("100rpx").rotateX(0).rotateY(0).rotateZ(0).translateX(0).translateY(0).opacity(1).step();
    this.setData({
      boxAnimation: this.myAnimation.export()
    })
  },

  // 监听页面加载,创建动画对象
  onLoad: function (options) {
    // 1, 创建一个动画实例 animation
    this.myAnimation = wx.createAnimation({
      duration: 400,  // 动画时间
      timingFunction: "linear",  // 动画速度函数
      delay: 0,  // 延时时间
      transformOrigin: "50% 50% 0"  // 变换基准点
    })
  },

  // 城市切换动画
  changeCity(){
    if(!this.animationLeft || !this.animationRight){
      // 左侧城市的移动动画
      this.animationLeft = wx.createAnimation({})
      // 右侧城市的移动动画
      this.animationRight = wx.createAnimation({})
    }
    
    // 判断当前view视图是否有偏移,控制不同的动画方向
    if(this.data.offset){
      // 设置还原动画效果
      this.animationLeft.translateX("0").step()
      this.animationRight.translateX("0").step()
    }else{
      // 设置偏移动画效果
      this.animationLeft.translateX("500rpx").step()
      this.animationRight.translateX("-500rpx").step()
    }

    // 导出动画
    this.setData({
      aniLeftData: this.animationLeft.export(),
      aniRightData: this.animationRight.export(),
      offset: !this.data.offset
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