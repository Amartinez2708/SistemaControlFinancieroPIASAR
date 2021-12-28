$(document).ready(function () {
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    $('#hdnTipo').val(getUrlParameter('Tipo'));

    if ($('#hdnTipo').val() == 1) {
        $('#divLiquidadores').addClass("d-none");
        $('#divAlerta').removeClass("d-none");

        ListProyectosAg30();
        ListProyectosMg30();
        ListProyectosAg3090();
        ListProyectosMg3090();
        ListProyectosAg90();
        ListProyectosMg90();
    }
    else if ($('#hdnTipo').val() == 2) {
        $('#hdnFecha').val(getUrlParameter('FechaIni'));
        $('#hdnFecha2').val(getUrlParameter('FechaFin'));
        $('#divLiquidadores').removeClass("d-none");
        $('#divAlerta').addClass("d-none");

        ListLiquidadores();
    }

    
});

function ListProyectosAg30() {
    var tabla = $("#dtAg30").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        info: true,
        ordering: false,
        paging: true,
        pageLength: 15,
        //order: [[4, "desc"]],
        ajax: {
            url: "/AlertaRegistro/ListProyectosAg30",
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
                    { "name": "", "title": "N°", "data": null, "autowidth": true },
                    { "name": "", "title": "CUI", "data": "CUI", "autowidth": true },
                    { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                    { "name": "", "title": "Provincia", "data": "Provincia", "autowidth": true },
                    { "name": "", "title": "Distrito", "data": "Distrito", "autowidth": true },
                    { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                    { "name": "", "title": "Nro", "data": "Nro", "autowidth": true },
                    { "name": "", "title": "Fecha", "data": "Fecha", "autowidth": true },
                    { "name": "", "title": "Monto", "data": "Monto", "autowidth": true },
                    { "name": "", "title": "Liquidador", "data": "Liquidador", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 8,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Monto);
                }
            },
            {
                "targets": "_all",
                "className": "align-middle text-center",
            }
        ],
        language: {
            "decimal": ".",
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

function ListProyectosMg30() {
    var tabla = $("#dtMg30").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        info: true,
        ordering: false,
        paging: true,
        pageLength: 15,
        //order: [[4, "desc"]],
        ajax: {
            url: "/AlertaRegistro/ListProyectosMg30",
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
                    { "name": "", "title": "N°", "data": null, "autowidth": true },
                    { "name": "", "title": "CUI", "data": "CUI", "autowidth": true },
                    { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                    { "name": "", "title": "Provincia", "data": "Provincia", "autowidth": true },
                    { "name": "", "title": "Distrito", "data": "Distrito", "autowidth": true },
                    { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                    { "name": "", "title": "Nro", "data": "Nro", "autowidth": true },
                    { "name": "", "title": "Fecha", "data": "Fecha", "autowidth": true },
                    { "name": "", "title": "Monto", "data": "Monto", "autowidth": true },
                    { "name": "", "title": "Liquidador", "data": "Liquidador", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 8,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Monto);
                }
            },
            {
                "targets": "_all",
                "className": "align-middle text-center",
            }
        ],
        language: {
            "decimal": ".",
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
            $("#dtMg30 thead tr").css({ 'height': "0" });
        },
        initComplete: function (settings, json) {
            $("#dtMg30 thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
    });
}

function ListProyectosAg3090() {
    var tabla = $("#dtAg3090").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        info: true,
        ordering: false,
        paging: true,
        pageLength: 15,
        //order: [[4, "desc"]],
        ajax: {
            url: "/AlertaRegistro/ListProyectosAg3090",
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
                    { "name": "", "title": "N°", "data": null, "autowidth": true },
                    { "name": "", "title": "CUI", "data": "CUI", "autowidth": true },
                    { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                    { "name": "", "title": "Provincia", "data": "Provincia", "autowidth": true },
                    { "name": "", "title": "Distrito", "data": "Distrito", "autowidth": true },
                    { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                    { "name": "", "title": "Nro", "data": "Nro", "autowidth": true },
                    { "name": "", "title": "Fecha", "data": "Fecha", "autowidth": true },
                    { "name": "", "title": "Monto", "data": "Monto", "autowidth": true },
                    { "name": "", "title": "Liquidador", "data": "Liquidador", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 8,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Monto);
                }
            },
            {
                "targets": "_all",
                "className": "align-middle text-center",
            }
        ],
        language: {
            "decimal": ".",
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

function ListProyectosMg3090() {
    var tabla = $("#dtMg3090").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        info: true,
        ordering: false,
        paging: true,
        pageLength: 15,
        //order: [[4, "desc"]],
        ajax: {
            url: "/AlertaRegistro/ListProyectosMg3090",
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
                    { "name": "", "title": "N°", "data": null, "autowidth": true },
                    { "name": "", "title": "CUI", "data": "CUI", "autowidth": true },
                    { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                    { "name": "", "title": "Provincia", "data": "Provincia", "autowidth": true },
                    { "name": "", "title": "Distrito", "data": "Distrito", "autowidth": true },
                    { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                    { "name": "", "title": "Nro", "data": "Nro", "autowidth": true },
                    { "name": "", "title": "Fecha", "data": "Fecha", "autowidth": true },
                    { "name": "", "title": "Monto", "data": "Monto", "autowidth": true },
                    { "name": "", "title": "Liquidador", "data": "Liquidador", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 8,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Monto);
                }
            },
            {
                "targets": "_all",
                "className": "align-middle text-center",
            }
        ],
        language: {
            "decimal": ".",
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
            $("#dtMg30 thead tr").css({ 'height': "0" });
        },
        initComplete: function (settings, json) {
            $("#dtMg30 thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
    });
}

function ListProyectosAg90() {
    var tabla = $("#dtAg90").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        info: true,
        ordering: false,
        paging: true,
        pageLength: 15,
        //order: [[4, "desc"]],
        ajax: {
            url: "/AlertaRegistro/ListProyectosAg90",
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
                    { "name": "", "title": "N°", "data": null, "autowidth": true },
                    { "name": "", "title": "CUI", "data": "CUI", "autowidth": true },
                    { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                    { "name": "", "title": "Provincia", "data": "Provincia", "autowidth": true },
                    { "name": "", "title": "Distrito", "data": "Distrito", "autowidth": true },
                    { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                    { "name": "", "title": "Nro", "data": "Nro", "autowidth": true },
                    { "name": "", "title": "Fecha", "data": "Fecha", "autowidth": true },
                    { "name": "", "title": "Monto", "data": "Monto", "autowidth": true },
                    { "name": "", "title": "Liquidador", "data": "Liquidador", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 8,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Monto);
                }
            },
            {
                "targets": "_all",
                "className": "align-middle text-center",
            }
        ],
        language: {
            "decimal": ".",
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

function ListProyectosMg90() {
    var tabla = $("#dtMg90").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        info: true,
        ordering: false,
        paging: true,
        pageLength: 15,
        //order: [[4, "desc"]],
        ajax: {
            url: "/AlertaRegistro/ListProyectosMg90",
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
                    { "name": "", "title": "N°", "data": null, "autowidth": true },
                    { "name": "", "title": "CUI", "data": "CUI", "autowidth": true },
                    { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                    { "name": "", "title": "Provincia", "data": "Provincia", "autowidth": true },
                    { "name": "", "title": "Distrito", "data": "Distrito", "autowidth": true },
                    { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                    { "name": "", "title": "Nro", "data": "Nro", "autowidth": true },
                    { "name": "", "title": "Fecha", "data": "Fecha", "autowidth": true },
                    { "name": "", "title": "Monto", "data": "Monto", "autowidth": true },
                    { "name": "", "title": "Liquidador", "data": "Liquidador", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 8,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Monto);
                }
            },
            {
                "targets": "_all",
                "className": "align-middle text-center",
            }
        ],
        language: {
            "decimal": ".",
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
            $("#dtMg30 thead tr").css({ 'height': "0" });
        },
        initComplete: function (settings, json) {
            $("#dtMg30 thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
    });
}

function ListLiquidadores() {
    var tabla = $("#dtLiquidadores").DataTable({
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
        pageLength: 15,
        //order: [[4, "desc"]],
        ajax: {
            url: "/AlertaRegistro/ListLiquidadores?FechaIni=" + $('#hdnFecha').val() + "&FechaFin=" + $('#hdnFecha2').val(),
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
                 title: getNombreFile('rpt_Reporte_Registro_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_Reporte_Registro_')
             }
        ],
        columns: [
                    { "name": "", "title": "N°", "data": null, "autowidth": true },
                    { "name": "", "title": "CUI", "data": "CUI", "autowidth": true },
                    { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                    { "name": "", "title": "Provincia", "data": "Provincia", "autowidth": true },
                    { "name": "", "title": "Distrito", "data": "Distrito", "autowidth": true },
                    { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                    { "name": "", "title": "Tipo Solicitud", "data": "TipoSolicitud", "autowidth": true },
                    { "name": "", "title": "Nro", "data": "Nro", "autowidth": true },
                    { "name": "", "title": "Fecha", "data": "Fecha", "autowidth": true },
                    { "name": "", "title": "Monto", "data": "Monto", "autowidth": true },
                    { "name": "", "title": "Liquidador", "data": "Liquidador", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 9,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Monto);
                }
            },
            {
                "targets": "_all",
                "className": "align-middle text-center",
            }
        ],
        language: {
            "decimal": ".",
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


function getNombreFile(nom) {
    var f = new Date();
    var title = nom + f.getDate() + "_" + (f.getMonth() + 1) + "_" + f.getFullYear() + "_" + f.getHours() + "_" + f.getMinutes();
    return title;
}