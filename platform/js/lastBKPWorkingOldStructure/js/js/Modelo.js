var Modelo = (function (window, document, undefined) {
	var doPost = function(action, data, callback){
		var ajaxObj = {
			type: "POST",
			url: "php/central.php",
			data: {action: action, data: data},
			success: callback,
			error: function(e){
				console.log(
					"Error on POST: " 
					+ action + " - "
					+ data + " - "
					+ e);
			}
		}
		$.ajax(ajaxObj);
	}

	return {
		downloadCourses: function(user, callback){
			doPost("getCourses", user, callback);
		},
		uploadCourseInfo: function(user, antiqueName, info){
			doPost("updateInfo", new Array(user, antiqueName, info), null);
		},
		createCourse: function(user, info){
			doPost("crearCurso", new Array(user, info), null);
		},

		downloadSlides: function(user, courseName, callback){
			doPost("getDiaps", new Array(user, courseName), callback);
		},
		uploadSlides: function(user, courseName, slides){
			doPost("guardarCurso", new Array(user, courseName, slides), function(data){console.log(JSON.parse(data))});
		},
		uploadFile: function(data, callback){
			// No le muevas >.<
			var settings = {
			  "async": true,
			  "crossDomain": true,
			  "url": "php/UploadFiles.php",
			  "method": "POST",
			  "headers": {
			    "cache-control": "no-cache",
			    "postman-token": "733d79db-f6b0-b93e-258b-48004c725502"
			  },
			  "processData": false,
			  "contentType": false,
			  "mimeType": "multipart/form-data",
			  "data": data
			}

			$.ajax(settings).done(function (response) {
			  callback(response);
			});
		}
	}
})(window, document);

