var NavController = (function(window, document, undefined){
	var publics = {};
	var screenStack = [];
	var popStack = [];
	var container = null;

	publics.pushScreen = function(obj, data){
		screenStack.push(obj);
		
		var XD = obj.setContainer(container);
		if(data){
			XD = XD.setData(data);
		}
		XD = XD.draw();
	}

	publics.popScreen = function(data){
		screenStack.pop();
		if(screenStack.length != 0){
			var XD = screenStack[screenStack.length-1].setContainer(container);
			if(data){
				XD = XD.setData(data);
			}
			XD = XD.draw();
		}
	}

	publics.setContainer = function(cnt){
		container = cnt;
		return this;
	}

	publics.pushPop = function(popupObj, id, data){
		popStack.push(popupObj);
		popupObj.id = id;

		var XD = popupObj.setContainer(container.prepend(`<div class="popop pop_`+id+`"></div>`).find(`.pop_`+id+``));
		if(data){
			XD = XD.setData(data);
		}

		XD = XD.draw();
	}

	publics.popPop = function(id){
		popStack.pop();
		container.find(".pop_"+id).remove();
	}

	publics.setHome = function(){
		screenStack = [];
	}

	publics.goHome = function(){
		var screen = screenStack[0];
		screenStack = [];
		publics.pushScreen(screen);
	}

	var popSomething = function(){
		if(popStack.length > 0){
			popPop(popStack[popStack.length -1].id);
		}
		else{
			popScreen();
		}
	}

	document.addEventListener("backbutton", popSomething, false);

	return publics;
})(window, document);