function geoAreaGrafico(compositeData,kwargs){
    if(XtrGraficoUtil.isobj(kwargs)){
        coordenadas = kwargs.coordenadas;
        red = kwargs.color.red;
        green = kwargs.color.green;
        blue = kwargs.color.blue;
    }
    else{
        return;
    }
    var coordenada;
    var coordenadaIndex;

    var prop1,prop2,prop3,prop3;
    var obj1,obj2,obj3,obj3;

    var objBrasil,objEstado,objRegiao,objMunicipio;

    var regiao,estado,municipio;
    var gScale,gTranslate,gBrasil,gRegiao,gEstado,gMunicipio;
    var gSubId,gSub;
    var pathEstado,pathMunicipio;

    var boundingScale,boundingGrafico;
    var aspectRatio;
    var refX,refY;
    var factorX,factorY;

    var grafico;
    var tab_exibir;

    var tipo;
    var propName;
    var links;
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

    var addRed;
    var addGreen;
    var addBlue;

    info = XTR_MUNICIPIOS_INFO;

    tipo = compositeData.tipo;
    links = compositeData.links;
    rotulos = compositeData.rotulos;
    rotulosFormatados = compositeData.rotulosFormatados;

    serie = compositeData.series[0];
    titulo = compositeData.titulos.identificadores;
    valores = serie.dados;
    formatados = serie.dadosFormatados;
    unidade = serie.unidade;
    serieTitulo = serie.titulo;

    subIds = [];
    gSubs = {};

    addRed = 0;
    addGreen = 0;
    addBlue = 0;

    offsetRed = -10;
    offsetBlue = 0;
    offsetGreen = 0;

    propName = tipo.split("/")[1];
    if(propName.indexOf("muni") >= 0){
        propName = "nome";
    }
    else if(propName.indexOf("micro") >= 0){
        propName = "microrregiao";
    }
    else if(propName.indexOf("meso") >= 0){
        propName = "mesorregiao";
    }

    max = XtrGraficoUtil.maximum(valores);
    min = XtrGraficoUtil.minimum(valores);
    sum = XtrGraficoUtil.somatorium(valores)

    xtrTooltip = new XtrTooltip("tooltip_geochart","cima");

    grafico = document.getElementById(xtrGrafico.ID_GRAFICO);
    tab_exibir = document.getElementById("tab_exibir");

    function getPercent(valor){
        return valor / max;
    }
    
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
        "id": "geoChartScale",
        parent: xtrSVG._
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
            "id": "BRASIL",
            "parent": gTranslate,
            "class": "brasil"
        };
        gBrasil = xtrSVG.append(gBrasil);

        objBrasil = obj1["BRASIL"];

        for(prop1 in objBrasil){

            objRegiao = objBrasil[prop1];
            regiao = prop1;

            gRegiao = {
                "id": regiao,
                "parent": gBrasil,
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

                    percent = getPercent(valor);

                    objEstado = obj2;
                    pathEstado = {
                        "id": prop2,
                        "tag": objEstado.tag,
                        "parent": gRegiao,
                        "data-value":valor,
                        "data-percent": percent,
                        "fill": "rgba("+red+","+green+","+blue+","+percent+")",
                        "class": "estado geoChartHighlight"
                    };
                    pathEstado[objEstado.attr] = objEstado.coordenadas;
                    pathEstado = xtrSVG.append(pathEstado);
                    linkOnClick(pathEstado,links,rotuloIndex);
                    xtrTooltip.addTrigger(pathEstado,
                        paramTooltip(
                            rotulo,
                            titulo,
                            serieTitulo,
                            valor,
                            unidade
                        )
                    );
                }
                else{ //MUNICIPIO_BRASIL                    
                    objMunicipios = obj2;
                    gEstado = {
                        "id": prop2,
                        "parent": gRegiao,
                        "class": "estado"
                    };                        
                    gEstado = xtrSVG.append(gEstado);
                    for(idMunicipio in objMunicipios){
                        objMunicipio = objMunicipios[idMunicipio];

                        gMunicipio = {
                            id: idMunicipio
                        };

                        infoObj = getObject(info,"id",idMunicipio.substr(1));
                        if(!infoObj){
                            infoObj = getObject(info,"id","1"+idMunicipio.substr(1));
                        }
                        if(propName != "nome"){
                            gSubId = infoObj[propName];
                            console.log(gSubId);
                            gSub = document.getElementById(gSubId);
                            if(gSub == null){
                                gSub = {
                                    "id": gSubId,
                                    "class": propName+" geoChartHighlight",
                                    "parent": gEstado,
                                    "data-red": addRed+offsetRed,
                                    "data-blue": addBlue+offsetBlue,
                                    "data-green": addGreen+offsetGreen
                                };
                                gSub = xtrSVG.append(gSub);
                                linkOnClick(gSub,links,rotuloIndex);
                                xtrTooltip.addTrigger(gSub,
                                    paramTooltip(
                                        rotulo,
                                        titulo,
                                        serieTitulo,
                                        valor,
                                        unidade
                                    )
                                );
                            }
                            addRed = parseInt(gSub.getAttribute("data-red"));
                            addBlue = parseInt(gSub.getAttribute("data-blue"));
                            addGreen = parseInt(gSub.getAttribute("data-green"));

                            gMunicipio["parent"] = gSub;
                            gMunicipio["class"] = "municipio";
                            gMunicipio = xtrSVG.append(gMunicipio);

                            gHighlight = gSub;
                        }
                        else{ 
                            gMunicipio["parent"] = gEstado;
                            gMunicipio["class"] = "municipio geoChartHighlight";
                            gMunicipio = xtrSVG.append(gMunicipio);
                            linkOnClick(gMunicipio,links,rotuloIndex);
                            xtrTooltip.addTrigger(gMunicipio,
                                paramTooltip(
                                    rotulo,
                                    titulo,
                                    serieTitulo,
                                    valor,
                                    unidade
                                )
                            );
                            gHighlight = gMunicipio;
                        }

                        if(infoObj){
                            rotuloIndex = rotulos.indexOf(infoObj[propName]);
                            if(rotuloIndex >= 0){                     
                                rotulo = rotulosFormatados[rotuloIndex];
                                rotulo = rotulo.capitalize();
                                valor = valores[rotuloIndex];
                            }
                            else{
                                rotulo = infoObj[propName].capitalize() 
                                + "&nbsp;<span class='sub'>(Não Consta)</span>";
                                valor = "-";
                                XtrGraficoUtil.removeClass(gHighlight,"geoChartHighlight");
                                xtrTooltip.removeTrigger(gHighlight);
                            }
                        }                    
                        else{
                            console.warn("Grafico Geografico, cidade de id",idMunicipio.substr(1),"não foi encontrada");
                            rotulo = "Não encontrado";
                            valor = 0;
                        }

                        percent = getPercent(valor);

                        for(index = 0; objMunicipio.coordenadas.length > index; index++){
                            caminho = objMunicipio.coordenadas[index];
                            pathMunicipio = {
                                "tag": objMunicipio.tag,
                                "parent": gMunicipio,
                                "fill": "gainsboro",                                
                                "stroke": "gainsboro"
                            };
                            if(valor != "-"){
                                pathMunicipio.fill = "rgba("
                                    +(red+addRed)+","
                                    +(green+addGreen)+","
                                    +(blue+addBlue)+","
                                    +percent
                                +")";
                                pathMunicipio.stroke =  XtrGraficoUtil.color.shade(pathMunicipio.fill,0.2);
                            }
                            pathMunicipio[objMunicipio.attr] = caminho;
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
                    "id": nomeEstado,
                    "parent": gTranslate,
                    "class": "estado"
                };

                gEstado = xtrSVG.append(gEstado);
                for(idMunicipio in objMunicipios){
                    objMunicipio = objMunicipios[idMunicipio];

                    gMunicipio = {
                        "id": idMunicipio
                    };

                    infoObj = getObject(info,"id",idMunicipio.substr(1));
                    if(!infoObj){
                        infoObj = getObject(info,"id","1"+idMunicipio.substr(1));
                    }
                    if(propName != "nome"){
                        gSubId = infoObj[propName];
                        gSub = document.getElementById(gSubId);
                        if(gSub == null){
                            gSub = {
                                "id": gSubId,
                                "class": propName+" geoChartHighlight",
                                "parent": gEstado,
                                "data-red": addRed+offsetRed,
                                "data-blue": addBlue+offsetBlue,
                                "data-green": addGreen+offsetGreen
                            };
                            gSub = xtrSVG.append(gSub);
                            linkOnClick(gSub,links,rotuloIndex);                            
                            xtrTooltip.addTrigger(gSub,
                                paramTooltip(
                                    rotulo,
                                    titulo,
                                    serieTitulo,
                                    valor,
                                    unidade
                                )
                            ); 
                        }
                        addRed = parseInt(gSub.getAttribute("data-red"));
                        addBlue = parseInt(gSub.getAttribute("data-blue"));
                        addGreen = parseInt(gSub.getAttribute("data-green"));

                        gMunicipio["parent"] = gSub;
                        gMunicipio["class"] = "municipio";
                        gMunicipio = xtrSVG.append(gMunicipio);

                        gHighlight = gSub;
                    }
                    else{ 
                        gMunicipio["parent"] = gEstado;
                        gMunicipio["class"] = "municipio geoChartHighlight";
                        gMunicipio = xtrSVG.append(gMunicipio);
                        linkOnClick(gMunicipio,links,rotuloIndex);                            
                        xtrTooltip.addTrigger(gMunicipio,
                            paramTooltip(
                                rotulo,
                                titulo,
                                serieTitulo,
                                valor,
                                unidade
                            )
                        );
                        gHighlight = gMunicipio;
                    }

                    if(infoObj){
                        rotuloIndex = rotulos.indexOf(infoObj[propName]);
                        if(rotuloIndex >= 0){                     
                            rotulo = rotulosFormatados[rotuloIndex];
                            rotulo = rotulo.capitalize();
                            valor = valores[rotuloIndex];
                        }
                        else{
                            rotulo = infoObj[propName].capitalize() 
                            + "&nbsp;<span class='sub'>(Não Consta)</span>";
                            valor = "-";
                            XtrGraficoUtil.removeClass(gHighlight,"geoChartHighlight");
                            xtrTooltip.removeTrigger(gHighlight);
                        }
                    }                    
                    else{
                        console.warn("Grafico Geografico, cidade de id",idMunicipio.substr(1),"não foi encontrada");
                        rotulo = "Não encontrado";
                        valor = 0;
                    }

                    percent = getPercent(valor);

                    for(index = 0; objMunicipio.coordenadas.length > index; index++){
                        caminho = objMunicipio.coordenadas[index];
                        pathMunicipio = {
                            "tag": objMunicipio.tag,
                            "parent": gMunicipio,
                            "fill": "gainsboro",
                            "stroke": "gainsboro"
                        };
                        if(valor != "-"){
                            pathMunicipio.fill = "rgba("
                                +(red+addRed)+","
                                +(green+addGreen)+","
                                +(blue+addBlue)+","
                                +percent
                            +")";
                            pathMunicipio.stroke = XtrGraficoUtil.color.shade(pathMunicipio.fill,0.5);
                        }
                        pathMunicipio[objMunicipio.attr] = caminho;
                        pathMunicipio = xtrSVG.append(pathMunicipio);                        
                    }
                }
            }
        }
    }

    var BBoxScale = gScale.getBBox();

    aspectRatio = BBoxScale.width / BBoxScale.height;

    refX =   grafico.offsetWidth  * 0.9 * aspectRatio / BBoxScale.width;
    refY = - grafico.offsetHeight * 0.9 / aspectRatio / BBoxScale.height;

    if(grafico.offsetHeight > grafico.offsetWidth){
        refY = -refX
    }
    else{
        refX = -refY;
    }

    gScale.setAttrs({
        "transform": "matrix("+refX+" 0 0 "+refY+" 0 0"+")"
    });

    boundingScale = gScale.getBoundingClientRect();

    var unitPerPxWidth = BBoxScale.width / boundingScale.width; // SVGunit per px
    var unitPerPxHeight = BBoxScale.height / boundingScale.height; // SVGunit per px
    
    var svgBounding = xtrSVG._.getBoundingClientRect();

    var restWidth = svgBounding.width - boundingScale.width;
    var restHeight = svgBounding.height - boundingScale.height;

    factorX = Math.floor(BBoxScale.x) * (-1);
    factorX = factorX + restWidth * unitPerPxWidth / 2;

    factorY = Math.floor(BBoxScale.y + BBoxScale.height) * (-1);
    factorY = factorY - restHeight * unitPerPxHeight / 2;

    gTranslate.setAttrs({
        "transform": "translate("+ factorX +"," + factorY +")"
    });

    geoHighlight("geoChart");
}
function linkOnClick(target,links,index){
    target.setAttribute("href",links[index]);
    target.setAttribute("data-index",index);                    
    target.addEventListener("click",function(){
        var link;
        var linkIndex;

        linkIndex = this.getAttribute("data-index");

        console.log(linkIndex);
        if(linkIndex == -1){
            return;
        }

        link = links[linkIndex];

        location.href = link;
    }); 
}
function getObject(array,property,value){
    return array.filter(function(item){return item[property] == value})[0];
}
function paramTooltip(Rotulo,TituloIdentificador,Titulo,Valor,Unidade){
    try{
        Valor = Valor > 1 ? Valor.toFixed(0) : Valor.toFixed(3);
    }
    catch(e){}

    return {
        content: "<p>"+TituloIdentificador+"&nbsp;:&nbsp;"+Rotulo+"</p>"
        +"<p>"+Titulo+"&nbsp;:&nbsp;"+Valor+"<span class='sub'>"+Unidade+"</sub>"+"</p>"
    }

}
function geoAreaLegenda(compositeData,kwargs){
    if(XtrGraficoUtil.isobj(kwargs)){
        red = kwargs.color.red;
        green = kwargs.color.green;
        blue = kwargs.color.blue;
        n = kwargs.amount;
        style = kwargs.style;
    }
    else{
        return;
    }

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

        var something = first ? "<span>&nbsp;&le;&nbsp;</span>" : last ? "<span>&nbsp;&ge;&nbsp;</span>" : "";

        var valor = max*percent;

        valor = valor > 1 ? valor.toFixed(0) : valor.toFixed(3);

        label.innerHTML = something+valor;

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
    
    seletor = ".geoChartHighlight:hover";

    var elements = document.querySelectorAll(".geoChartHighlight");

    var element;
    var elementIndex;
    for(elementIndex = 0; elements.length > elementIndex; elementIndex++){
        element = elements[elementIndex];

        element.setAttribute("data-defaultFill",element.getAttributeNS(null,"fill"));

        element.addEventListener("mouseover",function(){
            var fill;

            fill = this.getAttributeNS(null,"fill");           

            fill = XtrGraficoUtil.color.rotate(fill,-5,1);

            this.setAttributeNS(null,"fill",fill);
        });
        element.addEventListener("mouseout",function(){
            var fill;

            fill = this.getAttribute("data-defaultFill");

            this.setAttributeNS(null,"fill",fill);
        });
    }

}