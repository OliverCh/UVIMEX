var playerAudio = "";
var json="";
var strMessage="";
$( document ).ready(function() {
    $('#descripcionCursoPlantilla').trumbowyg({
      lang: 'es',
      btns: [
       ['viewHTML'],
       ['undo', 'redo'], // Only supported in Blink browsers
       ['formatting'],
       ['strong', 'em', 'del'],
       ['superscript', 'subscript'],
       ['link'],
       ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
       ['unorderedList', 'orderedList'],
       ['horizontalRule'],
       ['removeformat'],
       ['fullscreen']
      ]
    });
    playerAudio = document.getElementById("audioPlayback");
      $('#btnSpeaker').on('click', function () {
          if (playerAudio.paused == false && $("#descripcionCursoPlantilla").val()!="") {
              playerAudio.pause();
          } else {
              if($("#descripcionCursoPlantilla").val()!=""){
                var content = ""
                    content= $("#descripcionCursoPlantilla").val();
                    content = content.replace(/<[^>]*>/g,'');
                    content=content.replace("&nbsp;", '');
                strMessage=`${$("#title").val()}. ${$("#subtitle").val()}. ${content}`;
                $.when( speakText(strMessage) ).done(function() {
                    playerAudio.play();
                });
              }
          }
      });
      playerAudio.addEventListener('timeupdate',function(){
        var audio=document.querySelector('#audioPlayback');
        var currentVideoPlay=audio.currentTime / audio.duration;
        console.warn(audio.currentTime);
        var currentVideoTime=Math.round(audio.currentTime);
        var totalVideoTime=Math.round(audio.duration);

      });
});
        // Initialize the Amazon Cognito credentials provider

        // Function invoked by button click
        function speakText(strMessage) {
            // Create synthesizeSpeech params JSON

            AWS.config.region = 'us-east-2';
            AWS.config.credentials = new AWS.CognitoIdentityCredentials(
              {IdentityPoolId: 'us-east-2:7b03b4ed-47fb-4e8e-aa72-e159e5f46cc8'}
            );
            var speechParams = {
                OutputFormat: "mp3",
                SampleRate: "16000",
                Text: strMessage,
                TextType: "text",
                VoiceId: "Mia",
            };
             //Get json with times to mark it
             var underlineParams = {
                 OutputFormat: "json",
                 SampleRate: "16000",
                 SpeechMarkTypes:['word'],
                 Text: strMessage,
                 TextType: "text",
                 VoiceId: "Mia",
             };
            // Create the Polly service object and presigner object
            var polly = new AWS.Polly({apiVersion: '2016-06-10'});
            var signer = new AWS.Polly.Presigner(speechParams, polly);

            var speechMark = new AWS.Polly.Presigner(underlineParams, polly);
            console.warn('el speachParam es',speechParams);
            // Create presigned URL of synthesized speech file
            signer.getSynthesizeSpeechUrl(speechParams, function(error, url) {
              if (error) {
          	  document.getElementById('result').innerHTML = error;
              } else {
          	  audioSource.src = url;
               playerAudio.load();
               playerAudio.play();
              }
            });
          //  get Text for speech file
            speechMark.getSynthesizeSpeechUrl(underlineParams, function(error, url) {
              console.warn(url);
              if (error) {
          	  console.warn('el error fue');
              console.error(error, error.stack);
              } else {
                console.warn('la url regreso');
                console.log(url);
                $.ajax({
                        type: "GET",
                        dataType:"json*",
                         url: url,
                         async: false,
                         success(response) {
                            console.log('listo',response);
                         },
                         error(response){
                           //we get data because its not needed to save file
                          var newStr = response.responseText.replace(/}/g, '},');
                          json = newStr.substring(0, newStr.length - 2);
                          json =  JSON.parse('[' + json.replace(/}{/g, '},{') + ']');
                         }
                      });
                      console.warn('aqui imprimira el jsonconvertido:');
                      console.log(json);
              }
            });
        }
