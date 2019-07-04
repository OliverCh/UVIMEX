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
		container.load("login.html", function(login){
			user_in = container.find("#user_in");
			pass_in = container.find("#pass_in");
			container.find('#login_submit').click(loginClick);
		});
	}


	var loginClick = function(){
		/*$.ajax({
			type: "post",
			url: "http://uvimex.mx/movile/php/uviMovil.php/login",
			data: {usr: user_in.val(), pass: pass_in.val()},
			contentType: "application/json",
			dataType: "json",
			success: function(data){
				if(data.XD == true){

				}
				else{

				}
			}
		});*/
		NavController.setHome()
	}
	return publics;
});