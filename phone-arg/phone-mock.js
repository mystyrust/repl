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

    const setTime = () => {
        var date = new  Date()
        var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        $("#time").html(time);
    }
    
    setTime()

    setInterval(setTime, 60*1000)
})