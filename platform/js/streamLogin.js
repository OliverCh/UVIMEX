var streamLogin = (function(window, undefined){
	var publics = {};
	var userName = undefined;

	var login = function(){
		if(userName != undefined){
			var userText = userName.val();
			if(userText != ""){
				proxyer.post('tokenizer', 'token', {userName: userText}, function(data){
					if(data.token){
						sparkHandler.setToken(data.token).init();
						streammingHandler.loadRooms();
					}
				});
			}
			else{
				alert('Debes de indicar un nombre de usuario');
			}
		}
	};

	publics.setElements = function(elements){
		console.log(elements);
		userName = elements.input;
		elements.btn.on('click', login);
	};

	return publics;
})(window);