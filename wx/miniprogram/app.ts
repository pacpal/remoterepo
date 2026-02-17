import { IAppOption } from "./appoption"
import { getSetting, getUserInfo } from "./utils/wxapi"
import * as auth from './service/proto_gen/auth/auth_pb';
import camelcaseKeys from "camelcase-keys";
import { JsonValue } from "@bufbuild/protobuf";
let resolveUserInfoPromise: (value: WechatMiniprogram.UserInfo | PromiseLike<WechatMiniprogram.UserInfo>) => void
let rejectUserInfoPromise: (reason?: any) => void

// app.ts
App<IAppOption>({
  globalData: {
    userInfo: new Promise((resolve, reject) => {
      resolveUserInfoPromise = resolve
      rejectUserInfoPromise = reject
    })
  },
  async onLaunch() {
    //登录
    wx.login({
      success: res =>{
        console.log(res.code)
        wx.request({
          url:'http://localhost:8080/auth/login',
          method:'POST',
          data:{
            code: res.code
          }as auth.LoginRequest,
          success: reqRes =>{
            const loginResp = auth.LoginResponse.fromJson(camelcaseKeys(reqRes.data as Object)as JsonValue);
            console.log(loginResp);
          },
          fail:console.error,
        })
      },
    })
   // 获取用户信息
    try {
      const setting = await getSetting()
      if (setting.authSetting['scope.userInfo']) {
        const userInfoRes = await getUserInfo()
        resolveUserInfoPromise(userInfoRes.userInfo)
      }
    } catch (err) {
      rejectUserInfoPromise(err)
    }
  },
  resolveUserInfo(userInfo: WechatMiniprogram.UserInfo) {
    resolveUserInfoPromise(userInfo)
  }
})