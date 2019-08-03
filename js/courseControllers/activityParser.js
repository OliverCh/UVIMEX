define(function(require){
	var publics = {};

	publics.parseType1 = function(data){
		var html = "";
		for (var i in data){
			var current = `
				<div class="renglonAct">
					<h2><span class="numberAct">`+(parseInt(i) + 1)+`) </span>`+data[i].questionString+`</h2>
					:answers:
				</div>`;
			var answersHTML = "";
			for (var j in data[i].answers){
				answersHTML += `
					<div class="multianswerdRow">
						<div class="actContainer">
							<input class="actInput" type="radio" value="`+data[i].answers[j].answerID+`">
						</div>
						<p>`+data[i].answers[j].answerStr+`</p>
					</div>`;
			}

			html += current.replace(':answers:', answersHTML);
		}
		return html;
	};
	
	publics.parseType2 = function(data){
		var html = "";
		for (var i in data){
			html += `
				<div class="renglonAct">
					<h2><span class="numberAct">`+(parseInt(i) + 1)+`) </span>`+data[i].questionString+`</h2>
					<input class="activityAnswer" placeholder="Escribe tu respuesta...">
				</div>`;
		}
		return html;
	};

	publics.parseType3 = function(data){
		var html = "";
		for (var i in data){
			var current = `
				<div class="renglonAct">
					<h2><span class="numberAct">`+(parseInt(i) + 1)+`) </span>`+data[i].questionString+`</h2>
					:answers:
				</div>`;
			var answersHTML = "";
			for (var j in data[i].answers){
				answersHTML += `
					<div class="multianswerdRow">
						<div class="actfb">
							<p data-ansid="`+data[i].answers[j].answerID+`">`+data[i].answers[j].answerStr+`</p>
						</div>
						
					</div>`;
			}

			html += current.replace(':answers:', answersHTML);
		}
		return html;
	};

	return publics;
});