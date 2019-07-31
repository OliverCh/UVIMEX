define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	var videoController = null;
	var themeText_ = null;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	}

	publics.draw = function(){
		var base = $("<div></div>");
		base.load("secciones/platform/textSubcontroller.html", function(){
			findFields();
			initText();
		});
		base.appendTo(screenContainer);
	}

	publics.setData = function(data){
		myData = data;
		return this;
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	}

	var initText = function(){
		require(["courseControllers/TextSubcontroller"], function(TextSubcontroller){
			textSubcontroller = TextSubcontroller;
			textSubcontroller.setContainer(themeText_)
							.setParentNav(parentNav)
							.setText(`<p><span style="font-family: CNNSans-Light, &quot;Helvetica Neue&quot;, Arial; font-size: 18px;">Mujeres y activistas que defienden el derecho al aborto en&nbsp;</span><a href="https://cnnespanol.cnn.com/seccion/estados-unidos/" title="Estados Unidos" target="_blank" class="auto-link" style="color: rgb(203, 0, 0); font-family: CNNSans-Light, &quot;Helvetica Neue&quot;, Arial; font-size: 18px;">Estados Unidos</a><span style="font-family: CNNSans-Light, &quot;Helvetica Neue&quot;, Arial; font-size: 18px;">&nbsp;se manifestaron para tratar de impedir que avancen las iniciativas como las recientemente aprobadas en Georgia y Alabama. Gustavo Valdés con el reporte.</span></p><span style="font-family: CNNSans-Light, &quot;Helvetica Neue&quot;, Arial; font-size: 18px;"><br></span><p><span style="color: rgb(38, 38, 38); font-family: CNNSans-Light, &quot;Helvetica Neue&quot;, Arial; font-size: 18px;">Los demócratas de la Cámara de Representantes se amontonaron el miércoles cuando la portavoz Nancy Pelosi intentó reprimir una creciente revuelta por su resistencia a la idea de destituir al presidente Donald Trump. La reunión se produjo después de días de mayor voluntad pública por parte de líderes demócratas de alto rango para sugerir que la destitución es el movimiento correcto y que se ha convertido en una cuestión de cuándo se hará y no de si debe hacerse.</span></p>`)
							.addFile("pronombres", "https://uvimex.com.mx/dashboard/platform/uploads/378/Files/1562872569d1c3d647e0fb.png")
							.addFile("pronombres", "https://uvimex.com.mx/dashboard/platform/uploads/372/Files/15627828930bc732e562be.pdf")
							.addFile("AAA", "https://docs.google.com/document/d/e/2PACX-1vRJVgVwOWeaNUf1ew6Ir8nHO18RqlEhz_Bd7Gsa1e58aj8hdvNs8tKfIZPocmF0cJae5JHM3-uvyqRo/pub")
							.addFile("Un dox", "https://uvimex.com.mx/dashboard/platform/uploads/Análisis-de-consumo-hídrico.docx")
							.draw();
		});
	}

	var findFields = function(){
		themeText_ = screenContainer.find("#themeText_");
	}
	return publics;
});
