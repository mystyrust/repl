document.addEventListener('DOMContentLoaded', function () {
    // drag on desktop // https://htmldom.dev/drag-to-scroll/
    const ele = document.getElementsByClassName("app-container")[0]
    ele.style.cursor = 'grab';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

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
    function scrollTest() 
    {
        console.log("scrollTest")
        var container = $(".app-container")[0]
        var child = $(".screen-container:last-of-type")[0]
        scrollToElm(container, child, 400)
    }

    $(".app-gmail").click(scrollTest)
    
    function scrollToElm(container, elm, duration){
        var pos = getRelativePos(elm);
        scrollTo( container, pos.left , 0.4);  // duration in seconds
    }
    
    function getRelativePos(elm){
      var pPos = elm.parentNode.getBoundingClientRect(), // parent pos
          cPos = elm.getBoundingClientRect(), // target pos
          pos = {};
    
      pos.top    = cPos.top    - pPos.top + elm.parentNode.scrollTop,
      pos.right  = cPos.right  - pPos.right,
      pos.bottom = cPos.bottom - pPos.bottom,
      pos.left   = cPos.left   - pPos.left;
    
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

});