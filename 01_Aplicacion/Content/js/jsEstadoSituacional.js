

$(document).ready(function () {
    Indicadores();
    Nucleos();
    Contrata();
});

function Indicadores() {
    $.get("/EstadoSituacional/Indicadores", function (data, status) {
        $("#NroActosPrevios").html(data.NroActosPrevios);
        $("#NroConcluido").html(data.NroConcluido);
        $("#NroEjecucion").html(data.NroEjecucion);
        $("#nroContrataConcluidoO").html(data.nroContrataConcluidoO);
        $("#nroNucleoConcluidoO").html(data.nroNucleoConcluidoO);

        $("#nroContrataElaboracionET").html(data.nroContrataElaboracionET);
        $("#nroNucleoElaboracionET").html(data.nroNucleoElaboracionET);
        $("#nroContrataActosPreviosET").html(data.nroContrataActosPreviosET);
        $("#nroNucleoActosPreviosET").html(data.nroNucleoActosPreviosET);
        $("#nroContrataIniciarO").html(data.nroContrataIniciarO);
        $("#nroNucleoIniciarO").html(data.nroNucleoIniciarO);
        $("#nroContrataEjecucionO").html(data.nroContrataEjecucionO);
        $("#nroNucleoEjecucionO").html(data.nroNucleoEjecucionO);

        $("#NroActosPreviosET").html(data.NroActosPreviosET);
        $("#NroConcluidosET").html(data.NroConcluidoET);
        $("#NroElaboracionET").html(data.NroElaboracionET);
        $("#nroContrataConcluidoET").html(data.nroContrataConcluidoET);
        $("#nroNucleoConcluidoET").html(data.nroNucleoConcluidoET);

        $("#NroConcluidoReemplazo").html(data.NroConcluidoReemplazo);
        $("#nroContrataConcluidoReemplazo").html(data.nroContrataConcluidoReemplazo);
        $("#nroNucleoConcluidoReemplazo").html(data.nroNucleoConcluidoReemplazo);
        $("#NroEnProcesoReemplazo").html(data.NroEnProcesoReemplazo);
        $("#nroContrataEnProcesoReemplazo").html(data.nroContrataEnProcesoReemplazo);
        $("#nroNucleoEnProcesoReemplazo").html(data.nroNucleoEnProcesoReemplazo);
        $("#NroPorConvocarO").html(data.NroPorConvocarO);
        $("#nroContrataPorConvocarO").html(data.nroContrataPorConvocarO);
        $("#nroNucleoPorConvocarO").html(data.nroNucleoPorConvocarO);

        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartCulminadas", am4charts.XYChart);

            // Increase contrast by taking evey second color
            chart.colors.step = 2;
            // Add data
            chart.data = [{
                "country": "Por Recepcionar",
                "litres": data.NroPorRecepcionar,
                "fill": "#4099ff"
            }, {
                "country": "Recepcionada",
                "litres": data.NroRecepcionada,
                "fill": "#dedede"
            }, {
                "country": "Recepción Observada",
                "litres": data.NroRecepcionObservada,
                "fill": "#dedede"
            }, {
                "country": "OTA por Iniciar",
                "litres": data.NroOtaPorIniciar,
                "fill": "#dedede"
            }, {
                "country": "OTA en Ejecución",
                "litres": data.NroOtaEjecucion,
                "fill": "#dedede"
            }, {
                "country": "OTA Concluida",
                "litres": data.NroOtaConcluida,
                "fill": "#dedede"
            }
            , {
                "country": "En Liquidación",
                "litres": data.NroEnLiquidacion,
                "fill": "#dedede"
            }, {
                "country": "Liquidada con R.D.",
                "litres": data.NroOtaLiquidada,
                "fill": "#dedede"
            }
            ];

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "country";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 50;

            categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
                if (target.dataItem && target.dataItem.index & 2 == 2) {
                    return dy + 25;
                }
                return dy;
            });

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.fontWeight = 800;
            valueAxis.renderer.minWidth = 50;
            valueAxis.title.text = "Nro. de Obras";

            function CallDetalle(ev) {
                VerProyectosConcluidos(ev.target.dataItem.dataContext.country)
            }

            chart.colors.list = [
              am4core.color("#FFB64D"),
              am4core.color("#FF5370"),
              am4core.color("#4099ff"),
              am4core.color("#2ed8b6"),
              am4core.color("#f44336"),
              am4core.color("#673ab7"),
              am4core.color("#ffeb3b"),
              am4core.color("#8bc34a"),
            ];

            var series = chart.series.push(new am4charts.ColumnSeries())
            series.dataFields.valueY = 'litres'
            series.dataFields.categoryX = 'country'
            series.tooltipText = "Nro. {categoryX}: [bold]{valueY}[/]";
            series.columns.template.strokeWidth = 0;
            
            series.columns.template.column.cornerRadiusTopLeft = 10;
            series.columns.template.column.cornerRadiusTopRight = 10;
            series.columns.template.column.fillOpacity = 0.8;
            series.columns.template.events.on("hit", CallDetalle, this);

            var hoverState = series.columns.template.column.states.create("hover");
            hoverState.properties.cornerRadiusTopLeft = 0;
            hoverState.properties.cornerRadiusTopRight = 0;
            hoverState.properties.fillOpacity = 1;
            
            series.columns.template.adapter.add("fill", function (fill, target) {
                return chart.colors.getIndex(target.dataItem.index);
            });

            chart.cursor = new am4charts.XYCursor();


        }); // end am4core.ready()

        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartRecepcion", am4charts.XYChart);

            // Increase contrast by taking evey second color
            chart.colors.step = 2;
            // Add data
            chart.data = [{
                "country": "En Proceso de Liquidación de Convenio",
                "litres": data.nroEnProcesoLiquidacionConvenio,
                "fill": "#4099ff"
            }, {
                "country": "Convenio Liquidado",
                "litres": data.nroConvenioLiquidado,
                "fill": "#dedede"
            }];

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "country";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 50;

            //categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
            //    if (target.dataItem && target.dataItem.index & 2 == 2) {
            //        return dy + 25;
            //    }
            //    return dy;
            //});

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.fontWeight = 800;
            valueAxis.renderer.minWidth = 50;
            valueAxis.title.text = "Nro. de Obras";

            //function CallDetalle(ev) {
            //    VerProyectosConcluidos(ev.target.dataItem.dataContext.country)
            //}

            chart.colors.list = [
              am4core.color("#FFB64D"),
              am4core.color("#FF5370"),
              am4core.color("#4099ff"),
              am4core.color("#2ed8b6"),
              am4core.color("#f44336"),
              am4core.color("#673ab7"),
              am4core.color("#ffeb3b"),
              am4core.color("#8bc34a"),
            ];

            var series = chart.series.push(new am4charts.ColumnSeries())
            series.dataFields.valueY = 'litres'
            series.dataFields.categoryX = 'country'
            series.tooltipText = "Nro. {categoryX}: [bold]{valueY}[/]";
            series.columns.template.strokeWidth = 0;

            series.columns.template.column.cornerRadiusTopLeft = 10;
            series.columns.template.column.cornerRadiusTopRight = 10;
            series.columns.template.column.fillOpacity = 0.8;
            //series.columns.template.events.on("hit", CallDetalle, this);

            var hoverState = series.columns.template.column.states.create("hover");
            hoverState.properties.cornerRadiusTopLeft = 0;
            hoverState.properties.cornerRadiusTopRight = 0;
            hoverState.properties.fillOpacity = 1;

            series.columns.template.adapter.add("fill", function (fill, target) {
                return chart.colors.getIndex(target.dataItem.index);
            });

            chart.cursor = new am4charts.XYCursor();


        });
    });
}

function Nucleos() {
    var tabla = $("#dtNucleo").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        scrollX: true,
        paging: false,
        info: true,
        ordering: false,
        paging: true,
        pageLength: 5,
        //order: [[4, "desc"]],
        ajax: {
            url: "/EstadoSituacional/ListProyectosNucleo",
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
                 title: getNombreFile('rpt_Seguimiento_Proyectos_PIASAR_NE_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_Seguimiento_Proyectos_PIASAR_NE_')
             }
        ],
        columns: [
                   { "name": "", "title": "N°", "data": null, "autowidth": true },
                   { "name": "", "title": "Codigo </br>Unico", "data": "CUI", "autowidth": true },
                   { "name": "", "title": "Proyecto", "data": "Nom_proyecto", "autowidth": true },
                   { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                   { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                   { "name": "", "title": "Devengado </br>Acumulado S/.", "data": "DevengadoAcumulado", "autowidth": true },
                   { "name": "", "title": "Avance </br>Fisico %", "data": "PorcentajeAvanceFisico", "autowidth": true },
                   { "name": "", "title": "Comentario", "data": "Comentarios", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 2,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Nom_proyecto + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 3,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Localidad + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 5,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.DevengadoAcumulado);
                }
            },
            {
                "targets": 7,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Comentarios + "</div>";//full.NombreCurso; 
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
        fnDrawCallback: function () {
            $("#dtNucleo thead tr").css({ 'height': "0" });
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var index = iDisplayIndex + 1;
            $('td:eq(0)', nRow).html(index);
            return nRow;
        },
        initComplete: function (settings, json) {
            $("#dtNucleo thead tr").css({ 'height': "0" });

            //$('#dtEstadoFinanciero tr:last').addClass("f-w-600")
            //$('#dtEstadoFinanciero tr:last td:eq(5)').addClass("d-none")
        },
    });
}

function Contrata() {
    var tabla = $("#dtContrata").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        scrollX: true,
        paging: false,
        info: true,
        ordering: false,
        paging: true,
        pageLength: 5,
        //order: [[4, "desc"]],
        ajax: {
            url: "/EstadoSituacional/ListProyectosContrata",
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
                 title: getNombreFile('rpt_Seguimiento_Proyectos_PIASAR_CONTRATA_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_Seguimiento_Proyectos_PIASAR_CONTRATA_')
             }
        ],
        columns: [
                   { "name": "", "title": "N°", "data": null, "autowidth": true },
                   { "name": "", "title": "Codigo </br>Unico", "data": "CUI", "autowidth": true },
                   { "name": "", "title": "Proyecto", "data": "Nom_proyecto", "autowidth": true },
                   { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                   { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                   { "name": "", "title": "Devengado </br>Acumulado S/.", "data": "DevengadoAcumulado", "autowidth": true },
                   { "name": "", "title": "Avance </br>Fisico %", "data": "PorcentajeAvanceFisico", "autowidth": true },
                   { "name": "", "title": "Comentario", "data": "Comentarios", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 2,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Nom_proyecto + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 3,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Localidad + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 5,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.DevengadoAcumulado);
                }
            },
            {
                "targets": 7,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Comentarios + "</div>";//full.NombreCurso; 
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
        fnDrawCallback: function () {
            $("#dtContrata thead tr").css({ 'height': "0" });
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var index = iDisplayIndex + 1;
            $('td:eq(0)', nRow).html(index);
            return nRow;
        },
        initComplete: function (settings, json) {
            $("#dtContrata thead tr").css({ 'height': "0" });

            //$('#dtEstadoFinanciero tr:last').addClass("f-w-600")
            //$('#dtEstadoFinanciero tr:last td:eq(5)').addClass("d-none")
        },
    });
}

function VerProyectos(tipo, estado) {
    $("#modal-estadoinformacionproyecto").modal({ backdrop: 'static', keyboard: true, show: true });
    $($.fn.dataTable.tables(true)).DataTable()
         .columns.adjust();

    var tabla = $("#dtEstadoInfo").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        scrollX: true,
        paging: false,
        info: true,
        ordering: true,
        paging: true,
        pageLength: 10,
        order: [],
        ajax: {
            url: "/EstadoSituacional/ListProyectos?Tipo="+tipo+"&Estado="+estado,
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
                 title: getNombreFile('rpt_Proyectos_PIASAR_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_Proyectos_PIASAR_')
             }
        ],
        columns: [
                  { "name": "", "title": "N°", "data": null, "autowidth": true },
                  { "name": "", "title": "Codigo </br>Unico", "data": "CUI", "autowidth": true },

                  { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                  { "name": "", "title": "Provincia", "data": "Provincia", "autowidth": true },
                  { "name": "", "title": "Distrito", "data": "Distrito", "autowidth": true },
                  { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                  { "name": "", "title": "Modalidad", "data": "Modalidad", "autowidth": true },
                  { "name": "", "title": "% Avance </br>Fisico ", "data": "PorcentajeAvanceFisico", "autowidth": true },
                  { "name": "", "title": "% Avance </br>Fisico </br>Programado", "data": "PorcentajeAvanceObraProgramado", "autowidth": true },
                  { "name": "", "title": "Estrategias </br>y Acciones </br>(Metas a Corto,</br>Mediano </br>y Largo plazo)", "data": "EstrategiaAccion", "autowidth": true },
                  { "name": "", "title": "Estado", "data": "Estados", "autowidth": true },
                  { "name": "", "title": "Sub-Estado", "data": "SubEstado", "autowidth": true },
                  { "name": "", "title": "Limitante", "data": "Subestado2", "autowidth": true },
                  { "name": "", "title": "Comentario", "data": "Comentarios", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 9,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    debugger;
                    return full.EstrategiaAccion == null ? "" : "<div class='text-wrap width-200'>" + full.EstrategiaAccion + "</div>";
                }
            },
            {
                "targets": 10,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Estados + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 11,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.SubEstado + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 12,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Subestado2 + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 13,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Comentarios + "</div>";//full.NombreCurso; 
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
        fnDrawCallback: function () {
            $("#dtEstadoInfo thead tr").css({ 'height': "0" });
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var index = iDisplayIndex + 1;
            $('td:eq(0)', nRow).html(index);
            return nRow;
        },
        initComplete: function (settings, json) {
            var nucleos = 0;
            var contrata = 0;
            $("#dtEstadoInfo thead tr").css({ 'height': "0" });
            var table = $("#dtEstadoInfo").DataTable();
            table.rows().data().each(function (value) {
                debugger;


                if (value.Modalidad == "NÚCLEO EJECUTOR") {
                    nucleos = nucleos + 1;

                } else if (value.Modalidad == "CONTRATA") {
                    contrata = contrata + 1;
                }
                $("#spnNroContrata").html(contrata);
                $("#spnNroNucleo").html(nucleos);
            });
            //$('#dtEstadoFinanciero tr:last').addClass("f-w-600")
            //$('#dtEstadoFinanciero tr:last td:eq(5)').addClass("d-none")
        },
    });
}

function VerProyectosConcluidos(concluido) {
    $("#modal-estadoinformacionproyecto").modal({ backdrop: 'static', keyboard: true, show: true });
    $($.fn.dataTable.tables(true)).DataTable()
         .columns.adjust();

    var tipo = 0;
    var estado = 0;
    var subestado = 0;

    if (concluido == "Por Recepcionar") {
        tipo = 2;
        estado = 2;
        subestado = 12;
    }
    else if (concluido == "Recepcionada") {
        tipo = 2;
        estado = 2;
        subestado = 15;
    }
    else if (concluido == "Recepción Observada") {
        tipo = 2;
        estado = 2;
        subestado = 14;
    }
    else if (concluido == "OTA por Iniciar") {
        tipo = 2;
        estado = 5;
        subestado = 11;
    }
    else if (concluido == "OTA en Ejecución") {
        tipo = 2;
        estado = 5;
        subestado = 7;
    }
    else if (concluido == "OTA Concluida") {
        tipo = 2;
        estado = 5;
        subestado = 5;
    }
    else if (concluido == "En Liquidación") {
        tipo = 2;
        estado = 5;
        subestado = 6;
    }
    else if (concluido == "Liquidada con R.D.") {
        tipo = 2;
        estado = 5;
        subestado = 17;
    }
    else if (concluido == "En Proceso de Liquidación de Convenio") {
        tipo = 2;
        estado = 5;
        subestado = 20;
    }
    else if (concluido == "Convenio Liquidado") {
        tipo = 2;
        estado = 5;
        subestado = 21;
    }

    var tabla = $("#dtEstadoInfo").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        scrollX: true,
        paging: false,
        info: true,
        ordering: true,
        paging: true,
        pageLength: 10,
        order: [],
        ajax: {
            url: "/EstadoSituacional/ListProyectosConcluidos?Tipo=" + tipo + "&Estado=" + estado + "&SubEstado=" + subestado,
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
                 title: getNombreFile('rpt_Proyectos_PIASAR_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_Proyectos_PIASAR_')
             }
        ],
        columns: [
                   { "name": "", "title": "N°", "data": null, "autowidth": true },
                   { "name": "", "title": "Codigo </br>Unico", "data": "CUI", "autowidth": true },

                   { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                   { "name": "", "title": "Provincia", "data": "Provincia", "autowidth": true },
                   { "name": "", "title": "Distrito", "data": "Distrito", "autowidth": true },
                   { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                   { "name": "", "title": "Modalidad", "data": "Modalidad", "autowidth": true },
                   { "name": "", "title": "% Avance </br>Fisico ", "data": "PorcentajeAvanceFisico", "autowidth": true },
                   { "name": "", "title": "% Avance </br>Fisico </br>Programado", "data": "PorcentajeAvanceObraProgramado", "autowidth": true },
                   { "name": "", "title": "Estrategias </br>y Acciones </br>(Metas a Corto,</br>Mediano </br>y Largo plazo)", "data": "EstrategiaAccion", "autowidth": true },
                   { "name": "", "title": "Estado", "data": "Estados", "autowidth": true },
                   { "name": "", "title": "Sub-Estado", "data": "SubEstado", "autowidth": true },
                   { "name": "", "title": "Limitante", "data": "Subestado2", "autowidth": true },
                   { "name": "", "title": "Comentario", "data": "Comentarios", "autowidth": true },
        ],
        columnDefs: [
            //{
            //    "targets": 6,
            //    "data": null,
            //    "className": "align-middle",
            //    "mRender": function (data, type, full) {
            //        debugger;
            //        if (full.Modalidad == "NÚCLEO EJECUTOR") {
            //            nucleos = nucleos + 1;
                        
            //        } else if(full.Modalidad == "CONTRATA") {
            //            contrata = contrata + 1;
            //        }
            //        return full.Modalidad;
            //    }
            //},
            {
                "targets": 9,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    debugger;
                    return full.EstrategiaAccion == null ? "" : "<div class='text-wrap width-200'>" +full.EstrategiaAccion  + "</div>";
                }
            },
            {
                "targets": 10,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Estados + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 11,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.SubEstado + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 12,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Subestado2 + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 13,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Comentarios + "</div>";//full.NombreCurso; 
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
        fnDrawCallback: function () {
            $("#dtEstadoInfo thead tr").css({ 'height': "0" });
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var index = iDisplayIndex + 1;
            $('td:eq(0)', nRow).html(index);
            return nRow;
        },
        initComplete: function (settings, json) {

            var nucleos = 0;
            var contrata = 0;
            $("#dtEstadoInfo thead tr").css({ 'height': "0" });
            var table = $("#dtEstadoInfo").DataTable();
            table.rows().data().each(function (value) {
                debugger;
                

                if (value.Modalidad == "NÚCLEO EJECUTOR") {
                    nucleos = nucleos + 1;

                } else if (value.Modalidad == "CONTRATA") {
                    contrata = contrata + 1;
                }
                $("#spnNroContrata").html(contrata);
                $("#spnNroNucleo").html(nucleos);
            });
        }
    });
}

function getNombreFile(nom) {
    var f = new Date();
    var title = nom + f.getDate() + "_" + (f.getMonth() + 1) + "_" + f.getFullYear() + "_" + f.getHours() + "_" + f.getMinutes();
    return title;
}



