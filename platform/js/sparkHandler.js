var sparkHandler = (function(window, undefined){
	var spark = ciscospark.init({
		config: {
			phone:{
				enableExperimentalGroupCallingSupport: true
			}
		}
	});
	var inited = false;
	var publics = {};
	var _container = null;

	//var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJha2FyaW4tdGVzdCIsIm5hbWUiOiJBa2FyaW4iLCJpc3MiOiJZMmx6WTI5emNHRnlhem92TDNWekwwOVNSMEZPU1ZwQlZFbFBUaTlrTXpoaU56TXhaQzAxWXpSaExUUTVNek10WVdZNFl5MWpZamRoWldWak5tUmlNemsiLCJpYXQiOjE1NTcxMTU1NTIsImV4cCI6MTU1NzcyMDM1Mn0.veGhcVSWBu-uGt7GOhMrnf8NiDuQv5ELw6Q90GXaacE";
	//token valido por una semana no me pregunten como hacerlos
	var token = "";

	spark.once(`ready`, function() {
		inited = true;
	});

	publics.setContainer = function(tkn){
		_container = tkn;
	};

	publics.setToken = function(toke){
		token = toke;
		return this;
	};

	publics.spark = spark;

	publics.init = function(fn){
		if(inited){
			spark.authorization.requestAccessTokenFromJwt({jwt: token}).then(() => {
				spark.phone.register().catch((err) => {
						console.error(err);
						alert(err);
						throw err;
				});
				if(fn)
					fn();
				/*if (!spark.phone.registered) {
					spark.phone.on('call:incoming', (call) => {
						Promise.resolve().then(() => {
							if (call.from && call.from.personId) {
								return spark.people.get(call.from.personId);
							}
							return Promise.resolve();
						}).then((person) => {
							const str = person ? `Anwser incoming call from ${person.displayName}` : 'Answer incoming call';
							if (confirm(str)) {
								call.answer();
								_container.load('components/call.html', function(){
									callHandler.setElements({
										selfView: _container.find('#selfView')[0], 
										remoteView: _container.find('#remoteView')[0],
										hangBtn: _container.find('#hangCall'),
										noAudioSend: _container.find('#stopSAudio'),
										noVideoSend: _container.find('#stopSVideo'),
										noAudioRec: _container.find('#stopRAudio'),
										noVideoRec: _container.find('#stopRVideo'),
										container: $('#mainContainer')
									});
									callHandler.handle(call);
								});
							}
							else {
								call.decline();
							}
						}).catch((err) => {
							console.error(err);
							alert(err);
						});
					});
				}

				$('#mainContainer').load('components/noRoom.html', function(){
					caller.init(spark, $('#mainContainer'));
				});*/
			});
		}
	};

	return publics;
})(window);