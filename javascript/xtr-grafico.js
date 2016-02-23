	//AUX
		function script(){
			var containerLegenda;

			var series,serie;
			var newSerie;
			var serieIndex;

			var valores,valor;
			var valorIndex;

			var currentCheckbox;
			var currentChecked;

			var checkeds,uncheckeds;
			var checkboxIndex;

			var inputs,input;
			var inputIndex;

			var indexes,index;
			var id;

			var textLabels;

			var pie;

			var localChart;

			var isMesclado;

			containerLegenda = document.getElementById(xtrGrafico.ID_LEGENDA).firstChild;
			
			inputs = containerLegenda.querySelectorAll(".xtrCheckboxElement input");
			textLabels = containerLegenda.querySelectorAll(".dojoxLegendText"); 

			indexes = {};

			for (inputIndex = 0; inputs.length > inputIndex; inputIndex++) {

				input = inputs[inputIndex];
				id = input.id;
				indexes[id] = inputIndex;

				document.getElementById(id).addEventListener("change",function(event){

					currentCheckbox = event.target;
					currentChecked = currentCheckbox.checked;
					checkeds = containerLegenda.querySelectorAll("input:checked");
					uncheckeds = containerLegenda.querySelectorAll("input:not(:checked)");

					isMesclado = compositeDataHandler.load().length > 1;

					localChart = new SuperChart(compositeDataHandler.current());
					series = localChart.getSeries().ideal;

					pie = localChart.isThisMyChartType('pizza') ? 1 : 0;

					if(xtrGrafico.MIN_CHECKED + pie > checkeds.length && !currentChecked || isMesclado){

						currentCheckbox.checked = true;

					}
					else{									
						localChart.create(xtrGrafico.ID_GRAFICO);

						if(pie==1){

							serie = series[0];
		              		newSerie = XtrGraficoUtil.clone(serie);

		              		for(checkboxIndex = 0; uncheckeds.length > checkboxIndex; checkboxIndex++){
		              			checkbox = uncheckeds[checkboxIndex];
		              			id = checkbox.id;
		              			checked = checkbox.checked;
		              			index = indexes[id];		              			
								newSerie.valores.splice(index,1,0);						              			  			
								newSerie.tooltips.splice(index,1,"");

				            }				              	

				        		
				            localChart.addOneSerie(newSerie);

				        }
				        else if(localChart.isThisMyChartType("radar")){

				        	for(checkboxIndex = 0; checkeds.length > checkboxIndex; checkboxIndex++){

				        		checkbox = checkeds[checkboxIndex];
		              			id = checkbox.id;
		              			index = indexes[id];
				        		
				        		serie = series[index];

			               		localChart.addOneSerie(serie);

			               	}
			            }
			            else{
			            	for(checkboxIndex = 0; inputs.length > checkboxIndex; checkboxIndex++){
				        		
				        		checkbox = inputs[checkboxIndex];
				        		checked = checkbox.checked;
		              			id = checkbox.id;
		              			index = indexes[id];
				        		
				        		serie = series[index];
				        		newSerie = XtrGraficoUtil.clone(serie);

				        		if(!checked)
				        			newSerie.valores = [];

				        		localChart.addOneSerie(newSerie);
			               	}	           		
		              	}
						localChart.addAllPlots();
						localChart.addAllAxis();
						localChart.addExtras();
						localChart.render();
						localChart.addConnectToPlot();

						localChart.addStyle(true,false);
						
					}
				});
			}
		}

	function changeChart(compositeData){
		var localChart;

		var container;
		var containerLegenda;
		var checkboxNodes,checkboxNode;
		var checkboxNode;

		var checkboxes;
		var checked;

		container = document.getElementById(xtrGrafico.ID_LEGENDA);

		containerLegenda = container.firstChild;
		checkboxNodes = containerLegenda.querySelectorAll("input");

		checkboxJusta = document.getElementById("xtrCheckbox_escalonador");
		checkboxes = [];

		for(checkboxNodeIndex = 0; checkboxNodes.length > checkboxNodeIndex; checkboxNodeIndex++){
			checkboxNode = checkboxNodes[checkboxNodeIndex];
			checked = checkboxNode.checked;
			checkboxes.push(!checked);
		};

		localChart = new SuperChart(compositeData,"plot0");

		if(checkboxJusta.checked)
			localChart.setEscala("justa");

		localChart.create(xtrGrafico.ID_GRAFICO);
		localChart.addAllSeries(checkboxes);
		localChart.addAllPlots();
		localChart.addAllAxis();
		localChart.addExtras();
		localChart.render();
		localChart.addConnectToPlot();

		localChart.addStyle(true,false);
	}

	var xtrGrafico = {
		ID_GRAFICO: "_xtr_grafico",
		ID_LEGENDA: "_xtr_grafico_legenda",
		MIN_CHECKED: 1,
		ALERT: true,
		alert:function (msg){
			if(this.ALERT){
				alert(msg);
			}
		},
		organize:{
			order: "asc",
			first: 4
		},
		Default:{
			tema: "distinctive",
			tipo: "lines",
			titulos:{
				valores: "Amostras",
				identificadores: "Series"
			},
			escala: "linear",
			hover:{
				//fill: "rgba(150,50,150,.5)",
				fill: "rgba(20,20,20,.7)",
				stroke: "rgba(65,65,65,.9)"
			},
			font: ""
		}
	}
	function heritage(id){
		var x = document.createElement("style");
		x.id = "heritage_style";
		x.innerHTML = "#"+id+" *:not(i){"
			+"font-family:'"+xtrGrafico.Default.font+"';"
		+"}"
		+"line:first-child + text{"
			+" font-size: 16px;"
			+" font-weight: 600;"
		+"}";
		document.body.appendChild(x);

		document.addEventListener("DOMContentLoaded",function(){
			try{
				document.body.querySelector("line:first-child").x = "250";
			}
			catch(e){

			}
		});
	}

	var map;
	var legenda;
	var chart;
	var charts = [];
	var objAux;

	var beforeStart = function(){};
	var afterEnd = function(){};
	var onLegend = function(){};


	function Require(Chart,callback){
		var charts,chart;
		var chartIndex;

		var parametros;
		var modulos,modulo;
		var variaveis,variavel

		modulos = [];
		variaveis = [];

		charts = XtrGraficoUtil.isarray(Chart) ? Chart : [Chart];
		for (chartIndex = 0; chartIndex < charts.length; chartIndex++) {
			chart = charts[chartIndex];

			parametros = chart.toParameter(true);

			modulo = parametros.modulos;
			modulos = modulos.concat(modulo);

			variavel = parametros.variaveis;
			variaveis = variaveis.concat(variavel);
		};
		require(modulos,setOnGlobal);

		function setOnGlobal(/*instances*/){

			var instances,instance;
			var instanceIndex;

			instances = setOnGlobal.arguments;
			for(instanceIndex in instances){
				instance = instances[instanceIndex];
				variavel = variaveis[instanceIndex];
				window[variavel] = instance;
			}
			Ready(function(){
				if(XtrGraficoUtil.iscallable(callback))
					callback();
				else
					console.error("Require(callbak) deve receber function como parametro");
			});
		}
	}	
	function runner(localChart){
		var chart;

		var localChartItem;
		var localChartIndex;

		var parameter;

		var parameters;

		var series,serie;
		var seriesAdded;
		var serieIndex;

		var plot;
		var plotIndex;

		var axis;
		var axisIndex;

		parameters = {
			plots: [],
			axis: [],
			series: []
		}

		seriesAdded = [];

		if(XtrGraficoUtil.isarray(localChart)){
			beforeStart(objAux);
			var first;
			var repText,repCount;
			var lineTypeCount;
			chart = localChart[0].create(xtrGrafico.ID_GRAFICO);
			first =  localChart[0];
			lineTypeCount = 0;
			for(localChartIndex = 0; localChart.length > localChartIndex; localChartIndex++){
				localChartItem = localChart[localChartIndex];

				chart.setTheme(eval(localChartItem.getTema()));

				parameter = new SuperParameter(localChartItem);

				series = localChartItem.getSeries().ideal;
				for(serieIndex = 0; series.length > serieIndex; serieIndex++){
					serie = series[serieIndex];
					serie = parameter.getSerie(serie,first.isThisMyChartType("barras"));
					parameters.series.push(serie);
				}
				plot = parameter.getPlot();

				parameters.plots.push(plot);
				axis = parameter.getAxis();

				if(!localChartItem.isThisMyChartType("linhas")){
					lineTypeCount ++;
					parameters.axis = axis;
				}
			};
			console.clear(parameters);

			for(plotIndex = 0; parameters.plots.length > plotIndex; plotIndex++){
				plot = parameters.plots[plotIndex];
				chart.addPlot(plot.name,plot.args);
			}
			parameters.axis.reverse();
			for(axisIndex = 0; parameters.axis.length > axisIndex; axisIndex++){
				axis = parameters.axis[axisIndex];
				chart.addAxis(axis.name,axis.args);
			}
			repText = "";
			repCount = 1;
			for(serieIndex = 0; parameters.series.length > serieIndex; serieIndex++){
				serie = parameters.series[serieIndex];
				repText = "";
				if(seriesAdded.indexOf(serie.name) >= 0){
					console.warn("Mesclar Grafico, series repetidas");
					repCount++;
					repText = "("+repCount+")";
				}

				chart.addSeries(serie.name+repText,serie.data,serie.args);

				seriesAdded.push(serie.name);
			}
			chart.render();
			if(!first.isThisMyChartType("linhas"))
				chart.movePlotToFront("plot1");
			localChartItem.setChart(chart);
			localChartItem.addExtras();
			localChartItem.addConnectToPlot();
			localChartItem.render();

			afterEnd(objAux);
			
			localChartItem.addLegend(function(){onLegend(objAux)});

			//localChartItem.addStyle(false,false);
			script();
		}
		else{

			localChart.create(xtrGrafico.ID_GRAFICO);

			localChart.addTitle();
			
			localChart.addAllSeries();
			
			localChart.addAllPlots();
			
			localChart.addAllAxis();
			localChart.addExtras();
			localChart.addConnectToPlot();
			localChart.render();

			afterEnd(objAux);

			localChart.addLegend(function(){onLegend(objAux)});

			localChart.addStyle(false);
			script();
		}
	}

	function generate(compositeData,objParam){
		objAux = {
			grafico:xtrGrafico.ID_GRAFICO,
			legenda:xtrGrafico.ID_LEGENDA
		}

		if(XtrGraficoUtil.isobj(objParam)){
			if(XtrGraficoUtil.isset(objParam.sliceMax)){
				localChart.setPieMaxSlices(objParam.sliceMax);
			}
			if(XtrGraficoUtil.isset(objParam.sliceName)){
				localChart.setPieMaxSlicesName(objParam.sliceName);						
			}
			if(XtrGraficoUtil.isset(objParam.beforeStart)){
				beforeStart = objParam.beforeStart;
			}
			if(XtrGraficoUtil.isset(objParam.afterEnd)){
				afterEnd = objParam.afterEnd;
			}
			if(XtrGraficoUtil.isset(objParam.onLegend)){
				onLegend = objParam.onLegend;
			}
		}
		try{
			if(compositeData==null){
				beforeStart(objAux);
				afterEnd(objAux);
				return false;
			}
			var localChart = new SuperChart(compositeData,"plot0");
			if(!localChart.isThisMyChartType('map')){
				beforeStart(objAux);
				Require(localChart,function(){
					runner(localChart)
				});
			}
			else{ 
				//http://livedocs.dojotoolkit.org/dojox/treemap
				document.getElementById(xtrGrafico.ID_LEGENDA).innerHTML="";
				var series = localChart.getSeries().ideal;
				var rotulos = localChart.getRotulos();
				var attrs = {
					area: rotulos[0],
					color: rotulos[1],
					group: rotulos[2]				
				}
				function doHead(){
					var paramter;

					var element;

					var treemap;
					var memory;
					var color,colorTop,colorBottom;

					paramter = new SuperParameter(localChart);

					element = dom.byId(xtrGrafico.ID_GRAFICO);

					memory = paramter.getMemory(series)
					memory = new Memory(memory);

					colorTop = new Color(Color.named.red)
					colorBottom = new Color(Color.named.green)
					color = new MeanColorModel(colorTop,colorBottom); 

					treemap = paramter.getTreeMapAsParameter("dataStore","colorModel",attrs);
					treemap = new TreeMap(treemap.args,element); 
				}
			   	
				Require(localChart,doHead);
			}
		}
		catch(err){
			console.error(err);
		}
	}

	function mergeChartData(chartsData){
		var chartsData,chartData;
		var localCharts,localChart;
		var chartDataIndex;

		var paramters,paramter;

		localCharts = [];
		paramters = {
			plot: {},
			axis: {},
			series: {},
			extras: {},
			legenda: {}
		};
		
		for (chartDataIndex = 0; chartsData.length > chartDataIndex; chartDataIndex++){
			chartData = chartsData[chartDataIndex];
			localChart = new SuperChart(chartData,"plot"+chartDataIndex);
			localCharts.push(localChart);			
		};
		Require(localCharts,function(){
			runner(localCharts);
		});

	}