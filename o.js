setInterval(() => {
    var date = new Date();
    var min = date.getMinutes();
    var hour = date.getHours();
    var sec = date.getSeconds();
    var noon;
    document.querySelector("#sec").style.transform = "rotateZ(" + (sec * 6) + "deg)";
    document.querySelector("#min").style.transform = "rotateZ(" + (min * 6) + "deg)";
    document.querySelector("#hour").style.transform = "rotateZ(" + (hour * 30.4) + "deg)";
    if (hour > 12) {
        hour = hour - 12;
        noon = " PM";
    } else {
        noon = " AM";
    }
    if (min.toString().length < 2) {
        min = "0" + min;
    }
    if (sec.toString().length < 2) {
        sec = "0" + sec;
    }
    document.querySelector("#home").innerHTML = hour + ":" + min + ":" + sec + noon;

}, 100);

$("document").ready(function() {
    $("#set").click(function() {
        var mins = $("#mino").val();
        var secs = $("#seco").val();
        var mil = $("#mili").val();
        if ((mins < 0) || (secs < 0) || (mil < 0)) {
            alert("abey saale");
        } else {
            var t = setInterval(() => {
                mil--;
                if (mil < 0) {
                    mil = 59;
                    secs--;
                }
                if (secs < 0) {
                    secs = 59;
                    mins--;
                }
                if (mins == 0 && secs == 0 && mil == 0) {
                    alert("hey its compvare");
                    clearInterval(t);
                    $("#mili").val(0);
                    $("#seco").val(0);
                    $("#mino").val(0);
                }
                if (mil.toString().length < 2) {
                    mil = "0" + mil;
                }
                if (secs.toString().length < 2) {
                    secs = "0" + secs;
                }
                if (mins.toString().length < 2) {
                    mins = "0" + mins;
                }
                $('#newT').html(mins + ":" + secs + ":" + mil + "")
            }, 1000)
        }
    })

    var newAlarm = new Array();
    var date = new Date();
    $("#setTime").click(() => {
        var time = $("#time").val();
        if (time != "") {
            newAlarm.push(time);
            newAlarm.sort();
        }
    })


    var k = setInterval(() => {
        for (let i = 0; i < newAlarm.length; i++) {
            let well = newAlarm[i].toString();
            console.log(newAlarm[0])
            console.log((date.getHours() + ":" + date.getMinutes()))
            console.log(well == (date.getMinutes() + ":" + date.getSeconds()).toString())
            if (newAlarm[i].toString() == (date.getMinutes() + ":" + date.getSeconds())) {
                alert("hello");
                break;
                clearInterval(k);
            }
        }
    }, 1000)

    var count = 0;
    $("#add").click(() => {
        var val = $("#text").val();
        if (val == "") {
            alert("first add something")
        } else {
            count++;
            var newL = document.createElement("li");
            newL.innerHTML = val;
            var radio = document.createElement("input");
            radio.type = 'radio';
            document.querySelector("#list").appendChild(newL);
            document.querySelector("#list li:nth-child(" + count + ")").appendChild(radio);
            $("#text").val('');
        }
    })

})

function getWeather() {
    var temperature = document.querySelector("#temperature");
    var description = document.querySelector("#description");
    var location = document.querySelector("#location");

    var api = "https://api.openweathermap.org/data/2.5/weather";
    var apiKey = "f146799a557e8ab658304c1b30cc3cfd";



    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        console.log("hey success");
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        var url =
            api +
            "?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&appid=" +
            apiKey +
            "&units=imperial";

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const temp = data.main.temp;
                const cel = parseInt((temp - 32) * 5 / 9);
                if (cel > 30) {
                    document.querySelector("#weather").style.background = "url(https://cdn.pixabay.com/photo/2016/01/19/21/41/painting-1150525_960_720.jpg)"
                }
                console.log(parseInt(cel));
                document.querySelector("#temp").innerHTML = cel + "°C";
                console.log(
                    data.name + " (" + latitude + "°, " + longitude + "°)");
                document.querySelector("#map").innerHTML = data.weather[0].main;
            });
    }

    function error() {
        location.innerHTML = "Unable to retrieve your location";
    }
}

getWeather();