$(document).ready(function () {
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    $('#hdnIdUsuario').val(getUrlParameter('Id'));
    ListEstadoPresupuesto();
});
function ListEstadoPresupuesto() {
    var tabla = $("#dtProyecto").DataTable({
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
            url: "/MonitoreoObras/ListProyectos",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json"
        },
        dom: 'Bfrtip',
        buttons: [
             {
                 text: '<span class="fa fa-file-excel-o"></span> Excel',
                 className: 'btn btn-mat btn-success mr-1 mb-2',
                 extend: 'excelHtml5',
                 title: getNombreFile('rpt_Monitoreo_Obras_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_Monitoreo_Obras_')
             }
        ],
        columns: [
                    { "name": "N°", "title": "N°", "data": null, "autowidth": true },
                    { "name": "SNIP", "title": "SNIP", "data": "Snip", "autowidth": true },
                    { "name": "CUI", "title": "CUI", "data": "CUI", "autowidth": true },
                    { "name": "Departamento", "title": "Departamento", "data": "Departamento", "autowidth": true },
                    { "name": "Provincia", "title": "Provincia", "data": "Provincia", "autowidth": true },
                    { "name": "Distrito", "title": "Distrito", "data": "Distrito", "autowidth": true },
                    { "name": "Localidad", "title": "Localidad", "data": "Localidad", "autowidth": true },
                    { "name": "", "title": "Modalidad", "data": "Modalidad", "autowidth": true },
                    { "name": "", "title": "Tipo <br/>Proyecto", "data": "TipoProyecto", "autowidth": true },
                     { "name": "", "title": "% Avance Fisico", "data": "PorcentajeAvanceFisico", "autowidth": true },
                      { "name": "", "title": "Estado", "data": "Estados", "autowidth": true },
                      { "name": "", "title": "Sub-Estado", "data": "SubEstado", "autowidth": true },
                      { "name": "", "title": "Sub-Estado2", "data": "Subestado2", "autowidth": true },
                      { "name": "", "title": "Observación", "data": "DetalleSituacional", "autowidth": true },
                    { "name": "", "title": "Monitoreo", "data": null, "autowidth": true }
        ],
        columnDefs: [
            {
                "targets": 10,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Estados + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 11,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.SubEstado + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 12,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Subestado2 + "</div>";//full.NombreCurso; 
                }
            },
             {
                 "targets": 13,
                 "data": null,
                 "className": "align-middle text-center",
                 "mRender": function (data, type, full) {
                     return "<div class='text-wrap width-200'>" + full.DetalleSituacional + "</div>";//full.NombreCurso; 
                 }
             },
            {
                "targets": 14,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return '<div onclick="AbrirMonitoreo(' + full.IdProyecto + ')" style="cursor: pointer;"><img src="../Content/Images/pendienterendicion.png" style="width:60px"/></div>';
                }
            },
            //{
            //    "targets": 8,
            //    "data": null,
            //    "className": "align-middle text-center",
            //    "createdCell": function (td, cellData, rowData, row, col) {
            //        if (cellData == "") {
            //            $(td).addClass('danger-cell')
            //        }
            //    }
            //},
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
            var index = iDisplayIndex + 1;
            $('td:eq(0)', nRow).html(index);
            return nRow;
        },
        fnDrawCallback: function () {
            $("#dtProyecto thead tr").css({ 'height': "0" });
        },
        initComplete: function (settings, json) {
            $("#dtProyecto thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
    });
}

function AbrirMonitoreo(Id) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    $.get("/MonitoreoObras/ListMonitoreoId?Id=" + Id, function (data, status) {
        $("#hdnIdProyecto").val(data.IdProyecto);
        $("#NombreProyecto").html(data.NombreObra);
        $("#Fecha").html(data.FechaActualizacion);
        $("#Usuario").html(data.Usuario);
        $("#txtPoblacion").val(data.PoblacionSNIP);
        $("#ddlTipoProyecto").val(data.TipoProyecto);
        $("#hdnModalidad").val(data.Modalidad);
        $("#ddlTipoEmpresa").val(data.TipoEmpresa);
        $("#txtConsorcioContrastista").val(data.ConsorcioContratista);
        $("#txtMontoContratado").val(data.MontoContratado);
        $("#txtFechaInicioObra").val(data.FechaInicioObraString);
        $("#txtPlazoContractual").val(data.PlazoContractual);
        $("#txtAvanceObra").val(data.PorcentajeAvanceObra);
        $("#txtAvanceFinanciero").val(data.PorcentajeAvanceFinancieroReal);
        $("#ddlEstado").val(data.Estado);
        $("#ddlSubEstado").val(data.SubEstado);
        $("#ddlSubEstado2").val(data.SubEstado2);
        $("#txtDetalleSituacional").val(data.DetalleSituacional);
        $("#txtCNA").val(data.ConexionesNuevasAgua);
        $("#txtCRA").val(data.ConexionesRehabilitadasAgua);
        $("#txtCNU").val(data.ConexionesNuevasAlcantarillado);
        $("#txtCRU").val(data.ConexionesRehabilitadasAlcantarillado);
        $("#txtDevengado").val(data.DevengadoAcumulado);
        $("#txtAvanceObraProgramado").val(data.PorcentajeAvanceObraProgramado),
        $("#txtEstrategiaAccion").val(data.EstrategiaAccion),
        $.unblockUI();
    });
    $("#modal-proyectos").modal({ backdrop: 'static', keyboard: true, show: true });
}
function GuardarMonitoreo() {

    var monitoreo = {
        IdProyecto: $("#hdnIdProyecto").val(),
        PoblacionSNIP: $("#txtPoblacion").val(),
        TipoProyecto: $('#ddlTipoProyecto').val(),
        TipoEmpresa: $('#ddlTipoEmpresa').val(),
        ConsorcioContratista: $('#txtConsorcioContrastista').val(),
        MontoContratado: $("#txtMontoContratado").val(),
        FechaInicioObra: $("#txtFechaInicioObra").val(),
        PlazoContractual: $("#txtPlazoContractual").val(),
        PorcentajeAvanceObra: $("#txtAvanceObra").val(),
        PorcentajeAvanceFinancieroReal: $("#txtAvanceFinanciero").val(),
        Estado: $("#ddlEstado").val(),
        SubEstado: $("#ddlSubEstado").val(),
        SubEstado2: $("#ddlSubEstado2").val(),
        DetalleSituacional: $("#txtDetalleSituacional").val(),
        ConexionesNuevasAgua: $("#txtCNA").val(),
        ConexionesRehabilitadasAgua: $("#txtCRA").val(),
        ConexionesNuevasAlcantarillado: $("#txtCNU").val(),
        ConexionesRehabilitadasAlcantarillado: $("#txtCRU").val(),
        IdUsuario: $("#hdnIdUsuario").val(),
        DevengadoAcumulado: $("#txtDevengado").val(),
        Modalidad: $("#hdnModalidad").val(),
        PorcentajeAvanceObraProgramado: $("#txtAvanceObraProgramado").val(),
        EstrategiaAccion: $("#txtEstrategiaAccion").val(),
    }

    $.ajax({
        type: "POST",
        url: "/MonitoreoObras/GuardarMonitoreo",
        cache: false,
        data: JSON.stringify(monitoreo),
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
                                $('#dtProyecto').DataTable().ajax.reload();
                                $("#modal-proyectos").modal('hide');
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
function getNombreFile(nom) {
    var f = new Date();
    var title = nom + f.getDate() + "_" + (f.getMonth() + 1) + "_" + f.getFullYear() + "_" + f.getHours() + "_" + f.getMinutes();
    return title;
}