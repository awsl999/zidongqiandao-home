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
    'address': '安徽省滁州市天长市张铺镇074县道平安医院',
    'geo_api_info': '{"type":"complete","position":{"Q":32.820501030816,"R":118.784646267362,"lng":118.784646,"lat":32.820501},"location_type":"html5","message":"Get ipLocation failed.Get geolocation success.Convert Success.Get address success.","accuracy":332,"isConverted":true,"status":1,"addressComponent":{"citycode":"0550","adcode":"341181","businessAreas":[],"neighborhoodType":"","neighborhood":"","building":"","buildingType":"","street":"","streetNumber":"","country":"中国","province":"安徽省","city":"滁州市","district":"天长市","township":"张铺镇"},"formattedAddress":"安徽省滁州市天长市张铺镇074县道平安医院","roads":[],"crosses":[],"pois":[],"info":"SUCCESS"}',
    'area': '安徽省 滁州市 天长市',
    'province': '安徽省',
    'city': '滁州市',
    'sfzx': '0',
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
    'created': '1612627239',
    'date': '20210207',
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
      response.destroy();
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
      msg = "打卡失败，请手动打卡，否则将在凌晨6点再次尝试打卡";
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
rule.hour = [0, 6];
rule.second = 20;
rule.minute = 0;
// dingshi.scheduleCronStyle(rule, requestUpc)
module.exports = requestUpc
