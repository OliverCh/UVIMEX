var roomsHandler = (function(window, undefined){
	var _spark = null;
	var publics = {};
	var _container = null;
	var _dialer = null;
	var _callID = null;

	var startCall =  function(){
		if(_callID == ""){
			alert('No hay usuario asignado a este curso');
		}
		else{
			_container.load('../stream/streamfront.html', function(){
				var call = sparkHandler.spark.phone.dial(_callID);
				callHandler.setElements({
					selfView: _container.find('#selfView')[0], 
					remoteView: _container.find('#remoteView')[0],
					hangBtn: _container.find('#hangCall'),
					noAudioSend: _container.find('#stopSAudio'),
					noVideoSend: _container.find('#stopSVideo'),
					noAudioRec: _container.find('#stopRAudio'),
					noVideoRec: _container.find('#stopRVideo'),
					screenShare: _container.find('#startScreenShare'),
					container: _container
				});
				callHandler.handle(call);
			});
		}
	};

	publics.init = function(cs, container){
		console.log(cs);
		_container = container;
	};

	publics.setElements = function(elements){
		console.log(elements);
		_dialer = elements.callerInput ? elements.callerInput : _dialer;
		_container = elements.container ? elements.container : _container;

		if(elements.callBtn)
			elements.callBtn.on('click', startCall);
	};

	publics.setID = function(id){
		_callID = id;
		return this;
	};

	publics.startCall = startCall;

	return publics;
})(window);