define(function(require){
	var publics = {};
	var container = null;

	//Controllers
	var user_in = null;
	var pass_in = null;

	publics.setContainer = function(cnt){
		container = cnt;
		return this;
	};

	publics.draw = function(){
		if(localStorage.getItem('user_id')){
			$.post(masterPath + "autoLogin.php", {userID: localStorage.getItem('user_id')}, function(data){
				if(data.login == true){
					require(["AppBaseController"], function(AppBaseController){
						NavController.pushScreen(AppBaseController);
					});
				}
				else{
					container.load("login.html", function(){
						user_in = container.find("#user_in");
						pass_in = container.find("#pass_in");
						container.find('#login_submit').click(loginClick);
					});		
				}
			});
		}
		else{
			container.load("login.html", function(login){
				user_in = container.find("#user_in");
				pass_in = container.find("#pass_in");
				container.find('#login_submit').click(loginClick);
			});
		}
	}


	var loginClick = function(){
		var usr = user_in.val();
		var pass = pass_in.val();

		if(usr == "" && pass == ""){
			alert('Debes de llenar ambos campos');
		}
		else if(usr == ""){
			alert('Debes de poner un nombre de usuario');
		}
		else if(pass == ""){
			alert('Debes de poner una contraseña');
		}
		else{
			$.ajax({
				type: "POST",
				url: "https://uvimex.com.mx/movimex/login.php",
				data: {user: usr, pass: pass},
				dataType: "json",
				error: function(jqXHR, textStatus, errorThrown){
					console.log(jqXHR);
				},
				success: function(data){
					if(data.login == "error"){
						console.log(data);
					}
					else if(data.login == true){
						alert('🅱ogueado como ' + usr);
						localStorage.setItem('user_id', data.id);
						NavController.goHome();
					}
					else if(data.login == false){
						alert('Credenciales incorrectas');
					}
				}
			});
		}
	}
	return publics;
});