$(document).ready(function () {
    if (getUrlParameter('Snip') != "") {
        debugger;
        $('#hdnSnip').val(getUrlParameter('Snip'))
        $('#hdnIdUsuario').val(getUrlParameter('Idu'))
        ddlAutorizacion();
    };
    $('#ddlAutorizacion').on('select2:select', function (e) {
        if ($('#ddlRubro').val() == -1) {
            MensajeAlerta('Seleccione el Rubro primero', 'ddlRubro');
        } else {
            ListAutorizacion();
        }
        
    });

    $("input[name=rdbMedioPago]").on("change", function () {
        ListAutorizacion();
    });

    $('#ddlRubro').change(function () {
        ListAutorizacion();
    });
});

function popUpComprobante() {
    $("#modal-comprobante").modal({ backdrop: 'static', keyboard: true, show: true });
}
function ddlAutorizacion() {
    $.get("/ManifiestoGasto/ddlAutorizacionesGasto?Snip=" + $("#hdnSnip").val(), function (data, status) {
        debugger;
        $('#ddlAutorizacion').select2({
            dropdownParent: $('#modal-comprobante'),
            placeholder: {
                id: '-1', // the value of the option
                text: "[Seleccione]"
            },
            data: data
        });
    });
}
function ListAutorizacion() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    debugger;
    var data = $("#ddlAutorizacion").select2('data');
    var ids = "";
    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
            if (ids == "") {
                ids = data[i].id;
            } else {
                ids = ids + "," + data[i].id;
            }
        }
    }
    var Tipo = $("#ddlRubro").val();
    //var Tipo = $("input:radio[name='rdbMedioPago']:checked").val();

    //if (Tipo == 1) {
    //    $("#divDetalle").removeClass("d-none");
    //    $("#divRubro").addClass("d-none");
    //} else {
    //    $("#divDetalle").addClass("d-none");
    //    $("#divRubro").removeClass("d-none");
    //}
    if (ids == "") {
        $("#dtDetalle > tbody").html("");
        $("#dtRubro > tbody").html("");
        $("#dtDetalle > tbody").append('<tr class="row0"><td style="text-align: center;" colspan="9">Sin Información</td></tr>');
        $("#dtRubro > tbody").append('<tr class="row0"><td style="text-align: center;" colspan="6">Sin Información</td></tr>');
    } else {
        var data = $('#dtComprobante >tbody >tr').length;
        var idsComprobante = "";
        if (data > 0) {
            for (i = 0; i < data; i++) {
                if ($('#dtComprobante >tbody >tr:eq(' + i + ')').hasClass("ok")) {
                    if (idsComprobante == "") {
                        idsComprobante = $("#comprobante_hddIdComprobante_" + (i + 1)).val();
                    } else {
                        idsComprobante = idsComprobante + "," + $("#comprobante_hddIdComprobante_" + (i + 1)).val();
                    }
                }
            }
        }
        $.get("/ManifiestoGasto/ListAutorizacionGasto?ids=" + ids + "&Tipo=" + Tipo + "&IdsComprobante=" + idsComprobante, function (data, status) {
            //if (Tipo == 1) {

                $("#dtDetalle > tbody").html("");
                for (var a = 0; a < data.length; a++) {
                    var divOpcion = '<tr id="detalle_row_' + a + '">';

                    /*===========Check==============*/
                    divOpcion = divOpcion + '<td class="align-middle" style="text-align: center;"><div class="checkbox-fade fade-in-primary m-t-5">';
                    divOpcion = divOpcion + '<label>';
                    divOpcion = divOpcion + '<input id="chkSeleccionarDetalle_' + a + '" type="checkbox" value="1" onchange="EditarDetalle(' + a + ')">';
                    divOpcion = divOpcion + '<span class="cr"><i class="cr-icon fa fa-check txt-primary"></i></span><span></span>';
                    divOpcion = divOpcion + '</label></div></td>';
                    /*==========labels==============*/
                    divOpcion = divOpcion + '<td class="align-middle">' + data[a].CodRubro + '<input id="detalle_hddCodRubro_' + a + '" type="hidden" class="form-control" value="' + data[a].CodRubro + '"/></td>';
                    divOpcion = divOpcion + '<td class="align-middle">' + data[a].Rubro + '<input id="detalle_hddRubro_' + a + '" type="hidden" class="form-control" value="' + data[a].Rubro + '"/></td>';
                    divOpcion = divOpcion + '<td class="align-middle">' + data[a].Item_Insumo_Servicio + '<input id="detalle_hddItemInsumo_' + a + '" type="hidden" class="form-control" value="' + data[a].Item_Insumo_Servicio + '"/></td>';
                    divOpcion = divOpcion + '<td class="align-middle">' + data[a].Descripcion_Insumo_Servicio + '<input id="detalle_hddDescripcion_' + a + '" type="hidden" class="form-control" value="' + data[a].Descripcion_Insumo_Servicio + '"/></td>';
                    divOpcion = divOpcion + '<td class="align-middle">' + data[a].Unidad + '<input id="detalle_hddUnidad_' + a + '" type="hidden" class="form-control" value="' + data[a].Unidad + '"/></td>';
                    /*==========Text==============*/
                    divOpcion = divOpcion + '<td class="align-middle"><input id="detalle_txtCantidad_' + a + '" type="text" class="form-control" onkeyup="calculateSum(' + a + ')" value="' + formatMoneyTresDecimales(data[a].Cantidad) + '" readonly /></td>';
                    divOpcion = divOpcion + '<td class="align-middle"><input id="detalle_txtPrecioUnitario_' + a + '" type="text" class="form-control" onkeyup="calculateSum(' + a + ')" value="' + formatMoney(data[a].PreciUnitario) + '" readonly /></td>';
                    divOpcion = divOpcion + '<td class="align-middle"><input id="detalle_txtTotal_' + a + '" type="text" class="form-control" value="' + formatMoney(data[a].Importe) + '" readonly/><input id="detalle_hddSaldoOriginal_' + a + '" type="hidden" class="form-control" value="' + data[a].SaldoImporte + '"/>';
                    divOpcion = divOpcion + '<input id="detalle_hddIdAutorizacion_' + a + '" type="hidden" class="form-control" value="' + data[a].IdAutorizacion + '"/><input id="detalle_hddIdRubro_' + a + '" type="hidden" class="form-control" value="' + data[a].IdRubro + '"/><input id="detalle_hddIdItem_' + a + '" type="hidden" class="form-control" value="' + data[a].IdItem + '"/></td>';
                    divOpcion = divOpcion + '<td class="align-middle"><input id="detalle_txtSaldoImporte_' + a + '" type="text" class="form-control" value="' + formatMoney(data[a].SaldoImporte) + '" readonly /></td>';
                    divOpcion = divOpcion + '</tr>';
                    $("#dtDetalle > tbody").append(divOpcion);
                }
            //}
            //else {

            //    $("#dtRubro > tbody").html("");
            //    for (var a = 0; a < data.length; a++) {
            //        var divOpcion = '<tr id="rubro_row_' + a + '">';

            //        /*===========Check==============*/
            //        divOpcion = divOpcion + '<td class="align-middle" style="text-align: center;"><div class="checkbox-fade fade-in-primary m-t-5">';
            //        divOpcion = divOpcion + '<label>';
            //        divOpcion = divOpcion + '<input id="chkSeleccionarRubro_' + a + '" type="checkbox" value="1" onchange="EditarRubro(' + a + ')">';
            //        divOpcion = divOpcion + '<span class="cr"><i class="cr-icon fa fa-check txt-primary"></i></span><span></span>';
            //        divOpcion = divOpcion + '</label></div></td>';
            //        /*==========labels==============*/
            //        divOpcion = divOpcion + '<td class="align-middle">' + data[a].CodRubro + '<input id="rubro_hddCodRubro_' + a + '" type="hidden" class="form-control" value="' + data[a].CodRubro + '"/></td>';
            //        divOpcion = divOpcion + '<td class="align-middle">' + data[a].Rubro + '<input id="detalle_hddRubro_' + a + '" type="hidden" class="form-control" value="' + data[a].Rubro + '"/></td>';
            //        /*==========Text==============*/
            //        divOpcion = divOpcion + '<td class="align-middle"><input id="rubro_txtTotal_' + a + '" type="text" class="form-control" value="' + data[a].Importe + '" onkeyup="ValidarMonto(' + a + ')" readonly/><input id="rubro_hddTotal_' + a + '" type="hidden" class="form-control" value="' + data[a].Importe + '"/>';
            //        divOpcion = divOpcion + '<input id="rubro_hddIdRubro_' + a + '" type="hidden" class="form-control" value="' + data[a].IdRubro + '"/></td>';
            //        divOpcion = divOpcion + '</tr>';
            //        $("#dtRubro > tbody").append(divOpcion);
            //    }
            //}
        })
    }

    $.unblockUI();
}

function EditarDetalle(nro) {
    if ($('#chkSeleccionarDetalle_' + nro).is(':checked')) {
        $("#detalle_txtCantidad_" + nro).prop("readonly", false);
        $("#detalle_txtPrecioUnitario_" + nro).prop("readonly", false);
        //$("#detalle_txtTotal_" + nro).prop("readonly", false);
    } else {
        $("#detalle_txtCantidad_" + nro).prop("readonly", true);
        $("#detalle_txtPrecioUnitario_" + nro).prop("readonly", true);
        //$("#detalle_txtTotal_" + nro).prop("readonly", true);
    }
}
function EditarRubro(nro) {
    if ($('#chkSeleccionarRubro_' + nro).is(':checked')) {
        $("#rubro_txtTotal_" + nro).prop("readonly", false);
    } else {
        $("#rubro_txtTotal_" + nro).prop("readonly", true);
    }
}
function calculateSum(nro) {
    var total = 0;

    var Cantidad = $("#detalle_txtCantidad_" + nro).val();
    Cantidad = Cantidad.replace(",", "");
    var Precio = $("#detalle_txtPrecioUnitario_" + nro).val()
    Precio = Precio.replace(",", "");
    //var TotalOriginal = $("#detalle_hddTotal_" + nro).val()
    var SaldoOriginal = $("#detalle_hddSaldoOriginal_" + nro).val()
    SaldoOriginal = SaldoOriginal.replace(",", "");

    if (!isNaN(Cantidad)) {
        if (!isNaN(Precio)) {
            total = Cantidad * Precio;
        }
    }
    
    if ((SaldoOriginal - total.toFixed(2)) < 0) {
        $("#detalle_txtSaldoImporte_" + nro).addClass("danger-textbox")
    } else {
        $("#detalle_txtSaldoImporte_" + nro).removeClass("danger-textbox")
    }

    $("#detalle_txtTotal_" + nro).val(formatMoney(total.toFixed(2)));
    $("#detalle_txtSaldoImporte_" + nro).val(formatMoney(SaldoOriginal - total.toFixed(2)))
}
function ValidarMonto(nro) {

    var total = $("#rubro_txtTotal_" + nro).val();
    var TotalOriginal = $("#rubro_hddTotal_" + nro).val();

    if (total > TotalOriginal) {
        $("#rubro_txtTotal_" + nro).addClass("danger-textbox")
    } else {
        $("#rubro_txtTotal_" + nro).removeClass("danger-textbox")
    }
}

function ValidarComprobante() {

    var data = $("#ddlAutorizacion").select2('data');

    if ($("#ddlClase").val() == "-1") {
        MensajeAlerta('Seleccione la Clase del Comprobante', 'ddlClase');
    }
    else if ($("#txtNroMedioPago").val() == "") {
        MensajeAlerta('Ingrese el Nro. del Comprobante', 'txtNroMedioPago');
    }
    else if ($("#txtRazonSocial").val() == "") {
        MensajeAlerta('Ingrese la Razón Social', 'txtRazonSocial');
    }
    else if ($("#txtFechaMedioPago").val() == "") {
        MensajeAlerta('Ingrese la Fecha del Comprobante', 'txtFechaMedioPago');
    }
    else if (data.length <= 0) {
        MensajeAlerta('Seleccione las Autorizaciones a Manifestar', 'ddlAutorizacion');
    }
    else {
        AgregarRecibo()
    }
}

function AgregarRecibo() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    var Errores = 0;
    var Total = 0;
    var comprobantedetalle = [];

    var Tipo = $("input:radio[name='rdbMedioPago']:checked").val();

    if (Tipo == 1)
    {
        var rowCount = $('#dtDetalle >tbody >tr').length;
        for (var a = 0; a < rowCount; a++) {
            if ($('#chkSeleccionarDetalle_' + a).is(':checked')) {

                //if ($('#detalle_txtTotal_' + a).val() > $('#detalle_hddTotal_' + a).val()) {
                //    Errores = Errores + 1;
                //}

                var Cantidad = $('#detalle_txtCantidad_' + a).val();
                Cantidad = Cantidad.replace(",", "");
                var Precio = $('#detalle_txtPrecioUnitario_' + a).val();
                Precio = Precio.replace(",", "");
                var Importe = $('#detalle_txtTotal_' + a).val()
                Importe = Importe.replace(",", "");
                var SaldoImporte = $('#detalle_txtSaldoImporte_' + a).val();
                SaldoImporte=SaldoImporte.replace(",", "");

                comprobantedetalle.push({
                    IdComprobantePagoDetalle: 0,
                    IdComprobante: 0,
                    IdAutorizacion: $('#detalle_hddIdAutorizacion_' + a).val(),
                    IdRubro: $('#detalle_hddIdRubro_' + a).val(),
                    IdItem: $('#detalle_hddIdItem_' + a).val(),
                    Item_Insumo_Servicio: $('#detalle_hddItemInsumo_' + a).val(),
                    Descripcion_Insumo_Servicio: $('#detalle_hddDescripcion_' + a).val(),
                    Unidad: $('#detalle_hddUnidad_' + a).val(),
                    Cantidad: Cantidad,
                    PreciUnitario: Precio,
                    Importe: Importe,
                    SaldoCantidad:0,
                    SaldoImporte: SaldoImporte,
                })
                var str = $('#detalle_txtTotal_' + a).val();
                str = str.replace(",", "");
                Total = Total + parseFloat(str);
            }
        }
    }
    else
    {
        var rowCount = $('#dtRubro >tbody >tr').length;
        for (var a = 0; a < rowCount; a++) {
            if ($('#chkSeleccionarRubro_' + a).is(':checked')) {

                if ($('#rubro_txtTotal_' + a).val() > $('#rubro_hddTotal_' + a).val()) {
                    Errores = Errores + 1;
                }

                comprobantedetalle.push({
                    IdComprobantePagoDetalle: 0,
                    IdComprobante: 0,
                    IdRubro: $('#rubro_hddIdRubro_' + a).val(),
                    IdItem: "",
                    Item_Insumo_Servicio: "",
                    Descripcion_Insumo_Servicio: "",
                    Unidad: "",
                    Cantidad: "",
                    PreciUnitario: "",
                    Importe: $('#rubro_txtTotal_' + a).val(),
                })
                Importe = Importe + parseFloat($('#rubro_txtTotal_' + a).val());
            }
        }
    }

    var data = $("#ddlAutorizacion").select2('data');
    var ids = "";
    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
            if (ids == "") {
                ids = data[i].id;
            } else {
                ids = ids + "," + data[i].id;
            }
        }
    }

    $.get("/ManifiestoGasto/TotalAutorizacion?ids=" + ids + "&Tipo=" + Tipo, function (data, status) {
        var ImpTotalAutorizacion = parseFloat(data.ValorDevolucion);
        if (Total > ImpTotalAutorizacion)
        {
            $.unblockUI();
            $.confirm({
                title: 'Error',
                content: '<div class="form-group">' +
                        '<label>El Monto Total del Manifiesto no puede exceder el Monto Total de las Autorizaciones</label>' +
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
        else
        {
            var comprobante = {
                IdComprobante: 0,
                IdClase: $("#ddlClase").val(),
                NroComrpobante: $('#txtNroMedioPago').val(),
                RazonSocial: $('#txtRazonSocial').val(),
                Fecha: $('#txtFechaMedioPago').val(),
                Observacion: $("#txtObservacionMedio").val(),
                //IdsAutorizacion: ids,
                Tipo: Tipo,
                ComprobanteDetalle: comprobantedetalle,
            }

            $.ajax({
                type: "POST",
                url: "/ManifiestoGasto/AgregarComprobante",
                cache: false,
                data: JSON.stringify(comprobante),
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
                                        AddRowComprobante(result.ValorDevolucion, Total);
                                        LimpiarComprobante();
                                        $("#modal-comprobante").modal('hide');
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
    });

}

function LimpiarComprobante() {
    $("#ddlClase").val(-1);
    $('#txtNroMedioPago').val("");
    $('#txtRazonSocial').val("");
    $('#txtFechaMedioPago').val("");
    $('#txtObservacionMedio').val("");
    $("#ddlAutorizacion").select2("val", "-1");
    $("#dtDetalle > tbody").html("");
    $("#dtRubro > tbody").html("");
    $("#dtDetalle > tbody").append('<tr class="row0"><td style="text-align: center;" colspan="9">Sin Información</td></tr>');
    $("#dtRubro > tbody").append('<tr class="row0"><td style="text-align: center;" colspan="6">Sin Información</td></tr>');
}
function AddRowComprobante(Id, Total) {

    if ($("#dtComprobante > tbody >tr").hasClass("row0")) { $("#dtComprobante > tbody").html(""); }
    

    var a = $('#dtComprobante >tbody >tr').length + 1;

    var Tipo = $("input:radio[name='rdbMedioPago']:checked").val();
    var TipoText = "";
    if (Tipo == 1) { TipoText = "Detallado" } else { TipoText = "Por Rubro" }

    var divOpcion = '<tr class="ok" id="Comprobante_row_' + a + '">';
    /*==========labels==============*/
    divOpcion = divOpcion + '<td class="align-middle">' + $('#txtNroMedioPago').val() + '<input id="comprobante_hddIdComprobante_' + a + '" type="hidden" class="form-control" value="' + Id + '"/></td>';
    divOpcion = divOpcion + '<td class="align-middle">' + $("#ddlClase option:selected").text() + '</td>';
    divOpcion = divOpcion + '<td class="align-middle">' + $('#txtRazonSocial').val() + '</td>';
    divOpcion = divOpcion + '<td class="align-middle">' + TipoText + '</td>';
    divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(Total) + '<input id="comprobante_hddImporte_' + a + '" type="hidden" class="form-control" value="' + Total + '"/></td>';
    /*==========Button==============*/
    divOpcion = divOpcion + '<td class="align-middle text-center">';
    divOpcion = divOpcion + '<button class="btn btn-danger btn-icon" title="Eliminar" onclick="EliminarComprobante(' + a + ',' + Id + ')"><i class="fa fa-trash f-18" style="margin-right:0px;"></i></button>';
    divOpcion = divOpcion + '</td>';
    divOpcion = divOpcion + '</tr>';

    $("#dtComprobante > tbody").append(divOpcion);

    var ImporteAcumulado = $('#txtMontoTotal').val()
    ImporteAcumulado = ImporteAcumulado.replace(",", "");

    $("#txtMontoTotal").val(formatMoney(parseFloat(ImporteAcumulado) + parseFloat(Total)));
}

function EliminarComprobante(NroFila, Id) {
    $('#Comprobante_row_' + NroFila).addClass("d-none");
    $('#Comprobante_row_' + NroFila).removeClass("ok");
    var MontoActual = $("#txtMontoTotal").val();
    MontoActual = MontoActual.replace(",", "");
    var MontoComprobante = $("#comprobante_hddImporte_" + NroFila).val();
    $("#txtMontoTotal").val(formatMoney(MontoActual - parseFloat(MontoComprobante)));
}

function ValidarManifiesto() {
    var data = $("#dtComprobante >tbody >tr.ok").length

    if ($("#txtConcepto").val() == "") {
        MensajeAlerta('Ingrese el Rubro del Manifiesto', 'ddlRubro');
    }
    else if ($("#txtFechaPresentacion").val() == "") {
        MensajeAlerta('Ingrese la Fecha de Presentación', 'txtFechaPresentación');
    }
    else if ($("#txtAnio").val() == "") {
        MensajeAlerta('Ingrese el Año', 'txtAnio');
    }
    else if (data <= 0) {
        MensajeAlerta('Agregue los Comprobantes', 'btnComprobante');
    }
    else {
        //$("#modal-manifiesto").modal({ backdrop: 'static', keyboard: true, show: true });
        GuardarManifiesto()
    }
}
function ValidarInforme() {
    if ($("#txtInforme").val() == "") {
        MensajeAlerta('Ingrese el Nombre del Informe', 'txtConcepto');
    }
    else {
        GuardarManifiesto();
    }
}

function GuardarManifiesto() {

    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    var data = $('#dtComprobante >tbody >tr').length;
    var ids = "";
    if (data > 0) {
        for (i = 0; i < data; i++) {
            if ($('#dtComprobante >tbody >tr:eq(' + i + ')').hasClass("ok")) {
                if (ids == "") {
                    ids = $("#comprobante_hddIdComprobante_" + (i + 1)).val();
                } else {
                    ids = ids + "," + $("#comprobante_hddIdComprobante_" + (i + 1)).val();
                }
            }
        }
    }

    //var cur = $("#hdnSnip").val() + "/Manifiesto de Gasto";
    //var fileUpload = $("#FileUpload").get(0);
    //var files = fileUpload.files;
    //var test = new FormData();

    //for (var i = 0; i < files.length; i++) {
    //    test.append(files[i].name, files[i]);
    //}

    //$.ajax({
    //    url: "/UploadFile.ashx?cur=" + cur,
    //    type: "POST",
    //    contentType: false,
    //    processData: false,
    //    data: test,
    //    //dataType: "json",
    //    success: function (result) {
    //        var datosfile = result.split("|");
    //        if (datosfile[2] != undefined) {
    //            $("#txtRutaDocumento").val(datosfile[2] + "/" + datosfile[0]);
    //        }
            var manifiesto = {
                IDMANIFIESTO: 0,
                NRO_MANIFIESTO: "",
                IDPROYECTO: 0,
                FECHA_MANIFIESTO: $('#txtFechaPresentacion').val(),
                //RUBRO: $('#ddlRubro option:selected').text(),
                RUBRO: $('#txtConcepto').val(),
                CORRESPONDE_AL_MES: $("#cboMes option:selected").text(),
                CORRESPONDE_AL_ANIO: $('#txtAnio').val(),
                OBSERVACION: $('#txtObservacion').val(),
                IdsComprobante: ids,
                Snip: $('#hdnSnip').val(),
                //NombreInforme: datosfile[1],
                //NombreReal: datosfile[0],
                //RutaDocumento: $("#txtRutaDocumento").val(),
                //ObservacionDocumento: $('#txtObservacionDocumento').val(),
                NombreInforme: "",
                NombreReal: "",
                RutaDocumento: "",
                ObservacionDocumento: "",
                IdUsuario: $('#hdnIdUsuario').val()
            }
            $.ajax({
                type: "POST",
                url: "/ManifiestoGasto/GuardarManifiesto",
                cache: false,
                data: JSON.stringify(manifiesto),
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
                                        window.close();
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
    //    },
    //    error: function (err) {
    //        console.log(err)
    //        $.unblockUI();
    //        $.confirm({
    //            title: 'Error',
    //            content: '<div class="form-group">' +
    //                    '<label>' + err.statusText + '</label>' +
    //                    '</div>',
    //            icon: 'fa fa-frown-o',
    //            theme: 'modern',
    //            closeIcon: false,
    //            closeIconClass: 'fa fa-close',
    //            animation: 'scale',
    //            type: 'red',
    //            buttons: {
    //                tryAgain: {
    //                    text: 'Aceptar',
    //                    btnClass: 'btn-red',
    //                    action: function () {
    //                    }
    //                }
    //            }
    //        });
    //    }
    //});
   
}