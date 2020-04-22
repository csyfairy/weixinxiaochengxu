// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,//用户信息对象
    systemInfo:null,//系统信息对象
    onWiFi:false,//打开关闭WiFi
    onBluetooth:false,//蓝牙开关
    percent:0,//电量
    isCharging:false,//是否正在充电中
    phoneNumber:null,//联系人手机号
    displayName: "",// 联系人姓名
    message:'剪切板中放入的默认数据',
    pasteMsg:"",//粘贴板中数据
    copyShow:false,//粘贴按钮默认隐藏
    networkType:"获取网络类型",
  },


// 通过API获取用户信息的函数
  getUserInfo1(){
    // 调用API获取用户信息
    wx.getUserInfo({
      // 是否包含用户登录信息
      withCredentials:false,
      lang:"zh_CN",//返回数据的语言，zh_CN简体中文
      success:(res)=>{
        console.log(res);
        this.setData({
          userInfo:res.userInfo,
        })
      }
    })

  },

  // 通过open-type属性获取用户信息的函数
  getUserInfo2(res) {
    console.log(res)
   this.setData({
     userInfo:res.detail.userInfo
   })
  },

// 获取系统信息
  getSystemInfo(){
    // 调用API
    wx.getSystemInfo({
      success: (res)=> {
        console.log(res)
        this.setData({
          systemInfo:res
        })
      },
    })
  },

// 切换WiFi的函数
  changeWiFi(e){
    console.log(e.detail.value);
    // 如果switch打开，就打开WiFi
    if(e.detail.value){
      wx.startWifi({
        success(){
          wx.showToast({
            title: 'WiFi已开启',
          })
        },
        fail(err){
          console.log(err)
        }
      })
    }else{
      wx.stopWifi({
        success(){
          wx.showToast({
            title: 'WiFi已关闭',
          })
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  },
// 切换蓝牙的函数
  changeBluetooth(e){
    console.log(e)
    if(e.detail.value){
      console.log("235")
      wx.openBluetoothAdapter({
        success: (res) => {
          console.log("xiaxia")
          wx.showToast({
            title: '蓝牙已开启',
          })
        },
        fail(err){
          console.log(err,"不能获取")
        }
      })
    }else{
      wx.closeBluetoothAdapter({
        success: (res)=> {
          wx.showToast({
            title: '蓝牙已关闭',
          })
        },
      })
    }
  },

// 选择联系人的函数
  chooseFriend(){
    wx.chooseContact({
      success:(res)=>{
        console.log(res)
        this.setData({
          phoneNumber:res.phoneNumber,
          displayName:res.displayName
        })
      },
      fail(err){
        console.log(err)
      }
    })
  },
// 保存联系人的函数
  saveFriend(){
    wx.addPhoneContact({
      firstName:this.data.displayName || '中国联通',
      mobilePhoneNumber:this.data.phoneNumber || '10010'
    })
  },
// 同步姓名输入框
nameInput(e){
  this.setData({
    displayName:e.detail.value
  })
},
  // 同步电话输入框
phoneInput(e) {
  this.setData({
    phoneNumber: e.detail.value
  })
},


// 拨打电话的函数
call(){
  wx.makePhoneCall({
    phoneNumber: this.data.phoneNumber||'10086'
  })
},

// 复制的输入框信息同步
msgInput(e){
  this.setData({
    message:e.detail.value
  })
},
// 长按复制函数
copy(e){
  // 把输入框中的数据放入剪切板
  wx.setClipboardData({
    data: this.data.message,
    success:(res)=>{
      console.log(res.data, "aaa");
      console.log(res);
    },
    fail(err){
      console.log(err)
    }
  })
},
// 点击/长按粘贴函数
paste(){
  // 从剪切板中取出数据
  wx.getClipboardData({
    success: (res) => {
      this.setData({
        pasteMsg:res.data,
        copyShow:false
      })
    }
  })
 
},

// 长按显示粘贴按钮
pastLongTap(){
  this.setData({
    copyShow:true
  })
},

// 获取网络类型函数
network(){
  wx.getNetworkType({
    success: (res)=> {
      this.setData({
        networkType:'当前网络类型是:'+res.networkType
      })
    },
  })
},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检测WiFi状态，获取系统信息，查看WiFi状态
    wx.getSystemInfo({
      success: (res)=> {
        console.log(res)
        this.setData({
          onWiFi: res.wifiEnabled,
          onBluetooth: res.bluetoothEnabled
        })
      },
    })

  // 获取当前电量
  wx.getBatteryInfo({
    success:(res)=>{
      console.log(res);
      this.setData({
        percent:res.level,
        isCharging: res.isCharging
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