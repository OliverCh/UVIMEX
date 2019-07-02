var DetalleRendimientoHandler = (function(window, undefined){

	var idSelectedModule;
	var idCourse;
	var idUser;

	var questions;
	var answers;

	var detRen__nick;
	var detRen__name;
	var detRen__chooseModule_select;
	var detRen__topics;
	var detRen__activities;


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
		detRen__chooseModule_select = $("#detRen__chooseModule_select");
		detRen__topics = $("#detRen__topics");
		detRen__activities = $("#detRen__activities");
		detRen__nick = $("#detRen__nick");
		detRen__name = $("#detRen__name");
		idSelectedModule = null;
		idUser = localStorage.getItem("iesgj");
		idCourse = localStorage.getItem("sdfsdf");
		//idCourse = 13;
		questions = null;
		answers = null;
		console.log(detRen__nick);
		detRen__nick.html(localStorage.getItem("nick"));
		detRen__name.html(localStorage.getItem("name"));
	}

	var setEvents = function(){
		detRen__chooseModule_select.change(function(){
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
		$.ajax({
			type: "get",
			url: "php/getModuleTopics.php",
			data: {idModulo: idSelectedModule, idUser},
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
					da = (da=="")?[]:JSON.parse(da);
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
        $("body").append(`<div class="pantalladecarga"><img src="img/uvimex_load.gif" alt=""></div>`);
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
		console.log(questions);
		console.log(answers);
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
		for (var i = 0; i < modules.length; i++) {
			var modul = modules[i];
			var optionHTML = moduleTemplate
								.replace(":id:", modul.idModulo)
								.replace(":module:", modul.nombre);
			detRen__chooseModule_select.append(optionHTML);
		}

		// set first module uwu
		if(modules.length > 0){
			detRen__chooseModule_select.val(modules[0].idModulo);
			detRen__chooseModule_select.trigger("change");
		}
	};

	var fillTopics = function(topics){
		detRen__topics.html("");
		for (var i = 0; i < topics.length; i++) {
			var topic = topics[i];
			var topicSeenClass = (topic.seen == 1)?topicSeenClass_yes:topicSeenClass_no;
			var topicSeenName = (topic.seen == 1)?topicSeenName_yes:topicSeenName_no;
			var topicHTML = topicTempalte
									.replace(":topicName:", topic.nombre)
									.replace(":topicSeenClass:", topicSeenClass)
									.replace(":topicSeenName:", topicSeenName);
			detRen__topics.append(topicHTML);
		}
		
	};

	var fillActivities = function(activities){
		$("#detRen__activities .indivcontactivity").remove();

		console.log(activities);

		for (var i = 0; i < activities.length; i++) {
			var activity = activities[i];
			var ans = (!activity.answers)?[]:activity.answers;
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

			detRen__activities.append(activityHTML);
		}
		
        $(".pantalladecarga").remove();
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