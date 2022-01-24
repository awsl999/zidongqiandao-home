// ==UserScript==
// @name         zidongqiandao
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://app.upc.edu.cn/ncov/wap/default/index
// @match        https://app.upc.edu.cn/uc/wap/login*
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// ==/UserScript==

(function() {
    'use strict';
    // 检测是否登录
    if (window.location.pathname == "/uc/wap/login") {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                document.getElementsByTagName('input')[0].value = 'Z19070051';
                document.getElementsByTagName('input')[1].value = 'Sg112406';
                resolve('success')
            },5000)
        }).then(res => {
            setTimeout(() => {
                document.getElementsByClassName('btn')[0].click();
            },5000)
        })
    }
   // Your code here...
   new Promise((resolve, reject) => {
       setTimeout(() => {
           // document.getElementsByClassName('text')[5].click();
           // document.getElementsByClassName('text')[5].click();
           // document.getElementsByClassName('text')[5].click();
            if (vm.info.area == "") {
                vm.info.address = "山东省青岛市黄岛区薛家岛街道青岛港捷丰国际物流有限公司办公楼";
                vm.info.area = "山东省 青岛市 黄岛区";
                vm.info.city = "青岛市";
                vm.info.geo_api_info = '{"type":"complete","position":{"Q":35.995192057292,"R":120.22873589409801,"lng":120.228736,"lat":35.995192},"location_type":"html5","message":"Get ipLocation failed.Get geolocation success.Convert Success.Get address success.","accuracy":13779,"isConverted":true,"status":1,"addressComponent":{"citycode":"0532","adcode":"370211","businessAreas":[],"neighborhoodType":"","neighborhood":"","building":"","buildingType":"","street":"同江路","streetNumber":"568号","country":"中国","province":"山东省","city":"青岛市","district":"黄岛区","township":"薛家岛街道"},"formattedAddress":"山东省青岛市黄岛区薛家岛街道青岛港捷丰国际物流有限公司办公楼","roads":[],"crosses":[],"pois":[],"info":"SUCCESS"}'
            }
           resolve('sucess')
       }, 10000)
   }).then(res => {
       return new Promise((resolve, reject) => {
           setTimeout(() => {
               if (document.getElementsByTagName('a')[2]) {
                   document.getElementsByTagName('a')[2].click();
               }
               resolve("success");
           }, 5000);
       })
   }).then(res => {
       return new Promise((resolve, reject) => {
           setTimeout(() => {
               if (document.getElementsByClassName('wapcf-btn-ok')[0]) {
                   document.getElementsByClassName('wapcf-btn-ok')[0].click();
               }
               resolve("success");
           }, 5000);
       })
   }).then(res => {
       setTimeout(() => {
           let info;
           if (document.getElementsByClassName('wapat-title')[0]) {
               info = document.getElementsByClassName('wapat-title')[0].innerHTML;
           }
           GM_xmlhttpRequest({
               method: "GET",
               url: "http://127.0.0.1:3000?info=" + info + "&rand=fafdagadafa",
               onload: function(response) {
                   //这里写处理函数
                   console.log(response.status)
               }
           });
           console.log(info)
       }, 5000)
   })
})();