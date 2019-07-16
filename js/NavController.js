var NavController = function(){
	var publics = {};
	var screenStack = [];
	var popStack = [];
	var container = null;
	var self = this;

	publics.pushScreen = function(obj, data, load = true){
		console.log(obj);
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

	var popSomething = function(){
		if(popStack.length > 0){
			popPop(popStack[popStack.length -1].id);
		}
		else{
			popScreen();
		}
	}

//	document.addEventListener("backbutton", popSomething, false);

	return publics;
};