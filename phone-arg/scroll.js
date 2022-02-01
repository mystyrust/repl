document.addEventListener('DOMContentLoaded', function () {
    // drag on desktop // https://htmldom.dev/drag-to-scroll/

    const ele = document.getElementsByClassName("app-container")[0]
    ele.style.cursor = 'grab';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    function isScrolledIntoView(el) {
        var screen = el.getBoundingClientRect()
        var parent = ele.getBoundingClientRect()
        var width = ele.getBoundingClientRect().width
        
        var isVisible = Math.abs(screen.left - parent.left) < width
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
        var container = ele
        scrollToElm(container, target, 400)

        // color the pill bugs accordingly
    })
    
    function scrollToElm(container, elm, duration){
        var pos = getRelativePos(elm);
        scrollTo(container, pos.left , 0.4);  // duration in seconds
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

    

    $(".app-container").on( 'scroll', function(event){
        $(".scroller div").css({ background: 'slategray' })
        $(".screen-container").each((index, screen) => { 
            if (isScrolledIntoView(screen))
            {
                $($(".scroller div")[index]).css({ background: 'white' })
            }
        })

    });

    //  $(".home-btn").click((event) => {
    //     var container = $(".app-container")[0]
    //     var screen1 = $("#screen1")[0]
    //     scrollToElm(container, screen1)
    // })


    //  --------------------img scroller for map?-----------------------------------
    // https://stackoverflow.com/questions/35252249/move-drag-pan-and-zoom-object-image-or-div-in-pure-js
     
    var img_ele = null,
      x_cursor = 0,
      y_cursor = 0,
      x_img_ele = 0,
      y_img_ele = 0;
    
    function zoom(zoomincrement) {
      img_ele = document.getElementById('drag-img');
      var pre_width = img_ele.getBoundingClientRect().width, pre_height = img_ele.getBoundingClientRect().height;
      img_ele.style.width = (pre_width * zoomincrement) + 'px';
      img_ele.style.height = (pre_height * zoomincrement) + 'px';
      img_ele = null;
    }
    
    document.getElementById('zoomout').addEventListener('click', function() {
      zoom(0.5);
    });
    document.getElementById('zoomin').addEventListener('click', function() {
      zoom(1.5);
    });
    
    function start_drag() {
      img_ele = this;
      x_img_ele = window.event.clientX - document.getElementById('drag-img').offsetLeft;
      y_img_ele = window.event.clientY - document.getElementById('drag-img').offsetTop;
      
    }
    
    function stop_drag() {
      img_ele = null;
    }
    
    function while_drag() {
      var x_cursor = window.event.clientX;
      var y_cursor = window.event.clientY;
      if (img_ele !== null) {
        img_ele.style.left = (x_cursor - x_img_ele) + 'px';
        img_ele.style.top = ( window.event.clientY - y_img_ele) + 'px';
        
          console.log(img_ele.style.left+' - '+img_ele.style.top);
    
      }
    }
    
    document.getElementById('drag-img').addEventListener('mousedown', start_drag);
    document.getElementsByClassName('mapImg')[0].addEventListener('mousemove', while_drag);
    document.getElementsByClassName('mapImg')[0].addEventListener('mouseup', stop_drag);


});