// pages/map/map.js

// 在小程序中, 引入腾讯地图SDK核心类, 来实现搜索功能
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义经度
    longitude : 113.657,
    // 定义纬度
    latitude : 34.748,
    // 地图缩放比例
    scale: 16,
    // 地图标尺数组
    rulerList: ["3000km","1500km","800km","400km","200km","100km","50km","20km","10km","6km","3km","1.5km","800m","400m","200m","100m","50m","10m"],
    // 比例尺索引
    rulerIndex: 13,
    // 是否开启实时路况
    traffic: false,
    // 路况按钮图片
    trafficImg: "/img/traffic_false.png",
    // 是否开启卫星图
    satellite : false,
    // 卫星图按钮图片
    satelliteImg: "/img/卫星图.png",

    // 输入框是否获取焦点
    isFous : false,

    // 搜索结果标记点列表
    markerList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 向用户获取小程序定位权限, 需要在app.json中定义permission字段( 配置地理位置用途说明。 
    // 小程序第一次使用某个权限时会弹出授权选择窗口, 用户授权或禁用选择之后,再次调用接口就会直接返回用户之前得授权结果, 不再弹出授权窗口
    // wx.authorize({
    //   scope: 'scope.userLocation',
    //   success(res){
    //     console.log("已经授权")
    //   },
    //   fail(){
    //     console.log("已经禁用")
    //   }
    // })
    // 打开设置, 会展示用于已经授权或禁用得权限, 未使用得权限不展示
    // wx.openSetting({
    //   success: (res)=>{
    //     console.log(res)
    //   }
    // })

    // 在地图加载之后,获取当前定位,并移动到当前位置
    wx.getLocation({
      // 开启高精度定位
      isHighAccuracy: true,
      success:(res)=> {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      },
      fail(){
        wx.showToast({
          title: '定位失败',
          icon: "none"
        })
      }
    })

    // 把当前坐标位置移动到地图中心
    this.nowPos();

    //在onload函数中 设置腾讯地图密钥,, 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'CENBZ-JEHLP-BN3D4-V6F43-FCKQV-WGFVY'
    });


  },

  // 把当前坐标位置移动到地图中心
  nowPos(){
    // 获取当前显示得地图对象, 第一个参数是地图标签得id值
    this.mapContext = wx.createMapContext("myMap", this)
    // 将地图中心移置当前定位点
    this.mapContext.moveToLocation();
    // 重置地图比例
    this.setData({
      scale: 16
    })
  },

  // 地图放大
  bigger(){
    if(this.data.scale < 20){
      this.setData({
        scale : this.data.scale + 1,
        rulerIndex: this.data.rulerIndex + 1
      })
    }
  },
  // 地图缩小
  smaller() {
    if (this.data.scale > 3) {
      this.setData({
        scale: this.data.scale - 1,
        rulerIndex: this.data.rulerIndex - 1
      })
    }
  },

  // 切换路况的函数
  traffic(){
    this.setData({
      traffic : !this.data.traffic,
      trafficImg: this.data.traffic ? "/img/traffic_false.png" : "/img/traffic_true.png"
    })
  },
  // 切换卫星图的函数
  satellite() {
    this.setData({
      satellite: !this.data.satellite,
      satelliteImg: this.data.satellite ? "/img/卫星图.png" : "/img/平面图.png"
    })
  },

  // 地图视野发生变化时,更新标尺
  regionchange(){
    // 获取当前地图的缩放值, getScale()会得到一个Promise对象
    this.mapContext.getScale().then(data=>{
      console.log(data.scale)
      this.setData({
        rulerIndex: data.scale - 3
      })
    })
  },

  // 点击input-view图层,使输入框获取焦点
  focusInput(){
    // 使输入框获取焦点
    this.setData({
      isFous : true
    })
  },

  // 输入框输入时,记录输入内容并同步到input-view视图
  myInput(e){
    this.setData({
      searchKey : e.detail.value
    })
  },

  // 开始搜索的函数
  search(){
    // 调用腾讯地图的搜索接口
    qqmapsdk.search({
      keyword: this.data.searchKey,
      success: (res)=> {
        console.log(1,res);
        // 搜索到结果之后,把结果转化成地图上的标记点
        var poslist = res.data.map(item=>{
          // 把地图服务返回的结果数据信息,转化成地图标记对象marker
          return{
            id: item.id,
            longitude: item.location.lng,
            latitude: item.location.lat,
            title: item.title,
            iconPath: "/img/map_icon.png",
            alpha: 0.8,
            width: 30,
            height: 30,
            callout: {
              content: item.title
            }
          }
        })
        // 记录标记点, 并展示到地图上
        this.setData({
          markerList : poslist
        })
      },
      fail: function (res) {
        console.log(2,res);
      },
      complete: function (res) {
        console.log(res);
      }
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