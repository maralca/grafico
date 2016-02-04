	/**
	 * Classe, para manipular informçaões sobre a geração do grafico, recebe dados do \dataHanlder
	 *
	 * @method  SuperChart
	 *
	 * @param  {Object}  input     DataHandler\compositeData\
	 * @param  {String}  plotName  Nome do plot
	 */
	function SuperChart(input,plotName){
		///////////////////////////
		//VARIAVEIS DE INSTANCIA //
		///////////////////////////
			var me;

			var superModule;
			var superParameter;

			var Input;

			var tipo;
			var tema;
			var titulos;
			var escala;
			var series;
			var rotulos;
			var links;
			
			var chart;
			var chartId;

			var digestCycle;
			var digestEnable;
		///////////////////////
		//METODOS DE AUXILIO //
		///////////////////////
			function ajuster(val){
				var ajusted;

				ajusted = val.replace(' ','').replace(".",'');

				return ajusted;
			}		    
		///////////////
		//CONSTRUÇÃO //
		///////////////
			if(input==null){
				return;
			}
			me = this;

			tipo = xtrGrafico.Default.tipo;					
			tema = xtrGrafico.Default.tema;
			titulos = xtrGrafico.Default.titulos;
			escala = xtrGrafico.Default.escala;	

			series = {
				ideal: [],
				raw: []
			};			
			rotulos = [];	
			links = [];	

			digestCycle = 0;
			digestEnable = true;

			superParameter = new SuperParameter(me);
			superModule = new SuperModule(me);

			digest();

			Input = XtrGraficoUtil.clone(input);
			if(XtrGraficoUtil.isset(input.alt))
				Input=input.alt;
		   	
			if(XtrGraficoUtil.isset(Input.tipo)){					
				setTipo(Input.tipo);
			}

			if(XtrGraficoUtil.isset(Input.tema)){
				setTema(Input.tema);
			}					

			if(XtrGraficoUtil.isset(Input.titulos)){
				setTitulos(Input.titulos);
			}

			if(XtrGraficoUtil.isset(Input.rotulos)){
				setRotulos(Input.rotulos);
			}

			if(XtrGraficoUtil.isset(Input.escala)){
				setEscala(Input.escala);
			}

			if(XtrGraficoUtil.isset(Input.links)){
				setLinks(Input.links);
			}

			if(XtrGraficoUtil.isset(Input.series)){
				setSeries(Input.series);
			}
			return me;	
		/////////////////////
		//METODOS PROPRIOS //
		/////////////////////
			function digest(){
				if(digestEnable){
					console.info("Digest of SuperChart was request by",arguments.callee.caller);				
					//console.trace();

					me.toParameter = toParameter;

					me.areOneOfTheseMyChartType = areOneOfTheseMyChartType;
					me.isThisMyChartType = isThisMyChartType;
					me.thisChartTypeExists = thisChartTypeExists;

					me.thisThemeExists = thisThemeExists;
					
					me.isThisMyScaleType = isThisMyScaleType;
					me.thisSacleTypeExists = thisSacleTypeExists;

					me.getDimensionObject = getDimensionObject;

					me.getTema = getTema;
					me.getTipo = getTipo;
					me.getEscala = getEscala;
					me.getSeries = getSeries;
					me.getRotulos = getRotulos;
					me.getLinks = getLinks;
					me.getTitulos = getTitulos;

					me.setTipo = setTipo;
					me.setTema = setTema;
					me.setEscala = setEscala;
					me.setSeries = setSeries;
					me.setRotulos = setRotulos;
					me.setLinks = setLinks;
					me.setTitulos = setTitulos;

					me.setPlotName = setPlotName;
					me.setChart = setChart;
					me.setLegend = setLegend;

					me.getPlotName = getPlotName;
					me.getChart = getChart;
					me.getLegend = legenda;

					me.create = create;
					me.updateOneSerie = updateOneSerie;
					me.addAllSeries = addAllSeries;
					me.addOneSerie = addOneSerie;
					me.addAllAxis = addAllAxis;
					me.addAllPlots = addAllPlots;
					me.addExtras = addExtras;
					me.addLegend = addLegend;
					me.addConnectToPlot = addConnectToPlot;
					me.addStyle = addStyle;
					me.render = render;

					superModule = new SuperModule(me);
					superParameter = new SuperParameter(me);

					digestCycle++;
				}
			}
		//////////////////////
		//METODOS DE CLASSE //
		//////////////////////
			////////////////////////
			//METODOS DE BOUNDING //
			////////////////////////		
				/**
				 * OBTER, objeto personalizado com propriedades uteis em estilização e definição de certos parametros em \SuperParameter
				 *
				 * @method  getDimensionObject
				 *
				 * @return  {Object}	Composto por seguintes propriedades:
				 *                            
				 */
				function getDimensionObject(){
					var Series,serie;
					var serieIndex,serieCounter;

					var data,dataItem,dataValue,dataName;
					var dataObj;
					var dataIndex;

					var maxs,max;
					var sums;
					var sumMax,sumMin;
					var mins,min;

					var indexes;

					var width,height;

					var out;

					var exception;

					var element;

					out = {
						max: {
							x: 0,
							y: 0,
							size: 0
						},
						min: {
							x: 0,
							y: 0,						
							size: 0
						},
						sumMax: {
							x: 0,
							y: 0,
							size: 0
						},
						sumMin: {
							x: 0,
							y: 0,
							size: 0
						},
						delta:{
							x:{
								sin: 0,
								sum: 0
							},
							y:{
								sin: 0,
								sum: 0
							},
							size:{
								sin: 0,
								sum: 0
							}
						}
					};

					maxs = {
						x: [],
						y: [],
						size: []
					};
					mins = {
						x: [],
						y: [],
						size: []
					};
					sums = {
						x: [],
						y: [],
						size: []
					};

					exception = false;

					if(chart){
						Series = chart.series;
						serieCounter = 0;
						for(serieIndex = 0; Series.length > serieIndex; serieIndex++) {
							serie = Series[serieIndex];
							data = Series[serieIndex].data;
							dataName = serie.name;
							dataObj = {
								x: [],
								y: [],
								size: []
							};
							for(dataIndex = 0; data.length > dataIndex; dataIndex++) {
								dataItem = data[dataIndex];
								dataValue = dataItem.y;
								if(XtrGraficoUtil.isset(dataValue)){
									dataObj.y.push(dataValue);
									if(!XtrGraficoUtil.isset(sums.y[dataIndex]))
										sums.y[dataIndex] = 0;
									sums.y[dataIndex] = sums.y[dataIndex] + dataValue;
								}
								dataValue = dataItem.x;
								if(XtrGraficoUtil.isset(dataValue)){
									dataObj.x.push(dataValue);
									if(!XtrGraficoUtil.isset(sums.x[dataIndex]))
										sums.x[dataIndex] = 0;
									sums.x[dataIndex] = sums.x[dataIndex] + dataValue;
								}
								dataValue = dataItem.size;
								if(XtrGraficoUtil.isset(dataValue)){
									dataObj.size.push(dataValue);
									if(!XtrGraficoUtil.isset(sums.size[dataIndex]))
										sums.size[dataIndex] = 0;
									sums.size[dataIndex] = sums.size[dataIndex] + dataValue;
								}
							};
							if(dataObj.y.length > 0){
								max = XtrGraficoUtil.maximum(dataObj.y);
								min = XtrGraficoUtil.minimum(dataObj.y);
								maxs.y.push(max);
								mins.y.push(min);
								indexes = dataIndex;
								serieCounter++;
							}
							if(dataObj.x.length > 0){
								max = XtrGraficoUtil.maximum(dataObj.x);
								min = XtrGraficoUtil.minimum(dataObj.x);
								maxs.x.push(max);
								mins.x.push(min);
								indexes = dataIndex;
							}
							if(dataObj.size.length > 0){
								max = XtrGraficoUtil.maximum(dataObj.size);
								min = XtrGraficoUtil.minimum(dataObj.size);
								maxs.size.push(max);
								mins.size.push(min);
								indexes = dataIndex;
							}
						};
						out.series = series.ideal.length;					
						out.seriesNonZero = serieCounter;
						out.pontos = indexes;
						out.pontosConsiderados = parseInt(indexes*1.5);
						exception = !XtrGraficoUtil.isset(indexes);
					}
					if(!chart || exception){
						Series = series.ideal;
						if(!XtrGraficoUtil.isset(Series[0])){
							Series[0] = {};
							Series[0].valores = ['',''];
						}
						dataIndex = Series[0].valores.length;
						for(serieIndex = 0; Series.length > serieIndex; serieIndex++) {
							serie = Series[serieIndex];
							data = serie.valores;

							for(dataIndex = 0; data.length > dataIndex; dataIndex++) {
								dataValue = data[dataIndex];
								if(!XtrGraficoUtil.isset(sums.y[dataIndex]))
									sums.y[dataIndex] = 0;
								sums.y[dataIndex] = sums.y[dataIndex] + dataValue;

							};

							max = XtrGraficoUtil.maximum(data);
							min = XtrGraficoUtil.minimum(data);
							maxs.y.push(max);
							mins.y.push(min);
						};
						out.series = serieIndex;
						out.seriesNonZero = serieIndex;
						out.pontos = dataIndex;
						out.pontosConsiderados=parseInt(dataIndex*1.5);	
					}
					out.max.x = maxs.x.length > 0 ? XtrGraficoUtil.maximum(maxs.x) : -Infinity;
					out.min.x = maxs.x.length > 0 ? XtrGraficoUtil.minimum(mins.x) : Infinity;

					out.max.y = maxs.y.length > 0 ? XtrGraficoUtil.maximum(maxs.y) : -Infinity;
					out.min.y = maxs.y.length > 0 ? XtrGraficoUtil.minimum(mins.y) : Infinity;

					out.max.size = maxs.size.length > 0 ? XtrGraficoUtil.maximum(maxs.size) : -Infinity;
					out.min.size = maxs.size.length > 0 ? XtrGraficoUtil.minimum(mins.size) : Infinity;

					out.sumMax.x = sums.x.length > 0 ? XtrGraficoUtil.maximum(sums.x) : null;
					out.sumMin.x = sums.x.length > 0 ? XtrGraficoUtil.minimum(sums.x) : null;

					out.sumMax.y = sums.y.length > 0 ? XtrGraficoUtil.maximum(sums.y) : null;
					out.sumMin.y = sums.y.length > 0 ? XtrGraficoUtil.minimum(sums.y) : null;

					out.sumMin.size = sums.size.length > 0 ? XtrGraficoUtil.minimum(sums.size) : null;
					out.sumMin.size = sums.size.length > 0 ? XtrGraficoUtil.minimum(sums.size) : null;

					element = document.getElementById(xtrGrafico.ID_GRAFICO);


					width = element.offsetWidth;
					height = element.offsetHeight;
					height = height <= 0 ? 400 : height;

					out.width = width;
					out.height = height;

					out.MAX = {
						x: out.max.x > out.max.size ? out.max.x : out.max.size,
						y: out.max.y > out.max.size ? out.max.y : out.max.size,
						size: XtrGraficoUtil.maximum([out.max.x,out.max.y,out.max.size])
					};
					out.MIN = {
						x: out.min.x < out.min.size ? out.min.x : out.min.size,
						y: out.min.y < out.min.size ? out.min.y : out.min.size,
						size: XtrGraficoUtil.minimum([out.min.x,out.min.y,out.min.size])
					};
					out.SUMMAX = {
						x: out.sumMax.x > out.sumMax.size ? out.sumMax.x : out.sumMax.size,
						y: out.sumMax.y > out.sumMax.size ? out.sumMax.y : out.sumMax.size,
						size: XtrGraficoUtil.maximum([out.sumMax.x,out.sumMax.y,out.sumMax.size])
					};
					out.SUMMIN = {
						x: out.sumMin.x < out.sumMin.size ? out.sumMin.x : out.sumMin.size,
						y: out.sumMin.y < out.sumMin.size ? out.sumMin.y : out.sumMin.size,
						size: XtrGraficoUtil.minimum([out.sumMin.x,out.sumMin.y,out.sumMin.size])
					};
					out.delta = {
						x:{
							sin: out.max.x - out.min.x, 
							sum: out.sumMax.x - out.sumMin.x,
							SIN: out.MAX.x - out.MIN.x,
							SUM: out.SUMMAX.x - out.SUMMIN.x
						},
						y: {
							sin: out.max.y - out.min.y,
							sum: out.sumMax.y - out.sumMin.y,
							SIN: out.MAX.y - out.MIN.y,
							SUM: out.SUMMAX.y - out.SUMMIN.y
						},
						size: {
							sin: out.max.size - out.min.size,
							sum: out.sumMax.size - out.sumMin.size,
							SIN: out.MAX.size - out.MIN.size,
							SUM: out.SUMMAX.size - out.SUMMIN.size
						}
					};

					out.cycle = digestCycle;
					out.exception = exception;
					out.byChart = XtrGraficoUtil.isset(chart);

					console.info(out);
					return out;
				}	
			//////////////////////////////
			//METODOS DE INDENTIFICAÇÃO //
			//////////////////////////////
				/**
				 * INDENTIFICAR, se algum dos tipos fornecidos em \needle são o mesmo de \SuperChart\tipo
				 *
				 * @method   areOneOfTheseMyChartType
				 *
				 * @param    {String[] | String}	needle
				 *
				 * @return   {Boolean}	
				 */
				function areOneOfTheseMyChartType(needle){
					var objectsTypes;
					var areWe;
					var myObjectType;

					myObjectType = superModule.getDojoObject(tipo,"tipos");
					objectsTypes = superModule.getDojoObjectByCategory(needle,"tipos");

					areWe = objectsTypes.indexOf(myObjectType) >=0;

					return areWe;
				}
				/**
				 * INDENTIFICAR, se o tipo fornecido em \needle é o mesmo de \SuperChart\tipo
				 *
				 * @methodisThisMyChartType
				 *
				 * @param 	{String[] | String}		needle
				 *
				 * @return 	{Boolean}
				 */
				function isThisMyChartType(needle){
					var objectsTypes;
					var myObjectType;
					var amI;

					myObjectType = superModule.getDojoObject(tipo,"tipos");
					objectsTypes = superModule.getDojoObjectByCategoryExaclty(needle,"tipos");

					amI = objectsTypes.indexOf(myObjectType) >=0;

					return amI;
				}
				/**
				 * INDENTIFICAR, se o tipo fornecido em \needle existe em \SuperModule\dojo\tipos
				 *
				 * @method thisChartTypeExists
				 *
				 * @param  {String}            needle
				 *
				 * @return {Boolean}
				 */
				function thisChartTypeExists(needle){
					var objectsTypes;
					var amI;

					objectsTypes=superModule.getDojoObjectByCategory(needle,"tipos");

					amI = objectsTypes.length > 0;

					return amI;
				}
				/**
				 * INDENTIFICAR, se o tipo fornecido em \needle é o mesmo de \SuperChart\escala
				 *
				 * @method isThisMyScaleType
				 *
				 * @param  {[type]}          needle
				 *
				 * @return {Boolean}
				 */
				function isThisMyScaleType(needle){
					var myObjectType;
					var objectsTypes;
					var amI;

					myObjectType = superModule.getDojoObject(escala,"escalas");
					objectsTypes = superModule.getDojoObjectByCategoryExaclty(needle,"escalas");
					amI = objectsTypes.indexOf(myObjectType) >=0;

					return amI;
				}
				/**
				 * INDENTIFICAR, se o tipo fornecdio em \needle existe em \SuperModule\dojo\escalas
				 *
				 * @method isThisMyScaleType
				 *
				 * @param  {String}          needle
				 *
				 * @return {Boolean}
				 */
				function thisSacleTypeExists(needle){
					var amI;

					var objectsTypes=superModule.getDojoObjectByCategory(needle,"escalas");

					amI = objectsTypes.length > 0;

					return amI;
				}
				/**
				 * INDENTIFICAR, se o tema fornecido em \needle existe em \SuperModule\dojo\temas
				 *
				 * @method thisThemeExists
				 *
				 * @param  {[type]}        needle
				 *
				 * @return {[type]}
				 */
				function thisThemeExists(needle){
					var theme;
					var amI;

					theme=superModule.getVariable(needle,'temas');

					amI = theme!=null;

					return amI;
				}	
			/////////////////////////
			//METODOS DE CONVERSAO //
			/////////////////////////
				/**
				 * OBTER, modulos e variaves para fazer o import do dojo
				 *
				 * @method toParameter
				 *
				 * @return {Object}		propriedades disponiveis:
				 */
				function toParameter(){
					var modulos;
					var variaveis;

					var modulesAndVariables,moduleAndVariable;
					var moduleAndVariableIndex;

					var parameter;

					modulos = [];
					variaveis = [];
					modulesAndVariables=superModule.getRequired();
					for (moduleAndVariableIndex = 0; modulesAndVariables.length > moduleAndVariableIndex; moduleAndVariableIndex++){
						moduleAndVariable = modulesAndVariables[moduleAndVariableIndex];						
						modulos.push(moduleAndVariable.modulo);
						variaveis.push(moduleAndVariable.variavel);
					};
					parameter = {
						modulos: modulos,
						variaveis: variaveis
					}

					return parameter;
				}
			//////////////////////
			//GETTERS E SETTERS //
			//////////////////////
				////////////////////
				//TIPO DE GRAFICO //
				////////////////////
					function getTipo(){
						var variavel;
				
						variavel = superModule.getVariable(tipo,"tipos");

				    	return variavel;
					}
					function setTipo(val){
						if(XtrGraficoUtil.isset(val) ? val!=null : false){
							tipo = ajuster(val);

							digest();		
						}
					}
				////////////////////
				//TEMA DE GRAFICO //
				////////////////////
					function getTema(){
						return tema;
					}
					function setTema(val){
						if(XtrGraficoUtil.isset(val)? val!=null && thisThemeExists(val) : false){
							tema = ajuster(val);

							digest();
						}
					}
				//////////////////////
				//ESCALA DE GRAFICO //
				//////////////////////
					function getEscala(){
						return escala;
					}
					function setEscala(val){
						if(XtrGraficoUtil.isset(val) ? val!=null && thisSacleTypeExists(val) : false){
							escala=ajuster(val);
							if(!areOneOfTheseMyChartType(['colunas','barras']))
				   				escala =  "linear";

							digest();
						}
					}
				//////////////////////
				//SERIES DE GRAFICO //
				//////////////////////
					function getSeries(){
						return series;
					}
					function setSeries(val){
						var mascara;
						var seriesAdapter;
						if(XtrGraficoUtil.isobj(val)){
							series.raw = val;

							mascara = {
								"dados": "valores",
								"dadosFormatados": "formatados",
								"mostrar": "mostrar",
								"titulo": "nome",
								"unidade": "unidade",
								"somaHorizontal": "INHERIT.somaHorizontal",
								"somaVertical": "INHERIT.somaVertical",
								"tipo": "INHERIT.tipo"
							}
							seriesAdapter = new SeriesAdapter(me,mascara);

							seriesAdapter.run();
							series = seriesAdapter.getSeries();
							rotulos = seriesAdapter.getRotulos();
							digest();
						}
					}
				///////////////////////
				//ROTULOS DE GRAFICO //
				///////////////////////
					function getRotulos(){
				    	return rotulos;
				    }
					function setRotulos(arr){
				    	if(XtrGraficoUtil.isarray(arr)){
							rotulos = arr;
							digest();
						}
				   	}
				/////////////////////
				//LINKS DE GRAFICO //
				/////////////////////
					function getLinks(){
				    	return links;
				    }
					function setLinks(arr){
				    	if(XtrGraficoUtil.isarray(arr)){
							links = arr;
							digest();
						}
				   	}
				///////////////////////
				//TITULOS DE GRAFICO //
				///////////////////////
					function getTitulos(){
						if(!XtrGraficoUtil.isset(titulos)){
							titulos.identificadores="";
							titulos.values="";
						}
				    	return titulos;
				    }
				    function setTitulos(val){
				    	if(XtrGraficoUtil.isset(val) ? XtrGraficoUtil.isset(val.identificadores) || XtrGraficoUtil.isset(val.valores) : false){

							if(XtrGraficoUtil.isset(val.identificadores))
								titulos.identificadores=val.identificadores;

							if(XtrGraficoUtil.isset(val.valores))
								titulos.valores=val.valores;

							digest();
						}
				   	}		
			/////////////////////////
			//METODOS PARA GRAFICO //
			/////////////////////////
				function setPlotName(val){
					if(XtrGraficoUtil.isset(val))
						plotName = val;
					digest();				
				}
				function getPlotName(){
					return plotName;
				}

				function getChart(){
					return chart;
				}
				function setChart(Chart){
					chart = Chart;
				}
				function setLegend(val){
					if(XtrGraficoUtil.isset(val))
						plotName = val;
					return legenda;
				}
				function getLegend(){
					return legenda;
				}
				function create(id,maintain){

					chartId = id;

					if(!maintain)
						document.getElementById(chartId).innerHTML = "";

					chart = Registry.byId(chartId);

					if(XtrGraficoUtil.isset(chart))
						chart.destroyRecursive(true);
					chart = new Chart(id);
					chart.setTheme(eval(tema));

					digest();

					return chart;
				}
				function updateOneSerie(one){
					var serie;

					serie = superParameter.getSerie(one);			
					chart.updateSeries(serie.name,serie.data,serie.args);

					digest();
				}
				function addAllSeries(array){
					var Series,serie;
					var serieIndex;

					Series = series.ideal;
					for(serieIndex = 0; Series.length > serieIndex; serieIndex++){
						serie = Series[serieIndex];
						serie = superParameter.getSerie(serie);
						if(XtrGraficoUtil.isset(array) ? array[serieIndex] : false){
							if(isThisMyChartType("pizza")){
								serie.data.y = 0;
								serie.data.tooltip = "";
							}
							else
								serie.data = [];
						}
						chart.addSeries(serie.name,serie.data,serie.args);								
					}
					digest();
				}
				function addOneSerie(one){
					var serie;

					serie = superParameter.getSerie(one);

					chart.addSeries(serie.name,serie.data,serie.args);

					digest();
				}
				function addAllAxis(){
					var axiss,axis;
					var axisIndex;

					axiss = superParameter.getAxis();
					axiss = XtrGraficoUtil.isarray(axiss) ? axiss : [axiss];

					for(axisIndex = 0; axiss.length > axisIndex; axisIndex++){
						axis = axiss[axisIndex];
						chart.addAxis(axis.name,axis.args);
					}
					digest();
				}
				function addAllPlots(){
					var plots,plot;
					var plotIndex;

					plots = superParameter.getPlot();	
					plots = XtrGraficoUtil.isarray(plots) ? plots : [plots];

					for(plotIndex = 0; plots.length > plotIndex; plotIndex++){
						plot = plots[plotIndex];
						chart.addPlot(plot.name,plot.args);
					}
					digest();
				}	
				function addExtras(dojoElement){
					var highlight,tooltip,moveslice,magnify;			

					// highlight = superParameter.getHighlight();
					// highlight = new Highlight(highlight.element,highlight.plot,highlight.args);

					tooltip = superParameter.getTooltip();
					tooltip = new Tooltip(tooltip.element,tooltip.plot);
					
					if(this.isThisMyChartType('pizza')){
						// adicionando movimento a fatia da pizza quando passado o mouse sobre a mesma
						moveslice = superParameter.getMoveSlice(1,20);
						moveslice = new MoveSlice(moveslice.element,moveslice.plot,moveslice.args);
					}
					else {					
						if(this.areOneOfTheseMyChartType(['linha','area','dispersao'])){
							magnify = superParameter.getMagnify(5);
							magnify = new Magnify(magnify.element,magnify.plot,magnify.args);
						}
						else if(this.isThisMyChartType("bolhas")){
							magnify = superParameter.getMagnify(1.5);
							magnify = new Magnify(magnify.element,magnify.plot,magnify.args);
						}
					}
					digest();
				}	
				function addLegend(callback){
					legenda = Registry.byId(xtrGrafico.ID_LEGENDA);
					if(XtrGraficoUtil.isset(legenda))
						legenda.destroyRecursive(true);

					legenda = superParameter.getLegend();
					legenda = new Legenda(legenda,xtrGrafico.ID_LEGENDA);

					if(XtrGraficoUtil.iscallable(callback))
						callback();

					digest();
				}
				function addConnectToPlot(callback){
					var connect;

					connect = superParameter.getConnectToPlot();
					chart.connectToPlot(connect.plot,connect.func);

			    	digest();
				}
				function addStyle(refresh,doHighlight){
					var style = new stylish(this);

					style.legendIcons(refresh);
					style.labelText(refresh);
					style.legendContainer(refresh);
					style.legendHighligh(doHighlight);
					style.invertedLegendDirection();
				}
				function render(){
					chart.render();

					digest();
				}
	}

	function SuperGeoChart(input){

	}
	/**
	 * Classe, para manipular SuperChart\Input\series e obter SuperChart\series\ideal que sera usada
	 * na criacao do grafico.
	 *
	 * @param  {SuperChart}  superChart
	 * @param  {Object}  mascara 	para fazer o mapeamento da  SuperChart\Input\series em SuperChart\series\ideal
	 */
	function SeriesAdapter(superChart,mascara){
		///////////////////////////
		//VARIAVEIS DE INSTANCIA //
		///////////////////////////
			var rawSeries,series;
			var rotulos;
			var titulos;
			var me;
		///////////////
		//CONSTRUCAO //
		///////////////
			rawSeries = superChart.getSeries().raw;
			rotulos = superChart.getRotulos();
			titulos = superChart.getTitulos();
			escala = SuperModule().getDojoObject(superChart.getEscala(),"escalas");
			fitSeriesToIdeal(mascara);

			this.run = run;
			this.getSeries = getSeries;
			this.getRotulos = getRotulos;

			return this;
		/////////////////////
		//METODOS PROPRIOS //
		/////////////////////
			///////////////////////////////
			//METODOS PARA ADPTAR SERIES //
			///////////////////////////////
				/**
				 * OBTER series, em formato compativel com SuperChart\series\ideal
				 *
				 * @method fitSeriesToIdeal
				 *
				 * @param  {Object}  mascara
				 *
				 * @return  {void}
				 */
				function fitSeriesToIdeal(mascara){
					var serie;
					var serieIndex;

					var fittedValue;

					var fitted;

					var from,to;
					var xchg;

					var fittedSeries = [];

					fitted = false;

					for(serieIndex = 0; rawSeries.length > serieIndex && !fitted; serieIndex++){
						serie = rawSeries[serieIndex];
						serie = XtrGraficoUtil.clone(serie);
						for(from in mascara){
							to = mascara[from];
							xchg = to;
							try{
								fittedValue = eval("serie."+to);
							}
							catch(e){
								to = to.split(".");
								serie[to[0]] = {};
								fittedValue = eval("serie."+xchg);
							}
							if(XtrGraficoUtil.isset(fittedValue)){
								fitted = fitted && true;
							}
							else{
								fitted = false;
								eval("serie."+xchg+"=serie."+from);
								delete serie[from];
							}
						}				
						fittedSeries.push(serie);
					}
					series = fittedSeries;
				}
				/**
				 * GERAR, tooltips
				 *
				 * @method generateTooltips
				 *
				 * @param  {Object[]}         custom
				 *
				 * @return {void}
				 */
				function generateTooltips(custom){

					var tooltips,tooltip;

					var serie;
					var serieIndex;

					var rotulo;

					var unidade;

					var valores,valor;
					var valorIndex;

					var titulo;
					var nome;

					var isCartesian;

					var dims,dim;

					isCartesian = superChart.isThisMyChartType("cartesiano");

					dims = ['x','y','raio'];
					titulo = titulos.identificadores;
					for(serieIndex = 0; series.length > serieIndex; serieIndex++){
						serie = series[serieIndex];
						unidade = serie.unidade;
						tooltips = [];

						valores = serie.formatados;
						nome = serie.nome;

						tooltip = "";
						for(valorIndex = 0; valores.length > valorIndex; valorIndex++){
							valor = valores[valorIndex];
							rotulo = rotulos[valorIndex];
							if(isCartesian){
								dim = dims[valorIndex];
								tooltip += "<p>"+rotulo+"<sub>"+dim+"</sub>&nbsp;:&nbsp;"+valor+"<sub>"+unidade+"</sub></p>";
							}
							else{
								if(XtrGraficoUtil.isset(custom) ? XtrGraficoUtil.isset(custom.index) ? custom.index == valorIndex : false : false){
									titulo = XtrGraficoUtil.isset(custom.titulo) ? custom.titulo : titulo;
									rotulo = XtrGraficoUtil.isset(custom.rotulo) ? custom.rotulo : rotulo;
									if(XtrGraficoUtil.isset(rotulo.length) ? rotulo.length > 10 : true){
										rotulo = XtrGraficoUtil.isset(custom.escape) ? custom.escape : "Outros";
									}
									nome = XtrGraficoUtil.isset(custom.nome) ? custom.nome : nome;
									valor = XtrGraficoUtil.isset(custom.valor) ? custom.valor : valor;
								}
								tooltip = "<p>"+titulo+"&nbsp;:&nbsp;"+rotulo+"</p>"
								+"<p>"+nome+"&nbsp;:&nbsp;"+valor+"<sub>"+unidade+"</sub></p>";
								tooltips.push(tooltip);
							}
						}
						if(isCartesian)
							tooltips.push(tooltip);
						serie.tooltips = tooltips;
					}			
				}
			///////////////////////////
			//METODOS PARA CONVERSAO //
			///////////////////////////
				/**
				 * CONVERTER unica serie, para ser usada em grafico de Pizza
				 *
				 * @method fitPieDataInOnePositveSerie
				 *
				 * @return {void}
				 */
				function fitPieDataInOnePositveSerie(){
					var serie;
					var serieIndex;

					var valores,valor;
					var valorIndex;

					var goNext;
					if(series.length > 1){
						console.warn('SerieAdapter, com mais de uma serie, sera usado somente a ultima serie com seus dados não zerados e positivos');		
					}

					goNext = true;

					for(serieIndex = 0; series.length > serieIndex && goNext; serieIndex++){
						serie = series[serieIndex];
						valores = serie.valores;

						valorZeroIndexes = [];
						for(valorIndex = 0; valores.length > valorIndex; valorIndex++){
							valor = valores[valorIndex];
							if(valor <= 0){
								serie.valores.splice(valorIndex,1);
								serie.formatados.splice(valorIndex,1);
								rotulos.splice(valorIndex,1);
							}
						}
						goNext = serie.valores < 2;
					}
					if(serie.length < 1){
						console.error("SerieAdapter, todas series tem seus dados zerados e/ou negativos");
						return;
					}
					series = [serie];
				}
				/**
				 * CONVERTER, fatia de pizza referente à a fatia outros por numero de fatias, se necessario
				 *
				 * @method fitPieDataBySlices
				 *
				 * @param  {Integer}  maxSlices
				 * @param  {String}  maxSlicesName  [Opicional | "Outros"]
				 *
				 * @return  {void}
				 */
				function fitPieDataBySlices(maxSlices,maxSlicesName){
					var serieIndex;

					var valores;
					var formatados;

					var sumMin;
					var min;
					var minIndex;

					var removeds,removedPonto,removedRotulo,removedFormatado;

					var goOn;

					serie = series[0];
					valores = serie.valores;
					formatados = serie.formatados;

					goOn = rotulos.length > maxSlices;

					sumMin = 0;
					while(goOn){
						min = XtrGraficoUtil.minimum(valores);
						minIndex = valores.indexOf(min);

						removedPonto = valores.splice(minIndex,1);
						removedRotulo = rotulos.splice(minIndex,1);
						removedFormatado = formatados.splice(minIndex,1);

						removeds.push({ponto: removedPonto, rotulo:removedRotulo,formatado: removedFormatado});

						sumMin += min;

						goOn = rotulos.length >= maxSlices;
					}
					if(sumMin > 0 && false){
						valores.push(sumMin);
						formatados.push(sumMin);
						rotulos.push(maxSlicesName);
					}
					
					removeds.sort(function(a,b){
						try{
							return eval(a.rotulo) > eval(b.rotulo);
						}
						catch(e){
							return a.rotulo > b.rotulo;
						}
					});

					return removeds;
				}
				/**
				 * CONVERTER, fatia de pizza referente à a fatia outros por quantidade, se necessario
				 *
				 * @method fitPieDataByAmount
				 *
				 * @param  {Float}  minAmountPercent
				 * @param  {String | void }  maxSlicesName
				 *
				 * @return  {Object} 
				 */
				function fitPieDataByAmount(minAmountPercent,maxSlicesName){
					var serieIndex;

					var sum;
					var valores,valoresRef;
					var valorIndexRef;
					var formatados;

					var currentPercent;

					var min,max;
					var minIndex;

					var lengthCounter;

					var removeds,removedPonto,removedRotulo,removedFormatado;

					var goOn;

					serie = series[0];
					valores = serie.valores;
					valoresRef = XtrGraficoUtil.clone(valores);
					formatados = serie.formatados;

					sum = XtrGraficoUtil.somatorium(valores);
					min = XtrGraficoUtil.minimum(valores);

					currentPercent = min/sum;

					goOn = minAmountPercent > currentPercent;		

					if(!XtrGraficoUtil.isset(maxSlicesName)){
						maxSlicesName = "Com menos de "+(minAmountPercent*100)+"%"+" equivalente à "+(minAmountPercent*sum).toFixed(-1)+"<sub>("+serie.unidade+")</sub>";
					}

					sumMin = 0;
					lengthCounter = 0;
					removeds = {};
					while(goOn){
						min = XtrGraficoUtil.minimum(valores);
						max = XtrGraficoUtil.maximum(valores);

						minIndex = valores.indexOf(min);

						removedPonto = valores.splice(minIndex,1)[0];
						removedRotulo = rotulos.splice(minIndex,1)[0];
						removedFormatado = formatados.splice(minIndex,1)[0];

						valoresIndexRef = valoresRef.indexOf(min);

						removeds[valoresIndexRef] = {
							ponto: removedPonto, 
							rotulo:removedRotulo,
							formatado: removedFormatado
						};

						currentPercent = min / sum;

						sumMin += min;

						goOn = minAmountPercent > currentPercent;
						lengthCounter++;
					}

					if(lengthCounter > 0){
						valores.push(sumMin);
						formatados.push(sumMin);
						rotulos.push(maxSlicesName);
						removeds.length = lengthCounter;
					}
					return removeds;
				}
				/**
				 * CONVERTER, forcar \series\ideal ter o mesmo length de rotulos, usada antes da conversao de
				 * series em pontos
				 *
				 * @method fitDataSeriesAsLabels
				 *
				 * @return {void}
				 */
				function fitDataSeriesAsLabels(){
					var rotulo;
					var serie;
					while(rotulos.length != series.length){
						if(rotulos.length > series.length){
							rotulo = rotulos.pop();
							var serie;
							var serieIndex;
							for(serieIndex = 0; series.length > serieIndex; serieIndex++){
								serie = series[serieIndex];
								serie.valores.pop();
							};
							console.warn("SerieAdapter, rotulo",rotulo,"precisou ser removido, consequentemente"
								+"os ultimos pontos de todas as series");
						}
						else if(series.length > rotulos.length){
							serie = series.pop();
							console.warn("SerieAdapter, serie",serie.nome,"precisou ser removido");
						}
					}
				}
				/**
				 * CONVERTER, forçar \series\ideal\valores serem subsitituidos por rotulos, 
				 * e rotulos subsitituidos por somatorio dos pontos. Series e Rotulos devem
				 * possuir mesmo length
				 *
				 * @method fitDataSeriesInPoints
				 *
				 * @return {void}
				 */
				function fitDataSeriesInPoints(){
					var serie;
					var voidSerie;

					var fittedSeries,fittedSerie;
					var fittedSerieIndex;

					var fittedRotulos,fittedRotulo;

					var fittedValores,fittedValor;
					var fittedValorIndex;

					var fittedFormatados,fittedFormatado;
					var fittedFormatadoIndex;

					var formatados,formatado;

					var pontos,ponto;
					var pontoIndex;

					voidSerie = XtrGraficoUtil.clone(series[0]);

					for(property in voidSerie){
						voidSerie[property] = null;
					}

					fittedSeries = [];
					fittedRotulos = [];
					pontos = [];
					formatados = [];


					for(rotuloIndex = 0; rotulos.length > rotuloIndex; rotuloIndex++){
						rotulo = rotulos[rotuloIndex];
						voidSerie = XtrGraficoUtil.clone(voidSerie);
						voidSerie.nome = rotulo;
						voidSerie.tooltips = [];
						voidSerie.valores = [];
						fittedSeries.push(voidSerie);
					};
					for(serieIndex = 0; series.length > serieIndex; serieIndex++){
						serie = series[serieIndex];
						fittedRotulos.push(serie.nome);

						fittedValores = serie.valores;
						fittedFormatados = serie.formatados;
						for(fittedValorIndex = 0; fittedValores.length > fittedValorIndex; fittedValorIndex++){
							fittedValor = fittedValores[fittedValorIndex];
							fittedFormatado = fittedFormatados[fittedValorIndex];

							if(!XtrGraficoUtil.isset(pontos[fittedValorIndex])){
								pontos[fittedValorIndex] = [];
								formatados[fittedValorIndex] = [];
							}
							formatados[fittedValorIndex].push(fittedFormatado)
							pontos[fittedValorIndex].push(fittedValor);
						};
					};

					for(pontoIndex = 0; pontos.length > pontoIndex; pontoIndex++){
						ponto = pontos[pontoIndex];
						formatado = formatados[pontoIndex];
						fittedSerie = fittedSeries[pontoIndex];
						fittedSerie.valores = ponto;
						fittedSerie.formatados = formatado;
					};
					series = fittedSeries;
					rotulos = fittedRotulos;
				}
				/**
				 * CONVERTER, forcar a ordencao por rotulos, e ordenando rotulos de forma equivalente
				 *
				 * @method reverseData
				 *
				 * @param  {Boolean}   isAsc
				 *
				 * @return {void}
				 */
				function reverseData(isAsc){

					var serie;
					var serieIndex;

					isAsc = (rotulos[0] < rotulos[rotulos.length-1]) ^ isAsc;

		    		if(isAsc == isAsc)
		    			return;	

		    		rotulos.reverse();

		    		for (serieIndex = 0; series.length > serieIndex; serieIndex++) {
		    			serie = series[serieIndex];
		    			serie.valores.reverse();
		    		};
				}
				/**
				 * CONVERTER, forcar \series\ideal ter no maximo em \n pontos, adicionando pontos com
				 * valores de indice e\ou raio, sendo raio ligado diretamente à \percent
				 *
				 * @method convertIn
				 *
				 * @param  {Integer}  n        
				 * @param  {Float}  percent 
				 *
				 * @return  {void} 
				 */
				function convertIn(n,percent){
					var serie;
					var serieIndex;

					var valores;

					var raios,indices;

					var mins,min;

					percent = XtrGraficoUtil.isset(percent) ? percent : 1;

					var voidSerie;
					var properties;

					voidSerie = XtrGraficoUtil.clone(series[0]);

					for(properties in voidSerie){
						voidSerie[properties] = null;
					}

					raios = XtrGraficoUtil.clone(voidSerie);
					indices = XtrGraficoUtil.clone(voidSerie);
					raios.nome = "Raio";
					indices.nome = "Indice";

					mins = [];

					for(serieIndex = 0; series.length > serieIndex; serieIndex++){
						serie = series[serieIndex];
						valores = serie.valores;
						min = XtrGraficoUtil.minimum(valores);
						mins.push(min);
					};
					while(series.length > n){
						series.pop();
					};
					while(rotulos.length >= raios.length){
						raios.valores.push(percent);
						indices.valores.push(indices.length);
					};
					if(series.length < n){
						if(n >= 2){
							series.push(raios);
						}
						if(n >= 3){
							series.push(indices);
						}
					}
				}
				/**
				 * ORDENAR, ordena \series\valores de forma crescente ou decrescente, consequetemente 
				 * tambem ordena \series\formatados e \rotulos
				 *
				 * @method  organizeData
				 *
				 * @param   {Boolean}     isAsc
				 *
				 * @return  {void}
				 */
				function organizeData(isAsc){
					var serie;
					var serieIndex;
					var valores;
					var formatados;

					var tfs,tfsClone;

					for(serieIndex = 0; series.length > serieIndex; serieIndex++){
						serie = series[serieIndex];
						valores = serie.valores;
						formatados = serie.formatados;

						tfs = [];

						valores.sort(function(a,b){
							var higher;
							var higherItem;
							var higherIndex;

							higher = XtrGraficoUtil.isset(isAsc) ? a > b : a < b;

							tfs.push(higher);

							return higher;
						});

						tfsClone = XtrGraficoUtil.clone(tfs);
						rotulos.sort(function(){
							return tfsClone.shift();
						});

						tfsClone = XtrGraficoUtil.clone(tfs);
						formatados.sort(function(){
							return tfsClone.shift();
						});
					}
				}

				function cleansSerieName(){
					var common;

					var serie;
					var serieIndex;

					common = ['Qtd de','Qtd'];

					for(serieIndex = 0; series.length > serieIndex; serieIndex++){
						serie = series[serieIndex];
						serie.nome = XtrGraficoUtil.splitter(common,serie.nome,1).trim();					
					}
				}
				/**
				 * CONVERTER, forcar a 
				 *
				 * @method roundData
				 *
				 * @param  {[type]}  decimalCase
				 *
				 * @return {[type]}
				 */
				function roundData(decimalCase){
					var serie;
					var serieIndex;

					var valores,valor;
					var valorIndex;

					var rounder;

					rounder = Math.pow(10,decimalCase);

					for(serieIndex = 0; series.length > serieIndex; serieIndex++){
						serie = series[serieIndex];
						valores = serie.valores;
						for(valorIndex = 0; valores.length > valorIndex; valorIndex++){
							valor = valores[valorIndex];
							valores[valorIndex] = Math.round(valor*rounder)/rounder;
						};
					};
				}
		//////////////////////
		//METODOS DE CLASSE //
		//////////////////////
			/**
			 * RODAR, todos os metodos necessarios para converter as series
			 *
			 * @method run
			 *
			 * @return {Self}
			 */
			function run(){
				var customs,custom;
				var customIndex;
				var customTooltip;

				roundData(3);

				reverseData(true);
				if(superChart.isThisMyChartType("pizza")){
					fitPieDataInOnePositveSerie();
					customs = fitPieDataByAmount(0.008);
					organizeData();
				}
				if(superChart.isThisMyChartType("radar")){
					fitDataSeriesAsLabels();
					fitDataSeriesInPoints();
				}
				if(superChart.isThisMyChartType("bolha")){					
					convertIn(3,1.22);					
					fitDataSeriesInPoints();
				}
				if(superChart.isThisMyChartType("dispersao")){
					convertIn(2);
					fitDataSeriesInPoints();
				}			
				if(superChart.isThisMyChartType("tree")){
					fitDataSeriesInPoints();
				}

				cleansSerieName();
				generateTooltips(superChart.isThisMyChartType("cartesiano"),customTooltip);

				series = escala.fn(series);	

				return this;
			}
			/**
			 * OBTER, series que foram convertidas nessa Classe
			 *
			 * @return  {Object}  series\raw e series\ideal
			 */
			function getSeries(){		
				return {
					raw: rawSeries,
					ideal: series
				};
			}
			/**
			 * OBTER, rotulos que foram consequentemente convertidos nessa Classe
			 *
			 * @return  {String[]} routlos
			 */
			function getRotulos(){
				return rotulos;
			}
	}