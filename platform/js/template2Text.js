$( document ).ready(function() {
    $('#descripcionCursoPlantilla').trumbowyg({
      lang: 'es',
      btns: [
       ['viewHTML'],
       ['undo', 'redo'], // Only supported in Blink browsers
       ['formatting'],
       ['strong', 'em', 'del'],
       ['superscript', 'subscript'],
       // ['link'],
       ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
       ['unorderedList', 'orderedList'],
       ['horizontalRule'],
       ['removeformat'],
       ['fullscreen']
      ]
    });
});
