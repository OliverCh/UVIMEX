var DetalleAvanceHandler = (function(window, undefined){

	var idUser;

	var eval_good = `<p class="actividad100"><i class="fas fa-star"></i> Bueno</p>`;
	var eval_med = `<p class="actividad60"><i class="fas fa-star-half-alt"></i> Medio</p>`;
	var eval_bad = `<p class="actividad00"><i class="far fa-star"></i> Malo</p>`;
	var eval_null = `<p class="actividadnull"><i class="fas fa-star"></i> Sin avances</p>`;

	var DetalleAvance_listEl = `
		<tr>
			<td>:name:</td>
			<td>:topic:</td>
			<td>:state:</td>
			<!--<td><span class="horaText">4:20pm</span><p class="fechaText">23 de Enero de 2019</p></td>-->
			<td><p class="fechaText">No Hay</p></td>
			<td><button type="button" name="button" class="tddetallesc" data-id=":id:">Detalle</button></td>
		</tr>
		`;

	var detAv__userNick;
	var detAv__userName;

	var findFields = function(){
		detAv__userNick = $("#detAv__userNick");
		detAv__userName = $("#detAv__userName");
	};
	var fillFields = function(){		
		detAv__userNick.html(localStorage.getItem("nick"));
		detAv__userName.html(localStorage.getItem("name"));
	};

	var getWPCourses = function(callback){
		$.ajax({
			url: "../../platformComms.php",
			type: 'GET',
			data: {
				actionAPI: 'getUserCoursesArr',
				user: idUser
			},
			dataType: 'json',
			async: false,
			contentType: "application/json",
			success: function(arrayResponse){
				console.log(arrayResponse);
				if(arrayResponse.length > 0 && arrayResponse[0].success == 'true'){
					getDashCourses(arrayResponse[0].coursesArray, callback);
				}
				else{
					console.log(arrayResponse);
					alert("Error en carga");
				}
			},
			error: function(e){
				console.log(e);
				alert("Error ajax");
			}
		});
	}

	var getDashCourses = function(arrWPCourses,callback){
		$.ajax({
			url: "json/getCourseFromWordpress.php",
			type: 'POST',
			data: {courses: arrWPCourses},
			success: function(da){
				var ee = 1;
				try{
					da = JSON.parse(da);
					ee = 0;
				}catch(e) {console.log(e);}
				if(ee == 0 && callback){
					callback(da);
				}
				else{
					alert("Error obteniendo cursos");
					console.log(da);
				}

			},
			error: function(e){
				console.log(e);
				alert("Error ajax");
			}
		});
	}

	var getGrade = function(idCourse){
		getTopics(idCourse, function(topics){
			console.log(topics);
			console.log(idCourse);
			getAnswers(topics, function(answers){

				var trueAnswers = [];
				for(var topic in answers){
					for(var activity in answers[topic]){
						for(var question in answers[topic][activity]){
							trueAnswers.push(answers[topic][activity][question]);
						}
					}
				}

				// calculateGrade
				var countGood = 0;
				var total = 0;
				for (var j = 0; j < trueAnswers.length; j++) {
					if(trueAnswers[j].s != "idk"){
						if(trueAnswers[j].s == "1"){
							countGood++;
						}
						total++;
					}
				}
				replaceLoadingGrades(idCourse, countGood/total);
			});
		})
	}

	var replaceLoadingGrades = function(idCourse, grade){
		var evall = "";
		if(grade == 1){
			evall = eval_good;
		}
		else if(grade >= 0.6){
			evall = eval_med;
		}
		else if(grade < 0.6){
			evall = eval_bad;
		}
		else{
			evall = eval_null;
		}
		$("#replace_"+idCourse).replaceWith(evall);
	}

	var getTopics = function(idCourse, callback){

		var topics = [];
		var topicAmmount = 0;

		var appendModuleTopics = function(idModule){
			$.ajax({
				type: "get",
				url: "php/getModuleTopics.php",
				data: {idModulo: idModule, idUser: idUser},
				success: function(da){
					var ee = 1;
					try{
						da = JSON.parse(da);
						ee = 0;
					}catch(e) {console.log(e);}
					if(ee == 0 && callback){
						// Convert to array of ids
						for (var i = 0; i < da.length; i++) {
							topics.push(da[i].idTema);
						}
						funReturn();
					}
					else{
						alert("Error obteniendo respuestas");
						console.log(da);
					}

				},
				error: function(e){
					console.log(e);
					alert("Error ajax");
				}
			});
		}



		// Get modules
		$.ajax({
			type: "post",
			url: "php/getCourseModules.php",
			data: {idCurso: idCourse},
			success: function(da){
				var ee = 1;
				try{
					da = JSON.parse(da);
					ee = 0;
				}catch(e) {console.log(e);}
				if(ee == 0 && callback){
					// Convert to array of ids
					for (var i = 0; i < da.length; i++) {
						appendModuleTopics(da[i]["idModulo"]);
					}

				}
				else{
					alert("Error obteniendo respuestas");
					console.log(da);
				}

			},
			error: function(e){
				console.log(e);
				alert("Error ajax");
			}
		});

		var funReturn = function(){
			if(topics.length < topicAmmount){
				return;
			}
			callback(topics);
		}

	}

	var getAnswers = function(idsTopics, callback){
		console.log(idsTopics);
		$.ajax({
			type: "post",
			url: "php/getAnswersFromTopics.php",
			data: {idTemas: idsTopics, idUser: idUser},
			success: function(da){
				var ee = 1;
				try{
					da = JSON.parse(da);
					ee = 0;
				}catch(e) {console.log(e);}
				if(ee == 0 && callback){
					callback(da);
				}
				else{
					alert("Error obteniendo respuestas");
					console.log(da);
				}
			},
			error: function(e){
				console.log(e);
				alert("Error al obtener respuestas");
			}
		});
	}

	var processData = function(data){
		var coursesArray = data;
		var orgDataArr = [];

		for (var i = 0; i < coursesArray.length; i++) {
			var courseArray = coursesArray[i];
			var orgData = {
				courseName: courseArray["post_title"],
				courseID: courseArray["post_id"]
			};

			getGrade(courseArray["post_id"]);
			orgDataArr.push(orgData);
		}
		showData(orgDataArr);


	}

	var showData = function(orgDataArr){
		console.log(orgDataArr);
		var html = "";
		for (var i = 0; i < orgDataArr.length; i++) {
			var orgData = orgDataArr[i];
			html += DetalleAvance_listEl
						.replace(":name:", orgData.courseName)
						.replace(":topic:", "No disponible")
						.replace(":state:", "<p id='replace_" + orgData.courseID + "'>cargando...</p>")
						.replace(":id:", orgData.courseID);
		}
		$("#detAv__courses").html("");
		$("#detAv__courses").append(html);
        $(".pantalladecarga").remove();
	}




	return {
		init: function(){
			idUser = localStorage.getItem("iesgj");
			findFields();
			fillFields();
			getWPCourses(function(dat){
				processData(dat);

			});
		},
	}
})(window);
