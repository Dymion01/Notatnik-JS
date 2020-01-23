(function () {
    'use strict';

    var draggedEl,
        onDragStart,
        onDrag,
        onDragEnd,
        grabPointX,
        grabPointY,
        createNote,
        addNoteBtnEl,
        testLocalStroage,
        saveNote,
        deleteNote,
        loadNotes;

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

    onDragEnd = function (){
        draggedEl = null;
        grabPointX = null;
        grabPointY = null;
    };

    createNote = function(){
        var stickerEl = document.createElement('div'),
            barEl = document.createElement('div'),
            textareaEl = document.createElement('textarea'),
            saveBtnEl = document.createElement('button'),
            deleteBtnEl = document.createElement('button'),
            onSave,
            onDelete;

        onDelete = function () {
            var obj = {};
            deleteNote(obj);
        };   

        onSave = function () {
            var obj = {};
            saveNote;
        };

        saveBtnEl.addEventListener('click', onSave);
        deleteBtnEl.addEventListener('click', onDelete);

        var transformCssValue = "translateX(" +Math.random() * 1000 + "px) translateY(" + Math.random() * 400 + "px)";

        stickerEl.style.transform = transformCssValue;

        saveBtnEl.classList.add('saveButton');
        deleteBtnEl.classList.add('deleteButton');
        barEl.classList.add('bar');
        stickerEl.classList.add('sticker');

        barEl.appendChild(saveBtnEl);
        barEl.appendChild(deleteBtnEl);
        stickerEl.appendChild(barEl);
        stickerEl.appendChild(textareaEl);

        stickerEl.addEventListener('mousedown', onDragStart, false) ;  
        document.body.appendChild(stickerEl);
    }; 
    
    
    testLocalStroage = function () {
        var foo = 'foo';
        try{
            localStorage.setItem(foo,foo);
            localStorage.removeItem(foo);
            return true;
        } catch (e) {
            return false
        }
    };
     
    init = function (){

        if(!testLocalStroage()) {
            var message = "Nie można użyć localStorage";
        } else {
            saveNote = function (note){

            };
            deleteNote = function (note){

            };
            loadNotes = function (note){

            };

            loadNotes();
        };
        
        addNoteBtnEl = document.querySelector('.addNoteBtn');
        addNoteBtnEl.addEventListener('click' , createNote , false);
        document.addEventListener('mousemove' , onDrag, false);
        document.addEventListener('mouseup' , onDragEnd , false);
    };
    



})();