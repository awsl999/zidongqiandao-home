const nodemailer = require('nodemailer')
let settingConfig = require('../settingConfig')

let smtp = settingConfig.getValueByKey('smtp')
let mailFrom = settingConfig.getValueByKey('mailFrom')
let mailPwd = settingConfig.getValueByKey('mailPwd')

function emailTo(email, subject, text, html, callback) {
    let transporter = nodemailer.createTransport({
        host: smtp,
        auth: {
            user: mailFrom,
            pass: mailPwd
        }
    })
    let mailOptions = {
        from: mailFrom,
        to: email,
        subject: subject
    }
    if (text != undefined) {
        mailOptions.text = text
    }
    if (subject != undefined) {
        mailOptions.html = html
    }
    let result = {
        httpCode: 200,
        message: "发送成功"
    }

    try {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                result.httpCode = 500
                result.message = err
                callback(result)
                return
            }
            callback(result)
        })
    } catch (err) {
        result.httpCode = 500
        result.message = err
        callback(result)
    }
}

module.exports.emailTo = emailTo