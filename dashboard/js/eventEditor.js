var eventEditor = (function(container, eventID, courseID){
	var controls = container.find('.editableControl');
	var publics = {};
	var _action = "NO SE";

	var alertapositiva = function(texto){
		$('.alertapositiva').remove();
		$('.alertanegativa').remove();
		var alerta = `<div class="alertapositiva"><h2>`+texto+`<h2></div>`;
		$(alerta).prependTo('body');
		$('.alertapositiva').animate({
			top: '10%'
			}, 800, function(){
				setTimeout(function(){ $('.alertapositiva').animate({	opacity:0	},1000, function(){
					$('.alertapositiva').remove();
				}); }, 4000);
		});
	};

	var updateEvent = function(){
		controls.each(function(){
			$(this).removeClass('disabledinput');
			$(this).prop("disabled", false);
			var id = $(this).attr('id');
			if(id == "courseName"){
				var control = $(this);
				$.get('php/streamablecourses.php', {user: sessionStorage.getItem('cuser_id')}, function(data){
					$(".pantalladecarga").remove();
					data = JSON.parse(data);
					console.log(data);
					var coursesHtml = "<option disabled value='-1'>Seleccionar curso</option>";
					for(var i in data){
						coursesHtml += '<option value="'+data[i].idCursoWordPress+'"'+ (data[i].idCursoWordPress == courseID ? 'selected' : '') +'>'+data[i].author+'</option>';
					}
					control.replaceWith('<select id="courseID" class="editableControl">' + coursesHtml + '</select>');
				});
			}
		});

		container.find('.styleampnspan').removeClass('disbledampm');
		container.find('.bottompopcont').removeClass('displayhide');
	};

	var deleteEvent = function(){
		$.post('php/eventDelete.php', {eID: eventID}, function(data){
			$(".pantalladecarga").remove();
			if(data == 1){
				container.parent().remove();
				streamCalendar.reload();
				return false;
			}
		});
	};

	var confirmAssist = function(){
		$.post('php/eventAssistance.php', {eid: eventID, course: courseID, user: sessionStorage.getItem('cuser_id'), ass: 1}, function(data){
			$(".pantalladecarga").remove();
			data = JSON.parse(data);
			if(data.assist = 1){
				alertapositiva('Asistencia confirmada');
				container.parent().remove();
			}
			else if(data.assist = 2){
				alertapositiva('Evento sin lugares disponibles');
			}
			else {
				alert('Error al confirmar la asistencia, trata de nuevo');
			}
		});
	};

	var unAssist = function(){
		$.post('php/eventAssistance.php', {eid: eventID, course: courseID, user: sessionStorage.getItem('cuser_id'), ass: 0}, function(data){
			$(".pantalladecarga").remove();
			data = JSON.parse(data);
			if(data.assist = 1){
				alertapositiva('Asistencia anulada');
				container.parent().remove();
			}
			else{
				console.log(data);
				alert('Error al anular la asistencia, trata de nuevo');
			}
		});
	};

	var saveEvent = function(){
		var elements = {};
		container.find('.editableControl').each(function(){
			var elementID = $(this).attr('id');
			if(elementID != "date"){
				if(elementID == 'courseID'){
					elements['courseName'] = $(this).children("option:selected").text();
					elements['courseID'] = $(this).val() || $(this).text();
					console.log($(this).children('option:selected').text());
				}
				else{
					elements[elementID] = $(this).val() || $(this).text();
				}
			}
		});

		elements['eventID'] = eventID;

		$.post('php/updateEvent.php', elements, function(data){
			alertapositiva('Actualizado');
			container.find('.editableControl').each(function(){
				$(this).addClass('disabledinput');
				$(this).prop("disabled", true);
			});
		});
	};

	publics.init = function(act){
		_action = act;
		if(_action == "update"){
			updateEvent();
		}
		else if(_action == 'delete'){
			deleteEvent();		
		}
		else if(_action == "assist"){
			confirmAssist();
		}
		else if(_action == "noAssist"){
			unAssist();
		}
		else if(_action == "save"){
			saveEvent();
		}
	};

	return publics;
});