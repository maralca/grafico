	/**
	 * Classe, manipular modulos dojo, para reconhecimento de modulos, ou para obter resposta em relação ao tipo
	 * quando enviado uma instancia de \SuperChart
	 *
	 * @method  SuperModule
	 *
	 * @param   {SuperChart}     maker
	 */
	function SuperModule(maker){
		var makerTheme;
		var makerType;
		var makerSeries;
		var makerLabels;

		if(XtrGraficoUtil.isset(maker) ? maker instanceof SuperChart : false){
			if(XtrGraficoUtil.isset(maker.getTema) 
			&& XtrGraficoUtil.isset(maker.getTipo) 
			&& XtrGraficoUtil.isset(maker.getSeries) 
			&& XtrGraficoUtil.isset(maker.getRotulos)){				
				makerTheme = maker.getTema();
				makerType = maker.getTipo();
				makerSeries = maker.getSeries();
				makerLabels = maker.getRotulos();
			}
		}
		var dojo = {
			//@see SuperModule\widgets
			widgets:[
				{
					variavel: 'Memory',
					alias: 'Memory',
					variacao: [],
					modulo: 'dojo/store/Memory',
					ativo: true
				},
				{
					variavel: 'easing',
					alias: 'Easing',
					variacao: [],
					modulo: 'dojo/fx/easing',
					ativo: true
				},
				{
					variavel: 'MeanColorModel',
					alias: 'MeanColorModel',
					variacao: [],
					modulo: 'dojox/color/MeanColorModel',
					ativo: true
				},
				{
					variavel: 'Color',
					alias: 'Color',
					variacao: [],
					modulo: 'dojo/_base/Color',
					ativo: true
				},
				{
					variavel: 'dom',
					alias: 'dom',
					variacao: [],
					modulo: 'dojo/dom',
					ativo: true
				},
				{
					variavel: 'number',
					alias: 'Number',
					variacao: [],
					modulo: 'dojo/number',
					ativo: true
				},
				{
					variavel: 'Registry',
					alias: 'Registry',
					variacao: [],
					modulo: 'dijit/registry',
					ativo: true
				},
				{
					variavel:'Ready',
					alias:'Ready',
					categoria: [],
					variacao: [],
					modulo:'dojo/ready',
					ativo: true
				},
				{
					variavel:'Chart',
					alias:'Chart',
					categoria: [],
					variacao: [],
					modulo:'dojox/charting/Chart',
					ativo: true
				},
				{
					variavel:'Tooltip',
					alias:'Tooltip',
					categoria: [],
					variacao: [],
					modulo:'dojox/charting/action2d/Tooltip',
					ativo: true
				},
				{
					variavel:'Highlight',
					alias:'Highlight',
					categoria: [],
					variacao: [],
					modulo:'dojox/charting/action2d/Highlight',
					ativo: true
				},
				{
					variavel:'DefaultAxis',
					alias:'DefaultAxis',
					categoria: [],
					variacao: [],
					modulo:'dojox/charting/axis2d/Default',
					ativo: true
				},
				{
					variavel:'DefaultPlot',
					alias:'DefaultPlot',
					categoria: [],
					variacao: [],
					modulo:'dojox/charting/plot2d/Default',
					ativo: true
				},
				{
					variavel:'Legenda',
					alias:'Legend',
					categoria: [],
					variacao: [],
					modulo:'dojox/charting/widget/SelectableLegend',
					ativo: true
				},
				{
					variavel:'Legenda',
					alias:'SelectableLegend',
					categoria: [],
					variacao: [],
					modulo:'dojox/charting/widget/Legend',
					ativo: true
				},
				{
					variavel:'MoveSlice',
					alias:'MoveSlice',
					categoria: [],
					variacao: [],
					modulo:'dojox/charting/action2d/MoveSlice',
					ativo: true
				},
				{
					variavel:'Markers',
					alias:'Markers',
					categoria: [],
					variacao: [],
					modulo:'dojox/charting/plot2d/Markers',
					ativo: true
				},
				{
					variavel:'Magnify',
					alias:'Magnify',
					categoria: [],
					variacao: [],
					modulo:'dojox/charting/action2d/Magnify',
					ativo: true
				}
			],
			//@see SuperModule\temas
			temas:[
				{
					variavel:'julie',
					alias: 'Julie',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Julie',
					ativo: true
				},
				{
					variavel:'threed',
					alias: 'ThreeD',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/ThreeD',
					ativo: true
				},
				{
					variavel:'chris',
					alias: 'Chris',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Chris',
					ativo: true
				},
				{
					variavel:'tom',
					alias: 'Tom',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Tom',
					ativo: true
				},
				{
					variavel:'primarycolors',
					alias: 'PrimaryColors',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/PrimaryColors',
					ativo: true
				},
				{
					variavel:'electric',
					alias: 'Electric',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Electric',
					ativo: true
				},
				{
					variavel:'charged',
					alias: 'Charged',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Charged',
					ativo: true
				},
				{
					variavel:'renkoo',
					alias: 'Renkoo',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Renkoo',
					ativo: true
				},
				{
					variavel:'adobebricks',
					alias: 'Adobebricks',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Adobebricks',
					ativo: true
				},
				{
					variavel:'algae',
					alias: 'Algae',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Algae',
					ativo: true
				},
				{
					variavel:'bahamation',
					alias: 'Bahamation',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Bahamation',
					ativo: true
				},
				{
					variavel:'bluedusk',
					alias: 'BlueDusk',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/BlueDusk',
					ativo: true
				},
				{
					variavel:'cubanshirts',
					alias: 'CubanShirts',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/CubanShirts',
					ativo: true
				},
				{
					variavel:'desert',
					alias: 'Desert',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Desert',
					ativo: true
				},
				{
					variavel:'distinctive',
					alias: 'Distinctive',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Distinctive',
					ativo: true
				},
				{
					variavel:'dollar',
					alias: 'Dollar',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Dollar',
					ativo: true
				},
				{
					variavel:'grasshopper',
					alias: 'Grasshopper',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Grasshopper',
					ativo: true
				},
				{
					variavel:'grasslands',
					alias: 'Grasslands',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Grasslands',
					ativo: true
				},
				{
					variavel:'greyskies',
					alias: 'GreySkies',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/GreySkies',
					ativo: true
				},
				{
					variavel:'harmony',
					alias: 'Harmony',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Harmony',
					ativo: true
				},
				{
					variavel:'indigonation',
					alias: 'IndigoNation',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/IndigoNation',
					ativo: true
				},
				{
					variavel:'ireland',
					alias: 'Ireland',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Ireland',
					ativo: true
				},
				{
					variavel:'miaminice',
					alias: 'MiamiNice',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/MiamiNice',
					ativo: true
				},
				{
					variavel:'minty',
					alias: 'Minty',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Minty',
					ativo: true
				},
				{
					variavel:'purplerain',
					alias: 'PurpleRain',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/PurpleRain',
					ativo: true
				},
				{
					variavel:'royalpurples',
					alias: 'RoyalPurples',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/RoyalPurples',
					ativo: true
				},
				{
					variavel:'sagetolime',
					alias: 'SageToLime',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/SageToLime',
					ativo: true
				},
				{
					variavel:'shrooms',
					alias: 'Shrooms',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Shrooms',
					ativo: true
				},
				{
					variavel:'tufte',
					alias: 'Tufte',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Tufte',
					ativo: true
				},
				{
					variavel:'watersedge',
					alias: 'WatersEdge',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/WatersEdge',
					ativo: true
				},
				{
					variavel:'wetland',
					alias: 'Wetland',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/Wetland',
					ativo: true
				},
				{
					variavel:'plotkitblue',
					alias: 'PlotKit.blue',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/PlotKit/blue',
					ativo: true
				},
				{
					variavel:'plotkitcyan',
					alias: 'PlotKit.cyan',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/PlotKit/cyan',
					ativo: true
				},
				{
					variavel:'plotkitgreen',
					alias: 'PlotKit.green',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/PlotKit/green',
					ativo: true
				},
				{
					variavel:'plotkitorange',
					alias: 'PlotKit.orange',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/PlotKit/orange',
					ativo: true
				},
				{
					variavel:'plotkitpurple',
					alias: 'PlotKit.purple',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/PlotKit/purple',
					ativo: true
				},
				{
					variavel:'plotkitred',
					alias: 'PlotKit.red',
					categoria: [],
					variacao: [],
					modulo: 'dojox/charting/themes/PlotKit/red',
					ativo: true
				}
			],
			//@see SuperModule\tipos
			tipos:[
				{
					variavel: '',
					alias: '',
					traducao: {
						portuguesBr: "Geografica"
					},
					categoria: ['geografica','mapa','singular'],
					variacao:[
						'geo',
						'geografica',
						'geografica/brasil/mesoregioes',
						'geografica/brasil/microregioes',
						'geografica/brasil/regioes',
						'geografica/brasil_estados',
						'geografica/brasil_municipios',
						'geografica/norte',
						'geografica/nordeste',
						'geografica/centro-oeste',
						'geografica/sudeste',
						'geografica/sul',
						'geografica/ac',
						'geografica/al',
						'geografica/am',
						'geografica/ap',
						'geografica/ba',
						'geografica/ce',
						'geografica/df',
						'geografica/es',
						'geografica/go',
						'geografica/ma',
						'geografica/mg',
						'geografica/ms',
						'geografica/mt',
						'geografica/pa',
						'geografica/pb',
						'geografica/pe',
						'geografica/pi',
						'geografica/pr',
						'geografica/rj',
						'geografica/rn',
						'geografica/ro',
						'geografica/rr',
						'geografica/rs',
						'geografica/sc',
						'geografica/se',
						'geografica/sp',
						'geografica/to'
					],
					modulo: '',
					ativo: false
				},
				{
					variavel: 'none',
					alias: 'none',
					traducao: {
						portuguesBr: ""
					},
					categoria: ['none'],
					variacao:[							
						'none',
						'void',
						'null',
						null,
						undefined,
						"undefined"
					],
					modulo: '',
					ativo: false
				},
				{
					variavel: 'TreeMap',
					alias: 'TreeMap',
					traducao: {
						portuguesBr: "TreeMap"
					},
					categoria: ['tree','map','mapa','singular'],
					variacao:[							
						'mapa',
						'map',
						'tree'
					],
					modulo: 'dojox/treemap/TreeMap',
					ativo: false
				},
				{
					variavel: 'markersonly',
					alias: 'MarkersOnly',
					traducao: {
						portuguesBr: "Dispersão"
					},
					categoria: ['markers','marker','markersonly','markeronly','dispersao','simples','cartesiano','cartesian'],
					variacao:[							
						'dispersao',
						'markeronly'
					],
					modulo: 'dojox/charting/plot2d/MarkersOnly',
					ativo: true
				},
				{
					variavel: 'bubble',
					alias: 'Bubble',
					traducao: {
						portuguesBr: "Bolhas"
					},
					categoria: ['bubble','bolha','bubbles','bolhas','simples','cartesiano','cartesian'],
					variacao:[							
						'bubbles',
						'bolhas',
						'bolha'
					],
					modulo: 'dojox/charting/plot2d/Bubble',
					ativo: true
				},
				{
					variavel: 'spider',
					alias: 'Spider',
					traducao: {
						portuguesBr: "Radar"
					},
					categoria: ['spider','radar','singular'],
					variacao:[							
						'radar'
					],
					modulo: 'dojox/charting/plot2d/Spider',
					ativo: true
				},
				{
					variavel: 'pie',
					alias: 'Pie',
					traducao: {
						portuguesBr: "Pizza"
					},
					categoria: ['singular','pizza','pie'],
					variacao:[										
						'pizza'
					],
					modulo: 'dojox/charting/plot2d/Pie',
					ativo: true
		 		},
				{
					variavel: 'stackedcolumns',
					alias: 'StackedColumns',
					traducao: {
						portuguesBr: "Colunas Empilhadas"
					},
					categoria: ['empilhada','empilhadas','stacked','coluna','column','colunas','columns'],
					variacao: [
						'colunasempilhadas',
						'stackedcolumn',
						'colunaempilhada'
					],
					modulo: 'dojox/charting/plot2d/StackedColumns',
					ativo: true
				},
				{
					variavel: 'clusteredcolumns',
					alias: 'ClusteredColumns',
					traducao: {
						portuguesBr: "Colunas Agrupadas"
					},
					categoria:['agrupada','agrupadas','clustered','coluna','column','colunas','columns'],
					variacao: [
						'colunasagrupadas',
						'stackedcolumn',
						'colunaagrupada'
					],
					modulo: 'dojox/charting/plot2d/ClusteredColumns',
					ativo: true
				},
				{
					variavel: 'columns',
					alias: 'Columns',
					traducao: {
						portuguesBr: "Colunas"
					},
					categoria:['simples','simple','coluna','column','colunas','columns'],
					variacao: [
						'colunas',
						'column',
						'coluna'
					],
					modulo: 'dojox/charting/plot2d/Columns',
					ativo: true
				},
		 		{
		 			variavel: 'bars',
					alias: 'Bars',
					traducao: {
						portuguesBr: "Barras"
					},
					categoria:['simples','simple','barra','bar','barras','bars'],
					variacao: [
						'barras',
						'barra',
						'bar'
					],
		 			modulo: 'dojox/charting/plot2d/Bars',
		 			ativo: true
		 		},
				{
					variavel: 'stackedbars',
					alias: 'StackedBars',
					traducao: {
						portuguesBr: "Barras Empilhadas"
					},
					categoria:['empilhada','empilhadas','stacked','barra','bar','barras','bars'],
					variacao: [
						'barrasempilhadas',
						'barraempilhada',
						'stackedbar'
					],
					modulo: 'dojox/charting/plot2d/StackedBars',
					ativo: true
				},
				{
					variavel: 'clusteredbars',
					alias: 'ClusteredBars',
					traducao: {
						portuguesBr: "Barras Agrupadas"
					},
					categoria:['agrupada','agrupadas','clustered','barra','bar','barras','bars'],
					variacao: [
						'barrasagrupadas',
						'barraagrupada',
						'clusteredbar'
					],	
					modulo: 'dojox/charting/plot2d/ClusteredBars',
					ativo: true
				},
				{
					variavel: 'areas',
					alias: 'Areas',
					traducao: {
						portuguesBr: "Areas"
					},
					categoria:['simples','simple','areas','area'],
					variacao: [
						'areas',
						'area'
					],
					modulo: 'dojox/charting/plot2d/Areas',
					ativo: true
				},
				{
					variavel: 'stackedareas',
					alias: 'StackedAreas',
					traducao: {
						portuguesBr: "Areas Empilhadas"
					},
					categoria:['empilhada','empilhadas','stacked','areas','area'],
					variacao: [
						'areasempilhadas',
						'areaempilhada',
						'stackedarea',
						'stackedareas'
					],	
					modulo: 'dojox/charting/plot2d/StackedAreas',
					ativo: true
				},
				{
					variavel: 'lines',
					alias: 'Lines',
					traducao: {
						portuguesBr: "Linhas"
					},
					categoria:['simples','simple','linha','line','linhas','lines'],
					variacao: [
						'linhas',
						'line',
						'linha'
					],
					modulo: 'dojox/charting/plot2d/Lines',
					ativo: true
				},
				{
					variavel: 'stackedlines',
					alias: 'StackedLines',
					traducao: {
						portuguesBr: "Linhas Empilhadas"
					},
					categoria:['empilhada','empilhadas','stacked','linha','line','linhas','lines'],
					variacao: [
						'linhasempilhadas',
						'linhaempilhada',
						'stackedline'
					],
					modulo: 'dojox/charting/plot2d/StackedLines',
					ativo: true
				}
			],
			escalas:[
				{
					variavel: '',
					alias: 'Logarithimic',
					traducao: {
						portuguesBr: "Logaritimica"
					},
					categoria: ['log','singular'],
					variacao:[							
						'log',
						'loga',
						'Logarithimic',
						'Logaritimica',
						'Logaritimo',
					],
					fn: function(data){
						var cloneData = XtrGraficoUtil.clone(data);
						var LOG10 = Math.log(10);
						var mins = [];

						for(var dataIndex = 0; cloneData.length > dataIndex; dataIndex++){
							var item = cloneData[dataIndex];
							var collection = item.valores;
							
							for (var collectionIndex = 0; collectionIndex < collection.length; collectionIndex++) {
								var value = collection[collectionIndex];

								if(-1 <= value < 0){
									value = value  * (-1);
									value = Math.log(value*10) / Math.log(10);
									value = value * (-1);
								}
								else if(value >= 1){
									value = Math.log(value*10) / Math.log(10);
								}

								cloneData[dataIndex].valores[collectionIndex] = value;								
							};
						}
						return cloneData;
					},
					modulo: ''
				},
				{
					variavel: '',
					alias: 'Linear',
					traducao: {
						portuguesBr: "Linear"
					},
					categoria: ['simples','linear','simple'],
					variacao:[							
						'linear',
						'simples',
						'simple'
					],
					fn: function(data){
						return data;
					},
					modulo: ''
				},
				{
					variavel: '',
					alias: 'Justa',
					traducao: {
						portuguesBr: "Justaposição"
					},
					categoria: ['justa','linear','percetual'],
					variacao:[							
						'justa',
						'percetual'
					],
					fn: function(data){
						var cloneData = XtrGraficoUtil.clone(data);
						for(var rotuloIndex = 0; data[0].valores.length > rotuloIndex; rotuloIndex++){
							var sum = 0;
							var loop = 2;
							while(loop--){
								for(var dataIndex = 0; cloneData.length > dataIndex; dataIndex++){
									var item = cloneData[dataIndex];
									var value = item.valores[rotuloIndex];
									if(loop==1)
										sum += value;
									else{
										cloneData[dataIndex].valores[rotuloIndex] = value/sum;
									}				
								}
							}
						}
						return cloneData;
					},
					modulo: ''
				}
			],
			fusoes:[
				{
					de: ["columns"],
					para: ["columns","areas","lines"],
					exceto: [""]					
				},
				{
					de: ["area"],
					para: ['areas','bars',"columns","lines"],
					exceto: []	
				},
				{
					de: ["bars"],
					para: ['areas','bars'],
					exceto: []	
				},
				{
					de: ['pie','treemap','bubble','markersonly'],
					para: [],
					exceto: []
				},
				{
					de: ['line'],
					para: ["all"],
					exceto: ['pie','treemap',"spider",'bubble','markersonly']
				},
			]
		};

		function getDojo(proper){
			var toReturn;

			toReturn = XtrGraficoUtil.isset(proper) ? dojo[proper] : dojo;

			return toReturn;
		}
		function getModule(needle,proper){
			var Proper;
			var haystack;							
			var filtrado;
			var toReturn;
			
			var hasInVariacao;
			var hasInVariavel;
			var hasInAlias;

			Proper = XtrGraficoUtil.isset(proper) ? proper : "widgets";
			haystack = dojo[Proper];

			filtrado = haystack.filter(function(value){
				hasInVariacao = false;
				hasInVariavel = false;
				hasInAlias = false;

				hasInVariacao = XtrGraficoUtil.isset(value.variacao) ? value.variacao.indexOf(needle)>=0 : false;
				hasInVariavel = XtrGraficoUtil.isset(value.variavel) ? value.variavel == needle : false;
				hasInAlias = XtrGraficoUtil.isset(value.alias) ? value.alias == needle : false;

				return hasInVariavel || hasInAlias || hasInVariacao;
			});

			toReturn = filtrado[filtrado.length-1].modulo;

			return toReturn;
		}									
		function getVariable(needle,proper){
			var Proper;
			var haystack;							
			var filtrado;
			var indexToReturn;
			var elementToReturn;
			
			var hasInVariacao;
			var hasInVariavel;
			var hasInAlias;

			Proper = XtrGraficoUtil.isset(proper) ? proper : "widgets";
			haystack = dojo[Proper];

			filtrado = haystack.filter(function(value){
				hasInVariacao = false;
				hasInVariavel = false;
				hasInAlias = false;

				hasInVariacao = XtrGraficoUtil.isset(value.variacao) ? value.variacao.indexOf(needle)>=0 : false;
				hasInVariavel = XtrGraficoUtil.isset(value.variavel) ? value.variavel == needle : false;
				hasInAlias = XtrGraficoUtil.isset(value.alias) ? value.alias == needle : false;

				return hasInVariavel || hasInAlias || hasInVariacao;
			});

			elementToReturn = filtrado.length > 0 ? filtrado[filtrado.length-1].variavel : undefined;

			return elementToReturn;
		}								
		function getDojoObjectByVariable(needle,proper){
			var Proper;
			var haystack;							
			var filtrado;
			var indexToReturn;
			var elementToReturn;

			var hasInVariacao;
			var hasInVariavel;
			var hasInAlias;

			Proper = XtrGraficoUtil.isset(proper) ? proper : "widgets";
			haystack = dojo[Proper];

			filtrado = haystack.filter(function(value){
				hasInVariacao = false;
				hasInVariavel = false;
				hasInAlias = false;
				//hasInVariacao = XtrGraficoUtil.isset(value.variacao) ? value.variacao.indexOf(needle)>=0 : false;
				hasInVariavel = XtrGraficoUtil.isset(value.variavel) ? value.variavel == needle : false;
				//hasInAlias = XtrGraficoUtil.isset(value.alias) ? value.alias == needle : false;

				return hasInVariavel || hasInAlias || hasInVariacao;
			});

			elementToReturn = filtrado.length > 0 ? filtrado[filtrado.length-1] : undefined;

			return elementToReturn;
		}		
		function getDojoObjectByAlias(needle,proper){
			var Proper;
			var haystack;							
			var filtrado;
			var indexToReturn;
			var elementToReturn;

			var hasInVariacao;
			var hasInVariavel;
			var hasInAlias;

			Proper = XtrGraficoUtil.isset(proper) ? proper : "widgets";
			haystack = dojo[Proper];

			filtrado = haystack.filter(function(value){
				hasInVariacao=false;
				hasInVariavel=false;
				hasInAlias=false;
				//hasInVariacao = XtrGraficoUtil.isset(value.variacao) ? value.variacao.indexOf(needle)>=0 : false;
				//hasInVariavel = XtrGraficoUtil.isset(value.variavel) ? value.variavel == needle : false;
				hasInAlias = XtrGraficoUtil.isset(value.alias) ? value.alias == needle : false;

				return hasInVariavel || hasInAlias || hasInVariacao;
			});

			elementToReturn = filtrado.length > 0 ? filtrado[filtrado.length-1] : undefined;

			return elementToReturn;		
		}
		function getDojoObject(needle,proper){
			var Proper;
			var haystack;							
			var filtrado;
			var indexToReturn;
			var elementToReturn;

			var hasInVariacao;
			var hasInVariavel;
			var hasInAlias;

			Proper = XtrGraficoUtil.isset(proper) ? proper : "widgets";
			haystack = dojo[Proper];

			filtrado = haystack.filter(function(value){
				hasInVariacao=false;
				hasInVariavel=false;
				hasInAlias=false;
				hasInVariacao = XtrGraficoUtil.isset(value.variacao) ? value.variacao.indexOf(needle)>=0 : false;
				hasInVariavel = XtrGraficoUtil.isset(value.variavel) ? value.variavel == needle : false;
				hasInAlias = XtrGraficoUtil.isset(value.alias) ? value.alias == needle : false;

				return hasInVariavel || hasInAlias || hasInVariacao;
			});

			elementToReturn = filtrado.length > 0 ? filtrado[filtrado.length-1] : undefined;

			return elementToReturn;
		}		
		function getRequired(){
			var tipo;
			var tema;
			var Required;

			Required = [];

			Required.push(this.getDojoObjectByAlias('Ready'));
			if(maker.isThisMyChartType("map")){
				Required.push(this.getDojoObjectByAlias('Memory'));
				Required.push(this.getDojoObjectByAlias('MeanColorModel'));
				Required.push(this.getDojoObjectByAlias('Color'));
				Required.push(this.getDojoObjectByAlias('dom'));														
				Required.push(this.getDojoObject(makerType,'tipos'));
			}
			else{
				//Required.push(this.getDojoObjectByAlias('Easing'));
				Required.push(this.getDojoObjectByAlias('Registry'));
				Required.push(this.getDojoObjectByAlias('Number'));
				Required.push(this.getDojoObjectByAlias('Chart'));
				Required.push(this.getDojoObjectByAlias('Tooltip'));
				//Required.push(this.getDojoObjectByAlias('Highlight'));
				Required.push(this.getDojoObjectByAlias('DefaultAxis'));
				Required.push(this.getDojoObjectByAlias('DefaultPlot'));
				if(maker.isThisMyChartType('radar')){

					Required.push(this.getDojoObjectByAlias('Legend'));
				}
				else{
					Required.push(this.getDojoObjectByAlias('SelectableLegend'));
				}

				if(maker.isThisMyChartType('pizza')) {
					Required.push(this.getDojoObjectByAlias('MoveSlice'));
				}
				else if (maker.areOneOfTheseMyChartType(['linha','area','bolhas','dispersao'])){
					Required.push(this.getDojoObjectByAlias('Markers'));
					Required.push(this.getDojoObjectByAlias('Magnify'));
				}
				Required.push(this.getDojoObjectByVariable(makerTheme,'temas'));							
				Required.push(this.getDojoObject(makerType,'tipos'));
			}
			return Required;
		}
		function getDojoObjectByCategory(categorias,stack){
			var haystack;
			var filtrado,preFiltrado;

			var counterCategoria;
			var hasInCategoria;
			var categoria;
			
			var howManyHits;
			var hit;
			categorias = XtrGraficoUtil.isarray(categorias) ? categorias : [categorias];
			if(XtrGraficoUtil.isset(stack) ? XtrGraficoUtil.isset(dojo[stack]) : false)
				haystack = dojo[stack];
			else
				haystack = dojo.tipos;
			filtrado=[];
			howManyHits=0;
			hit=false;
			counterCategoria=0;

			while(counterCategoria < categorias.length && (hit || counterCategoria==0)){
				categoria = categorias[counterCategoria];

				preFiltrado = haystack.filter(function(value){
					hasInCategoria=false;
					hasInCategoria = XtrGraficoUtil.isset(value.categoria) ? value.categoria.indexOf(categoria)>=0 : false;

					return hasInCategoria;
				});	
				hit = preFiltrado.length > 0;
				howManyHits += preFiltrado.length;
				filtrado = hit ? filtrado.concat(preFiltrado) : [];

				counterCategoria++;
			};

			return filtrado;
		}
		function getDojoObjectByCategoryExaclty(categorias,stack){
			var haystack;
			var filtrado,preFiltrado;

			var objectiveHits;
			var counterHits;

			var categoria;
			var hasInCategoria;
			var counterCategoria;

			categorias = XtrGraficoUtil.isarray(categorias) ? categorias : [categorias];
			if(XtrGraficoUtil.isset(stack) ? XtrGraficoUtil.isset(dojo[stack]) : false)
				haystack = dojo[stack];
			else
				haystack = dojo.tipos;
			filtrado=[];				
			objectiveHits=categorias.length;

			filtrado = haystack.filter(function(value){
				hasInCategoria=false;
				counterCategoria=0;
				counterHits=0;
				while(counterCategoria < categorias.length && (hasInCategoria || counterCategoria==0)){

					categoria = categorias[counterCategoria];
					hasInCategoria = XtrGraficoUtil.isset(value.categoria) ? value.categoria.indexOf(categoria)>=0 : false;
					
					hasInCategoria ? counterHits++ : "doNothing";

					counterCategoria++;
				}

				return counterHits >= objectiveHits;
			});

			return filtrado;
		}

		this.getDojo = getDojo;
		this.getModule = getModule;
		this.getVariable = getVariable;
		this.getDojoObjectByVariable = getDojoObjectByVariable;
		this.getDojoObjectByAlias = getDojoObjectByAlias;
		this.getDojoObject = getDojoObject;
		this.getRequired = getRequired;
		this.getDojoObjectByCategory = getDojoObjectByCategory;
		this.getDojoObjectByCategoryExaclty = getDojoObjectByCategoryExaclty;

		return this;
	}