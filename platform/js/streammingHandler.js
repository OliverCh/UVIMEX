var streammingHandler = (function(){
	var publics = {};
	var _container = null;

	publics.setContainer = function(container){
		_container = container;
	};

	publics.loadRooms = function(){
		var today = new Date(Date.now());
		var queryStr = location.search;
		queryStr = queryStr.substring(1, queryStr.length);
		queryStr = queryStr.split("&")[0];
		queryStr = parseInt(queryStr.split("=")[1]);

		if(isNaN(queryStr) || queryStr < 0){
			alert("Invalid query url");
		}
		else{
			$.post('../php/rooms.php', {course: queryStr, date: today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + " " + today.getHours() + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + ":00"}, function(data){
				data = JSON.parse(data);
				if(data.error){
					_container.html(`
						<h1>`+data.error+`</h1>
						<p>`+data.num+`</p>
						<p>`+data.message+`</p>
					`);
				}
				else if(data.roomID == 0){
					_container.html(`<h1>No hay streams disponibles hoy</h1>`);
				}
				else if(data.webexID){
					roomsHandler.setID(data.webexID).startCall();
				}
			});
		}
	};
	// $('#btnStreamingCtl').hide();

	// var queryStr = location.search;
	// queryStr = queryStr.substring(1, queryStr.length);
	// queryStr = queryStr.split("&")[0];
	// queryStr = parseInt(queryStr.split("=")[1]);

	// if(isNaN(queryStr) || queryStr < 0){
	// 	alert("Invalid query url");
	// }
	// else{
	// 	$.post('../php/streamable.php', {course: queryStr}, function(data){
	// 		data = JSON.parse(data);
	// 		console.log(data);
	// 		if(data.isStreamable == 1){
	// 			$('#btnStreamingCtl').show();
	// 		}
	// 		else{
	// 			$('#btnStreamingCtl').remove();
	// 		}
	// 	});
	// }

	return publics;	
})(window);