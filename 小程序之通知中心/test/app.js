//app.js
App({
  globalData: {
    userInfo: null
  },


  // 1.可以把一些共享的数据定义到app.js，那么其他页面是可以访问到的
  appID: "wx3b0f2bcc839ac32b",
  // 2.通知中心，实现页面共享数据
  notificationCenter: {
    // 通知中心：保存所有的通知回调函数
    notiList: {},
    // 通过 on 给中心注册事件
    on(notiName, callback) {
      if (!this.notiList[notiName]) {
        this.notiList[notiName] = [];
        // console.log("1111111111")
      }
      this.notiList[notiName].push(callback);
      console.log(this.notiList)
    },
    // 通过 off 给中心注销事件
    off(notiName, callback) {
      if (this.notiList[notiName]) {
        var index = this.notiList[notiName].indexOf(callback);
        if (index >= 0) {
          this.notiList[notiName].splice(index, 1);
          // console.log("222222222")
        }
      }
    }
  },
  onLaunch: function () {
    // 延时去干一些事情
    setTimeout(() => {
      let temp = this.notificationCenter.notiList["meili881"];
      if (temp) {
        temp.forEach(cb => {
          // console.log(11111);
          cb("回答正确");
        });
      }
    }, 10000);

    setTimeout(() => {
      let temp = this.notificationCenter.notiList["jiaotongguangbo"];
      if (temp) {
        temp.forEach(cb => {
          // console.log(11111);
          cb("回答错误"+this.appID);
        });
      }
    }, 15000);
  }

})