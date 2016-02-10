function geoAreaGrafico(compositeData,coordenadas,red,green,blue,percent,scale){
    var coordenada;
    var coordenadaIndex;

    var gScale,gTranslate,gCidade;
    var pathCidade;

    var ds,d;
    var dIndex;

    var cidade;
    var cidadeNome,cidadeDs,cidadeId,cidadeIndex;

    var grafico;

    var rotulos;
    var serie;
    var valores,valor;
    var titulos;

    var max,min,sum;

    var color,opacity;

    var xtrTooltip;
    var xtrSVG;

    rotulos = compositeData.rotulos;
    serie = compositeData.series[0];
    titulos = compositeData.titulos;
    valores = serie.dados;

    max = XtrGraficoUtil.maximum(valores);
    min = XtrGraficoUtil.minimum(valores);
    sum = XtrGraficoUtil.somatorium(valores)

    xtrTooltip = new XtrTooltip("tooltip_geochart","cima");

    grafico = document.getElementById(xtrGrafico.ID_GRAFICO);                    
    grafico.style.setProperty("background","rgba("+parseInt(red*1.5)+","+parseInt(green*1.5)+","+parseInt(blue*1.5)+","+percent+")");

    geoHighlight("geoChart");
    
    svgObj = {
        "id": "geoChart",
        "class": "geoChart",
        "width": grafico.offsetWidth,
        "height": grafico.offsetHeight,
        "viewBox": "0 0 "+grafico.offsetWidth+" "+grafico.offsetHeight,
        "preserveAspectRatio": "xMinYMin"                  
    };                   
    xtrSVG = new XtrSVG(svgObj,xtrGrafico.ID_GRAFICO);


    gScaleObject = {
        "id": "geoChartScale"
    }
    gScale = xtrSVG.append(gScaleObject);     

    gTranslateObject = {
        "id": "geoChartTranslate",
        "parent": gScale
    }
    gTranslate = xtrSVG.append(gTranslateObject);
        console.log(coordenadas);

    for(regiao in coordenadas){
        estados = coordenadas[regiao];
        gRegiaoObject = {
            "id": regiao,
            "parent": gTranslate
        }
        gRegiao = xtrSVG.append(gRegiaoObject);

        for(estado in estados){

            cidades = estados[estado];

            if(XtrGraficoUtil.isobj(cidades)){
                gEstadoObject = {
                    "id": estado,
                    "parent": gRegiao
                }
                gEstado = xtrSVG.append(gEstadoObject);
            }
            else{
                for(rotuloIndex = 0; rotulos.length > rotuloIndex; rotuloIndex++){
                    rotulo = rotulos[rotuloIndex];
                    if(rotulo.indexOf(estado) >= 0){
                        break;
                    }
                }
                valor = valores[rotuloIndex]
                opacity = valor/max;
                color = "rgba("+red+","+green+","+blue+","+opacity+")";

                pathObject = {
                    "id": estado,
                    "tag": "path",
                    "d": cidades,
                    "parent": gRegiao,
                    "class": "geoChartHighlight",
                    "fill": color
                }
                pathEstado = xtrSVG.append(pathObject);
            }
            for(cidadeId in cidades){
                cidade = cidades[cidadeId];
                cidadeNome = cidade.nome+" / "+estado;
                cidadeCaminhos = cidade.coordenadas;                            
                cidadeIndex = rotulos.indexOf(cidadeNome);
                valor = valores[cidadeIndex];
                valor = XtrGraficoUtil.isset(valor) ? valor : 0;

                gCidadeObject = {
                    "id": cidadeId,
                    "data-value": valor,
                    "data-percent": valor/sum,
                    "data-nome": cidadeNome,
                    "class": "geoChartHighlight",
                    "parent": gEstado
                };                     
                gCidade = xtrSVG.append(gCidadeObject);

                tooltipContent = "<p>"+titulos.identificadores+" : "+cidade.nome+"</p>"
                +"<p>"+serie.titulo+" : "+valor+"</p>";
                xtrTooltip.addTrigger("#"+cidadeId,{
                    "content": tooltipContent
                });

                opacity = valor/max;
                color = "rgba("+red+","+green+","+blue+","+opacity+")";

                for(dIndex = 0; cidadeCaminhos.length > dIndex; dIndex++){
                    cidadeCaminho = cidadeCaminhos[dIndex];
                    pathObject = {
                        "tag": "path",
                        "d": cidadeCaminho,
                        "fill": color,
                        "parent": gCidade
                    };
                    pathCidade = xtrSVG.append(pathObject);
                };
            };
        }
        
    }

    bb = gScale.getBBox();
    aspectRatio = bb.width / bb.height;
    refX =    grafico.offsetWidth * 0.8 * aspectRatio / bb.width;
    refY = - grafico.offsetHeight * 0.8 / aspectRatio / bb.height;

    if(grafico.offsetHeight > grafico.offsetWidth){
        refY = -refX
    }
    else{
        refX = -refY;
    }

    gScale.setAttrs({
        "transform": "matrix("+refX+" 0 0 "+refY+" 0 0"+")",
        //"transform": "scale("+ 0.06 +","+ (-0.06) +")"
        "nada":"nada"
    });
    
    factorX = Math.floor(bb.x) * (-1);
    factorY = Math.floor(bb.y + bb.height) * (-1);

    gTranslate.setAttrs({
        "transform": "translate("+ factorX +"," + factorY +")"
    });
    /*
    0.055 ----- 3250
    0.055 ----- 3150

    0.050 ----- 2950
    0.050 ----- 2800

    0.045 ----- 2650
    0.045 ----- 2500

    0.040 ----- 2350
    0.040 ----- 2200
    */ 
}
function geoAreaLegenda(compositeData,red,green,blue,n,percent,scale,style){
    var legenda;
    var legendaAttrs,legendaAttr;
    var legendaAttrIndex;

    var svg;                
    var defs,rect,text;

    var series,serie;
    var sum;
    var max,min;

    var table,tr,td,div;

    var fill;

    var size;

    var SVGREF = "http://www.w3.org/2000/svg";

    var percent,eachPercent,percentInicial;

    series = compositeData.series;
    serie = series[0];
    sum = XtrGraficoUtil.somatorium(serie.dados);
    max = XtrGraficoUtil.maximum(serie.dados);
    min = XtrGraficoUtil.minimum(serie.dados);


    eachPercent = 1 / n;

    size = 15;

    legenda = document.getElementById(xtrGrafico.ID_LEGENDA);
    table = document.createElement("table");
    legenda.style.setProperty("background",
        "rgba("+parseInt(red*1.5)+","+parseInt(green*1.5)+","+parseInt(blue*1.5)+","+percent+")");

    legendaAttrs = legenda.attributes;
    for(legendaAttrIndex = 0; legendaAttrs.length > legendaAttrIndex; legendaAttrIndex++){
        legendaAttr = legendaAttrs[legendaAttrIndex].nodeName;
        table.setAttribute(legendaAttr,legenda.getAttribute(legendaAttr));
    };
    if(XtrGraficoUtil.isset(style)){
        for(styProp in style){
            styVal = style[styProp];
            table.style.setProperty(styProp,styVal);
        }
    }
    table.style.setProperty("width","100%");

    legenda.parentNode.appendChild(table);
    legenda.remove();
    i = 1;

    sum = sum.toString();

    var sumRoundSize = 4;

    var fs = sum.substr(0,sum.length-sumRoundSize);
    fs = parseFloat(fs);
    sum = fs * Math.pow(10,sumRoundSize);

    max2min = max - min;
    max2minEach = max2min/n;
    percentInicial = 0.0125;
    percent = percentInicial;

    while(percent <= 1){
        first = percent == percentInicial;
        last = percent+eachPercent > 1;

        tr = document.createElement("tr");                   

        td = document.createElement("td");                    
        tr.style.setProperty("font-color",
            "rgb("+parseInt(red/2.5)+","+parseInt(green/2.5)+","+parseInt(blue/2.5)+")");

        div = document.createElement("div");
        div.style.setProperty("width",(size+3)+"px");
        div.style.setProperty("height",(size+3)+"px");
        div.style.setProperty("float","left");
        div.className = "dojoxLegendIcon dijitInline";

        label = document.createElement("label");
        label.className = "dojoxLegendText";

        something = first ? "<span> < </span>" : last ? "<span> > </span>" : "";

        label.innerHTML = something+XtrGraficoUtil.convertKMB(max*percent,1,true);

        svg = document.createElementNS(SVGREF,"svg");
        svg.setAttributeNS(null,"width",(size+3));
        svg.setAttributeNS(null,"height",(size+3));
        svg.setAttributeNS(null,"overflow","hidden");

        defs = document.createElementNS(SVGREF,"defs");
        
        fill = "rgba("+red+","+green+","+blue+","+percent+")";

        rect = document.createElementNS(SVGREF,"rect");
        rect.setAttributeNS(null,"fill",fill);
        rect.setAttributeNS(null,"width",(size+1));
        rect.setAttributeNS(null,"height",(size+1));
        rect.setAttributeNS(null,"x",2);
        rect.setAttributeNS(null,"y",2);

        svg.appendChild(defs);
        svg.appendChild(rect);
        div.appendChild(svg);
        td.appendChild(div); 
        td.appendChild(label);                  
        tr.appendChild(td);
        table.appendChild(tr);

        percent += eachPercent;
    }
}
function geoHighlight(id){
    var seletor;
    var style;

    seletor = "g.geoChartHighlight:hover path,path.geoChartHighlight:hover";

    style = document.createElement("style");
    style.setAttribute("id",id+"_style");
    style.innerHTML = seletor+"{"
        +"fill: "+xtrGrafico.Default.hover.stroke+";"      
        +"stroke: "+xtrGrafico.Default.hover.fill+";"   
    +"}";

    document.body.appendChild(style);
}