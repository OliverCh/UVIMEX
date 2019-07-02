var DetalleRendimientoHandler_Alumno = (function(window, undefined){

	var idSelectedModule;
	var idCourse;
	var idUser;
	var courseName;

	var questions;
	var answers;

	var detRenAl__chooseModule_select;
	var detRenAl__topics;
	var detRenAl__activities;
	var detRenAl__courseName;
	var detRenAl__nick;
	var detRenAl__name;


	var moduleTemplate = `<option value=":id:">:module:</option>`;

	var topicSeenClass_yes = "temavisto";
	var topicSeenClass_no = "temanovisto";
	var topicSeenName_yes = "Visto";
	var topicSeenName_no = "No visto";
	var topicTempalte = `
		<tr>
          <td>:topicName:</td>
          <td class=":topicSeenClass:"><i class="far fa-eye"></i> :topicSeenName:</td>
        </tr>
	`;

	var activityGradeText_bueno = "Bueno";
	var activityGradeText_medio = "Medio";
	var activityGradeText_malo = "Malo";
	var activityGradeText_nulo = "No iniciado";

	var activityGradeClass_bueno = "actividad100";
	var activityGradeClass_medio = "actividad60";
	var activityGradeClass_malo = "actividad00";
	var activityGradeClass_nulo = "actividadnull";

	var activityTemplate = `
		<div class="indivcontactivity" data-preg=":preg:" data-resp=':resp:' data-actividad=":type:">
			<div class="fistcolumnact nameofactivity">
				<i class="fas fa-caret-right triangleshowact"></i> <p>Actividad :index:</p>
			</div>
			<div class="Secondcolumnact">
				<p class=":grade:"><i class="fas fa-star"></i> :gradeName:</p>
			</div>
		</div>`;

	var setVariables = function(){
		detRenAl__chooseModule_select = $("#detRenAl__chooseModule_select");
		detRenAl__topics = $("#detRenAl__topics");
		detRenAl__activities = $("#detRenAl__activities");
		detRenAl__courseName = $("#detRenAl__courseName");
		detRenAl__nick = $("#detRenAl__nick");
		detRenAl__name = $("#detRenAl__name");


		idSelectedModule = null;
		idUser = $("#userR").data("usrid");
		idCourse = localStorage.getItem("sdfsdf");
		nameCourse = localStorage.getItem("tyuikl");
		//idCourse = 13;
		questions = null;
		answers = null;
		detRenAl__nick.html($("#nick").html());
		detRenAl__name.html($("#userN").html());


		detRenAl__courseName.html(nameCourse);
	}

	var setEvents = function(){
		detRenAl__chooseModule_select.change(function(){
			if($(this).val() != ""){
				idSelectedModule = $(this).val();
				loadModule();
			}
		});
	};

	// GetData
	var getModules = function(callback){
		$.ajax({
			type: "post",
			url: "php/getCourseModules.php",
			data: {idCurso: idCourse},
			success: function(da){
				console.log(idCourse);
				var ee = 1;
				try{
					da = JSON.parse(da);
					ee = 0;
				}catch(e) {console.log(e);}
				if(ee == 0 && callback){
					callback(da);
				}
				else{
					alert("Error obteniendo modulos");
					console.log(da);
				}
				
			},
			error: function(e){
				console.log(e);
				alert("Error al obtener modulos");
			}
		});
	};

	var getTopics = function(callback){
		console.log(idSelectedModule);
		console.log(idUser);
		$.ajax({
			type: "get",
			url: "php/getModuleTopics.php",
			data: {idModulo: idSelectedModule, idUser: idUser},
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
					alert("Error obteniendo temas");
					console.log(da);
				}
			},
			error: function(e){
				console.log(e);
				alert("Error al obtener temas");
			}
		});
	};

	var getActivities = function(topics, callback){
		$.ajax({
			type: "post",
			url: "php/getQuestionsFromTopics.php",
			data: {idTemas: topics},
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
					alert("Error obteniendo actividades");
					console.log(da);
				}
			},
			error: function(e){
				console.log(e);
				alert("Error al obtener actividades");
			}
		});
	};

	var getAnswers = function(topics, callback){
		$.ajax({
			type: "post",
			url: "php/getAnswersFromTopics.php",
			data: {idTemas: topics, idUser: idUser},
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

	var loadModule = function(){
		getTopics(function(da){
			fillTopics(da);
			var topics = [];
			for (var i = 0; i < da.length; i++) {
				topics.push(da[i].idTema);
			}
			
			/*var questions = null;
			var answers = null;*/

			var greenLight = false;

			getActivities(topics,function(dat){
				questions = dat;
				if(greenLight)
					loadActivitiesSection();
				else
					greenLight=true;
			});
			getAnswers(topics, function(dat){
				answers = dat;
				if(greenLight)
					loadActivitiesSection();
				else
					greenLight= true;
			});
		});
	};

	var loadActivitiesSection = function(){

		var activities = [];
		for (var i = 0; i < questions.length; i++) {
			var question = questions[i];
			var answersForActivity = [];
			if(!(answers.length == 0 || answers[question.idTema] == undefined)){
				answersForActivity= answers[question.idTema][question.idActividad];
			}

			var activity = {
				question: question.pregunta,
				type: question.tipo,
				answers: answersForActivity
			};
			activities.push(activity);
		}

		fillActivities(activities);
	};

	var fillModules = function(modules){
		console.log(modules);
		for (var i = 0; i < modules.length; i++) {
			var modul = modules[i];
			var optionHTML = moduleTemplate
								.replace(":id:", modul.idModulo)
								.replace(":module:", modul.nombre);
			detRenAl__chooseModule_select.append(optionHTML);
		}

				// set first module uwu
		if(modules.length > 0){
			detRenAl__chooseModule_select.val(modules[0].idModulo);
			detRenAl__chooseModule_select.trigger("change");
		}
	};

	var fillTopics = function(topics){
		detRenAl__topics.html("");
		for (var i = 0; i < topics.length; i++) {
			var topic = topics[i];
			var topicSeenClass = (topic.seen == 1)?topicSeenClass_yes:topicSeenClass_no;
			var topicSeenName = (topic.seen == 1)?topicSeenName_yes:topicSeenName_no;
			var topicHTML = topicTempalte
									.replace(":topicName:", topic.nombre)
									.replace(":topicSeenClass:", topicSeenClass)
									.replace(":topicSeenName:", topicSeenName);
			detRenAl__topics.append(topicHTML);
		}
		
	};

	var fillActivities = function(activities){

		console.log(activities);
		$("#detRenAl__activities .indivcontactivity").remove();

		for (var i = 0; i < activities.length; i++) {
			var activity = activities[i];
			var ans = activity.answers;
			var activityGradeClass;
			var activityGradeText;

			var countGood = 0;
			var total = 0;
			
			console.log(ans);
			for (var j = 0; j < ans.length; j++) {
				if(ans[j].s != "idk"){
					if(ans[j].s == "1"){
						countGood++;
					}
					total++;
				}
			}
			console.log(countGood);
			console.log(total);
			if(total > 0){
				var grade = countGood/total;

				if(grade == 1){
					activityGradeClass = activityGradeClass_bueno;
					activityGradeText = activityGradeText_bueno;
				}
				else if(grade >= 0.6){
					activityGradeClass = activityGradeClass_medio;
					activityGradeText = activityGradeText_medio;
				}
				else{
					activityGradeClass = activityGradeClass_malo;
					activityGradeText = activityGradeText_malo;
				}
			}
			else{
				activityGradeClass = activityGradeClass_nulo;
				activityGradeText = activityGradeText_nulo;
			}
			

			var activityHTML = activityTemplate
										.replace(":preg:", activity.question)
										.replace(":type:", activity.type)
										.replace(":index:", i+1)
										.replace(":resp:", JSON.stringify(activity.answers))
										.replace(":grade:", activityGradeClass)
										.replace(":gradeName:", activityGradeText);

			detRenAl__activities.append(activityHTML);
		}
	};

	return {
		init: function(){
			
			setVariables();
			setEvents();
			getModules(function(dat){
				fillModules(dat);
			});
		}
	};
})(window);