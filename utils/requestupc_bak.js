var request = require('request');
const schedule = require('node-schedule');
const dingshi = require('../utils/dingshi');
const emailTo = require('./email/sendEmail').emailTo
const sd = require('silly-datetime')
var options = {
  'method': 'POST',
  'url': 'https://app.upc.edu.cn/ncov/wap/default/save',
  'headers': {
    'Cookie': 'UUkey=87e258bb20ff68817f56afdce1e30713; eai-sess=7sisoredg4lpi97oqcu228grh4; Hm_lvt_48b682d4885d22a90111e46b972e3268=1612682392; Hm_lpvt_48b682d4885d22a90111e46b972e3268=1612685872',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63'
  },
  form: {
    'sfzgsxsx': '0',
    'sfzhbsxsx': '0',
    'ismoved': '0',
    'tw': '3',
    'sfcxtz': '0',
    'sfjcbh': '0',
    'sfcxzysx': '0',
    'qksm': '',
    'sfyyjc': '0',
    'jcjgqr': '0',
    'remark': '',
    'address': '山东省青岛市黄岛区长江路街道华东路中国石油大学(华东)',
    'geo_api_info': '{"type":"complete","position":{"Q":35.94205078125,"R":120.181632215712,"lng":120.181632,"lat":35.942051},"location_type":"html5","message":"Get geolocation success.Convert Success.Get address success.","accuracy":220,"isConverted":true,"status":1,"addressComponent":{"citycode":"0532","adcode":"370211","businessAreas":[],"neighborhoodType":"","neighborhood":"","building":"","buildingType":"","street":"漓江西路","streetNumber":"989号","country":"中国","province":"山东省","city":"青岛市","district":"黄岛区","township":"长江路街道"},"formattedAddress":"山东省青岛市黄岛区长江路街道珠江路中国石油大学(华东)","roads":[],"crosses":[],"pois":[],"info":"SUCCESS"}',
    'area': '山东省 青岛市 黄岛区',
    'province': '山东省',
    'city': '青岛市',
    'sfzx': '1',
    'sfjcwhry': '0',
    'sfjchbry': '0',
    'sfcyglq': '0',
    'gllx': '',
    'glksrq': '',
    'jcbhlx': '',
    'jcbhrq': '',
    'bztcyy': '',
    'sftjhb': '0',
    'sftjwh': '0',
    'jcjg': '',
    'uid': '180671',
    'created': '1614009644',
    'date': '20210223',
    'jcqzrq': '',
    'sfjcqz': '',
    'szsqsfybl': '0',
    'sfsqhzjkk': '0',
    'sqhzjkkys': '',
    'sfygtjzzfj': '0',
    'gtjzzfjsj': '',
    'fxyy': '',
    'szcs': '',
    'szgj': '',
    'created_uid': '0',
    'id': '9025528',
    'gwszdd': '',
    'sfyqjzgc': '',
    'jrsfqzys': '',
    'jrsfqzfy': '',
    'szgjcs': ''
  }
};
let email = '3287764572@qq.com'
let text = '123'
let requestUpc = function () {
  options.form.date = sd.format(new Date(), 'YYYYMMDD')
  request(options, function (error, response) {
    console.log(options.form.date);
    var responseTimer = setTimeout(() => {
      response.destroy()
      console.log("请求超时");
      emailTo(email, "请求超时，请手动打卡", text, "请求超时，请手动打卡", function (data) {
        console.log(data);
      })
      return
    }, 5000);
    if (error) {
      clearTimeout(responseTimer)
      console.log(error + "")
      emailTo(email, "发生错误", text, error + "", function (data) {
        console.log(data);
      })
      return
    }
    let msg;
    try {
      msg = (JSON.parse(response.body)).m;
      console.log(msg);
    } catch(e) {
      console.log(e);
      msg = "打卡失败，请手动打卡，否则将在凌晨5点再次尝试打卡";
    }
    // 发送email
    clearTimeout(responseTimer)
    emailTo(email, msg, text, msg, function (data) {
      console.log(data);
    })
  });
}
requestUpc()
var rule = new schedule.RecurrenceRule();
rule.hour = [0, 5];
rule.second = 20;
rule.minute = 0;
// dingshi.scheduleCronStyle(rule, requestUpc)
module.exports = requestUpc
