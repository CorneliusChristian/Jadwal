// ALL RIGHTS BELONG TO CORNELIUS CHRISTIAN @ 2024
// SELURUH HAK CIPTA DIMILIKI OLEH CORNELIUS CHRISTIAN @ 2024
var timer = $("#timer")
function clock(){
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    $(timer).text(h + ":" + addZero(m) + ":" + addZero(s));
    checkAgenda()
    //$(timer).text(moment())
}

function addZero(str){
    if(str < 10){
        return "0"+str
    }else{
        return str
    }
}

function checkAgenda(){
    var agenda = {
        "day5":[{
            "name":"PAK",
            "start":moment("2/12/2024 07:15", "DD/MM/YYYY hh:mm"),
            "end":moment("2/12/2024 08:45", "DD/MM/YYYY hh:mm")
        }, {
            "name": "Fisika",
            "start":moment("2/12/2024 09:30", "DD/MM/YYYY hh:mm"),
            "end":moment("2/12/2024 11:00", "DD/MM/YYYY hh:mm")
        }],
        "day6":[{
            "name":"IPS",
            "start":moment("3/12/2024 21:00", "DD/MM/YYYY hh:mm"),
            "end":moment("3/12/2024 21:11", "DD/MM/YYYY hh:mm")
        }, {
            "name": "Bahasa Indonesia",
            "start":moment("3/12/2024 20:30", "DD/MM/YYYY hh:mm"),
            "end":moment("3/12/2024 21:11", "DD/MM/YYYY hh:mm")
        }]
    }
    var available = ["", 69]
    for (let i = 0; i < Object.keys(agenda).length; i++) {
        const day = agenda[Object.keys(agenda)[i]];
        for (let li = 0; li < day.length; li++) {
            const lesson = day[li];
            if (moment().isAfter(lesson.start) && moment().isBefore(lesson.end)){
                available[1] = li
                break
            }
        }
        if (available[1] != 69){
            available[0] = Object.keys(agenda)[i]
            break
        }
    }
    console.log(available)
    var now = moment()
    if(available[1] != 69){
        var length = agenda[available[0]][available[1]].end.diff(agenda[available[0]][available[1]].start, 'milliseconds')
        var timeLeft = moment().diff(agenda[available[0]][available[1]].start, 'milliseconds')
        $('#prog').css("width", (timeLeft/length*100)+"%")
        $('h3').html("Asesmen <b>"+agenda[available[0]][available[1]].name+"</b> akan berakhir "+agenda[available[0]][available[1]].end.fromNow())
    }else{
        $('h3').html("Tidak ada asesmen saat ini.")
        $('#prog').hide()
    }
    console.log((length - timeLeft))
    if ((length - timeLeft) < 300000){
        $('body').removeClass("bg-yellow-500");
        $('body').removeClass("bg-green-500");
        $('body').addClass("bg-red-500");
    }else if (available[1] == 69){
        $('body').removeClass("bg-red-500");
        $('body').removeClass("bg-yellow-500");
        $('body').addClass("bg-green-500");
    }else if ((length - timeLeft) > 300000 && (length - timeLeft) < 1800000){
        $('body').removeClass("bg-green-500");
        $('body').removeClass("bg-red-500");
        $('body').addClass("bg-yellow-500");
    }
}


setInterval(() => clock(), 200)
