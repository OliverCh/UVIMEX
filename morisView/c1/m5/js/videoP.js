var videoP = (function(window, undefined){

    return {
    	init: function (videoLink) {
if(videoLink == undefined)
    return false;
			var canvas = document.getElementById('videoCursoCanvas');
			var ctx = canvas.getContext('2d');
			var video = document.getElementById('videoCurso');
/*
			var xhr = new XMLHttpRequest();
			xhr.open('GET', videoLink, true);
			xhr.responseType = 'blob'; //important
			xhr.onload = function(e) {
				if (this.status == 200) {
					console.log("loaded");
					var blob = this.response;
					video.oncanplaythrough = function() {
						console.log("Can play through video without stopping");
						URL.revokeObjectURL(this.src);
					};
					video.src = URL.createObjectURL(blob);
					video.load();
				}
			};
			xhr.send();*/
			video.src = videoLink;
			video.load();
			// set canvas size = video size when known
			video.addEventListener('loadedmetadata', function() {
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
				var altura = $("#seccionVideo").height();
				//$("#img0 img").css('height', (canvas.height / 2));
				$("#img0 img").css('height', altura -29);
				duracionVideo = document.getElementById("videoCurso").duration;
				$("#controlVideo").attr("max", duracionVideo);
				//updateBar = setInterval(actualizaBarraVideo, 500);
				document.getElementById("videoCurso").play();
				$("#mediaPlay").removeAttr("class");
				$("#mediaPlay").attr("class", "icon-pause");
			});

			video.addEventListener('play', function() {
			  var $this = this; //cache
			  (function loop() {
			    if (!$this.paused && !$this.ended) {
			      ctx.drawImage($this, 0, 0);
			      setTimeout(loop, 1000 / 30); // drawing at 30fps
			    }
			  })();
			}, 0);
    	}


    }
})(window);
$(document).on('click', '#imprimirActividad', function() {
   window.print();
});


function redimensionarImg(){
	var altura = $("#seccionVideo").height();
	$("#img0 img").css('height', altura -29);
}
