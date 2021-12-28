$(document).ready(function () {
    if (getUrlParameter('Id') != "") {
        ddlProyectos(getUrlParameter('Id'));
    };
    BloquearRegistro()
    $('#ddlProyecto').on('select2:select', function (e) {
        if ($('#tab1').hasClass("active")) {
            //MensajeAlerta('Seleccione el Rubro primero', 'ddlRubro');
            ListProyectoId();
            ListAutorizacion();
            //BloquearRegistro();
        } else {
            ListProyectoId();
            ListRendicion();
            //BloquearRegistro();
        }
    });
});

function BloquearRegistro() {
    let dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    let date = new Date();
    var dia = dias[date.getDay()];

    //if (dia != "Viernes") {
    if (dia == "Sabado" || dia == "Domingo") {
        $("#btnAgregarAutorizacion").addClass("d-none");
        $("#btnAgregarRendicion").addClass("d-none");
        $('[name="editar"]').addClass("d-none");
        $('[name="eliminar"]').addClass("d-none");
        $('[name="Alerta"]').removeClass("d-none");
    } else {
        $('[name="Alerta"]').addClass("d-none");
    }
    
}

function ddlProyectos(Id){
    $.get("/GestionAutorizacionRendicion/ListProyectos?Id=" + Id, function (data, status) {
        $('#ddlProyecto').select2({
            placeholder: "[Seleccione Proyecto]",
            allowClear: true,
            data: data
        });
        if ($('#tab1').hasClass("active")) {
            //MensajeAlerta('Seleccione el Rubro primero', 'ddlRubro');
            ListProyectoId();
            ListAutorizacion();
        } else {
            ListProyectoId();
            ListRendicion();
        }
    });
}

function Tab(id) {
    if (id == 0) {
        $("#panel1").addClass("active");
        $("#panel2").removeClass("active");
        ListAutorizacion();
    } else if (id == 1) {
        $("#panel1").removeClass("active");
        $("#panel2").addClass("active");
        ListRendicion();
    }
}

function ListProyectoId() {
    $.get("/GestionAutorizacionRendicion/ListProyectoId?Id=" + $("#ddlProyecto").val(), function (data, status) {
        $("#txtNombreProyecto").val(data.Nom_proyecto);
        $("#txtCostoInversion").val(formatMoney(data.Mto_proyecto));
        $("#txtTotalAutorizadoAprobado").val(formatMoney(data.TotalAutorizadoAprobado));
        $("#txtTotalAutorizadoGestionado").val(formatMoney(data.TotalAutorizadoGestionado));
        $("#txtTotalRendidoAprobado").val(formatMoney(data.TotalRendicionAprobado));
        $("#txtTotalRendidoGestionado").val(formatMoney(data.TotalRendicionGestionado));
    });
}

function ListAutorizacion() {
    var tabla = $("#dtAutorizacion").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        //scrollX: true,
        pageLength: 15,
        paging: false,
        info: false,
        ordering: true,
        paging: true,
        //order: [[0, "asc"]],
        ajax: {
            url: "/GestionAutorizacionRendicion/ListAutorizacion?Id=" + $("#ddlProyecto").val(),
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json"
        },
        columns: [
                    { "name": "", "title": "Nro. Autorización", "data": "Nro_autorizacion", "autowidth": true },
                    { "name": "", "title": "Fecha", "data": "StringFecha_autorizacion", "autowidth": true },
                    { "name": "", "title": "Concepto", "data": "Concepto", "autowidth": true },
                    { "name": "", "title": "Importe", "data": "Monto_autorizacion", "autowidth": true },
                    { "name": "", "title": "Estado", "data": "StringEstado_documento", "autowidth": true },
                    //{ "name": "", "title": "Documentos", "data": "Documento", "autowidth": true },
                    { "name": "", "title": "Acción", "data": "", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 3,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Monto_autorizacion);
                }
            },
            {
                "targets": 5,
                "data": null,
                "className": "text-center align-middle",
                "mRender": function (data, type, full) {
                    return '<button name="editar" class="btn btn-primary btn-outline-primary btn-icon" title="Editar" onclick="EditarAutorizacion(' + full.IdAutorizacion + ');" style="width: 25px; line-height: 25px;height: 25px;" ><i class="fa fa-edit" style="margin-right:0px"></i></button>&nbsp;<button name="eliminar" class="btn btn-danger btn-outline-danger btn-icon" title="Eliminar" onclick="ConfirmarEliminarAutorizacion(' + full.IdAutorizacion + ');" style="width: 25px; line-height: 25px;height: 25px;" ><i class="fa fa-trash-o" style="margin-right:0px"></i></button>';
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
        fnDrawCallback: function () {
            $("#dtAutorizacion thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
        initComplete: function (settings, json) {
            $("#dtAutorizacion thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
            BloquearRegistro();
        },
    });

}
function ListRendicion() {
    var tabla = $("#dtRendicion").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        //scrollX: true,
        pageLength: 15,
        paging: false,
        info: false,
        ordering: true,
        paging: true,
        //order: [[0, "asc"]],
        ajax: {
            url: "/GestionAutorizacionRendicion/ListRendicion?Id=" + $("#ddlProyecto").val(),
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json"
        },
        columns: [
                    { "name": "", "title": "Nro. Rendición", "data": "NRO_MANIFIESTO", "autowidth": true },
                    { "name": "", "title": "Fecha", "data": "String_Fecha_Manifiesto", "autowidth": true },
                    { "name": "", "title": "Pertenece Al", "data": "PerteneceAl", "autowidth": true },
                    { "name": "", "title": "Concepto", "data": "RUBRO", "autowidth": true },
                    { "name": "", "title": "Importe", "data": "MONTO_MANIFIESTO", "autowidth": true },
                    { "name": "", "title": "Estado", "data": "StringEstado_documento", "autowidth": true },
                    //{ "name": "", "title": "Documentos", "data": "Documento", "autowidth": true },
                    { "name": "", "title": "Acción", "data": "", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 4,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.MONTO_MANIFIESTO);
                }
            },
            {
                "targets": 6,
                "data": null,
                "className": "text-center align-middle",
                "mRender": function (data, type, full) {
                    return '<button name="editar" class="btn btn-primary btn-outline-primary btn-icon" title="Editar" onclick="EditarRendicion(' + full.IDMANIFIESTO + ');" style="width: 25px; line-height: 25px;height: 25px;" ><i class="fa fa-edit" style="margin-right:0px"></i></button>&nbsp;<button name="eliminar" class="btn btn-danger btn-outline-danger btn-icon" title="Eliminar" onclick="ConfirmarEliminarRendicion(' + full.IDMANIFIESTO + ');" style="width: 25px; line-height: 25px;height: 25px;" ><i class="fa fa-trash-o" style="margin-right:0px"></i></button>';
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
        fnDrawCallback: function () {
            $("#dtRendicion thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
        initComplete: function (settings, json) {
            $("#dtRendicion thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
            BloquearRegistro();
        },
    });

}

function popUpAgregarAutorizacion() {
    if ($("#ddlProyecto").val() == 0) {
        MensajeAlerta('Seleccione el Proyecto primero', 'ddlProyecto');
    }
    else
    {
        $("#modal-autorizacion").modal({ backdrop: 'static', keyboard: true, show: true });
    }
    
}
function popUpAgregarRendicion() {
    if ($("#ddlProyecto").val() == 0) {
        MensajeAlerta('Seleccione el Proyecto primero', 'ddlProyecto');
    }
    else {
        $("#modal-rendicion").modal({ backdrop: 'static', keyboard: true, show: true });
    }
}

function EditarAutorizacion(Id)
{
    $.get("/GestionAutorizacionRendicion/ListAutorizacionId?Id=" + Id, function (data, status) {

        $("#hdnIdAutorizacion").val(data.IdAutorizacion)
        $('#txtNroAutorizacion').val(data.Nro_autorizacion)
        $('#txtFechaAutorizacion').val(data.StringFecha_autorizacion)
        $('#txtConceptoAutorizacion').val(data.Concepto)
        $("#txtMontoAutorizacion").val(data.Monto_autorizacion)
        $("#cboEstadoAutorizacion").val(data.Estado_documento)
        $("#txtObservacionAutorizacion").val(data.Observacion)

        popUpAgregarAutorizacion();
    });

}
function EditarRendicion(Id) {
    $.get("/GestionAutorizacionRendicion/ListManifiestoId?Id=" + Id, function (data, status) {

        $("#hdnIdManifiesto").val(data.IDMANIFIESTO)
        $('#txtNroRendicion').val(data.NRO_MANIFIESTO),
        $('#txtFechaRendicion').val(data.String_Fecha_Manifiesto),
        $('#txtConceptoRendicion').val(data.RUBRO),
        $('#cboMes option:contains("' + data.CORRESPONDE_AL_MES + '")').attr('selected', true),
        $('#txtCorrespondeAlAnio').val(data.CORRESPONDE_AL_ANIO),
        $("#txtMontoRendicion").val(data.MONTO_MANIFIESTO),
        $("#cboEstadoRendicion").val(data.ESTADO_DOCUMENTO),
        $("#txtObservacionRendicion").val(data.OBSERVACION),

        popUpAgregarRendicion();
    });

}

function ValidarAutorizacion() {
    if ($('#txtNroAutorizacion').val() == "") {
        MensajeAlerta('Ingrese el Nro. Autorización', 'txtNroAutorizacion');
    }
    else if ($('#txtFechaAutorizacion').val() == "")
    {
        MensajeAlerta('Ingrese la Fecha de Autorización', 'txtFechaAutorizacion');
    }
    else if ($('#txtConceptoAutorizacion').val() == "") {
        MensajeAlerta('Ingrese el Concepto Autorización', 'txtConceptoAutorizacion');
    }
    else if ($('#txtMontoAutorizacion').val() == "") {
        MensajeAlerta('Ingrese el Monto de la Autorización', 'txtMontoAutorizacion');
    }
    else if ($('#txtMontoAutorizacion').val() == "") {
        MensajeAlerta('Ingrese el Monto de la Autorización', 'txtConceptoAutorizacion');
    }
    else {
        GuardarAutorizacion();
    }
}
function ValidarManifiesto() {
    if ($('#txtNroRendicion').val() == "") {
        MensajeAlerta('Ingrese el Nro. Rendición', 'txtNroRendicion');
    }
    else if ($('#txtConceptoRendicion').val() == "") {
        MensajeAlerta('Ingrese el Concepto Rendición', 'txtConceptoRendicion');
    }
    else if ($('#txtCorrespondeAlAnio').val() == "") {
        MensajeAlerta('Ingrese el Año de Rendición', 'txtCorrespondeAlAnio');
    }
    else if ($('#txtFechaRendicion').val() == "") {
        MensajeAlerta('Ingrese la Fecha de Rendición', 'txtFechaRendicion');
    }
    else if ($('#txtMontoRendicion').val() == "") {
        MensajeAlerta('Ingrese el Monto de la Rendición', 'txtMontoRendicion');
    }
    else {
        GuardarManifiesto();
    }
}

function LimpiarAutorizacion() {
    $("#hdnIdAutorizacion").val("")
    $('#txtNroAutorizacion').val("")
    $('#txtFechaAutorizacion').val("")
    $('#txtConceptoAutorizacion').val("")
    $("#txtMontoAutorizacion").val("")
    $("#txtObservacionAutorizacion").val("")
}
function LimpiarManifiesto() {
    $("#hdnIdManifiesto").val("")
    $('#txtNroRendicion').val("")
    $('#txtFechaRendicion').val("")
    $('#txtConceptoRendicion').val("")
    $('#cboMes').val(1)
    $('#txtCorrespondeAlAnio').val("")
    $("#txtMontoRendicion").val("")
    $("#txtObservacionRendicion").val("")
}


function GuardarAutorizacion() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    debugger;
    monto = $("#txtMontoAutorizacion").val();
    monto = monto.replaceAll(",", "");

    var autorizacion = {
        IdAutorizacion: $("#hdnIdAutorizacion").val(),
        IdProyecto: $("#ddlProyecto").val(),
        Nro_autorizacion: $('#txtNroAutorizacion').val(),
        Fecha_autorizacion: $('#txtFechaAutorizacion').val(),
        Concepto: $('#txtConceptoAutorizacion').val(),
        Monto_autorizacion: monto,
        Estado_documento: $("#cboEstadoAutorizacion").val(),
        Observacion: $("#txtObservacionAutorizacion").val(),
        IdUsuario: getUrlParameter('Id'),
    }

    $.ajax({
        type: "POST",
        url: "/GestionAutorizacionRendicion/GuardarAutorizacion",
        cache: false,
        data: JSON.stringify(autorizacion),
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
                                LimpiarAutorizacion();
                                ListAutorizacion();
                                ListProyectoId();
                                $("#modal-autorizacion").modal('hide');
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
function GuardarManifiesto() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    monto = $("#txtMontoRendicion").val();
    monto = monto.replaceAll(",", "");

    var manifiesto = {
        IDMANIFIESTO: $("#hdnIdManifiesto").val(),
        IDPROYECTO: $("#ddlProyecto").val(),
        NRO_MANIFIESTO: $('#txtNroRendicion').val(),
        FECHA_MANIFIESTO: $('#txtFechaRendicion').val(),
        RUBRO: $('#txtConceptoRendicion').val(),
        CORRESPONDE_AL_MES: $('#cboMes option:selected').text(),
        CORRESPONDE_AL_ANIO: $('#txtCorrespondeAlAnio').val(),
        MONTO_MANIFIESTO: monto,
        ESTADO_DOCUMENTO: $("#cboEstadoRendicion").val(),
        OBSERVACION: $("#txtObservacionRendicion").val(),
        IdUsuario: getUrlParameter('Id'),
    }

    $.ajax({
        type: "POST",
        url: "/GestionAutorizacionRendicion/GuardarManifiesto",
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
                                LimpiarManifiesto();
                                ListRendicion();
                                ListProyectoId();
                                $("#modal-rendicion").modal('hide');
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

function ConfirmarEliminarAutorizacion(Id) {
    $.confirm({
        title: 'Eliminar',
        content: '<div class="form-group">' +
                '<label> Esta seguro de eliminar la Autorización? </label>' +
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
                    EliminarAutorizacion(Id);
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
function EliminarAutorizacion(Id) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    var obj = { Id: Id, IdUsuario: getUrlParameter('Id') };
    $.ajax({
        type: "POST",
        url: "/GestionAutorizacionRendicion/EliminarAutorizacion",
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
                                ListAutorizacion();
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

function ConfirmarEliminarRendicion(Id) {
    $.confirm({
        title: 'Eliminar',
        content: '<div class="form-group">' +
                '<label> Esta seguro de eliminar la Rendición? </label>' +
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
                    EliminarRendicion(Id);
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
function EliminarRendicion(Id) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    var obj = { Id: Id, IdUsuario: getUrlParameter('Id') };
    $.ajax({
        type: "POST",
        url: "/GestionAutorizacionRendicion/EliminarManifiesto",
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
                                ListRendicion();
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

