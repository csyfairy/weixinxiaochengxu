//index.js
//获取应用实例
const app = getApp()
// 导入网络请求模块中对当前页有用的请求函数
import { recommendListRequest, recommendMuisRequest } from "../../utils/network.js"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 推荐歌单列表
    recommendList: null,
    // 推荐歌曲列表
    recommendMusic: null
  },

  // 页面显示刷新数据
  onShow(){
    // console.log("显示")
    // 请求每日歌单, 函数返回的是promise对象
    recommendListRequest().then(data => {
      // console.log(data);
      this.setData({
        recommendList: data.result
      });
    });

    // 请求每日歌曲
    recommendMuisRequest().then(data => {
      // console.log(data)
      // 状态码200说明已登录并拿到了数据
      if (data.code == 200) {
        this.setData({
          recommendMusic: data.recommend
        });
      } else {
        // 先清空账号的每日推荐歌曲
        this.setData({
          recommendMusic: null
        })
        // 提示登录
        wx.showModal({
          title: '温馨提示',
          content: data.msg,
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          }
        })
      }
    });
  },

  /**
   * 点击播放我的歌单
   */
  playMyList(e) {
    // 判断登录状态
    if (app.globalData.uid) {
      if (app.globalData.currentPlayList != app.globalData.myPlayList) {
        app.setCurrentPlayList(app.globalData.myPlayList);
      }
    } else {
      wx.showModal({
        title: '温馨提示',
        content: "请先登陆才能访问我的歌单",
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    }
  },



})