// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息对象
    userInfo: null,
    // 系统信息对象
    systemInfo: null,
    onWifi: false,
    // 蓝牙开关
    onBluetooth: false,
    // 设置电量百分比
    percent: 0,
    isCharging: false,
    // 联系人的姓名和手机号
    displayName: null,
    phoneNumber: null,

    // 剪切板数据
    message: "默认数据",
    pasShow: false,
  },

  // 通过API ,获取用户信息的函数
  getUserInfo1() {
    // 调用API获取用户信息
    wx.getUserInfo({
      // 是否包含登录状态信息
      withCredentials: false.valueOf,
      // 设置返回数据语言, zh_CN简体中文
      lang: "zh_CN",
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  },
  // 通过按钮open-type属性获取用户信息的函数
  getUserInfo2(res) {
    console.log(res)
    this.setData({
      userInfo: res.detail.userInfo
    })
  },


  // 获取系统信息
  getSystemInfo1() {
    // 调用API获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          systemInfo: res
        })
      },
    })
  },

  // 切换WiFi的函数
  changeWifi(e) {
    console.log(e.detail.value);
    // 如果switch打开,就打开wifi
    if (e.detail.value) {
      wx.startWifi({
        success: () => {
          wx.showToast({
            title: 'wifi已开启',
          })
        },
        fail: (err) => {
          console.log(err)
        }
      })
    } else {
      wx.stopWifi({
        success: () => {
          wx.showToast({
            title: 'wifi已关闭',
          })
        },
        fail: (err) => {
          console.log(err)
        }
      })
    }
  },

  // 切换蓝牙的函数
  changeBluetooth(e) {
    if (e.detail.value) {
      wx.openBluetoothAdapter({
        success: () => {
          wx.showToast({
            title: '蓝牙已开启',
          })
        },
        fail: (err) => {
          console.log(err)
        }
      })
    } else {
      wx.closeBluetoothAdapter({
        success: () => {
          wx.showToast({
            title: '蓝牙已关闭',
            icon: "none"
          })
        },
        fail: (err) => {
          console.log(err)
        }
      })
    }
  },


  // 选择联系人按钮
  chooseFriend() {
    // console.log("12312")
    wx.chooseContact({
      success: (res) => {
        console.log(res)
        this.setData({
          displayName: res.displayName,
          phoneNumber: res.phoneNumber
        })
      }
    })
  },

  // 保存联系人
  saveFriend() {
    wx.addPhoneContact({
      firstName: this.data.displayName || "张三",
      mobilePhoneNumber: this.data.phoneNumber || "123"
    })
  },

  nameInput(e) {
    this.setData({
      displayName: e.detail.value
    })
  },

  phoneInput(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },

  // 拨打电话函数
  cail() {
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber || '10086',
    })
  },

  // 复制的输入框信息同步
  msgInput(e) {
    this.setData({
      message: e.detail.value
    })
  },

  copy() {
    // console.log(e)
    wx.setClipboardData({
      data: this.data.message,
    })
  },

  pasteLongTap() {
    this.setData({
      pasShow: true,
    })
  },

  // 
  paste() {
    // 从剪切板中取出数据
    wx.getClipboardData({
      success: (res) => {
        console.log()
        this.setData({
          pasteMsg: res.data
        })
      }
    })
  },


  /**函数--监听页面加载
   */
  onLoad: function (options) {
    // 检测wifi状态,获取系统信息,查看wifi状态
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          onWifi: res.wifiEnabled,
          onBluetooth: res.bluetoothEnabled
        })
      },
    })
    // 获取电量
    wx.getBatteryInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          percent: res.level,
          isCharging: res.isCharging
        })
      },
    })

    wx.getNetworkType({
      success: (res) => {
        this.setData({
          networkType: "当前网络状态" + res.networkType
        })
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