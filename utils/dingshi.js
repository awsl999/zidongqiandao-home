const schedule = require('node-schedule')


function scheduleCronStyle (rule, callback) {
    schedule.scheduleJob(rule, () => {
        console.log("scheduleCronstyle" + new Date());
        callback()
    })
}




module.exports.scheduleCronStyle = scheduleCronStyle
