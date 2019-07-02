var streamEvent = function(controls){
	console.log(controls);

	var publics = {};

	$.get('php/streamablecourses.php', {user: sessionStorage.getItem('cuser_id')}, function(data){
		$(".pantalladecarga").remove();
		data = JSON.parse(data);
		console.log(data);
		var coursesHtml = "<option disabled value='-1'>Seleccionar curso</option>";
		for(var i in data){
			
			coursesHtml += '<option value="'+data[i].idCursoWordPress+'">'+data[i].author+'</option>';
		}
		controls.courseSelect.html(coursesHtml);
	});

	var compare_date = function(){
		if(controls.dateInput.val() == "" || controls.dateInput.val().charAt(0) == "0")
			return;

		var deito = controls.dateInput.val();
		var selectedDate = controls.dateInput[0].valueAsDate;
		selectedDate.setDate(selectedDate.getDate() + 1);

		var actualDate = new Date(Date.now());
		actualDate.setHours(0,0,0,0);
		selectedDate.setHours(0,0,0,0);

		var hour1_string = (controls.startHourButton.text() == "AM" ? controls.startHourSelect.val() : parseInt(controls.startHourSelect.val()) + 12);
		var hour2_string = (controls.endHourButton.text() == "AM" ?  controls.endHourSelect.val() : parseInt(controls.endHourSelect.val()) + 12);

		var deito1 = new Date(deito + " " + hour1_string + ":00:00");
		var deito2 = new Date(deito + " " + hour2_string + ":00:00");

		if(deito1 > deito2){
			alert('La hora de inicio no puede ser mayor a la hora de finalización');
		}

		if((selectedDate != actualDate) && (selectedDate < actualDate)){
			alert('La fecha de inicio no puede ser anterior al día de hoy');
			controls.dateInput.val("");
		}

	};

	controls.dateInput.change(compare_date);
	controls.startHourSelect.change(compare_date);
	controls.endHourSelect.change(compare_date);
	controls.startHourButton.click(compare_date);
	controls.endHourButton.click(compare_date);

	controls.createBtn.click(function(ev){
		var values = {};
		var bads = 0;
		var badControls = [];
		for(var i in controls){
			var id = controls[i].attr('id');
			if(id == "createEvent"){
				continue;
			}
			else if(id == "courseDesc"){
				values['eventDesc'] = controls[i].text() || controls[i].val();
				if(values['eventDesc'] == ""){
					bads++;
					badControls.push(controls[i]);
				}
			}
			else if(id == "eventEndBtn" || id == "eventStartotype"){
				values[id] = controls[i].text();
			}
			else if(id == "courseSelect"){
				values[id] = controls[i].val();
				values['courseName'] = controls[i].children("option:selected").text();
			}
			else{
				if(controls[i].val() == ""){
					bads++;
					badControls.push(controls[i]);
				}
				values[id] = controls[i].val();
			}
		}

		if(bads != 0){
			ev.stopImmediatePropagation();
			alert("Debes de llenar todos los campos");
			for(var i in badControls){
				badControls[i].css('border', '1px solid red');
			}
			bads = 0;
		}
		else{
			ev.stopImmediatePropagation();
			values['idUser'] = sessionStorage.getItem('cuser_id');

			var deito = controls.dateInput.val();
			var selectedDate = controls.dateInput[0].valueAsDate;
			selectedDate.setDate(selectedDate.getDate() + 1);

			var actualDate = new Date(Date.now());
			actualDate.setHours(0,0,0,0);
			selectedDate.setHours(0,0,0,0);

			var hour1_string = (controls.startHourButton.text() == "AM" ? (controls.startHourSelect.val() == 12 ? 24 : controls.startHourSelect.val()) : (controls.startHourSelect.val() == 12 ? 12 : parseInt(controls.startHourSelect.val()) + 12)); //si la hora es AM y son las 12 entonces significa que son las 24hrs y si es pm pero son las 12 se queda como 12
			var hour2_string = (controls.endHourButton.text() == "AM" ?  (controls.endHourSelect.val() == 12 ? 24 : controls.endHourSelect.val()) : parseInt(controls.endHourSelect.val()) + 12);

			hour1_string = (hour1_string == "24" ? "00" : hour1_string);
			hour2_string = (hour2_string == "24" ? "00" : hour2_string);

			values['eventEnd'] = deito + " " + hour2_string + ":00:00";
			values['eventStarto'] = deito + " " + hour1_string + ":00:00";

			$.post('php/createEvent.php', values, function(data){
				$(".pantalladecarga").remove();
				data = JSON.parse(data);
				if(data.eventOccupied){
					alert('El horario esta ocupado por otro evento, "'+data.eventOccupied[0].nombre+'"')
				}
				else{
					$('.fullblockback').remove();
					streamCalendar.reload();
				}
			});
			/*proxyer.post('tokenizer', 'token', {userName: 3 + Math.random() + "-room"}, function(tokenData){
				if(tokenData.token){
					proxyer.post('roomCreator', 'room', {token: tokenData.token, roomName: values['eventName']}, function(roomData){
						console.log(roomData);
						values['roomID'] = roomData.roomID;
						console.log(values);
						$.post('php/createEvent.php', values, function(data){
							console.log(JSON.parse(data));
							streamCalendar.reload();
						});
					});
				}
			});*/
		}
	});

	return publics;
};