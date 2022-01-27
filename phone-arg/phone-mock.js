$(document).ready(function() {
    
    const closeNotification = () => {
        $("#notification").css({ height: "0px", opacity: 0, "pointer-events": "none" })
        $("#notif-backdrop").css({ opacity: 0 })
    }

    $(".home-btn").click((event) => {
        $(".app-screen-view > div:not(#notification, #notif-backdrop )")
            .css({ height: "0px", width: "0px" , opacity: 0, "pointer-events": "none"  })
        closeNotification()
        // var container = $(".app-container")[0]
        // var screen1 = $("#screen1")[0]
        // scrollToElm(container, screen1)
    })

    $(".app-icon").click((event) => {
        var appScreen = event.target.attributes['app-target'];
        if (appScreen)
        {
            var appScreenId = appScreen.value;
            $("#"+appScreenId).css({ height: "457px" , width: "257px", opacity: 1, "pointer-events": "visible"  })
            event.preventDefault()
        } else {
            $("#notification").css({ height: "457px" , opacity: 1, "pointer-events": "visible" })
            $("#notif-backdrop").css({ opacity: 0.5 })
            $("#notification").on('click', closeNotification)
        }
    
    })

    $(".notebook-cover").click( event => {
        $(".notebook-cover").css({ transform: "rotateX(90deg) scale(1.15)" })
        setTimeout( () => $(".notebook-cover").css({ transform: "rotateX(180deg) scale(1)" }), 500)
        setTimeout( () => $(".notebook-cover").css({ transform: "rotateX(270deg)" , height: "98%" }), 750)
        setTimeout( () => $(".notebook-cover").css({ transform: "rotateX(320deg)" }), 1000)
        setTimeout( () => $(".notebook-cover").css({ transform: "rotateX(360deg)", "z-index": 0 }), 1300)

    })


    const setTime = () => {
        var date = new  Date()
        var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        $("#time").html(time);
    }
    
    setTime()

    setInterval(setTime, 60*1000)
})