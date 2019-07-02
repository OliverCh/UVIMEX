/*
	Proxy para redireccionar las request entre servidores de node y php
*/

var proxyer = (function(window, undefined){
	var publics = {};

	publics.get = function(server, endpoint, data, fn){
		$.ajax({
			type: "GET",
			url: '../proxyer/proxy.php/' + endpoint + "?server=" + server,
			data: data,
			dataType: 'json',
			error: console.log,
			success: function(data){
				if(fn)
					fn(data);
			}
		});
	};

	publics.post = function(server, endpoint, data, fn){
		$.ajax({
			type: "POST",
			data: data,
			url: '../proxyer/proxy.php/' + endpoint + "?server=" + server,
			dataType: 'json',
			error: console.log,
			success: function(data){
				if(fn)
					fn(data);
			}
		});
	};

	return publics;
})(window);