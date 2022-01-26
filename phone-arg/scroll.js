document.addEventListener('DOMContentLoaded', function () {
    // drag on desktop // https://htmldom.dev/drag-to-scroll/
    const ele = document.getElementsByClassName("app-container")[0]
    ele.style.cursor = 'grab';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    function isScrolledIntoView(el) {
        var rect = el.getBoundingClientRect();
        // console.log(el)
        // var elemRight = rect.right;
        // var elemLeft = rect.left;

        var screen = el.getBoundingClientRect()
        var parent = ele.getBoundingClientRect()
        var width = $(".app-container")[0].getBoundingClientRect().width
        
        var isVisible = Math.abs(screen.left - parent.left) < width
        // var isVisible =  el.id == "screen"+(screenLeft+1);
        
        // console.log({ screen }, {parent})
        // console.log(el.id, isVisible, screenLeft)
    
        // Only completely visible elements return true:
        // var isVisible = (elemRight >= 0) && (elemLeft <= window.innerWidth);
        // Partially visible elements return true:
        //isVisible = elemRight < window.innerHeight && elemLeft >= 0;
        return isVisible;
    }

    const mouseDownHandler = function (e) {
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        pos = {
            left: ele.scrollLeft,
            top: ele.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    ele.addEventListener('mousedown', mouseDownHandler);

    // ----------------------------------------//

    // ease scroll within container -- pill bug click // https://stackoverflow.com/a/51005649 method 1
    $(".scroller div").click(event => {
        var targetId = event.target.attributes['scroll-target'].value;
        var target = $("#"+targetId)[0]
        var container = $(".app-container")[0]
        scrollToElm(container, target, 400)

        // color the pill bugs accordingly
    })
    
    function scrollToElm(container, elm, duration){
        var pos = getRelativePos(elm);
        scrollTo( container, pos.left , 0.4);  // duration in seconds
    }
    
    function getRelativePos(elm){
      var pPos = elm.parentNode.getBoundingClientRect(), // parent pos
          cPos = elm.getBoundingClientRect(), // target pos
          pos = {};
    
      pos.top    = cPos.top    - pPos.top,
      pos.right  = cPos.right  - pPos.right, // + elm.parentNode.scrollLeft,
      pos.bottom = cPos.bottom - pPos.bottom,
      pos.left   = cPos.left   - pPos.left + elm.parentNode.scrollLeft;
    
      return pos;
    }
          
    function scrollTo(element, to, duration, onDone) {
        var start = element.scrollLeft,
            change = to - start,
            startTime = performance.now(),
            val, now, elapsed, t;
    
        function animateScroll(){
            now = performance.now();
            elapsed = (now - startTime)/1000;
            t = (elapsed/duration);
    
            element.scrollLeft = start + change * easeInOutQuad(t);
    
            if( t < 1 )
                window.requestAnimationFrame(animateScroll);
            else
                onDone && onDone();
        };
    
        animateScroll();
    }
    
    function easeInOutQuad(t){ return t<.5 ? 2*t*t : -1+(4-2*t)*t };

    function updatePillBugs(pillNumber) {
        console.log('update pill bugs, turn them "off"')
        console.log('turn on ' + pillNumber)
    }

    $(".app-container").on( 'scroll', function(event){
        // console.log('Event Fired');

        $(".scroller div").css({ background: 'blue' })

        $(".screen-container").each((index, screen) => { 
            if (isScrolledIntoView(screen))
            {
                $($(".scroller div")[index]).css({ background: 'green' })
            }
        })

     });
});