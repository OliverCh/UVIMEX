define(function(require){
	var publics = {};
	var myAnswers = {};

	publics.setAnswers = function(data){
		myAnswers = data;
	};

	publics.parseType1 = function(data){
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
								<p data-ansid="`+data[i].answers[j].answerID+`" data-qid="`+data[i].questionID+`"><i class="far `+(myAnswers[data[i].answers[j].answerID] == undefined ? 'fa-square' : 'fa-check-square')+`"></i></p>
							</div>
						</div>
					</div>
				</div>`;
			}

			html += current.replace(':answers:', answersHTML);
		}
		return html;
	};
	
	publics.parseType2 = function(data){
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
				<div class="row-respuesta row-opcion-unica" data-ansid="`+data[i].answers[j].answerID+`" data-qid="`+data[i].questionID+`">
					<div class="respuesta-txt"><p>`+data[i].answers[j].answerStr+`</p>
						<div class="respuesta-option">
							<div class="opcion-unica">
								<i class="fas `+(myAnswers[data[i].answers[j].answerID] == undefined ? 'fa-circle' : 'fa-dot-circle')+`"></i>
							</div>
						</div>
					</div>
				</div>`;
			}

			html += current.replace(':answers:', answersHTML);
		}
		return html;
	};

	publics.parseType3 = function(data){
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
									<p data-ansid="`+data[i].answers[j].answerID+`" data-qid="`+data[i].questionID+`"><i class="far `+(myAnswers[data[i].answers[j].answerID] == undefined ? 'fa-square' : 'fa-check-square')+`"></i></p>
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