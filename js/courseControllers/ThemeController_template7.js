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
							.setText(`<p style="box-sizing: inherit; margin: 0px; word-break: break-word; min-height: 25px; padding-left: 28px; padding-right: 28px; color: rgb(65, 69, 73); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;\\30D2?????Pro W3&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, &quot;\\30E1???&quot;, Meiryo, &quot;??  ?????&quot;, arial, sans-serif; font-size: 16px; letter-spacing: -0.048px;">-prepárense para los problemas</p><p style="box-sizing: inherit; margin: 0px; word-break: break-word; min-height: 25px; padding-left: 28px; padding-right: 28px; color: rgb(65, 69, 73); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;\\30D2?????Pro W3&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, &quot;\\30E1???&quot;, Meiryo, &quot;??  ?????&quot;, arial, sans-serif; font-size: 16px; letter-spacing: -0.048px;">-y mas vale que teman</p><p style="box-sizing: inherit; margin: 0px; word-break: break-word; min-height: 25px; padding-left: 28px; padding-right: 28px; color: rgb(65, 69, 73); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;\\30D2?????Pro W3&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, &quot;\\30E1???&quot;, Meiryo, &quot;??  ?????&quot;, arial, sans-serif; font-size: 16px; letter-spacing: -0.048px;">-para proteger al mundo de la devastación</p><p style="box-sizing: inherit; margin: 0px; word-break: break-word; min-height: 25px; padding-left: 28px; padding-right: 28px; color: rgb(65, 69, 73); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;\\30D2?????Pro W3&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, &quot;\\30E1???&quot;, Meiryo, &quot;??  ?????&quot;, arial, sans-serif; font-size: 16px; letter-spacing: -0.048px;">-para unir a los pueblos dentro de nuestra nación</p><p style="box-sizing: inherit; margin: 0px; word-break: break-word; min-height: 25px; padding-left: 28px; padding-right: 28px; color: rgb(65, 69, 73); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;\\30D2?????Pro W3&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, &quot;\\30E1???&quot;, Meiryo, &quot;??  ?????&quot;, arial, sans-serif; font-size: 16px; letter-spacing: -0.048px;">-para denunciar los males de la verdad y el amor</p><p style="box-sizing: inherit; margin: 0px; word-break: break-word; min-height: 25px; padding-left: 28px; padding-right: 28px; color: rgb(65, 69, 73); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;\\30D2?????Pro W3&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, &quot;\\30E1???&quot;, Meiryo, &quot;??  ?????&quot;, arial, sans-serif; font-size: 16px; letter-spacing: -0.048px;">-y extender nuestro reino hasta las estrellas</p><p style="box-sizing: inherit; margin: 0px; word-break: break-word; min-height: 25px; padding-left: 28px; padding-right: 28px; color: rgb(65, 69, 73); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;\\30D2?????Pro W3&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, &quot;\\30E1???&quot;, Meiryo, &quot;??  ?????&quot;, arial, sans-serif; font-size: 16px; letter-spacing: -0.048px;">-jesie</p><p style="box-sizing: inherit; margin: 0px; word-break: break-word; min-height: 25px; padding-left: 28px; padding-right: 28px; color: rgb(65, 69, 73); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;\\30D2?????Pro W3&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, &quot;\\30E1???&quot;, Meiryo, &quot;??  ?????&quot;, arial, sans-serif; font-size: 16px; letter-spacing: -0.048px;">-james</p><p style="box-sizing: inherit; margin: 0px; word-break: break-word; min-height: 25px; padding-left: 28px; padding-right: 28px; color: rgb(65, 69, 73); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;\\30D2?????Pro W3&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, &quot;\\30E1???&quot;, Meiryo, &quot;??  ?????&quot;, arial, sans-serif; font-size: 16px; letter-spacing: -0.048px;">-el equipo rocket viajando a la velocidad de la luz</p><p style="box-sizing: inherit; margin: 0px; word-break: break-word; min-height: 25px; padding-left: 28px; padding-right: 28px; color: rgb(65, 69, 73); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;\\30D2?????Pro W3&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, &quot;\\30E1???&quot;, Meiryo, &quot;??  ?????&quot;, arial, sans-serif; font-size: 16px; letter-spacing: -0.048px;">-rindance ahora o preparence a luchar</p><p style="box-sizing: inherit; margin: 0px; word-break: break-word; min-height: 25px; padding-left: 28px; padding-right: 28px; color: rgb(65, 69, 73); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;\\30D2?????Pro W3&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, &quot;\\30E1???&quot;, Meiryo, &quot;??  ?????&quot;, arial, sans-serif; font-size: 16px; letter-spacing: -0.048px;">-meowth, asi es</p><p style="box-sizing: inherit; margin: 0px; word-break: break-word; min-height: 25px; padding-left: 28px; padding-right: 28px; color: rgb(65, 69, 73); font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;\\30D2?????Pro W3&quot;, &quot;Hiragino Kaku Gothic Pro&quot;, &quot;\\30E1???&quot;, Meiryo, &quot;??  ?????&quot;, arial, sans-serif; font-size: 16px; letter-spacing: -0.048px;">-wobafett (aplausos)</p>`)
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
