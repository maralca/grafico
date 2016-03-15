	function stylish(localChart){
		var legendaContainer;
		var graficoContainer;

		legendaContainer = document.getElementById(xtrGrafico.ID_LEGENDA);
		graficoContainer = document.getElementById(xtrGrafico.ID_GRAFICO);

		function overrideLabelText(refresh){
			if(XtrGraficoUtil.isset(refresh) ? refresh : false)
				return;

			var labels,label;
			var labelIndex; 

			var newLabel;

			var serie,series;
			var rotulos;

			var valores,valor;
			var sum;
			var unidade;
			var percentText;

			series = localChart.getSeries().ideal;
			serie = series[0];

			valores = serie.valores;
			unidade = serie.unidade;

			if(XtrGraficoUtil.isarray(unidade)){
				unidade = unidade.join(" por ");
			}
			
			labels = legendaContainer.getElementsByClassName("dojoxLegendText");
			rotulos = localChart.getRotulos();

			for(labelIndex = 0; labels.length > labelIndex; labelIndex++){

				rotulo = rotulos[labelIndex];
				label = labels[labelIndex];

				if(localChart.isThisMyChartType("cartesiano")){
					valores = series[labelIndex].valores;
					label.innerHTML += ", "+valores.join(" por ");
				}

				newLabel = label.parentNode.querySelector(".xtrCheckboxLabelText");
				var unidadeText = "<span class='sub'>" + unidade + "</span>";
				var unidadeText2 = "<span class='sub'>(" + unidade + ")</span>";
				if(localChart.isThisMyChartType("pizza")){
					sum = XtrGraficoUtil.somatorium(valores);
					valor = valores[labelIndex];
					percentText = (valor/sum*100).toFixed(1);
					percentText = percentText + "<span class='sub'>%</sub>";

					label.innerHTML = rotulo + ",&nbsp;" + valor + unidadeText + ",&nbsp;"+"equivalente à"+"&nbsp;"+percentText;					
				}
				else if(localChart.isThisMyChartType("geografica")){
					sum = XtrGraficoUtil.somatorium(valores);
					var value = parseFloat(label.lastChild.nodeValue);
					value = value / sum;
					value = value.toFixed(3);
					value = value + "<span class='sub'>%</sub>";
					label.innerHTML = label.innerHTML+unidadeText;
					// label.innerHTML = label.innerHTML+", equivalente à "+value;
				}
				else{
					label.innerHTML = label.innerHTML+ "&nbsp;"+unidadeText2;
				}
				newLabel.innerHTML = label.innerHTML;

				label.style.setProperty("display","none");

			}
		}
		function overrideLegendIcons(refresh,disabled){
			if(XtrGraficoUtil.isset(refresh) ? refresh : false)
				return;
			var legendaIconeContainers,legendaIconeContainer;
			var legendaIcone,legendaIconeTag;
			var legendaIconeContainerIndex;

			var checkbox;
			var checked;
			var uncheckeds;
			var xtrCheckbox,xtrCheckboxObj,xtrCheckboxNode;

			var label;

			var labelText;

			var fills,fill;
			var stroke;

			var isTheOne,hasPath;

			var id;	

			var pie;

			fills = {};

			disabled = XtrGraficoUtil.isset(disabled) ? disabled : false;

			pie = localChart.isThisMyChartType('pizza') ? 1 : 0;

			legendaIconeContainers = legendaContainer.querySelectorAll(".dojoxLegendIcon");

			isTheOne = localChart.areOneOfTheseMyChartType(["radar","treemap"]);

			for(legendaContainerIconeIndex = 0; legendaIconeContainers.length > legendaContainerIconeIndex && !isTheOne; legendaContainerIconeIndex++){

				legendaIconeContainer = legendaIconeContainers[legendaContainerIconeIndex];
				legendaIcone = legendaIconeContainer.querySelector("defs ~ *");
				legendaIconeTag = legendaIcone.tagName;

				labelText = legendaIconeContainer.nextSibling;

				isPath = legendaIconeTag == "path";

				if(!isPath){
					legendaIconeContainer.style.setProperty("display","none");
				}

				fill = getFill(legendaIcone.getAttribute("fill"));
				stroke = legendaIcone.getAttribute("stroke");
				fill = fill == "none" ? stroke : fill;
				id = "xtrCheckbox_"+legendaContainerIconeIndex;

				fills[id] = fill;

				checkboxObj = {
					id: id,
					"data-legenda": true,
					checked:"true",
					disabled: disabled,
					symbol:{
						background: fill,
						stroke: stroke
					},
					addEventListener:{
						type: "change",
						func: function(target,type,objAux){
							uncheckeds = legendaContainer.querySelectorAll("[data-legenda] input:checked");

							checkbox = objAux.input;
							checked = checkbox.checked;
							id = checkbox.id;

							label = objAux.label;

							fill = 	fills[id];

							labelText = target.parentNode.lastChild;		
							target.changeAttr({style:{name: "transition"}},"all 1s",labelText);

							if(xtrGrafico.MIN_CHECKED + pie <= uncheckeds.length){
								if(checked){
									target.changeAttr({style:{name: "background"}},fill,label);
									target.changeAttr({style:{name: "text-decoration"}},"",labelText);
									target.changeAttr({style:{name: "color"}},"",labelText);
								}
								else{
									target.changeAttr({style:{name: "background"}},"",label);
									target.changeAttr({style:{name: "text-decoration"}},"line-through",labelText);
									target.changeAttr({style:{name: "color"}},"rgba(180,180,180,.5)",labelText);
								}

							}
						}
					}
				}

				xtrCheckbox = new XtrCheckbox(checkboxObj);
				xtrCheckboxNode = xtrCheckbox.node;

				legendaIconeContainer.parentNode.insertBefore(xtrCheckboxNode,legendaIconeContainer);
				legendaIconeContainer.parentNode.className += "flexbox"; 
				labelText.setAttribute("for",id);			
				
				xtrCheckboxNode.insertBefore(legendaIconeContainer,xtrCheckboxNode.firstChild);
			}
			function getFill(fill){
				var url;
				var element;

				if(fill.indexOf("url") >= 0){
					url = fill.slice(5,-1);
					element = document.getElementById(url).firstChild;
					fill = element.getAttribute("stop-color");
				}
				return fill;
			}
		}
		function styleLegendContainer(refresh){
			if(XtrGraficoUtil.isset(refresh) ? refresh : false)
				return;

			var svg;

			var fill;
			var color;
			var width;

			var once;

			svg = graficoContainer.querySelector("svg:first-of-type");
			fill = svg.querySelector("defs + rect").getAttribute("fill");
			color = graficoContainer.firstChild.firstChild.style.color;

			color = XtrGraficoUtil.color.shade(color,0.3);

			color = color ? color : "rgba(60,60,60,.3)";
			fill = fill == "rgb(0, 0, 0)" ? "rgba(255,255,255,.9)" : fill;

			width = svg.getAttribute("width");
			legendaContainer.style.setProperty("background-color",fill,"important");		
			legendaContainer.style.setProperty("color",color,"important");	
			legendaContainer.style.setProperty("width",width+"px");

			once = true;
			graficoContainer.addEventListener("DOMNodeInserted",function(){
				
				if(graficoContainer.querySelector("svg") && once){
					once = false;
					width = graficoContainer.querySelector("svg").getAttribute("width");
					legendaContainer.style.setProperty("width",width);
				}
			});
			graficoContainer.addEventListener("DOMNodeRemoved",function(){				
				once = true;
			});
			return fill;
		}
		function legendHighligh(doHighligh){
			if(XtrGraficoUtil.isset(doHighligh) ? doHighligh : false)
				return;

			var checkboxes,checkbox;
			var checkedCounter;
			var checkboxId;
			var checkboxContainer;

			var input;

			var indexes,index;

			var chartStacks,chartStack;

			var chartSeries,chartSerie;
			var chartSerieIndex;

			var elementsContainer;
			var elements;

			var fill;

			var legenda;
			var chart;

			var style;

			var isPie;

			var ref;
			var refIndexes,refIndex,auxRefIndex;
			
			chart = localChart.getChart();
			
			chartSeries = chart.series;

			isPie = localChart.isThisMyChartType("pizza");
			isPossibleFireEvent = localChart.areOneOfTheseMyChartType(['pizza','cartesiano']);

			checkboxes = legendaContainer.firstChild.getElementsByClassName("xtrCheckbox");

			style = document.getElementById("style_highlight");
			if(style)
				style.remove();

			style = document.createElement("style");
			style.id = "style_highlight"
			document.body.appendChild(style);
			indexes = {};
			refIndexes = {};
			ref = isPie ? checkboxes : chartSeries;
			for(refIndex = 0,checkedCounter = 0; ref.length > refIndex; refIndex++){

				index = checkboxes.length - refIndex - 1;
				checkbox = checkboxes[refIndex];
				checkboxId = checkbox.getAttribute("for");
				input = document.getElementById(checkboxId);
				indexes[checkboxId] = checkedCounter;
				refIndexes[checkboxId] = refIndex;

				checkbox.removeEventListener("mouseover",forceMouseOver,true);
				checkbox.removeEventListener("mouseout",forceMouseOut,true);

				fill = getFill(index,isPie);

				if(input.checked || !isPie){
					checkedCounter++;
					elementsContainer = getElements(index,true,isPie);

					auxRefIndex = isPie ? checkedCounter : refIndex+1;
					selector = elementsContainer.tagName+" > *";
					
					if(fill != null){

						for(var t =0; elementsContainer.childNodes.length  > t ; t++){
							elementsContainer.childNodes[t].setAttribute("data-default-fill",fill);
							elementsContainer.childNodes[t].addEventListener("mouseover",function(){
								this.setAttribute("class","hover");
							});
							elementsContainer.childNodes[t].addEventListener("mouseout",function(){
								this.setAttribute("class","");
							});
						}
						style.innerHTML += selector+".hover{"
							+"fill:"+XtrGraficoUtil.color.blend(fill,xtrGrafico.Default.hover.fill,0.5)+";"
							+"stroke:"+XtrGraficoUtil.color.blend(fill,xtrGrafico.Default.hover.fill,0.6)+";"
							+"-webkit-transition: all 0.6s;"
							+"-moz-transition: all 0.6s;"
							+"-ms-transition: all 0.6s;"
							+"-o-transition: all 0.6s;"
							+"transition: all 0.6s;"
						+"}";
					}
					checkbox.addEventListener("mouseover",forceMouseOver,true);
					checkbox.addEventListener("mouseout",forceMouseOut,true);
				}
			};
			var over;
			function forceMouseOver(event){
				checkboxId = this.id;
				checkboxId = checkboxId ? checkboxId : this.getAttribute("for");
				index = indexes[checkboxId];
				refIndex = refIndexes[checkboxId];		
				elements = getElements(index,false,isPie);
				forceAction(elements,true);
				chartSerie = chartSeries[index];
				index = 0;
				checkbox = document.getElementById(checkboxId);
				checked = checkbox.checked;
				if(isPie){
					chartSerie = chartSeries[0];
					index = refIndex;
				}
				if(checked){
					if(isPossibleFireEvent){
						chart.fireEvent(chartSerie.name,"onmouseover",index);
					}
					else{
						style = document.getElementById('style_dijit_forceMouseOver');
						if(style == null){
							style = document.createElement("style");
							style.id = 'style_dijit_forceMouseOver';
							
							style.onload = function(){

								var rotulos = localChart.getRotulos();
								for(rotuloIndex = 0; rotulos.length > rotuloIndex; rotuloIndex++){
									chart.fireEvent(chartSerie.name,"onmouseover",rotuloIndex);							
								}
							}
							style.innerHTML = ".dijitTooltip {"
							+"display: none !important;"
							+"opacity: 0 !important;"
							+"position: absolute !important;"
							+"left: - 50000px !important;"
							+"top:  - 50000px !important;"
							+"width: 0px !important;"
							+"height: 0px !important;"

							document.body.appendChild(style);
						}
					}
					over = true;
				}
			}
			function forceMouseOut(event){
				checkboxId = this.id;
				checkboxId = checkboxId ? checkboxId : this.getAttribute("for");
				index = indexes[checkboxId];	
				refIndex = refIndexes[checkboxId];
				elements = getElements(index,false,isPie);
				forceAction(elements);
				chartSerie = chartSeries[index];
				index = 0;
				checkbox = document.getElementById(checkboxId);
				checked = checkbox.checked;
				if(isPie){
					chartSerie = chartSeries[0];
					index = refIndex;
				}
				if(over){
					if(isPossibleFireEvent){
						chart.fireEvent(chartSerie.name,"onmouseout",index);
					}
					else{
						var rotulos = localChart.getRotulos();
						for(rotuloIndex = 0; rotulos.length > rotuloIndex; rotuloIndex++){
							chart.fireEvent(chartSerie.name,"onmouseout",rotuloIndex);
						}
						var style = document.getElementById("style_dijit_forceMouseOver");
						if(style != null){
							style.remove();
						}
					}
					over = false;
				}
			}
			function forceAction(itens,hover){
				var item;
				var itemIndex;
				var innerItem;
				var innerItemIndex;

				itens = XtrGraficoUtil.isarray(itens) ? itens : [itens];
				for (itemIndex = 0; itens.length > itemIndex; itemIndex++){
					item = itens[itemIndex];
					if(XtrGraficoUtil.isset(item.length)){
						for(innerItemIndex = 0; item.length > innerItemIndex; innerItemIndex++){
							innerItem = item[innerItemIndex];										
							innerItem.setAttribute("class","hover");
							if(!hover)
								innerItem.setAttribute("class","");
						}
					}
					else{
						item.setAttribute("class","hover");
						if(!hover)
							item.setAttribute("class","");
					}
				};
			}
			function getElements(index,theParent,isPie){
				var elements,parent;


				parent = isPie ? chartSeries[0].chart.stack[0].group.rawNode : chartSeries[index].group.rawNode;	

				if(theParent)
					return parent;

				elements = isPie ? parent.childNodes[index] : parent.childNodes;

				return elements;
			}
			function getFill(index,isPie){
				var fill;

				if(!isPie){
					fill = chartSeries[index].dyn.fill;
					if(!fill){
						fill = chartSeries[index].dyn.markerFill;
					}
				}
				else{
					fill = chartSeries[0].chart.stack[0].dyn[index].fill;
				}
				if(fill==null)
					return null;

				if(XtrGraficoUtil.isobj(fill)){
					fill = XtrGraficoUtil.isset(fill.colors) ? fill.colors[0].color : fill;
					if(XtrGraficoUtil.isobj(fill))
						fill = "rgb("+fill.r+","+fill.g+","+fill.b+")";
				}
				
				return fill;
			}
		}
		function invertedLegendDirection(){
			var trs,tr;
			var trIndex;

			var tbody;

			tbody = legendaContainer.querySelector("tbody");
			
			tbody.className += " flexbox column-reverse";

			trs = legendaContainer.querySelectorAll("tbody tr");
			for(trIndex = 0; trs.length > trIndex; trIndex++){
				tr = trs[trIndex];
				tr.className += " flexbox column-reverse";
			}
		}

		this.legendIcons = overrideLegendIcons;
		this.labelText = overrideLabelText;
		this.legendContainer = styleLegendContainer;
		this.legendHighligh = legendHighligh;
		this.invertedLegendDirection = invertedLegendDirection;

		return this;
	}
