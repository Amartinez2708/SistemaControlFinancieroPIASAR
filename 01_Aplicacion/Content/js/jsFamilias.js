$(document).ready(function () {
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    ListProyectosFamilias();
});
function ListProyectosFamilias() {
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
            url: "/Familias/ListProyectosFamilias",
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
                    return '<div onclick="AbrirSeguimiento(' + full.CUI + ')" style="cursor: pointer;"><img src="../Content/Images/lista-de-verificacion.png" style="width:40px"/></div>';
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
            //var index = iDisplayIndex + 1;
            //$('td:eq(0)', nRow).html(index);
            //return nRow;
            var api = this.api();
            var startIndex = api.context[0]._iDisplayStart;
            var counter = startIndex + iDisplayIndex + 1;
            $('td:eq(0)', nRow).html(counter);
            return nRow;
        },
        fnDrawCallback: function (settings) {
            //$("#dtProyecto thead tr").css({ 'height': "0" });
            //var api = this.api();
            //var startIndex = api.context[0]._iDisplayStart;
            //api.column(0, { order: 'applied', search: 'applied' }).nodes().each(function (cell, i) {
            //    debugger;
            //        cell.innerHTML = startIndex + i + 1;
            //});
        },
        fnCreatedRow: function (row, data, index) {
            //$('td', row).eq(0).html(index + 1);
        },
        initComplete: function (settings, json) {
            //$("#dtProyecto thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
    });
}

function AbrirSeguimiento(cui) {
    $("#modal-seguimiento").modal({ backdrop: 'static', keyboard: true, show: true });
}