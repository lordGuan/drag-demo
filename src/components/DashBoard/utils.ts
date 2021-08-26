import { lazy } from "react";
import request_ from "../../utils/request";
export const request = request_;



  


class RequestThrottle_ {
  public urls: any;

  constructor() {
    this.urls = {};
  }

  getUrlFromUrls(url: string) {
    return this.urls[url] || null;
  }

  hasRepeatValidUrl(url: string) {
    if (this.urls[url]) {
      return true;
    }
    return false;
  }

  // 增加请求
  appendUrl(url: string) {
    const urlInitItem = {
      res: null,
      status: "pendding",
      startTime: new Date().getTime(),
      finishTime: -1,
      subscriberCallbacks: [],
    };

    this.urls[url] = urlInitItem;
  }

  // 更新请求结果
  updateUrlRes(url: string, res: any) {
    this.urls[url].res = res;
    this.urls[url].status = "success";
    this.urls[url].finishTime = new Date().getTime();
    this.urls[url].subscriberCallbacks.forEach(
      (callback: Function, index: number) => {
        callback(res);
      }
    );
  }

  // 订阅请求
  subscribe(url: string, callback: Function) {
    this.urls[url].subscriberCallbacks.push(callback);
  }
}
// @ts-ignore
RequestThrottle_.getInstance = (function () {
  let instance: any;
  return function () {
    if (!instance) {
      return new RequestThrottle_();
    }
    return instance;
  };
})();
// @ts-ignore
export const RequestThrottle = RequestThrottle_.getInstance();
