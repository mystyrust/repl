$(document).ready(function() {
    $(".home-btn").click((event) => {
        $(".col").removeClass("app-view")
    })

    // $(".phone-crack").click((event) => {
    //     console.log(event)
    // })

    $(".app-sc").click((event) => {
        // console.log({ event }, event.currentTarget, $(event.currentTarget))
        // $(this).classList.toggle('.app-view');
        $(".col").removeClass("app-view")
        $(event.currentTarget).toggleClass("app-view")
        event.preventDefault()
    })

   

})