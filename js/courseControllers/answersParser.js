define(function(require){
	var publics = {};
	var myAnswers = {};

	publics.setAnswers = function(data){
		myAnswers = data;
	};

	publics.parseType1 = function(data, corrects){
		var html = "";
		for (var i in data){
			var current = `
				<div class="con-gen-askqu">
					<div class="row-pregunta">
						<span class="num-pregunta">`+(parseInt(i) + 1)+`</span><h2>`+data[i].questionString+`</h2>
					</div>
					:answers:
				</div>`;
			var answersHTML = "";
			for (var j in data[i].answers){
				answersHTML += `
				<div class="row-respuesta">
					<div class="respuesta-txt"><p>`+data[i].answers[j].answerStr+`</p>
						<div class="respuesta-option">
							<div class="opcion-multiple">
								<p data-ansid="`+data[i].answers[j].answerID+`" style="color:`+(myAnswers[data[i].answers[j].answerID] == undefined ? 'black' : (corrects[data[i].questionID] == undefined ? 'black' : (corrects[data[i].questionID] == data[i].answers[j].answerID ? 'green' : 'red')))+` !important;" class="answered" data-qid="`+data[i].questionID+`"><i class="far `+(myAnswers[data[i].answers[j].answerID] == undefined ? 'fa-square' : 'fa-check-square')+` answered"></i></p>
							</div>
						</div>
					</div>
				</div>`;
			}

			html += current.replace(':answers:', answersHTML);
		}
		return html;
	};
	
	publics.parseType2 = function(data, corrects){
		var html = "";
		for (var i in data){
			var current = `
				<div class="con-gen-askqu">
					<div class="row-pregunta">
						<span class="num-pregunta">`+(parseInt(i) + 1)+`</span><h2>`+data[i].questionString+`</h2>
					</div>
					:answers:
				</div>`;
			var answersHTML = "";
			for (var j in data[i].answers){
				answersHTML += `
				<div class="row-respuesta row-opcion-unica answered" data-ansid="`+data[i].answers[j].answerID+`" data-qid="`+data[i].questionID+`">
					<div class="respuesta-txt"><p>`+data[i].answers[j].answerStr+`</p>
						<div class="respuesta-option">
							<div class="opcion-unica">
								<i class="fas `+(myAnswers[data[i].answers[j].answerID] == undefined ? 'fa-circle' : 'fa-dot-circle')+` answered"></i>
							</div>
						</div>
					</div>
				</div>`;
			}

			html += current.replace(':answers:', answersHTML);
		}
		return html;
	};

	publics.parseType3 = function(data, corrects){
		console.log(data, corrects);
		var html = "";
		for (var i in data){
			var current = `
				<div class="con-gen-askqu">
					<div class="row-pregunta">
						<span class="num-pregunta">`+(parseInt(i) + 1)+`</span><h2>`+data[i].questionString+`</h2>
					</div>
					:answers:
				</div>`;
			var answersHTML = "";
			for (var j in data[i].answers){
				console.log(data[i].questionID, data[i].answers[j].answerID, corrects[data[i].questionID], corrects[data[i].questionID] == undefined);
				if(corrects[data[i].questionID] != undefined){
					console.log(corrects[data[i].questionID].indexOf(data[i].answers[j].answerID) != -1 ? 'green' : 'red');
				}
				answersHTML += `
					<div class="row-respuesta">
						<div class="respuesta-txt"><p>`+data[i].answers[j].answerStr+`</p>
							<div class="respuesta-option">
								<div class="opcion-multiple">
									<p data-ansid="`+data[i].answers[j].answerID+`" class="answered" data-qid="`+data[i].questionID+`"><i class="far `+(myAnswers[data[i].answers[j].answerID] == undefined ? 'fa-square' : 'fa-check-square')+` answered" style="color:`+(myAnswers[data[i].answers[j].answerID] == undefined ? 'black' : (corrects[data[i].questionID] == undefined ? 'black' : (corrects[data[i].questionID].indexOf(data[i].answers[j].answerID) != -1 ? 'green' : 'red')))+` !important;"></i></p>
								</div>
							</div>
						</div>
					</div>`;
			}

			html += current.replace(':answers:', answersHTML);
		}
		return html;
	};

	return publics;
});