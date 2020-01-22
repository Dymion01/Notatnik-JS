(function () {
    'use strict';

    var draggedEl,
        onDragStart,
        onDrag,
        onDragEnd,
        grabPointX,
        grabPointY;

    onDragStart = function (ev) {
        var boundingClientRect;
        if(ev.target.className.indexOf('bar') === -1) {
            return;
        }
        draggedEl = this;

        boundingClientRect = draggedEl.getBoundingClientRect();


        grabPointX = boundingClientRect.left - ev.clientX;
        grabPointY = boundingClientRect.top -  ev.clientY;

    };

    onDrag = function (ev){
        if(!draggedEl) {
            return;
        }

        var posX = ev.clientX + grabPointX,
            posY = ev.clientY + grabPointY;


        if (posX < 0){
            posX = 0;
        }

        if(posY < 0){
            posY = 0;
        }

        draggedEl.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";

    };    

    onDragEnd = function {
        draggedEl = null;
        grabPointX = null;
        grabPointY = null;
    };

        
        document.addEventListener('mousemove' , onDrag, false);
        document.addEventListener('mouseup' , onDragEnd , false);
        document.querySelector('.sticker').addEventListener('mousedown', onDragStart, false) ;    
    



})();