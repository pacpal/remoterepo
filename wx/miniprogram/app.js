"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./service/request");
const wxapi_1 = require("./utils/wxapi");
let resolveUserInfo;
let rejectUserInfo;
App({
    globalData: {
        userInfo: new Promise((resolve, reject) => {
            resolveUserInfo = resolve;
            rejectUserInfo = reject;
        })
    },
    onLaunch() {
        return __awaiter(this, void 0, void 0, function* () {
            wx.request({
                url: 'http://localhost:8080/trip/trip123',
                method: 'GET',
                success: (res) => console.log(res),
                fail: (err) => console.error(err),
            });
            request_1.Coolcar.login();
            try {
                const setting = yield wxapi_1.getSetting();
                if (setting.authSetting['scope.userInfo']) {
                    const userInfoRes = yield wxapi_1.getUserInfo();
                    resolveUserInfo(userInfoRes.userInfo);
                }
            }
            catch (err) {
                rejectUserInfo(err);
            }
        });
    },
    resolveUserInfo(userInfo) {
        resolveUserInfo(userInfo);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsK0NBQTJDO0FBQzNDLHlDQUF1RDtBQUV2RCxJQUFJLGVBQXNHLENBQUE7QUFDMUcsSUFBSSxjQUFzQyxDQUFBO0FBRzFDLEdBQUcsQ0FBYTtJQUNkLFVBQVUsRUFBRTtRQUNWLFFBQVEsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN4QyxlQUFlLEdBQUcsT0FBTyxDQUFBO1lBQ3pCLGNBQWMsR0FBRyxNQUFNLENBQUE7UUFDekIsQ0FBQyxDQUFDO0tBQ0g7SUFDSyxRQUFROztZQUNaLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsR0FBRyxFQUFDLG9DQUFvQztnQkFDeEMsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFDbEMsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNsQyxDQUFDLENBQUE7WUFFRixpQkFBTyxDQUFDLEtBQUssRUFBRSxDQUFBO1lBR2YsSUFBSTtnQkFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLGtCQUFVLEVBQUUsQ0FBQTtnQkFDbEMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBQ3pDLE1BQU0sV0FBVyxHQUFHLE1BQU0sbUJBQVcsRUFBRSxDQUFBO29CQUN2QyxlQUFlLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2lCQUN0QzthQUNGO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ3BCO1FBQ0gsQ0FBQztLQUFBO0lBQ0QsZUFBZSxDQUFDLFFBQW9DO1FBQ2xELGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMzQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUFwcE9wdGlvbiB9IGZyb20gXCIuL2FwcG9wdGlvblwiXG5pbXBvcnQgeyBDb29sY2FyIH0gZnJvbSBcIi4vc2VydmljZS9yZXF1ZXN0XCJcbmltcG9ydCB7IGdldFNldHRpbmcsIGdldFVzZXJJbmZvIH0gZnJvbSBcIi4vdXRpbHMvd3hhcGlcIlxuXG5sZXQgcmVzb2x2ZVVzZXJJbmZvOiAodmFsdWU6IFdlY2hhdE1pbmlwcm9ncmFtLlVzZXJJbmZvIHwgUHJvbWlzZUxpa2U8V2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8+KSA9PiB2b2lkXG5sZXQgcmVqZWN0VXNlckluZm86IChyZWFzb24/OiBhbnkpID0+IHZvaWRcblxuLy8gYXBwLnRzXG5BcHA8SUFwcE9wdGlvbj4oe1xuICBnbG9iYWxEYXRhOiB7XG4gICAgdXNlckluZm86IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlc29sdmVVc2VySW5mbyA9IHJlc29sdmVcbiAgICAgIHJlamVjdFVzZXJJbmZvID0gcmVqZWN0XG4gICAgfSlcbiAgfSxcbiAgYXN5bmMgb25MYXVuY2goKSB7XG4gICAgd3gucmVxdWVzdCh7XG4gICAgICB1cmw6J2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC90cmlwL3RyaXAxMjMnLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IGNvbnNvbGUubG9nKHJlcyksXG4gICAgICBmYWlsOiAoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVyciksXG4gICAgfSlcbiAgICAvLyDnmbvlvZVcbiAgICBDb29sY2FyLmxvZ2luKClcblxuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZXR0aW5nID0gYXdhaXQgZ2V0U2V0dGluZygpXG4gICAgICBpZiAoc2V0dGluZy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICBjb25zdCB1c2VySW5mb1JlcyA9IGF3YWl0IGdldFVzZXJJbmZvKClcbiAgICAgICAgcmVzb2x2ZVVzZXJJbmZvKHVzZXJJbmZvUmVzLnVzZXJJbmZvKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmVqZWN0VXNlckluZm8oZXJyKVxuICAgIH1cbiAgfSxcbiAgcmVzb2x2ZVVzZXJJbmZvKHVzZXJJbmZvOiBXZWNoYXRNaW5pcHJvZ3JhbS5Vc2VySW5mbykge1xuICAgIHJlc29sdmVVc2VySW5mbyh1c2VySW5mbylcbiAgfVxufSkiXX0=