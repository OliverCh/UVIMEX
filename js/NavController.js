var NavController = function(){
	var publics = {};
	var screenStack = [];
	var popStack = [];
	var container = null;
	var self = this;

	publics.pushScreen = function(obj, data, load = true){
		screenStack.push(obj);
		
		var XD = obj.setContainer(container);
		if(data !== undefined){
			XD = XD.setData(data);
		}
		if(load)
			XD = XD.draw();
	}

	publics.popScreen = function(data){
		var hasPoped = false;
		if(screenStack.length > 1){
			// poping
			screenStack.pop();

			// loading screen
			var XD = screenStack[screenStack.length-1].setContainer(container);
			if(data !== undefined){
				XD = XD.setData(data);
			}
			XD = XD.draw();
			hasPoped = true;
		}
		return hasPoped;
	}

	publics.pushStack = function(obj){
		screenStack.push(obj);
	}

	publics.setContainer = function(cnt){
		container = cnt;
		return this;
	}

	publics.pushPop = function(popupObj, id, data, customClass="popop"){
		popStack.push(popupObj);
		popupObj.id = id;

		var XD = popupObj.setContainer(container.prepend(`
			<div class="${customClass} pop_`+id+`" style="z-index:${popStack.length*10};"></div>`).find(`.pop_${id}`)
		);
		if(data !== undefined && data !== null){
			XD = XD.setData(data);
		}

		XD = XD.draw();
	}

	publics.popPop = function(id){
		var hasPoped = false;
		console.log(popStack);
		if(popStack.length > 0){
			hasPoped = true;
			popStack.pop();
			container.find(".pop_"+id).remove();
		}
		return hasPoped;
	}

	publics.setHome = function(obj, data){
		if(!obj){
			console.error("SetHome debe tener una pantalla", 
				console.trace());
		}
		screenStack = [];
		publics.pushScreen(obj, data);
	}

	publics.goHome = function(){
		var screen = screenStack[0];
		screenStack = [];
		publics.pushScreen(screen);
	}

	publics.isStackEmpty = function(){
		return screenStack.length == 0;
	}

	publics.reloadActual = function(){
		getLast()	.setContainer(container)
					.draw();
	}

	var getLast = function(){
		return screenStack[screenStack.length-1];
	}

	publics.popSomething = function(){
		var hasPoped = publics.popPop();
		if(!hasPoped){
			hasPoped = publics.popScreen();
		}

		return hasPoped;
	}

//	document.addEventListener("backbutton", popSomething, false);

	return publics;
};