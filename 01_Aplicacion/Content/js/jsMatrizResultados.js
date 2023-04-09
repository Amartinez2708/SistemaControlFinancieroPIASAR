$(document).ready(function () {
    dashboard();
    MatrizResumenRE();
    MatrizResumenP();
});


function VerDetalleResultadoEsperado(IdResultado, IdResultadoEsperado) {
    $("#modal-detalleresultado").modal({ backdrop: 'static', keyboard: true, show: true });
}
function VerDetalleProducto(Titulo, IdResultadoEsperado) {
    $("#titulo").html(Titulo);
    DetalleSeguimientoJASS();
    $("#modal-detalleproducto").modal({ backdrop: 'static', keyboard: true, show: true });
}

function DetalleSeguimientoJASS() {
    $.get("/MatrizResultados/ListSeguimientoJASS", function (data, status) {

        var divTable = '<div class="col-lg-6 col-sm-12"><div class="card project-task"><div class="card-block"><table class="table table-hover"><tbody>';
        var fINdivTable = '</tbody></table></div></div></div>';
        var divFila = '';
        var tabla = '';
        var idtiposeguimiento = 0;

        $("#detalle").html("");

        for (var i = 0; i < data.length; i++) {
            if (data[i].Nivel == 1) {
                if (tabla == "") {
                    divFila = divTable;
                    idtiposeguimiento = data[i].IdTipoSeguimiento;
                }
                else {
                    divFila = divFila + '<tr style="text-align:center">';
                    divFila = divFila + '<td colspan="3"><button class="btn btn-info btn-round" onclick="VerDetalleSeguimientoJASS(' + idtiposeguimiento + ')">Ver detalle&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button></td>'
                    divFila = divFila + '</tr>';
                    divFila = divFila + fINdivTable + divTable;
                    idtiposeguimiento = data[i].IdTipoSeguimiento;
                }

                divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;">';
                divFila = divFila + '<td colspan="3">' + data[i].TipoSeguimiento + '</td>'
                divFila = divFila + '</tr>';
            }
            else if (data[i].Nivel == 2) {
                divFila = divFila + '<tr>';
                divFila = divFila + '<td>' + data[i].TipoBienArticulo + '</td>'
                divFila = divFila + '<td>' + data[i].Avance + '%</td>'
                divFila = divFila + '<td style="width: 120px;"><div class="progress d-inline-block" style="width: 100%;"><div class="progress-bar bg-c-blue" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width:' + data[i].Avance + '%"></div></div></td>'
                divFila = divFila + '</tr>';
            }
            tabla = tabla + divFila;
            divFila = "";
        }

        $("#detalle").append(tabla);
    });
}

function VerDetalleSeguimientoJASS(Titulo) {
    $("#titulodetalleseguimiento").html(Titulo);
    DettaleSeguimientoJASSTIPO();
    $("#modal-detalleseguimiento").modal({ backdrop: 'static', keyboard: true, show: true });
}

function DettaleSeguimientoJASSTIPO() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListSeguimientoJASSDetalle", function (data, status) {

        var divTable = '<table class="table table-hover table-bordered"><tbody>';
        var fINdivTable = '</tbody></table>';
        var divFila = '';
        var tabla = '';
        var idtiposeguimiento = 0;

        var cuianterior = "";

        $("#detalleSeguimiento").html("");

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">N°</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">CUI</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">LOCALIDAD</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">% AVANCE</td>'
        divFila = divFila + '<td colspan="3">EQUIPOS DE OFICINA - MOBILIARIO</td>'
        divFila = divFila + '<td colspan="1">COMPARADOR DE </br>CLORO DIGITAL</td>'
        divFila = divFila + '<td colspan="6">EQUIPOS DE COMPUTO</td>'
        divFila = divFila + '<td colspan="3">KIT DE INDUMENTARIA PARA </br>LA JASS Y OPERADORES JASS</td>'
        divFila = divFila + '<td colspan="1">KIT SE SEGURIDAD </br>PARA OPERADORES</td>'
        divFila = divFila + '<td colspan="1">EQUIPO DE </br>PROTECCIÓN</td>'
        divFila = divFila + '<td colspan="1">KIT DE HERRAMIENTAS</br>DE O&M</td>'
        divFila = divFila + '<td colspan="1">KIT DE OPERACIÓN </br>Y MANTENIMIENTO UBS</td>'
        divFila = divFila + '<td colspan="1">DPD</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">ACTAS</td>'
        //divFila = divFila + '<td colspan="1">ARNES DE SEGURIDAD</td>'
        divFila = divFila + '</tr>';

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;">';      
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">ESCRITORIO</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">SILLA</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">ARMARIO</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">COLORIMETRO</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">UNIDAD CENTRAL </br>DE PROCESO - CPU</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">TECLADO + </br>MOUSE</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">SISTEMA DE ENERGIA</br> ININTERRUMPIDA - UPS</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">MONITOR LED</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">IMPRESORA LASER </br>+ TONNER</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">COMPUTADORA</br> PERSONAL</br> PORTATIL</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">CHALECOS</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">MOCHILAS</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">SOMBREROS </br>DE TELA</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">KIT DE </br>SEGURIDAD</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">EQUIPO DE </br>PROTECCIÓN</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">KIT DE HERRAMIENTAS</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">KIT DE OPERACIÓN </br>Y MANTENIMIENTO UBS</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle">DPD</td>'
        //divFila = divFila + '<td style="text-align:center">ARNES DE SEGURIDAD</td>'
        divFila = divFila + '</tr>';
        tabla = tabla + divFila;
        divFila = "";

        var cuianterior = "";
        var contar = 1;
        var contarsi = 0;
        var contarno = 0;

        for (var i = 0; i < data.length; i++) {
            debugger;
            if (cuianterior == "") { //aperturamos fila 

                cuianterior = data[i].CUI; //asignamos nuevo valor

                divFila = divFila + '<tr>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].PorcentageAvance + '%</td>';

                //primer bien
                //preguntamos check 
                if (data[i].check == 1) {
                    divFila = divFila + '<td style="color: green;font-size: 30px;text-align:center"><i class="fa fa-check-circle" aria-hidden="true"></i></td>'
                } else {
                    divFila = divFila + '<td style="color: red;font-size: 30px;text-align:center"><i class="fa fa-times-circle" aria-hidden="true"></i></td>'
                }
                tabla = tabla + divFila;
                divFila = "";
                contar++;
            }
            else if (data[i].CUI == cuianterior) { //preguntamos si el cui anterior es igual al nuevo cui
                //preguntamos check 
                if (data[i].TipoSeguimiento != "UPS" && data[i].TipoSeguimiento != "ARNES DE SEGURIDAD") {
                    if (data[i].check == 1) {
                        divFila = divFila + '<td style="color: green;font-size: 30px;text-align:center"><i class="fa fa-check-circle" aria-hidden="true"></i></td>'
                    } else {
                        divFila = divFila + '<td style="color: red;font-size: 30px;text-align:center"><i class="fa fa-times-circle" aria-hidden="true"></i></td>'
                    }
                }
                tabla = tabla + divFila;
                divFila = "";
            }
            else { //si el cui es diferente al cui anterior
                divFila = divFila + '<td style="text-align:center"><a href="../Archivos/Acta de Aprobacion.pdf" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></td>'//FILA VACIA PARA ACTAS

                divFila = divFila + '</tr>';
                tabla = tabla + divFila;
                divFila = "";

                cuianterior = data[i].CUI; //asignamos nuevo valor

                divFila = divFila + '<tr>';
                divFila = divFila + '<td style="vertical-align: middle;">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].PorcentageAvance + '%</td>';

                //primer bien
                //preguntamos check 
                if (data[i].check == 1) {
                    divFila = divFila + '<td style="color: green;font-size: 30px;text-align:center"><i class="fa fa-check-circle" aria-hidden="true"></i></td>'
                } else {
                    divFila = divFila + '<td style="color: red;font-size: 30px;text-align:center"><i class="fa fa-times-circle" aria-hidden="true"></i></td>'
                }
                tabla = tabla + divFila;
                divFila = "";
                contar++;
            }

        }
        $.unblockUI();
        $("#detalleSeguimiento").append(divTable + tabla + fINdivTable);
    });
}

function VerDetalleResultadoEsperado(Titulo) {
    $("#TituloResultadoPorAnio").html(Titulo);
    VerResultadoEsperado(Titulo);
    $("#modal-detalleresultadoanio").modal({ backdrop: 'static', keyboard: true, show: true });
}



function VerDetalleSeguimientoATM(Titulo) {
    $("#titulodetalleseguimiento").html(Titulo);
    DettaleSeguimientoATM();
    $("#modal-detalleseguimiento").modal({ backdrop: 'static', keyboard: true, show: true });
}

function DettaleSeguimientoATM() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListSeguimientoATMDetalle", function (data, status) {

        var divTable = '<table class="table table-hover table-bordered"><tbody>';
        var fINdivTable = '</tbody></table>';
        var divFila = '';
        var tabla = '';
        var idtiposeguimiento = 0;

        var cuianterior = "";

        $("#detalleSeguimiento").html("");

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">N°</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">REGIÓN</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">PROVINCIA</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">DISTRITO</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">% AVANCE</td>'
        divFila = divFila + '<td colspan="3">EQUIPOS DE OFICINA - MOBILIARIO</td>'
        divFila = divFila + '<td colspan="1">COMPARADOR DE </br>CLORO DIGITAL</td>'
        divFila = divFila + '<td colspan="6">EQUIPOS DE COMPUTO</td>'
        divFila = divFila + '<td colspan="1">HIPOCLORITO</br> DE CALCIO</td>'
        divFila = divFila + '<td colspan="1">MOTOCICLETA</td>'
        divFila = divFila + '<td colspan="1">CASCO DE </br>MOTOCICLETA</td>'
        divFila = divFila + '<td colspan="1">DESLIZADOR</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">ACTAS</td>'
        divFila = divFila + '</tr>';

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;">';
        divFila = divFila + '<td style="text-align:center;vertical-align: middle;">ESCRITORIO</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle;">SILLA</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle;">ARMARIO</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle;">COLORIMETRO</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle;">UNIDAD CENTRAL </br>DE PROCESO - CPU</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle;">TECLADO </br>+ MOUSE</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle;">SISTEMA DE ENERGIA </br>ININTERRUMPIDA - UPS</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle;">MONITOR LED</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle;">IMPRESORA LASER </br>+ TONNER</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle;">PROYECTOR</br> MULTIMEDIA</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle;">HIPOCLORITO </br>DE CALCIO</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle;">MOTOCICLETA</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle;">CASCO </br>DE MOTO</td>'
        divFila = divFila + '<td style="text-align:center;vertical-align: middle;">DESLIZADOR</td>'
        divFila = divFila + '</tr>';
        tabla = tabla + divFila;
        divFila = "";

        var cuianterior = "";
        var contar = 1;
        var contarsi = 0;
        var contarno = 0;

        for (var i = 0; i < data.length; i++) {
            if (cuianterior == "") { //aperturamos fila 

                cuianterior = data[i].Ubigeo; //asignamos nuevo valor

                divFila = divFila + '<tr>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Departamento + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Provincia + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Distrito + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].PorcentageAvance + '%</td>';

                //primer bien
                //preguntamos check 
                if (data[i].check == 1) {
                    divFila = divFila + '<td style="color: green;font-size: 30px;text-align:center"><i class="fa fa-check-circle" aria-hidden="true"></i></td>'
                } else {
                    divFila = divFila + '<td style="color: red;font-size: 30px;text-align:center"><i class="fa fa-times-circle" aria-hidden="true"></i></td>'
                }
                tabla = tabla + divFila;
                divFila = "";
                contar++;
            }
            else if (data[i].Ubigeo == cuianterior) { //preguntamos si el cui anterior es igual al nuevo cui

                if (data[i].TipoSeguimiento != "UPS"){
                //preguntamos check 
                if (data[i].check == 1) {
                    divFila = divFila + '<td style="color: green;font-size: 30px;text-align:center"><i class="fa fa-check-circle" aria-hidden="true"></i></td>'
                } else {
                    divFila = divFila + '<td style="color: red;font-size: 30px;text-align:center"><i class="fa fa-times-circle" aria-hidden="true"></i></td>'
                }
                tabla = tabla + divFila;
                divFila = "";
                }
            }
            else { //si el cui es diferente al cui anterior
                divFila = divFila + '<td style="text-align:center"><a href="../Archivos/Acta de Aprobacion.pdf" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></td>' // FILA VACIA PARA ACTAS
                divFila = divFila + '</tr>';
                tabla = tabla + divFila;
                divFila = "";

                cuianterior = data[i].Ubigeo; //asignamos nuevo valor

                divFila = divFila + '<tr>';
                divFila = divFila + '<td style="vertical-align: middle;">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Departamento + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Provincia + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Distrito + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;;text-align:center">' + data[i].PorcentageAvance + '%</td>';

                //primer bien
                //preguntamos check 
                if (data[i].check == 1) {
                    divFila = divFila + '<td style="color: green;font-size: 30px;text-align:center"><i class="fa fa-check-circle" aria-hidden="true"></i></td>'
                } else {
                    divFila = divFila + '<td style="color: red;font-size: 30px;text-align:center"><i class="fa fa-times-circle" aria-hidden="true"></i></td>'
                }
                tabla = tabla + divFila;
                divFila = "";
                contar++;
            }

        }
        $.unblockUI();
        $("#detalleSeguimiento").append(divTable + tabla + fINdivTable);
    });
}


function VerResultadoEsperado(Titulo) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListResultadoEsperadoAnio", function (data, status) {

        var divTable = '<div class="col-xl-3 col-sm-12"><div class="card"><div class="card-block">';
        var fINdivTable = '</div></div></div>';
        var divFila = '';
        var tabla = '';
        var anio = 0;

        $("#detalleresultadoanio").html("");

        for (var i = 0; i < data.length; i++) {

            divFila = divFila + '<div id="chart_1" class="user-radial-card">';
            divFila = divFila + '<div data-label="AÑO ' + data[i].NroAnio + '" class="radial-bar radial-bar-' + roundTo5(data[i].PorcentageAvanzado) + ' radial-bar-lg radial-bar-success">';
            divFila = divFila + '</div>';
            divFila = divFila + '</div>';
            divFila = divFila + '<div class="row justify-content-center m-t-10">';

            divFila = divFila + '<div class="col-lg-6 col-sm-6 b-r-default m-t-5 m-b-5 text-center">';
            divFila = divFila + '<h4>' + data[i].PorcentageAvanzado + '%</h4>';
            divFila = divFila + '<h5><i class="fa fa-home" aria-hidden="true"></i>&nbsp;' + data[i].Avanzado + '</h5>';
            divFila = divFila + '<p class="text-success m-b-0"><i class="fa fa-check-circle-o m-r-5"></i>Avanzado</p>';
            divFila = divFila + '</div>';

            divFila = divFila + '<div class="col-lg-6 col-sm-6 m-t-5 m-b-5 text-center" style="padding-right: 3px;padding-left: 3px;">';
            divFila = divFila + '<h4>' + data[i].Programado + '</h4>';
            divFila = divFila + '<h5></h5>';
            divFila = divFila + '<p class="text-info m-b-0"><i class="fa fa-calendar m-r-5"></i>Programado</p>';
            divFila = divFila + '</div>';

            divFila = divFila + '</div>';
            divFila = divFila + '</div>';

            divFila = divFila + '<div class="card-footer text-center p-t-0">';
            if (data[i].Avanzado != 0) {
                divFila = divFila + '<button class="btn btn-primary btn-round" onclick="VerDetalleResultadoEsperadoAnioDetalle(\'' + Titulo + '\',' + data[i].NroAnio + ')">Ver mas&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button>';
            } else {
                divFila = divFila + '<button class="btn btn-primary btn-round disabled" disabled>Ver mas&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button>';
            }
            

            divFila = divFila + '</div>';


            tabla = tabla + divTable + divFila + fINdivTable;
            divFila = "";
        }

        $("#detalleresultadoanio").append(tabla);
        $.unblockUI();
    });
}
function VerDetalleResultadoEsperadoAnioDetalle(Titulo, Anio) {
    $("#ttDetalleResultadoEsperado").html(Titulo + ' - Año ' + Anio);
    ListDetalleResultadoEsperadoAnioDetalle(Anio);
    $("#modal-detalleresultadoesperado").modal({ backdrop: 'static', keyboard: true, show: true });
}
function ListDetalleResultadoEsperadoAnioDetalle(Anio) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListResultadoEsperadoAnioDetalle?anio=" + Anio, function (data, status) {

        var divTable = '<table class="table table-hover table-bordered"><tbody>';
        var fINdivTable = '</tbody></table>';
        var divFila = '';
        var tabla = '';
        var idtiposeguimiento = 0;

        var cuianterior = "";

        $("#detalleresultadoesperadoanio").html("");

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;">N°</td>'
        divFila = divFila + '<td style="vertical-align: middle;">CUI</td>'
        divFila = divFila + '<td style="vertical-align: middle;">LOCALIDAD</td>'
        divFila = divFila + '<td style="vertical-align: middle;">FECHA DE TERMINO</br>DE LA OBRA</td>'
        divFila = divFila + '<td style="vertical-align: middle;">NRO. DE VIVIENDAS</td>'
        divFila = divFila + '<td style="vertical-align: middle;">NRO. DE CONEXIONES DE AGUA</td>'
        divFila = divFila + '<td style="vertical-align: middle;">NRO. DE CONEXIONES DE SANEAMIENTO</td>'
        divFila = divFila + '</tr>';

        tabla = tabla + divFila;
        divFila = "";

        var cuianterior = "";
        var contar = 1;
        var contarsi = 0;
        var contarno = 0;

        var totalcasas = 0;
        var totalagua = 0;
        var totalsaneamiento = 0;

        for (var i = 0; i < data.length; i++) {

            divFila = divFila + '<tr>';
            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + moment(data[i].FechaCulminacionObra).format("DD/MM/YYYY") + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].NroViviendas + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].NroConexionesAgua + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].NroConexionesUBS + '</td>';
            divFila = divFila + '</tr>';

            tabla = tabla + divFila;
            divFila = "";
            contar++;
            totalcasas = totalcasas + data[i].NroViviendas;
            totalagua = totalagua + data[i].NroConexionesAgua;
            totalsaneamiento = totalsaneamiento + data[i].NroConexionesUBS;
        }

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="4">TOTAL</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + totalcasas + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + totalagua + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + totalsaneamiento + '</td>';
        divFila = divFila + '</tr>';
        tabla = tabla + divFila;

        $("#detalleresultadoesperadoanio").append(divTable + tabla + fINdivTable);
        $.unblockUI();
    });
}

function ver(id) {
    $("#Resultados_" + id).addClass("d-none");
    $("#Productos_" + id).addClass("d-none");
    $("#resultado_" + id + "_principal").removeClass("d-none");

    switch (id) {
        case 0:
            $("#Inicio").removeClass("d-none");
            $("#Resultado1").addClass("d-none");
            $("#Resultado2").addClass("d-none");
            $("#Resultado3").addClass("d-none");
            $("#r0").addClass("active");
            $("#r1").removeClass("active");
            $("#r2").removeClass("active");
            $("#r3").removeClass("active");
            $("#r4").removeClass("active");
            break;
        case 1:
            $("#Inicio").addClass("d-none");
            $("#Resultado1").removeClass("d-none");
            $("#Resultado2").addClass("d-none");
            $("#Resultado3").addClass("d-none");
            $("#Resumen").addClass("d-none");
            $("#r0").removeClass("active");
            $("#r1").addClass("active");
            $("#r2").removeClass("active");
            $("#r3").removeClass("active");
            $("#r4").removeClass("active");
            break;
        case 2:
            $("#Inicio").addClass("d-none");
            $("#Resultado1").addClass("d-none");
            $("#Resultado2").removeClass("d-none");
            $("#Resultado3").addClass("d-none");
            $("#Resumen").addClass("d-none");
            $("#r0").removeClass("active");
            $("#r1").removeClass("active");
            $("#r2").addClass("active");
            $("#r3").removeClass("active");
            $("#r4").removeClass("active");
            break;
        case 3:
            $("#Inicio").addClass("d-none");
            $("#Resultado1").addClass("d-none");
            $("#Resultado2").addClass("d-none");
            $("#Resultado3").removeClass("d-none");
            $("#Resumen").addClass("d-none");
            $("#r0").removeClass("active");
            $("#r1").removeClass("active");
            $("#r2").removeClass("active");
            $("#r3").addClass("active");
            $("#r4").removeClass("active");
            break;
        case 4:
            $("#Inicio").addClass("d-none");
            $("#Resultado1").addClass("d-none");
            $("#Resultado2").addClass("d-none");
            $("#Resultado3").addClass("d-none");
            $("#Resumen").removeClass("d-none");
            $("#r0").removeClass("active");
            $("#r1").removeClass("active");
            $("#r2").removeClass("active");
            $("#r3").removeClass("active");
            $("#r4").addClass("active");
            break;
    }
}
function VerResultados(Id) {
    $("#Resultados_" + Id).removeClass("d-none");
    $("#Productos_" + Id).addClass("d-none");
    $("#resultado_" + Id + "_principal").addClass("d-none");
}
function VerProductos(Id) {
    $("#Resultados_" + Id).addClass("d-none");
    $("#Productos_" + Id).removeClass("d-none");
    $("#resultado_" + Id + "_principal").addClass("d-none");
}
function VolverMenuResultado(Id) {
    $("#Resultados_" + Id).addClass("d-none");
    $("#Productos_" + Id).addClass("d-none");
    $("#resultado_" + Id + "_principal").removeClass("d-none");
}

function roundTo5(num) { return Math.round(num / 5) * 5; }

function VerDetalleResultadoEsperadoHogaresUBS(Titulo) {
    $("#TituloResultadoPorAnio").html(Titulo);
    VerResultadoEsperadoHogaresUBS(Titulo);
    $("#modal-detalleresultadoanio").modal({ backdrop: 'static', keyboard: true, show: true });
}
function VerResultadoEsperadoHogaresUBS(Titulo) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListResultadoEsperadoAnioHogaresUBS", function (data, status) {

        var divTable = '<div class="col-xl-3 col-sm-12"><div class="card"><div class="card-block">';
        var fINdivTable = '</div></div></div>';
        var divFila = '';
        var tabla = '';
        var anio = 0;

        $("#detalleresultadoanio").html("");

        for (var i = 0; i < data.length; i++) {

            divFila = divFila + '<div id="chart_1" class="user-radial-card">';
            divFila = divFila + '<div data-label="AÑO ' + data[i].NroAnio + '" class="radial-bar radial-bar-' + roundTo5(data[i].PorcentageAvanzado) + ' radial-bar-lg radial-bar-success">';
            divFila = divFila + '</div>';
            divFila = divFila + '</div>';
            divFila = divFila + '<div class="row justify-content-center m-t-10">';

            divFila = divFila + '<div class="col-lg-6 col-sm-6 b-r-default m-t-5 m-b-5 text-center">';
            divFila = divFila + '<h4>' + data[i].PorcentageAvanzado + '%</h4>';
            divFila = divFila + '<h5><i class="fa fa-home" aria-hidden="true"></i>&nbsp;' + data[i].Avanzado + '</h5>';
            divFila = divFila + '<p class="text-success m-b-0"><i class="fa fa-check-circle-o m-r-5"></i>Avanzado</p>';
            divFila = divFila + '</div>';

            divFila = divFila + '<div class="col-lg-6 col-sm-6 m-t-5 m-b-5 text-center" style="padding-right: 3px;padding-left: 3px;">';
            divFila = divFila + '<h4>' + data[i].Programado + '%</h4>';
            divFila = divFila + '<h5></h5>';
            divFila = divFila + '<p class="text-info m-b-0"><i class="fa fa-calendar m-r-5"></i>Programado</p>';
            divFila = divFila + '</div>';

            divFila = divFila + '</div>';
            divFila = divFila + '</div>';

            divFila = divFila + '<div class="card-footer text-center p-t-0">';
            if (data[i].Avanzado != 0) {
                divFila = divFila + '<button class="btn btn-primary btn-round" onclick="VerDetalleResultadoEsperadoAnioDetalleHogaresUBS(\'' + Titulo + '\',' + data[i].NroAnio + ')">Ver mas&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button>';
            } else {
                divFila = divFila + '<button class="btn btn-primary btn-round disabled" disabled>Ver mas&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button>';
            }


            divFila = divFila + '</div>';


            tabla = tabla + divTable + divFila + fINdivTable;
            divFila = "";
        }

        $("#detalleresultadoanio").append(tabla);
        $.unblockUI();
    });
}
function VerDetalleResultadoEsperadoAnioDetalleHogaresUBS(Titulo, Anio) {
    $("#ttDetalleResultadoEsperado").html(Titulo + ' - Año ' + Anio);
    ListDetalleResultadoEsperadoAnioDetalleHogaresUBS(Anio);
    $("#modal-detalleresultadoesperado").modal({ backdrop: 'static', keyboard: true, show: true });
}
function ListDetalleResultadoEsperadoAnioDetalleHogaresUBS(Anio) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListResultadoEsperadoAnioDetalleHogaresUBS?anio=" + Anio, function (data, status) {

        var divTable = '<table class="table table-hover table-bordered"><tbody>';
        var fINdivTable = '</tbody></table>';
        var divFila = '';
        var tabla = '';
        var idtiposeguimiento = 0;

        var cuianterior = "";

        $("#detalleresultadoesperadoanio").html("");

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;">N°</td>'
        divFila = divFila + '<td style="vertical-align: middle;">CUI</td>'
        divFila = divFila + '<td style="vertical-align: middle;">LOCALIDAD</td>'
        divFila = divFila + '<td style="vertical-align: middle;">FECHA DE TERMINO</br>DE LA OBRA</td>'
        divFila = divFila + '<td style="vertical-align: middle;">NRO. DE VIVIENDAS</td>'
        divFila = divFila + '<td style="vertical-align: middle;">VIVIENDAS QUE</br> UTILIZAN UBS</td>'
        divFila = divFila + '<td style="vertical-align: middle;">% VIVIENDAS QUE</br> UTILIZAN UBS</td>'
        divFila = divFila + '</tr>';

        tabla = tabla + divFila;
        divFila = "";

        var cuianterior = "";
        var contar = 1;
        var contarsi = 0;
        var contarno = 0;

        var totalcasas = 0;
        var totalagua = 0;
        var totalsaneamiento = 0;

        for (var i = 0; i < data.length; i++) {

            divFila = divFila + '<tr>';
            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + moment(data[i].FechaCulminacionObra).format("DD/MM/YYYY") + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].NroViviendas + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].ViviendasUtilizanUBS + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + formatMoney(data[i].PorcentageViviendasUtilizanUBS) + '</td>';
            divFila = divFila + '</tr>';

            tabla = tabla + divFila;
            divFila = "";
            contar++;
            totalcasas = totalcasas + data[i].NroViviendas;
            totalagua = totalagua + data[i].ViviendasUtilizanUBS;

        }

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="4">TOTAL</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + totalcasas + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + totalagua + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + formatMoney((totalagua / totalcasas) * 100) + '</td>';
        divFila = divFila + '</tr>';
        tabla = tabla + divFila;

        $("#detalleresultadoesperadoanio").append(divTable + tabla + fINdivTable);
        $.unblockUI();
    });
}



function VerDetalleResultadoEsperadoMujeresJASS(Titulo) {
    $("#TituloResultadoPorAnio").html(Titulo);
    VerResultadoEsperadoMujeresJASS(Titulo);
    $("#modal-detalleresultadoanio").modal({ backdrop: 'static', keyboard: true, show: true });
}
function VerResultadoEsperadoMujeresJASS(Titulo) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListResultadoEsperadoAnioMujeresJASS", function (data, status) {

        var divTable = '<div class="col-xl-3 col-sm-12"><div class="card"><div class="card-block">';
        var fINdivTable = '</div></div></div>';
        var divFila = '';
        var tabla = '';
        var anio = 0;

        $("#detalleresultadoanio").html("");

        for (var i = 0; i < data.length; i++) {

            divFila = divFila + '<div id="chart_1" class="user-radial-card">';
            divFila = divFila + '<div data-label="AÑO ' + data[i].NroAnio + '" class="radial-bar radial-bar-' + roundTo5(data[i].PorcentageAvanzado) + ' radial-bar-lg radial-bar-success">';
            divFila = divFila + '</div>';
            divFila = divFila + '</div>';
            divFila = divFila + '<div class="row justify-content-center m-t-10">';

            divFila = divFila + '<div class="col-lg-6 col-sm-6 b-r-default m-t-5 m-b-5 text-center">';
            divFila = divFila + '<h4>' + data[i].PorcentageAvanzado + '%</h4>';
            divFila = divFila + '<h5><i class="fa fa-home" aria-hidden="true"></i>&nbsp;' + data[i].Avanzado + '</h5>';
            divFila = divFila + '<p class="text-success m-b-0"><i class="fa fa-check-circle-o m-r-5"></i>Avanzado</p>';
            divFila = divFila + '</div>';

            divFila = divFila + '<div class="col-lg-6 col-sm-6 m-t-5 m-b-5 text-center" style="padding-right: 3px;padding-left: 3px;">';
            divFila = divFila + '<h4>' + data[i].Programado + '%</h4>';
            divFila = divFila + '<h5></h5>';
            divFila = divFila + '<p class="text-info m-b-0"><i class="fa fa-calendar m-r-5"></i>Programado</p>';
            divFila = divFila + '</div>';

            divFila = divFila + '</div>';
            divFila = divFila + '</div>';

            divFila = divFila + '<div class="card-footer text-center p-t-0">';
            if (data[i].Avanzado != 0) {
                divFila = divFila + '<button class="btn btn-primary btn-round" onclick="VerDetalleResultadoEsperadoAnioDetalleMujeresJASS(\'' + Titulo + '\',' + data[i].NroAnio + ')">Ver mas&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button>';
            } else {
                divFila = divFila + '<button class="btn btn-primary btn-round disabled" disabled>Ver mas&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button>';
            }


            divFila = divFila + '</div>';


            tabla = tabla + divTable + divFila + fINdivTable;
            divFila = "";
        }

        $("#detalleresultadoanio").append(tabla);
        $.unblockUI();
    });
}

function VerDetalleResultadoEsperadoAnioDetalleMujeresJASS(Titulo, Anio) {
    $("#ttDetalleResultadoEsperado").html(Titulo + ' - Año ' + Anio);
    ListDetalleResultadoEsperadoAnioDetalleMujeresJASS(Anio);
    $("#modal-detalleresultadoesperado").modal({ backdrop: 'static', keyboard: true, show: true });
}
function ListDetalleResultadoEsperadoAnioDetalleMujeresJASS(Anio) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListResultadoEsperadoAnioDetalleMujeresJASS?anio=" + Anio, function (data, status) {

        var divTable = '<table class="table table-hover table-bordered"><tbody>';
        var fINdivTable = '</tbody></table>';
        var divFila = '';
        var tabla = '';
        var idtiposeguimiento = 0;

        var cuianterior = "";

        $("#detalleresultadoesperadoanio").html("");

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;">N°</td>'
        divFila = divFila + '<td style="vertical-align: middle;">CUI</td>'
        divFila = divFila + '<td style="vertical-align: middle;">LOCALIDAD</td>'
        divFila = divFila + '<td style="vertical-align: middle;">AÑO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">JASS CON AL MENOS</br> DOS MUJERES </br>EN SU CONSEJO</br>DIRECTIVO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">NRO. DE </br>MUJERES</td>'
        divFila = divFila + '</tr>';

        tabla = tabla + divFila;
        divFila = "";

        var cuianterior = "";
        var contar = 1;
        var contarsi = 0;
        var contarno = 0;

        var totaljass = 0;
        var nromujeres = 0;

        for (var i = 0; i < data.length; i++) {

            divFila = divFila + '<tr>';
            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + moment(data[i].FechaCantidadMujeres).format("YYYY") + '</td>';

            //preguntamos check 
            if (data[i].Check == 1) {
                divFila = divFila + '<td style="color: green;font-size: 30px;text-align:center"><i class="fa fa-check-circle" aria-hidden="true"></i></td>'
                totaljass++;
            } else {
                divFila = divFila + '<td style="color: red;font-size: 30px;text-align:center"><i class="fa fa-times-circle" aria-hidden="true"></i></td>'
            }

            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].CantidadMujeresJASS + '</td>';
            divFila = divFila + '</tr>';

            tabla = tabla + divFila;
            divFila = "";
            contar++;
            nromujeres = nromujeres + data[i].CantidadMujeresJASS;
        }

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="4">TOTAL</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + totaljass + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + nromujeres + '</td>';
        divFila = divFila + '</tr>';
        tabla = tabla + divFila;

        $("#detalleresultadoesperadoanio").append(divTable + tabla + fINdivTable);
        $.unblockUI();
    });
}




function VerDetalleResultadoEsperadoMujeresNE(Titulo) {
    $("#TituloResultadoPorAnio").html(Titulo);
    VerResultadoEsperadoMujeresNE(Titulo);
    $("#modal-detalleresultadoanio").modal({ backdrop: 'static', keyboard: true, show: true });
}
function VerResultadoEsperadoMujeresNE(Titulo) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListResultadoEsperadoAnioMujeresNE", function (data, status) {

        var divTable = '<div class="col-xl-3 col-sm-12"><div class="card"><div class="card-block">';
        var fINdivTable = '</div></div></div>';
        var divFila = '';
        var tabla = '';
        var anio = 0;

        $("#detalleresultadoanio").html("");

        for (var i = 0; i < data.length; i++) {

            divFila = divFila + '<div id="chart_1" class="user-radial-card">';
            divFila = divFila + '<div data-label="AÑO ' + data[i].NroAnio + '" class="radial-bar radial-bar-' + roundTo5(data[i].PorcentageAvanzado) + ' radial-bar-lg radial-bar-success">';
            divFila = divFila + '</div>';
            divFila = divFila + '</div>';
            divFila = divFila + '<div class="row justify-content-center m-t-10">';

            divFila = divFila + '<div class="col-lg-6 col-sm-6 b-r-default m-t-5 m-b-5 text-center">';
            divFila = divFila + '<h4>' + data[i].PorcentageAvanzado + '%</h4>';
            divFila = divFila + '<h5><i class="fa fa-home" aria-hidden="true"></i>&nbsp;' + data[i].Avanzado + '</h5>';
            divFila = divFila + '<p class="text-success m-b-0"><i class="fa fa-check-circle-o m-r-5"></i>Avanzado</p>';
            divFila = divFila + '</div>';

            divFila = divFila + '<div class="col-lg-6 col-sm-6 m-t-5 m-b-5 text-center" style="padding-right: 3px;padding-left: 3px;">';
            divFila = divFila + '<h4>' + data[i].Programado + '%</h4>';
            divFila = divFila + '<h5></h5>';
            divFila = divFila + '<p class="text-info m-b-0"><i class="fa fa-calendar m-r-5"></i>Programado</p>';
            divFila = divFila + '</div>';

            divFila = divFila + '</div>';
            divFila = divFila + '</div>';

            divFila = divFila + '<div class="card-footer text-center p-t-0">';
            if (data[i].Avanzado != 0) {
                divFila = divFila + '<button class="btn btn-primary btn-round" onclick="VerDetalleResultadoEsperadoAnioDetalleMujeresJASS(\'' + Titulo + '\',' + data[i].NroAnio + ')">Ver mas&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button>';
            } else {
                divFila = divFila + '<button class="btn btn-primary btn-round disabled" disabled>Ver mas&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button>';
            }


            divFila = divFila + '</div>';


            tabla = tabla + divTable + divFila + fINdivTable;
            divFila = "";
        }

        $("#detalleresultadoanio").append(tabla);
        $.unblockUI();
    });
}

function VerDetalleResultadoEsperadoAnioDetalleMujeresNE(Titulo, Anio) {
    $("#ttDetalleResultadoEsperado").html(Titulo + ' - Año ' + Anio);
    ListDetalleResultadoEsperadoAnioDetalleMujeresNE(Anio);
    $("#modal-detalleresultadoesperado").modal({ backdrop: 'static', keyboard: true, show: true });
}
function ListDetalleResultadoEsperadoAnioDetalleMujeresNE(Anio) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListResultadoEsperadoAnioDetalleMujeresNE?anio=" + Anio, function (data, status) {

        var divTable = '<table class="table table-hover table-bordered"><tbody>';
        var fINdivTable = '</tbody></table>';
        var divFila = '';
        var tabla = '';
        var idtiposeguimiento = 0;

        var cuianterior = "";

        $("#detalleresultadoesperadoanio").html("");

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;">N°</td>'
        divFila = divFila + '<td style="vertical-align: middle;">CUI</td>'
        divFila = divFila + '<td style="vertical-align: middle;">LOCALIDAD</td>'
        divFila = divFila + '<td style="vertical-align: middle;">AÑO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">JASS CON AL MENOS</br> DOS MUJERES </br>EN SU CONSEJO</br>DIRECTIVO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">NRO. DE </br>MUJERES</td>'
        divFila = divFila + '</tr>';

        tabla = tabla + divFila;
        divFila = "";

        var cuianterior = "";
        var contar = 1;
        var contarsi = 0;
        var contarno = 0;

        var totaljass = 0;
        var nromujeres = 0;

        for (var i = 0; i < data.length; i++) {

            divFila = divFila + '<tr>';
            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';
            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + moment(data[i].FechaCantidadMujeresNE).format("YYYY") + '</td>';

            //preguntamos check 
            if (data[i].Check == 1) {
                divFila = divFila + '<td style="color: green;font-size: 30px;text-align:center"><i class="fa fa-check-circle" aria-hidden="true"></i></td>'
                totaljass++;
            } else {
                divFila = divFila + '<td style="color: red;font-size: 30px;text-align:center"><i class="fa fa-times-circle" aria-hidden="true"></i></td>'
            }

            divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].CantidadMujeresNE + '</td>';
            divFila = divFila + '</tr>';

            tabla = tabla + divFila;
            divFila = "";
            contar++;
            nromujeres = nromujeres + data[i].CantidadMujeresNE;
        }

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="4">TOTAL</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + totaljass + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + nromujeres + '</td>';
        divFila = divFila + '</tr>';
        tabla = tabla + divFila;

        $("#detalleresultadoesperadoanio").append(divTable + tabla + fINdivTable);
        $.unblockUI();
    });
}


function VerSeguimientoJASSCapacitadas(Titulo) {
    $("#titulodetalleseguimiento").html(Titulo);
    ListSeguimientoJASSCapacitadas();
    $("#modal-detalleseguimiento").modal({ backdrop: 'static', keyboard: true, show: true });
    
}
function ListSeguimientoJASSCapacitadas() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListProductoSeguimientoJASScapacitadas", function (data, status) {

        var divTable = '<table class="table table-hover table-bordered" id="tblSeguimiento"><tbody>';
        var fINdivTable = '</tbody></table>';
        var divFila = '';
        var tabla = '';
        var idtiposeguimiento = 0;

        var cuianterior = "";

        $("#detalleSeguimiento").html("");

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">N°</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">CUI</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">LOCALIDAD</td>'
        divFila = divFila + '<td style="vertical-align: middle;" colspan="3">TOTAL</td>'
        divFila = divFila + '<td style="vertical-align: middle;" colspan="2">SESIÓN EDUCATIVA: </br>"HERRAMIENTAS PARA LA GESTIÓN DE LA JASS </br>(ESTATUTO Y REGLAMENTO), ROLES Y FUNCIONES DEL CD </br>JASS; DERECHOS Y OBLIGACIONES DE LOS</br> ASOCIADOS"</td>'
        divFila = divFila + '<td style="vertical-align: middle;" colspan="2">SESIÓN EDUCATIVA: </br>REGLAMENTO INTERNO DE PRESTACIÓN DE </br>SERVICIOS DE SANEAMIENTO.</td>'
        divFila = divFila + '<td style="vertical-align: middle;" colspan="2">ASAMBLEA: </br>RATIFICACION DE COMPROMISOS PARA EL </br>PAGO OPORTUNO DE LA CUOTA FAMILIAR Y ADECUADA </br>ADMINISTRACION, OPERACIÓN Y MANTENIMIENTO </br>DEL SAS (FAMILIAS, JASS Y AUTORIDADES </br>COMUNALES)</td>'
        divFila = divFila + '<td style="vertical-align: middle;" colspan="2">SESIÓN EDUCATIVA: </br>“OPERACIÓN Y MANTENIMIENTO DEL SISTEMA, </br>RESPONSABLES DE LA OPERACIÓN Y </br>MANTENIMIENTO. ALMACENAMIENTO DE MATERIALES, </br>HERRAMIENTAS Y EQUIPOS".</td>'
        divFila = divFila + '<td style="vertical-align: middle;" colspan="2">SESIÓN EDUCATIVA: </br>"OPERACIÓN Y MANTENIMIENTO ADECUADO DE </br>LA UBS TIPO: COMPOSTERAS/ARRASTRE HIDRÁULICO, </br>USO ADECUADO DE LAS UBS TIPO </br>COMPOSTERA/ARRASTRE HIDRÁULICO"</td>'

        divFila = divFila + '</tr>';

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;">PROGRAMADO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">AVANZADO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">%</td>'
        divFila = divFila + '<td style="vertical-align: middle;">FECHA</td>'
        divFila = divFila + '<td style="vertical-align: middle;">ACTA</td>'
        divFila = divFila + '<td style="vertical-align: middle;">FECHA</td>'
        divFila = divFila + '<td style="vertical-align: middle;">ACTA</td>'
        divFila = divFila + '<td style="vertical-align: middle;">FECHA</td>'
        divFila = divFila + '<td style="vertical-align: middle;">ACTA</td>'
        divFila = divFila + '<td style="vertical-align: middle;">FECHA</td>'
        divFila = divFila + '<td style="vertical-align: middle;">ACTA</td>'
        divFila = divFila + '<td style="vertical-align: middle;">FECHA</td>'
        divFila = divFila + '<td style="vertical-align: middle;">ACTA</td>'
        divFila = divFila + '</tr>';

        tabla = tabla + divFila;
        divFila = "";

        var cuianterior = "";
        var contar = 1;
        var columna = 1;
        var contars1 = 0;
        var contars2 = 0;
        var contars3 = 0;
        var contars4 = 0;
        var contars5 = 0;
        var contar100 = 0;

        for (var i = 0; i < data.length; i++) {
            if (cuianterior == "") { //aperturamos fila 

                cuianterior = data[i].CUI; //asignamos nuevo valor

                if (data[i].PorcentageAvanzado != 100) {
                    divFila = divFila + '<tr style="background-color:#FFC7CE; color:#9C0006">';
                } else {
                    divFila = divFila + '<tr>';
                }

                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';

                divFila = divFila + '<td style="text-align:center">' + data[i].TotalProgramado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + data[i].TotalAvanzado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + formatMoney(data[i].PorcentageAvanzado) + '%</td>'

                if (data[i].PorcentageAvanzado == 100) { contar100++;}

                tabla = tabla + divFila;
                divFila = "";
                contar++;
                columna = 1;
            }
            else if (data[i].CUI == cuianterior) { //preguntamos si el cui anterior es igual al nuevo cui

                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].Fecha + '</td>';
                
                

                if (data[i].Fecha != "") {
                    divFila = divFila + '<td style="text-align:center"><a href="../Archivos/Acta de Aprobacion.pdf" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></td>';//FILA VACIA PARA ACTAS

                    switch (columna) {

                        case 1:
                            contars1++;
                            break
                        case 2:
                            contars2++;
                            break;
                        case 3:
                            contars3++;
                            break;
                        case 4:
                            contars4++;
                            break;
                        case 5:
                            contars5++;
                            break;

                        default:

                    }
                }
                else {
                    divFila = divFila + '<td style="text-align:center"></td>';
                }

                tabla = tabla + divFila;
                divFila = "";
                columna++;
            }
            else { //si el cui es diferente al cui anterior

                divFila = divFila + '</tr>';
                tabla = tabla + divFila;
                divFila = "";

                cuianterior = data[i].CUI; //asignamos nuevo valor

                if (data[i].PorcentageAvanzado != 100) {
                    divFila = divFila + '<tr style="background-color:#FFC7CE; color:#9C0006">';
                } else {
                    divFila = divFila + '<tr>';
                }

                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';

                divFila = divFila + '<td style="text-align:center">' + data[i].TotalProgramado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + data[i].TotalAvanzado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + formatMoney(data[i].PorcentageAvanzado) + '%</td>'

                if (data[i].PorcentageAvanzado == 100) { contar100++; }

                tabla = tabla + divFila;
                divFila = "";
                contar++;
                columna = 1;
            }

        }
       
        

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="3">Total de JASS capacitadas al 100%</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="3">' + contar100 + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="2">' + contars1 + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="2">' + contars2 + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="2">' + contars3 + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="2">' + contars4 + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="2">' + contars5 + '</td>';
        divFila = divFila + '</tr>';
        tabla = tabla + divFila;

        $.unblockUI();
        $("#detalleSeguimiento").append(divTable + tabla + fINdivTable);
    });
}

function VerSeguimientoTalleresLiderazgoMujeres(Titulo) {
    $("#titulodetalleseguimiento").html(Titulo);
    ListSeguimientoTalleresLiderazgoMujeres();
    $("#modal-detalleseguimiento").modal({ backdrop: 'static', keyboard: true, show: true });

}
function ListSeguimientoTalleresLiderazgoMujeres() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListProductoSeguimientoTalleresDirigidoMujeres", function (data, status) {

        var divTable = '<table class="table table-hover table-bordered" id="tblSeguimiento"><tbody>';
        var fINdivTable = '</tbody></table>';
        var divFila = '';
        var tabla = '';
        var idtiposeguimiento = 0;

        var cuianterior = "";

        $("#detalleSeguimiento").html("");

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">N°</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">CUI</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">LOCALIDAD</td>'
        divFila = divFila + '<td style="vertical-align: middle;" colspan="3">TOTAL</td>'
        divFila = divFila + '<td style="vertical-align: middle;" colspan="2">SESIÓN EDUCATIVA: </br>AUTOESTIMA Y LIDERAZGO PARA LA GESTIÓN. </br>LIDERAZGO DIRIGIDO A MUJERES </br>DE LA JASS.</td>'
        divFila = divFila + '</tr>';

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;">PROGRAMADO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">AVANZADO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">%</td>'
        divFila = divFila + '<td style="vertical-align: middle;">FECHA</td>'
        divFila = divFila + '<td style="vertical-align: middle;">ACTA</td>'
        divFila = divFila + '</tr>';

        tabla = tabla + divFila;
        divFila = "";

        var cuianterior = "";
        var contar = 1;
        var columna = 1;
        var contars1 = 0;
        var contars2 = 0;
        var contars3 = 0;
        var contars4 = 0;
        var contars5 = 0;
        var contar100 = 0;

        for (var i = 0; i < data.length; i++) {
            if (cuianterior == "") { //aperturamos fila 

                cuianterior = data[i].CUI; //asignamos nuevo valor

                if (data[i].PorcentageAvanzado != 100)
                {
                    divFila = divFila + '<tr style="background-color:#FFC7CE; color:#9C0006">';
                } else {
                    divFila = divFila + '<tr>';
                }
                
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';

                divFila = divFila + '<td style="text-align:center">' + data[i].TotalProgramado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + data[i].TotalAvanzado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + formatMoney(data[i].PorcentageAvanzado) + '%</td>'

                if (data[i].PorcentageAvanzado == 100) { contar100++; }

                tabla = tabla + divFila;
                divFila = "";
                contar++;
                columna = 1;
            }
            else if (data[i].CUI == cuianterior) { //preguntamos si el cui anterior es igual al nuevo cui

                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].Fecha + '</td>';

                if (data[i].Fecha != "") {
                    divFila = divFila + '<td style="text-align:center"><a href="../Archivos/Acta de Aprobacion.pdf" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></td>';//FILA VACIA PARA ACTAS
                    switch (columna) {

                        case 1:
                            contars1++;
                            break
                        case 2:
                            contars2++;
                            break;
                        case 3:
                            contars3++;
                            break;
                        case 4:
                            contars4++;
                            break;
                        case 5:
                            contars5++;
                            break;

                        default:

                    }
                } else {
                    divFila = divFila + '<td style="text-align:center"></td>';
                }

                tabla = tabla + divFila;
                divFila = "";
                columna++;
            }
            else { //si el cui es diferente al cui anterior

                divFila = divFila + '</tr>';
                tabla = tabla + divFila;
                divFila = "";

                cuianterior = data[i].CUI; //asignamos nuevo valor

                if (data[i].PorcentageAvanzado != 100) {
                    divFila = divFila + '<tr style="background-color:#FFC7CE; color:#9C0006">';
                } else {
                    divFila = divFila + '<tr>';
                }

                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';

                divFila = divFila + '<td style="text-align:center">' + data[i].TotalProgramado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + data[i].TotalAvanzado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + formatMoney(data[i].PorcentageAvanzado) + '%</td>'

                if (data[i].PorcentageAvanzado == 100) { contar100++; }

                tabla = tabla + divFila;
                divFila = "";
                contar++;
                columna = 1;
            }

        }



        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="3">Total de JASS capacitadas al 100%</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="3">' + contar100 + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="2">' + contars1 + '</td>';
        divFila = divFila + '</tr>';
        tabla = tabla + divFila;

        $.unblockUI();
        $("#detalleSeguimiento").append(divTable + tabla + fINdivTable);
    });
}

/*PRODUCTOS******************ATM capacitadas para brindar asistencia técnica a las JASS************************/
function VerSeguimientoActividadesATM(Titulo)
{
    $("#titulodetalleseguimiento").html(Titulo);
    ListSeguimientoActividadesATM(Titulo);
    $("#modal-detalleseguimiento").modal({ backdrop: 'static', keyboard: true, show: true });

} 
function ListSeguimientoActividadesATM(Titulo) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListProductoSeguimientoATM", function (data, status) {

        var divTable = '<table class="table table-hover table-bordered" id="tblSeguimiento"><tbody>';
        var fINdivTable = '</tbody></table>';
        var divFila = '';
        var tabla = '';
        var idtiposeguimiento = 0;

        var cuianterior = "";

        $("#detalleSeguimiento").html("");

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">N°</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">DEPARTAMENTO</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">PROVINCIA</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">DISTRITO</td>'
        divFila = divFila + '<td style="vertical-align: middle;" colspan="3">TOTAL</td>'
        divFila = divFila + '<td style="vertical-align: middle;" colspan="3">TOTAL ETAPA </br>DE EJECUCIÓN </br> <button class="btn-atras-breadcrunt-pnsr" onclick="VerSeguimientoActividadesATMSubdetalle(\'' + Titulo + '\',\'Ejecución\')">Ver detalle&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button></td>'
        divFila = divFila + '<td style="vertical-align: middle;" colspan="3">TOTAL ETAPA </br>DE OTA</br> <button class="btn-atras-breadcrunt-pnsr" onclick="VerSeguimientoActividadesATMSubdetalle(\'' + Titulo + '\',\'OTA\')">Ver detalle&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button></td>'
        
        divFila = divFila + '</tr>';

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;">PROGRAMADO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">AVANZADO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">%</td>'
        divFila = divFila + '<td style="vertical-align: middle;">PROGRAMADO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">AVANZADO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">%</td>'
        divFila = divFila + '<td style="vertical-align: middle;">PROGRAMADO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">AVANZADO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">%</td>'
        divFila = divFila + '</tr>';

        tabla = tabla + divFila;
        divFila = "";

        var cuianterior = "";
        var contar = 1;
        var columna = 1;
        var contars1 = 0;
        var contars2 = 0;
        var contars3 = 0;
        var contars4 = 0;
        var contars5 = 0;
        var contars6 = 0;
        var contars7 = 0;
        var contars8 = 0;
        var contars9 = 0;
        var contars10 = 0;
        var contars11 = 0;
        var contars12 = 0;
        var contars13 = 0;
        var contars14 = 0;
        var contars15 = 0;
        var contars16 = 0;
        var contars17 = 0;
        var contars18 = 0;
        var contars19 = 0;
        var contars20 = 0;
        var contars21 = 0;
        var contars22 = 0;
        var contars23 = 0;
        var contars24 = 0;
        var contars25 = 0;
        var contars26 = 0;
        var contars27 = 0;
        var contars28 = 0;
        var contars29 = 0;

        var contarejecucion = 0;
        var contarota = 0;
        var Totalejecucion = 0;
        var Totalota = 0;

        var contar100 = 0;

        for (var i = 0; i < data.length; i++) {
            if (cuianterior == "") { //aperturamos fila 

                cuianterior = data[i].Ubigeo; //asignamos nuevo valor

                if (data[i].PorcentageAvanzado != 100) {
                    divFila = divFila + '<tr style="background-color:#FFC7CE; color:#9C0006">';
                } else {
                    divFila = divFila + '<tr>';
                }

                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Departamento + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Provincia + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Distrito + '</td>';

                divFila = divFila + '<td style="text-align:center">' + data[i].TotalProgramado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + data[i].TotalAvanzado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + formatMoney(data[i].PorcentageAvanzado) + '%</td>'

                if (data[i].PorcentageAvanzado == 100) { contar100++; }

                tabla = tabla + divFila;
                divFila = "";
                contar++;
                columna = 1;
            }
            else if (data[i].Ubigeo == cuianterior) { //preguntamos si el cui anterior es igual al nuevo cui

                //divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].Fecha + '</td>';

                if (data[i].Fecha != "") {
                    switch (columna) {

                        case 1:
                            contars1++;
                            break
                        case 2:
                            contars2++;
                            break;
                        case 3:
                            contars3++;
                            break;
                        case 4:
                            contars4++;
                            break;
                        case 5:
                            contars5++;
                            break;
                        case 6:
                            contars6++;
                            break;
                        case 7:
                            contars7++;
                            break;
                        case 8:
                            contars8++;
                            break;
                        case 9:
                            contars9++;
                            break;
                        case 10:
                            contars10++;
                            break;
                        case 11:
                            contars11++;
                            break;
                        case 12:
                            contars12++;
                            break;
                        case 13:
                            contars13++;
                            break;
                        case 14:
                            contars14++;
                            break;
                        case 15:
                            contars15++;
                            break;
                        case 16:
                            contars16++;
                            break;
                        case 17:
                            contars17++;
                            break;
                        case 18:
                            contars18++;
                            break;
                        case 19:
                            contars19++;
                            break;
                        case 20:
                            contars20++;
                            break;
                        case 21:
                            contars21++;
                            break;
                        case 22:
                            contars22++;
                            break;
                        case 23:
                            contars23++;
                            break;
                        case 24:
                            contars24++;
                            break;
                        case 25:
                            contars25++;
                            break;
                        case 25:
                            contars25++;
                            break;
                        case 26:
                            contars26++;
                            break;
                        case 27:
                            contars27++;
                            break;
                        case 28:
                            contars28++;
                            break;

                        default:

                    }
                }

                if (columna >= 1 && columna <= 18)
                {
                    if (data[i].Fecha != "") { contarejecucion++; }
                }
                if (columna >= 19 && columna <= 29)
                {
                    if (data[i].Fecha != "") { contarota++; }
                }

                if (data.length-1 == i) { // ultima fila 
                    divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + 18 + '</td>';
                    divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contarejecucion + '</td>';
                    divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + formatMoney((contarejecucion / 18) * 100) + '%</td>';

                    if (formatMoney((contarejecucion / 18) * 100) == "100.00") { Totalejecucion++; }

                    divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + 11 + '</td>';
                    divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contarota + '</td>';
                    divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + formatMoney((contarota / 11) * 100) + '%</td>';

                    if (formatMoney((contarejecucion / 11) * 100) == "100.00") { Totalota++; }

                    divFila = divFila + '</tr>';
                    tabla = tabla + divFila;
                    divFila = "";
                }

                columna++;
            }
            else { //si el cui es diferente al cui anterior


                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + 18 + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contarejecucion + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + formatMoney((contarejecucion / 18) * 100) + '%</td>';

                if (formatMoney((contarejecucion / 18) * 100) == "100.00") { Totalejecucion++; }

                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + 11 + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contarota + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + formatMoney((contarota / 11) * 100) + '%</td>';

                if (formatMoney((contarota / 11) * 100) == "100.00") { Totalota++; }

                divFila = divFila + '</tr>';
                tabla = tabla + divFila;
                divFila = "";

                cuianterior = data[i].Ubigeo; //asignamos nuevo valor

                if (data[i].PorcentageAvanzado != 100) {
                    divFila = divFila + '<tr style="background-color:#FFC7CE; color:#9C0006">';
                } else {
                    divFila = divFila + '<tr>';
                }

                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Departamento + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Provincia + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Distrito + '</td>';

                divFila = divFila + '<td style="text-align:center">' + data[i].TotalProgramado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + data[i].TotalAvanzado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + formatMoney(data[i].PorcentageAvanzado) + '%</td>'

                if (data[i].PorcentageAvanzado == 100) { contar100++; }

                tabla = tabla + divFila;
                divFila = "";
                contar++;
                columna = 1;
                contarejecucion = 0;
                contarota = 0;
            }        
        }
        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="4">Total de ATM capacitadas al 100%</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="3">' + contar100 + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="3">' + Totalejecucion + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="3">' + Totalota + '</td>';
        divFila = divFila + '</tr>';
        tabla = tabla + divFila;

        $.unblockUI();
        $("#detalleSeguimiento").append(divTable + tabla + fINdivTable);
    });
}
/*PRODUCTOS******************ATM capacitadas para brindar asistencia técnica a las JASS************************/

/*PRODUCTOS******************Núcleos Ejecutores capacitados en gestión y administración de proyectos************************/
function VerSeguimientoActividadesNE(Titulo) {

    $("#titulodetalleseguimiento").html(Titulo);
    ListSeguimientoActividadesNE(Titulo);
    $("#modal-detalleseguimiento").modal({ backdrop: 'static', keyboard: true, show: true });

}
function ListSeguimientoActividadesNE(Titulo) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListProductoSeguimientoNE", function (data, status) {

        var divTable = '<table class="table table-hover table-bordered" id="tblSeguimiento"><tbody>';
        var fINdivTable = '</tbody></table>';
        var divFila = '';
        var tabla = '';
        var idtiposeguimiento = 0;

        var cuianterior = "";

        $("#detalleSeguimiento").html("");

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">N°</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">CUI</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">LOCALIDAD</td>'
        divFila = divFila + '<td style="vertical-align: middle;" colspan="3">TOTAL ETAPA </br>DE EJECUCIÓN</br> <button class="btn-atras-breadcrunt-pnsr" onclick="VerSeguimientoActividadesNESubdetalle(\'' + Titulo + '\',\'Ejecución\')">Ver detalle&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button></td>'

        divFila = divFila + '</tr>';

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;">PROGRAMADO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">AVANZADO</td>'
        divFila = divFila + '<td style="vertical-align: middle;">%</td>'

        divFila = divFila + '</tr>';

        tabla = tabla + divFila;
        divFila = "";

        var cuianterior = "";
        var contar = 1;
        var columna = 1;
        var contars1 = 0;
        var contars2 = 0;
        var contars3 = 0;
        var contars4 = 0;
        var contars5 = 0;
        var contars6 = 0;
        var contars7 = 0;
        var contars8 = 0;
        var contars9 = 0;
        var contars10 = 0;
        var contars11 = 0;
        var contars12 = 0;
        var contars13 = 0;
        var contars14 = 0;
        var contars15 = 0;
        var contars16 = 0;
        var contars17 = 0;
        var contars18 = 0;
        var contars19 = 0;
        var contars20 = 0;
        var contars21 = 0;
        var contars22 = 0;
        var contars23 = 0;
        var contars24 = 0;
        var contars25 = 0;
        var contars26 = 0;
        var contars27 = 0;
        var contars28 = 0;
        var contars29 = 0;

        var contarejecucion = 0;
        var contarota = 0;
        var Totalejecucion = 0;
        var Totalota = 0;

        var contar100 = 0;

        for (var i = 0; i < data.length; i++) {
            if (cuianterior == "") { //aperturamos fila 

                cuianterior = data[i].CUI; //asignamos nuevo valor

                if (data[i].PorcentageAvanzado != 100) {
                    divFila = divFila + '<tr style="background-color:#FFC7CE; color:#9C0006">';
                } else {
                    divFila = divFila + '<tr>';
                }
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';

                divFila = divFila + '<td style="text-align:center">' + data[i].TotalProgramado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + data[i].TotalAvanzado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + formatMoney(data[i].PorcentageAvanzado) + '%</td>'

                if (data[i].PorcentageAvanzado == 100) { contar100++; }

                tabla = tabla + divFila;
                divFila = "";
                contar++;
                columna = 1;
            }
            else if (data[i].CUI == cuianterior) { //preguntamos si el cui anterior es igual al nuevo cui

            }
            else { //si el cui es diferente al cui anterior

                divFila = divFila + '</tr>';
                tabla = tabla + divFila;
                divFila = "";

                cuianterior = data[i].CUI; //asignamos nuevo valor

                if (data[i].PorcentageAvanzado != 100) {
                    divFila = divFila + '<tr style="background-color:#FFC7CE; color:#9C0006">';
                } else {
                    divFila = divFila + '<tr>';
                }
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';

                divFila = divFila + '<td style="text-align:center">' + data[i].TotalProgramado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + data[i].TotalAvanzado + '</td>'
                divFila = divFila + '<td style="text-align:center">' + formatMoney(data[i].PorcentageAvanzado) + '%</td>'

                if (data[i].PorcentageAvanzado == 100) { contar100++; }

                tabla = tabla + divFila;
                divFila = "";
                contar++;
                columna = 1;
                contarejecucion = 0;
                contarota = 0;
            }
        }
        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="3">Total de NE capacitados al 100%</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="3">' + contar100 + '</td>';
        divFila = divFila + '</tr>';
        tabla = tabla + divFila;

        $.unblockUI();
        $("#detalleSeguimiento").append(divTable + tabla + fINdivTable);
    });
}
/*PRODUCTOS******************Núcleos Ejecutores capacitados en gestión y administración de proyectos************************/

function VerDetalleResultadoEsperadoCuotaFamiliar(Titulo) {
    $("#TituloResultadoPorAnio").html(Titulo);
    ListResultadoEsperadoCuotaFamiliar(Titulo);
    $("#modal-detalleresultadoanio").modal({ backdrop: 'static', keyboard: true, show: true });
}
function ListResultadoEsperadoCuotaFamiliar(Titulo) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListResultadoEsperadoAnioCuotaFamiliar", function (data, status) {

        var divTable = '<div class="col-xl-3 col-sm-12"><div class="card"><div class="card-block">';
        var fINdivTable = '</div></div></div>';
        var divFila = '';
        var tabla = '';
        var anio = 0;

        $("#detalleresultadoanio").html("");

        for (var i = 0; i < data.length; i++) {

            divFila = divFila + '<div id="chart_1" class="user-radial-card">';
            divFila = divFila + '<div data-label="AÑO ' + data[i].NroAnio + '" class="radial-bar radial-bar-' + roundTo5(data[i].PorcentageAvanzado) + ' radial-bar-lg radial-bar-success">';
            divFila = divFila + '</div>';
            divFila = divFila + '</div>';
            divFila = divFila + '<div class="row justify-content-center m-t-10">';

            divFila = divFila + '<div class="col-lg-6 col-sm-6 b-r-default m-t-5 m-b-5 text-center">';
            divFila = divFila + '<h4>' + data[i].PorcentageAvanzado + '%</h4>';
            divFila = divFila + '<h5><i class="fa fa-home" aria-hidden="true"></i>&nbsp;' + data[i].Avanzado + '</h5>';
            divFila = divFila + '<p class="text-success m-b-0"><i class="fa fa-check-circle-o m-r-5"></i>Avanzado</p>';
            divFila = divFila + '</div>';

            divFila = divFila + '<div class="col-lg-6 col-sm-6 m-t-5 m-b-5 text-center" style="padding-right: 3px;padding-left: 3px;">';
            divFila = divFila + '<h4>' + data[i].Programado + '</h4>';
            divFila = divFila + '<h5></h5>';
            divFila = divFila + '<p class="text-info m-b-0"><i class="fa fa-calendar m-r-5"></i>Programado</p>';
            divFila = divFila + '</div>';

            divFila = divFila + '</div>';
            divFila = divFila + '</div>';

            divFila = divFila + '<div class="card-footer text-center p-t-0">';
            if (data[i].Avanzado != 0) {
                divFila = divFila + '<button class="btn btn-primary btn-round" onclick="VerDetalleResultadoEsperadoAnioDetalleCuotaFamiliar(\'' + Titulo + '\',' + data[i].NroAnio + ')">Ver mas&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button>';
            } else {
                divFila = divFila + '<button class="btn btn-primary btn-round disabled" disabled>Ver mas&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button>';
            }


            divFila = divFila + '</div>';


            tabla = tabla + divTable + divFila + fINdivTable;
            divFila = "";
        }

        $("#detalleresultadoanio").append(tabla);
        $.unblockUI();
    });
}
function VerDetalleResultadoEsperadoAnioDetalleCuotaFamiliar(Titulo, Anio) {
    $("#ttDetalleResultadoEsperado").html(Titulo + ' - Año ' + Anio);
    ListDetalleResultadoEsperadoAnioDetalleMujeresNE(Anio);
    $("#modal-detalleresultadoesperado").modal({ backdrop: 'static', keyboard: true, show: true });
}
function ListDetalleResultadoEsperadoAnioDetalleMujeresNE(Anio) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListResultadoEsperadoAnioDetalleCuotaFamiliar?anio=" + Anio, function (data, status) {

        var divTable = '<table class="table table-hover table-bordered" id="tblSeguimiento"><tbody>';
        var fINdivTable = '</tbody></table>';
        var divFila = '';
        var tabla = '';
        var idtiposeguimiento = 0;

        var cuianterior = "";

        $("#detalleresultadoesperadoanio").html("");

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">N°</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">CUI</td>'
        divFila = divFila + '<td style="vertical-align: middle;" rowspan="2">LOCALIDAD</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="4">TOTAL DE USUARIOS </br> QUE PAGAN PUNTUALMENTE</br> LA CUOTA FAMILIAR</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="5">1ra Cuota:  </br> JASS cobra la cuota  </br> familiar a los usuarios  </br> del servicio de agua </br>  potable. </td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="5">2da Cuota:  </br> JASS cobra la cuota  </br> familiar a los usuarios  </br> del servicio de agua </br>  potable. </td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="5">3ra Cuota:  </br> JASS cobra la cuota  </br> familiar a los usuarios  </br> del servicio de agua </br>  potable. </td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="5">4ta Cuota:  </br> JASS cobra la cuota  </br> familiar a los usuarios  </br> del servicio de agua </br>  potable. </td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="5">5ta Cuota:  </br> JASS cobra la cuota  </br> familiar a los usuarios  </br> del servicio de agua </br>  potable. </td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="5">6ta Cuota:  </br> JASS cobra la cuota  </br> familiar a los usuarios  </br> del servicio de agua </br>  potable. </td>'
        divFila = divFila + '</tr>';

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Masculino</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Femenino</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Total</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">% Total</td>'

        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Fecha</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Masculino</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Femenino</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Total</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">% Total</td>'

        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Fecha</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Masculino</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Femenino</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Total</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">% Total</td>'

        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Fecha</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Masculino</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Femenino</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Total</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">% Total</td>'

        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Fecha</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Masculino</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Femenino</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Total</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">% Total</td>'

        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Fecha</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Masculino</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Femenino</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Total</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">% Total</td>'

        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Fecha</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Masculino</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Femenino</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">Total</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">% Total</td>'

        divFila = divFila + '</tr>';

        tabla = tabla + divFila;
        divFila = "";

        var cuianterior = "";
        var contar = 1;
        var contarsi = 0;
        var contarno = 0;

        var totalhombres = 0;
        var totalmujeres = 0;
        var totalp = 0;
        var contar100 = 0;

        for (var i = 0; i < data.length; i++) {
            debugger;
            if (cuianterior == "") { //aperturamos fila 

                cuianterior = data[i].CUI; //asignamos nuevo valor

                //if (data[i].PorcentageTotal != 100) {
                //    divFila = divFila + '<tr style="background-color:#FFC7CE; color:#9C0006">';
                //} else {
                //    divFila = divFila + '<tr>';
                //}
                divFila = divFila + '<tr>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';

                divFila = divFila + '<td style="text-align:center">' + data[i].NroHombres + '</td>'
                divFila = divFila + '<td style="text-align:center">' + data[i].NroMujeres + '</td>'
                divFila = divFila + '<td style="text-align:center">' + data[i].Total + '</td>'
                divFila = divFila + '<td style="text-align:center">' + formatMoney(data[i].PorcentageTotal) + '%</td>'

                if (data[i].PorcentageTotal >= 80) { contar100++; }

                totalhombres = totalhombres + data[i].NroHombres;
                totalmujeres = totalmujeres + data[i].NroMujeres;
                totalp = totalp + data[i].Total;


                tabla = tabla + divFila;
                divFila = "";
                contar++;
                columna = 1;
            }
            else if (data[i].CUI == cuianterior) { //preguntamos si el cui anterior es igual al nuevo cui
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].Fecha + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].NroHombres + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].NroMujeres + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].Total + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + formatMoney(data[i].PorcentageTotal) + '</td>';

                tabla = tabla + divFila;
                divFila = "";
            }
            else { //si el cui es diferente al cui anterior

                divFila = divFila + '</tr>';
                tabla = tabla + divFila;
                divFila = "";

                cuianterior = data[i].CUI; //asignamos nuevo valor

                //if (data[i].PorcentageTotal != 100) {
                //    divFila = divFila + '<tr style="background-color:#FFC7CE; color:#9C0006">';
                //} else {
                //    divFila = divFila + '<tr>';
                //}
                divFila = divFila + '<tr>';
                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';

                divFila = divFila + '<td style="text-align:center">' + data[i].NroHombres + '</td>'
                divFila = divFila + '<td style="text-align:center">' + data[i].NroMujeres + '</td>'
                divFila = divFila + '<td style="text-align:center">' + data[i].Total + '</td>'
                divFila = divFila + '<td style="text-align:center">' + formatMoney(data[i].PorcentageTotal) + '%</td>'

                if (data[i].PorcentageTotal >= 80) { contar100++; }

                totalhombres = totalhombres + data[i].NroHombres;
                totalmujeres = totalmujeres + data[i].NroMujeres;
                totalp = totalp + data[i].Total;

                tabla = tabla + divFila;
                divFila = "";
                contar++;
            }
        }

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="3">TOTAL</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + totalhombres + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + totalmujeres + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + totalp + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar100 + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="30" ></td>';
        divFila = divFila + '</tr>';
        tabla = tabla + divFila;

        $("#detalleresultadoesperadoanio").append(divTable + tabla + fINdivTable);
        $.unblockUI();
    });
}


function VerSeguimientoSistemasOTAConcluida(Titulo) {
    $("#titulodetalleseguimiento").html(Titulo);
    ListSeguimientoSistemasOTAConcluida();
    $("#modal-detalleseguimiento").modal({ backdrop: 'static', keyboard: true, show: true });

}
function ListSeguimientoSistemasOTAConcluida() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListProductosSistemasOTAConcluidas", function (data, status) {

        var divTable = '<table class="table table-hover table-bordered" id="tblSeguimiento"><tbody>';
        var fINdivTable = '</tbody></table>';
        var divFila = '';
        var tabla = '';
        var idtiposeguimiento = 0;

        var cuianterior = "";

        $("#detalleSeguimiento").html("");

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;">N°</td>'
        divFila = divFila + '<td style="vertical-align: middle;">CUI</td>'
        divFila = divFila + '<td style="vertical-align: middle;">LOCALIDAD</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">AÑO 1:</br>2019</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">AÑO 2:</br>2020</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">AÑO 3:</br>2021</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">AÑO 4:</br>2022</td>'
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">AÑO 5:</br>2023</td>'
        
        divFila = divFila + '</tr>';

        tabla = tabla + divFila;
        divFila = "";

        var cuianterior = "";
        var contar = 1;
        var columna = 1;
        var contars1 = 0;
        var contars2 = 0;
        var contars3 = 0;
        var contars4 = 0;
        var contars5 = 0;
        var contar100 = 0;

        for (var i = 0; i < data.length; i++) {
            if (data[i].Fecha == "") {
                divFila = divFila + '<tr style="background-color:#FFC7CE; color:#9C0006">';
            } else {
                divFila = divFila + '<tr>';
            }

                divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].CUI + '</td>';
                divFila = divFila + '<td style="vertical-align: middle;">' + data[i].Localidad + '</td>';
                debugger;
                switch (data[i].Anio) {
                    case 0:
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        break;
                    case 2019:
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].Fecha + '</td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        contars1++;
                        break;
                    case 2020:
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].Fecha + '</td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        contars2++;
                        break;
                    case 2021:
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].Fecha + '</td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        contars3++;
                        break;
                    case 2022:
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].Fecha + '</td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        contars4++;
                        break;
                    case 2023:
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center"></td>';
                        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + data[i].Fecha + '</td>';
                        contars5++;
                        break;

                    default:
                }

                divFila = divFila + '</tr>';
                tabla = tabla + divFila;
                divFila = "";
                contar++;
        }

        divFila = divFila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center" colspan="3">Total de Sistemas</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contars1 + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contars2 + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contars3 + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contars4 + '</td>';
        divFila = divFila + '<td style="vertical-align: middle;text-align:center">' + contars5 + '</td>';
        divFila = divFila + '</tr>';
        tabla = tabla + divFila;

        $.unblockUI();
        $("#detalleSeguimiento").append(divTable + tabla + fINdivTable);
    });
}

/*PRODUCTOS****SUBDETALLE**************ATM capacitadas para brindar asistencia técnica a las JASS************************/
function VerSeguimientoActividadesATMSubdetalle(Titulo, Etapa) {
    $("#titulodetalleseguimientosubdetalle").html(Titulo);
    ListSeguimientoActividadesATMSubdetalle(Etapa);
    $("#modal-detalleseguimiento-subdetalle").modal({ backdrop: 'static', keyboard: true, show: true });
}
function ListSeguimientoActividadesATMSubdetalle(Etapa) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListProductoSeguimientoATMDetalles?Etapa=" + Etapa, function (data, status) {

        var TablaInicio = '<table class="table table-hover table-bordered" id="tblSeguimiento">';
        var TablaFin = '</table>';

        var Body = '';
        var BodyInicio = '<tbody>';
        var BodyFin = '</tbody>';
        
        var Header = '';
        var HeaderInicio = '<thead>';
        var HeaderFin = '</thead>';



        var Fila = '';

        var contar = 1;
        var anterior = "";

        //Limpiar Div
        $("#detalleSeguimientosubdetalle").html("");

        /*********************************************Crear Header******************************************************/

        Fila = Fila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
        
        for (var a = 0; a < data.Columnas.length; a++) {
            Fila = Fila + '<th style="vertical-align: middle;text-align:center;white-space: pre-wrap;word-wrap: break-word; width: 140px;" rowspan="' + data.Columnas[a].rowspan + '" colspan="' + data.Columnas[a].colspan + '">' + data.Columnas[a].title + '</th>'
        }
        Fila = Fila + '</tr>';

        //pregunta si existe fila secundaria
        if (data.ColumnasSecundaria.length > 0) {
            Fila = Fila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
            for (var b = 0; b < data.ColumnasSecundaria.length; b++) {
                Fila = Fila + '<th style="vertical-align: middle;text-align:center;" rowspan="' + data.ColumnasSecundaria[b].rowspan + '" colspan="' + data.ColumnasSecundaria[b].colspan + '">' + data.ColumnasSecundaria[b].title + '</th>'
            }
            Fila = Fila + '</tr>';
        }

        Header = HeaderInicio + Fila + HeaderFin;
        Fila = "";
        /*********************************************Fin Crear Header******************************************************/

        /*********************************************Crear Body******************************************************/

        for (var i = 0; i < data.DetalleActividades.length; i++) {
            if (anterior == "") { //aperturamos fila 

                anterior = data.DetalleActividades[i].Ubigeo; //asignamos nuevo valor

                Fila = Fila + '<tr>';
                Fila = Fila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;">' + data.DetalleActividades[i].Departamento + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;">' + data.DetalleActividades[i].Provincia + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;">' + data.DetalleActividades[i].Distrito + '</td>';

                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Fecha + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].NroHombres + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].NroMujeres + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Total + '</td>'
                //Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Acta + '</td>'
                Fila = Fila + '<td style="text-align:center"><a href="../Archivos/Acta de Aprobacion.pdf" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></td>'

                Body = Body + Fila;
                Fila = "";
                contar++;
            }
            else if (data.DetalleActividades[i].Ubigeo == anterior) { //preguntamos si el cui anterior es igual al nuevo cui

                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Fecha + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].NroHombres + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].NroMujeres + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Total + '</td>'
                //Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Acta + '</td>'
                Fila = Fila + '<td style="text-align:center"><a href="../Archivos/Acta de Aprobacion.pdf" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></td>'

                Body = Body + Fila;
                Fila = "";

            }
            else { //si el cui es diferente al cui anterior

                anterior = data.DetalleActividades[i].Ubigeo; //asignamos nuevo valor

                Fila = Fila + '<tr>';
                Fila = Fila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;">' + data.DetalleActividades[i].Departamento + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;">' + data.DetalleActividades[i].Provincia + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;">' + data.DetalleActividades[i].Distrito + '</td>';

                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Fecha + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].NroHombres + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].NroMujeres + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Total + '</td>'
                //Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Acta + '</td>'
                Fila = Fila + '<td style="text-align:center"><a href="../Archivos/Acta de Aprobacion.pdf" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></td>'

                Body = Body + Fila;
                Fila = "";
                contar++;
            }
        }

        Body = BodyInicio + Body + BodyFin;

        /*********************************************Fin Crear Body******************************************************/

        $.unblockUI();
        $("#detalleSeguimientosubdetalle").append(TablaInicio + Header + Body + TablaFin);
    });
}
/*PRODUCTOS****SUBDETALLE**************ATM capacitadas para brindar asistencia técnica a las JASS************************/

/*PRODUCTOS****SUBDETALLE**************Núcleos Ejecutores capacitados en gestión y administración de proyectos************************/
function VerSeguimientoActividadesNESubdetalle(Titulo, Etapa) {
    $("#titulodetalleseguimientosubdetalle").html(Titulo);
    ListSeguimientoActividadesNESubdetalle(Etapa);
    $("#modal-detalleseguimiento-subdetalle").modal({ backdrop: 'static', keyboard: true, show: true });
}
function ListSeguimientoActividadesNESubdetalle(Etapa) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListProductoSeguimientoNEDetalles?Etapa=" + Etapa, function (data, status) {

        var TablaInicio = '<table class="table table-hover table-bordered" id="tblSeguimiento">';
        var TablaFin = '</table>';

        var Body = '';
        var BodyInicio = '<tbody>';
        var BodyFin = '</tbody>';

        var Header = '';
        var HeaderInicio = '<thead>';
        var HeaderFin = '</thead>';



        var Fila = '';

        var contar = 1;
        var anterior = "";

        //Limpiar Div
        $("#detalleSeguimientosubdetalle").html("");

        /*********************************************Crear Header******************************************************/

        Fila = Fila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';

        for (var a = 0; a < data.Columnas.length; a++) {
            Fila = Fila + '<th style="vertical-align: middle;text-align:center;white-space: pre-wrap;word-wrap: break-word; width: 140px;" rowspan="' + data.Columnas[a].rowspan + '" colspan="' + data.Columnas[a].colspan + '">' + data.Columnas[a].title + '</th>'
        }
        Fila = Fila + '</tr>';

        //pregunta si existe fila secundaria
        if (data.ColumnasSecundaria.length > 0) {
            Fila = Fila + '<tr style="font-weight: 600;background-color: #0056ac;color: #fff;text-align:center">';
            for (var b = 0; b < data.ColumnasSecundaria.length; b++) {
                Fila = Fila + '<th style="vertical-align: middle;text-align:center;" rowspan="' + data.ColumnasSecundaria[b].rowspan + '" colspan="' + data.ColumnasSecundaria[b].colspan + '">' + data.ColumnasSecundaria[b].title + '</th>'
            }
            Fila = Fila + '</tr>';
        }

        Header = HeaderInicio + Fila + HeaderFin;
        Fila = "";
        /*********************************************Fin Crear Header******************************************************/

        /*********************************************Crear Body******************************************************/

        for (var i = 0; i < data.DetalleActividades.length; i++) {
            if (anterior == "") { //aperturamos fila 

                anterior = data.DetalleActividades[i].CUI; //asignamos nuevo valor

                Fila = Fila + '<tr>';
                Fila = Fila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;">' + data.DetalleActividades[i].CUI + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;">' + data.DetalleActividades[i].Departamento + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;">' + data.DetalleActividades[i].Localidad + '</td>';

                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Fecha + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].NroHombres + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].NroMujeres + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Total + '</td>'
                //Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Acta + '</td>'
                Fila = Fila + '<td style="text-align:center"><a href="../Archivos/Acta de Aprobacion.pdf" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></td>'

                Body = Body + Fila;
                Fila = "";
                contar++;
            }
            else if (data.DetalleActividades[i].CUI == anterior) { //preguntamos si el cui anterior es igual al nuevo cui

                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Fecha + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].NroHombres + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].NroMujeres + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Total + '</td>'
                //Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Acta + '</td>'
                Fila = Fila + '<td style="text-align:center"><a href="../Archivos/Acta de Aprobacion.pdf" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></td>'

                Body = Body + Fila;
                Fila = "";

            }
            else { //si el cui es diferente al cui anterior

                anterior = data.DetalleActividades[i].CUI; //asignamos nuevo valor

                Fila = Fila + '<tr>';
                Fila = Fila + '<td style="vertical-align: middle;text-align:center">' + contar + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;">' + data.DetalleActividades[i].CUI + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;">' + data.DetalleActividades[i].Departamento + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;">' + data.DetalleActividades[i].Localidad + '</td>';

                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Fecha + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].NroHombres + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].NroMujeres + '</td>'
                Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Total + '</td>'
                //Fila = Fila + '<td style="text-align:center">' + data.DetalleActividades[i].Acta + '</td>'
                Fila = Fila + '<td style="text-align:center"><a href="../Archivos/Acta de Aprobacion.pdf" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></td>'

                Body = Body + Fila;
                Fila = "";
                contar++;
            }
        }

        Body = BodyInicio + Body + BodyFin;

        /*********************************************Fin Crear Body******************************************************/

        $.unblockUI();
        $("#detalleSeguimientosubdetalle").append(TablaInicio + Header + Body + TablaFin);
    });
}


/*PRODUCTOS****SUBDETALLE**************Núcleos Ejecutores capacitados en gestión y administración de proyectos************************/

function ExportarExcel(tabla, nom) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    var style = "<style>.text-center { vertical-align: middle;text-align: center; white-space:pre-wrap; word-wrap:break-word }; br {mso-data-placement:same-cell;}; .table-bordered {border:2px; border-style:solid; border-color:#333;}.table {width: 100%; max-width: 100%; margin-bottom: 1rem; background-color: transparent;};td{vertical-align: middle; mso-number-format:\@;}</style>";
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html lang="es-pe" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' + style + '</head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    // return function () {
    var table = document.getElementById(tabla);
    var ctx = { worksheet: 'Hoja1' || 'Worksheet', table: table.innerHTML }

    //Construct the <a> element
    var link = document.createElement("a");
    link.download = getNombreFile(nom);
    link.href = uri + base64(format(template, ctx));

    document.body.appendChild(link);
    link.click();

    // Cleanup the DOM
    document.body.removeChild(link);
    delete link;

    //$("#Export").html("");

    $.unblockUI();
}
function getNombreFile(nom) {
    var f = new Date();
    var title = nom + f.getDate() + "_" + (f.getMonth() + 1) + "_" + f.getFullYear() + "_" + f.getHours() + "_" + f.getMinutes();
    return title;
}

/****************************************************************DASHBOARD********************************************************************/

function dashboard() {
   
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv_resultadoesperado1", am4charts.PieChart);

        // Add data
        chart.data = [
          { "sector": "Hogares en centros poblados rurales con acceso a agua segura", "size": 7252 },
          { "sector": "Pendiente", "size": 2748 },
        ];

        // Add label
        chart.innerRadius = 100;
        var label = chart.seriesContainer.createChild(am4core.Label);
        label.text = "72.52%";
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.fontSize = 50;

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "size";
        pieSeries.dataFields.category = "sector";
        pieSeries.ticks.template.disabled = true;
        pieSeries.labels.template.disabled = true;

    }); // end am4core.ready()
    
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var chart = am4core.create("chartdiv_producto1", am4charts.RadarChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.data = [
         {
             "region": "Componente 1",
             "Abreviatura":"P1",
             "state": "Estudios definitivos \nde proyectos de AyS elaborados",
             "sales": 0
         },
         {
             "region": "Componente 1",
             "Abreviatura": "P2",
             "state": "Sistemas de agua potable \nen centros poblados rurales \nconstruidos o mejorados",
             "sales": 0
         },
         {
             "region": "Componente 2",
             "Abreviatura": "P3",
             "state": "Sistemas de agua potable \ncon operación técnica \nasistida concluida",
             "sales": 65.45
         },
         {
             "region": "Componente 2",
             "Abreviatura": "P4",
             "state": "Sistemas de agua potable \ncon reforzamiento de la AOM \npost construcción",
             "sales": 0
         }
        ];
        /* Create axes */
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "Abreviatura";
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.tooltipLocation = 0.5;
        categoryAxis.renderer.cellStartLocation = 0.2;
        categoryAxis.renderer.cellEndLocation = 0.8;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.labels.template.horizontalCenter = "left";
        valueAxis.min = 0;

        var series1 = chart.series.push(new am4charts.RadarColumnSeries());
        series1.columns.template.tooltipText = "{state}: [bold]{valueY.value}[/]";
        series1.columns.template.width = am4core.percent(100);
        series1.dataFields.categoryX = "Abreviatura";
        series1.dataFields.valueY = "sales";

        chart.seriesContainer.zIndex = -1;

        chart.cursor = new am4charts.RadarCursor();
        chart.cursor.xAxis = categoryAxis;
        chart.cursor.fullWidthXLine = true;
        chart.cursor.lineX.strokeOpacity = 0;
        chart.cursor.lineX.fillOpacity = 0.1;
        chart.cursor.lineX.fill = am4core.color("#000000");

        var TablaInicio = '<table class="table table-hover" id="tblSeguimiento">';
        var TablaFin = '</table>';

        var Body = '';
        var BodyInicio = '<tbody>';
        var BodyFin = '</tbody>';

        var Header = '';
        var HeaderInicio = '<thead>';
        var HeaderFin = '</thead>';

        var Fila = '';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P1</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Estudios definitivos de proyectos <br/>de AyS elaborados</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P2</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Sistemas de agua potable <br/>en centros poblados rurales <br/>construidos o mejorados</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P3</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Sistemas de agua potable <br/>con operación técnica <br/>asistida concluida</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">65.45%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P4</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Sistemas de agua potable <br/>con reforzamiento de <br/>la AOM post construcción</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0%</td>';
        Fila = Fila + '</tr>';

        Body = Fila;

        Body = BodyInicio + Body + BodyFin;

        $("#tbl_producto1").append(TablaInicio + Body + TablaFin);

    }); // end am4core.ready()

    //****************************************************************RESULTADO 2****************************************************************************//

    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var chart = am4core.create("chartdiv_resultadoesperado2", am4charts.RadarChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.data = [
         {
             "Abreviatura": "RE1",
             "state": "Hogares en centros poblados \nrurales con acceso a \nsaneamiento seguro",
             "sales": 72.52
         },
         {
             "Abreviatura": "RE2",
             "state": "Hogares en centros poblados \nrurales que utilizan \nlas UBS construidas por el programa",
             "sales": 86.24
         }
        ];
        /* Create axes */
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "Abreviatura";
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.tooltipLocation = 0.5;
        categoryAxis.renderer.cellStartLocation = 0.2;
        categoryAxis.renderer.cellEndLocation = 0.8;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.labels.template.horizontalCenter = "left";
        valueAxis.min = 0;

        var series1 = chart.series.push(new am4charts.RadarColumnSeries());
        series1.columns.template.tooltipText = "{state}: [bold]{valueY.value}[/]";
        series1.columns.template.width = am4core.percent(100);
        series1.dataFields.categoryX = "Abreviatura";
        series1.dataFields.valueY = "sales";

        chart.seriesContainer.zIndex = -1;

        chart.cursor = new am4charts.RadarCursor();
        chart.cursor.xAxis = categoryAxis;
        chart.cursor.fullWidthXLine = true;
        chart.cursor.lineX.strokeOpacity = 0;
        chart.cursor.lineX.fillOpacity = 0.1;
        chart.cursor.lineX.fill = am4core.color("#000000");

        var TablaInicio = '<table class="table table-hover" id="tblSeguimiento">';
        var TablaFin = '</table>';

        var Body = '';
        var BodyInicio = '<tbody>';
        var BodyFin = '</tbody>';

        var Header = '';
        var HeaderInicio = '<thead>';
        var HeaderFin = '</thead>';

        var Fila = '';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">RE1</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Hogares en centros poblados <br/>rurales con acceso a <br/>saneamiento seguro</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">72.52%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">RE2</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Hogares en centros poblados <br/>rurales que utilizan las UBS <br/>construidas por el programa</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">86.24%</td>';
        Fila = Fila + '</tr>';

        Body = Fila;

        Body = BodyInicio + Body + BodyFin;

        $("#tbl_resultadoesperado2").append(TablaInicio + Body + TablaFin);

    }); // end am4core.ready()

    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var chart = am4core.create("chartdiv_producto2", am4charts.RadarChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.data = [
         {
             "Abreviatura": "P1",
             "state": "Estudios definitivos de proyectos de AyS elaborados",
             "sales": 0.00
         },
         {
             "Abreviatura": "P2",
             "state": "Unidades Básicas Sanitarias (UBS) en centros poblados rurales construidas",
             "sales": 0.00
         }];
        /* Create axes */
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "Abreviatura";
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.tooltipLocation = 0.5;
        categoryAxis.renderer.cellStartLocation = 0.2;
        categoryAxis.renderer.cellEndLocation = 0.8;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.labels.template.horizontalCenter = "left";
        valueAxis.min = 0;

        var series1 = chart.series.push(new am4charts.RadarColumnSeries());
        series1.columns.template.tooltipText = "{state}: [bold]{valueY.value}[/]";
        series1.columns.template.width = am4core.percent(100);
        series1.dataFields.categoryX = "Abreviatura";
        series1.dataFields.valueY = "sales";

        chart.seriesContainer.zIndex = -1;

        chart.cursor = new am4charts.RadarCursor();
        chart.cursor.xAxis = categoryAxis;
        chart.cursor.fullWidthXLine = true;
        chart.cursor.lineX.strokeOpacity = 0;
        chart.cursor.lineX.fillOpacity = 0.1;
        chart.cursor.lineX.fill = am4core.color("#000000");

        var TablaInicio = '<table class="table table-hover" id="tblSeguimiento">';
        var TablaFin = '</table>';

        var Body = '';
        var BodyInicio = '<tbody>';
        var BodyFin = '</tbody>';

        var Header = '';
        var HeaderInicio = '<thead>';
        var HeaderFin = '</thead>';

        var Fila = '';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P1</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Estudios definitivos de <br/>proyectos de AyS <br/>elaborados</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0.00%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P2</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Unidades Básicas <br/>Sanitarias (UBS) en <br/>centros poblados rurales <br/>construidas</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0.00%</td>';
        Fila = Fila + '</tr>';

        Body = Fila;

        Body = BodyInicio + Body + BodyFin;

        $("#tbl_producto2").append(TablaInicio + Body + TablaFin);

    }); // end am4core.ready()

    //****************************************************************RESULTADO 3****************************************************************************//

    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var chart = am4core.create("chartdiv_resultadoesperado3", am4charts.RadarChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.data = [
         {
             "Abreviatura": "RE1",
             "state": "Sistemas de agua \nfuncionando según \nespecificaciones técnicas \nde diseño",
             "sales": 0.00
         },
         {
             "Abreviatura": "RE2",
             "state": "JASS cuyos ingresos \noperativos cubren \nlos costos de AOM",
             "sales": 47.27
         },
         {
             "Abreviatura": "RE3",
             "state": "Sistemas rurales construidos \npor el programa con seguimiento \nanual de indicadores de prestación \npor parte del MVCS",
             "sales": 0.00
         },
         {
             "Abreviatura": "RE4",
             "state": "JASS con al menos \ndos mujeres en su \nconsejo directivo",
             "sales": 77.45
         },
         {
             "Abreviatura": "RE5",
             "state": "Núcleos Ejecutores con \nal menos una mujer en su \nestructura organizativa",
             "sales": 81.25
         }
        ];
        /* Create axes */
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "Abreviatura";
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.tooltipLocation = 0.5;
        categoryAxis.renderer.cellStartLocation = 0.2;
        categoryAxis.renderer.cellEndLocation = 0.8;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.labels.template.horizontalCenter = "left";
        valueAxis.min = 0;

        var series1 = chart.series.push(new am4charts.RadarColumnSeries());
        series1.columns.template.tooltipText = "{state}: [bold]{valueY.value}[/]";
        series1.columns.template.width = am4core.percent(100);
        series1.dataFields.categoryX = "Abreviatura";
        series1.dataFields.valueY = "sales";

        chart.seriesContainer.zIndex = -1;

        chart.cursor = new am4charts.RadarCursor();
        chart.cursor.xAxis = categoryAxis;
        chart.cursor.fullWidthXLine = true;
        chart.cursor.lineX.strokeOpacity = 0;
        chart.cursor.lineX.fillOpacity = 0.1;
        chart.cursor.lineX.fill = am4core.color("#000000");

        var TablaInicio = '<table class="table table-hover" id="tblSeguimiento">';
        var TablaFin = '</table>';

        var Body = '';
        var BodyInicio = '<tbody>';
        var BodyFin = '</tbody>';

        var Header = '';
        var HeaderInicio = '<thead>';
        var HeaderFin = '</thead>';

        var Fila = '';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">RE1</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Sistemas de agua <br/>funcionando según <br/>especificaciones técnicas <br/>de diseño</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0.00%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">RE2</td>';
        Fila = Fila + '<td style="vertical-align: middle;">JASS cuyos ingresos <br/>operativos cubren los <br/>costos de AOM</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">47.27%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">RE3</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Sistemas rurales <br/>construidos por el <br/>programa con seguimiento <br/>anual de indicadores <br/>de prestación por <br/>parte del MVCS</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0.00%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">RE4</td>';
        Fila = Fila + '<td style="vertical-align: middle;">JASS con al menos <br/>dos mujeres en su consejo <br/>directivo</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">77.45%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">RE5</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Núcleos Ejecutores <br/>con al menos una mujer <br/>en su estructura organizativa</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">81.25%</td>';
        Fila = Fila + '</tr>';

        Body = Fila;

        Body = BodyInicio + Body + BodyFin;

        $("#tbl_resultadoesperado3").append(TablaInicio + Body + TablaFin);

    }); // end am4core.ready()

    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var chart = am4core.create("chartdiv_producto3", am4charts.RadarChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.data = [
         {
             "Abreviatura": "P1",
             "state": "JASS capacitadas para administrar, operar y mantener los servicios de AyS",
             "sales": 57.27
         },
         {
             "Abreviatura": "P2",
             "state": "Hito. Talleres de capacitación a la JASS en AOM y aspectos legales realizados",
             "sales": 74.90
         },
         {
             "Abreviatura": "P3",
             "state": "Hito. Talleres de liderazgo y participación dirigidos a mujeres realizados",
             "sales": 87.27
         },
         {
             "Abreviatura": "P4",
             "state": "ATM capacitadas para brindar asistencia técnica a las JASS",
             "sales": 0.00
         },
         {
             "Abreviatura": "P5",
             "state": "Personas capacitadas en educación sanitaria y uso de los servicios de AyS",
             "sales": 0.00
         },
         {
             "Abreviatura": "P6",
             "state": "Núcleos Ejecutores capacitados en gestión y administración de proyectos",
             "sales": 0.00
         },
         {
             "Abreviatura": "P7",
             "state": "JASS equipadas para la adecuada AOM",
             "sales": 0.00
         },
         {
             "Abreviatura": "P8",
             "state": "ATM's fortalecidas para brindar asistencia técnica a las JASS",
             "sales": 0.00
         },
         {
             "Abreviatura": "P9",
             "state": "DRVCS fortalecidas para brindar asistencia técnica a las ATM's",
             "sales": 0.00
         },
         {
             "Abreviatura": "P10",
             "state": "PNSR fortalecido para brindar asistencia técnica a las DRVCS y ATM's",
             "sales": 0.00
         },
         {
             "Abreviatura": "P11",
             "state": "Personal del PNSR capacitado para brindar asistencia técnica a ñas ATM´s y las DRVCS",
             "sales": 0.00
         },
         {
             "Abreviatura": "P12",
             "state": "Diseño e implementación del plan de comunicación del programa",
             "sales": 0.00
         }];
        /* Create axes */
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "Abreviatura";
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.tooltipLocation = 0.5;
        categoryAxis.renderer.cellStartLocation = 0.2;
        categoryAxis.renderer.cellEndLocation = 0.8;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.labels.template.horizontalCenter = "left";
        valueAxis.min = 0;

        var series1 = chart.series.push(new am4charts.RadarColumnSeries());
        series1.columns.template.tooltipText = "{state}: [bold]{valueY.value}[/]";
        series1.columns.template.width = am4core.percent(100);
        series1.dataFields.categoryX = "Abreviatura";
        series1.dataFields.valueY = "sales";

        chart.seriesContainer.zIndex = -1;

        chart.cursor = new am4charts.RadarCursor();
        chart.cursor.xAxis = categoryAxis;
        chart.cursor.fullWidthXLine = true;
        chart.cursor.lineX.strokeOpacity = 0;
        chart.cursor.lineX.fillOpacity = 0.1;
        chart.cursor.lineX.fill = am4core.color("#000000");

        var TablaInicio = '<table class="table table-hover" id="tblSeguimiento">';
        var TablaFin = '</table>';

        var Body = '';
        var BodyInicio = '<tbody>';
        var BodyFin = '</tbody>';

        var Header = '';
        var HeaderInicio = '<thead>';
        var HeaderFin = '</thead>';

        var Fila = '';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P1</td>';
        Fila = Fila + '<td style="vertical-align: middle;">JASS capacitadas <br/>para administrar, operar <br/>y mantener los <br/>servicios de AyS</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">57.27%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P2</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Hito. Talleres de <br/>capacitación a la JASS <br/>en AOM y aspectos <br/>legales realizados</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">74.90%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P3</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Hito. Talleres de <br/>liderazgo y participación <br/>dirigidos a mujeres <br/>realizados</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">87.27%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P4</td>';
        Fila = Fila + '<td style="vertical-align: middle;">ATM capacitadas <br/>para brindar asistencia <br/>técnica a las JASS</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0.00%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P5</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Personas capacitadas <br/>en educación sanitaria <br/>y uso de los servicios <br/>de AyS</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0.00%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P6</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Núcleos Ejecutores <br/>capacitados en gestión <br/>y administración de <br/>proyectos</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0.00%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P7</td>';
        Fila = Fila + '<td style="vertical-align: middle;">JASS equipadas <br/>para la adecuada AOM</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0.00%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P8</td>';
        Fila = Fila + '<td style="vertical-align: middle;">ATMs fortalecidas <br/>para brindar asistencia <br/>técnica a las JASS</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0.00%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P9</td>';
        Fila = Fila + '<td style="vertical-align: middle;">DRVCS fortalecidas <br/>para brindar asistencia <br/>técnica a las ATMs</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0.00%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P10</td>';
        Fila = Fila + '<td style="vertical-align: middle;">PNSR fortalecido <br/>para brindar asistencia <br/>técnica a las DRVCS <br/>y ATMs</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0.00%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P11</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Personal del PNSR <br/>capacitado para brindar <br/>asistencia técnica a <br/>las ATMs y las DRVCS</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0.00%</td>';
        Fila = Fila + '</tr>';

        Fila = Fila + '<tr>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">P12</td>';
        Fila = Fila + '<td style="vertical-align: middle;">Diseño e implementación <br/>del plan de comunicación <br/>del programa</td>';
        Fila = Fila + '<td style="vertical-align: middle;text-align: center">0.00%</td>';
        Fila = Fila + '</tr>';

        Body = Fila;

        Body = BodyInicio + Body + BodyFin;

        $("#tbl_producto3").append(TablaInicio + Body + TablaFin);

    }); // end am4core.ready()
}

/****************************************************************RESUMEN********************************************************************/

function MatrizResumenRE()
{
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListMatrizResumenRE", function (data, status) {

        var Body = '';
        var Fila = '';

        /*********************************************Crear Body******************************************************/

        for (var i = 0; i < data.length; i++) {

            if (data[i].Nivel == 1) {
                Fila = Fila + '<tr>';
                Fila = Fila + '<td style="font-weight: bold;" colspan="18">Resultado ' + data[i].NroResultado +'. '+ data[i].Resultado + '</td>';
                Fila = Fila + '</tr>';

                Fila = Fila + '<tr>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;">Resultados Esperados</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;">Unidad de<br />Medida</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;">Linea<br />de<br />base</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;">Año<br />Linea de<br />base</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;" colspan="2">Año 1</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;" colspan="2">Año 2</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;" colspan="2">Año 3</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;" colspan="2">Año 4</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;" colspan="2">Año 5</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;" colspan="2">Meta</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;">Medio de verificación</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;">Observaciones</td>';
                Fila = Fila + '</tr>';

                Body = Body + Fila;
                Fila = "";
            }
            else if (data[i].Nivel == 2) {

                Fila = Fila + '<tr>';
                Fila = Fila + '<td style="word-wrap: break-word;white-space: normal;width:220px;vertical-align: middle;">' + data[i].ResultadoEsperado + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;">' + data[i].UnidadMedida + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;">' + data[i].LineaBase + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;">' + data[i].AnioLineaBase + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio1_A) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio1_P) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio2_A) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio2_P) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio3_A) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio3_P) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio4_A) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio4_P) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio5_A) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio5_P) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Meta_A )+ '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Meta_P )+ '</td>';
                Fila = Fila + '<td style="word-wrap: break-word;white-space: normal;width:150px;vertical-align: middle;">' + data[i].MedioVerificacion + '</td>';
                Fila = Fila + '<td style="word-wrap: break-word;white-space: normal;width:120px;vertical-align: middle;">' + data[i].Observaciones + '</td>';
                Fila = Fila + '</tr>';

                Body = Body + Fila;
                Fila = "";
            }
        }

        /*********************************************Fin Crear Body******************************************************/

        $.unblockUI();
        $("#dtMatrizResumenRE").find('tbody').append(Body);
    });
}

function MatrizResumenP() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MatrizResultados/ListMatrizResumenP", function (data, status) {

        var Body = '';
        var Fila = '';

        /*********************************************Crear Body******************************************************/

        for (var i = 0; i < data.length; i++) {

            if (data[i].Nivel == 1) {
                Fila = Fila + '<tr>';
                Fila = Fila + '<td style="font-weight: bold;" colspan="19">' + data[i].Componente + '</td>';
                Fila = Fila + '</tr>';

                Fila = Fila + '<tr>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;">Productos</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;">Costo<br />estimados<br />(US$)</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;">Resultado<br />al que<br />contribuye</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;">Unidad de<br />medida</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;">Línea <br />de base</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;" colspan="2">Año 1</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;" colspan="2">Año 2</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;" colspan="2">Año 3</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;" colspan="2">Año 4</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;" colspan="2">Año 5</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;" colspan="2">Meta<br />final</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;">Medio de verificación</td>';
                Fila = Fila + '<td style="font-weight: bold; text-align: center; vertical-align: middle !important;">Observaciones</td>';
                Fila = Fila + '</tr>';

                Body = Body + Fila;
                Fila = "";
            }
            else if (data[i].Nivel == 2) {

                Fila = Fila + '<tr>';
                Fila = Fila + '<td style="word-wrap: break-word;white-space: normal;width:220px;vertical-align: middle;">' + data[i].Producto + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;">' + formatMoney(data[i].CostoEstimado) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;">' + data[i].ResultadoContribuye + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;">' + data[i].UnidadMedida + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;">' + data[i].LineaBase + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio1_A) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio1_P) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio2_A) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio2_P) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio3_A) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio3_P) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio4_A) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio4_P) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio5_A) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Anio5_P) + '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Meta_A )+ '</td>';
                Fila = Fila + '<td style="vertical-align: middle;text-align: center;width:50px;">' + formatMoney(data[i].Meta_P )+ '</td>';
                Fila = Fila + '<td style="word-wrap: break-word;white-space: normal;width:150px;vertical-align: middle;">' + data[i].MedioVerificacion + '</td>';
                Fila = Fila + '<td style="word-wrap: break-word;white-space: normal;width:120px;vertical-align: middle;">' + data[i].Observaciones + '</td>';
                Fila = Fila + '</tr>';

                Body = Body + Fila;
                Fila = "";
            }
        }

        /*********************************************Fin Crear Body******************************************************/

        $.unblockUI();
        $("#dtMatrizResumenP").find('tbody').append(Body);
    });
}

function exportarTablaAPDF() {

    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    var tabla = document.querySelector("#pdfMatriz");
    var contenidoTabla = tabla.innerHTML;
    html2pdf().from(contenidoTabla).save('tabla.pdf');

    //var elemento = document.querySelector("#pdfMatriz");
    //var contenido = elemento.innerHTML;
    //var documento = {
    //    content: [
    //        { text: 'Matriz de Resultados', style: 'titulo' },
    //        { text: contenido, style: 'contenido' }
    //    ],
    //    styles: {
    //        titulo: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
    //        contenido: { fontSize: 12, margin: [0, 0, 0, 10] }
    //    }
    //};
    //pdfMake.createPdf(documento).download(getNombreFile("MatrizResultados_") + '.pdf');
    
    $.unblockUI();
}