// pages/data/data.js
// 导入工具文件夹中的省市区数据
let provinces = require("../../utils/provinces.js")
let cities = require("../../utils/cities.js")
let areas = require("../../utils/areas.js")




Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:0,
    isShow:false,
    nameList:["张三","李四","王五"],
    // index表示名字选择器的选中索引，-1表示默认为空
    index:-1,
    // 事件选择器数据
    time:"12:00",
    // 日期选择器数据
    date:"2020-3-3",
    // 省市区选择器数据
    region:["河南省","驻马店市","泌阳县"],
    indexs:[0,0,0],
    // 省市区数据
    provinces,
    cities:[],
    areas:[]
  },
  // 输入框输入事件的函数
  myInput(e){
    console.log(e);
    // 通过e.detail.value获取输入框中的数据
    // 然后把输入框中的内容赋值给data中的count字段
    // 小程序通过setData()函数更新页面中的data数据，参数对象会合并到data对象中
    // this在事件函数中表示的是当前页面对象Page
    this.setData({
      count:e.detail.value*1 || 0
    })
  },
  // 按钮的点击事件
  add(){
    this.setData({
      count:this.data.count+1
    })
  },
  // 选择名字的picker值的change事件
  nameChange(e){
    console.log(e.detail.value);
    this.setData({
      index:e.detail.value
    })
  },
// 选择时间的事件函数
  timeChange(e) {
    console.log(e.detail.value);
    this.setData({
      time: e.detail.value
    })
  },
  // 选择日期的事件函数
  dateChange(e) {
    console.log(e.detail.value);
    this.setData({
      date: e.detail.value
    })
  },
  // 选择省市区的事件函数
  // 省市区选择器不需要导入省市区数据，小程序自带
  regionChange(e) {
    console.log(e.detail.value);
    this.setData({
      region: e.detail.value
    })
  },
// 初始化省市区数据
initData(){
  // 获取默认的省市区索引
  let array = this.data.indexs;
  // 选择默认省份
  let selectProvince = this.data.provinces[0];
  // 找到省份对应的城市
  let the_cities = cities.filter(item=>{
    return item.provinceCode == selectProvince.code;
  });

// ---------------------------------------

  // 获取默认城市
  let selectCity = the_cities[0];
  // 找到城市对应的区
  let the_areas = areas.filter(item => {
    return item.cityCode == selectCity.code;
  });
  // 设置城市和区列表
  this.setData({
    cities: the_cities,
    areas: the_areas
  })
  // console.log(the_areas)
  // console.log(areas)
  // console.log(this.data.areas)
},

// 选择省市区事件函数
areaChoose(e){
  console.log(e.detail.value);
  // 当前选择器的值
  let current_value = e.detail.value;
  // data中记录的选择器的值
  let indexs = this.data.indexs;
  console.log(indexs)
  // 定义变量记录当前选中省市区对象
  let selectProvince,selectCity,selectArea;
  // 当前省份改变时
  if(indexs[0]!=current_value[0]){
    // 获取当前选中的省份对象
    selectProvince = this.data.provinces[current_value[0]];
    // 通过省份对象，更新城市列表
    let the_cities = cities.filter(item => {
      return item.provinceCode == selectProvince.code;
    });
  // 获取城市列表中的第一个城市
  selectCity = the_cities[0];
  // 通过城市列表，更新区域列表
    let the_areas = areas.filter(item => {
      return item.cityCode == selectCity.code;
    });
    this.setData({
      cities: the_cities,
      areas: the_areas,
      indexs:[current_value[0],0,0],
    })

  }else if(indexs[1]!=current_value[1]){
    // 当城市改变时
    // 找到当前省份
    selectProvince = this.data.provinces[current_value[0]];
    // 找到当前城市
    selectCity = this.data.cities[current_value[1]]
    // 通过城市列表，更新区域列表
    let the_areas = areas.filter(item => {
      return item.cityCode == selectCity.code;
    });
    console.log(the_areas)
    this.setData({
      areas: the_areas,
      indexs: [current_value[0], current_value[1], 0],
    })
  }else{
    // 当区发生改变时
    // 更新数据
    this.setData({
      indexs: [current_value[0], current_value[1], current_value[2]],
    })
  }

},




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化省市区列表
    this.initData()
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