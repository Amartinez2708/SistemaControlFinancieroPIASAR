$(document).ready(function () {
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    ListPersonal();
    $("#ddlDepartamento").change(function () {
        ddlProvincia();
    });
    $("#ddlProvincia").change(function () {
        ddlDistrito()
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
                    { "name": "Fecha Fin Consultoria", "title": "Fecha Fin <br/>Consultoria", "data": "EstadoConsultoria", "autowidth": true },
                    { "name": "Estado", "title": "Estado", "data": "EstadoConsultoria", "autowidth": true },
                    { "name": "", "title": "Familiares", "data": null, "autowidth": true },
                    { "name": "", "title": "Consultoria", "data": null, "autowidth": true },
                    { "name": "", "title": "Editar", "data": null, "autowidth": true },
                    { "name": "", "title": "Eliminar", "data": null, "autowidth": true }
        ],
        columnDefs: [

            {
                "targets": 5,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="AbrirFamiliar(\'' + full.IdPersona + '\')" style="cursor: pointer;"><img src="../Content/Images/arbol-de-familia.png" style="width:40px"/></div>';
                    //}
                }
            },
            {
                "targets": 6,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="AbrirConsultoria(\'' + full.IdPersona + '\')" style="cursor: pointer;"><img src="../Content/Images/pages.png" style="width:40px"/></div>';
                    //}
                }
            },
            {
                "targets": 7,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    //if (full.FechaActualizacion == "Sin Seguimiento") {
                    return '<div onclick="EditarPersonal(\'' + full.IdPersona + '\')" style="cursor: pointer;"><img src="../Content/Images/curriculum.png" style="width:40px"/></div>';
                    //}
                }
            },
            {
                "targets": 8,
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

    if ($("ddlTipoDcto").val() == "") {
        MensajeAlerta('Seleccione el Tipo de Documento', 'ddlTipoDcto');
    }
    else if ($("txtNroDocumento").val() == "") {
        MensajeAlerta('Ingrese el Nro. de Documento', 'txtNroDocumento');
    }
    else if ($("txtApellidoPaterno").val() == "") {
        MensajeAlerta('Ingrese el Apellido Paterno', 'txtApellidoPaterno');
    }
    else if ($("txtApellidoMaterno").val() == "") {
        MensajeAlerta('Ingrese el Apellido Materno', 'txtApellidoMaterno');
    }
    else if ($("txtNombres").val() == "") {
        MensajeAlerta('Ingrese los Nombres', 'txtNombres');
    }
    else if ($("ddlSexo").val() == "") {
        MensajeAlerta('Seleccione el Sexo', 'ddlSexo');
    }
    else if ($("ddlCargo").val() == "") {
        MensajeAlerta('Seleccione el Cargo', 'ddlCargo');
    }
    else if ($("txtEmail1").val() == "") {
        MensajeAlerta('Ingrese el Email Principal', 'txtEmail1');
    }
    else if ($("txtCelular1").val() == "") {
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
