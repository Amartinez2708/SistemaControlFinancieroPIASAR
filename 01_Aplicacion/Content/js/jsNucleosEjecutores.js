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
            url: "/NucleosEjecutores/ListProyectos",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json"
        },
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
    $.get("/NucleosEjecutores/ddlMeses?Etapa=" + $("#ddlEtapa").val(), function (data, status) {
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
    $.get("/NucleosEjecutores/ddlActividad?Etapa=" + $("#ddlEtapa").val() + "&NroMes=" + $("#ddlMes").val(), function (data, status) {
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
    $.get("/NucleosEjecutores/ListSeguimiento?cui=" + $("#hdnCUI").val(), function (data, status) {
        $("#hdnIdDetalleSeguimientoActividades").val("");
        $("#hdnIdSeguimientoActividades").val(data.IdSeguimientoActividadesNE);

        $("#txtNroMienbrosMujeres").val(data.NroMienbrosMujeres);
        $("#txtNroMienbrosHombres").val(data.NroMienbrosHombres);
        $("#txtTotalMienbros").val(data.TotalMienbros);

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
            url: "/NucleosEjecutores/ListDetalleSeguimiento?Id=" + $("#hdnIdSeguimientoActividades").val() + "&IdCronogramaActividades=" + $("#ddlActividad").val(),
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
                    { "name": "", "title": "Acciones", "data": null, "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 5,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return '<button class="btn btn-danger btn-icon" title="Eliminar" style="width: 30px;height: 30px;line-height: 0px;" onclick="ConfirmarEliminarActividad(' + full.IdDetalleSeguimientoActividadesNE + ')"><i class="fa fa-trash f-18" style="margin-right:0px;"></i></button>&nbsp;<button class="btn btn-primary btn-icon" title="Editar" style="width: 30px;height: 30px;line-height: 0px;" onclick="EditarActividad(' + full.IdDetalleSeguimientoActividadesNE + ')"><i class="fa fa-pencil f-18" style="margin-right:0px;"></i></button>';
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
}

function LimpiarRegistro() {
    $("#txtFecha").val("");
    $("#txtNroHombres").val("");
    $("#txtNroMujeres").val("");
    $("#txtTotal").val("");
    $("#txtFiles").val("");
    $("#myDropzone").removeClass("dz-started");
    $(".dz-complete").remove();
    $("#btnCancelar").addClass("d-none");
}

function GuardarSeguimiento() {

    if ($("#ddlEtapa").val() == "") {
        MensajeAlerta('Seleccione la Etapa', 'ddlEtapa');
    }
    else if ($("#ddlMes").val() == "0") {
        MensajeAlerta('Seleccione el Mes', 'ddlMes');
    }
    else if ($("#ddlActividad").val() == "0") {
        MensajeAlerta('Seleccione el Mes', 'ddlActividad');
    }
    else if (validarFecha($("#txtFecha").val()) == false) {
        MensajeAlerta('Ingrese una fecha valida', 'txtFecha');
    }
    else if ($("#txtNroHombres").val() == "") {
        MensajeAlerta('Ingrese el Nro. Hombres', 'txtNroHombres');
    }
    else if ($("#txtNroMujeres").val() == "") {
        MensajeAlerta('Ingrese el Nro. Mujeres', 'txtNroMujeres');
    }
    else if ($("#txtTotal").val() == "") {
        MensajeAlerta('Ingrese el Total', 'txtTotal');
    }
    else
    {
        $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

        var detalle = {
            CUI: $("#hdnCUI").val(),
            IdDetalleSeguimientoActividadesNE: $("#hdnIdDetalleSeguimientoActividades").val(),
            IdSeguimientoActividadesNE: $('#hdnIdSeguimientoActividades').val(),
            IdCronogramaActividades: $('#ddlActividad').val(),
            Fecha: $('#txtFecha').val(),
            NroHombres: $('#txtNroHombres').val(),
            NroMujeres: $("#txtNroMujeres").val(),
            Total: $("#txtTotal").val(),
            Archivos: $("#txtFiles").val()
        }

        $.ajax({
            type: "POST",
            url: "/NucleosEjecutores/GuardarSeguimiento",
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

    $.get("/NucleosEjecutores/ListDetalleSeguimientoId?Id=" + Id, function (data, status) {
        $("#hdnIdSeguimientoActividades").val(data.IdSeguimientoActividadesNE);
        $("#hdnIdDetalleSeguimientoActividades").val(data.IdDetalleSeguimientoActividadesNE);
        $("#txtFecha").val(data.FechaString);
        $("#txtNroHombres").val(data.NroHombres);
        $("#txtNroMujeres").val(data.NroMujeres);
        $("#txtTotal").val(data.Total);
        $("#btnCancelar").removeClass("d-none");

        $.get("/NucleosEjecutores/ListSeguimientoDetalleArchivoId?IdSeguimiento=" + data.IdSeguimientoActividadesNE + "&IdDetalleSeguimiento=" + data.IdDetalleSeguimientoActividadesNE, function (archivo, status) {
            var template = "";
            var Files = "";
            /*append html jquery eliminar archivo debe eliminar el id del array*/
            for (var i = 0; i < archivo.length; i++) {
                template = template + '<div class="dz-preview dz-file-preview dz-processing dz-complete" id="File_' + archivo[i].IdSeguimientoDetalleArchivo + '">';
                template = template + '    <div class="dz-image"><img data-dz-thumbnail>';
                template = template + '    </div> <div class="dz-details"> <div class="dz-size"><span data-dz-size=""><strong>' + convertSizeToReadable(archivo[i].TamanioArchivo) + '</strong></span></div>';
                template = template + '    <div class="dz-filename"><span data-dz-name>' + archivo[i].NombreRealArchivo + '</span></div>';
                template = template + '    </div> <div class="dz-progress"> <span class="dz-upload" data-dz-uploadprogress="" style="width: 100%;"></span> </div>';
                template = template + '    <div class="dz-error-message"><span data-dz-errormessage=""></span></div>';
                template = template + '    <div class="dz-success-mark"> <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Check</title> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF"></path> </g> </svg> </div>';
                template = template + '    <div class="dz-error-mark"> <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Error</title> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475"> <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"></path> </g> </g> </svg> </div>';
                template = template + '    <a class="btn btn-sm btn-danger m-t-5 f-14 text-white d-block"  onclick="EliminarFile(\'' + archivo[i].IdSeguimientoDetalleArchivo + '\')"><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Eliminar</a>';
                template = template + '    <a class="btn btn-sm btn-success m-t-5 f-14 text-white" onclick="Download(\'' + archivo[i].FolderPath + '\',\'' + archivo[i].NombreRealArchivo + '\')"><i class="fa fa-download" aria-hidden="true"></i>&nbsp;Descargar</a>';
                template = template + '</div>';

                if (Files == "") {
                    Files = archivo[i].IdSeguimientoDetalleArchivo;
                } else {
                    Files = Files + "," + archivo[i].IdSeguimientoDetalleArchivo;
                }
            }

            if (archivo.length > 0) {
                if ($("#myDropzone").hasClass("dz-started") == false) {
                    $("#myDropzone").addClass("dz-started");
                }
            }

            $("#txtFiles").val(Files);
            $("#myDropzone").append(template);
        });
    });
}

function CancelarEditar() {
    LimpiarRegistro()
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
        url: "/NucleosEjecutores/EliminarSeguimiento",
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

function validarFecha(fecha) {
    // Expresión regular para verificar el formato de la fecha (YYYY-MM-DD)
    var formatoFecha = /^\d{2}\/\d{2}\/\d{4}$/;

    // Verificar el formato de la fecha
    if (!formatoFecha.test(fecha)) {
        return false;
    }

    // Obtener los componentes de la fecha
    var partesFecha = fecha.split("/");
    var anio = parseInt(partesFecha[2]);
    var mes = parseInt(partesFecha[1]);
    var dia = parseInt(partesFecha[0]);

    // Verificar que los componentes de la fecha sean válidos
    if (isNaN(anio) || isNaN(mes) || isNaN(dia)) {
        return false;
    }

    // Verificar que el mes esté dentro del rango válido (1-12)
    if (mes < 1 || mes > 12) {
        return false;
    }

    // Verificar que el día esté dentro del rango válido para el mes y el año
    var diasEnMes = new Date(anio, mes, 0).getDate();
    if (dia < 1 || dia > diasEnMes) {
        return false;
    }

    return true;
}

Dropzone.autoDiscover = false;

// Configuración de Dropzone
$("#myDropzone").dropzone({
    url: "/NucleosEjecutores/UploadAction",
    paramName: "file",
    maxFilesize: 50,
    addRemoveLinks: true,
    chunking: true,
    chunkRetry: 3, // Número de intentos de carga para cada fragmento
    chunkSize: 1024 * 1024, // Tamaño del fragmento (por ejemplo, 1 MB)
    acceptedFiles: ".png, .jpg, .jpeg, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .zip, .rar, .7z",
    sending: function (file, xhr, formData) {

        if ($("#ddlEtapa").val() == "") {
            this.removeFile(file);
            MensajeAlerta('Seleccione la Etapa', 'ddlEtapa');
            return false;
        }
        else if ($("#ddlMes").val() == "0") {
            this.removeFile(file);
            MensajeAlerta('Seleccione el Mes', 'ddlMes');
            return false;
        }
        else if ($("#ddlActividad").val() == "0") {
            this.removeFile(file);
            MensajeAlerta('Seleccione la Actividad', 'ddlActividad');
            return false;
        }
        else if (validarFecha($("#txtFecha").val()) == false) {
            this.removeFile(file);
            MensajeAlerta('Ingrese una fecha valida', 'txtFecha');
            return false;
        }
        else if ($("#txtNroHombres").val() == "") {
            this.removeFile(file);
            MensajeAlerta('Ingrese el Nro. Hombres', 'txtNroHombres');
            return false;
        }
        else if ($("#txtNroMujeres").val() == "") {
            this.removeFile(file);
            MensajeAlerta('Ingrese el Nro. Mujeres', 'txtNroMujeres');
            return false;
        }
        else if ($("#txtTotal").val() == "") {
            this.removeFile(file);
            MensajeAlerta('Ingrese el Total', 'txtTotal');
            return false;
        }
        else {

            var chunkIndex = file.upload.chunked == true ? file.upload.chunks.length : 1;
            var totalChunks = file.upload.totalChunkCount;
            var fileName = file.upload.filename;
            var extension = file.name.split('.').pop();

            // Agregar los parámetros al formulario de datos
            formData.append("chunkName", file.upload.uuid);
            formData.append("chunkIndex", chunkIndex);
            formData.append("totalChunks", totalChunks);
            formData.append("fileName", fileName);
            formData.append("extension", extension);
            formData.append("cui", $("#hdnCUI").val());
        }
    },
    addRemoveLinks: false,
    thumbnailWidth: 100,
    thumbnailHeight: 110,
    success: function (file, e) {
        // Agregar enlace de descarga archivo desde c# 
        if (e.Success == true) {

            var b = document.createElement('a');
            b.setAttribute('class', "btn btn-sm btn-danger m-t-5 f-14 text-white d-block");
            b.setAttribute('onclick', "EliminarFile(" + e.Mensaje.split('|')[0] + ")");
            b.innerHTML = "<i class='fa fa-trash-o' aria-hidden='true'></i>&nbsp;Eliminar";
            file.previewTemplate.appendChild(b);

            var a = document.createElement('a');
            a.setAttribute('class', "btn btn-sm btn-success m-t-5 f-14 text-white");
            a.setAttribute('onclick', "Download('" + e.Mensaje.split('|')[3] + "','" + e.Mensaje.split('|')[1] + "')");
            a.innerHTML = "<i class='fa fa-download' aria-hidden='true'></i>&nbsp;Descargar";
            file.previewTemplate.appendChild(a);

            var template = file.previewTemplate;
            template.setAttribute('id', "File_" + e.Mensaje.split('|')[0]);

            var Files = $("#txtFiles").val();
            if (Files == "") {
                $("#txtFiles").val(e.Mensaje.split('|')[0]);
            } else {
                $("#txtFiles").val(Files + "," + e.Mensaje.split('|')[0]);
            }
        }
    }
});
function EliminarFile(id) {
    $("#File_" + id).remove();
    var ids = $("#txtFiles").val().split(",").map(Number);
    var nuevosIds = ids.filter(item => item != id);
    var separador = ",";
    $("#txtFiles").val(nuevosIds.join(separador));
    if ($("#txtFiles").val() == "") $("#myDropzone").removeClass("dz-started");
}
function Download(filePath, nombre) {
    var url = "/NucleosEjecutores/DownloadAction"; // URL de la acción con JsonResult
    var parametros = {
        filePath: filePath,
        nombre: nombre
    };

    $.ajax({
        url: url,
        method: 'GET',
        data: parametros,
        xhrFields: {
            responseType: 'arraybuffer' // Especifica que la respuesta será un arreglo de bytes
        },
        success: function (data) {
            // Crear un objeto Blob a partir del arreglo de bytes
            var blob = new Blob([data], { type: 'application/octet-stream' });

            // Crear un enlace temporal y simular un clic para descargar el archivo
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = nombre;
            link.click();

            // Liberar recursos
            window.URL.revokeObjectURL(link.href);
        },
        error: function (xhr, textStatus, errorThrown) {
            // Manejar el error de la solicitud AJAX
            console.log(xhr.responseText);
        }
    });
}

function convertSizeToReadable(sizeInBytes) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;
    while (sizeInBytes >= 1024 && index < units.length - 1) {
        sizeInBytes /= 1024;
        index++;
    }
    return `${sizeInBytes.toFixed(1)} ${units[index]}`;
}
