$(document).ready(function () {
    chkProyectos();
    $('#campoBusqueda').on('input', function () {
        var valorBuscado = $(this).val().trim().toLowerCase(); // Valor buscado en minúsculas
        $('#chklProyectos li').each(function () {

            var valorElemento = $(this).text().trim().toLowerCase();
            if (valorBuscado != "") {
                if (valorElemento.indexOf(valorBuscado) !== -1) {
                    $(this).removeClass('hidden');
                } else {
                    $(this).addClass('hidden');
                }
            } else {
                $(this).removeClass('hidden');
            }
        });
    });

    $("#ddlPersonal").change(function () {
        ListarProyectosAsignados()
    });

});

function chkProyectos() {
    $.get("/AsignacionProyectos/chkProyectos", function (data, status) {
        for (var i = 0; i < data.length; i++) {
            $("#chklProyectos").append('<li><input class="border-checkbox" type="checkbox" id="checkbox' + i + '" value="' + data[i].id + '" onclick="AsignarProyecto(this,'+ data[i].id +')"><label class="border-checkbox-label" for="checkbox' + i + '">' + data[i].text + '</label></li>');
        }
    });
}

function ListarProyectosAsignados() {
    $.get("/AsignacionProyectos/ListarProyectosAsignados?Id=" + $("#ddlPersonal").val(), function (data, status) {
        
        /*LISTAR LOS PROYECTOS Y POR CADA CHECK RECORRER EL LISTADO DE LAS ASIGNACIONES */
        var valoresBuscados = [];

        for (var i = 0; i < data.length; i++) {
            valoresBuscados.push(data[i].IdProyecto);
        }
        
        $('#chklProyectos li').each(function () {
            debugger;
            var valorElemento = parseInt($(this).find('input[type="checkbox"]').val());

            if (valoresBuscados.includes(valorElemento)) {
                $(this).find('input[type="checkbox"]').prop('checked', true);
            } else {
                $(this).find('input[type="checkbox"]').prop('checked', false);
            }

        });

    });
}

function AsignarProyecto(e,Id) {
    if ($("#ddlPersonal").val() == 0) {
        if ($(e).is(':checked')) { $(e).prop('checked', false); }

        MensajeAlerta('Seleccione al Personal', 'ddlPersonal');
    } else {

        $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

        var val = 0;

        if ($(e).is(':checked')) { val = 1; }

        var obj = { IdPersona: $("#ddlPersonal").val(), IdProyecto: Id, Check: val };

        $.ajax({
            type: "POST",
            url: "/AsignacionProyectos/GuardarAsignacion",
            cache: false,
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            traditional: true,
            success: function (result) {
                $.unblockUI();
                if (result.TipoRespuesta == 1) {

                    $.confirm({
                        title: 'Guardar',
                        icon: 'fa fa-check',
                        content: result.Mensaje,
                        type: 'green',
                        buttons: {
                            close: {
                                text: 'Aceptar',
                                btnClass: 'btn-green',
                                keys: ['enter']
                            }
                        }
                    });

                }
                else if (result.TipoRespuesta == 2) {
                    $.confirm({
                        title: 'Guardar',
                        icon: 'fa fa-check',
                        content: result.Mensaje,
                        type: 'green',
                        buttons: {
                            close: {
                                text: 'Aceptar',
                                btnClass: 'btn-green',
                                keys: ['enter']
                            }
                        }
                    });
                }
                else if (result.TipoRespuesta == 3) {
                    $.confirm({
                        title: 'Guardar',
                        icon: 'fa fa-frown-o',
                        content: result.Mensaje,
                        type: 'orange',
                        buttons: {
                            close: {
                                text: 'Aceptar',
                                btnClass: 'btn-orange',
                                keys: ['enter']
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
                    icon: 'fa fa-frown-o',
                    content: XMLHttpRequest + textStatus + errorThrown,
                    type: 'red',
                    buttons: {
                        close: {
                            text: 'Aceptar',
                            btnClass: 'btn-red',
                            keys: ['enter']
                        }
                    }
                });
            }
        });
    }
}

function removerChecks() {
    $('#chklProyectos input[type="checkbox"]').prop('checked', false);
}
function seleccionarChecks() {
    $('#chklProyectos input[type="checkbox"]').prop('checked', true);
}