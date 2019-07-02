var streamCalendar = (function(window, undefined){
	var publics = {};
	var _container = null;
	var _calendar = null;
	var dateStart = null;
	var dateEnd = null;

	$(document).on('click', '.eventAction', function(e){
		e.stopPropagation();
		var action = $(this).data('action');
		var editor = new eventEditor($(this).parent().parent().parent(), $(this).data('eid'), $(this).data('course'));
		editor.init(action);
	});

	$(document).on('click', '.verfechabtn', function(e){
		var date = $(this).parent().find('input[type="date"]');
		var firstDate = new Date(date.val());

		if(firstDate.getDay() > 0){
			firstDate.setDate(firstDate.getDate() - firstDate.getDay());
		}
		else{
			//console.log('Domingos');
			firstDate.setDate(firstDate.getDate());
		}

		var seconDate = new Date();
		seconDate.setDate(firstDate.getDate() + 6);

		var currentDay = 0;

		_container.find('.numdiacalendar').each(function(){
			var dayNum = firstDate.getDate() + currentDay;
			switch(firstDate.getMonth() + 1){
				case 4:
				case 6:
				case 9:
				case 11:
				 	if(dayNum == 30){
				 		currentDay = -30;
				 	}
				break;
				case 2:
					if(isLeap(firstDate.getFullYear())){
						if(dayNum == 29){
							currentDay = -29;
						}
					}
					else{
						if(dayNum == 28){
							currentDay = -28;
						}
					}
				break;
				default:
					if(dayNum == 31){
						currentDay = -31;
					}
				break;
			}
			$(this).text(dayNum);
			currentDay++;
		});

		var date1 = formatDate(firstDate);
		var date2 = formatDate(seconDate);
		_calendar.html("");
	});

	$(document).on('click', '.popupBtnEvento', function(e){
		e.preventDefault();

		var eventID = $(this).data('eventid');
		var eventCreator = parseInt($(this).data('eventcreator'));
		var courseID = $(this).data('course');
		var popups = `<div class="fullblockback injectPopInfo"></div>`;
		$(popups).prependTo('body');
		$('.injectPopInfo').load('popups/popindivEvento.html', function(){
			$('.eventAction').hide();
			if(((sessionStorage.getItem('cuser_id')) == eventCreator) && (sessionStorage.getItem('cuser_role') == "instructor" || sessionStorage.getItem('cuser_role') == "author")){
				$('.eventAction').show();
				$('#btnEvent').show();
				$('.eventAction').data('eid', eventID);
				$('.eventAction').data('course', courseID);
			}
			else{
				$('.eventAction').remove();
				// $('.btnEvent').remove();
				$.post('php/eventAssistance.php', {user: sessionStorage.getItem('cuser_id'), event: eventID}, function(data){
					$(".pantalladecarga").remove();
					data = JSON.parse(data);
					//console.log(data);
					if(data.assist == 1){
						$(".bottompopcont").removeClass('displayhide').append('<button type="button" name="button" class="greenbtncontorno eventAction" data-eid="'+eventID+'" data-course="'+courseID+'" data-action="noAssist" data-eid="">Anular Asistencia</button>');
					}
					else{
						$(".bottompopcont").removeClass('displayhide').append('<button type="button" name="button" class="greenbtncontorno eventAction" data-eid="'+eventID+'" data-course="'+courseID+'" data-action="assist" data-eid="">Confirmar Asistencia</button>');
					}
				});
			}

			$.post('php/eventInfo.php', {eid: eventID}, function(data){
				$(".pantalladecarga").remove();
				data = JSON.parse(data)[0];
				//console.log(data);
				$('.injectPopInfo').find('#eventName').val(data.nombre);
				$('.injectPopInfo').find('#courseName').val(data.nombreCurso);
				$('.injectPopInfo').find('#eventDesc').val(data.descripcion);

				var startDate = data.fechaInicio.split(" ")[0];
				startDate = startDate.split("-");
				$('.injectPopInfo').find('#date').text(startDate[2] + " de " + getMonth(parseInt(startDate[1]) - 1) + "," + startDate[0]);

				var date1 = convert12H(data.fechaInicio).split(' ');
				var date2 = convert12H(data.fechaFinal).split(' ');
				$('.injectPopInfo').find('#hourStart').val(date1[0]);
				$('.injectPopInfo').find('#hourEnd').val(date2[0]);
				$('.injectPopInfo').find('#H1P').text(date1[1]);
				$('.injectPopInfo').find('#H2P').text(date2[1]);
			});
		});
	});

	var isLeap = function(year){
		return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
	};

	var getMonth = function(m){
		var months = [
			"Enero",
			"Febrero",
			"Marzo",
			"Abril",
			"Mayo",
			"Junio",
			"Julio",
			"Septiembre",
			"Octubre",
			"Noviembre",
			"Diciembre"
		];

		return months[parseInt(m)];
	}

	var formatDate = function(date, mysql){
		var day = date.getDate();
		var monthIndex = date.getMonth() + 1;
		var year = date.getFullYear();

		if(mysql)
			return year + '-' + (monthIndex < 10 ? "0" + monthIndex : monthIndex) + '-' + day + " 00:00:00";
		return day + '/' + (monthIndex < 10 ? "0" + monthIndex : monthIndex) + '/' + year + " 00:00:00";
	};

	var convert12H = function(dateStr){
		//console.log(dateStr);
		hours = dateStr.split(' ')[1];
		hours = parseInt(hours.split(':')[0]);
		if(hours > 12){
			hours = hours - 12;
			return hours + " PM";
		}
		else if(hours == 0){
			return "12 AM";
		}

		return hours + " AM";
	};

	publics.createNewStream = function(container){
		var stream = new streamEvent({
			courseSelect: container.find('#courseSelect'),
			eventName: container.find('#eventName'),
			desc: container.find('#courseDesc'),
			dateInput: container.find('#eventDate'),
			startHourSelect: container.find('#eventStarto'),
			startHourButton:  container.find('#eventStartotype'),
			endHourSelect: container.find('#eventEnd'),
			endHourButton: container.find('#eventEndBtn'),
			createBtn: container.find('#createEvent')
		});
	};

	publics.setCalendar = function(cal){
		_container = cal;
		cal.find('#popFechaStream').hide();
		cal.find('.barraherramientaspop').hide();
		if(sessionStorage.getItem('cuser_role') == 'author' || sessionStorage.getItem('cuser_role') == 'instructor' || sessionStorage.getItem('cuser_role') == 'administrator'){
			cal.find('#popFechaStream').show();
			cal.find('.barraherramientaspop').show();
		}
		else{
			cal.find('.barraherramientaspop').remove();
			cal.find('#popFechaStream').remove();
		}
		_calendar = cal.find('.caltableContainer');
		var today = new Date();

		if(today.getDay() > 0){
			today.setDate(today.getDate() - today.getDay());
		}

		var noToday = new Date();
		noToday.setDate(today.getDate() + 6);

		dateStart = formatDate(today, true);
		dateEnd = formatDate(noToday, true);

		cal.find('.periododeVentas').text("De " + today.getDate() + " de " + getMonth(today.getMonth()) + " a " + noToday.getDate() + " de " + getMonth(noToday.getMonth())) + " del " + noToday.getFullYear();

		var currentDay = 0;

		cal.find('.numdiacalendar').each(function(){
			$(this).text(today.getDate() + currentDay);
			currentDay++;
		});
	};

	publics.reload = function(){
		$.get('php/loadEvents.php', {user: sessionStorage.getItem('cuser_id'), dateIn: dateStart, dateOut: dateEnd, role: sessionStorage.getItem('cuser_role')}, function(data){
			$(".pantalladecarga").remove();
			data = JSON.parse(data);
			data = data.result;
			var today = new Date();
			if(today.getDay() > 0){
				today.setDate(today.getDate() - today.getDay());
			}

			var currentDate = new Date();
			var calendarHtml = "";
			for(var i = 0; i < 7; i++){
				currentDate.setDate(today.getDate() + i);

				var dias = "<div class='diaSemCont'>";
				for (var j = 0; j < 24; j++){
					currentDate.setHours(j, 0, 0, 0);
					var html = "";
					for(var h in data){
						var eventDate = data[h].fechaInicio.split(' ');
						eventDate = eventDate[0].split('-')[1] + '/' + eventDate[0].split('-')[2] + '/' + eventDate[0].split('-')[0] + " " + data[h].fechaInicio.split(' ')[1];
						eventDate = new Date(eventDate);
						
						if(formatDate(currentDate) == formatDate(eventDate)){
							var nhstart = data[h].fechaInicio.split(" ")[1];
							nhstart = nhstart.split(':')[0];
							nhstart = parseInt(nhstart);
							nhstart = (nhstart == 0 ? 24 : nhstart);

							var nhfin = data[h].fechaFinal.split(" ")[1];
							nhfin = nhfin.split(":")[0];
							nhfin = parseInt(nhfin);
							nhfin = (nhfin == 0 ? 24 : nhfin);

							var altura = nhfin - nhstart;
							//console.log(altura);
							if (altura > 1) {
								altura = (altura+1) * 60 ;
							}
							else{
								altura = altura * 60 ;
							}

							html += `<div class='contregEvento popupBtnEvento' data-eventcreator="`+data[h].idInstructor+`" data-course="`+data[h].idCurso+`" data-eventid="`+data[h].idES+`" style="height: `+altura+`px;">
										<p class='nameEvento'>`+data[h].nombre+`</p>
										<p class='horadeevento'>`+convert12H(data[h].fechaInicio) + '-' + convert12H(data[h].fechaFinal) +`</p>
									</div>`;
							delete data[h];
						}
					}
					dias += "<div class='caltabletd'>" +html+ "</div>";
				}
				dias += "</div>";
				calendarHtml += dias;
			}

			_calendar.html(calendarHtml);

			/*for(var i in data){
				var hstart = data[i].fechaInicio.split(' ')[0].split(':')[0];
				var hfin = data[i].fechaFinal.split(' ')[0].split(':')[0];
				var nhstart = parseInt(hstart);
				var nhfin = parseInt(hfin);
				var bloque = _calendar.find('.caltabletd:eq('+(nhstart-1)+')');
				var altura = nhfin - nhstart;
				if (altura > 1) {
					altura = (altura+1) * 60 ;
				}
				else{
					altura = altura * 60 ;
				}

				var eventocontainer = "<div class='contregEvento popupBtnEvento conaltura'><p class='nameEvento'>"+evento+"</p><p class='horadeevento'>"+data[i].fechaInicio.split(' ')[0]+"-"+data[i].fechaFinal.split(' ')[0]+"</p></div>";

				$(eventocontainer).prependTo(bloque);
				$('.conaltura').css('height', altura);
				$('.contregEvento').removeClass('conaltura');
			}*/

			$('.fullblockback').remove();
		});
	};

	return publics;
})(window);