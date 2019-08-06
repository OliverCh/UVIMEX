var NavMaster = (function(window, document, undefined){
	var publics = {};
	var screenStack = [];
	var container = $("#appContent");

	publics.pushScreen = function(obj, data, load = true){
		//if(screenStack.length != 0)
			//screenStack[screenStack.length-1].setBackground(true);
		screenStack.push(obj);
		var XD = obj.setContainer(container);
		if(data !== undefined){
			XD = XD.setData(data);
		}
		if(load)
			XD = XD.draw();
	}

	publics.popScreen = function(data){
		if(screenStack.length > 0){
			screenStack.pop();
		}
		
		if(screenStack.length != 0){
			//screenStack[screenStack.length-1].setBackground(false);
			var XD = screenStack[screenStack.length-1].setContainer(container);
			if(data !== undefined){
				XD = XD.setData(data);
			}
			XD = XD.draw();
		}
	}

	publics.pushStack = function(obj){
		screenStack.push(obj);
	}

	publics.setContainer = function(cnt){
		container = cnt;
		return this;
	}

	publics.pushPop = function(popupObj, id, data){
		popStack.push(popupObj);
		popupObj.id = id;

		var XD = popupObj.setContainer(container.prepend(`<div class="popop pop_`+id+`"></div>`).find(`.pop_`+id+``));
		if(data !== undefined){
			XD = XD.setData(data);
		}

		XD = XD.draw();
	}

	publics.popPop = function(id){
		popStack.pop();
		container.find(".pop_"+id).remove();
	}

	publics.setHome = function(obj){
		if(!obj){
			console.error("SetHome debe tener una pantalla", 
				console.trace());
		}
		screenStack = [];
		publics.pushScreen(obj);
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

	/*document.addEventListener("backbutton", popClicked, false);

	var popClicked = function(){
		screenStack[screenStack.length-1].popSubscreen();
	}*/

	return publics;
})(window, document);