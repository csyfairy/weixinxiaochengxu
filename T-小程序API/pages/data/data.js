// pages/data/data.js

// 导入工具文件夹中的省市区数据文件
var provinces =  require("../../utils/provinces.js")
var cities = require("../../utils/cities.js")
var areas = require("../../utils/areas.js")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 10,
    isShow: false,
    nameList: ["张三","李四","王五"],
    // index表示名字选择器的选中索引, -1表示默认为空
    index: -1,
    // 时间选择器数据
    time: "12:00",
    // 日期选择器数据
    date: "2020-3-3",
    // 省市区选择器数据
    region: ["河南省","郑州市","中原区"],
    // 自定义选择器数据
    indexs : [0,0,0],
    // 省市区数据
    provinces ,
    cities : [],
    areas : []
  },

  // 输入框输入事件的函数
  myInput(e){
    console.log(e)
    // 通过e.detail.value获取输入框中的数据
    // 然后把输入框中的内容赋值给data中的count字段
    // 小程序通过setData()函数更新页面中的data数据,参数对象会合并到data对象中
    // this在事件函数中表示的是当前页对象Page
    console.log(this)
    this.setData({
      count: e.detail.value * 1 || 0
    })
  }, 
  // 按钮的点击事件
  add(){
    this.setData({
      count : this.data.count + 1
    })
  },

  // 选择名字的picker值的change事件函数
  nameChange(e){
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  // 选择时间的picker值的change事件函数
  timeChange(e) {
    console.log(e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  // 选择日期的picker值的change事件函数
  dateChange(e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  // 选择省市区的picker值的change事件函数
  // 省市区选择器不需要导入省市区数据,小程序自带了这些数据
  regionChange(e) {
    console.log(e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  // 初始化省市区数据
  initDate(array){
    // 获取默认省份
    var selectProvince = this.data.provinces[array[0]];
    // 找到省份对应的城市
    var the_cities = cities.filter(item=>{
      return item.provinceCode == selectProvince.code
    })
    // 获取默认城市
    var selectCity = the_cities[array[1]]
    // 找到城市对应的区
    var the_areas = areas.filter(item => {
      return item.cityCode == selectCity.code
    })
    // 设置城市和区列表
    this.setData({
      cities: the_cities,
      areas: the_areas
    })
  },

  // 选择省市区事件函数
  areaChoose(e){
    console.log(e.detail.value)
    // 当前选择器的值  
    var current_value = e.detail.value;
    // data中记录的选择器的值
    var indexs = this.data.indexs;
    // 定义变量记录当前选中的省,市,区对象
    var selectProvince, selectCity, selectArea;
    // 当省份改变时
    if(indexs[0] != current_value[0]){
      // 获取当前选中的省份对象
      selectProvince = this.data.provinces[current_value[0]]
      // 通过省份对象,更新城市列表
      var the_cities = cities.filter(item => {
        return item.provinceCode == selectProvince.code
      })
      // 获取城市列表中的第一个城市
      selectCity = the_cities[0];
      // 通过城市对象,更新区域列表
      var the_areas = areas.filter(item => {
        return item.cityCode == selectCity.code
      })
      // 更新数据
      this.setData({
        cities: the_cities,
        areas: the_areas,
        indexs: [current_value[0], 0, 0],
      })
    }
    // 当城市改变时
    else if (indexs[1] != current_value[1]){
      // 找到当前城市
      selectCity = this.data.cities[current_value[1]];
      // 通过城市对象,更新区域列表
      var the_areas = areas.filter(item => {
        return item.cityCode == selectCity.code
      })
      // 更新数据
      this.setData({
        areas: the_areas,
        indexs: [current_value[0], current_value[1], 0]
      })
    }
    // 当区域发生改变时
    else{
      // 更新数据
      this.setData({
        indexs: current_value
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化省市区列表数据
    this.initDate(this.data.indexs)
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