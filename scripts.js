(function () {
    'use strict';

    var draggedEL,
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
        draggedEL = this;

        boundingClientRect = draggedEL.getBoundingClientRect();


        grabPointX = boundingClientRect.left - ev.clientY;
        grabPointY = boundingClientRect.top - ev.clientY;

    };

    onDrag = function (ev){
        if(!draggedEL) {
            return;
        }

        var posX = ev.cientX + grabPointX,
            posY = ev.clientY + grabPointY;

        draggedEL.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
        
        document
            .addEventListener('mousemove' , onDrag, false);
        
        document.querySelector('.sticker').addEventListener('mousedown', onDragStart, false) ;    
    }



})