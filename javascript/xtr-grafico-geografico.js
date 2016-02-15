function geoAreaGrafico(compositeData,coordenadas,red,green,blue,scale){
    var coordenada;
    var coordenadaIndex;

    var gScale,gTranslate;

    var prop1,prop2,prop3,prop3;
    var obj1,obj2,obj3,obj3;

    var regiao,estado,municipio;
    var gBrasil,gRegiao,gEstado,gMunicipio;
    var pathEstado,pathMunicipio;

    var grafico;

    var rotulos;
    var serie;
    var serieTitulo;
    var valores,valor;
    var titulos;
    var unidade;

    var max,min,sum;

    var color,opacity;

    var xtrTooltip;
    var xtrSVG;

    var isbr;

    rotulos = compositeData.rotulos;
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

    console.log(coordenadas);

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
    
    obj1 = coordenadas;

    if(XtrGraficoUtil.isobj(obj1["BRASIL"])){
        gBrasil = {
            id: "BRASIL",
            parent: gTranslate
        };
        gBrasil = xtrSVG.append(gBrasil);

        objBrasil = obj1["BRASIL"];

        for(prop1 in objBrasil){
            gBrasil.setAttrs({
                "transform": "scale(1,1)"
            });

            objRegiao = objBrasil[prop1];
            regiao = prop1;

            gRegiao = {
                id: regiao,
                parent: gBrasil
            };
            gRegiao = xtrSVG.append(gRegiao);
            for(prop2 in objRegiao){
                obj2 = objRegiao[prop2];                

                if(XtrGraficoUtil.isset(obj2.nome)){ //ESTADO_BRASIL   

                    rotuloIndex = getRotuloIndex(rotulos,obj2.nome);
                    rotulo = rotulos[rotuloIndex];
                    valor = valores[rotuloIndex];

                    percent = valor / max * scale;

                    objEstado = obj2;
                    pathEstado = {
                        id: objEstado.nome,
                        tag: objEstado.tag,
                        parent: gRegiao,
                        fill: "rgba("+red+","+green+","+blue+","+percent+")",
                        "class": "geoChartHighlight"
                    };
                    pathEstado[objEstado.attr] = objEstado.coordenada;
                    pathEstado = xtrSVG.append(pathEstado);

                    xtrTooltip.addTrigger(pathEstado,paramTooltip(rotulo,titulo,serieTitulo,valor,unidade));
                }
                else{ //MUNICIPIO_BRASIL                    
                    objEstado = obj2;
                    gEstado = {
                        id: prop2,
                        parent: gRegiao
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
                        if(!objMunicipio.nome){
                            console.log(prop3);
                            continue;
                        }
                        rotuloIndex = getRotuloIndex(rotulos,objMunicipio.nome);
                        if(rotuloIndex >= 0){
                            rotulo = rotulos[rotuloIndex];
                            valor = valores[rotuloIndex];
                        }
                        else{
                            rotulo = "ERRRRRo";
                            valor = 0;
                            console.log(objMunicipio.nome);
                            console.log(rotulos);
                        }
                        percent = valor / max * scale;

                        xtrTooltip.addTrigger(gMunicipio,paramTooltip(rotulo,titulo,serieTitulo,valor,unidade));
                        for(index = 0; objMunicipio.coordenadas.length > index; index++){
                            coordenadas = objMunicipio.coordenadas[index];
                            pathCidade = {
                                tag: "path",
                                "d": coordenadas,
                                fill: "rgba("+red+","+green+","+blue+","+percent+")"
                            }
                            pathCidade = xtrSVG.append(pathCidade);
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
                    parent: gTranslate
                };

                gEstado = xtrSVG.append(gEstado);
                for(idMunicipio in objMunicipios){
                    objMunicipio = objMunicipios[idMunicipio];
                    gMunicipio = {
                        id: idMunicipio,
                        parent: gEstado,
                        "class": "geoChartHighlight"
                    };
                    gMunicipio = xtrSVG.append(gMunicipio);
                    rotuloIndex = getRotuloIndex(rotulos,objMunicipio.nome);
                    rotulo = rotulos[rotuloIndex];
                    valor = valores[rotuloIndex];

                    percent = valor / sum * scale;

                    for(index = 0; objMunicipio.coordenadas.length > index; index++){
                        caminho = objMunicipio.coordenadas[index];
                        pathMunicipio = {
                            tag: objMunicipio.tag,
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

    bb = gScale.getBBox();

    bounding = grafico.getBoundingClientRect();

    aspectRatio = bb.width / bb.height;

    refX =   grafico.offsetWidth  * 0.9 * aspectRatio / bb.width;
    refY = - grafico.offsetHeight * 0.9 / aspectRatio / bb.height;

    if(grafico.offsetHeight > grafico.offsetWidth){
        refY = -refX
    }
    else{
        refX = -refY;
    }

    gScale.setAttrs({
        "transform": "matrix("+refX+" 0 0 "+refY+" 0 0"+")"
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
function getRotuloIndex(rotulos,nome){
    var rotulosClone;
    var rotulo;
    var rotuloAux;
    var rotuloIndex;

    nome = nome.replace("d`","D'");
    
    return rotulos.indexOf(nome);
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