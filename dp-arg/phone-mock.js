$(document).ready(function() {

    var appsVisisted = []  
    var appsCouldntVisit = []
    var unlockedSecretEnding = false;
    
    const unlockSecretEnding = () => {
        // unlocked both choices already, havent printed the option for choice 3 yet
        if (appsVisisted.length >= 5 && $("#choice3")[0].innerText.trim().length == 0 && unlockedSecretEnding)
        {
            $("#choice3").css({ display: "inline" })

            // const choiceConj2 = " or "
            const choice3 = "...both??"

            // writing($("#choiceConj2"), choiceConj2, "")
            // setTimeout(() => writing($("#choice3 span"), choice3, ""), ((choiceConj2.length + choice3.length + 2) * 50) )
            writing($("#choice3 span"), choice3, "")
        }
    }

    const closeNotification = () => {
        $("#notification").css({ height: "0px", opacity: 0, "pointer-events": "none" })
        $("#notif-backdrop").css({ opacity: 0 })
    }

    $(".home-btn").click((event) => {
        $(".app-screen").trigger("closingApp")
        $(".app-screen-view > div:not(#notification, #notif-backdrop )")
            .css({ height: "0px", width: "0px" , opacity: 0, "pointer-events": "none" , border: "none" })
        closeNotification()
        // $(".scroller div").first().trigger('click')
    })

    // track which apps could / couldnt be visited on the notebook, 
    // notify user if app cannot be visited 
    $(".app-icon").click((event) => {
        var appScreen = event.target.attributes['app-target'];
        var appName = event.target.attributes['app-name'];
        if (appScreen)
        {
            $(".home-btn").trigger("click") // close any "open" apps already
            var appScreenId = appScreen.value
            $("#"+appScreenId).css({ height: "457px" , width: "257px", opacity: 1, "pointer-events": "visible", border: "thin black solid", "box-sizing": " content-box" })
            $("#"+appScreenId).trigger("viewingApp")

            // event.preventDefault() // why was this here again?
        } else {
            $("#notification").css({ height: "457px" , opacity: 1, "pointer-events": "visible" })
            $("#notif-backdrop").css({ opacity: 0.5 })
            $("#notification").on('click', closeNotification)
        }

        // track in the notebook if you could / couldnt visit the app
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

                var displayedText =  $("#appsCouldntVisit").html();
                var textToDisplay = appsCouldntVisit.join(", ")
                setTimeout(() => writing($("#appsCouldntVisit"), textToDisplay, displayedText), ((text.length  + 1 )* 50) )
            }
            else {
                var displayedText =  $("#appsCouldntVisit").html();
                var textToDisplay = appsCouldntVisit.join(", ")
                writing($("#appsCouldntVisit"), textToDisplay, displayedText)
            }
        }

        // once you go to 5 (visitable) apps, present the reader with the choice
        if (appsVisisted.length == 5 && $("#choiceText")[0].innerHTML.trim().length == 0)
        {
            $("#choiceTime").css({ display: "inline-block" })

            const choiceText = "I think the phone belongs to... (click to choose)"
            const choice1 = "Danny Fenton"
            const choiceConj = " or "
            const choice2 = "Danny Phantom"

            writing($("#choiceText"), choiceText, "")

            setTimeout(() => writing($("#choice1 span"), choice1, ""), ((choiceText.length + 1) * 50) )
            setTimeout(() => writing($("#choiceConj"), choiceConj, ""), ((choiceText.length + choice1.length + 2) * 50) )
            setTimeout(() => writing($("#choice2 span"), choice2, ""), ((choiceText.length + choice1.length + choiceConj.length + 3) * 50) )
          
            setTimeout(unlockSecretEnding, (choiceText.length + choice1.length + choiceConj.length + choice2.length + 4) * 50)
        } 
        else if (appsVisisted.length > 5)
        {
            // unlocked both choices already, havent printed the option for choice 3 yet
            unlockSecretEnding()
        }
    })

    // menu of items with each item visitable -- horizontal slide in / out (not perfect... but meh)
    const slideFromListToItem = (childClickSelector, listSelector, gobackSelector, childClassSelector) => { 
        $(childClickSelector).click(event => {
            var contact = event.currentTarget.attributes['slide-target'];
            if (contact)
            {
                var contactId = contact.value;

                // close all other ones? 
                $(childClassSelector).css({ height: "457px" , width: "0px", opacity: 0, "pointer-events": "none", overflow: "hidden"})
                
                $("#"+contactId).css({ height: "457px" , width: "257px", opacity: 1, "pointer-events": "visible" , overflow: "auto"  })
                $(listSelector).css({ height: "457px" , width: "0px", opacity: 0, "pointer-events": "none"})
            }
        })
    
        $(gobackSelector).click(event => {
            // const relativeChild = eval(relativeChildElement)
            $(childClassSelector).css({ height: "457px" , width: "0px", opacity: 0, "pointer-events": "none", overflow: "hidden" })
            $(listSelector).css({ height: "457px" , width: "257px", opacity: 1, "pointer-events": "visible", overflow: "auto"  })
        })
    }

    slideFromListToItem(".contact", ".phone-list", ".header-chevron", ".phone") // iMessage
    slideFromListToItem(".note-preview", ".notes-list", ".note-goback", ".notes-item") // notes app 

    // notebook transitions 
    $(".notebook-cover").one('click', event => {

        var notebookPos = $(".phone-checklist")[0].getBoundingClientRect()
        var phonePos = $(".phone-container")[0].getBoundingClientRect()
        
        $("body").scrollTop(notebookPos.top)

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
            $("#notebook-keepOut").css({ opacity: 1, width: "348px" }) 
        }, 1500)

        const titleText = "Who does this phone belong to?"
        const notebookLine1 = "Let's keep track of all the apps I visited on the phone"
        const appsVisitedTitle = "Let's visit at least 5 apps"

        // attempt to enforce sequential order / timing...
        setTimeout( () => { 
            writing($(".titletext"), titleText, "")
        }, 1700)

        setTimeout(() => { 
            writing($("#notebook-line1"), notebookLine1, "")
        }, 1700 + ((titleText.length + 2) * 50))

        setTimeout(() => { 
            writing($("#appsVisited-title"), appsVisitedTitle, "")
        }, 1700 + ((titleText.length + notebookLine1.length + +4) * 50))

        setTimeout(() => {
            // set phone visible
            $(".phone-container").css({ opacity: 1 })
            $("body").scrollTop(phonePos.top) // scroll to the phone now
        }, 1700 + ((appsVisitedTitle.length + titleText.length + notebookLine1.length + 15) * 50))
    })

    $(".notebook-cover").trigger('click')

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
    const writing = (destination, fullStr, writtenStr) =>
    {
        if (writtenStr.length < fullStr.length)
        {
            writtenStr += fullStr[writtenStr.length];
            destination.html(writtenStr)
            setTimeout(() => writing(destination, fullStr, writtenStr), 50)
            return true
        }
        return false // done writing
        // im not sure the returns really help with anything here....rip....
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
                unlockedSecretEnding = true
                $("#calc-view").trigger("secretEnding")
                // setTimeout(() => $("#calc-view").trigger("secretEnding"), 2000)
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

    $("#calc-view").on('secretEnding', unlockSecretEnding)
})