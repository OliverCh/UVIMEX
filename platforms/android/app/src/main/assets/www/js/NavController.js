var NavController = (function(window, document, undefined){
	var publics = {};
	var screenStack = [];
	var popStack = [];
	var container = null;

	var popScreen = function(data){
		if(screenStack.length != 1){
			screenStack.pop();
			var XD = screenStack[screenStack.length-1].setContainer(container);
			if(data){
				XD = XD.setData(data);
			}
			XD = XD.draw();
		}
	};

	var popSomething = function(){
		if(popStack.length > 0){
			screen.orientation.unlock();
			popPop(popStack[popStack.length -1].id);
		}
		else{
			popScreen();
		}
	};

	var popPop = function(id){
		popStack.pop();
		container.find(".pop_"+id).remove();
	};

	publics.pushScreen = function(obj, data){
		screenStack.push(obj);
		
		var XD = obj.setContainer(container);
		if(data){
			XD = XD.setData(data);
		}
		XD = XD.draw();
	};


	publics.setContainer = function(cnt){
		container = cnt;
		return this;
	};

	publics.pushPop = function(popupObj, id, data){
		popStack.push(popupObj);
		popupObj.id = id;

		var XD = popupObj.setContainer(container.prepend(`<div class="popop pop_`+id+`"></div>`).find(`.pop_`+id+``));
		if(data){
			XD = XD.setData(data);
		}

		XD = XD.draw();
	};


	publics.setHome = function(){
		screenStack = [];
	};

	publics.goHome = function(){
		var screen = screenStack[0];
		screenStack = [];
		publics.pushScreen(screen);
	};

	publics.popSomething = function(){
		if(popStack.length > 0){
			popPop(popStack[popStack.length -1].id);
		}
		else{
			popScreen();
		}
	};

	publics.popScreen = popScreen;
	publics.popPop = popPop;

	document.addEventListener("backbutton", popSomething, false);

	$(document).on('click', '.closeCourse', function(){
		popSomething();
	});

	return publics;
})(window, document);