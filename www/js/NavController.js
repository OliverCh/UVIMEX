var NavController = (function(window, document, undefined){
	var publics = {};
	var screenStack = [];
	var container = $("#container");

	publics.pushScreen = function(obj){
		screenStack.push(obj);
		obj.setContainer($("#content")).draw();
	}

	publics.popScreen = function(){
		screenStack.pop();
		if(screenStack.length != 0){
			screenStack[screenStack.length-1].setContainer($("#content")).draw();
		}
	}

	publics.pushPop = function(CarritoController_Popup, id){
		CarritoController_Popup.setContainer(container.prepend(`<div class="pop_"`+id+`></`)).draw();
	}

	publics.popPop = function(id){
		container.find("pop_"+id).endMyLife();
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