// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 贝塞尔曲线的曲率坐标
    bezierX1:40,
    bezierX2: 300,
    bezierY1: 310,
    bezierY2: 80,
    // 隐藏贝塞尔曲线的滑动条
    bezierSlider:false,
    // 隐藏多边形滑动条
    polygonSlider:false,
  },

  // 画线段的函数
  drawLine(){
    // 开始绘制，设置绘制起点
    this.canvas.beginPath();
    // 把画笔移动到绘制起点处
    this.canvas.moveTo(60,60);
    // 绘制一条直线，从画笔现在的坐标（起点）到参数坐标（终点）
    this.canvas.lineTo(260, 60);
    // lineTo划线的起点是上一次绘制的终点，它的参数是本次绘制的终点
    this.canvas.lineTo(260, 260);
    this.canvas.lineTo(60, 260);
    this.canvas.lineTo(60, 60);
  // 如果线段中间要断开不连续绘制，就用moveTo设置另一个起点
    this.canvas.moveTo(100, 100);
    this.canvas.lineTo(200, 100);
    this.canvas.lineTo(200, 200);
    this.canvas.lineTo(100, 200);
    this.canvas.lineTo(100,100);

    this.canvas.moveTo(120, 125),
    this.canvas.lineTo(180,125),

    this.canvas.moveTo(120, 150),
    this.canvas.lineTo(180, 150),

    this.canvas.moveTo(120, 175),
    this.canvas.lineTo(180, 175),

    this.canvas.moveTo(150, 120),
    this.canvas.lineTo(150, 175),

    this.canvas.moveTo(160, 160),
    this.canvas.lineTo(170, 170),
    // 设置描边颜色
    this.canvas.setStrokeStyle('red')
    // 设置线条宽度
    this.canvas.setLineWidth(10)
    // 说明绘制的是线条
    this.canvas.stroke()
    // 开始绘制，将上文中的描述画到canvas中
    this.canvas.draw()
  },

// 实心矩形的函数
drawRect(){
  // 设置矩形填充颜色（需要再fillRect()之前设置）
  this.canvas.setFillStyle('orange')
  // 绘制实心矩形（填充一个矩形）参数是矩形左上角坐标和宽高
  this.canvas.fillRect(30,30,120,100);
  // 设置矩形的描边颜色
  this.canvas.setStrokeStyle('blue')
  // 绘制空心矩形（只描边）参数是矩形左上角坐标和宽高
  this.canvas.strokeRect(220,30,120,100)

  this.canvas.strokeRect(220, 30, 120, 100)

  this.canvas.strokeRect(70, 120, 80, 60)
  // 挖空矩形
  this.canvas.setFillStyle('black')
  this.canvas.fillRect(100, 160, 200, 100);
  // 清除内容
  this.canvas.clearRect(130, 190, 40, 40)

  // 开始绘制(会把canvas先清空然后再绘制)
  this.canvas.draw()
},
// 画圆弧的函数
drawCircle(){
  let canvas = this.canvas;

  // 画圆
  canvas.arc(100,100,50,0,Math.PI*2,true)

  // 设置描边颜色
  canvas.setStrokeStyle('red');
  // 设置描边宽度
  canvas.setLineWidth(5);
  // 设置填充颜色
  canvas.setFillStyle("yellow");
  // 给这个空心圆描边（空心）
  canvas.stroke();
  // 填充这个圆
  canvas.fill();

  // ------------------------------------
  // 上一个圆终点默认会和下一个圆起点相连，可以重新定义起点
  canvas.beginPath();
  // 画弧
  canvas.arc(260, 100, 50, 0, Math.PI*2/3, false)
  // 描边
  canvas.stroke();
  // 填充
  canvas.fill();







  // 绘制
  canvas.draw()
},
drawCurveBtn(){
  this.setData({
    bezierSlider: true,
  })
  this.drawCurve()
},

// 画曲线的函数
drawCurve(){
  let canvas = this.canvas;

  // 贝塞尔曲线设置需要4个点坐标，起点坐标需要提前定义
  canvas.beginPath();//定义开始路径
  canvas.moveTo(30,30);//移动到绘制起点
  
  // 设置贝塞尔曲线的曲率和终点坐标
  canvas.bezierCurveTo(this.data.bezierX1,this.data.bezierX2,this.data.bezierY1,this.data.bezierY2,340,260);
  
  // 描边
  canvas.stroke()
  // 绘制
  canvas.draw();
},  

// 修改贝塞尔曲线
bezier1(e){
  this.setData({
    bezierX1:e.detail.value,
  })
  this.drawCurve();
},
bezier2(e){
  this.setData({
    bezierX2: e.detail.value,
  })
  this.drawCurve();
},
bezier3(e) {
  this.setData({
    bezierY1: e.detail.value,
  })
  this.drawCurve();
},
bezier4(e) {
  this.setData({
    bezierY2: e.detail.value,
  })
  this.drawCurve();
},

// 画文字
canvasText(){
  let canvas = this.canvas;

  // 填充颜色
  canvas.setFillStyle('blue');
  // 描边颜色
  canvas.setStrokeStyle('red');
  // 设置文字尺寸
  canvas.setFontSize(40);
  // 填充文字
  canvas.fillText('你就像蓝天白云',60,100);
  // 描边文字(空心)
  canvas.strokeText('晴空万里，突然暴风雨',60,200);
  canvas.draw();
},

// 画图片
drawImage(){
  // 选择本地图片
  wx.chooseImage({
    success: (res)=> {
      this.canvas.drawImage(res.tempFilePaths[0],30,30,300,240)
      this.canvas.draw()
    },
  })
},
// 画多边形
drawPolygon(){
  // 起点
  this.canvas.moveTo(300, 150);
  for(let i=1;i<=12;i++){
    this.canvas.lineTo(200 + 100 * Math.cos(i * 150 * Math.PI / 180), 150 + 100 * Math.sin(i * 150 * Math.PI / 180))
  }
  this.canvas.stroke();
  this.canvas.draw();

  // 显示多边形滑动条
  this.setData({
    polygonSlider: true,
  })
},

// 多边形变化函数
polygonChange(e){
  let count = e.detail.value;
  this.canvas.moveTo(300, 150);
  for (let i = 1; i <= count; i++) {
    // this.canvas.lineTo(200 + 100 * Math.cos(i * 360/count * Math.PI / 180), 150 + 100 * Math.sin(i * 360/count * Math.PI / 180))
    this.canvas.lineTo(200 + 100 * Math.cos(i * count*3 * Math.PI / 180), 150 + 100 * Math.sin(i * count*5 * Math.PI / 180))
  }
  this.canvas.stroke();
  this.canvas.draw();

},













  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 创建canvas绘制上下文的CanvasContext对象
    this.canvas = wx.createCanvasContext("myCanvas", this)
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