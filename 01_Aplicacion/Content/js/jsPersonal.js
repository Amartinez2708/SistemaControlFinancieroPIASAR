$(document).ready(function () {
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    ListPersonal();
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
                    { "name": "Estado", "title": "Estado", "data": null, "autowidth": true },
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
                    return '<div onclick="EliminarPersonal(\'' + full.IdPersona + '\')" style="cursor: pointer;"><img src="../Content/Images/negado.png" style="width:40px"/></div>';
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

function AgregarPersonal() {
    $("#lblPersonal").html("Agregar Nuevo Personal");
    $("#hdnIdPersonal").val("");
    $("#modal-personal").modal({ backdrop: 'static', keyboard: true, show: true });
}
function CerrarPersonal() {
    //LimpiarFormulario();
    $('#modal-personal').modal('toggle');
}

