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
        loadNotes,
        init,
        GetNoteObject,
        onAddNoteBtnClick;


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

    GetNoteObject = function (el) {
        var textarea = el.querySelector('textarea');
        var timearea = el.querySelector('.timearea');
        var colorOfNote = el.querySelector('.bar');
        return{
            content: textarea.value,
            id: el.id,
            transformCssValue: el.style.transform,
            time: timearea.innerText,
            color: colorOfNote.style.backgroundColor
               };
    }

    createNote = function(options){
        var stickerEl = document.createElement('div'),
            barEl = document.createElement('div'),
            timeareaEl =document.createElement('div'),
            textareaEl = document.createElement('textarea'),
            saveBtnEl = document.createElement('button'),
            deleteBtnEl = document.createElement('button'),
            colorBtnEl = document.createElement('button'),
            choosecolorBtnEl = document.createElement('input'),
            onSave,
            onDelete,
            changeColor,
            time = new Date(),
            
            noteConfig = options || {
                content: '',
                id: "sticker_" + new Date().getTime(),
                transformCssValue:  "translateX(" +Math.random() * 1000 + "px) translateY(" + Math.random() * 400 + "px)",
                
                time: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                color: choosecolorBtnEl.value
            };

        onDelete = function () {

            deleteNote(GetNoteObject(stickerEl));
        };   

        onSave = function () {
            console.log(GetNoteObject(stickerEl));
            saveNote(
             GetNoteObject(stickerEl)
            );
        };
        changeColor = function(){
            barEl.style.backgroundColor = barEl.querySelector('.choosecolorButton').value;
        };


        saveBtnEl.addEventListener('click', onSave);
        deleteBtnEl.addEventListener('click', onDelete);

        colorBtnEl.addEventListener('click', changeColor);

        stickerEl.id = noteConfig.id;
        textareaEl.value = noteConfig.content;
        stickerEl.style.transform = noteConfig.transformCssValue; 
        timeareaEl.innerText = noteConfig.time;
        saveBtnEl.classList.add('saveButton');
        deleteBtnEl.classList.add('deleteButton');
        choosecolorBtnEl.classList.add('choosecolorButton');
        colorBtnEl.classList.add('colorButton')
        choosecolorBtnEl.type= 'color';
        barEl.classList.add('bar');
        barEl.style.backgroundColor = noteConfig.color;
        timeareaEl.classList.add('timearea');
        stickerEl.classList.add('sticker');

        barEl.appendChild(saveBtnEl);
        barEl.appendChild(timeareaEl);
        barEl.appendChild(deleteBtnEl);
        barEl.appendChild(choosecolorBtnEl);
        barEl.appendChild(colorBtnEl);
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
    

    onAddNoteBtnClick = function() {
        createNote();
    };

    init = function (){

        if(!testLocalStroage()) {
            var message = "Nie można użyć localStorage";
        } else {
            saveNote = function (note){
            localStorage.setItem(note.id , JSON.stringify(note));
            console.log(localStorage.getItem(localStorage.key(0)));
            };
            deleteNote = function (note){

            };
            loadNotes = function (){
                for(var i = 0; i < localStorage.length; i++) {

                    createNote(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            };

            loadNotes();
        }
        
        addNoteBtnEl = document.querySelector('.addNoteBtn');
        addNoteBtnEl.addEventListener('click' , onAddNoteBtnClick , false);
        document.addEventListener('mousemove' , onDrag, false);
        document.addEventListener('mouseup' , onDragEnd , false);
    };
    

    init();

})();