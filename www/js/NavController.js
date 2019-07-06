var NavController = (function(window, document, undefined){
	var publics = {};
	var screenStack = [];
	var popStack = [];
	var container = $("#container");

	publics.pushScreen = function(obj, data){
		screenStack.push(obj);
		
		var XD = obj.setContainer($("#content"))
		if(data){
			XD.setData(data);
		}
		XD.draw();
	}

	publics.popScreen = function(data){
		if(popStack.length > 0){
			popStack.pop();
		}
		// FALTA
		screenStack.pop();
		if(screenStack.length != 0){
			var XD = screenStack[screenStack.length-1].setContainer($("#content"));
			if(data){
				XD.setData(data);
			}
			XD.draw();
		}
	}

	publics.pushPop = function(CarritoController_Popup, id){
		CarritoController_Popup.setContainer(container.prepend(`<div class="pop_"`+id+`></`)).draw();
	}

	publics.popPop = function(id){
		container.find("pop_"+id);
	}

	publics.setHome = function(obj){
		screenStack = [];
		publics.pushScreen(obj);
	}

	publics.goHome = function(){
		var screen = screenStack[0];
		screenStack = [];
		publics.pushScreen(screen);
	}

	document.addEventListener("backbutton", publics.popScreen, false);

	return publics;
})(window, document);