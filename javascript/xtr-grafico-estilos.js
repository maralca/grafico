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

			var serie;
			var rotulos;

			var valores,valor;
			var sum;
			var unidade;

			serie = localChart.getSeries().ideal[0];
			unidade = serie.unidade;
			
			labels = legendaContainer.getElementsByClassName("dojoxLegendText");
			rotulos = localChart.getRotulos();

			for(labelIndex = 0; labels.length > labelIndex; labelIndex++){

				rotulo = rotulos[labelIndex];
				label = labels[labelIndex];
				newLabel = label.parentNode.querySelector(".xtrCheckboxLabelText");

				if(localChart.isThisMyChartType("pizza")){
					valores = serie.valores;
					sum = XtrGraficoUtil.somatorium(valores);
					valor = valores[labelIndex];

					label.innerHTML = rotulo + ", contendo no total " + valor
					+"(" + (valor/sum*100).toFixed(1) + "%)";
				}

				newLabel.innerHTML = label.innerHTML+ "&nbsp;("+unidade+")";
				label.style.setProperty("display","none");

			}
		}
		function overrideLegendIcons(refresh,disabled,center){
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
				legendaIconeContainer.parentNode.style.setProperty("display","flex");
				if(center)
					legendaIconeContainer.parentNode.style.setProperty("justify-content","center");
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
			//console.log(chartSeries);
			style = document.getElementById("style");
			if(style)
				style.remove();
			style = document.createElement("style");
			style.id = "style"
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

					selector = elementsContainer.tagName+":nth-child("+auxRefIndex+") > ";	

					if(fill != null){
						style.innerHTML += selector+":hover,"+selector+".hover{"
							+"fill:"+XtrGraficoUtil.color.blend(fill,xtrGrafico.Default.hover.fill,1)+";"
							+"stroke:"+xtrGrafico.Default.hover.stroke+";"
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
				if(isPossibleFireEvent && checked){
					chart.fireEvent(chartSerie.name,"onmouseover",index);
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
				if(isPossibleFireEvent && over){
					chart.fireEvent(chartSerie.name,"onmouseout",index);
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

				if(!isPie)
					fill = chartSeries[index].dyn.fill;
				else
					fill = chartSeries[0].chart.stack[0].dyn[index].fill;

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
			
			tbody.className = tbody.className + "flexbox"
			tbody.style.setProperty("flex-direction","column-reverse");

			trs = legendaContainer.querySelectorAll("tbody tr");
			for(trIndex = 0; trs.length > trIndex; trIndex++){
				tr = trs[trIndex];
				tr.className = tr.className + "flexbox";
				tr.style.setProperty("flex-direction","column-reverse");
			}
		}

		this.legendIcons = overrideLegendIcons;
		this.labelText = overrideLabelText;
		this.legendContainer = styleLegendContainer;
		this.legendHighligh = legendHighligh;
		this.invertedLegendDirection = invertedLegendDirection;

		return this;
	}
