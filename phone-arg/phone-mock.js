$(document).ready(function() {

    var appsVisisted = []  
    var appsCouldntVisit = []
    
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
        var appName = event.target.attributes['app-name'];
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

        if (appScreen && appName && !appsVisisted.includes(appName.value))
        {
            appsVisisted.push(appName.value);
            $("#appsVisited").html(appsVisisted.join(", "))
        } 
        else if (!appScreen && appName && !appsCouldntVisit.includes(appName.value))
        {
            appsCouldntVisit.push(appName.value);
            if (appsCouldntVisit.length == 1)
            {
                $("#appsCouldntVisit-title").css({ display : "inline" })
            }

            $("#appsCouldntVisit").html(appsCouldntVisit.join(", "))
        }

    
    })

    $(".notebook-cover").one('click', event => {
        // i wish i knew how to chain these timed events better, like using .then or await
        // this isnt great or even best practice but its good enough for me
        $(".notebook-cover").css({ transform: "rotateX(90deg) scale(1.15)" })
        
        setTimeout( () => $(".notebook-cover div, #notebook-keepOut, #notebook-topsecret, #notebook-badge").css({ opacity: 0 }), 500)
        setTimeout( () => $(".notebook-cover").css({ transform: "rotateX(180deg) scale(1)" }), 500)
        setTimeout( () => $(".notebook-cover").css({ transform: "rotateX(270deg)" , height: "98%" }), 750)
        setTimeout( () => $(".notebook-cover").css({ transform: "rotateX(320deg)" }), 1000)
        setTimeout( () => $(".notebook-cover").css({ transform: "rotateX(360deg)", "z-index": 0 }), 1300)

        setTimeout( () => { 
            // bring back all notebook decorations that should peek out from behind
            $("#notebook-keepOut").css({ opacity: 1 }) 
        }, 1500)

    })


    const setTime = () => {
        var date = new  Date()
        var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        $("#time").html(time);
    }
    
    setTime()

    setInterval(setTime, 60*1000)
})