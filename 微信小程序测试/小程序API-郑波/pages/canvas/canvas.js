// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bezierX1: 40,
    bezierX2: 0,
    bezierY1: 0,
    bezierY2: 0,
    curveSlider:false,
    // 默认隐藏多边形滑动条
    polygonSLider:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 创建 canvas 的绘图上下文 CanvasContext 对象
    this.canvas = wx.createCanvasContext('myCanvas', this)
  },

  // 画线段的函数
  drawLine() {
    // 开始绘制,设置绘制起点
    this.canvas.beginPath();
    // 把画笔移动到绘制起点处,单位默认px
    this.canvas.moveTo(57, 60)
    // 绘制一条直线从画笔现在的坐标(起点)到参数坐标(终点)
    this.canvas.lineTo(260, 60);
    // lineTo画线段的起点是上一次的终点,他的参数是本次绘制的终点
    this.canvas.lineTo(260, 260);
    this.canvas.lineTo(60, 260);
    this.canvas.lineTo(60, 57);

    // 如果线段中间要断开不连续绘制,就用moveTo设置另一个起点
    this.canvas.moveTo(100, 100);
    this.canvas.lineTo(220, 100)

    this.canvas.moveTo(100, 160);
    this.canvas.lineTo(220, 160)

    this.canvas.moveTo(160, 220);
    this.canvas.lineTo(160, 220)

    this.canvas.moveTo(100, 220);
    this.canvas.lineTo(220, 220);

    this.canvas.moveTo(160, 100);
    this.canvas.lineTo(160, 220)

    this.canvas.moveTo(188, 188);
    this.canvas.lineTo(220, 210)

    // 设置线条宽度
    this.canvas.setLineWidth(10)

    this.canvas.setStrokeStyle("red");

    // 设置线条颜色(描边)
    // this.canvas.
    // 说明绘制的是线条
    this.canvas.stroke();


    // 开始绘制,
    this.canvas.draw()
  },

  draRect() {
    // 设置局部变量,记录canvasContText对象,方法调用
    var canvas = this.canvas;

    canvas.setFillStyle("red");
    // 绘制实心矩形(填充一个矩形),参数是矩形左上角坐标和宽高
    canvas.fillRect(10, 10, 100, 100)

    // 设置矩形的描边颜色
    canvas.setStrokeStyle("blue")
    // 绘制空心矩形(填充一个矩形), 参数是矩形左上角坐标和宽高
    canvas.strokeRect(200, 10, 120, 105)

    // 绘制挖空矩形

    // 设置矩形的描边颜色
    canvas.setFillStyle("black")
    canvas.fillRect(70, 130, 80, 80)
    // canvas.setFillStyle("#eee")
    // canvas.fillRect(130, 190, 40, 40)
    canvas.clearRect(80, 140, 40, 40)


    // 开始绘制,(会把canvas先清空,然后重新绘制)
    canvas.draw()
  },

  // 画圆弧的函数
  drawCircle() {
    var canvas = this.canvas;
    // 画圆 (圆心横坐标 圆心纵坐标 半径 起始角度 圆弧的)
    canvas.arc(100, 100, 50, 0, Math.PI * 2, true)

    // 设置描边颜色
    canvas.setStrokeStyle("red")
    canvas.setLineWidth(5)
    // 给这个圆描边(空心)
    canvas.stroke();


    canvas.setFillStyle("yellow")
    // 填充这个圆(实心)
    canvas.fill();


    // 上一个圆的终点默认会和下一个圆的起点连起来,造成奇怪的图形
    // 如果不想上一个圆终点和下一个圆起点相连,可以重新定义起点
    canvas.beginPath();

    // 画圆弧
    canvas.arc(260, 100, 60, 0, Math.PI * 2 / 3, false)
    canvas.stroke();
    // 填充这个圆(实心)
    canvas.fill();




    // 绘制
    canvas.draw()
  },

  // 画曲线的函数
  drawCurve() {
    var canvas = this.canvas;
    this.setData({
      curveSlider:true
    })

    // 贝塞尔曲线设置需要四个点坐标,起点坐标需要提前定义
    canvas.beginPath(); //开始一个绘制路径
    canvas.moveTo(30, 30); //  把画笔移动到绘制起点

    // 设置贝塞尔曲线的曲率和终点坐标
    canvas.bezierCurveTo(this.data.bezierX1,this.data.bezierX2, this.data.bezierY1,this.data.bezierY2, 340, 260)
    canvas.stroke();
    // 绘制
    canvas.draw();
  },

  bezier1(e){
    // console.log(e)
    // 修改贝塞尔曲线的滑动条
    this.setData({
      bezierX1: e.detail.value
    })
    // 重新绘制曲线
    this.drawCurve();
  },
  bezier2(e) {
    // console.log(e)
    // 修改贝塞尔曲线的滑动条
    this.setData({
      bezierX2: e.detail.value
    })
    // 重新绘制曲线
    this.drawCurve();
  },
  bezier3(e) {
    // console.log(e)
    // 修改贝塞尔曲线的滑动条
    this.setData({
      bezierY1: e.detail.value
    })
    // 重新绘制曲线
    this.drawCurve();
  },
  bezier4(e) {
    // console.log(e)
    // 修改贝塞尔曲线的滑动条
    this.setData({
      bezierY2: e.detail.value
    })
    // 重新绘制曲线
    this.drawCurve();
  },

  // 画文字
  drawText() {
    var canvas = this.canvas;

    // 设置文字尺寸
    canvas.setFontSize(40);

    // 填充颜色
    canvas.setFillStyle("blue");
    // 描边颜色
    canvas.setStrokeStyle("red");

    // 描边宽度

    // 填充文字(实心字)
    canvas.fillText("天王盖地虎", 40, 100);

    // 描边文字(空心字)
    canvas.strokeText("荆轲刺秦王", 60, 200)

    canvas.draw();
  },

  // 画图片
  drawImage() {
    wx.chooseImage({
      success: (res) => {
        this.canvas.drawImage(res.tempFilePaths[0], 30, 30, 300, 240);
        this.canvas.draw();
      },
    })
  },

  // 画多边形
  drawPolygon() {
    this.setData({
      polygonSLider:true,
    })
    this.canvas.moveTo(300, 150)
    for (var i = 1; i <= 12; i++) {
      this.canvas.lineTo(200 + 100 * Math.cos(i * 150 * Math.PI / 180), 150 + 100 * Math.sin(i * 150 * Math.PI / 180))
    }

    this.canvas.stroke();
    this.canvas.draw();
  },

  // 多边形变化
  polygonChange(e) {
    var count = e.detail.value;

    this.canvas.moveTo(300, 150)
    for (var i = 1; i <= count; i++) {
      this.canvas.lineTo(200 + 100 * Math.cos(i * 10 * count * Math.PI / 180), 150 + 100 * Math.sin(i * 3 * count * Math.PI / 180))
    }

    this.canvas.stroke();
    this.canvas.draw();
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