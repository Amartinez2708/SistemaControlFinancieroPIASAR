$(document).ready(function () {
    Indicadores();
    grfMontoTotalPorIndicadores();
    grfEjecucionMensual();
    grfNroProcesoEstado();
});

function Indicadores() {
    $.get("/GestionComponente/Indicadores", function (data, status) {
        $("#nroProcesos").html(data.nroProcesos);
        $("#mtoTotalProcesos").html("S/." + formatMoney(data.mtoProcesos));
        $('#nroTDRET').html(data.nroTDRET);
        $('#nroCCP').html(data.nroCPP);

        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            var chart = am4core.create("chartProcesosPrograma", am4charts.PieChart3D);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

            chart.legend = new am4charts.Legend();

            chart.data = [
              {
                  programa: "MVCS",
                  procesos: data.nroMVCS,
                  monto: data.mtoMVCS
              },
              {
                  programa: "PIASAR",
                  procesos: data.nroPIASAR,
                  monto: data.mtoPIASAR
              },
              {
                  programa: "PNSR",
                  procesos: data.nroPNSR,
                  monto: data.mtoPNSR
              }
            ];

            function CallDetalle(ev) {
                VerProcesos('Programa', ev.target.dataItem.dataContext.programa)
            }
            var series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "procesos";
            series.dataFields.category = "programa";
            series.dataFields.openValueY = "monto";
            series.labels.template.disabled = true;
            series.ticks.template.disabled = true;
            series.slices.template.cornerRadius = 5;
            series.colors.step = 3;
            series.slices.template.tooltipHTML = "<center><strong>{category}</strong></center><hr/><table><tr><td align='left'><strong>Nro. Procesos:</strong></td><td align='right'>{value}</td></tr><tr><td align='left'><strong>Monto:</strong></td><td align='right'>{openValueY}</td></tr></table><hr/>";
            series.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series.slices.template.events.on("hit", CallDetalle, this);

        }); // end am4core.ready()


    });
}
function grfMontoTotalPorIndicadores() {
    $.get("/GestionComponente/grfMontoTotalPorIndicadores", function (data, status) {
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartMontoPorIndicadores", am4charts.PieChart3D);
            chart.hiddenState.properties.opacity = 0;

            chart.innerRadius = am4core.percent(40);
            chart.depth = 120;

            chart.legend = new am4charts.Legend();
            chart.legend.position = "right";
            // Add data
            chart.data = data;

            function CallDetalle(ev) {
                VerProcesos('Indicador', ev.target.dataItem.dataContext.NroIndicadorText)
            }

            // Add and configure Series
            var series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "Monto";
            series.dataFields.depthValue = "Monto";
            series.dataFields.category = "NroIndicadorText";
            series.dataFields.openValueY = "Cantidad";
            series.labels.template.disabled = true;
            series.ticks.template.disabled = true;
            series.slices.template.cornerRadius = 5;
            series.colors.step = 3;
            series.slices.template.tooltipHTML = "<center><strong>{category}</strong></center><hr/><table><tr><td align='left'><strong>Monto:</strong></td><td align='right'>{value}</td></tr><tr><td align='left'><strong>Nro. Procesos:</strong></td><td align='right'>{openValueY}</td></tr></table><hr/>";
            series.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series.slices.template.events.on("hit", CallDetalle, this);

            var label = chart.seriesContainer.createChild(am4core.Label);
            label.textAlign = "middle";
            label.horizontalCenter = "middle";
            label.verticalCenter = "middle";
            label.adapter.add("text", function (text, target) {
                var total = 0;
                for (var i = 0; i < series.dataItems._values.length; i++) {
                    total = total + series.dataItems._values[i].values.value.value;;
                }
                return "[font-size:14px]Monto Total[/]\n[bold font-size:20px]" + AbreviarNumero(total) + "[/]";
            })

        }); // end am4core.ready()
    });
}
function grfEjecucionMensual() {
    $.get("/GestionComponente/grfEjecucionMensual", function (data, status) {
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartEjecucionMensual", am4charts.XYChart3D);
            chart.language.locale = am4lang_es_ES;
            chart.language.locale["_decimalSeparator"] = ".";
            chart.language.locale["_thousandSeparator"] = ",";
            chart.language.locale["_date_month"] = "MMMM";

            // Increase contrast by taking evey second color
            chart.colors.step = 3;
            // Add data
            chart.data = data;

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "Mes";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Total Programado de Ejecución Mensual";
            valueAxis.title.fontWeight = "bold";

            function CallDetalle(ev) {
                VerProcesos('Mes',ev.target.dataItem.dataContext.Mes)
            }

            var series = chart.series.push(new am4charts.ColumnSeries3D())
            series.dataFields.valueY = 'Monto';
            series.dataFields.categoryX = 'Mes';
            series.dataFields.openValueY = 'Cantidad';     
            series.tooltipHTML = "<center><strong>{categoryX}</strong></center><hr/><table><tr><td align='left'><strong>Monto:</strong></td><td align='right'>{valueY}</td></tr><tr><td align='left'><strong>Nro. Procesos:</strong></td><td align='right'>{openValueY}</td></tr></table><hr/>";
            series.columns.template.fillOpacity = .8;
            series.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series.columns.template.events.on("hit", CallDetalle, this);

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;
            columnTemplate.stroke = am4core.color("#FFFFFF");

            columnTemplate.adapter.add("fill", function (fill, target) {
                return chart.colors.getIndex(target.dataItem.index);
            })

            columnTemplate.adapter.add("stroke", function (stroke, target) {
                return chart.colors.getIndex(target.dataItem.index);
            })

            chart.cursor = new am4charts.XYCursor();
            chart.cursor.lineX.disabled = true;
            chart.cursor.lineY.disabled = true;

        }); // end am4core.ready()

    });
}
function grfNroProcesoEstado() {
    $.get("/GestionComponente/grfNroProcesoEstado", function (data, status) {
        am4core.ready(function () {

            am4core.useTheme(am4themes_animated);
            // Themes end

            var chart = am4core.create("chartProcesoEstado", am4charts.XYChart);
            chart.language.locale = am4lang_es_ES;
            chart.language.locale["_decimalSeparator"] = ".";
            chart.language.locale["_thousandSeparator"] = ",";
            chart.language.locale["_date_month"] = "MMMM";

            chart.padding(40, 40, 40, 40);
            chart.data = data;

            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 1;
            categoryAxis.dataFields.category = "EstadoString";
            categoryAxis.numberFormatter.numberFormat = "#";
            categoryAxis.renderer.inversed = true;

            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.opposite = true;

            function CallDetalle(ev) {
                VerProcesos('Estado', ev.target.dataItem.dataContext.EstadoString)
            }

            // Create series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = "Cantidad";
            series.dataFields.categoryY = "EstadoString";
            series.dataFields.openValueY = 'MontoProceso';
            series.columns.template.tooltipHTML = "<center><strong>{categoryY}</strong></center><hr/><table><tr><td align='left'><strong>Nro. Procesos::</strong></td><td align='right'>{valueX}</td></tr><tr><td align='left'><strong>Monto:</strong></td><td align='right'>{values.openValueY.workingValue.formatNumber('#,###.##')}</td></tr></table><hr/>";
            series.columns.template.strokeOpacity = 0;
            series.columns.template.column.cornerRadiusBottomRight = 5;
            series.columns.template.column.cornerRadiusTopRight = 5;
            series.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series.columns.template.events.on("hit", CallDetalle, this);

            
            series.columns.template.adapter.add("fill", function (fill, target) {
                return chart.colors.getIndex(target.dataItem.index);
            });

            var labelBullet = series.bullets.push(new am4charts.LabelBullet())
            labelBullet.label.horizontalCenter = "left";
            labelBullet.label.dx = 10;
            labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#')}";
            labelBullet.locationX = 1;

        }); // end am4core.ready()

    });
}

function VerMontoPorIndicadores() {
    $("#modal-montoxindicadores").modal({ backdrop: 'static', keyboard: true, show: true });
    $($.fn.dataTable.tables(true)).DataTable()
         .columns.adjust();
    ListMontoPorIndicadores()
}
function ListMontoPorIndicadores() {
    var tabla = $("#dtmontoxindicadores").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: false,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        //scrollX: true,
        paging: false,
        info: false,
        ordering: false,
        paging: true,
        order: [[0, "desc"]],
        ajax: {
            url: "/GestionComponente/ListMontoPorIndicadores",
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
                 title: getNombreFile('rpt_Estado_Informacion_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_Estado_Informacion_')
             }
        ],
        columns: [
                    { "name": "", "title": "Indicador", "data": "NroIndicadorText", "autowidth": true },
                    { "name": "", "title": "Cantidad de Procesos", "data": "Cantidad", "autowidth": true },
                    { "name": "", "title": "Monto Total", "data": "Monto", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 0,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>TOTAL</strong>';
                    } else {
                        return full.NroIndicadorText;
                    }
                }
            },
            {
                "targets": 1,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + full.Cantidad; +'</strong>';
                    } else {
                        return full.Cantidad;
                    }
                }
            },
            {
                "targets": 2,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + formatMoney(full.Monto) +'</strong>';
                    } else {
                        return formatMoney(full.Monto);
                    }
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
            $("#dtmontoxindicadores thead tr").css({ 'height': "0" });
        },
        initComplete: function (settings, json) {
            $("#dtmontoxindicadores thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
    });
}

function VerProcesos(tipo, valor) {
    $("#modal-detalle").modal({ backdrop: 'static', keyboard: true, show: true });
    $($.fn.dataTable.tables(true)).DataTable()
         .columns.adjust();
    $("#Titulomodal").html("Tablero de Seguimiento Filtrado por: " + valor);

    var tabla = $("#dtdetalle").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: false,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        //scrollX: true,
        paging: false,
        info: false,
        ordering: false,
        paging: true,
        order: [[0, "desc"]],
        ajax: {
            url: "/GestionComponente/ListProceso?Tipo=" + tipo + "&value=" + valor,
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
                 title: getNombreFile('rpt_Estado_Informacion_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_Estado_Informacion_')
             }
        ],
        columns: [
                    { "name": "", "title": "Nro.", "data": "NroProceso", "autowidth": true },
                    { "name": "", "title": "Proceso", "data": "NombreProceso", "autowidth": true },
                    { "name": "", "title": "Indicador", "data": "TextIndicador", "autowidth": true },
                    { "name": "", "title": "Indicador <br/> Descripción", "data": "TextIndicadorDetalle", "autowidth": true },
                    { "name": "", "title": "Año<br/> Proceso", "data": "AnioProceso", "autowidth": true },
                    { "name": "", "title": "Tipo", "data": "TextAntiguedad", "autowidth": true },
                    { "name": "", "title": "Unidad<br/> Responsable", "data": "TextUnidadResponsable", "autowidth": true },
                    { "name": "", "title": "Responsable", "data": "Responsable1", "autowidth": true },
                    { "name": "", "title": "Tipo<br/> Proceso", "data": "TextTipoProceso", "autowidth": true },
                    { "name": "", "title": "Estrategia<br/> Proceso<br/> Adquisicion", "data": "TextEstrategiaProcesoAdquisicion", "autowidth": true },
                    { "name": "", "title": "Enero", "data": "Enero", "autowidth": true },
                    { "name": "", "title": "Febrero", "data": "Febrero", "autowidth": true },
                    { "name": "", "title": "Marzo", "data": "Marzo", "autowidth": true },
                    { "name": "", "title": "Abril", "data": "Abril", "autowidth": true },
                    { "name": "", "title": "Mayo", "data": "Mayo", "autowidth": true },
                    { "name": "", "title": "Junio", "data": "Junio", "autowidth": true },
                    { "name": "", "title": "Julio", "data": "Julio", "autowidth": true },
                    { "name": "", "title": "Agosto", "data": "Agosto", "autowidth": true },
                    { "name": "", "title": "Septiembre", "data": "Septiembre", "autowidth": true },
                    { "name": "", "title": "Octubre", "data": "Octubre", "autowidth": true },
                    { "name": "", "title": "Noviembre", "data": "Noviembre", "autowidth": true },
                    { "name": "", "title": "Diciembre", "data": "Diciembre", "autowidth": true },
                    { "name": "", "title": "Monto", "data": "MontoProceso", "autowidth": true },
                    { "name": "", "title": "Semestre", "data": "TextSemestre", "autowidth": true },
                    { "name": "", "title": "Hito N°1", "data": "Hito1", "autowidth": true },
                    { "name": "", "title": "Se Elaboró<br/> ET/TDR", "data": "TextElaboroETTDR", "autowidth": true },
                    { "name": "", "title": "Se Revisó", "data": "TextRevisado", "autowidth": true },
                    { "name": "", "title": "Estado", "data": "EstadoString", "autowidth": true },
                    { "name": "", "title": "Tiene HT", "data": "TextHT", "autowidth": true },
                    { "name": "", "title": "Nro. HT", "data": "NumeroHT", "autowidth": true },
                    { "name": "", "title": "Tiene CCP", "data": "TextCCP", "autowidth": true },
                    { "name": "", "title": "Observación", "data": "Observacion", "autowidth": true },
                    { "name": "", "title": "Responsable 2", "data": "Responsable2", "autowidth": true },
                    { "name": "", "title": "Hito N°2", "data": "Hito2", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 1,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-340'>" + full.NombreProceso + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 3,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-340'>" + full.TextIndicadorDetalle + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 10,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + formatMoney(full.Enero) + '</strong>';
                    } else {
                        return formatMoney(full.Enero);
                    }
                }
            },
            {
                "targets": 11,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + formatMoney(full.Febrero) + '</strong>';
                    } else {
                        return formatMoney(full.Febrero);
                    }
                }
            },
            {
                "targets": 12,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + formatMoney(full.Marzo) + '</strong>';
                    } else {
                        return formatMoney(full.Marzo);
                    }
                }
            },
            {
                "targets": 13,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + formatMoney(full.Abril) + '</strong>';
                    } else {
                        return formatMoney(full.Abril);
                    }
                }
            },
            {
                "targets": 14,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + formatMoney(full.Mayo) + '</strong>';
                    } else {
                        return formatMoney(full.Mayo);
                    }
                }
            },
            {
                "targets": 15,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + formatMoney(full.Junio) + '</strong>';
                    } else {
                        return formatMoney(full.Junio);
                    }
                }
            },
            {
                "targets": 16,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + formatMoney(full.Julio) + '</strong>';
                    } else {
                        return formatMoney(full.Julio);
                    }
                }
            },
            {
                "targets": 17,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + formatMoney(full.Agosto) + '</strong>';
                    } else {
                        return formatMoney(full.Agosto);
                    }
                }
            },
            {
                "targets": 18,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + formatMoney(full.Septiembre) + '</strong>';
                    } else {
                        return formatMoney(full.Septiembre);
                    }
                }
            },
            {
                "targets": 19,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + formatMoney(full.Octubre) + '</strong>';
                    } else {
                        return formatMoney(full.Octubre);
                    }
                }
            },
            {
                "targets": 20,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + formatMoney(full.Noviembre) + '</strong>';
                    } else {
                        return formatMoney(full.Noviembre);
                    }
                }
            },
            {
                "targets": 21,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + formatMoney(full.Diciembre) + '</strong>';
                    } else {
                        return formatMoney(full.Diciembre);
                    }
                }
            },
            {
                "targets": 22,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.NroIndicadorText == "TOTAL") {
                        return '<strong>' + formatMoney(full.MontoProceso) + '</strong>';
                    } else {
                        return formatMoney(full.MontoProceso);
                    }
                }
            },
            {
                "targets": 31,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-220'>" + full.Observacion + "</div>";//full.NombreCurso; 
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
            $("#dtdetalle thead tr").css({ 'height': "0" });
        },
        initComplete: function (settings, json) {
            $("#dtdetalle thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
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
function AbreviarNumero(val) {
    var value = val, bN = 0;
    var sf = ["", "k", "m", "b", "t", "c", "q", "s"];
    while (value > 999) {
        value /= 1000;
        bN++;
    }
    return value.toFixed(2) + sf[bN];
}
function getNombreFile(nom) {
    var f = new Date();
    var title = nom + f.getDate() + "_" + (f.getMonth() + 1) + "_" + f.getFullYear() + "_" + f.getHours() + "_" + f.getMinutes();
    return title;
}

function clase_bg_aleatoria() {
    var textos = new Array()
    textos[0] = "bg-c-blue";
    textos[1] = "bg-c-pink";
    textos[2] = "bg-c-yellow";
    textos[3] = "bg-c-green";


    aleat = Math.floor(Math.random() * (textos.length - 0) + 0);

    return textos[aleat];
}