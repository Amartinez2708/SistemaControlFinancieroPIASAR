$(document).ready(function () {
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    ListPersonal();
    $("#ddlDepartamento").change(function () {
        ddlProvincia();
    });
    $("#ddlProvincia").change(function () {
        ddlDistrito()
    });
    $("#ddlTipoContrato").change(function () {
        ListCorrelativoContrato()
    });
    $("#ddlDepartamentoFamiliar").change(function () {
        ddlProvinciaFamiliar();
    });
    $("#ddlProvinciaFamiliar").change(function () {
        ddlDistritoFamiliar()
    });
});

function ListPersonal() {
    var tabla = $("#dtPersonal").DataTable({
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
            url: "/Personal/ListPersonal",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json"
        },
        columns: [
                    { "name": "N°", "title": "N°", "data": null, "autowidth": true },
                    { "name": "Dcto. Identidad", "title": "Dcto. Identidad", "data": "TipoNroDcto", "autowidth": true },
                    { "name": "Personal", "title": "Personal", "data": "Personal", "autowidth": true },
                    { "name": "Fecha Fin Consultoria", "title": "Fecha Fin <br/>Consultoria", "data": "FechaFinConsultoria", "autowidth": true, "className": "align-middle text-center" },
                    { "name": "Estado", "title": "Estado", "data": "EstadoConsultoria", "autowidth": true },
                    { "name": "", "title": "Familiares", "data": null, "autowidth": true },
                    { "name": "", "title": "Contrato", "data": null, "autowidth": true },
                    { "name": "", "title": "Ficha<br/>Personal", "data": null, "autowidth": true },
                    { "name": "", "title": "Editar", "data": null, "autowidth": true },
                    { "name": "", "title": "Eliminar", "data": null, "autowidth": true }
        ],
        columnDefs: [
            {
                "targets": 4,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {

                    if (full.EstadoConsultoria == "Vigente") {
                        return '<label class="badge badge-md bg-success">Vigente</label>';
                    }
                    else {
                        return '<label class="badge badge-md bg-danger">' + full.EstadoConsultoria + '</label>';
                    }


                }
            },
            {
                "targets": 5,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="AbrirFamiliar(\'' + full.IdPersona + '\',\'' + full.Personal + '\')" style="cursor: pointer;"><img src="../Content/Images/arbol-de-familia.png" style="width:40px"/></div>';
                    //}
                }
            },
            {
                "targets": 6,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="AbrirContrato(\'' + full.IdPersona + '\',\'' + full.Personal + '\')" style="cursor: pointer;"><img src="../Content/Images/pages.png" style="width:40px"/></div>';
                    //}
                }
            },
            {
                "targets": 7,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="FichaPersonal(\'' + full.IdPersona + '\')" style="cursor: pointer;"><img src="../Content/Images/fichapersonal.png" style="width:40px"/></div>';
                    //}
                }
            },
            {
                "targets": 8,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="EditarPersonal(\'' + full.IdPersona + '\')" style="cursor: pointer;"><img src="../Content/Images/curriculum.png" style="width:40px"/></div>';
                    //}
                }
            },
            {
                "targets": 9,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="ConfirmarEliminarPersonal(\'' + full.IdPersona + '\')" style="cursor: pointer;"><img src="../Content/Images/negado.png" style="width:40px"/></div>';
                    //}
                }
            },
            {
                "targets": "_all",
                "className": "align-middle",
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

function ddlProvincia() {
    $.get("/Personal/ddlProvincia?Id=" + $("#ddlDepartamento").val(), function (data, status) {
        $("#ddlProvincia").empty();
        if (data.length > 0) {
            $.each(data, function (i, data) {
                $("#ddlProvincia").append('<option value="'
                + data.Value + '">'
                + data.Text + '</option>');
            });
        } else {
            $("#ddlProvincia").append('<option value="00">[--Seleccione--]</option>');
        }
    });
    return false;
}

function ddlDistrito() {
    $.get("/Personal/ddlDistrito?Id=" + $("#ddlDepartamento").val() + $("#ddlProvincia").val(), function (data, status) {
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

function ddlProvinciaFamiliar() {
    $.get("/Personal/ddlProvincia?Id=" + $("#ddlDepartamentoFamiliar").val(), function (data, status) {
        $("#ddlProvinciaFamiliar").empty();
        if (data.length > 0) {
            $.each(data, function (i, data) {
                $("#ddlProvinciaFamiliar").append('<option value="'
                + data.Value + '">'
                + data.Text + '</option>');
            });
        } else {
            $("#ddlProvinciaFamiliar").append('<option value="00">[--Seleccione--]</option>');
        }
    });
    return false;
}

function ddlDistritoFamiliar() {
    $.get("/Personal/ddlDistrito?Id=" + $("#ddlDepartamentoFamiliar").val() + $("#ddlProvinciaFamiliar").val(), function (data, status) {
        $("#ddlDistritoFamiliar").empty();
        if (data.length > 0) {
            $.each(data, function (i, data) {
                $("#ddlDistritoFamiliar").append('<option value="'
                + data.Value + '">'
                + data.Text + '</option>');
            });
        } else {
            $("#ddlDistritoFamiliar").append('<option value="00">[--Seleccione--]</option>');
        }
    });
    return false;
}

function AgregarPersonal() {
    $("#lblPersonal").html("Agregar Nuevo Personal");
    $("#hdnIdPersonal").val("");
    $("#modal-personal").modal({ backdrop: 'static', keyboard: true, show: true });
}

function CerrarPersonal() {
    LimpiarFormulario();
    $('#modal-personal').modal('toggle');
}

function GuardarPersonal() {

    if ($("#ddlTipoDcto").val() == 0) {
        MensajeAlerta('Seleccione el Tipo de Documento', 'ddlTipoDcto');
    }
    else if ($("#txtNroDocumento").val() == "") {
        MensajeAlerta('Ingrese el Nro. de Documento', 'txtNroDocumento');
    }
    else if ($("#txtApellidoPaterno").val() == "") {
        MensajeAlerta('Ingrese el Apellido Paterno', 'txtApellidoPaterno');
    }
    else if ($("#txtApellidoMaterno").val() == "") {
        MensajeAlerta('Ingrese el Apellido Materno', 'txtApellidoMaterno');
    }
    else if ($("#txtNombres").val() == "") {
        MensajeAlerta('Ingrese los Nombres', 'txtNombres');
    }
    else if ($("#ddlSexo").val() == 0) {
        MensajeAlerta('Seleccione el Sexo', 'ddlSexo');
    }
    else if ($("#ddlCargo").val() == 0) {
        MensajeAlerta('Seleccione el Cargo', 'ddlCargo');
    }
    else if ($("#txtEmail1").val() == "") {
        MensajeAlerta('Ingrese el Email Principal', 'txtEmail1');
    }
    else if ($("#txtCelular1").val() == "") {
        MensajeAlerta('Ingrese el Celular Principal', 'txtCelular1');
    }
    else {
        $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

        var detalle = {
            IdPersona: $("#hdnIdPersonal").val(),
            TipoDocumento: $("#ddlTipoDcto").val(),
            NroDocumento: $('#txtNroDocumento').val(),
            ApePaterno: $('#txtApellidoPaterno').val(),
            ApeMaterno: $('#txtApellidoMaterno').val(),
            Nombres: $('#txtNombres').val(),
            Sexo: $("#ddlSexo").val(),
            TipoSangre: $("#ddlTipoSangre").val(),
            FechaNacimiento: $("#txtFechaNacimiento").val(),
            EstadoCivil: $("#ddlEstadoCivil").val(),
            UbigeoDireccion: $("#ddlDepartamento").val() + $("#ddlProvincia").val() + $("#ddlDistrito").val(),
            Direccion: $("#txtDireccion").val(),
            Referencia: $("#txtReferencia").val(),
            IdCargo: $("#ddlCargo").val(),
            IdNivelProfesional: $("#ddlNivelProfesional").val(),
            IdProfesion: $("#ddlProfesion").val(),
            Email1: $("#txtEmail1").val(),
            Email2: $("#txtEmail2").val(),
            Celular1: $("#txtCelular1").val(),
            Celular2: $("#txtCelular2").val()
        }
        $.ajax({
            type: "POST",
            url: "/Personal/GuardarPersonal",
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
                                    LimpiarFormulario();
                                    $('#dtPersonal').DataTable().ajax.reload();
                                    $('#modal-personal').modal('hide');
                                    
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

function LimpiarFormulario() {
    $("#hdnIdPersonal").val("")
    $("#ddlTipoDcto").val(0)
    $('#txtNroDocumento').val("")
    $('#txtApellidoPaterno').val("")
    $('#txtApellidoMaterno').val("")
    $('#txtNombres').val("")
    $("#ddlSexo").val("")
    $("#ddlTipoSangre").val("")
    $("#txtFechaNacimiento").val("")
    $("#ddlEstadoCivil").val(0)
    $("#ddlDepartamento").val("00")
    $("#ddlDepartamento").change();
    $("#ddlProvincia").val("00");
    $("#ddlProvincia").change();
    $("#ddlDistrito").val("00")
    $("#txtDirección").val("00")
    $("#txtReferencia").val("")
    $("#ddlCargo").val(0)
    $("#ddlNivelProfesional").val(0)
    $("#ddlProfesion").val(0)
    $("#txtEmail1").val("")
    $("#txtEmail2").val("")
    $("#txtCelular1").val("")
    $("#txtCelular2").val("")
}

function EditarPersonal(Id) {

    $.get("/Personal/ListPersonalId?Id=" + Id, function (data, status) {
        $("#hdnIdPersonal").val(data.IdPersona)
        $("#ddlTipoDcto").val(data.TipoDocumento)
        $('#txtNroDocumento').val(data.NroDocumento)
        $('#txtApellidoPaterno').val(data.ApePaterno)
        $('#txtApellidoMaterno').val(data.ApeMaterno)
        $('#txtNombres').val(data.Nombres)
        $("#ddlSexo").val(data.Sexo)
        $("#ddlTipoSangre").val(data.TipoSangre)
        $("#txtFechaNacimiento").val(data.FechaNacimientoString)
        $("#ddlEstadoCivil").val(data.EstadoCivil);
        $("#ddlDepartamento").val(data.UbigeoDireccion.substring(0, 2))
        $.get("/Personal/ddlProvincia?Id=" + $("#ddlDepartamento").val(), function (data2, status) {
            $("#ddlProvincia").empty();
            if (data2.length > 0) {
                $.each(data2, function (i, data2) {
                    if (data2.Value == data.UbigeoDireccion.substring(2, 4)) {
                        $("#ddlProvincia").append('<option value="'
                    + data2.Value + '" selected>'
                    + data2.Text + '</option>');
                    } else {
                        $("#ddlProvincia").append('<option value="'
                    + data2.Value + '">'
                    + data2.Text + '</option>');
                    }
                });
            } else {
                $("#ddlProvincia").append('<option value="00">[--Seleccione--]</option>');
            }
        });

        $.get("/Personal/ddlDistrito?Id=" + data.UbigeoDireccion.substring(0, 4), function (data1, status) {
            $("#ddlDistrito").empty();
            if (data1.length > 0) {
                $.each(data1, function (i, data1) {
                    if (data1.Value == data.UbigeoDireccion.substring(4, 6)) {
                        $("#ddlDistrito").append('<option value="'
                    + data1.Value + '" selected>'
                    + data1.Text + '</option>');
                    } else {
                        $("#ddlDistrito").append('<option value="'
                    + data1.Value + '">'
                    + data1.Text + '</option>');
                    }
                });
            } else {
                $("#ddlDistrito").append('<option value="00">[--Seleccione--]</option>');
            }
        });

        $("#txtDireccion").val(data.Direccion)
        $("#txtReferencia").val(data.Referencia)
        $("#ddlCargo").val(data.IdCargo)
        $("#ddlNivelProfesional").val(data.IdNivelProfesional)
        $("#ddlProfesion").val(data.IdProfesion)
        $("#txtEmail1").val(data.Email1)
        $("#txtEmail2").val(data.Email2)
        $("#txtCelular1").val(data.Celular1)
        $("#txtCelular2").val(data.Celular2)

        $("#lblPersonal").html("Editar: " + data.Personal);
        $("#modal-personal").modal({ backdrop: 'static', keyboard: true, show: true });
    });
}

function ConfirmarEliminarPersonal(Id) {
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
                    EliminarPersonal(Id);
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

function EliminarPersonal(Id) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    var obj = { Id: Id };

    $.ajax({
        type: "POST",
        url: "/Personal/EliminarPersonal",
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
                                $('#dtPersonal').DataTable().ajax.reload();
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

/*-------------------------------------------------------------------------CONTRATO--------------------------------------------------------------------------------------*/

function AbrirContrato(Id, persona) {
    $("#lblPersonalContrato").html("Contratos: " + persona);
    $("#hdnIdPersonal").val(Id);
    ListPersonalContrato();
    $("#modal-personal-contrato").modal({ backdrop: 'static', keyboard: true, show: true });
}

function ListPersonalContrato() {
    var tabla = $("#dtContrato").DataTable({
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
            url: "/Personal/ListPersonalContrato?Id=" + $("#hdnIdPersonal").val(),
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json"
        },
        columns: [
                    { "name": "N°", "title": "N°", "data": null, "autowidth": true },
                    { "name": "Nro. de<br/>Contrato", "title": "Nro. Contrato", "data": "NroContrato", "autowidth": true },
                    { "name": "Tipo de Contrato", "title": "Tipo de<br/>Contrato", "data": "TipoContrato", "autowidth": true },
                    { "name": "Cargo", "title": "Cargo", "data": "Cargo", "autowidth": true },
                    { "name": "Oficina de Dependencia", "title": "Oficina de <br/>Dependencia", "data": "OficinaDependencia", "autowidth": true },
                    { "name": "Fecha Inicio", "title": "Fecha<br/>Inicio", "data": "FechaInicioString", "autowidth": true },
                    { "name": "Fecha Fin", "title": "Fecha<br/>Fin", "data": "FechaFinString", "autowidth": true },
                    { "name": "Estado", "title": "Estado", "data": "Estado", "autowidth": true },
                    { "name": "", "title": "Adendas", "data": null, "autowidth": true },
                    //{ "name": "", "title": "Finalizar<br/>Contrato", "data": null, "autowidth": true },
                    { "name": "", "title": "Imprimir<br/>Contrato", "data": null, "autowidth": true },
                    { "name": "", "title": "Editar", "data": null, "autowidth": true },
                    { "name": "", "title": "Eliminar", "data": null, "autowidth": true }
        ],
        columnDefs: [
            {
                "targets": 2,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.TipoContrato + "</div>";
                }
            },
            {
                "targets": 3,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Cargo + "</div>";
                }
            },
            {
                "targets": 4,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.OficinaDependencia + "</div>";
                }
            },
            {
                "targets": 7,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {

                    if (full.Estado == "Vigente")
                    {
                        return '<label class="badge badge-md bg-success">Vigente</label>';
                    }
                    else
                    {
                        return '<label class="badge badge-md bg-danger">' + full.Estado + '</label>';
                    }

                    
                }
            },
            {
                "targets": 8,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="AbrirAdenda(\'' + full.IdContrato + '\',\'' + full.NroContrato + '\')" style="cursor: pointer;"><img src="../Content/Images/convenio.png" style="width:40px"/></div>';
                    //}
                }
            },
            //{
            //    "targets": 9,
            //    "data": null,
            //    "className": "align-middle text-center",
            //    "mRender": function (data, type, full) {
            //        //if (full.FechaActualizacion == "Sin Seguimiento") {
            //        return '<div onclick="AbrirFinalizarContrato(\'' + full.IdContrato + '\',\'' + full.NroContrato + '\')" style="cursor: pointer;"><img src="../Content/Images/contrato cerrado.png" style="width:40px"/></div>';
            //        //}
            //    }
            //},
            {
                "targets": 9,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="ImprimirContrato(\'' + full.IdContrato + '\')" style="cursor: pointer;"><img src="../Content/Images/impresora.png" style="width:40px"/></div>';
                    //}
                }
            },
            {
                "targets": 10,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="EditarContrato(\'' + full.IdContrato + '\')" style="cursor: pointer;"><img src="../Content/Images/pages.png" style="width:40px"/></div>';
                    //}
                }
            },
            {
                "targets": 11,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="ConfirmarEliminarContrato(\'' + full.IdContrato + '\')" style="cursor: pointer;"><img src="../Content/Images/rechazado.png" style="width:40px"/></div>';
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

function CerrarPersonalContrato() {
    $("#hdnIdPersonal").val("");
    $('#modal-personal-contrato').modal('toggle');
}

function AgregarContrato() {
    ListDatosPersonal();
    $("#lblPersonalContratoAgregar").html("Agregar Nuevo Contrato");
    $("#modal-personal-contrato-agregar").modal({ backdrop: 'static', keyboard: true, show: true });
}

function CerrarContrato() {
    LimpiarContrato();
    $('#modal-personal-contrato-agregar').modal('toggle');
}

function LimpiarContrato() {
    $("#hdnIdContrato").val("");
    $("#txtDireccionContrato").val("");
    $('#txtNroContrato').val("");
    $('#ddlTipoContrato').val(0);
    $('#ddlCargoContrato').val(0);
    $("#ddlOficinaDependencia").val(0);
    $("#txtEjecucionTrabajoSupervision").val("");
    $("#txtFechaInicio").val("");
    $("#txtFechaFin").val("");
    $("#ddlLugarPrestacionServicios").val(0);
    $("#txtMontoContrato").val("");
    $("#txtFormaPago").val("");
    $("#ddlRepresentanteLegal").val(0);
}

function ListDatosPersonal() {
    $.get("/Personal/ListPersonalId?Id=" + $("#hdnIdPersonal").val(), function (data, status) {
        $("#txtPersonalContrato").val(data.Personal);
        $("#txtDireccionContrato").val(data.DireccionContrato);
    });
}

function ListCorrelativoContrato() {
    $.get("/Personal/ListCorrelativo?Tipo=Contrato&SubTipo=" + $("#ddlTipoContrato option:selected").text(), function (data, status) {
        $("#txtNroContrato").val(data.ValorDevolucion);
    });
}

function GuardarContrato() {
    if ($("#ddlTipoContrato").val() == 0) {
        MensajeAlerta('Seleccione el Tipo de Contrato', 'ddlTipoContrato');
    }
    else if ($("#txtNroContrato").val() == "") {
        MensajeAlerta('Ingrese el Nro. de Contrato', 'txtNroContrato');
    }
    else if ($("#ddlCargoContrato").val() == 0) {
        MensajeAlerta('Seleccione el Cargo', 'ddlCargoContrato');
    }
    else if ($("#ddlOficinaDependencia").val() == 0) {
        MensajeAlerta('Seleccione la Oficina de Dependencia', 'ddlOficinaDependencia');
    }
    else if ($("#txtEjecucionTrabajoSupervision").val() == "") {
        MensajeAlerta('Ingrese la Ejecución del Trabajo y Supervisión del Contrato', 'txtEjecucionTrabajoSupervision');
    }
    else if ($("#txtFechaInicio").val() == "") {
        MensajeAlerta('Ingrese Fecha de Inicio', 'txtFechaInicio');
    }
    else if ($("#txtFechaFin").val() == "") {
        MensajeAlerta('Ingrese Fecha de Fin', 'txtFechaFin');
    }
    else if ($("#ddlLugarPrestacionServicios").val() == 0) {
        MensajeAlerta('Seleccione el Lugar de Prestación de Servicios', 'ddlLugarPrestacionServicios');
    }
    else if ($("#txtMontoContrato").val() == "") {
        MensajeAlerta('Ingrese el Monto del Contrato', 'txtMontoContrato');
    }
    else if ($("#txtFormaPago").val() == "") {
        MensajeAlerta('Ingrese la Forma de Pago', 'txtFormaPago');
    }
    else if ($("#ddlRepresentanteLegal").val() == "") {
        MensajeAlerta('Seleccione el Representante Legal', 'ddlRepresentanteLegal');
    }
    else {
        $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

        var detalle = {
            IdContrato: $("#hdnIdContrato").val(),
            IdPersona: $("#hdnIdPersonal").val(),
            DireccionContrato: $("#txtDireccionContrato").val(),
            NroContrato: $('#txtNroContrato').val(),
            IdTipoContrato: $('#ddlTipoContrato').val(),
            IdCargo: $('#ddlCargoContrato').val(),
            IdOficinaDependencia: $("#ddlOficinaDependencia").val(),
            EjecucionTrabajoSupervision: $("#txtEjecucionTrabajoSupervision").val(),
            FechaInicio: $("#txtFechaInicio").val(),
            FechaFin: $("#txtFechaFin").val(),
            IdLugarPrestacionServicios: $("#ddlLugarPrestacionServicios").val(),
            MontoContrato: $("#txtMontoContrato").val(),
            FormaPago: $("#txtFormaPago").val(),
            IdRepresentanteLegal: $("#ddlRepresentanteLegal").val()
        }
        $.ajax({
            type: "POST",
            url: "/Personal/GuardarContrato",
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
                                    LimpiarContrato();
                                    $('#dtContrato').DataTable().ajax.reload();
                                    $('#modal-personal-contrato-agregar').modal('hide');

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

function EditarContrato(Id) {
    $.get("/Personal/ListContratoId?Id=" + Id, function (data, status) {
        $("#hdnIdContrato").val(data.IdContrato);
        $("#hdnIdPersonal").val(data.IdPersona)
        $("#txtPersonalContrato").val(data.Persona);
        $("#txtDireccionContrato").val(data.DireccionContrato);
        $("#ddlTipoContrato").val(data.IdTipoContrato);
        $("#txtNroContrato").val(data.NroContrato);
        $("#ddlCargoContrato").val(data.IdCargo);
        $("#ddlOficinaDependencia").val(data.IdOficinaDependencia);
        $("#txtEjecucionTrabajoSupervision").val(data.EjecucionTrabajoSupervision);
        $("#txtFechaInicio").val(data.FechaInicioString);
        $("#txtFechaFin").val(data.FechaFinString);
        $("#ddlLugarPrestacionServicios").val(data.IdLugarPrestacionServicios);
        $("#txtMontoContrato").val(data.MontoContrato);
        $("#txtFormaPago").val(data.FormaPago);
        $("#ddlRepresentanteLegal").val(data.IdRepresentanteLegal);

        $("#lblPersonalContratoAgregar").html("Editar Contrato " + data.ValorDevolucion);
        $("#modal-personal-contrato-agregar").modal({ backdrop: 'static', keyboard: true, show: true });
    });
}

function ConfirmarEliminarContrato(Id) {
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
                    EliminarContrato(Id);
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

function EliminarContrato(Id)
{
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    var obj = { Id: Id };

    $.ajax({
        type: "POST",
        url: "/Personal/EliminarContrato",
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
                                $('#dtContrato').DataTable().ajax.reload();
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

function ImprimirContrato(Id) {
    window.location.href = '/Personal/GenerarImprimirContrato?Id=' + Id;
}

/*-------------------------------------------------------------------------FAMILIAR--------------------------------------------------------------------------------------*/

function AbrirFamiliar(Id, persona) {
    $("#lblPersonalFamilia").html("Familiares: " + persona);
    $("#hdnIdPersonal").val(Id);
    ListPersonalFamiliar();
    $("#modal-personal-familia").modal({ backdrop: 'static', keyboard: true, show: true });
}

function ListPersonalFamiliar() {
    var tabla = $("#dtFamilia").DataTable({
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
            url: "/Personal/ListPersonalFamilia?Id=" + $("#hdnIdPersonal").val(),
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json"
        },
        columns: [
                    { "name": "N°", "title": "N°", "data": null, "autowidth": true },
                    { "name": "Tipo de Familiar", "title": "Tipo de<br/>Contrato", "data": "TipoFamiliar", "autowidth": true },
                    { "name": "Persona", "title": "Persona", "data": "Personal", "autowidth": true },
                    { "name": "Emergencia", "title": "Contacto de<br/>Emergencia", "data": "Emergencia", "autowidth": true },
                    { "name": "", "title": "Editar", "data": null, "autowidth": true },
                    { "name": "", "title": "Eliminar", "data": null, "autowidth": true }
        ],
        columnDefs: [
            {
                "targets": 3,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.Emergencia == true)
                    {
                        return 'SI';
                    } else {
                        return 'NO';
                    }
                }
            },
            {
                "targets": 4,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="EditarFamiliar(\'' + full.IdPersonaFamilia + '\')" style="cursor: pointer;"><img src="../Content/Images/editar-usuario.png" style="width:40px"/></div>';
                    //}
                }
            },
            {
                "targets": 5,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="ConfirmarEliminarFamiliar(\'' + full.IdPersonaFamilia + '\')" style="cursor: pointer;"><img src="../Content/Images/eliminar-usuario.png" style="width:40px"/></div>';
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

function CerrarFamilia() {
    $("#hdnIdPersonal").val("");
    $('#modal-personal-familia').modal('toggle');
}

function AgregarFamilia() {
    $("#lblPersonalFamiliaAgregar").html("Agregar Nuevo Familiar");
    $("#modal-personal-familia-agregar").modal({ backdrop: 'static', keyboard: true, show: true });
}

function CerrarPersonalFamiliaAgregar() {
    LimpiarFamiliar();
    $('#modal-personal-familia-agregar').modal('toggle');
}

function LimpiarFamiliar() {
    $("#hdnIdPersonalFamilia").val("");
    $("#ddlTipoFamiliar").val(0);
    $('#ddlTipoDctoFamiliar').val(0);
    $('#txtNroDocumentoFamiliar').val("");
    $('#txtApellidoPaternoFamiliar').val("");
    $("#txtApellidoMaternoFamiliar").val("");
    $("#txtNombresFamiliar").val("");
    $("#ddlSexoFamiliar").val("");
    $("#ddlTipoSangreFamiliar").val("");
    $("#txtFechaNacimientoFamiliar").val("");
    $("#ddlDepartamentoFamiliar").val("00");
    $("#ddlDepartamentoFamiliar").change();
    $("#ddlProvinciaFamiliar").val("00");
    $("#ddlProvinciaFamiliar").change();
    $("#ddlDistritoFamiliar").val("00");
    $("#txtDireccionFamiliar").val("");
    $("#txtReferenciaFamiliar").val("");
    $("#txtCelular1Familiar").val("");
    $("#txtCelular2Familiar").val("");
}

function GuardarFamiliar() {
    if ($("#ddlTipoFamiliar").val() == 0) {
        MensajeAlerta('Seleccione el Tipo de Familiar', 'ddlTipoFamiliar');
    }
    else if ($("#ddlTipoDctoFamiliar").val() == 0) {
        MensajeAlerta('Seleccione el Tipo de Documento', 'ddlTipoDctoFamiliar');
    }
    else if ($("#txtNroDocumentoFamiliar").val() == 0) {
        MensajeAlerta('Ingrese el Nro. de Contrato', 'txtNroDocumentoFamiliar');
    }
    else if ($("#txtApellidoPaternoFamiliar").val() == 0) {
        MensajeAlerta('Ingrese el Apellido Paterno', 'txtApellidoPaternoFamiliar');
    }
    else if ($("#txtApellidoMaternoFamiliar").val() == 0) {
        MensajeAlerta('Ingrese el Apellido Materno', 'txtApellidoMaternoFamiliar');
    }
    else if ($("#txtNombresFamiliar").val() == "") {
        MensajeAlerta('Ingrese los Nombres', 'txtNombresFamiliar');
    }
    else if ($("#ddlSexoFamiliar").val() == "") {
        MensajeAlerta('Ingrese el Sexo', 'ddlSexoFamiliar');
    }
    else if ($("#txtCelular1Familiar").val() == "") {
        MensajeAlerta('Ingrese EL Nro. de Celular', 'txtCelular1Familiar');
    }
    else {
        $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

        var val = 0;

        if ($("#chkContactoEmergencia").is(':checked')) { val = 1; }

        var detalle = {
            IdPersonaFamilia: $("#hdnIdPersonalFamilia").val(),
            IdPersona: $("#hdnIdPersonal").val(),
            IdTipoFamiliar: $("#ddlTipoFamiliar").val(),
            TipoDocumento: $('#ddlTipoDctoFamiliar').val(),
            NroDocumento: $('#txtNroDocumentoFamiliar').val(),
            ApePaterno: $('#txtApellidoPaternoFamiliar').val(),
            ApeMaterno: $("#txtApellidoMaternoFamiliar").val(),
            Nombres: $("#txtNombresFamiliar").val(),
            Sexo: $("#ddlSexoFamiliar").val(),
            TipoSangre: $("#ddlTipoSangreFamiliar").val(),
            FechaNacimiento: $("#txtFechaNacimientoFamiliar").val(),
            UbigeoDireccion: $("#ddlDepartamentoFamiliar").val() + $("#ddlProvinciaFamiliar").val() + $("#ddlDistritoFamiliar").val(),
            Direccion: $("#txtDireccionFamiliar").val(),
            Referencia: $("#txtReferenciaFamiliar").val(),
            Celular1: $("#txtCelular1Familiar").val(),
            Celular2: $("#txtCelular2Familiar").val(),
            Emergencia: val
        }
        $.ajax({
            type: "POST",
            url: "/Personal/GuardarFamiliar",
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
                                    LimpiarFamiliar();
                                    $('#dtFamilia').DataTable().ajax.reload();
                                    $('#modal-personal-familia-agregar').modal('hide');

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

function EditarFamiliar(Id) {

    $.get("/Personal/ListFamiliarId?Id=" + Id, function (data, status) {
        $("#hdnIdPersonal").val(data.IdPersona);
        $("#hdnIdPersonalFamilia").val(data.IdPersonaFamilia);
        $("#ddlTipoFamiliar").val(data.IdTipoFamiliar);
        $("#ddlTipoDctoFamiliar").val(data.TipoDocumento);
        $('#txtNroDocumentoFamiliar').val(data.NroDocumento);
        $('#txtApellidoPaternoFamiliar').val(data.ApePaterno);
        $('#txtApellidoMaternoFamiliar').val(data.ApeMaterno);
        $('#txtNombresFamiliar').val(data.Nombres);
        $("#ddlSexoFamiliar").val(data.Sexo);
        $("#ddlTipoSangreFamiliar").val(data.TipoSangre);
        $("#txtFechaNacimientoFamiliar").val(data.FechaNacimientoString);
        $("#ddlDepartamentoFamiliar").val(data.UbigeoDireccion.substring(0, 2));
        $.get("/Personal/ddlProvincia?Id=" + $("#ddlDepartamentoFamiliar").val(), function (data2, status) {
            $("#ddlProvinciaFamiliar").empty();
            if (data2.length > 0) {
                $.each(data2, function (i, data2) {
                    if (data2.Value == data.UbigeoDireccion.substring(2, 4)) {
                        $("#ddlProvinciaFamiliar").append('<option value="'
                    + data2.Value + '" selected>'
                    + data2.Text + '</option>');
                    } else {
                        $("#ddlProvinciaFamiliar").append('<option value="'
                    + data2.Value + '">'
                    + data2.Text + '</option>');
                    }
                });
            } else {
                $("#ddlProvinciaFamiliar").append('<option value="00">[--Seleccione--]</option>');
            }
        });

        $.get("/Personal/ddlDistrito?Id=" + data.UbigeoDireccion.substring(0, 4), function (data1, status) {
            $("#ddlDistritoFamiliar").empty();
            if (data1.length > 0) {
                $.each(data1, function (i, data1) {
                    if (data1.Value == data.UbigeoDireccion.substring(4, 6)) {
                        $("#ddlDistritoFamiliar").append('<option value="'
                    + data1.Value + '" selected>'
                    + data1.Text + '</option>');
                    } else {
                        $("#ddlDistritoFamiliar").append('<option value="'
                    + data1.Value + '">'
                    + data1.Text + '</option>');
                    }
                });
            } else {
                $("#ddlDistritoFamiliar").append('<option value="00">[--Seleccione--]</option>');
            }
        });

        $("#txtDireccionFamiliar").val(data.Direccion);
        $("#txtReferenciaFamiliar").val(data.Referencia);
        $("#txtCelular1Familiar").val(data.Celular1);
        $("#txtCelular2Familiar").val(data.Celular2);

        if (data.Emergencia==1) {
            $("#chkContactoEmergencia").prop('checked', true);
        } else {
            $("#chkContactoEmergencia").prop('checked', false);
        }


        $("#lblPersonalFamiliaAgregar").html("Editar Familiar: " + data.Personal);
        $("#modal-personal-familia-agregar").modal({ backdrop: 'static', keyboard: true, show: true });
    });
}

function ConfirmarEliminarFamiliar(Id) {
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
                    EliminarFamiliar(Id);
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

function EliminarFamiliar(Id) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    var obj = { Id: Id };

    $.ajax({
        type: "POST",
        url: "/Personal/EliminarFamiliar",
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
                                $('#dtFamilia').DataTable().ajax.reload();
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
