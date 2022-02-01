$(document).ready(function() {
    var appsVisisted = []  
    var appsCouldntVisit = []
    
    const closeNotification = () => {
        $("#notification").css({ height: "0px", opacity: 0, "pointer-events": "none" })
        $("#notif-backdrop").css({ opacity: 0 })
    }

    $(".home-btn").click((event) => {
        $(".app-screen").trigger("closingApp")
        $(".app-screen-view > div:not(#notification, #notif-backdrop )")
            .css({ height: "0px", width: "0px" , opacity: 0, "pointer-events": "none"  })
        closeNotification()
        // $(".scroller div").first().trigger('click')
    })

    $(".app-icon").click((event) => {
        var appScreen = event.target.attributes['app-target'];
        var appName = event.target.attributes['app-name'];
        if (appScreen)
        {
            var appScreenId = appScreen.value;
            $("#"+appScreenId).css({ height: "457px" , width: "257px", opacity: 1, "pointer-events": "visible"  })
            $("#"+appScreenId).trigger("viewingApp")

            event.preventDefault()
        } else {
            $("#notification").css({ height: "457px" , opacity: 1, "pointer-events": "visible" })
            $("#notif-backdrop").css({ opacity: 0.5 })
            $("#notification").on('click', closeNotification)
        }

        if (appScreen && appName && !appsVisisted.includes(appName.value))
        {
            appsVisisted.push(appName.value);
            var displayedText =  $("#appsVisited").html();
            var textToDisplay = appsVisisted.join(", ")
            writing($("#appsVisited"), textToDisplay, displayedText)
        } 
        else if (!appScreen && appName && !appsCouldntVisit.includes(appName.value))
        {
            appsCouldntVisit.push(appName.value);
            if (appsCouldntVisit.length == 1)
            {
                const text = "Couldn't visit these apps, for some reason"
                writing($("#appsCouldntVisit-title"), text, "")
            }

            var displayedText =  $("#appsCouldntVisit").html();
            var textToDisplay = appsCouldntVisit.join(", ")
            writing($("#appsCouldntVisit"), textToDisplay, displayedText)
        }

    
    })

    $(".note-preview").click(event => {
        console.log({ event })
        var note = event.currentTarget.attributes['note-target'];
        if (note)
        {
            var noteId = note.value;

            $("#"+noteId).css({ height: "457px" , width: "257px", opacity: 1, "pointer-events": "visible" , overflow: "visible"  })
            $(".notes-list").css({ height: "457px" , width: "0px", opacity: 0, "pointer-events": "none"})
        }
    })

    $(".note-goback").click(event => {
        $(event.currentTarget.parentElement).css({ height: "457px" , width: "0px", opacity: 0, "pointer-events": "none", overflow: "hidden" })
        $(".notes-list").css({ height: "457px" , width: "257px", opacity: 1, "pointer-events": "visible", overflow: "hidden"  })
    })

    // phone nav (to and from contacts list) -- mimic for notes, componentize?
    $(".contact").click(event => {
        var contact = event.currentTarget.attributes['contact-target'];
        // console.log(event.currentTarget, contact)
        if (contact)
        {
            var contactId = contact.value;
            
            $("#"+contactId).css({ height: "457px" , width: "257px", opacity: 1, "pointer-events": "visible" , overflow: "visible"  })
            // $(".phone-list").css({ height: "457px" , width: "0px", opacity: 0, "pointer-events": "visible"  })
            // setTimeout( () => {
            $(".phone-list").css({ height: "457px" , width: "0px", opacity: 0, "pointer-events": "none"})
                // $("#"+contactId).css({ height: "457px" , width: "257px", opacity: 1, "pointer-events": "visible"  })
            // }, 1000)
        }
    })

    $(".header-chevron").click(event => {
        $(event.currentTarget.parentElement.parentElement).css({ height: "457px" , width: "0px", opacity: 0, "pointer-events": "none", overflow: "hidden" })
        $(".phone-list").css({ height: "457px" , width: "257px", opacity: 1, "pointer-events": "visible", overflow: "hidden"  })
    })

    // notebook transitions 
    $(".notebook-cover").one('click', event => {
        // i wish i knew how to chain these timed events better, like using .then or await
        // this isnt great or even best practice but its good enough for me
        $(".notebook-cover").css({ transform: "rotateX(90deg) scale(1.15)" })
        
        setTimeout( () => $(".notebook-cover div, .notebook-cover img").css({ opacity: 0 }), 500)
        setTimeout( () => $(".notebook-cover").css({ transform: "rotateX(180deg) scale(1)" }), 500)

        setTimeout( () => $(".notebook-cover").css({ 
            transform: "rotateX(270deg)", 
            height: "98%" , width: "103%", 
            "margin-left": "-5px" 
        }), 750)

        setTimeout( () => $(".notebook-cover").css({ transform: "rotateX(320deg)" }), 1000)
        setTimeout( () => $(".notebook-cover").css({ transform: "rotateX(360deg)", "z-index": 0 }), 1300)

        setTimeout( () => { 
            // bring back all notebook decorations that should peek out from behind
            $("#notebook-keepOut").css({ opacity: 1 }) 
        }, 1500)

        setTimeout( () => { 
            writing($(".titletext"), "Who does this phone belong to?", "")
        }, 1700)

        setTimeout(() => { 
            writing($("#notebook-line1"), "Let's keep track of all the apps I visited on the phone", "")
        }, 3500)

        setTimeout(() => { 
            writing($("#appsVisited-title"), "Let's visit at least 5 apps", "")
        }, 5500)
    })


    const setTime = () => {
        var date = new  Date()
        var time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        $("#time").html(time);
    }
    
    setTime()
    setInterval(setTime, 60*1000)

    // alarm hack haha
    $(".alarm-switch").click(event => {
        var parent = event.currentTarget.parentElement
        var parentNode = $(event.currentTarget.parentElement)
        if (parent.classList.contains("alarm-on"))
        {
            parentNode.removeClass("alarm-on").addClass("alarm-off")
        } 
        else if (parent.classList.contains("alarm-off"))
        {
            parentNode.removeClass("alarm-off").addClass("alarm-on")
        }
    })

    // to do make this a promise or thenable
    function writing(destination, fullStr, writtenStr)
    {
        if (writtenStr.length < fullStr.length)
        {
            writtenStr += fullStr[writtenStr.length];
            destination.html(writtenStr)
            // setTimeout(() => { destination.html(toWrite) }, 500)
            // return setTimeout(() => writeOut(destination, fullStr, writtenStr), 50)
            setTimeout(() => writing(destination, fullStr, writtenStr), 50)
            return true
        }
        return false // done writing
    }

    // fake calculator on the app store
    $("#app-store-view").on('viewingApp closingApp', event => {
        if (event.type == "viewingApp")
        {
            setTimeout(() => $(".app-open").css({ display: "block" }) , 1000)
        } else if (event.type == "closingApp")
        {
            $(".app-open").css({ display: "none" })
        }
    })

    $(".app-open").click(event => {
        $(".home-btn").trigger('click')
        $(".app-calculator").trigger('click')
    })

    // calculator stuff
    $("#calc-view").on('viewingApp', () => {
        $(".calc-top").scrollTop($(".calc-history").height())
    })

    $(".calc-btn").click(event => {
        var currExp = $(".calc-current .calc-exp")
        var currAns = $(".calc-current .calc-ans")

        var btnPressed = event.currentTarget.innerHTML

        // add to current expression displayed on screen
        if (btnPressed != '=' && !event.currentTarget.attributes["id"]) 
        {
            if (!currAns[0].innerHTML.trim()) { // 
                if (event.currentTarget.classList.contains("calc-op"))
                {
                    btnPressed = " " + btnPressed + " "
                }
                btnPressed = currExp.html() + btnPressed
            } else {
                // add to history, clear current expression
                $(".calc-history").html($(".calc-history").html() + $(".calc-current").html())
                $(".calc-current p").html("")
            }
            // add new expression
            currExp.html(btnPressed)
        }
        // eval expression
        else if (event.currentTarget.attributes["id"] && event.currentTarget.attributes["id"].value == "calc-back")
        {
            // erase previous one 
            var newExp = currExp.html().substr(0, currExp.html().length-1).trim()
            $(".calc-current .calc-exp").html(newExp)
        }
        else if (btnPressed == '=')
        {
            var toEval = currExp[0].innerHTML
        
            var answer = ""
            try {
                answer = eval(toEval)
            } catch (exc) {
                answer = "NaN"
            }
            currAns.html(answer)
       
            if (currExp[0].innerHTML == "1 + 1") {
                // $(".calc-bottom").css({ opacity: 0 })
                $(".calc-functions").css({ width: "0px" })
                $(".calc-bottom").toggle()
                setTimeout(() => { 
                    // stuff that should appear on the private screen
                    $(".privGallery-scroller").css({ position: "absolute" }) 
                    $(".privGallery-goback").css({ opacity: 1 })
                }, 500)
                // setTimeout(() => {  $(".calc-bottom").toggle() }, 1000)

                // $(".calc-priv").css({ width: "257px" })
            }
        }
        $(".calc-top").scrollTop($(".calc-history").height() + $(".calc-current").height())
    })

    $(".privGallery-goback").click(event => {
        // go back to the public / simple calc
        $(".calc-functions").css({ width: "257px" })
        $(".calc-bottom").toggle()

        $(".privGallery-scroller").css({ position: "relative" }) 
        $(".privGallery-goback").css({ opacity: 0 })
    })
})