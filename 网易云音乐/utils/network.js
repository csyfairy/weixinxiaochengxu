// 封装一个工具类：处理网络请求, 把这个小程序中所有的网络请求全都发放在这个文件, 便于管理,  定义服务器地址, 全局只此一份, 修改地址比较方便
const host = "http://liuyabin.top:3000"

// 登陆请求
function loginRequest(phone,password){
  // 返回一个promise
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/login/cellphone',
      data: {
        phone,
        password
      },
      success: (res) => {
        console.log(res);
        // 完成登录后 , 会在浏览器保存一个 Cookies 用作登录凭证 , 大部分 API 都需要用到这个 Cookies
        // 但是微信小程序不支持 Cookies 操作，所以必须手动保存和发送 Cookies。
        // console.log(res.header);
        wx.setStorageSync("Cookies", res.header["Set-Cookie"] || res.header["set-cookie"]);
        // 把 userId 也存起来，因为后面很多接口需要用到 userId
        wx.setStorageSync("uid", res.data.profile && res.data.profile.userId);
        
        // 成功需要触发resolve（会触发then）
        resolve(res.data);
      },
      fail(err) {
        // console.log(err);
        // 失败需要触发reject（会触发catch）
        reject(err);
      }
    })
  });
}

// 获取用户信息
function userInfoRequest(uid) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/user/detail',
      data: {
        uid
      },
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}

// 退出登录请求
function logoutRequest(){
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/logout',
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}

// 获取验证码
function getVarCodeRequest(phone) {
  return new Promise(function (resolve, reject) {
    // console.log("http://liuyabin.top:3000/captcha/sent?phone=" + phone)
    wx.request({
      url: host + '/captcha/sent?phone=' + phone,
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}

//检测手机号码是否已注册
function phoneRegisterStateRequest(phone){
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/cellphone/existence/check?phone=' + phone,
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}

// 注册请求
function registerRequest(phone, password, nickname, captcha) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/captcha/sent',
      data: {
        phone,
        password,
        nickname,
        captcha
      },
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}

// 推荐歌单
function recommendListRequest(){
  // 要保证函数返回值是网络请求的结果,而网络请求是异步请求,promise刚合适
  return new Promise(function(resolve,reject){
    // wx.request是异步请求, 所以用Promise接受异步请求数据
    wx.request({
      url: host + '/personalized',
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}

// 根据歌单id 获取歌单详情
function userPlayListInfoRequest(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/playlist/detail',
      data: {
        id
      },
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}

// 推荐歌曲(需要登陆)
function recommendMuisRequest(){
  return new Promise(function(resolve,reject){
    wx.request({
      url: host + '/recommend/songs',
      // 设置请求头,小程序不会像浏览器那样默认把本地cookie信息发送到服务器, 小程序本地是没有cookie信息的, 就需要手动设置cookie信息,在访问需要登录的接口时,把用户的登录信息(本地存储的cookie字段)发给服务器, 
      header: {
        // 网易云音乐有些接口是需要登陆的（登录成功需要把登录证书存入本地Cookies字段中）
        "cookie": wx.getStorageSync("Cookies")
        // 如果cookie字段中有登录证书,会得到请求数据, 否则得到状态码301(需要登录)
      },
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}

// 请求热搜关键字
function hotwordRequest() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/search/hot',
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}

// 关键字搜索
function keywordRequest(keywords, offset) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/search',
      data: {
        keywords,  // 搜索关键字
        offset     // 搜索结果偏移数量, 0 表示请求前30条结果  10表示第11到第40条数据
      },
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}

// 根据歌曲id，获取歌曲的url
function songUrlRequest(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/song/url',
      data: {
        id
      },
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}

// 根据歌曲id获取歌词
function lyricRequest(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/lyric',
      data: {
        id
      },
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}

// 获取用户的歌单id
function userPlayListIdRequest(uid) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/user/playlist',
      data: {
        uid
      },
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}
// 根据歌单id获取用户的歌单详情
function userPlayListInfoRequest(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/playlist/detail',
      data: {
        id
      },
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}
// 对歌单添加或删除歌曲
function updateMyPlayListRequest(op, pid, tracks) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + '/playlist/tracks',
      data: {
        op,  // 增加还是删除
        pid,  // 歌单id
        tracks  // 歌曲id
      },
      header: {
        // 网易云音乐有些接口是需要登陆的（需要把你本地的cookies发送给服务器）
        "cookie": wx.getStorageSync("Cookies")
      },
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  });
}

// 导出数据
export {
  loginRequest,
  lyricRequest,
  logoutRequest,
  hotwordRequest,
  keywordRequest,
  songUrlRequest,
  registerRequest,
  userInfoRequest,
  getVarCodeRequest,
  recommendListRequest,
  recommendMuisRequest,
  userPlayListIdRequest,
  userPlayListInfoRequest,
  updateMyPlayListRequest,
  phoneRegisterStateRequest,
  
}