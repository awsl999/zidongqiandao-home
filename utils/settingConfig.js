var xmlreader = require('xmlreader')
var fs = require('fs')
var path = require('path')

const xmlStr = fs.readFileSync(path.join(__dirname, '../config/settingConfig.xml'), 'utf-8')
// console.log(xmlStr)

function getValueByKey (keyStr) {
    let result = 'defalut'
    xmlreader.read(xmlStr, (err, res) => {
        if (err != null) {
            console.log(err)
            return
        }
        res.appSettings.add.each((i, add)=> {
            // console.log(add.attributes());
            if (add.attributes().key == keyStr) {
                // console.log(add.attributes().value)
                // 回调函数不能直接返回
                result = add.attributes().value
            }
        })
    })
    return result
}

module.exports.getValueByKey = getValueByKey
