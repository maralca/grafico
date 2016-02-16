function geoAreaGrafico(compositeData,coordenadas,red,green,blue,scale){
    var coordenada;
    var coordenadaIndex;

    var prop1,prop2,prop3,prop3;
    var obj1,obj2,obj3,obj3;

    var objBrasil,objEstado,objRegiao,objMunicipio;

    var regiao,estado,municipio;
    var gScale,gTranslate,gBrasil,gRegiao,gEstado,gMunicipio;
    var pathEstado,pathMunicipio;

    var boundingScale,boundingGrafico;
    var aspectRatio;
    var refX,refY;
    var factorX,factorY;

    var grafico;
    var tab_exibir;

    var rotulos,rotulo;
    var titulo;
    var rotulosFormatados;
    var serie;
    var serieTitulo;
    var valores,valor;
    var titulos;
    var unidade;

    var rotuloIndex;
    var index;

    var max,min,sum;
    var percent;

    var color,opacity;

    var xtrTooltip;
    var xtrSVG;

    var info,infoObj;

    info = XTR_MUNICIPIOS_INFO;

    rotulos = compositeData.rotulos;
    rotulosFormatados = compositeData.rotulosFormatados;
    serie = compositeData.series[0];
    titulo = compositeData.titulos.identificadores;
    valores = serie.dados;
    unidade = serie.unidade;
    serieTitulo = serie.titulo;

    max = XtrGraficoUtil.maximum(valores);
    min = XtrGraficoUtil.minimum(valores);
    sum = XtrGraficoUtil.somatorium(valores)

    xtrTooltip = new XtrTooltip("tooltip_geochart","cima");

    grafico = document.getElementById(xtrGrafico.ID_GRAFICO);
    tab_exibir = document.getElementById("tab_exibir");

    geoHighlight("geoChart");
    
    xtrSVG = {
        "id": "geoChart",
        "class": "geoChart",
        "width": grafico.offsetWidth,
        "height": grafico.offsetHeight,
        "viewBox": "0 0 "+grafico.offsetWidth+" "+grafico.offsetHeight,
        "preserveAspectRatio": "xMinYMin"                  
    };                   
    xtrSVG = new XtrSVG(xtrSVG,xtrGrafico.ID_GRAFICO);


    gScale = {
        "id": "geoChartScale"
    }
    gScale = xtrSVG.append(gScale);     

    gTranslate = {
        "id": "geoChartTranslate",
        "parent": gScale
    }
    gTranslate = xtrSVG.append(gTranslate);
    
    obj1 = coordenadas;

    if(XtrGraficoUtil.isobj(obj1["BRASIL"])){
        gBrasil = {
            id: "BRASIL",
            parent: gTranslate,
            "class": "brasil"
        };
        gBrasil = xtrSVG.append(gBrasil);

        objBrasil = obj1["BRASIL"];

        for(prop1 in objBrasil){

            objRegiao = objBrasil[prop1];
            regiao = prop1;

            gRegiao = {
                id: regiao,
                parent: gBrasil,
                "class": "regiao"
            };
            gRegiao = xtrSVG.append(gRegiao);
            for(prop2 in objRegiao){
                obj2 = objRegiao[prop2];
                if(XtrGraficoUtil.isset(obj2.coordenadas)){ //ESTADO_BRASIL  
                    gBrasil.setAttrs({
                        "transform": "scale(1,-1)"
                    });

                    rotuloIndex = rotulos.indexOf(prop2);
                    rotulo = rotulosFormatados[rotuloIndex];
                    valor = valores[rotuloIndex];
                    percent = valor / max;

                    objEstado = obj2;
                    pathEstado = {
                        id: prop2,
                        tag: objEstado.tag,
                        parent: gRegiao,
                        "data-value":valor,
                        "data-percent": percent,
                        fill: "rgba("+red+","+green+","+blue+","+percent+")",
                        "class": "estado geoChartHighlight"
                    };
                    pathEstado[objEstado.attr] = objEstado.coordenadas;
                    pathEstado = xtrSVG.append(pathEstado);

                    xtrTooltip.addTrigger(pathEstado,paramTooltip(rotulo,titulo,serieTitulo,valor,unidade));
                }
                else{ //MUNICIPIO_BRASIL                    
                    objEstado = obj2;
                    gEstado = {
                        id: prop2,
                        parent: gRegiao,
                        "class": "estado"
                    };                        
                    gEstado = xtrSVG.append(gEstado);
                    for(prop3 in objEstado){
                        objMunicipio = objEstado[prop3];
                        gMunicipio = {
                            id: prop3,
                            parent: gEstado,
                            "class": "geoChartHighlight"
                        };
                        gMunicipio = xtrSVG.append(gMunicipio);

                        infoObj = getObject(info,"id",prop3.substr(1));
                        if(!infoObj){
                            infoObj = getObject(info,"id","1"+prop3.substr(1));
                        }
                        if(infoObj){
                            rotuloIndex = rotulos.indexOf(infoObj.name);
                            rotulo = rotulosFormatados[rotuloIndex];
                            valor = valores[rotuloIndex];
                        }
                        else{
                            console.warn("Grafico Geografico, cidade de id",prop3.substr(1),"não foi encontrada");
                            rotulo = "Não encontrado";
                            valor = "0";
                        }
                        percent = valor / max * scale;

                        xtrTooltip.addTrigger(gMunicipio,paramTooltip(rotulo,titulo,serieTitulo,valor,unidade));
                        for(index = 0; objMunicipio.coordenadas.length > index; index++){
                            coordenadas = objMunicipio.coordenadas[index];
                            pathMunicipio = {
                                tag: "path",
                                "d": coordenadas,
                                fill: "rgba("+red+","+green+","+blue+","+percent+")"
                            }
                            pathMunicipio = xtrSVG.append(pathMunicipio);
                        }
                    }
                }
            }
        }
    }
    else{
        for(prop1 in obj1){
            obj2 = obj1[prop1];
            if(prop1.length == 2){
                nomeEstado = prop1;
                objEstado = obj1;
                objMunicipios = objEstado[nomeEstado];
                gEstado = {
                    id: nomeEstado,
                    parent: gTranslate,
                    "class": "estado"
                };

                gEstado = xtrSVG.append(gEstado);
                for(idMunicipio in objMunicipios){
                    objMunicipio = objMunicipios[idMunicipio];
                    gMunicipio = {
                        id: idMunicipio,
                        parent: gEstado,
                        "class": "municipio"
                    };
                    gMunicipio = xtrSVG.append(gMunicipio);
                    
                    infoObj = getObject(info,"id",idMunicipio.substr(1));
                    if(!infoObj){
                        infoObj = getObject(info,"id","1"+idMunicipio.substr(1));
                    }
                    if(infoObj){
                        rotuloIndex = rotulos.indexOf(infoObj.name);
                        rotulo = rotulosFormatados[rotuloIndex];
                        valor = valores[rotuloIndex];
                    }

                    percent = valor / sum * scale;

                    for(index = 0; objMunicipio.coordenadas.length > index; index++){
                        caminho = objMunicipio.coordenadas[index];
                        pathMunicipio = {
                            tag: objMunicipio.tag,
                            "class": " municipio geoChartHighlight",

                            parent: gMunicipio,
                            fill: "rgba("+red+","+green+","+blue+","+percent+")"
                        };
                        pathMunicipio[objMunicipio.attr] = caminho;
                        pathMunicipio = xtrSVG.append(pathMunicipio);
                        xtrTooltip.addTrigger(gMunicipio,paramTooltip(rotulo,titulo,serieTitulo,valor,unidade));
                    }
                }
            }
        }
    }

    boundingScale = gScale.getBBox();

    aspectRatio = boundingScale.width / boundingScale.height;

    refX =   grafico.offsetWidth  * 0.9 * aspectRatio / boundingScale.width;
    refY = - grafico.offsetHeight * 0.9 / aspectRatio / boundingScale.height;

    if(grafico.offsetHeight > grafico.offsetWidth){
        refY = -refX
    }
    else{
        refX = -refY;
    }

    gScale.setAttrs({
        "transform": "matrix("+refX+" 0 0 "+refY+" 0 0"+")"
    });
    
    factorX = Math.floor(boundingScale.x) * (-1);
    factorY = Math.floor(boundingScale.y + boundingScale.height) * (-1);

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

function getObject(array,property,value){
    return array.filter(function(item){return item[property] == value})[0];
}
function paramTooltip(Rotulo,TituloIdentificador,Titulo,Valor,Unidade){

    Rotulo = Rotulo.split("-");
    if(XtrGraficoUtil.isarray(Rotulo) && Rotulo.length > 1){
        Rotulo = Rotulo[1].trim()+"&nbsp;<span class='sub'>("+Rotulo[0].trim()+")</span>";
    }
    else{        
        Rotulo = Rotulo[0];
    }
    return {
        content: "<p>"+TituloIdentificador+"&nbsp;:&nbsp;"+Rotulo+"</p>"
        +"<p>"+Titulo+"&nbsp;:&nbsp;"+Valor+"<span class='sub'>"+Unidade+"</sub>"+"</p>"
    }

}
function geoAreaLegenda(compositeData,red,green,blue,n,percent,scale,style){
    var legenda;
    var legendaAttrs,legendaAttr;
    var legendaAttrIndex;

    var svg;

    var label;

    var defs,rect,text;

    var series,serie;

    var sum,max,min;

    var table,tr,td,div;

    var style;
    var styleProp,styleValue;

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

    legendaAttrs = legenda.attributes;
    for(legendaAttrIndex = 0; legendaAttrs.length > legendaAttrIndex; legendaAttrIndex++){
        legendaAttr = legendaAttrs[legendaAttrIndex].nodeName;
        table.setAttribute(legendaAttr,legenda.getAttribute(legendaAttr));
    };
    if(XtrGraficoUtil.isset(style)){
        for(styleProp in style){
            styleValue = style[styleProp];
            table.style.setProperty(styleProp,styleValue);
        }
    }
    table.style.setProperty("width","100%");

    legenda.parentNode.appendChild(table);
    legenda.remove();

    sum = sum.toString();

    var sumRoundSize = 4;

    var fs = sum.substr(0,sum.length-sumRoundSize);
    fs = parseFloat(fs);
    sum = fs * Math.pow(10,sumRoundSize);

    var max2min = max - min;
    var max2minEach = max2min/n;
    percentInicial = 0.0125;
    percent = percentInicial;

    while(percent <= 1){
        var first = percent == percentInicial;
        var last = percent+eachPercent > 1;

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

        var something = first ? "<span> < </span>" : last ? "<span> > </span>" : "";

        label.innerHTML = something+(max*percent).toFixed(0);

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