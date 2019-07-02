var callHandler = (function(window, undefined){
	var publics = {};
	var _call = null;
	var selfView = null;
	var remoteView = null;
	var container = null;
	var sharingScreen = false;

	var startSending = function(what){
		if(_call != null){
			if(what == 'video'){
				_call.startSendingVideo();
			}
			else{
				_call.startSendingAudio();
			}
		}
	};

	var stopSending = function(what){
		if(_call != null){
			if(what == 'video'){
				_call.stopSendingVideo();
			}
			else{
				_call.stopSendingAudio();
			}
		}
	};

	var startReceiving = function(what){
		if(_call != null){
			if(what == 'video'){
				_call.startReceivingVideo();
			}
			else{
				_call.startReceivingAudio();
			}
		}
	};

	var stopReceiving = function(what){
		if(_call != null){
			if(what == 'video'){
				_call.stopReceivingVideo();
			}
			else{
				_call.stopReceivingAudio();
			}
		}
	};

	var hangup = function(){
		_call.hangup();
		container.remove();
	};

	publics.handle = function(call){
		_call = call;
		_call.on(`error`, (err) => {
			console.error(err);
			alert(err);
		});

		_call.once(`localMediaStream:change`, () => {
			selfView.srcObject = _call.localMediaStream;
		});

		_call.once(`remoteMediaStream:change`, () => {
			remoteView.srcObject = _call.remoteMediaStream;
		});

		/*_call.on(`disconnected`, () => {
			selfView.srcObject = remoteView.srcObject = undefined;
			call = undefined;
			_call = undefined;
			container.load('../stream/noRoom.html');
		});*/
	};

	publics.setElements = function(elements){
		selfView = elements.selfView;
		remoteView = elements.remoteView;
		container = elements.container;

		elements.hangBtn.on('click', hangup);

		elements.noAudioSend.on('click', function(){
			if(_call.sendingAudio){
				stopSending('audio');
				elements.noAudioSend.text('Enviar audio').find('i').removeClass('fa-volume-mute').addClass('fa-volume-off');
			}
			else{
				startSending('audio');
				elements.noAudioSend.text('Dejar de enviar audio').find('i').removeClass('fa-volume-off').addClass('fa-volume-mute');
			}
		});

		elements.noVideoSend.on('click', function(){
			if(_call.sendingVideo){
				stopSending('video');
				elements.noAudioSend.text('Enviar video').find('i').removeClass('video-slash').addClass('fa-video');
			}
			else{
				startSending('video');
				elements.noAudioSend.text('Dejar de enviar video').find('i').removeClass('fa-video').addClass('video-slash');
			}
		});

		elements.noAudioRec.on('click', function(){
			if(_call.remoteAudioMuted){
				stopReceiving('audio');
				elements.noAudioRec.text('Recibir audio').find('i').removeClass('fa-volume-mute').addClass('fa-volume-off');
			}
			else{
				startReceiving('audio');
				elements.noAudioRec.text('Dejar de recibir audio').find('i').removeClass('fa-volume-off').addClass('fa-volume-mute');
			}
		});

		elements.noVideoRec.on('click', function(){
			if(_call.remoteVideoMuted){
				stopReceiving('video');
				elements.noAudioSend.text('Recibir video').find('i').removeClass('video-slash').addClass('fa-video');
			}
			else{
				startReceiving('video');
				elements.noAudioSend.text('Dejar de recibir video').find('i').removeClass('fa-video').addClass('video-slash');
			}
		});

		elements.screenShare.on('click', function(){
			if(sharingScreen){
				elements.screenShare.text('Dejar de compartir pantalla');
				_call.startScreenShare();
			}
			else{
				elements.screenShare.text('Compartir pantalla');
				_call.stopScreenShare();
			}
		});
	};

	return publics;
})(window);