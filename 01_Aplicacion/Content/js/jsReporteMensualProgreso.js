$(document).ready(function () {
    $('#hdnIdUsuario').val(getUrlParameter('Id'));

    var today = new Date();
    var year = today.getFullYear();
    $('#cboAnioC1').val(year);
    $('#cboAnioC2').val(year);

    ListComponente1();
    ListComponente2();
    FechaActualizacionComponente(1);
    FechaActualizacionComponente(2);
    $('#cboAnioC1').change(function () {
        ListComponente1();
    });
    $('#cboAnioC2').change(function () {
        ListComponente2();
    });

});

function ListComponente1() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $("#tblComponente1 > tbody").html("");
    $("#tblComponente1 > tbody").append('<tr class="row0"><td style="text-align: center;" colspan="8">Sin Información</td></tr>');

    $.get("/ReporteMensualProgreso/ListComponente?id=" + 1 + "&anio=" + $("#cboAnioC1").val(), function (data, status) {
        //if (Tipo == 1) {

        $("#tblComponente1 > tbody").html("");
        for (var a = 0; a < data.length; a++) {
            var divOpcion = '<tr id="detalle_row_' + a + '">';

            /*==========labels==============*/
            divOpcion = divOpcion + '<td class="align-middle">' + data[a].NroSubComponente + '<input id="componente1_hddIdSubComponente_' + a + '" type="hidden" class="form-control" value="' + data[a].IdSubComponente + '"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text">' + data[a].NombreSubComponente + '</td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text">' + data[a].Indicador + '</td>';
            /*==========Text==============*/
            divOpcion = divOpcion + '<td class="align-middle"><input id="componente1_txtP_' + a + '" type="text" class="form-control" value="' + formatMoney(data[a].P) + '" /></td>';
            divOpcion = divOpcion + '<td class="align-middle"><input id="componente1_txtPA_' + a + '" type="text" class="form-control" onkeyup="calculateSum(\'componente1\',' + a + ')" value="' + formatMoney(data[a].PA) + '" /></td>';
            divOpcion = divOpcion + '<td class="align-middle"><input id="componente1_txtA_' + a + '" type="text" class="form-control"  onkeyup="calculateSum(\'componente1\',' + a + ')" value="' + formatMoney(data[a].A) + '" /></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text">' + data[a].Progreso + '</td>';
            divOpcion = divOpcion + '<td class="align-middle"><input id="componente1_txtPorcentage_' + a + '" type="text" class="form-control" style="display: inline-block;width:90%" value="' + formatMoney(data[a].PorcentajeProgreso) + '" readonly/>&nbsp;<strong>%</strong></td>';

            divOpcion = divOpcion + '</tr>';
            $("#tblComponente1 > tbody").append(divOpcion);
        }
    });
    $.unblockUI();
}

function ListComponente2() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $("#tblComponente2 > tbody").html("");
    $("#tblComponente2 > tbody").append('<tr class="row0"><td style="text-align: center;" colspan="8">Sin Información</td></tr>');


    $.get("/ReporteMensualProgreso/ListComponente?id=" + 2 + "&anio=" + $("#cboAnioC2").val(), function (data, status) {
        //if (Tipo == 1) {

        $("#tblComponente2 > tbody").html("");
        for (var a = 0; a < data.length; a++) {
            var divOpcion = '<tr id="detalle_row_' + a + '">';

            /*==========labels==============*/
            divOpcion = divOpcion + '<td class="align-middle">' + data[a].NroSubComponente + '<input id="componente2_hddIdSubComponente_' + a + '" type="hidden" class="form-control" value="' + data[a].IdSubComponente + '"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text">' + data[a].NombreSubComponente + '</td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text">' + data[a].Indicador + '</td>';
            /*==========Text==============*/
            divOpcion = divOpcion + '<td class="align-middle"><input id="componente2_txtP_' + a + '" type="text" class="form-control" value="' + formatMoney(data[a].P) + '" /></td>';
            divOpcion = divOpcion + '<td class="align-middle"><input id="componente2_txtPA_' + a + '" type="text" class="form-control" onkeyup="calculateSum(\'componente2\',' + a + ')" value="' + formatMoney(data[a].PA) + '" /></td>';
            divOpcion = divOpcion + '<td class="align-middle"><input id="componente2_txtA_' + a + '" type="text" class="form-control"  onkeyup="calculateSum(\'componente2\',' + a + ')" value="' + formatMoney(data[a].A) + '" /></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text">' + data[a].Progreso + '</td>';
            divOpcion = divOpcion + '<td class="align-middle"><input id="componente2_txtPorcentage_' + a + '" type="text" class="form-control" class="form-control" style="display: inline-block;width:90%" value="' + formatMoney(data[a].PorcentajeProgreso) + '" readonly/>&nbsp;<strong>%</strong></td>';

            divOpcion = divOpcion + '</tr>';
            $("#tblComponente2 > tbody").append(divOpcion);
        }
    });

    $.unblockUI();
}

function GuardarComponente(Id) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    var progreso = [];
    var rowCount = $('#tblComponente' + Id + ' >tbody >tr').length;
    debugger;
    for (var i = 0; i < rowCount; i++) {

        var P = $("#componente" + Id + "_txtP_" + i).val();
        P = P.replace(",", "");
        var PA = $("#componente" + Id + "_txtPA_" + i).val();
        PA = PA.replace(",", "");
        var A = $("#componente" + Id + "_txtA_" + i).val();
        A = A.replace(",", "");
        var porcentage = $("#componente" + Id + "_txtPorcentage_" + i).val();
        porcentage = porcentage.replace(",", "");

        progreso.push({
            IdProgresoSubComponente: 0,
            IdSubComponente: $('#componente' + Id + '_hddIdSubComponente_' + i).val(),
            P: P,
            PA: PA,
            A: A,
            PorcentajeProgreso: porcentage,
            Anio: $('#cboAnioC' + Id).val(),
            IdUsuario: $('#hdnIdUsuario').val()
        });
    }

    $.ajax({
        type: "POST",
        url: "/ReporteMensualProgreso/GuardarProgreso",
        cache: false,
        data: JSON.stringify(progreso),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        traditional: true,
        success: function (result) {
            $.unblockUI();
            if (result.TipoRespuesta == 1) {
                $.confirm({
                    title: 'Guardar',
                    content: '<div class="form-group">' +
                            '<label>' + result.Mensaje + '</label>' +
                            '</div>',
                    icon: 'fa fa-thumbs-o-up',
                    theme: 'modern',
                    closeIcon: false,
                    closeIconClass: 'fa fa-close',
                    animation: 'scale',
                    type: 'green',
                    buttons: {
                        tryAgain: {
                            text: 'Aceptar',
                            btnClass: 'btn-green',
                            action: function () {
                                FechaActualizacionComponente(Id);
                            }
                        }
                    }
                });
            }
            else if (result.TipoRespuesta == 2) {
                $.confirm({
                    title: 'Guardar',
                    content: '<div class="form-group">' +
                            '<label>' + result.Mensaje + '</label>' +
                            '</div>',
                    icon: 'fa fa-thumbs-o-down',
                    theme: 'modern',
                    closeIcon: false,
                    closeIconClass: 'fa fa-close',
                    animation: 'scale',
                    type: 'red',
                    buttons: {
                        tryAgain: {
                            text: 'Aceptar',
                            btnClass: 'btn-red',
                            action: function () {

                            }
                        }
                    }
                });
            }
            else if (result.TipoRespuesta == 3) {
                $.confirm({
                    title: 'Guardar',
                    content: '<div class="form-group">' +
                            '<label>' + result.Mensaje + '</label>' +
                            '</div>',
                    icon: 'fa fa-thumbs-o-down',
                    theme: 'modern',
                    closeIcon: false,
                    closeIconClass: 'fa fa-close',
                    animation: 'scale',
                    type: 'orange',
                    buttons: {
                        tryAgain: {
                            text: 'Aceptar',
                            btnClass: 'btn-orange',
                            action: function () {

                            }
                        }
                    }
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, textStatus, errorThrown);
            $.unblockUI();
            $.confirm({
                title: 'Error',
                content: '<div class="form-group">' +
                        '<label>' + XMLHttpRequest + textStatus + errorThrown + '</label>' +
                        '</div>',
                icon: 'fa fa-frown-o',
                theme: 'modern',
                closeIcon: false,
                closeIconClass: 'fa fa-close',
                animation: 'scale',
                type: 'red',
                buttons: {
                    tryAgain: {
                        text: 'Aceptar',
                        btnClass: 'btn-red',
                        action: function () {
                        }
                    }
                }
            });
        },
    });
}

function FechaActualizacionComponente(Id) {
    $.get("/ReporteMensualProgreso/FechaActualizacionComponente?Id=" + Id, function (data, status) {
        $("#spnFecActComponente" + Id).html(data.ValorDevolucion);
    });
}

function ExportarExcel() {

    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    var tableC1 = "";
    var tableC2 = "";

    $.ajax({
        async: false,
        type: 'GET',
        url: "/ReporteMensualProgreso/ListComponente?id=" + 1 + "&anio=" + $("#cboAnioC1").val(),
        success: function (data) {
            //$.get("/ReporteMensualProgreso/ListComponente?id=" + 1 + "&anio=" + $("#cboAnioC1").val(), function (data, status) {

            tableC1 = '<div></div><br><div><strong>Componente I: Proyectos de Agua Potable y Saneamiento ' + $("#cboAnioC1").val() + '</strong></div><br><table id="tblC1" class="table table-bordered table-hover" style="width:100%" border="2px">';
            var Header = '<thead>';
            Header = Header + '<tr>';
            Header = Header + '<th style="text-align: center;">Nro.</th>';
            Header = Header + '<th style="text-align: center;">Producto</th>';
            Header = Header + '<th style="text-align: center;">Indicador</th>';
            Header = Header + '<th style="text-align: center;">P</th>';
            Header = Header + '<th style="text-align: center;">P(A)</th>';
            Header = Header + '<th style="text-align: center;">A</th>';
            Header = Header + '<th colspan="2" style="text-align: center;">Progreso</th>';
            Header = Header + '</tr>';
            Header = Header + '</thead>';
            var body = '<tbody>';

            for (var a = 0; a < data.length; a++) {
                var divOpcion = '<tr id="detalle_row_' + a + '">';

                /*==========labels==============*/
                divOpcion = divOpcion + '<td class="align-middle">' + data[a].NroSubComponente + '</td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text">' + data[a].NombreSubComponente + '</td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text">' + data[a].Indicador + '</td>';
                /*==========Text==============*/
                divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(data[a].P) + '</td>';
                divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(data[a].PA) + '</td>';
                divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(data[a].A) + '</td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text">' + data[a].Progreso + '</td>';
                divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(data[a].PorcentajeProgreso) + '%</td>';
                divOpcion = divOpcion + '</tr>';

                body = body + divOpcion;
            }
            body = body + "</tbody>";

            tableC1 = tableC1 + Header + body + '</table>';

            $("#Export").append(tableC1);
        }
    });

    $.ajax({
        async: false,
        type: 'GET',
        url: "/ReporteMensualProgreso/ListComponente?id=" + 2 + "&anio=" + $("#cboAnioC2").val(),
        success: function (data) {
            //$.get("/ReporteMensualProgreso/ListComponente?id=" + 1 + "&anio=" + $("#cboAnioC1").val(), function (data, status) {

            tableC2 = '<div></div><br><div><strong>Componente II: Gestión de la Sostenibilidad de los Servicios y Fortalecimiento de las Entidades del Sector ' + $("#cboAnioC2").val() + '</strong></div><br><table id="tblC2" class="table table-bordered table-hover" style="width:100%" border="2px">';
            var Header = '<thead>';
            Header = Header + '<tr>';
            Header = Header + '<th style="text-align: center;">Nro.</th>';
            Header = Header + '<th style="text-align: center;">Producto</th>';
            Header = Header + '<th style="text-align: center;">Indicador</th>';
            Header = Header + '<th style="text-align: center;">P</th>';
            Header = Header + '<th style="text-align: center;">P(A)</th>';
            Header = Header + '<th style="text-align: center;">A</th>';
            Header = Header + '<th colspan="2" style="text-align: center;">Progreso</th>';
            Header = Header + '</tr>';
            Header = Header + '</thead>';
            var body = '<tbody>';

            for (var a = 0; a < data.length; a++) {
                var divOpcion = '<tr id="detalle_row_' + a + '">';

                /*==========labels==============*/
                divOpcion = divOpcion + '<td class="align-middle">' + data[a].NroSubComponente + '</td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text">' + data[a].NombreSubComponente + '</td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text">' + data[a].Indicador + '</td>';
                /*==========Text==============*/
                divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(data[a].P) + '</td>';
                divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(data[a].PA) + '</td>';
                divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(data[a].A) + '</td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text">' + data[a].Progreso + '</td>';
                divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(data[a].PorcentajeProgreso) + '%</td>';
                divOpcion = divOpcion + '</tr>';

                body = body + divOpcion;
            }
            body = body + "</tbody>";

            tableC2 = tableC2 + Header + body + '</table>';

            $("#Export").append(tableC2);
        }
    });

    var style = "<style>.text-center { vertical-align: middle;text-align: center; white-space:pre-wrap; word-wrap:break-word }; br {mso-data-placement:same-cell;}; .table-bordered {border:2px; border-style:solid; border-color:#333;}.table {width: 100%; max-width: 100%; margin-bottom: 1rem; background-color: transparent;};td{vertical-align: middle; mso-number-format:\@;}</style>";
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html lang="es-pe" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' + style + '</head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    // return function () {
    var table = document.getElementById('Export');
    var ctx = { worksheet: 'Hoja1' || 'Worksheet', table: table.innerHTML }

    // Construct the <a> element
    var link = document.createElement("a");
    link.download = getNombreFile('rpt_Componentes_');
    link.href = uri + base64(format(template, ctx));

    document.body.appendChild(link);
    link.click();

    // Cleanup the DOM
    document.body.removeChild(link);
    delete link;

    $("#Export").html("");

    $.unblockUI();
}

function ExportarFormatoBID() {

    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    var tableC1 = "";
    var tableC2 = "";

    var Header = '<table><thead><tr><th colspan=2></th><th colspan=8></th></tr></thead><tbody><tr><td colspan=2><img src="http://179.43.80.244:82/Content/images/bid.png" class="imgDiv"/></td><td colspan=8 style="font-size: 14.0pt;"><strong>Outputs - Physical Progress</strong><br> Operation Number: PE-L1226</td></tr></tbody></table>'
    $("#Export").append(Header);

    $.ajax({
        async: false,
        type: 'GET',
        url: "/ReporteMensualProgreso/ReporteBid?id=" + 1,
        success: function (data) {
            //$.get("/ReporteMensualProgreso/ListComponente?id=" + 1 + "&anio=" + $("#cboAnioC1").val(), function (data, status) {

            tableC1 = '<div></div><br><div><strong style="font-size: 12.0pt;">1.-Component: Componente I: Proyectos de Agua Potable y Saneamiento</strong></div><br><table id="tblC1" class="table table-bordered table-hover" style="width:100%" border="2px">';
            var Header = '<thead>';
            Header = Header + '<tr style="background:#083568;color: #FFFFFF;">';
            Header = Header + '<th colspan="2" style="text-align: center;">Output Definition</th>';
            Header = Header + '<th style="text-align: center;">Unit Of Measure</th>';
            Header = Header + '<th style="text-align: center;"></th>';
            Header = Header + '<th style="text-align: center;">2018</th>';
            Header = Header + '<th style="text-align: center;">2019</th>';
            Header = Header + '<th style="text-align: center;">2020</th>';
            Header = Header + '<th style="text-align: center;">2021</th>';
            Header = Header + '<th style="text-align: center;">2022</th>';
            Header = Header + '<th style="text-align: center;">EOP<br>2022</th>';
            Header = Header + '</tr>';
            Header = Header + '</thead>';
            var body = '<tbody>';

            var subcomponenteactual = "";
            var divOpcion = "";

            for (var a = 0; a < data.length; a++) {

                if (subcomponenteactual != data[a]["SubComponente"])
                {
                    divOpcion = divOpcion + '<tr id="detalle_row_' + a + '">';
                    /*==========labels==============*/
                    divOpcion = divOpcion + '<td class="align-middle" rowspan=3 >1.' + data[a].NroSubComponente + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle wrap-text" rowspan=3>' + data[a].SubComponente + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle wrap-text" rowspan=3>' + data[a].Unidad + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle">' + data[a].Progreso + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2018) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2019) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2020) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2021) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2022) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].total) + '</td>';
                    divOpcion = divOpcion + '</tr>';

                    subcomponenteactual = data[a]["SubComponente"];
                }
                else
                {
                    divOpcion = divOpcion + '<tr id="detalle_row_' + a + '">';
                    divOpcion = divOpcion + '<td class="align-middle">' + data[a].Progreso + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2018) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2019) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2020) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2021) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2022) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].total) + '</td>';
                    divOpcion = divOpcion + '</tr>';
                }
                
            }
            body = body + divOpcion + "</tbody>";

            tableC1 = tableC1 + Header + body + '</table>';

            $("#Export").append(tableC1);
        }
    });

    $.ajax({
        async: false,
        type: 'GET',
        url: "/ReporteMensualProgreso/ReporteBid?id=" + 2,
        success: function (data) {
            //$.get("/ReporteMensualProgreso/ListComponente?id=" + 1 + "&anio=" + $("#cboAnioC1").val(), function (data, status) {

            tableC2 = '<div></div><br><div><strong style="font-size: 12.0pt;">2.-Component: Componente II: Gestión de la Sostenibilidad de los Servicios y Fortalecimiento de las Entidades del Sector</strong></div><br><table id="tblC2" class="table table-bordered table-hover" style="width:100%" border="2px">';
            var Header = '<thead>';
            Header = Header + '<tr style="background:#083568;color: #FFFFFF;">';
            Header = Header + '<th colspan="2" style="text-align: center;">Output Definition</th>';
            Header = Header + '<th style="text-align: center;">Unit Of Measure</th>';
            Header = Header + '<th style="text-align: center;"></th>';
            Header = Header + '<th style="text-align: center;">2018</th>';
            Header = Header + '<th style="text-align: center;">2019</th>';
            Header = Header + '<th style="text-align: center;">2020</th>';
            Header = Header + '<th style="text-align: center;">2021</th>';
            Header = Header + '<th style="text-align: center;">2022</th>';
            Header = Header + '<th style="text-align: center;">EOP<br>2022</th>';
            Header = Header + '</tr>';
            Header = Header + '</thead>';
            var body = '<tbody>';

            var subcomponenteactual = "";
            var divOpcion = "";

            for (var a = 0; a < data.length; a++) {

                if (subcomponenteactual != data[a]["SubComponente"]) {
                    divOpcion = divOpcion + '<tr id="detalle_row_' + a + '">';
                    /*==========labels==============*/
                    divOpcion = divOpcion + '<td class="align-middle" rowspan=3 >2.' + data[a].NroSubComponente + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle wrap-text" rowspan=3>' + data[a].SubComponente + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle wrap-text" rowspan=3>' + data[a].Unidad + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle">' + data[a].Progreso + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2018) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2019) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2020) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2021) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2022) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].total) + '</td>';
                    divOpcion = divOpcion + '</tr>';

                    subcomponenteactual = data[a]["SubComponente"];
                }
                else {
                    divOpcion = divOpcion + '<tr id="detalle_row_' + a + '">';
                    divOpcion = divOpcion + '<td class="align-middle">' + data[a].Progreso + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2018) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2019) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2020) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2021) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].p2022) + '</td>';
                    divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].total) + '</td>';
                    divOpcion = divOpcion + '</tr>';
                }

            }
            body = body + divOpcion + "</tbody>";

            tableC2 = tableC2 + Header + body + '</table>';

            $("#Export").append(tableC2);
        }
    });

    var style = "<style>.text-center { vertical-align: middle;text-align: center; white-space:pre-wrap; word-wrap:break-word }; br {mso-data-placement:same-cell;}; .table-bordered {border:2px; border-style:solid; border-color:#333;}.table {width: 100%; max-width: 100%; margin-bottom: 1rem; background-color: transparent;};td{vertical-align: middle; mso-number-format:\@;}</style>";
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html lang="es-pe" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' + style + '</head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    // return function () {
    var table = document.getElementById('Export');
    var ctx = { worksheet: 'Físico' || 'Worksheet', table: table.innerHTML }

    // Construct the <a> element
    var link = document.createElement("a");
    link.download = getNombreFile('rpt_ReporteBID_');
    link.href = uri + base64(format(template, ctx));

    document.body.appendChild(link);
    link.click();

    // Cleanup the DOM
    document.body.removeChild(link);
    delete link;

    $("#Export").html("");

    $.unblockUI();
}

function ExportarPDF() {
    var Id = 618; //$('#hdnIdUsuario').val();
    //var anio = 
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    $('#Export').load("/ReporteMensualProgreso/rptMensualPDF?IdUsuario=" + Id, function () {
        $.unblockUI();
    });
}

function calculateSum(tbl,row) {
    var total = 0;
    var PA = $("#" + tbl + "_txtPA_" + row).val();
    PA = PA.replace(",", "");
    var A = $("#" + tbl + "_txtA_" + row).val();
    A = A.replace(",", "");

    if (!isNaN(PA)) {
        if (!isNaN(A)) {
            total = (A / PA)*100;
        }
    }

    $("#" + tbl + "_txtPorcentage_" + row).val(formatMoney(total.toFixed(2)));
}

function getNombreFile(nom) {
    var f = new Date();
    var title = nom + f.getDate() + "_" + (f.getMonth() + 1) + "_" + f.getFullYear() + "_" + f.getHours() + "_" + f.getMinutes();
    return title;
}