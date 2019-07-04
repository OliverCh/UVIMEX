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
		if(screenStack.length == 0){
			$("body").html("");
			$("body").append("Stop it, find some help");
		}
		else{
			screenStack[screenStack.length-1].setContainer($("#content")).draw();
		}
	}

	publics.pushPop = function(CarritoController_Popup, id){
		CarritoController_Popup.setContainer(container.prepend(`<div class="pop_"`+id+`></`)).draw();
	}

	publics.popPop = function(id){
		container.find("pop_"+id).endMyLife();
	}

	document.addEventListener("backbutton", publics.popScreen, false);

	return publics;
})(window, document);