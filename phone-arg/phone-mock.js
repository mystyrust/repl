$(document).ready(function() {
    $(".home-btn").click((event) => {
        // $(".col").removeClass("app-view")
        // $(".app-screen-view").css({ height: "0px" })
        $(".app-screen-view div").css({ height: "0px", width: "0px" })
    })

    // $(".phone-crack").click((event) => {
    //     console.log(event)
    // })

    $(".app-icon").click((event) => {
        // console.log({ event }, event.currentTarget, $(event.currentTarget))
        // $(this).classList.toggle('.app-view');
        // $(".col").removeClass("app-view")
        // $(event.currentTarget).toggleClass("app-view")
        console.log({ event })
        // $(".app-screen-view").css({ height: "457px" })
        var appScreenId = event.target.attributes['app-target'].value;
        $("#"+appScreenId).css({ height: "457px" , width: "257px"})
        event.preventDefault()
    })

   

})