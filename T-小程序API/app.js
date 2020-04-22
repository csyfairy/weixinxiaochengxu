//app.js
App({
  // 程序加载函数,是整个小程序的入口, 类似于页面的omLoad函数
  onLaunch: function () {

    // 设置tabBar分页标题上的标记, 可以在app.js中设置,可以设置任何一页
    wx.setTabBarBadge({
      // index表示tabbar中的标题索引,从0开始
      index: 1,
      // 在分页标题右上角显示的信息
      text: "8",
    })
    // 设置tabbar分页标题右上角显示小红点
    wx.showTabBarRedDot({
      // 标题索引
      index: 2,
    })


    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 小程序的全局数据,可以在任何页面调用,类似于vue的vuex或react的redux
  globalData: {
    userInfo: null,
  }
})