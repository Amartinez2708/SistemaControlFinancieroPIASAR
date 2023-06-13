$(document).ready(function () {
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    ListProyectos();
    $("#ddlEtapa").change(function () {
        ddlMeses();
    });
    $("#ddlMes").change(function () {
        ddlActividad();
    });
    $("#ddlActividad").change(function () {
        ListHistorialSeguimiento();
    });
    $("#txtNroHombres").change(function () {
        Sumar();
    });
    $("#txtNroMujeres").change(function () {
        Sumar();
    });
});
function ListProyectos() {
    var tabla = $("#dtSeguimiento").DataTable({
        processing: true,
        filter: true,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        info: true,
        ordering: false,
        paging: true,
        pageLength: 10,
        //order: [[4, "desc"]],
        ajax: {
            url: "/JASS/ListProyectos",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json"
        },
        //dom: 'Bfrtip',
        //buttons: [
        //     {
        //         text: '<span class="fa fa-file-excel-o"></span> Excel',
        //         className: 'btn btn-mat btn-success mr-1 mb-2',
        //         extend: 'excelHtml5',
        //         title: getNombreFile('rpt_Monitoreo_Obras_')
        //     },
        //     {
        //         text: '<span class="fa fa-clipboard"></span> Copiar',
        //         className: 'btn btn-mat btn-warning mr-1 mb-2',
        //         extend: 'copy',
        //         title: getNombreFile('rpt_Monitoreo_Obras_')
        //     }
        //],
        columns: [
                    { "name": "N°", "title": "N°", "data": null, "autowidth": true },
                    { "name": "CUI", "title": "CUI", "data": "CUI", "autowidth": true },
                    { "name": "SNIP", "title": "SNIP", "data": "Snip", "autowidth": true },
                    { "name": "Departamento", "title": "Región", "data": "Departamento", "autowidth": true },
                    { "name": "Provincia", "title": "Provincia", "data": "Provincia", "autowidth": true },
                    { "name": "Distrito", "title": "Distrito", "data": "Distrito", "autowidth": true },
                    { "name": "Localidad", "title": "Localidad", "data": "Localidad", "autowidth": true },
                    { "name": "", "title": "Modalidad", "data": "Modalidad", "autowidth": true },
                    { "name": "", "title": "Fecha Ult. </br>Actualización", "data": "FechaActualizacion", "autowidth": true },
                    { "name": "", "title": "Seguimiento", "data": null, "autowidth": true }
        ],
        columnDefs: [

            {
                "targets": 9,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="AbrirSeguimiento(\'' + full.CUI + '\',\'' + full.Localidad + '\')" style="cursor: pointer;"><img src="../Content/Images/lista-de-verificacion.png" style="width:40px"/></div>';
                    //}
                }
            },
            {
                "targets": "_all",
                "className": "align-middle text-center",
            }
        ],
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var api = this.api();
            var startIndex = api.context[0]._iDisplayStart;
            var counter = startIndex + iDisplayIndex + 1;
            $('td:eq(0)', nRow).html(counter);
            return nRow;
        },
        fnDrawCallback: function (settings) {
        },
        fnCreatedRow: function (row, data, index) {
        },
        initComplete: function (settings, json) {
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
    });
}

function AbrirSeguimiento(cui, localidad) {
    $("#lblProyecto").html(cui + " - " + localidad);
    $("#hdnCUI").val(cui);
    ListDatosSeguimiento();
    $("#modal-seguimiento").modal({ backdrop: 'static', keyboard: true, show: true });
}

function ddlMeses() {
    $.get("/JASS/ddlMeses?Etapa=" + $("#ddlEtapa").val(), function (data, status) {
        $("#ddlMes").empty();
        if (data.length > 0) {
            $.each(data, function (i, data) {
                $("#ddlMes").append('<option value="'
                + data.Value + '">'
                + data.Text + '</option>');
            });
        } else {
            $("#ddlMes").append('<option value="0">[--Seleccione--]</option>');
        }

    });
    return false;
}

function ddlActividad() {
    $.get("/JASS/ddlActividad?Etapa=" + $("#ddlEtapa").val() + "&NroMes=" + $("#ddlMes").val(), function (data, status) {
        $("#ddlActividad").empty();
        if (data.length > 0) {
            $.each(data, function (i, data) {
                $("#ddlActividad").append('<option value="'
                + data.Value + '">'
                + data.Text + '</option>');
            });
        } else {
            $("#ddlActividad").append('<option value="0">[--Seleccione--]</option>');
        }

    });
    return false;
}

function ListDatosSeguimiento() {
    $.get("/JASS/ListSeguimiento?cui=" + $("#hdnCUI").val(), function (data, status) {
        $("#hdnIdDetalleSeguimientoActividades").val("");
        $("#hdnIdSeguimientoActividades").val(data.IdSeguimientoActividadesJASS);

        $("#txtNroAsociadosMujeres").val(data.NroAsociadosMujeres);
        $("#txtNroAsociadosHombres").val(data.NroAsociadosHombres);
        $("#txtTotalAsociados").val(data.TotalAsociados);

        $("#txtTotalViviendasValidadas").val(data.TotalViviendasValidadas);
        $("#txtTotalInstitucionesValidadas").val(data.TotalInstitucionesValidadas);
        $("#txtTotalInstitucionesViviendas").val(data.TotalInstitucionesViviendasValidadas);

        $("#txtNroOperadoresMujeres").val(data.NroOperadoresSAPMujeres);
        $("#txtNroOperadoresHombres").val(data.NroOperadoresSAPHombres);
        $("#txtTotalOperadores").val(data.TotalOperadores);

        $("#txtLideres").val(data.TotalAutoridadesLideres);
        $("#txtLideresIdentificados").val(data.NroIdentificacionLideres);
        ListHistorialSeguimiento();
    });
}

function ListHistorialSeguimiento() {
    var tabla = $("#dtHistorialSeguimiento").DataTable({
        processing: true,
        filter: true,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        info: true,
        ordering: false,
        paging: true,
        pageLength: 10,
        //order: [[4, "desc"]],
        ajax: {
            url: "/JASS/ListDetalleSeguimiento?Id=" + $("#hdnIdSeguimientoActividades").val() + "&IdCronogramaActividades=" + $("#ddlActividad").val(),
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json"
        },
        columns: [
                    { "name": "N°", "title": "N°", "data": null, "autowidth": true },
                    { "name": "Fecha", "title": "Fecha", "data": "FechaString", "autowidth": true },
                    { "name": "Nro. Hombres", "title": "Nro. Hombres", "data": "NroHombres", "autowidth": true },
                    { "name": "Nro. Mujeres", "title": "Nro. Mujeres", "data": "NroMujeres", "autowidth": true },
                    { "name": "Total", "title": "Total", "data": "Total", "autowidth": true },
                    { "name": "% Asistencia", "title": "% Asistencia", "data": "PorcentageTotal", "autowidth": true },
                    { "name": "", "title": "Adicional <br/>Operadores <br/>SAP", "data": "TotalSAP", "autowidth": true },
                    { "name": "", "title": "% Adicional SAP", "data": "PorcentageSAP", "autowidth": true },
                    { "name": "", "title": "Comentarios", "data": "Comentarios", "autowidth": true },
                    { "name": "", "title": "Acciones", "data": null, "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 5,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return full.PorcentageTotal * 100 + "%";
                }
            },
            {
                "targets": 7,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return full.PorcentageSAP * 100 + "%";
                }
            },
            {
                "targets": 9,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return '<button class="btn btn-danger btn-icon" title="Eliminar" style="width: 30px;height: 30px;line-height: 0px;" onclick="ConfirmarEliminarActividad(' + full.IdDetalleSeguimientoActividadesJASS + ')"><i class="fa fa-trash f-18" style="margin-right:0px;"></i></button>&nbsp;<button class="btn btn-primary btn-icon" title="Editar" style="width: 30px;height: 30px;line-height: 0px;" onclick="EditarActividad(' + full.IdDetalleSeguimientoActividadesJASS + ')"><i class="fa fa-pencil f-18" style="margin-right:0px;"></i></button>';
                }
            },
            {
                "targets": "_all",
                "className": "align-middle text-center",
            }
        ],
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var api = this.api();
            var startIndex = api.context[0]._iDisplayStart;
            var counter = startIndex + iDisplayIndex + 1;
            $('td:eq(0)', nRow).html(counter);
            return nRow;
        },
        fnDrawCallback: function (settings) {
            //$("#dtProyecto thead tr").css({ 'height': "0" });
        },
        initComplete: function (settings, json) {
            //$("#dtProyecto thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
    });
}

function CerrarSeguimiento() {
    LimpiarFormulario();
    $('#modal-seguimiento').modal('toggle');
}

function LimpiarFormulario() {
    $("#ddlEtapa").val("");
    $("#ddlEtapa").change();
    $("#ddlMes").val(0);
    $("#ddlMes").change();
    $("#ddlActividad").val(0);

    $("#txtFecha").val("");
    $("#txtNroHombres").val("");
    $("#txtNroMujeres").val("");
    $("#txtTotal").val("");
    $("#txtPorcentajeAsistencia").val("");
    $("#txtAdicional").val("");
    $("#txtPorcentajeAdicional").val("");
    $("#txtComentarios").val("");
}

function LimpiarRegistro() {
    $("#txtFecha").val("");
    $("#txtNroHombres").val("");
    $("#txtNroMujeres").val("");
    $("#txtTotal").val("");
    $("#txtPorcentajeAsistencia").val("");
    $("#txtAdicional").val("");
    $("#txtPorcentajeAdicional").val("");
    $("#txtComentarios").val("");
}

function GuardarSeguimiento() {
    if ($("txtFecha").val() == "") {
        MensajeAlerta('Ingrese la fecha', 'txtFecha');
    }
    else if ($("txtNroHombres").val() == "") {
        MensajeAlerta('Ingrese el Nro. Hombres', 'txtNroHombres');
    }
    else if ($("txtNroMujeres").val() == "") {
        MensajeAlerta('Ingrese el Nro. Mujeres', 'txtNroMujeres');
    }
    else if ($("txtTotal").val() == "") {
        MensajeAlerta('Ingrese el Total', 'txtTotal');
    }
    else if ($("txtPorcentajeAsistencia").val() == "") {
        MensajeAlerta('Ingrese el Porcentaje Asistencia', 'txtPorcentajeAsistencia');
    }
    else {
        $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

        var detalle = {
            CUI: $("#hdnCUI").val(),
            IdDetalleSeguimientoActividadesJASS: $("#hdnIdDetalleSeguimientoActividades").val(),
            IdSeguimientoActividadesJASS: $('#hdnIdSeguimientoActividades').val(),
            IdCronogramaActividades: $('#ddlActividad').val(),
            Fecha: $('#txtFecha').val(),
            NroHombres: $('#txtNroHombres').val(),
            NroMujeres: $("#txtNroMujeres").val(),
            Total: $("#txtTotal").val(),
            PorcentageTotal: ($("#txtPorcentajeAsistencia").val() / 100),
            TotalSAP: $("#txtAdicional").val(),
            PorcentageSAP: ($("#txtPorcentajeAdicional").val()/100),
            Comentarios: $("#txtComentarios").val(),
        }

        $.ajax({
            type: "POST",
            url: "/JASS/GuardarSeguimiento",
            cache: false,
            data: JSON.stringify(detalle),
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
                                    LimpiarRegistro();
                                    $('#dtHistorialSeguimiento').DataTable().ajax.reload();
                                    //$("#modal-seguimiento").modal('hide');
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
}

function EditarActividad(Id) {

    $.get("/JASS/ListDetalleSeguimientoId?Id=" + Id, function (data, status) {
        $("#hdnIdSeguimientoActividades").val(data.IdSeguimientoActividadesJASS);
        $("#hdnIdDetalleSeguimientoActividades").val(data.IdDetalleSeguimientoActividadesJASS);
        $("#txtFecha").val(data.FechaString);
        $("#txtNroHombres").val(data.NroHombres);
        $("#txtNroMujeres").val(data.NroMujeres);
        $("#txtTotal").val(data.Total);
        $("#txtPorcentajeAsistencia").val(data.PorcentageTotal * 100);
        $("#txtAdicional").val(data.TotalSAP);
        $("#txtPorcentajeAdicional").val(data.PorcentageSAP * 100);
        $("#txtComentarios").val(data.Comentarios);
    });
}

function ConfirmarEliminarActividad(Id) {
    $.confirm({
        title: 'Eliminar',
        content: '<div class="form-group">' +
                '<label> Esta seguro de eliminar el registro? </label>' +
                '</div>',
        icon: 'fa fa-question',
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
                    EliminarActividad(Id);
                }
            },
            Close: {
                text: 'Cancelar',
                btnClass: 'btn-default',
                action: function () {
                }
            }
        }
    });
}

function EliminarActividad(Id) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    var obj = { Id: Id };

    $.ajax({
        type: "POST",
        url: "/JASS/EliminarSeguimiento",
        cache: false,
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        traditional: true,
        success: function (result) {
            $.unblockUI();
            if (result.TipoRespuesta == 1) {
                $.confirm({
                    title: 'Eliminar',
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
                                $('#dtHistorialSeguimiento').DataTable().ajax.reload();
                            }
                        }
                    }
                });
            }
            else if (result.TipoRespuesta == 2) {
                $.confirm({
                    title: 'Eliminar',
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
function Sumar() {
    var a = parseInt($("#txtNroHombres").val() == "" ? 0 : $("#txtNroHombres").val());
    var b = parseInt($("#txtNroMujeres").val() == "" ? 0 : $("#txtNroMujeres").val());
    $("#txtTotal").val(a + b);
}