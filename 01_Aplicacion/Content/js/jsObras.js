
$(document).ready(function () {
    $("#hdnDep").val("00");
    ReporteGeografico();
    ListReporteObras();

    $("#ddlDepartamento").change(function () {
        $("#hdnDep").val($("#ddlDepartamento").val());
        $("#ddlProvincia").val("00");
        $("#ddlDistrito").val("00");
        ddlProvincia($("#hdnDep").val());
        ddlDistrito("0000");
        ListReporteObras();
        if ($("#hdnDep").val() == "00") {
            ReporteGeografico()
        } else {
            AbrirDepartamentoSelect($("#hdnDep").val());
        }
    });

    $("#ddlProvincia").change(function () {
        ddlDistrito($("#hdnDep").val() + $("#ddlProvincia").val())
        if ($("#ddlProvincia").val() == "00")
        {
            AbrirDepartamentoSelect($("#hdnDep").val());
        }
        else
        {
            AbrirProvincia($("#hdnDep").val(), $("#ddlProvincia").val())
        }
        
        ListReporteObras();
    });
    $("#ddlDistrito").change(function () {
        if ($("#ddlDistrito").val() == "00") {
            AbrirProvincia($("#ddlDepartamento").val(), $("#ddlProvincia").val())
        }
        else
        {
            AbrirDistritoUnicoSelect($("#hdnDep").val(), $("#ddlProvincia").val(), $("#ddlDistrito").val());
        }
        
        ListReporteObras();
    });
    

    $('#btnOcultar').click(function(){
        if ($('#divFiltro').hasClass("element-toggle-hide-left")) {
            $('#divFiltro').removeClass("element-toggle-hide-left");
            $('#divBtnFiltro').removeClass("left-hiden-div");
            $("#btnOcultar").removeClass("btn-transparent-background-oculto");
        }else{
            $('#divFiltro').addClass("element-toggle-hide-left");
            $('#divBtnFiltro').addClass("left-hiden-div");
            $("#btnOcultar").addClass("btn-transparent-background-oculto");
        }
    });
    $('#btnOcultarInfo').click(function(){
        if ($('#divInfo').hasClass("element-toggle-hide")) {
            $('#divInfo').removeClass("element-toggle-hide");
            $('#divBtnInfo').removeClass("right-hiden-div");
            $("#btnOcultarInfo").removeClass("btn-transparent-background-oculto");
        }else{
            $('#divInfo').addClass("element-toggle-hide");
            $('#divBtnInfo').addClass("right-hiden-div");
            $("#btnOcultarInfo").addClass("btn-transparent-background-oculto");
        }
    });

    $("input[name=rdbModalidad]").change(function () {
        ListReporteObras();
        debugger;
        if ($("input[name=rdbModalidad]:checked").val() == 0)
        {
            $(".contrata").addClass("d-none");
        }
        else if ($("input[name=rdbModalidad]:checked").val() == 190)
        {
            $(".contrata").addClass("d-none");
        }
        else if ($("input[name=rdbModalidad]:checked").val() == 22)
        {
            $(".contrata").removeClass("d-none");
        }

        if ($("#hdnDep").val() == "00") {
            ReporteGeografico()
        }
        else
        {
            if ($("#ddlProvincia").val() == "00")
            {
                AbrirDepartamentoSelect($("#hdnDep").val());
            }
            else
            {
                if ($("#ddlDistrito").val() == "00") {
                    AbrirProvincia($("#hdnDep").val(), $("#ddlProvincia").val())
                    ListReporteObras();
                }
                else
                {
                    AbrirDistritoUnicoSelect($("#hdnDep").val(), $("#ddlProvincia").val(), $("#ddlDistrito").val());
                    ListReporteObras();
                }
            }  
        }
    });
});

function FiltrarDepartamento(dep) {
    $("#hdnDep").val(dep);
    $("#ddlProvincia").val("00");
    $("#ddlDistrito").val("00");
    ddlProvincia(dep);
    ddlDistrito("0000");
    ListReporteObras();

    if (dep == "00") {
        ReporteGeografico()
    } else {
        $("#imgRegionSelect").attr("src", "../Content/Images/Regiones/" + dep + ".jpg");
        switch (dep) {
            case "01":
                $("#lblRegionSelect").text("AMAZONAS");
                break;
            case "02":
                $("#lblRegionSelect").text("ANCASH");
                break;
            case "03":
                $("#lblRegionSelect").text("APURIMAC");
                break;
            case "04":
                $("#lblRegionSelect").text("AREQUIPA");
                break;
            case "05":
                $("#lblRegionSelect").text("AYACUCHO");
                break;
            case "06":
                $("#lblRegionSelect").text("CAJAMARCA");
                break;
            case "07":
                $("#lblRegionSelect").text("CALLAO");
                break;
            case "08":
                $("#lblRegionSelect").text("CUSCO");
                break;
            case "09":
                $("#lblRegionSelect").text("HUANCAVELICA");
                break;
            case "10":
                $("#lblRegionSelect").text("HUANUCO");
                break;
            case "11":
                $("#lblRegionSelect").text("ICA");
                break;
            case "12":
                $("#lblRegionSelect").text("JUNIN");
                break;
            case "13":
                $("#lblRegionSelect").text("LA LIBERTAD");
                break;
            case "14":
                $("#lblRegionSelect").text("LAMBAYEQUE");
                break;
            case "15":
                $("#lblRegionSelect").text("LIMA");
                break;
            case "16":
                $("#lblRegionSelect").text("LORETO");
                break;
            case "17":
                $("#lblRegionSelect").text("MADRE DE DIOS");
                break;
            case "18":
                $("#lblRegionSelect").text("MOQUEGUA");
                break;
            case "19":
                $("#lblRegionSelect").text("PASCO");
                break;
            case "20":
                $("#lblRegionSelect").text("PIURA");
                break;
            case "21":
                $("#lblRegionSelect").text("PUNO");
                break;
            case "22":
                $("#lblRegionSelect").text("SAN MARTIN");
                break;
            case "23":
                $("#lblRegionSelect").text("TACNA");
                break;
            case "24":
                $("#lblRegionSelect").text("TUMBES");
                break;
            case "25":
                $("#lblRegionSelect").text("UCAYALI");
                break;
        }
        $("#divDeps").addClass("d-none");
        $("#divBuscador").addClass("d-none");
        $("#divDep").removeClass("d-none");
        AbrirDepartamentoSelect(dep);
    } 
}
function volver() {
    $("#divDeps").removeClass("d-none");
    $("#divBuscador").removeClass("d-none");
    $("#divDep").addClass("d-none");
    $("#hdnDep").val("00");
    $("#ddlProvincia").val("00");
    $("#ddlDistrito").val("00");
    ReporteGeografico();
    ListReporteObras();
}

function ddlProvincia(Id) {
    $.get("/MonitoreoPIASAR/ddlProvincia?Id=" + Id, function (data, status) {
        $("#ddlProvincia").empty();
        
        if (data.length > 0) {
            $.each(data, function (i, data) {
                $("#ddlProvincia").append('<option value="'
                +data.Value + '">'
                +data.Text + '</option>');
            });
        } else {
                $("#ddlProvincia").append('<option value="00">[--Seleccione--]</option>');
        }
        
    });
    return false;
}
function ddlDistrito(Id) {
    $.get("/MonitoreoPIASAR/ddlDistrito?Id=" + Id, function (data, status) {
        $("#ddlDistrito").empty();
        if (data.length > 0) {
            $.each(data, function (i, data) {
                $("#ddlDistrito").append('<option value="'
                + data.Value + '">'
                + data.Text + '</option>');
            });
        } else {
            $("#ddlDistrito").append('<option value="00">[--Seleccione--]</option>');
        }
    });
    return false;
}

function GeneraPopUp(color, region, nroproyectos, costoinversion, autorizacion, manifiesto) {
    var PopUp = '<div class="tooltip-app" style="border-left: solid 3px ' + color + '"><p>' +
                        '<i class="fa fa-map-pin" aria-hidden="true"></i>&nbsp;' + region + '</p><p>' +
                        '<i class="fa fa-building-o" aria-hidden="true"></i>&nbsp;Nro. Proyectos: <b>' + nroproyectos + '</b></p><p>' +
                        '<i class="fa fa-money" aria-hidden="true"></i>&nbsp;Costo de Inversión: <b> S/.' + costoinversion + '</b></p><p>';

    if ($("input[name=rdbModalidad]:checked").val() == 0) {
        PopUp = PopUp + '<i class="fa fa-money" aria-hidden="true"></i>&nbsp;Total de Autorización de Gasto: <b> S/.' + autorizacion + '</b></p><p>' +
                        '<i class="fa fa-money" aria-hidden="true"></i>&nbsp;Total de Justificación de Gasto: <b> S/.' + manifiesto + '</b></p></div>';
    }
    else if ($("input[name=rdbModalidad]:checked").val() == 190) {
        PopUp = PopUp + '</div>';
    }
    else if ($("input[name=rdbModalidad]:checked").val() == 22) {
        PopUp = PopUp + '<i class="fa fa-money" aria-hidden="true"></i>&nbsp;Total de Autorización de Gasto: <b> S/.' + autorizacion + '</b></p><p>' +
                       '<i class="fa fa-money" aria-hidden="true"></i>&nbsp;Total de Justificación de Gasto: <b> S/.' + manifiesto + '</b></p></div>';
    }

                        

   return PopUp;
}

function GenerarPopUpCP(color,localidad,nrobeneficiarios,costoinversion,autorizacion,manifiesto) {
    var PopUp = '<div class="tooltip-app" style="border-left: solid 3px ' + color + '"><p>' +
                    '<i class="fa fa-map-pin" aria-hidden="true"></i>&nbsp;' + localidad + '</p><p>' +
                    '<i class="fa fa-building-o" aria-hidden="true"></i>&nbsp;Nro. Beneficiarios: <b>' + nrobeneficiarios + '</b></p><p>' +
                    '<i class="fa fa-money" aria-hidden="true"></i>&nbsp;Costo de Inversión: <b> S/.' + costoinversion + '</b></p><p>';

    if ($("input[name=rdbModalidad]:checked").val() == 0) {
        PopUp = PopUp + '<i class="fa fa-money" aria-hidden="true"></i>&nbsp;Total de Autorización de Gasto: <b> S/.' + autorizacion + '</b></p><p>' +
                        '<i class="fa fa-money" aria-hidden="true"></i>&nbsp;Total de Justificación de Gasto: <b> S/.' + manifiesto + '</b></p></div>';
    }
    else if ($("input[name=rdbModalidad]:checked").val() == 190) {
        PopUp = PopUp + '</div>';
    }
    else if ($("input[name=rdbModalidad]:checked").val() == 22) {
        PopUp = PopUp + '<i class="fa fa-money" aria-hidden="true"></i>&nbsp;Total de Autorización de Gasto: <b> S/.' + autorizacion + '</b></p><p>' +
                        '<i class="fa fa-money" aria-hidden="true"></i>&nbsp;Total de Justificación de Gasto: <b> S/.' + manifiesto + '</b></p></div>';
    }

                    
    return PopUp;
}


function ListReporteObras() {
    $.get("/ProyectosGeoreferenciadosPIASAR/ListReporteObra?dep=" + $("#hdnDep").val() + "&prov=" + $("#ddlProvincia").val() + "&dist=" + $("#ddlDistrito").val() + "&mod=" + $('input[name=rdbModalidad]:checked').val(), function (data, status) {

        $('#Region').html(data.UbicacionGeografica);
        $('#nroObrasG').html(formatInt(data.NroTotalObras));
        $('#montoTotalG').html("S/. " + formatMoney(data.CostoTotalObras));
        $('#nroBeneficiariosG').html(formatInt(data.NroTotalBeneficiarios));
        $('#nroConexionesAguaG').html(formatMoney(data.NroTotalConexionesAguas));
        $('#nroConexionesSaneamientoG').html(formatMoney(data.NroTotalConexionesSaneamiento));
        $('#mtoAutorizaciones').html("S/. " + formatMoney(data.MontoTotalAutorizaciones));
        $('#mtoManifiesto').html("S/. " + formatMoney(data.MontoTotalManifiestos));
        $('#mtoDesembolso').html("S/. " + formatMoney(data.MontoDesembolsado));
        $('#mtoPorcentaje').html(formatMoney(data.PorcentajeJustificado)+"%");
    });
};
function ReporteGeografico() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.getJSON("/ProyectosGeoreferenciadosPIASAR/ListDepartamento?mod=" + $('input[name=rdbModalidad]:checked').val(), function (data) {
        document.getElementById('weathermap').innerHTML = "<div id='map' style='position: static;z-index: 0;outline: none;height: 100vh;'></div>";
        var map = L.map('map').setView([-10.189967, -72.015152], 6);
        var tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }).addTo(map);
        $(".leaflet-control-zoom").css("visibility", "hidden");

        function style(feature) {
            var dep = data.find(x=>x.cod_depa == feature.properties.ubigeo);

            if ((dep.NroProyectos) > 0) {
                return {
                    weight: 2,
                    opacity: 1,
                    color: '#69afff',
                    dashArray: '3',
                    fillOpacity: 0.7,
                    fillColor: getColor(dep.NroProyectos)
                };
            } else {
                return {
                    weight: 0,
                    opacity: 0,
                    color: '#9e9e9eed',
                    dashArray: '1',
                    fillOpacity: 0,
                    fillColor: '#b5b0b075',
                };
            }
        }

        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 1,
                color: '#2196f3e3',
                dashArray: '',
                fillOpacity: 0.7,
                fillColor: '#2196f3ab',
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }

            //info.update(layer.feature.properties);
        }

        var geojson;

        function resetHighlight(e) {
            geojson.resetStyle(e.target);
            //info.update();
        }

        function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }

        geojson = L.geoJson(departamentos, {
            style: style,
            onEachFeature: onEachDepartamentos
        }).addTo(map);

        function getColor(d) {
            return d > 25 ? 'rgb(63, 128, 208)' :
                    d > 20 ? 'rgb(115, 178, 255)' :
                    d > 15 ? 'rgb(190, 232, 255)' :
                    d > 10 ? 'rgb(255, 235, 190)' :
                    d > 5 ? 'rgb(255, 180, 232)' :
                    d > 1 ? 'rgb(255, 220, 232)' :
                            '#b5b0b075';
        }

        var legend = L.control({ position: 'bottomleft' });

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'legend'),
                grades = [0, 1, 5, 10, 15, 20, 25],
                labels = [],
                from, to;
            labels.push("<div><h4>Nro. de Obras</h4>");

            for (var i = 0; i < grades.length; i++) {
                from = grades[i];
                to = grades[i + 1];

                labels.push('<i style="background:' + getColor(from + 1) + '"></i><span>' + from + (from != 0 ? (to ? '&ndash;' + to : '+') : '') + '</span><br>');
            }
            labels.push("</div>")
            div.innerHTML = labels.join('');
            return div;
        };

        legend.addTo(map);

        var customOptions = { 'className': 'custom-popup-map' }

        function onEachDepartamentos(feature, layer) {

            var dep = data.find(x=>x.cod_depa == feature.properties.ubigeo);

            var PopUp = GeneraPopUp(getColor(dep.NroProyectos), dep.Region, formatInt(dep.NroProyectos), formatMoney(dep.CostoInversion), formatMoney(dep.TotalAutorizacion), formatMoney(dep.TotalManifiesto));

          
            var html = '<div class="content-mark-map">' +
                        '<span class="circle-icon" style="background: #607D8B;animation: pulse 2s infinite;">' + formatInt(dep.NroProyectos) + '</span>' +
                        '<div><label class="map-label-icon">' + limparCadena(layer.feature.properties.nombre) + '</label></div>' + PopUp + '</div>';

            var myIcon = L.divIcon({ className: 'my-div-icon', iconSize: new L.Point(50, 50), html: html });
            var puntocentros = JSON.parse(layer.feature.properties.pointcenter);
            var lat = puntocentros[1], lng = puntocentros[0];
            var marker = L.marker([lat, lng], { icon: myIcon });
            marker.on('click', function () { AbrirProvincias(null, layer) });
            if (dep.NroProyectos > 0) {
                marker.addTo(map);
            }
        }
        function limparCadena(cadena) { var resultado = cadena.replace("Ñ", "&Ntilde;", "gi"); return resultado; }
        $.unblockUI();
    });

}

function AbrirProvincias(e, capa) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    var geojson;
    var dep = capa.feature.properties.ubigeo;
    var puntocentros = JSON.parse(capa.feature.properties.pointcenter);
    var lat = puntocentros[1], lng = puntocentros[0] + 1;

    FiltrarDepartamento(dep);
    $.ajax({
        url: 'https://datass.vivienda.gob.pe:8082/cartografia.asmx/paMG_Provincia?strcoddepa=' + dep, type: 'GET', dataType: "xml",
        success: function (d) {
            $.getJSON("/ProyectosGeoreferenciadosPIASAR/ListProv?dep=" + dep + "&mod=" + $('input[name=rdbModalidad]:checked').val(), function (data) {
                document.getElementById('weathermap').innerHTML = "<div id='map' style='position: static;z-index: 0;outline: none;height: 100vh;'></div>";
                var map = L.map('map').setView([lat, lng], 8);
                var tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }).addTo(map);
                $(".leaflet-control-zoom").css("visibility", "hidden");

                var algo;
                $(d).find('string').each(function () { algo = $(this); })
                resultado = JSON.parse(algo.text())
                map.removeLayer(L.geoJson);
                geojson = L.geoJson(resultado, { style: style, onEachFeature: onEachProvincia }).addTo(map);

                function style(feature) {
                    var prov = data.find(x=>x.cod_depa + x.cod_prov == feature.properties.ubigeo);

                    if ((prov.NroProyectos) > 0) {
                        return {
                            weight: 2,
                            opacity: 1,
                            color: '#69afff',
                            dashArray: '3',
                            fillOpacity: 0.7,
                            fillColor: getColor(prov.NroProyectos)
                        };
                    }
                    else {
                        return {
                            weight: 2,
                            opacity: 1,
                            color: '#9e9e9eed',
                            dashArray: '3',
                            fillOpacity: 0.7,
                            fillColor: '#b5b0b075',
                        };
                    }
                }

                function getColor(d) {
                    return d > 25 ? 'rgb(63, 128, 208)' :
                            d > 20 ? 'rgb(115, 178, 255)' :
                            d > 15 ? 'rgb(190, 232, 255)' :
                            d > 10 ? 'rgb(255, 235, 190)' :
                            d > 5 ? 'rgb(255, 180, 232)' :
                            d > 1 ? 'rgb(255, 220, 232)' :
                                    '#b5b0b075';
                }

                var legend = L.control({ position: 'bottomleft' });

                legend.onAdd = function (map) {

                    var div = L.DomUtil.create('div', 'legend'),
                        grades = [0, 1, 5, 10, 15, 20, 25],
                        labels = [],
                        from, to;
                    labels.push("<div><h4>Nro. de Obras</h4>");

                    for (var i = 0; i < grades.length; i++) {
                        from = grades[i];
                        to = grades[i + 1];

                        labels.push('<i style="background:' + getColor(from + 1) + '"></i><span>' + from + (from != 0 ? (to ? '&ndash;' + to : '+') : '') + '</span><br>');
                    }
                    labels.push("</div>")
                    div.innerHTML = labels.join('');
                    return div;
                };

                legend.addTo(map);

                var customOptions = { 'className': 'custom-popup-map' }

                function onEachProvincia(feature, layer) {

                    var prov = data.find(x=>x.cod_depa + x.cod_prov == feature.properties.ubigeo);

                    var PopUp = GeneraPopUp(getColor(prov.NroProyectos), prov.Provincia, formatInt(prov.NroProyectos), formatMoney(prov.CostoInversion), formatMoney(prov.TotalAutorizacion), formatMoney(prov.TotalManifiesto));

                    var html = '<div class="content-mark-map">' +
                                '<span class="circle-icon" style="background: #607D8B;animation: pulse 2s infinite;">' + formatInt(prov.NroProyectos) + '</span>' +
                                '<div><label class="map-label-icon">' + limparCadena(layer.feature.properties.nombre) + '</label></div>' + PopUp + '</div>';

                    var myIcon = L.divIcon({ className: 'my-div-icon', iconSize: new L.Point(50, 50), html: html });
                    var puntocentros = JSON.parse(layer.feature.properties.pointcenter);
                    var lat = puntocentros[1], lng = puntocentros[0];
                    var marker = L.marker([lat, lng], { icon: myIcon });
                    marker.on('click', function () { AbrirDisrito(null, layer) });
                    if (prov.NroProyectos > 0) {
                        marker.addTo(map);
                    }
                }
                function limparCadena(cadena) { var resultado = cadena.replace("Ñ", "&Ntilde;", "gi"); return resultado; }
                $.unblockUI();
            });
            
        }
    });
   
}
function AbrirDisrito(e, capa) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    var geojson;
    var ubigeo = capa.feature.properties.ubigeo;
    var dep = ubigeo.substr(0, 2);
    var prov = ubigeo.substr(2, 2);
    var puntocentros = JSON.parse(capa.feature.properties.pointcenter);
    var lat = puntocentros[1], lng = puntocentros[0]+0.5;

    $("#ddlProvincia").val(prov);
    ddlDistrito($("#hdnDep").val() + $("#ddlProvincia").val())
    ListReporteObras();
    $.ajax({
        url: 'https://datass.vivienda.gob.pe:8082/cartografia.asmx/paMG_Distrito?strcoddepprov=' + ubigeo, type: 'GET', dataType: "xml",
                success : function (d) {
                    $.getJSON("/ProyectosGeoreferenciadosPIASAR/ListDist?dep=" + dep + "&prov=" + prov + "&mod=" + $('input[name=rdbModalidad]:checked').val(), function (data) {
                        document.getElementById('weathermap').innerHTML = "<div id='map' style='position: static;z-index: 0;outline: none;height: 100vh;'></div>";
                        var map = L.map('map').setView([lat, lng], 9);
                        var tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }).addTo(map);
                        $(".leaflet-control-zoom").css("visibility", "hidden");

                        var algo;
                        $(d).find('string').each(function () { algo = $(this);})
                        resultado = JSON.parse(algo.text());

                        geojson = L.geoJson(resultado, { style: style, onEachFeature: onEachDistrito
                        }).addTo(map);

                        function style(feature) {
                            var dist = data.find(x=>x.cod_depa + x.cod_prov + x.cod_dist == feature.properties.ubigeo);
                            if (dist != undefined) {
                                if ((dist.NroProyectos) > 0) {
                                    return {
                                        weight: 2,
                                        opacity: 1,
                                        color: '#69afff',
                                        dashArray: '3',
                                        fillOpacity: 0.7,
                                        fillColor: getColor(dist.NroProyectos)
                                    };
                                }
                                else
                                {
                                    return {
                                        weight: 2,
                                        opacity: 1,
                                        color: '#9e9e9eed',
                                        dashArray: '3',
                                        fillOpacity: 0.7,
                                        fillColor: '#b5b0b075',
                                    };
                                }
                            }
                            else
                            {
                                return {
                                    weight: 2,
                                    opacity: 1,
                                    color: '#9e9e9eed',
                                    dashArray: '3',
                                    fillOpacity: 0.7,
                                    fillColor: '#b5b0b075',
                                };
                            }
                            
                        }

                        function getColor(d) {
                            return d > 25 ? 'rgb(63, 128, 208)' :
                                    d > 20 ? 'rgb(115, 178, 255)' :
                                    d > 15 ? 'rgb(190, 232, 255)' :
                                    d > 10 ? 'rgb(255, 235, 190)' :
                                    d > 5 ? 'rgb(255, 180, 232)' :
                                    d > 1 ? 'rgb(255, 220, 232)' :
                                            '#b5b0b075';
                        }

                        var legend = L.control({ position: 'bottomleft' });

                        legend.onAdd = function (map) {

                            var div = L.DomUtil.create('div', 'legend'),
                                grades = [0, 1, 5, 10, 15, 20, 25],
                                labels = [],
                                from, to;
                            labels.push("<div><h4>Nro. de Obras</h4>");

                            for (var i = 0; i < grades.length; i++) {
                                from = grades[i];
                                to = grades[i + 1];

                                labels.push('<i style="background:' + getColor(from + 1) + '"></i><span>' + from + (from != 0 ? (to ? '&ndash;' + to : '+') : '') + '</span><br>');
                            }
                            labels.push("</div>")
                            div.innerHTML = labels.join('');
                            return div;
                        };

                        legend.addTo(map);

                        var customOptions = {'className': 'custom-popup-map' }

                        function onEachDistrito(feature, layer) {

                            var dist = data.find(x=>x.cod_depa + x.cod_prov + x.cod_dist == feature.properties.ubigeo);

                            var PopUp = GeneraPopUp(getColor(dist.NroProyectos), dist.Distrito, formatInt(dist.NroProyectos), formatMoney(dist.CostoInversion), formatMoney(dist.TotalAutorizacion), formatMoney(dist.TotalManifiesto));
                           
                            var html = '<div class="content-mark-map">' +
                                        '<span class="circle-icon" style="background: #607D8B;animation: pulse 2s infinite;">' + formatInt(dist.NroProyectos) + '</span>' +
                                        '<div><label class="map-label-icon">' +limparCadena(layer.feature.properties.nombre) + '</label></div>' +PopUp + '</div>';

                            var myIcon = L.divIcon({className: 'my-div-icon', iconSize: new L.Point(50, 50), html: html });
                            var puntocentros = JSON.parse(layer.feature.properties.pointcenter);
                            var lat = puntocentros[1], lng = puntocentros[0];
                            var marker = L.marker([lat, lng], { icon: myIcon });
                            marker.on('click', function () { AbrirDistritoUnico(null, layer) });
                            if (dist.NroProyectos > 0) {
                                marker.addTo(map);
                            }
                        }
                        function limparCadena(cadena) { var resultado = cadena.replace("Ñ", "&Ntilde;", "gi"); return resultado; }
                        $.unblockUI();
                    });

                }
    });

}

function AbrirDepartamentoSelect(dep) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    var GeoJsonDep;
    for (i = 0; i < departamentos.features.length; i++) {
        if (departamentos.features[i].properties.ubigeo == dep) {
            GeoJsonDep = departamentos.features[i];
        }
    }
    var puntocentros = JSON.parse(GeoJsonDep.properties.pointcenter);
    var lat = puntocentros[1], lng = puntocentros[0] + 1;
    $("#ddlDepartamento").val(dep);
    $.ajax({
        url: 'https://datass.vivienda.gob.pe:8082/cartografia.asmx/paMG_Provincia?strcoddepa=' + dep, type: 'GET', dataType: "xml",
        success: function (d) {
            $.getJSON("/ProyectosGeoreferenciadosPIASAR/ListProv?dep=" + dep + "&mod=" + $('input[name=rdbModalidad]:checked').val(), function (data) {
                document.getElementById('weathermap').innerHTML = "<div id='map' style='position: static;z-index: 0;outline: none;height: 100vh;'></div>";
                var map = L.map('map').setView([lat, lng], 8);
                var tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }).addTo(map);
                $(".leaflet-control-zoom").css("visibility", "hidden");

                var algo;
                $(d).find('string').each(function () { algo = $(this); })
                resultado = JSON.parse(algo.text())
                map.removeLayer(L.geoJson);
                geojson = L.geoJson(resultado, { style: style, onEachFeature: onEachProvincia }).addTo(map);

                function style(feature) {
                    var prov = data.find(x=>x.cod_depa + x.cod_prov == feature.properties.ubigeo);

                    if ((prov.NroProyectos) > 0) {
                        return {
                            weight: 2,
                            opacity: 1,
                            color: '#69afff',
                            dashArray: '3',
                            fillOpacity: 0.7,
                            fillColor: getColor(prov.NroProyectos)
                        };
                    }
                    else {
                        return {
                            weight: 2,
                            opacity: 1,
                            color: '#9e9e9eed',
                            dashArray: '3',
                            fillOpacity: 0.7,
                            fillColor: '#b5b0b075',
                        };
                    }
                }

                function getColor(d) {
                    return d > 25 ? 'rgb(63, 128, 208)' :
                            d > 20 ? 'rgb(115, 178, 255)' :
                            d > 15 ? 'rgb(190, 232, 255)' :
                            d > 10 ? 'rgb(255, 235, 190)' :
                            d > 5 ? 'rgb(255, 180, 232)' :
                            d > 1 ? 'rgb(255, 220, 232)' :
                                    '#b5b0b075';
                }

                var legend = L.control({ position: 'bottomleft' });

                legend.onAdd = function (map) {

                    var div = L.DomUtil.create('div', 'legend'),
                        grades = [0, 1, 5, 10, 15, 20, 25],
                        labels = [],
                        from, to;
                    labels.push("<div><h4>Nro. de Obras</h4>");

                    for (var i = 0; i < grades.length; i++) {
                        from = grades[i];
                        to = grades[i + 1];

                        labels.push('<i style="background:' + getColor(from + 1) + '"></i><span>' + from + (from != 0 ? (to ? '&ndash;' + to : '+') : '') + '</span><br>');
                    }
                    labels.push("</div>")
                    div.innerHTML = labels.join('');
                    return div;
                };

                legend.addTo(map);

                var customOptions = { 'className': 'custom-popup-map' }

                function onEachProvincia(feature, layer) {

                    var prov = data.find(x=>x.cod_depa + x.cod_prov == feature.properties.ubigeo);

                    var PopUp = GeneraPopUp(getColor(prov.NroProyectos), prov.Provincia, formatInt(prov.NroProyectos), formatMoney(prov.CostoInversion), formatMoney(prov.TotalAutorizacion), formatMoney(prov.TotalManifiesto));

                    var html = '<div class="content-mark-map">' +
                                '<span class="circle-icon" style="background: #607D8B;animation: pulse 2s infinite;">' + formatInt(prov.NroProyectos) + '</span>' +
                                '<div><label class="map-label-icon">' + limparCadena(layer.feature.properties.nombre) + '</label></div>' + PopUp + '</div>';

                    var myIcon = L.divIcon({ className: 'my-div-icon', iconSize: new L.Point(50, 50), html: html });
                    var puntocentros = JSON.parse(layer.feature.properties.pointcenter);
                    var lat = puntocentros[1], lng = puntocentros[0];
                    var marker = L.marker([lat, lng], { icon: myIcon });
                    marker.on('click', function () { AbrirDisrito(null, layer) });
                    if (prov.NroProyectos > 0) {
                        marker.addTo(map);
                    }
                }
                function limparCadena(cadena) { var resultado = cadena.replace("Ñ", "&Ntilde;", "gi"); return resultado; }
                
            });
            $.unblockUI();
        }
    });
}
function AbrirProvincia(dep, prov) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    var ubigeo = dep + prov;
    $.ajax({
        url: 'https://datass.vivienda.gob.pe:8082/cartografia.asmx/paMG_Provincia?strcoddepa=' + dep, type: 'GET', dataType: "xml",
        success: function (d) {
            
            var algo;
            $(d).find('string').each(function () { algo = $(this); })
            distritos = JSON.parse(algo.text());

            var GeoJsonDist;
            for (i = 0; i < distritos.features.length; i++) {
                if (distritos.features[i].properties.ubigeo == dep+prov) {
                    GeoJsonDist = distritos.features[i];
                }
            }
            var puntocentros = JSON.parse(GeoJsonDist.properties.pointcenter);
            var lat = puntocentros[1], lng = puntocentros[0] + 0.5;
            
            ddlDistrito($("#hdnDep").val() + $("#ddlProvincia").val());
            ListReporteObras();
            $.ajax({
                url: 'https://datass.vivienda.gob.pe:8082/cartografia.asmx/paMG_Distrito?strcoddepprov=' + ubigeo, type: 'GET', dataType: "xml",
                success: function (d) {
                    $.getJSON("/ProyectosGeoreferenciadosPIASAR/ListDist?dep=" + dep + "&prov=" + prov + "&mod=" + $('input[name=rdbModalidad]:checked').val(), function (data) {
                        document.getElementById('weathermap').innerHTML = "<div id='map' style='position: static;z-index: 0;outline: none;height: 100vh;'></div>";
                        var map = L.map('map').setView([lat, lng], 9);
                        var tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }).addTo(map);
                        $(".leaflet-control-zoom").css("visibility", "hidden");

                        var algo;
                        $(d).find('string').each(function () { algo = $(this); })
                        resultado = JSON.parse(algo.text());

                        geojson = L.geoJson(resultado, {
                            style: style, onEachFeature: onEachDistrito
                        }).addTo(map);

                        function style(feature) {
                            var dist = data.find(x=>x.cod_depa + x.cod_prov + x.cod_dist == feature.properties.ubigeo);

                            if ((dist.NroProyectos) > 0) {
                                return {
                                    weight: 2,
                                    opacity: 1,
                                    color: '#69afff',
                                    dashArray: '3',
                                    fillOpacity: 0.7,
                                    fillColor: getColor(dist.NroProyectos)
                                };
                            }
                            else {
                                return {
                                    weight: 2,
                                    opacity: 1,
                                    color: '#9e9e9eed',
                                    dashArray: '3',
                                    fillOpacity: 0.7,
                                    fillColor: '#b5b0b075',
                                };
                            }
                        }

                        function getColor(d) {
                            return d > 25 ? 'rgb(63, 128, 208)' :
                                    d > 20 ? 'rgb(115, 178, 255)' :
                                    d > 15 ? 'rgb(190, 232, 255)' :
                                    d > 10 ? 'rgb(255, 235, 190)' :
                                    d > 5 ? 'rgb(255, 180, 232)' :
                                    d > 1 ? 'rgb(255, 220, 232)' :
                                            '#b5b0b075';
                        }

                        var legend = L.control({ position: 'bottomleft' });

                        legend.onAdd = function (map) {

                            var div = L.DomUtil.create('div', 'legend'),
                                grades = [0, 1, 5, 10, 15, 20, 25],
                                labels = [],
                                from, to;
                            labels.push("<div><h4>Nro. de Obras</h4>");

                            for (var i = 0; i < grades.length; i++) {
                                from = grades[i];
                                to = grades[i + 1];

                                labels.push('<i style="background:' + getColor(from + 1) + '"></i><span>' + from + (from != 0 ? (to ? '&ndash;' + to : '+') : '') + '</span><br>');
                            }
                            labels.push("</div>")
                            div.innerHTML = labels.join('');
                            return div;
                        };

                        legend.addTo(map);

                        var customOptions = { 'className': 'custom-popup-map' }

                        function onEachDistrito(feature, layer) {

                            var dist = data.find(x=>x.cod_depa + x.cod_prov + x.cod_dist == feature.properties.ubigeo);

                            var PopUp = GeneraPopUp(getColor(dist.NroProyectos), dist.Distrito, formatInt(dist.NroProyectos), formatMoney(dist.CostoInversion), formatMoney(dist.TotalAutorizacion), formatMoney(dist.TotalManifiesto));

                            var html = '<div class="content-mark-map">' +
                                        '<span class="circle-icon" style="background: #607D8B;animation: pulse 2s infinite;">' + formatInt(dist.NroProyectos) + '</span>' +
                                        '<div><label class="map-label-icon">' + limparCadena(layer.feature.properties.nombre) + '</label></div>' + PopUp + '</div>';

                            var myIcon = L.divIcon({ className: 'my-div-icon', iconSize: new L.Point(50, 50), html: html });
                            var puntocentros = JSON.parse(layer.feature.properties.pointcenter);
                            var lat = puntocentros[1], lng = puntocentros[0];
                            var marker = L.marker([lat, lng], { icon: myIcon });
                            marker.on('click', function () { AbrirDistritoUnico(null, layer) });
                            if (dist.NroProyectos > 0) {
                                marker.addTo(map);
                            }
                        }
                        function limparCadena(cadena) { var resultado = cadena.replace("Ñ", "&Ntilde;", "gi"); return resultado; }
                        
                    });
                    $.unblockUI();
                },
                always: function (d) {
                    
                }
            });
        }
    });
}


function AbrirDistritoUnico(e, capa) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    var puntocentros = JSON.parse(capa.feature.properties.pointcenter);
    var lat = puntocentros[1], lng = puntocentros[0];
    var ubigeo = capa.feature.properties.ubigeo;
    var dep = ubigeo.substr(0, 2);
    var prov = ubigeo.substr(2, 2);
    var dist = ubigeo.substr(4, 2);

    $("#ddlDistrito").val(dist);
    ListReporteObras();

    $.getJSON("/ProyectosGeoreferenciadosPIASAR/ListDistritoUnico?dep=" + dep + "&prov=" + prov + "&dist=" + dist + "&mod=" + $('input[name=rdbModalidad]:checked').val(), function (data) {
        document.getElementById('weathermap').innerHTML = "<div id='map' style='position: static;z-index: 0;outline: none;height: 100vh;'></div>";
        var map = L.map('map').setView([lat, lng], 10);
        var tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }).addTo(map);
        $(".leaflet-control-zoom").css("visibility", "hidden");

        geojson = L.geoJson(capa.feature.geometry, {
            style: style, onEachFeature: onEachDistrito
        }).addTo(map);

        function style(feature) {
                return {
                    weight: 2,
                    opacity: 1,
                    color: '#69afff',
                    dashArray: '3',
                    fillOpacity: 0.7,
                    fillColor: 'rgb(255, 220, 232)'
                };
        }

        function getColor(d) {
            return d > 25 ? 'rgb(63, 128, 208)' :
                    d > 20 ? 'rgb(115, 178, 255)' :
                    d > 15 ? 'rgb(190, 232, 255)' :
                    d > 10 ? 'rgb(255, 235, 190)' :
                    d > 5 ? 'rgb(255, 180, 232)' :
                    d > 1 ? 'rgb(255, 220, 232)' :
                            '#b5b0b075';
        }

        var legend = L.control({ position: 'bottomleft' });

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'legend'),
                grades = [0, 1, 5, 10, 15, 20, 25],
                labels = [],
                from, to;
            labels.push("<div><h4>Nro. de Obras</h4>");

            for (var i = 0; i < grades.length; i++) {
                from = grades[i];
                to = grades[i + 1];

                labels.push('<i style="background:' + getColor(from + 1) + '"></i><span>' + from + (from != 0 ? (to ? '&ndash;' + to : '+') : '') + '</span><br>');
            }
            labels.push("</div>")
            div.innerHTML = labels.join('');
            return div;
        };

        legend.addTo(map);

        var customOptions = { 'className': 'custom-popup-map' }

        function onEachDistrito(feature, layer) {
            //var dist = data.find(x=>x.cod_depa + x.cod_prov + x.cod_dist == feature.properties.ubigeo);
            for (var i = 0; i < data.length ; i++) {
                var PopUp = GenerarPopUpCP(getColor(data[i].Nro_beneficiarios_et), data[i].Localidad, formatInt(data[i].Nro_beneficiarios_et), formatMoney(data[i].Mto_proyecto), formatMoney(data[i].Monto_acumulado_autorizacion), formatMoney(data[i].Monto_acumulado_manifiesto_gasto));

                var html = '<div class="content-mark-map">' +
                            '<span class="circle-icon" style="background: #607D8B;animation: pulse 2s infinite;">' + formatInt(data[i].Nro_beneficiarios_et) + '</span>' +
                            '<div><label class="map-label-icon">' + limparCadena(data[i].Localidad) + '</label></div>' + PopUp + '</div>';

                var myIcon = L.divIcon({ className: 'my-div-icon', iconSize: new L.Point(50, 50), html: html });
                var marker = L.marker([data[i].Latitud, data[i].Longitud], { icon: myIcon });
                marker.on('click', function () { });
                marker.addTo(map);
            }
        }
        function limparCadena(cadena) { var resultado = cadena.replace("Ñ", "&Ntilde;", "gi"); return resultado; }
        $.unblockUI();
    })
}
function AbrirDistritoUnicoSelect(dep, prov, dist) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    var ubigeo = dep + prov + dist;
    $.ajax({
        url: 'https://datass.vivienda.gob.pe:8082/cartografia.asmx/paMG_Distrito?strcoddepprov=' + dep+prov, type: 'GET', dataType: "xml",
        success: function (d) {
            var algo;
            $(d).find('string').each(function () { algo = $(this); })
            distritos = JSON.parse(algo.text());

            var GeoJsonDist;
            for (i = 0; i < distritos.features.length; i++) {
                if (distritos.features[i].properties.ubigeo == dep + prov + dist) {
                    GeoJsonDist = distritos.features[i];
                }
            }
            var puntocentros = JSON.parse(GeoJsonDist.properties.pointcenter);
            var lat = puntocentros[1], lng = puntocentros[0];
            $("#ddlDistrito").val(dist);
            ListReporteObras();

            $.getJSON("/ProyectosGeoreferenciadosPIASAR/ListDistritoUnico?dep=" + dep + "&prov=" + prov + "&dist=" + dist + "&mod=" + $('input[name=rdbModalidad]:checked').val(), function (data) {
               
                document.getElementById('weathermap').innerHTML = "<div id='map' style='position: static;z-index: 0;outline: none;height: 100vh;'></div>";
                var map = L.map('map').setView([lat, lng], 10);
                var tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }).addTo(map);
                $(".leaflet-control-zoom").css("visibility", "hidden");


                geojson = L.geoJson(GeoJsonDist, {
                    style: style, onEachFeature: onEachDistrito
                }).addTo(map);

                function style(feature) {
                    return {
                        weight: 2,
                        opacity: 1,
                        color: '#69afff',
                        dashArray: '3',
                        fillOpacity: 0.7,
                        fillColor: 'rgb(255, 220, 232)'
                    };
                }

                function getColor(d) {
                    return d > 25 ? 'rgb(63, 128, 208)' :
                            d > 20 ? 'rgb(115, 178, 255)' :
                            d > 15 ? 'rgb(190, 232, 255)' :
                            d > 10 ? 'rgb(255, 235, 190)' :
                            d > 5 ? 'rgb(255, 180, 232)' :
                            d > 1 ? 'rgb(255, 220, 232)' :
                                    '#b5b0b075';
                }

                var legend = L.control({ position: 'bottomleft' });

                legend.onAdd = function (map) {

                    var div = L.DomUtil.create('div', 'legend'),
                        grades = [0, 1, 5, 10, 15, 20, 25],
                        labels = [],
                        from, to;
                    labels.push("<div><h4>Nro. de Obras</h4>");

                    for (var i = 0; i < grades.length; i++) {
                        from = grades[i];
                        to = grades[i + 1];

                        labels.push('<i style="background:' + getColor(from + 1) + '"></i><span>' + from + (from != 0 ? (to ? '&ndash;' + to : '+') : '') + '</span><br>');
                    }
                    labels.push("</div>")
                    div.innerHTML = labels.join('');
                    return div;
                };

                legend.addTo(map);

                var customOptions = { 'className': 'custom-popup-map' }

                function onEachDistrito(feature, layer) {
                    //var dist = data.find(x=>x.cod_depa + x.cod_prov + x.cod_dist == feature.properties.ubigeo);
                    for (var i = 0; i < data.length ; i++) {
                        var PopUp = GenerarPopUpCP(getColor(data[i].Nro_beneficiarios_et), data[i].Localidad, formatInt(data[i].Nro_beneficiarios_et), formatMoney(data[i].Mto_proyecto), formatMoney(data[i].Monto_acumulado_autorizacion), formatMoney(data[i].Monto_acumulado_manifiesto_gasto));

                        var html = '<div class="content-mark-map">' +
                                    '<span class="circle-icon" style="background: #607D8B;animation: pulse 2s infinite;">' + formatInt(data[i].Nro_beneficiarios_et) + '</span>' +
                                    '<div><label class="map-label-icon">' + limparCadena(data[i].Localidad) + '</label></div>' + PopUp + '</div>';

                        var myIcon = L.divIcon({ className: 'my-div-icon', iconSize: new L.Point(50, 50), html: html });
                        var marker = L.marker([data[i].Latitud, data[i].Longitud], { icon: myIcon });
                        marker.on('click', function () { });
                        marker.addTo(map);
                    }
                }
                function limparCadena(cadena) { var resultado = cadena.replace("Ñ", "&Ntilde;", "gi"); return resultado; }
                $.unblockUI();
            })

        }
    });
}

function getProyecto(IdObra) {
    $("#listResults").addClass("d-none");
    $("#CuadroBusqueda").addClass("d-none");
    $("#divInfoObra").removeClass("d-none");
    $("#btnVolverListaProyectos").removeClass("d-none");
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    $.get("/ProyectosGeoreferenciadosPIASAR/ListObraId?Id=" + IdObra, function (datas, status) {
        $('#lblSNIP').html(datas.Snip + "<br/>SNIP");
        $('#lblCUI').html(datas.CUI + "<br/>CUI");
        $('#lblNombreProyecto').html(datas.Nom_proyecto);
        if (datas.Cod_modalidad == 22) {
            $('#lblModalidad').html("Nucleo Ejecutor");
            $("#trAutorizacion1").removeClass("d-none");
            $("#trAutorizacion2").removeClass("d-none");
            $("#trGrafico").removeClass("d-none");
        } else {
            $('#lblModalidad').html("Contrata");
            $("#trAutorizacion1").addClass("d-none");
            $("#trAutorizacion2").addClass("d-none");
            $("#trGrafico").addClass("d-none");
        }
        $('#lblFecFin').html(datas.SubEstadoObra);
        $('#lblDep').html(datas.Departamento);
        $('#lblProv').html(datas.Provincia);
        $('#lblDist').html(datas.Distrito);
        $('#lblLocalidad').html(datas.Localidad);
        $('#lblLat').html(datas.Latitud);
        $('#lblLon').html(datas.Longitud);
        $('#lblFecInicio').html(datas.Fecha_inicio_programado_string);
        $('#lblFecFin').html(datas.Fecha_fin_programado_string);

        $('#lblCostoInversion').prop('title', formatMoney(datas.Mto_proyecto));
        $('#lblCostoInversion').html(AbreviarNumero(datas.Mto_proyecto));
        $('#lblAutorizacion').html(formatMoney(datas.Monto_acumulado_autorizacion));
        $('#lblManifiesto').html(formatMoney(datas.Monto_acumulado_manifiesto_gasto));
        $('#lblDesembolso').html(formatMoney(datas.MontoDesembolso));

        $('#lblNroBeneficiarios').html(formatInt(datas.Nro_beneficiarios_et));
        $('#lblConexNuevaAgua').html(formatInt(datas.Nro_conexiones_agua_et));
        $('#lblConexNuevaSanea').html(formatInt(datas.Nro_conexiones_saneamiento_et));
       
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("grfProyAutMan", am4charts.XYChart);

            // Add data
            chart.data = [{
                "country": "Autorización",
                "visits": datas.Monto_acumulado_autorizacion
            }, {
                "country": "Justificación",
                "visits": datas.Monto_acumulado_manifiesto_gasto
            }];

            // Create axes

            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "country";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.labels.template.fill = am4core.color("#FFFFFF");

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.labels.template.fill = am4core.color("#FFFFFF");
            valueAxis.renderer.labels.template.fontSize = 0;

            // Create series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "visits";
            series.dataFields.categoryX = "country";
            series.name = "Visits";
            series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
            series.columns.template.fillOpacity = .8;

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;

        }); // end am4core.ready()
  
        var dep = datas.IdUbigeo.substring(0, 2), prov = datas.IdUbigeo.substring(2, 4), dist = datas.IdUbigeo.substring(4, 6);
        $("#hdnDep").val(dep);
        $.get("/MonitoreoPIASAR/ddlProvincia?Id=" + dep, function (dat, status) {
            $("#ddlProvincia").empty();
            $.each(dat, function (i, dat) {
                if (dat.Value == prov) {
                    $("#ddlProvincia").append('<option value="'
                   + dat.Value + '" selected>'
                   + dat.Text + '</option>');
                } else {
                    $("#ddlProvincia").append('<option value="'
                   + dat.Value + '">'
                   + dat.Text + '</option>');
                }
                   
                });
        });
        $.get("/MonitoreoPIASAR/ddlDistrito?Id=" + dep + prov, function (dat, status) {
            $("#ddlDistrito").empty();
            $.each(dat, function (i, dat) {
                if (dat.Value == dist) {
                    $("#ddlDistrito").append('<option value="'
                   + dat.Value + '" selected>'
                   + dat.Text + '</option>');
                } else {
                    $("#ddlDistrito").append('<option value="'
                   + dat.Value + '">'
                   + dat.Text + '</option>');
                }
            });
        });

        var ubigeo = dep + prov + dist;
        $.ajax({
            url: 'https://datass.vivienda.gob.pe:8082/cartografia.asmx/paMG_Distrito?strcoddepprov=' + dep + prov, type: 'GET', dataType: "xml",
            success: function (d) {
                var algo;
                $(d).find('string').each(function () { algo = $(this); })
                distritos = JSON.parse(algo.text());

                var GeoJsonDist;
                for (i = 0; i < distritos.features.length; i++) {
                    if (distritos.features[i].properties.ubigeo == dep + prov + dist) {
                        GeoJsonDist = distritos.features[i];
                    }
                }
                var puntocentros = JSON.parse(GeoJsonDist.properties.pointcenter);
                var lat = puntocentros[1], lng = puntocentros[0];
                ListReporteObras();

                $.getJSON("/ProyectosGeoreferenciadosPIASAR/ListDistritoUnico?dep=" + dep + "&prov=" + prov + "&dist=" + dist + "&mod=" + $('input[name=rdbModalidad]:checked').val(), function (data) {

                    document.getElementById('weathermap').innerHTML = "<div id='map' style='position: static;z-index: 0;outline: none;height: 100vh;'></div>";
                    var map = L.map('map').setView([lat, lng], 10);
                    var tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }).addTo(map);
                    $(".leaflet-control-zoom").css("visibility", "hidden");

                    geojson = L.geoJson(GeoJsonDist, {
                        style: style//, onEachFeature: onEachDistrito
                    }).addTo(map);

                    function style(feature) {
                        if ((data.NroProyectos) > 0) {
                            return {
                                weight: 2,
                                opacity: 1,
                                color: '#69afff',
                                dashArray: '3',
                                fillOpacity: 0.7,
                                fillColor: getColor(data.NroProyectos)
                            };
                        }
                        else {
                            return {
                                weight: 2,
                                opacity: 1,
                                color: '#9e9e9eed',
                                dashArray: '3',
                                fillOpacity: 0.7,
                                fillColor: '#b5b0b075',
                            };
                        }
                    }

                    function getColor(d) {
                        return d > 25 ? 'rgb(63, 128, 208)' :
                                d > 20 ? 'rgb(115, 178, 255)' :
                                d > 15 ? 'rgb(190, 232, 255)' :
                                d > 10 ? 'rgb(255, 235, 190)' :
                                d > 5 ? 'rgb(255, 180, 232)' :
                                d > 1 ? 'rgb(255, 220, 232)' :
                                        '#b5b0b075';
                    }

                    var legend = L.control({ position: 'bottomleft' });

                    legend.onAdd = function (map) {

                        var div = L.DomUtil.create('div', 'legend'),
                            grades = [0, 1, 5, 10, 15, 20, 25],
                            labels = [],
                            from, to;
                        labels.push("<div><h4>Nro. de Obras</h4>");

                        for (var i = 0; i < grades.length; i++) {
                            from = grades[i];
                            to = grades[i + 1];

                            labels.push('<i style="background:' + getColor(from + 1) + '"></i><span>' + from + (from != 0 ? (to ? '&ndash;' + to : '+') : '') + '</span><br>');
                        }
                        labels.push("</div>")
                        div.innerHTML = labels.join('');
                        return div;
                    };

                    legend.addTo(map);

                    var customOptions = { 'className': 'custom-popup-map' }

                    var PopUpCP = '<div class="tooltip-app" style="border-left: solid 3px ' + getColor(data[0].Nro_beneficiarios_et) + '"><p>' +
                    '<i class="fa fa-map-pin" aria-hidden="true"></i>&nbsp;' + data[0].Localidad + '</p><p>' +
                    '<i class="fa fa-building-o" aria-hidden="true"></i>&nbsp;Nro. Beneficiarios: <b>' + formatInt(data[0].Nro_beneficiarios_et) + '</b></p><p>' +
                    '<i class="fa fa-money" aria-hidden="true"></i>&nbsp;Costo de Inversión: <b> S/.' + formatMoney(data[0].Mto_proyecto) + '</b></p><p>';

                    
                    if (datas.Cod_modalidad == 22) {
                        PopUpCP = PopUpCP + '<i class="fa fa-money" aria-hidden="true"></i>&nbsp;Total de Autorización de Gasto: <b> S/.' + formatMoney(data[0].Monto_acumulado_autorizacion) + '</b></p><p>' +
                                        '<i class="fa fa-money" aria-hidden="true"></i>&nbsp;Total de Justificación de Gasto: <b> S/.' + formatMoney(data[0].Monto_acumulado_manifiesto_gasto) + '</b></p></div>';
                    } else {
                        PopUpCP = PopUpCP + '</div>';
                    }

                    var htmlCP = '<div class="content-mark-map">' +
                                '<span class="circle-icon" style="background: #607D8B;animation: pulse 2s infinite;">' + formatInt(data[0].Nro_beneficiarios_et) + '</span>' +
                                '<div><label class="map-label-icon">' + limparCadena(data[0].Localidad) + '</label></div>' + PopUpCP + '</div>';

                    var iconCP = L.divIcon({ className: 'my-div-icon', iconSize: new L.Point(50, 50), html: htmlCP });
                    var markerCP = L.marker([data[0].Latitud, data[0].Longitud], { icon: iconCP });
                    markerCP.on('click', function () { });
                    markerCP.addTo(map);

                    function limparCadena(cadena) { var resultado = cadena.replace("Ñ", "&Ntilde;", "gi"); return resultado; }
                    $.unblockUI();
                })

            }
        });

        $.unblockUI();
    });
}
function VolverListaProyectos() {
    $("#listResults").removeClass("d-none");
    $("#divInfoObra").addClass("d-none");
    $("#CuadroBusqueda").removeClass("d-none");
    $("#btnVolverListaProyectos").addClass("d-none");
    $("#hdnDep").val("00");
    $("#ddlDepartamento").val($("#hdnDep").val());
    $("#ddlProvincia").val("00");
    $("#ddlDistrito").val("00");
    ddlProvincia($("#hdnDep").val());
    ddlDistrito("0000");
    ReporteGeografico();
    ListReporteObras();
}
function Inicio() {
    $("#hdnDep").val("00");
    $("#ddlDepartamento").val($("#hdnDep").val());
    $("#ddlProvincia").val("00");
    $("#ddlDistrito").val("00");
    ddlProvincia($("#hdnDep").val());
    ddlDistrito("0000");
    ReporteGeografico();
    ListReporteObras();
}

function getNombreFile(nom) {
    var f = new Date();
    var title = nom + f.getDate() + "_" + (f.getMonth() + 1) + "_" + f.getFullYear() + "_" + f.getHours() + "_" + f.getMinutes();
    return title;
}
function formatMoney(amount, decimalCount, decimal, thousands) {
    try {
        decimalCount = Math.abs(2);
        decimalCount = isNaN(2) ? 2 : 2;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + "," : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ",") + (decimalCount ? "." + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}
function formatInt(amount, decimalCount, decimal, thousands) {
    try {
        decimalCount = Math.abs(0);
        decimalCount = isNaN(0) ? 2 : 0;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + "," : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ",") + (decimalCount ? "." + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}
function AbreviarNumero(val) {
    var value = val, bN = 0;
    var sf = ["", "k", "m", "b", "t", "c", "q", "s"];
    while (value > 999) {
        value /= 1000;
        bN++;
    }
    return value.toFixed(2) + sf[bN];
}
function tab(id) {
    if (id == 0) {
        $("#inicio").addClass("active");
        $("#buscar").removeClass("active");
        Inicio();
    } else if (id == 1) {
        $("#inicio").removeClass("active");
        $("#buscar").addClass("active");
    }
}

$(document).ready(function () {
    $('#txtBuscarDepartamento').keyup(function () {
        // Search text
        var text = $(this).val();
        // Hide all content class element
        $('.content').hide();
        // Search and show
        $('.content:contains("' + text.toUpperCase() + '")').show();
    });
    $("#txtBuscarProyecto").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: "/ProyectosGeoreferenciadosPIASAR/ListProyectosBusqueda?search=" + $("#txtBuscarProyecto").val(),
                //data: "{'empName':'" + document.getElementById('txtEmpName').value + "'}",
                dataType: "json",
                success: function (data) {
                    if (data.length > 0) {
                        var li = "";
                        $("#listResults").empty();
                        for (i = 0; i < data.length; i++) {
                            var modalidad = "";
                            if (data[i].Cod_modalidad == 22) { modalidad = "Nucleo Ejecutor" } else { modalidad = "Contrato" }
                            li = li + '<li onclick="getProyecto(' + data[i].IdProyecto + ')" title="' + data[i].Nom_proyecto + '">';
                            li = li + '<div class="media p-r-10 p-t-10 p-b-10">';
                            li = li + '<div class="media-left p-l-15 p-r-15">';
                            li = li + '<div class="radius-icon">';
                            li = li + '<h6 class="bg-c-blue d-inline-block text-center"><i class="fa fa-building-o" aria-hidden="true" style="font-size: 18px;"></i></h6>';
                            li = li + '</div>';
                            li = li + '</div>';
                            li = li + '<div class="media-body">';
                            li = li + '<h6 class="media-heading">Proyecto:</h6>';
                            li = li + '<p class="m-b-5 f-12 cortar-nombre">' + data[i].Nom_proyecto + '</p>';
                            li = li + '<p class="m-b-0 f-12"><strong class="m-l-0">MODALIDAD:</strong>&nbsp;&nbsp;' + modalidad + '</p>';
                            li = li + '<p class="m-b-0 f-12"><strong class="m-l-0">SNIP:</strong>&nbsp;&nbsp;' + data[i].Snip + '</p>';
                            li = li + '<p class="m-b-0 f-12"><strong class="m-l-0">CUI:</strong>&nbsp;&nbsp;' + data[i].CUI + '</p>';
                            li = li + '</div>';
                            li = li + '</div>';
                            li = li + '</li>'
                        }
                        $("#listResults").append(li);
                    }
                    else
                    {
                        $("#listResults").empty();
                        var li = '<li><br/><br/><p class="text-muted f-16" style="text-align:center; vertical-align: middle; display:table-cell;width: 323px; height: 120px;"><i class="fa fa-thumbs-o-down f-34" aria-hidden="true" style="color:#919aa3 !important"></i><br /> <br />Sin Resultados</p></li>'
                        $("#listResults").append(li);
                    }

                },
                error: function (result) {
                    alert("No Match");
                }
            });
        }
    });
    $('.Count').each(function () {
        var $this = $(this);
        jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: 1000,
            easing: 'swing',
            step: function () {
                $this.text(Math.ceil(AbreviarNumero(this.Counter)));
            }
        });
    });
});