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
exports.Coolcar = void 0;
const camelcaseKeys = require("camelcase-keys");
const auth_pb_1 = require("./proto_gen/auth/auth_pb");
var Coolcar;
(function (Coolcar) {
    Coolcar.serverAddr = 'http://81.69.182.228';
    Coolcar.wsAddr = 'ws://81.69.182.228';
    const AUTH_ERR = 'AUTH_ERR';
    const authData = {
        token: '',
        expiryMs: 0,
    };
    function sendRequestWithAuthRetry(o, a) {
        return __awaiter(this, void 0, void 0, function* () {
            const authOpt = a || {
                attachAuthHeader: true,
                retryOnAuthError: true,
            };
            try {
                yield login();
                return sendRequest(o, authOpt);
            }
            catch (err) {
                if (err === AUTH_ERR && authOpt.retryOnAuthError) {
                    authData.token = '';
                    authData.expiryMs = 0;
                    return sendRequestWithAuthRetry(o, {
                        attachAuthHeader: authOpt.attachAuthHeader,
                        retryOnAuthError: false,
                    });
                }
                else {
                    throw err;
                }
            }
        });
    }
    Coolcar.sendRequestWithAuthRetry = sendRequestWithAuthRetry;
    function login() {
        return __awaiter(this, void 0, void 0, function* () {
            if (authData.token && authData.expiryMs >= Date.now()) {
                return;
            }
            const wxResp = yield wxLogin();
            const reqTimeMs = Date.now();
            const resp = yield sendRequest({
                method: 'POST',
                path: '/v1/auth/login',
                data: {
                    code: wxResp.code,
                },
                respMarshaller: auth_pb_1.auth.v1.LoginResponse.fromObject,
            }, {
                attachAuthHeader: false,
                retryOnAuthError: false,
            });
            authData.token = resp.accessToken;
            authData.expiryMs = reqTimeMs + resp.expiresIn * 1000;
        });
    }
    Coolcar.login = login;
    function sendRequest(o, a) {
        return new Promise((resolve, reject) => {
            const header = {};
            if (a.attachAuthHeader) {
                if (authData.token && authData.expiryMs >= Date.now()) {
                    header.authorization = 'Bearer ' + authData.token;
                }
                else {
                    reject(AUTH_ERR);
                    return;
                }
            }
            wx.request({
                url: Coolcar.serverAddr + o.path,
                method: o.method,
                data: o.data,
                header,
                success: res => {
                    if (res.statusCode === 401) {
                        reject(AUTH_ERR);
                    }
                    else if (res.statusCode >= 400) {
                        reject(res);
                    }
                    else {
                        resolve(o.respMarshaller(camelcaseKeys(res.data, {
                            deep: true,
                        })));
                    }
                },
                fail: reject,
            });
        });
    }
    function wxLogin() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: resolve,
                fail: reject,
            });
        });
    }
    function uploadfile(o) {
        const data = wx.getFileSystemManager().readFileSync(o.localPath);
        return new Promise((resolve, reject) => {
            wx.request({
                method: 'PUT',
                url: o.url,
                data,
                success: res => {
                    if (res.statusCode >= 400) {
                        reject(res);
                    }
                    else {
                        resolve();
                    }
                },
                fail: reject,
            });
        });
    }
    Coolcar.uploadfile = uploadfile;
})(Coolcar = exports.Coolcar || (exports.Coolcar = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWdEO0FBQ2hELHNEQUErQztBQUUvQyxJQUFpQixPQUFPLENBaUl2QjtBQWpJRCxXQUFpQixPQUFPO0lBQ1Asa0JBQVUsR0FBRyxzQkFBc0IsQ0FBQTtJQUNuQyxjQUFNLEdBQUcsb0JBQW9CLENBQUE7SUFDMUMsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFBO0lBRTNCLE1BQU0sUUFBUSxHQUFHO1FBQ2IsS0FBSyxFQUFFLEVBQUU7UUFDVCxRQUFRLEVBQUUsQ0FBQztLQUNkLENBQUE7SUFjRCxTQUFzQix3QkFBd0IsQ0FBVyxDQUEwQixFQUFFLENBQWM7O1lBQy9GLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSTtnQkFDakIsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsZ0JBQWdCLEVBQUUsSUFBSTthQUN6QixDQUFBO1lBQ0QsSUFBSTtnQkFDQSxNQUFNLEtBQUssRUFBRSxDQUFBO2dCQUNiLE9BQU8sV0FBVyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTthQUNqQztZQUFDLE9BQU0sR0FBRyxFQUFFO2dCQUNULElBQUksR0FBRyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7b0JBQzlDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO29CQUNuQixRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQTtvQkFDckIsT0FBTyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUU7d0JBQy9CLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxnQkFBZ0I7d0JBQzFDLGdCQUFnQixFQUFFLEtBQUs7cUJBQzFCLENBQUMsQ0FBQTtpQkFDTDtxQkFBTTtvQkFDSCxNQUFNLEdBQUcsQ0FBQTtpQkFDWjthQUNKO1FBQ0wsQ0FBQztLQUFBO0lBcEJxQixnQ0FBd0IsMkJBb0I3QyxDQUFBO0lBRUQs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RSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ1AsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHO2dCQUNWLElBQUk7Z0JBQ0osT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNYLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUU7d0JBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtxQkFDZDt5QkFBTTt3QkFDSCxPQUFPLEVBQUUsQ0FBQTtxQkFDWjtnQkFDTCxDQUFDO2dCQUNELElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBakJlLGtCQUFVLGFBaUJ6QixDQUFBO0FBQ0wsQ0FBQyxFQWpJZ0IsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBaUl2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjYW1lbGNhc2VLZXlzID0gcmVxdWlyZShcImNhbWVsY2FzZS1rZXlzXCIpXG5pbXBvcnQgeyBhdXRoIH0gZnJvbSBcIi4vcHJvdG9fZ2VuL2F1dGgvYXV0aF9wYlwiXG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29vbGNhciB7XG4gICAgZXhwb3J0IGNvbnN0IHNlcnZlckFkZHIgPSAnaHR0cDovLzgxLjY5LjE4Mi4yMjgnXG4gICAgZXhwb3J0IGNvbnN0IHdzQWRkciA9ICd3czovLzgxLjY5LjE4Mi4yMjgnXG4gICAgY29uc3QgQVVUSF9FUlIgPSAnQVVUSF9FUlInXG5cbiAgICBjb25zdCBhdXRoRGF0YSA9IHtcbiAgICAgICAgdG9rZW46ICcnLFxuICAgICAgICBleHBpcnlNczogMCxcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RPcHRpb248UkVRLCBSRVM+IHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJ3wnUFVUJ3wnUE9TVCd8J0RFTEVURSdcbiAgICAgICAgcGF0aDogc3RyaW5nXG4gICAgICAgIGRhdGE/OiBSRVFcbiAgICAgICAgcmVzcE1hcnNoYWxsZXI6IChyOiBvYmplY3QpPT5SRVNcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIEF1dGhPcHRpb24ge1xuICAgICAgICBhdHRhY2hBdXRoSGVhZGVyOiBib29sZWFuXG4gICAgICAgIHJldHJ5T25BdXRoRXJyb3I6IGJvb2xlYW5cbiAgICB9XG5cbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZFJlcXVlc3RXaXRoQXV0aFJldHJ5PFJFUSwgUkVTPihvOiBSZXF1ZXN0T3B0aW9uPFJFUSwgUkVTPiwgYT86IEF1dGhPcHRpb24pOiBQcm9taXNlPFJFUz4ge1xuICAgICAgICBjb25zdCBhdXRoT3B0ID0gYSB8fCB7XG4gICAgICAgICAgICBhdHRhY2hBdXRoSGVhZGVyOiB0cnVlLFxuICAgICAgICAgICAgcmV0cnlPbkF1dGhFcnJvcjogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgbG9naW4oKVxuICAgICAgICAgICAgcmV0dXJuIHNlbmRSZXF1ZXN0KG8sIGF1dGhPcHQpXG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyID09PSBBVVRIX0VSUiAmJiBhdXRoT3B0LnJldHJ5T25BdXRoRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBhdXRoRGF0YS50b2tlbiA9ICcnXG4gICAgICAgICAgICAgICAgYXV0aERhdGEuZXhwaXJ5TXMgPSAwXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbmRSZXF1ZXN0V2l0aEF1dGhSZXRyeShvLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaEF1dGhIZWFkZXI6IGF1dGhPcHQuYXR0YWNoQXV0aEhlYWRlcixcbiAgICAgICAgICAgICAgICAgICAgcmV0cnlPbkF1dGhFcnJvcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9naW4oKSB7XG4gICAgICAgIGlmIChhdXRoRGF0YS50b2tlbiAmJiBhdXRoRGF0YS5leHBpcnlNcyA+PSBEYXRlLm5vdygpKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3eFJlc3AgPSBhd2FpdCB3eExvZ2luKClcbiAgICAgICAgY29uc3QgcmVxVGltZU1zID0gRGF0ZS5ub3coKVxuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgc2VuZFJlcXVlc3Q8YXV0aC52MS5JTG9naW5SZXF1ZXN0LCBhdXRoLnYxLklMb2dpblJlc3BvbnNlPiAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBwYXRoOiAnL3YxL2F1dGgvbG9naW4nLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGNvZGU6IHd4UmVzcC5jb2RlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc3BNYXJzaGFsbGVyOiBhdXRoLnYxLkxvZ2luUmVzcG9uc2UuZnJvbU9iamVjdCxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYXR0YWNoQXV0aEhlYWRlcjogZmFsc2UsXG4gICAgICAgICAgICByZXRyeU9uQXV0aEVycm9yOiBmYWxzZSxcbiAgICAgICAgfSlcbiAgICAgICAgYXV0aERhdGEudG9rZW4gPSByZXNwLmFjY2Vzc1Rva2VuIVxuICAgICAgICBhdXRoRGF0YS5leHBpcnlNcyA9IHJlcVRpbWVNcyArIHJlc3AuZXhwaXJlc0luISAqIDEwMDBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZW5kUmVxdWVzdDxSRVEsIFJFUz4obzogUmVxdWVzdE9wdGlvbjxSRVEsIFJFUz4sIGE6IEF1dGhPcHRpb24pOiBQcm9taXNlPFJFUz4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge31cbiAgICAgICAgICAgIGlmIChhLmF0dGFjaEF1dGhIZWFkZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXV0aERhdGEudG9rZW4gJiYgYXV0aERhdGEuZXhwaXJ5TXMgPj0gRGF0ZS5ub3coKSkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXIuYXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIGF1dGhEYXRhLnRva2VuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KEFVVEhfRVJSKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6IHNlcnZlckFkZHIgKyBvLnBhdGgsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBvLm1ldGhvZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBvLmRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoQVVUSF9FUlIpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1c0NvZGUgPj0gNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvLnJlc3BNYXJzaGFsbGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbWVsY2FzZUtleXMocmVzLmRhdGEgYXMgb2JqZWN0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3QsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHd4TG9naW4oKTogUHJvbWlzZTxXZWNoYXRNaW5pcHJvZ3JhbS5Mb2dpblN1Y2Nlc3NDYWxsYmFja1Jlc3VsdD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgd3gubG9naW4oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlc29sdmUsXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIFVwbG9hZEZpbGVPcHRzIHtcbiAgICAgICAgbG9jYWxQYXRoOiBzdHJpbmdcbiAgICAgICAgdXJsOiBzdHJpbmdcbiAgICB9XG4gICAgZXhwb3J0IGZ1bmN0aW9uIHVwbG9hZGZpbGUobzogVXBsb2FkRmlsZU9wdHMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHd4LmdldEZpbGVTeXN0ZW1NYW5hZ2VyKCkucmVhZEZpbGVTeW5jKG8ubG9jYWxQYXRoKVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICB1cmw6IG8udXJsLFxuICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID49IDQwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3QsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbn0iXX0=