<?= phpinfo();?>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <link href="../plugins/google-fonts/google.css" rel="stylesheet">
    <link rel="stylesheet" href="../src/richtext.min.css">
    <script type="text/htmlpreview" src="../src/jquery.richtext.js"></script>
    <!-- <script src="../plugins/jquery/jquery-3.3.1.min.js"></script> -->
    <script src="../plugins/jquery/jquery-2.2.4.min.js"></script>
    <script src="../plugins/jquery/ajaxform.js"></script>
    <title>Denlin</title>
  </head>
  <body>
<!-- navigation -->
    <nav class="den-top-nav">
      <div class="den-logo">
        <img class="den-logo-width" src="../img/f_Logo_tranparente.png" alt="">
      </div>
      <!-- Menu right-->
      <div class="den-top-menu">
      </div>
    </nav>
<!-- Menú Help videos-->
<div class="den-helpMenu">
    <i class="fas fa-question-circle helpmenu-btn" title="Dudas frecuentes"></i>
      <ul class="den-dropmenuHelp den-hide">
        <li>¿Cómo agregar un video?</li>
        <li>¿Cómo agregar un audio?</li>
        <li>¿Cómo agregar una actividad?</li>
        <li>¿Cómo agregar elegir el tipo de actividad?</li>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Consectetur adipiscing elit</li>
        <li>Donec vitae nunc est</li>
        <li>Donec posuere nisl ut mattis venenatis</li>
      </ul>
</div>
<!-- Empiezan poups -->
<div class="den-popup-help-general den-hide">
  <div class="den-closeHelp">
    <i class="fas fa-times-circle"></i>
  </div>
  <p>Ayuda!!</p>
</div>
    <!-- popup de registro de curso -->
    <div class="den-popup-newcourse den-hide den-popup-estilo den-popup-estilo-larger">
      <span class="closePopUp">x</span>
      <form id="createCourseForm">
        <h2>Nombre del Curso</h2>
        <input type="text" name="nombreCurso" id="nombreCurso" maxlength="50" class="input-popup-newcourse" value="" placeholder="Ingresa un nuevo Curso">
        <h2>Descripción</h2>
        <div>
        <textarea name="descripcionCurso" id="descripcionCurso" class="input-popup-newdescription" value="" placeholder="Ingresa una nueva Descripción"></textarea>
      </div>
        <h2>Costo</h2>
        <input type="text" name="costoCurso" id="costoCurso" class="input-popup-newcourse" value="" placeholder="Ingresa un nuevo Costo">
      </form>
      <button type="button" name="button" id="generarNuevoCurso">Crear</button>
    </div>
    <!-- popup de registro de Tema-->
    <div class="den-popup-newtitle den-hide den-popup-estilo">
      <span class="closePopUp">x</span>
      <h2>Nombre del Tema</h2>
      <form id="createThemeForm">
        <input type="text" name="nombreTema" id="nombreTema" maxlength="50" class="input-popup-newtitle" value="" placeholder="Ingresa un nuevo Tema">
      </form>
      <button type="button" name="button" id="generarNuevaPantallaBtn">Crear</button>
    </div>

    <div class="den-popup-cambiardetitle den-hide den-popup-estilo">
      <span class="closePopUp">x</span>
      <h2>¿Seguro quieres cambiar de plantilla?</h2>
      <p>Es posible que los cambios que realizaste no se guarden.</p>
      <button type="button" name="button" id="cambiarDeTitulo">Sí</button>
      <button type="button" name="button" class="closePopUp">No</button>

    </div>

  <div class="den-popup-eliminar-actSave den-hide den-popup-estilo">
          <span class="closePopUp">x</span>
          <h2>¿Estas seguro de eliminar esta actividad?</h2>
          <button type="button" name="button" id="deleteSavePopUpAct">Eliminar</button>
          <button type="button" name="button" class="closePopUp">No</button>
    </div>
    <div class="den-popup-previsualizar den-popup-estilo den-hide">
      <span class="closePopUp">x</span>
      <div class="den-cont-plantillaprevew">

      </div>
    </div>
    <div class="habilitar-cambio-pop den-hide">
      <span class="closePopUpActividad">x</span>
      <h2>¡Los cambios que realizaste no se guardarán!</h2>
      <p>Sólo puedes ingresar un tipo de actividad a la vez.
        <br>¿Seguro que quieres eliminar esta actividad?</p>

      <button type="button" name="button" class="closePopUpActividad">Cancelar</button>
      <button type="button" name="button" id="acivityDeleteBtn">Eliminar</button>
    </div>


    <div class="den-popup-verarchivos den-popup-estilo den-hide">
      <span class="closePopUp">x</span>
      <div class="den-container den-selectActivity-container">

  <!-- COLUMNA PLANTILLA -->
        <div class="den-column-left">
          <div class="den-left-column-h1">
            <h1>Tipo de Actividad</h1>
          </div>
          <div class="den-carousel-actividades">
            <div class="activ-desability"></div>
            <button class="actividadlist-btn-top">
              <p>▲</p>
            </button>
            <div class="den-carousel-act-column">
              <!-- <div class="den-actividad-title den-select-option" id="actividad0">
                <img src="../img/actividad_01.jpg" alt="">
              </div> -->
              <div class="den-actividad-title den-select-option" id="actividad1">
                <img src="../img/actividad_02.jpg" alt="">
              </div>
              <div class="den-actividad-title" id="actividad2">
              <img src="../img/actividad_03.jpg" alt="">
              </div>
             <div class="den-actividad-title" id="actividad3">
                <img src="../img/actividad_04.jpg" alt="">
              </div>
              <div class="den-actividad-title" id="actividad4">
                 <img src="../img/actividad_05.jpg" alt="">
               </div>
               <div class="den-actividad-title" id="actividad5">
                  <img src="../img/actividad_06.jpg" alt="">
                </div>
                <div class="den-actividad-title" id="actividad6">
                   <img src="../img/actividad_07.jpg" alt="">
                 </div>
            </div>
            <button class="actividadlist-btn-bottom btn-green-scroll">
            <p>▼</p>
            </button>
            <div class="den-help effect-1 sub-a" title="¿Qué es esto?" id="helpActividad">?</div>
          </div>
        </div>
  <!-- COLUMNA EDICIÓN-->
        <div class="den-column-center">
          <div class="">

          </div>
          <div class="den-actividad-row den-top-titles-container">
            <div class="den-actividad-h1">
              <h1>Pagina</h1>
            </div>
            <div class="den-carousel-paginasActiv">
              <button class="den-paginasActiv-left">
                <p>◄</p>
              </button>
              <div class="carouselpage-id">
                <!-- <div class="den-carouselpaginas-container den-cp-visible">
                </div> -->
              </div>
              <button class="den-paginasActiv-right">
              <p>►</p>
              </button>
              <div class="den-help effect-1 sub-a" title="¿Qué es esto?" id="helpPagina">?</div>
            </div>
            <div class="den-title-new-btn-cont">
              <button type="button" name="button" id="agregarPagina">Agregar Pagina</button>
            </div>
          </div>
          <!-- <div class="den-actividad-row act-general-container den-actividadid-visible">
          </div> -->
        </div>
  <!-- COLUMNA BOTONES -->
        <div class="den-column-right">
          <button type="button" name="den_save" id="saveChangesActivity">
            Guardar
          </button>
          <button type="button" name="den_save" class="cambiar-actividad-btn den-hide">
            Cambiar de Actividad
          </button>
        </div>
      </div>
    </div>
    <div class="base-alert-style base-alert-samefilename den-hide">
      <h1>¡Ya ingresaste un archivo con este nombre!</h1>
      <p>Intenta subir el archivo con otro nombre o un archivo diferente.</p>
    </div>
    <div class="base-alert-style base-alert-extenfile color-red-alert den-hide">
      <h1></h1>
      <p></p>
    </div>
    <div class="base-alert-style base-alert-sameOrder color-green-alert den-hide">
      <h1></h1>
    </div>
    <div class="base-alert-style base-alert-titleRepetido den-hide">
      <h1></h1>
    </div>
  <!-- Terminan popups -->
    <div class="den-container">
      <div class="den-top-row-h1">
        <h1>Mis Cursos</h1>
      </div>
      <div class="den-top-row">

        <form class="">
          <select name="titulos_option" id="titulos_option" class="den-select">
          </select>
          <div class="den-help effect-1 sub-a" title="¿Qué es esto?" id="helpCurso">?</div>
          <div class="den-title-new-btn-cont moveright">
            <button type="button" name="button" id="addNewCourse" class="move-next-to-help">Agregar Curso</button>
          </div>
        </form>
      </div>

      <div class="den-top-row den-top-titles-container">
        <div class="den-top-row-h1">
          <h1>Tema</h1>
        </div>
        <div class="den-carousel-alltitles">
          <button class="den-btn-left">
            <p>◄</p>
          </button>
          <div class="den-carousel-container">
          </div>
          <button class="den-btn-right">
          <p>►</p>
          </button>
          <div class="den-help effect-1 sub-a" title="¿Qué es esto?" id="helpPantalla">?</div>
        </div>

        <div class="den-title-new-btn-cont">
          <button type="button" name="button" id="agregarNuevoTitulo">Agregar Tema</button>
        </div>
      </div>
    </div>
    <div class="den-container den-modificable-container">

<!-- COLUMNA PLANTILLA -->
      <div class="den-column-left">
        <div class="den-left-column-h1">
          <h1>Plantilla</h1>
        </div>
        <div class="den-carousel-plantillas">
            <div class="den-help effect-1 sub-a" title="¿Qué es esto?" id="helpPlantilla">?</div>
          <button class="den-btn-top">
            <p>▲</p>
          </button>
          <div class="den-carousel-column">
            <!-- <div class="den-plantilla-title" id="template0">
              <img src="../img/plantilla_01.jpg" alt="">
            </div> -->
            <div class="den-plantilla-title " id="template1">
              <img src="../img/plantilla_02.jpg" alt="">
            </div>
            <div class="den-plantilla-title" id="template7">
               <img src="../img/plantilla_08.jpg" alt="">
             </div>
            <!-- <div class="den-plantilla-title" id="template2">
            <img src="../img/plantilla_03.jpg" alt="">
            </div>
           <div class="den-plantilla-title" id="template3">
              <img src="../img/plantilla_04.jpg" alt="">
            </div>
            <div class="den-plantilla-title" id="template4">
               <img src="../img/plantilla_05.jpg" alt="">
             </div>
             <div class="den-plantilla-title" id="template5">
                <img src="../img/plantilla_06.jpg" alt="">
              </div>
              <div class="den-plantilla-title" id="template6">
                 <img src="../img/plantilla_07.jpg" alt="">
               </div> -->

          </div>
          <button class="den-btn-bottom ">
          <p>▼</p>
          </button>
        </div>
      </div>
<!-- COLUMNA EDICIÓN-->
      <div class="den-column-center" id="containerOfScreens">
        <form id="templateForm" name="templateForm" method="post" enctype="multipart/form-data" action="storeFilledTemplate.php">
          <input type="hidden" name="idTema" id="idTema" value="">
          <input type="hidden" name="temaPadre" id="temaPadre" value="">
          <div class="den-prevnedit-plantilla">

          </div>
        </form>
      </div>

<!-- COLUMNA BOTONES -->
      <div class="den-column-right">
        <button type="button" name="den_preview" class="den_previewplantilla_btn">
          Previsualizar
        </button>
        <button type="button" name="den_save" id="btnSave">
          Guardar
        </button>
        <button type="button" name="den_publicar" class="den_publicar">
          Publicar
        </button>
      </div>
    </div>
       <!--loading screen-->
    <div class="den-popup-loading-style den-hide" id="loading-screen">
      <div class="den-gray-container den-rounded-corners den-hide" id="loadBar">
        <div class="den-cont den-blue den-rounded-corners" style="width:0%" id="bar">0%</div>
      </div>
      <div class="fit-img">
        <img class="den-hide" src="../img/loading_icon.gif" id="loading-icon"></img>
        <img class="den-hide" src="../img/check.png" id="success-icon"></img>
      </div>
      <div class="fit-loading-text">
          <p class="den-hide" id="saving-text">Guardando Cambios. . .<p>
        <p class="den-hide" id="sucess-text">Su solicitud ha sido procesada<p>
        <p class="den-hide" id="error-text">Hubo un error al procesar la información<p>
      <div>
    </div>
     <!--div para visualizar mensajes-->
    <div class="messages"></div><br /><br />
    <!--div para visualizar en el caso de imagen-->
    <div class="showImage"></div>
  </body>

<script type="text/javascript" src="../js/script.js"></script>
<!-- <script type="text/javascript" src="../js/index.js"></script> -->
<!-- <script type='text/javascript' src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script> -->
<!-- <script type="text/javascript" src="../js/index.js"></script> -->
</html>
