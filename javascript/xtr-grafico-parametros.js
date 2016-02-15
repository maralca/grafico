	/**
	 * Classe, para obter dados referentes a criação do(s) grafico(s)
	 * 	
	 * @method  SuperParameter
	 *
	 * @param   {SuperChart}        localChart  
	 */
	function SuperParameter(localChart){
		var dojoElement = undefined;
		var eachElement;

		if(XtrGraficoUtil.isset(localChart) ? localChart.constructor.name == 'SuperChart' : false){
			if(XtrGraficoUtil.isset(localChart.getPlotName) && XtrGraficoUtil.isset(localChart.getDimensionObject)){
				var plotName = localChart.getPlotName();
				eachElement = localChart.getDimensionObject();
			}
		}
		plotName = XtrGraficoUtil.isset(plotName) ? plotName : "default";

		function rotulosToLabels(rotulos) {

			var rotulo;
			var rotuloIndex;

			var finalLabels;

			finalLabels = [];
			
			for(rotuloIndex = 0; rotulos.length > rotuloIndex; rotuloIndex++){
				finalLabels.push({
					value: rotuloIndex + 1,
					text: rotulos[rotuloIndex]
				});
			}
			return finalLabels;
		}
		this.setElement=function(element){
			dojoElement = element;
		}
		this.setPlotName=function(name){
			plotName = name;
		}
		this.getCreate=function(){
			return {
				title: "Production(Quantity)",
				titlePos: "bottom",
				titleGap: 25,
				titleFont: "normal 15pt "+xtrGrafico.Default.font
			}
		}
		this.getPlot=function(){

			var plot;
			var tipo,series;

			var finalPlot;

			plot = {};
			
			series = localChart.getSeries();

			tipo = localChart.getTipo();

			if(localChart.isThisMyChartType('pizza')){
				plot = {
					radius: 400,
					labels: true,
					labelOffset: -20
				}
			}
			else if(localChart.isThisMyChartType('radar')){

				plot = {
					precision: 	1,
					labelOffset: -10,
					//axisColor: "",
					axisWidth: 0,
					//axisFont: "normal 11pt Arial",
					//spiderColor: "",
					spiderWidth: 0,
					seriesWidth: 0,
					seriesFillAlpha: 0.2,
					spiderOrigin: 0.001,
					markerSize: 4,
					divisions: eachElement.series,
					precision: 0,
					spiderType: "polygon"
				}
			}
			else{		
				if(localChart.areOneOfTheseMyChartType(['barra','coluna'])){
					plot.enableCache = true;
					plot.gap = 5; 
					//LEMBRETE = GAP >>>>> maxBarSize || minBarSize
					//LEMBRETE = minBarSize && maxBarSize, deve ser descartado, focar no gap
					if(localChart.areOneOfTheseMyChartType(['agrupadas','empilhadas'])){
		                if(localChart.isThisMyChartType('coluna')){       
		                    plot.minBarSize = eachElement.width/(eachElement.series*eachElement.pontosConsiderados);
		                    plot.maxBarSize = eachElement.width/6;                           			
							
		                }
		                else if(localChart.isThisMyChartType('barra')){                                  
		                    plot.minBarSize = eachElement.height/(eachElement.series*eachElement.pontosConsiderados);
		                    plot.maxBarSize = eachElement.width/6;
		                }
		            }
		            else{
		                if(localChart.isThisMyChartType('coluna')){
		                    plot.minBarSize = eachElement.width/eachElement.pontosConsiderados;
		                    plot.maxBarSize = eachElement.width/6;
		                
		                }
		                else if(localChart.isThisMyChartType('barra')){	               
		                    plot.minBarSize = eachElement.height/eachElement.pontosConsiderados;
		                    plot.maxBarSize = eachElement.height/6;
		                }
		            }
				}
				else if(localChart.isThisMyChartType('area')){
					plot = {
						areas: true,
						markers: true,
						tension: 50
					}
				}
				else if(localChart.isThisMyChartType('linha')){
					plot = {
						lines: true,
						markers: true,
						tension: 50
					}
				}
				plot.vAxis = "vertical";
				plot.hAxis = "horizontal";				
				plot.markerSize = 10;
			}
			//plot.animate = { duration: 1500, easing: easing.linear};
			plot.type = eval(tipo);
			plot.typeName = tipo

			finalPlot = {
				name: XtrGraficoUtil.isset(plotName) ? plotName : 'default',
				args: plot
			};
			return finalPlot;
		}		
		this.getAxis=function(){

			function base10pow(base){
				var base10;

				base10 = Math.log(base) / Math.log(10);
				base10 = Math.ceil(base10);

				return Math.pow(10,base10)
			}
			
			var axis;
			var axisX,axisY;
			var axisLabel,axisValue;

			var tipo,rotulos,titulos,series;
			var labels,labelsValue;

			axisLabel = {};
			axisValue = {};

			axisX = {};
			axisY = {};

			axis = [];

			tipo = localChart.getTipo();
			rotulos = localChart.getRotulos();
			titulos = localChart.getTitulos();
			series = localChart.getSeries();
			
			labels = rotulosToLabels(rotulos);
				
			if(localChart.areOneOfTheseMyChartType(['pizza','radar'])){
				return axis;
			}				
			axisX = {
				vertical: false,
				font: xtrGrafico.Default.font,
				titleOrientation: "away",
				titleFont: "bold 12pt "+xtrGrafico.Default.font,
				titleGap: 12,
				maxLabelSize: 60,
				enableCache: true
			}
			axisY = {
				vertical: true,
				font: xtrGrafico.Default.font,
				titleOrientation: "axis",
				titleFont: "bold 12pt "+xtrGrafico.Default.font,
				titleGap: 24,
				maxLabelSize: 60,
				enableCache: true
			}
			axisLabel = {
				includeZero: false,

				majorLabels: true,
				minorLabels: false,
				microLabels: false,
				dropLabels: true,

				majorTickStep: 1,
				minorTickStep: 0.5,
				microTickStep: 0.25,

				majorTick: {
					length: 12
				},					
				minorTick: {
					length: 0
				},
				microTick: {
					length: 0
				},

				labels: labels,
				title: titulos.identificadores
			}
			axisValue = {
				includeZero: true,

				majorLabels: true,
				minorLabels: true,
				microLabels: false,
				dropLabels: true,

				//majorTickStep:,
				//minorTickStep:,
				//microTickStep:,

				majorTick: {
					length: 20,
					color: "rgba(222,222,222,0.5)"
				},
				minorTick: {
					length: 8,
					color: "rgba(111,111,111,0.5)"
				},
				microTick: {
					length: 3,
					color: "rgba(222,222,222,0.5)"
				},

				title: titulos.valores
			}
				
			if(localChart.isThisMyScaleType('log')){
				axisValue.labelFunc = function(x,y,z){
					if(y <= -1){
						return XtrUtil.convertKMB(y);
					}
					else if(y >= 1){
						return XtrUtil.convertKMB(y);
					}
					return y;
				}
				axisValue.majorTickStep = 1;	
				axisValue.minorTickStep = axisValue.majorTickStep / 5;

				console.info("Escala Logaritimica");
			}
			else if(localChart.isThisMyScaleType('justa')){
				axisValue.labelFunc = function(x,y,z){
					return Math.round(y*100) + "%";
				}	
				axisValue.majorTickStep = 0.25;
				axisValue.minorTickStep = axisValue.majorTickStep / 5;

				console.log("Escala Justaposição");
			}
			else{
				axisValue.labelFunc =  function(x,y,z){
					var value10;
					var base10;
					var UN;
					return x;
//					return XtrGraficoUtil.convertKMB(y);		

				}
				if(localChart.isThisMyChartType("cartesiano")){
					axisX.from = eachElement.MIN.x * 0.8;
					axisX.to = eachElement.MAX.x * 1.2;

					axisX.majorTickStep = base10pow(eachElement.delta.x.SIN/10);
					axisX.minorTickStep = axisX.majorTickStep / 10 ;

					axisY.from = eachElement.MIN.y * 0.8;
					axisY.to = eachElement.MAX.y * 1.2;

					axisY.majorTickStep = base10pow(eachElement.delta.y.SIN/10);
					axisY.minorTickStep = axisY.majorTickStep / 10;
				}
				else if(localChart.areOneOfTheseMyChartType(["linha","area"])){
					if(localChart.isThisMyChartType("empilhada")){
						axisValue.from = eachElement.first.min.y * 0.8;
						axisValue.to = eachElement.sumMax.y * 1.2;

						axisValue.min = eachElement.first.min.y;
						axisValue.max = eachElement.sumMax.y;
					}
					else{
						axisValue.from = eachElement.min.y * 0.8;
						axisValue.to = eachElement.max.y * 1.2;

						axisValue.min = eachElement.min.y;
						axisValue.max = eachElement.max.y;
					}
					axisLabel.from =  1 - 1/eachElement.pontos;
					axisLabel.to = eachElement.pontos + 1/eachElement.pontos;
				}			

				axisValue.majorTickStep = base10pow(eachElement.delta.y.sin/10);
				axisValue.minorTickStep = axisValue.majorTickStep / 10;
				
				console.info("Escala Linear");
			}
			if(localChart.areOneOfTheseMyChartType(['linha','cartesiano'])){
				axisValue.includeZero = false;
				axisLabel.includeZero = false;
			}
			if(localChart.areOneOfTheseMyChartType(['coluna','linha','area'])){
				axisX=XtrGraficoUtil.concat(axisX,axisLabel);
				axisY=XtrGraficoUtil.concat(axisY,axisValue);
			}
			else if(localChart.isThisMyChartType('barra')){
				axisX=XtrGraficoUtil.concat(axisX,axisValue);
				axisY=XtrGraficoUtil.concat(axisY,axisLabel);

				//axisY.rotation = -90;
			}
			else if(localChart.isThisMyChartType('cartesiano')){	
				titleGap = axisY.titleGap;

				axisX=XtrGraficoUtil.concat(axisX,axisValue);
				axisY=XtrGraficoUtil.concat(axisY,axisValue);

				axisX.title = rotulos[0];
				axisY.title = rotulos[1];
			}
			axis.push({
				name: "horizontal",
				args: axisX
			});
			axis.push({
				name: "vertical",
				args: axisY
			});
			return axis;
		}		
		this.getLegend=function(horizontal){
			var Horizontal;

			var legend;

			Horizontal = XtrGraficoUtil.isset(horizontal) ? horizontal : false;

			legend = {
				chart: XtrGraficoUtil.isset(dojoElement) ? dojoElement : localChart.getChart(),
				horizontal: Horizontal,
				style:{
					"font": "11pt "+xtrGrafico.Default.font,
					"letter-spacing": "1px"
				}
			}

			return legend;
		}
		this.getSerie=function(idealSerie,useX){

			var valores,valor;
			var valorIndex;
			var tooltips,tooltip;
			var tooltipIndex;
			var nome;

			var rotulos,rotulo;

			var auxSeries;
			var finalSeries;

			valores = idealSerie.valores;
			tooltips = idealSerie.tooltips;
			nome = idealSerie.nome;

			rotulos = localChart.getRotulos();

			if(localChart.isThisMyChartType("mapa")){
				for (valorIndex = 0; valores.length > valorIndex; valorIndex++) {
					valor = valores[valorIndex];
					rotulo = rotulos[valorIndex];
					auxSeries[rotulo] = valor;
				};
				finalSeries = {
					nome: nome,
					data: auxSeries,
					args:{
						plot: plotName
					}
				}
				return finalSeries;		
			}
			if(localChart.isThisMyChartType("bolhas")){				
				finalSeries = {
					name: nome,
					data:[{
						x: valores[0],
						y: valores[1],
						size: valores[2],
						tooltip: tooltips[0]
					}],
					args:{
						plot: plotName
					}
				}
				return finalSeries;
			}
			if(localChart.isThisMyChartType("dispersao")){
				finalSeries = {
					name: nome,
					data:[{
						x: valores[0],
						y: valores[1],
						tooltip: tooltips[0]
					}],
					args:{
						plot: plotName
					}
				}
				return finalSeries;
			}
			if(localChart.isThisMyChartType("radar")){
				auxSeries = {};
				for (valorIndex = 0; valores.length > valorIndex; valorIndex++) {
					valor = valores[valorIndex];
					rotulo = rotulos[valorIndex];
					auxSeries[rotulo] = valor;
				};
				finalSeries = {
					name: nome,
					data: {
						data: auxSeries
					},
					args:{
						plot: plotName
					}
				}
				//cada ponto um eixo
				return finalSeries;
			}
			auxSeries = [];
			for (valorIndex = 0; valores.length > valorIndex; valorIndex++){
			 	valor = valores[valorIndex];
			 	tooltip = tooltips[valorIndex];
			 	if(XtrGraficoUtil.isset(useX) ? useX : false){
			 		auxSeries.push({
				 		x: valor,
				 		tooltip: tooltip
			 		});
			 	}
			 	else{
			 		auxSeries.push({
				 		y: valor,
				 		tooltip: tooltip
			 		});
			 	}
			}; 
			finalSeries = {
				name: nome,
				data: auxSeries,
				args: {
					plot: plotName
				}
			}

			return finalSeries;
		}
		this.getHighlight=function(){
			var highlight;

			highlight = {
				element: XtrGraficoUtil.isset(dojoElement) ? dojoElement : localChart.getChart(),
				plot: plotName,
				args: {}
			}

			return highlight;
		}
		this.getTooltip=function(){
			var tooltip;

			tooltip = {
				element: XtrGraficoUtil.isset(dojoElement) ? dojoElement : localChart.getChart(),
				plot: plotName,
				args: {}
			}

			return tooltip;
		}
		this.getMoveSlice=function(sliceScale,shiftValue){
			var SliceScale,ShiftValue;

			var moveSlice;

			SliceScale=XtrGraficoUtil.isset(sliceScale) ? sliceScale : 1;
			ShiftValue=XtrGraficoUtil.isset(shiftValue) ? shiftValue : 20;

			moveSlice = {
				element: XtrGraficoUtil.isset(dojoElement) ? dojoElement : localChart.getChart(),
				plot: plotName,
				args: {
					scale: SliceScale,
					shift: ShiftValue
				}
			}
			return moveSlice;
		}
		this.getMagnify=function(magnifyScale){
			var MagnifyScale;

			var magnify;

			MagnifyScale=XtrGraficoUtil.isset(magnifyScale) ? magnifyScale : 5;

			magnify = {
				element: XtrGraficoUtil.isset(dojoElement) ? dojoElement : localChart.getChart(),
				plot: plotName,
				args: {
					scale: MagnifyScale
				}
			}
			return magnify;
		}
		this.getConnectToPlot=function(){
			var connect;
			var links,link;
			var linkIndex;

			links = localChart.getLinks();

			connect = {
				plot: plotName,
				func:function(event){
					if(event.type == "onplotreset"){

					}
					if(event.type == "onclick"){
						linkIndex = event.index;
						link = links[linkIndex];
						location.href = link;
					}
				}
			}

			return connect;
		}
		this.getZoom=function(axisName,scale,offset){
			var Offset;

			Scale = XtrGraficoUtil.isset(scale) ? scale : 2; 
			Offset = XtrGraficoUtil.isset(offset) ? offset : 5;

			chart.setAxisWindow(axisName,Scale,Offset); 
		}
		this.getMemory=function(Series){
			var series,serie;
			var serieIndex;

			var nome;
			var valores;

			var data;

			for (serieIndex = 0; serieIndex < series.length; serieIndex++) {
				serie = series[serieIndex];
				nome = serie.nome;
				valores = serie.valores;
				
				data.push(this.getSerieAsParameter(serie));

			};
			return {idProperty: nome, data: data};
		}
		function getTreeMap(dataStoreVar,colorModelVar,attrs){
			var treeMap;
			attrs.group = XtrGraficoUtil.isarray(attrs.group) ? attrs.group : new Array(attrs.group);

			treeMap = {
				args:{
					store: dataStoreVar,	
					colorModel: colorModelVar,
					areaAttr: attrs.area,
					colorAttr: attrs.color,
					groupAttrs: attrs.group
				}
			}
			return treeMap;
		}
		return this;
	}