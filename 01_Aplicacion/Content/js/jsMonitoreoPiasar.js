$(document).ready(function () {
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    Indicadores();
    //GrfMontoVSPresupuesto();
    //IndicadoresFiltro()
    //ListAutorizacionVSManifiesto();
    GraficoHistorial();
    //GraficoHistorialPorcentual();
    EstadoFinanciero();
    GraficoPendienteAutorizacion();
    GraficoPendienteRendicion();
    GraficoDesembolsoProgramado();
    //ResumenEstadoActividad();
    //$("#ddlDepartamento").change(function () {
    //    ddlProvincia($("#ddlDepartamento").val())
    //    IndicadoresFiltro();
    //    ListAutorizacionVSManifiesto();
    //});
    //$("#ddlProvincia").change(function () {
    //    ddlDistrito($("#ddlDepartamento").val() + $("#ddlProvincia").val())
    //    IndicadoresFiltro();
    //    ListAutorizacionVSManifiesto();
    //});
    //$("#ddlDistrito").change(function () {
    //    IndicadoresFiltro();
    //    ListAutorizacionVSManifiesto();
    //});
    //$("#txtSnip").change(function () {
    //    IndicadoresFiltro();
    //    ListAutorizacionVSManifiesto();
    //});
    //$("#txtCUI").change(function () {
    //    IndicadoresFiltro();
    //    ListAutorizacionVSManifiesto();
    //});
    //$("#ddlAnio").change(function () {
    //    IndicadoresFiltro();
    //    ListAutorizacionVSManifiesto();
    //});
    //$("#ddlAnioJustificacion").change(function () {
    //    //ListMontoProyectoVSPresupuesto()
    //});
    $('#dtMtoProyectoVSPresupuesto').on('column-sizing.dt', function (e, settings) {
        $("#dtMtoProyectoVSPresupuesto thead tr").css({ 'height': "0" });
    });
});
function ddlProvincia(Id) {
    $.get("/MonitoreoPIASAR/ddlProvincia?Id=" + Id, function (data, status) {
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
function ddlDistrito(Id) {
    $.get("/MonitoreoPIASAR/ddlDistrito?Id=" + Id, function (data, status) {
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

function ListAutorizacionVSManifiesto() {
    $.get("/MonitoreoPIASAR/ListAutorizacionVSManifiesto?cod_dep=" + $("#ddlDepartamento").val() + "&cod_prov=" + $("#ddlProvincia").val() + "&cod_dist=" + $("#ddlDistrito").val() + "&snip=" + $("#txtSnip").val() + "&cui=" + $("#txtCUI").val() + "&anio=" + $("#ddlAnio").val(), function (data, status) {
        am4core.ready(function () {
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartDiv1", am4charts.XYChart);

            // Add percent sign to all numbers
            chart.numberFormatter.numberFormat = "###,###,###.##";

            chart.legend = new am4charts.Legend()
            chart.legend.position = 'top'
            chart.legend.paddingBottom = 20
            chart.legend.labels.template.maxWidth = 95
            
            // Add data
            chart.data = [
               {
                   "Mes": "Enero",
                   "Autorizacion": data.EneroAutorizacion,
                   "Justificación": data.EneroManifiesto,
                   "AutorizacionGestionada": data.EneroAutorizacionGestionada,
                   "JustificaciónGestionada": data.EneroManifiestoGestionada
               }, {
                   "Mes": "Febrero",
                   "Autorizacion": data.FebreroAutorizacion,
                   "Justificación": data.FebreroManifiesto,
                   "AutorizacionGestionada": data.FebreroAutorizacionGestionada,
                   "JustificaciónGestionada": data.FebreroManifiestoGestionada
               }, {
                   "Mes": "Marzo",
                   "Autorizacion": data.MarzoAutorizacion,
                   "Justificación": data.MarzoManifiesto,
                   "AutorizacionGestionada": data.MarzoAutorizacionGestionada,
                   "JustificaciónGestionada": data.MarzoManifiestoGestionada
               }, {
                   "Mes": "Abril",
                   "Autorizacion": data.AbrilAutorizacion,
                   "Justificación": data.AbrilManifiesto,
                   "AutorizacionGestionada": data.AbrilAutorizacionGestionada,
                   "JustificaciónGestionada": data.AbrilManifiestoGestionada
               }, {
                   "Mes": "Mayo",
                   "Autorizacion": data.MayoAutorizacion,
                   "Justificación": data.MayoManifiesto,
                   "AutorizacionGestionada": data.MayoAutorizacionGestionada,
                   "JustificaciónGestionada": data.MayoManifiestoGestionada
               }, {
                   "Mes": "Junio",
                   "Autorizacion": data.JunioAutorizacion,
                   "Justificación": data.JunioManifiesto,
                   "AutorizacionGestionada": data.JunioAutorizacionGestionada,
                   "JustificaciónGestionada": data.JunioManifiestoGestionada
               }, {
                   "Mes": "Julio",
                   "Autorizacion": data.JulioAutorizacion,
                   "Justificación": data.JulioManifiesto,
                   "AutorizacionGestionada": data.JulioAutorizacionGestionada,
                   "JustificaciónGestionada": data.JulioManifiestoGestionada
               }, {
                   "Mes": "Agosto",
                   "Autorizacion": data.AgostoAutorizacion,
                   "Justificación": data.AgostoManifiesto,
                   "AutorizacionGestionada": data.AgostoAutorizacionGestionada,
                   "JustificaciónGestionada": data.AgostoManifiestoGestionada
               }, {
                   "Mes": "Septiembre",
                   "Autorizacion": data.SeptiembreAutorizacion,
                   "Justificación": data.SeptiembreManifiesto,
                   "AutorizacionGestionada": data.SeptiembreAutorizacionGestionada,
                   "JustificaciónGestionada": data.SeptiembreManifiestoGestionada
               }, {
                   "Mes": "Octubre",
                   "Autorizacion": data.OctubreAutorizacion,
                   "Justificación": data.OctubreManifiesto,
                   "AutorizacionGestionada": data.OctubreAutorizacionGestionada,
                   "JustificaciónGestionada": data.OctubreManifiestoGestionada
               }, {
                   "Mes": "Noviembre",
                   "Autorizacion": data.NoviembreAutorizacion,
                   "Justificación": data.NoviembreManifiesto,
                   "AutorizacionGestionada": data.NoviembreAutorizacionGestionada,
                   "JustificaciónGestionada": data.NoviembreManifiestoGestionada
               }, {
                   "Mes": "Diciembre",
                   "Autorizacion": data.DiciembreAutorizacion,
                   "Justificación": data.DiciembreManifiesto,
                   "AutorizacionGestionada": data.DiciembreAutorizacionGestionada,
                   "JustificaciónGestionada": data.DiciembreManifiestoGestionada
               }
            ];

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "Mes";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 50;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Monto en Soles S/.";
            valueAxis.title.fontWeight = 800;

            function CallDetalle(ev) {
                ListDetalleAutorizacionVSManifiesto($("#ddlDepartamento").val(), $("#ddlProvincia").val(), $("#ddlDistrito").val(), $("#txtSnip").val(), $("#txtCUI").val(), $("#ddlAnio").val(), ev.target.dataItem.dataContext.Mes, ev.target.dataItem.component.dataFields.valueY)
            }
            
            chart.colors.list = [
              am4core.color("#FFB64D"),
              am4core.color("#FF5370"),
              am4core.color("#4099ff"),
              am4core.color("#2ed8b6"),
            ];

            function createSeries(value, name) {
                var series = chart.series.push(new am4charts.ColumnSeries())
                series.dataFields.valueY = value
                series.dataFields.categoryX = 'Mes'
                series.name = name

                series.tooltipText = name + " en {categoryX}: [bold]{valueY}[/]";
                series.columns.template.events.on("hit", CallDetalle, this);
                series.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
                series.columns.template.stroke = am4core.color("#333");
                series.columns.template.strokeWidth = 2;

                return series;
            }

            createSeries('Autorizacion', 'Autorización de Gasto Aprobada');
            createSeries('Justificación', 'Rendición de Gasto Aprobada');
            createSeries('AutorizacionGestionada', 'Autorización de Gasto Gestionada');
            createSeries('JustificaciónGestionada', 'Rendición de Gasto Gestionada');

            chart.cursor = new am4charts.XYCursor();
            chart.cursor.lineX.disabled = true;
            chart.cursor.lineY.disabled = true;
        }); // end am4core.ready()
    });
}
function ListDetalleAutorizacionVSManifiesto(dep, prov, dist, snip, cui, anio, mes, tipo) {

    if (tipo == "Autorizacion") {
        $("#lblEstadoAutorizacionvsManifiesto").html("Autorizaciones de Gasto Aprobadas el mes de " + mes + " del año " + anio);
    } else if (tipo == "Justificación") {
        $("#lblEstadoAutorizacionvsManifiesto").html("Rendiciones de Gasto Aprobadas el mes de " + mes + " del año " + anio);
    } else if (tipo == "AutorizacionGestionada") {
        $("#lblEstadoAutorizacionvsManifiesto").html("Autorizaciones de Gasto Gestionadas el mes de " + mes + " del año " + anio);
    } else if (tipo == "JustificaciónGestionada") {
        $("#lblEstadoAutorizacionvsManifiesto").html("Rendiciones de Gasto Gestionadas el mes de " + mes + " del año " + anio);
    }

    $("#modal-autorizacionvsmanifiesto").modal({ backdrop: 'static', keyboard: true, show: true });

    var tabla = $("#dtAutorizacionJustificacion").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        //scrollX: true,
        pageLength: 10,
        paging: false,
        info: false,
        ordering: false,
        paging: true,
        order: [[0, "asc"]],
        ajax: {
            url: "/MonitoreoPIASAR/ListDetalleAutorizacionVSManifiesto?cod_dep=" + dep + "&cod_prov=" + prov + "&cod_dist=" + dist + "&snip=" + snip + "&cui=" + cui + "&anio=" + anio + "&mes=" + mes + "&tipo=" + tipo,
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
                 title: getNombreFile('rpt_Autorizacion_VS_Rendicion_' + tipo + "_" + mes + '_' + anio + '_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_Autorizacion_VS_Rendicion_' + tipo + "_" + mes + '_' + anio + '_')
             }
        ],
        columns: [
                    { "name": "", "title": "SNIP", "data": "Snip", "autowidth": true },
                    { "name": "", "title": "CUI", "data": "CUI", "autowidth": true },
                    { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                    { "name": "", "title": "Provincia", "data": "Provincia", "autowidth": true },
                    { "name": "", "title": "Distrito", "data": "Distrito", "autowidth": true },
                    { "name": "", "title": "Proyecto", "data": "Proyecto", "autowidth": true },
                    { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                    { "name": "", "title": "Monto </br>del Proyecto", "data": "Mto_proyecto", "autowidth": true },
                    { "name": "", "title": "-", "data": null, "autowidth": true },
                    { "name": "", "title": "Estado", "data": "Estado", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 5,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Proyecto + "</div>";
                }
            },
            {
                "targets": 7,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Mto_proyecto);
                }
            },
            {
                "targets": 8,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (tipo == "Autorizacion") {
                        return formatMoney(full.Autorizacion);
                    } else if (tipo == "Justificación") {
                        return formatMoney(full.Manifiesto);
                    } else if (tipo == "AutorizacionGestionada") {
                        return formatMoney(full.AutorizacionGestionada);
                    } else if (tipo == "JustificaciónGestionada") {
                        return formatMoney(full.ManifiestoGestionada);
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
            $("#dtAutorizacionJustificacion thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
        initComplete: function (settings, json) {
            $("#dtAutorizacionJustificacion thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");

            if (tipo == "Autorizacion") {
                $(tabla.column(8).header()).html("Monto </br>Autorización");
            } else if (tipo == "Justificación") {
                $(tabla.column(8).header()).html("Monto </br>Rendido");
            } else if (tipo == "AutorizacionGestionada") {
                $(tabla.column(8).header()).html("Monto </br>Autorización Gestionada");
            } else if (tipo == "JustificaciónGestionada") {
                $(tabla.column(8).header()).html("Monto </br>Rendido Gestionado");
            } else {
                $(tabla.column(8).header()).html("");
            }
        },
    });

}

function getNombreFile(nom) {
    var f = new Date();
    var title = nom + f.getDate() + "_" + (f.getMonth() + 1) + "_" + f.getFullYear() + "_" + f.getHours() + "_" + f.getMinutes();
    return title;
}

function GrfMontoVSPresupuesto() {
    $.get("/MonitoreoPIASAR/GrfDesenbolsoVSJustificacion?cod_dep=" + $("#ddlDepartamento").val() + "&cod_prov=" + $("#ddlProvincia").val() + "&cod_dist=" + $("#ddlDistrito").val() + "&snip=" + $("#txtSnip").val() + "&cui=" + $("#txtCUI").val(), function (data, status) {
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartDiv2", am4charts.PieChart);

            chart.innerRadius = am4core.percent(40);

            chart.legend = new am4charts.Legend();
            // Add data
            chart.data = [{
                "country": "Rendido",
                "litres": data.Manifiesto,
                "fill": "#4099ff"
            }, {
                "country": "Por Rendir",
                "litres": data.Desembolso,
                "fill": "#dedede"
            }];

            // Add and configure Series
            var series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "litres";
            series.dataFields.category = "country";
            series.slices.template.stroke = am4core.color("#333");
            series.slices.template.strokeWidth = 2;
            series.ticks.template.disabled = true;
            series.labels.template.disabled = true;
            series.slices.template.propertyFields.fill = "fill";

            var label = chart.seriesContainer.createChild(am4core.Label);
            label.textAlign = "middle";
            label.horizontalCenter = "middle";
            label.verticalCenter = "middle";
            label.adapter.add("text", function (text, target) {
                return "[font-size:14px]Rendido[/]\n[bold font-size:20px]" + formatMoney(series.dataItems._values[0].values.value.percent) + "%[/]";
            })

        }); // end am4core.ready()
    });
}
function VerMontoProyectoVSPresupuesto() {
    $("#modal-proyectovspresupuesto").modal({ backdrop: 'static', keyboard: true, show: true });
    
    ListMontoProyectoVSPresupuesto();
    
}
function ListMontoProyectoVSPresupuesto() {
    var tabla = $("#dtMtoProyectoVSPresupuesto").DataTable({
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
            url: "/MonitoreoPIASAR/ListDesenbolsoVSJustificacion?Anio=" + $("#ddlAnioJustificacion").val(),
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
                 title: getNombreFile('rpt_Justificacion_VS_Desembolsado_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_Justificacion_VS_Desembolsado_')
             }
        ],
        columns: [
                    { "name": "", "title": "Nro.", "data": "Nro", "autowidth": true },
                    { "name": "", "title": "Año de </br>Ejecución", "data": "Anio", "autowidth": true },
                    { "name": "", "title": "SNIP", "data": "Snip", "autowidth": true },
                    { "name": "", "title": "CUI", "data": "CUI", "autowidth": true },
                    { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                    { "name": "", "title": "Provincia", "data": "Provincia", "autowidth": true },
                    { "name": "", "title": "Distrito", "data": "Distrito", "autowidth": true },
                    { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                    { "name": "", "title": "Costo </br>de Inversión", "data": "Mto_proyecto", "autowidth": true },
                    { "name": "", "title": "Total </br>Transferido", "data": "Desembolso", "autowidth": true },
                    { "name": "", "title": "Total </br>Autorizado </br>Aprobado", "data": "Autorizacion", "autowidth": true },
                    { "name": "", "title": "% Pendiente </br>de Autorización </br>(Autorizado/Transferido)", "data": "PorcentajePendienteAutorizacion", "autowidth": true },
                    { "name": "", "title": "Monto Pendiente </br> de Autorizar", "data": "PendienteAutorizacion", "autowidth": true },
                    { "name": "", "title": "Total </br>Rendido </br>Aprobado", "data": "Manifiesto", "autowidth": true },
                    { "name": "", "title": "% Pendiente </br>de Rendición </br>(Rendido/Autorizado)", "data": "PorcentajePendienteRendicion", "autowidth": true },
                    { "name": "", "title": "Monto Pendiente </br> de Rendición", "data": "PendienteRendicion", "autowidth": true },
                    { "name": "", "title": "% Rendido </br>(Rendido/Transferido)", "data": "Porcentaje", "autowidth": true },
                    { "name": "", "title": "Fecha Ultima </br>Autorización", "data": "FechaUltAut", "autowidth": true },
                    { "name": "", "title": "Fecha Ultima </br>Rendición", "data": "FechaUltMan", "autowidth": true },
                    { "name": "", "title": "Nro. Dias </br>Transcurridos </br>Sin Rendir", "data": "NroDias", "autowidth": true },
                    { "name": "", "title": "Liquidador", "data": "Liquidador", "autowidth": true },
                    //{ "name": "", "title": "Estado", "data": "Estado", "autowidth": true }
                    { "name": "", "title": "Estado", "data": null, "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 8,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Mto_proyecto);
                }
            },
            {
                "targets": 9,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Desembolso);
                }
            },
            {
                "targets": 10,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Autorizacion);
                }
            },
            {
                "targets": 11,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return '% '+formatMoney(full.PorcentajePendienteAutorizacion);
                }
            },
            {
                "targets": 12,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.PendienteAutorizacion);
                }
            },
            {
                "targets": 13,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Manifiesto);
                }
            },
            {
                "targets": 14,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return '% ' + formatMoney(full.PorcentajePendienteRendicion);
                }
            },
            {
                "targets": 15,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.PendienteRendicion);
                }
            },
            {
                "targets": 16,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Porcentaje)+"%";
                }
            },
            {
                "targets": 21,
                "data": "Estado",
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.Estado == 1) {
                        return '<i class="fa fa-check" title="En Actividad" style="font-size: 30px;color: #4CAF50;"></i>';
                    }
                    else if (full.Estado == 2) {
                        return '<i class="fa fa-exclamation-triangle" title="Sin Actividad por más de 30 días" style="font-size: 30px;color: #ffc107;"></i>';
                    }
                    else if (full.Estado == 3) {
                        return '<i class="fa fa-times" title="Sin Rendir más de 7 días" style="font-size: 30px;color: #f44336;"></i>';
                    }
                    else if (full.Estado == 4) {
                        return '<i class="fa fa-minus-circle" title="Sin Actividad" style="font-size: 30px;color: #9e9e9e;"></i>';
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
            $("#dtMtoProyectoVSPresupuesto thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
        initComplete: function (settings, json) {
            $("#dtMtoProyectoVSPresupuesto thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
    });
    
}

function ResumenEstadoInformacion() {
    $.get("/MonitoreoPIASAR/ListEstadoInformacion?cod_dep=" + $("#ddlDepartamento").val() + "&cod_prov=" + $("#ddlProvincia").val() + "&cod_dist=" + $("#ddlDistrito").val() + "&snip=" + $("#txtSnip").val() + "&cui=" + $("#txtCUI").val(), function (data, status) {
        $("#tblEstadoInformacion > tbody").empty();

        for (i = 0; i < data.data.length; i++) {

            var bg_class = clase_bg_aleatoria();
            var divOpcion = '<tr>';
            /*==========labels==============*/
            divOpcion = divOpcion + '<td style="width:450px;"><div class="project-contain"><h6>' + data.data[i].Localidad + '</h6><p class="text-muted"><i class="fa fa-map-marker f-12 m-r-10"></i>' + data.data[i].CUI + "/" + data.data[i].SNIP + "-" + data.data[i].Departamento + "/" + data.data[i].Provincia + "/" + data.data[i].Distrito + '</p></td>';
            divOpcion = divOpcion + '<td style="width:100px;"><div class="progress d-inline-block"><div class="progress-bar ' + bg_class + '" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width:' + data.data[i].PorcentajeAvance + '%"></div></div></td>';
            divOpcion = divOpcion + '<td>' + data.data[i].PorcentajeAvance + '%</td>';
            divOpcion = divOpcion + '<td>' + data.data[i].Fecha_de_Ultima_Actualización + '</td>';
            divOpcion = divOpcion + '</tr>';

            $("#tblEstadoInformacion > tbody").append(divOpcion);
        }
    });
}
function VerEstadoInformacion() {
    $("#modal-estadoinformacionproyecto").modal({ backdrop: 'static', keyboard: true, show: true });
    $($.fn.dataTable.tables(true)).DataTable()
         .columns.adjust();
    ListEstadoInformacion()
}
function ListEstadoInformacion() {
    var tabla = $("#dtEstadoInfo").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        //scrollX: true,
        paging: false,
        info: false,
        ordering: false,
        paging: true,
        order: [[4, "desc"]],
        ajax: {
            url: "/MonitoreoPIASAR/ListEstadoInformacion?cod_dep=" + $("#ddlDepartamento").val() + "&cod_prov=" + $("#ddlProvincia").val() + "&cod_dist=" + $("#ddlDistrito").val() + "&snip=" + $("#txtSnip").val() + "&cui=" + $("#txtCUI").val(),
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
                    { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                    { "name": "", "title": "Provincia", "data": "Provincia", "autowidth": true },
                    { "name": "", "title": "Distrito", "data": "Distrito", "autowidth": true },
                    { "name": "", "title": "SNIP", "data": "SNIP", "autowidth": true },
                    { "name": "", "title": "Proyecto", "data": "Proyecto", "autowidth": true },
                    { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                    { "name": "", "title": "Fecha de<br/> Aprobación de<br/>Estudio de<br/> Preinversión", "data": "Fecha_de_Aprobación_Estudio_Pre_Inversión", "autowidth": true },
                    { "name": "", "title": "Fecha de<br/> Verificación de<br/>Estudio de<br/> Preinversión", "data": "Fecha_de_Verificación_Estudio_Pre_Inversión", "autowidth": true },
                    { "name": "", "title": "Fecha de<br/> Aprobación de<br/>Expediente de<br/> Técnico", "data": "Fecha_de_Aprobación_Expediente_Técnico", "autowidth": true },
                    { "name": "", "title": "Fecha de<br/> Suscripción<br/>del Convenio", "data": "Fecha_de_Suscripción_del_Convenio", "autowidth": true },
                    { "name": "", "title": "Fecha de<br/> Inicio<br/>Programado", "data": "Fecha_de_Inicio_Programado", "autowidth": true },
                    { "name": "", "title": "Fecha de<br/> Inicio<br/>Real", "data": "Fecha_de_Inicio_Real", "autowidth": true },
                    { "name": "", "title": "Fecha<br/> de Fin<br/>Programado", "data": "Fecha_de_Fin_Programado", "autowidth": true },
                    { "name": "", "title": "Fecha<br/> de Fin<br/>Real", "data": "Fecha_de_Fin_Real", "autowidth": true },
                    { "name": "", "title": "Fecha de<br/> Ultima<br/>Actualización", "data": "Fecha_de_Ultima_Actualización", "autowidth": true },
                    //{ "name": "", "title": "Estado", "data": null, "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 4,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Proyecto + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 6,
                "data": null,
                "className": "align-middle text-center",
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData == "01/01/1900") {
                        $(td).addClass('danger-cell')
                    }
                }
            },
            {
                "targets": 7,
                "data": null,
                "className": "align-middle text-center",
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData == "01/01/1900") {
                        $(td).addClass('danger-cell')
                    }
                }
            },
            {
                "targets": 8,
                "data": null,
                "className": "align-middle text-center",
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData == "01/01/1900") {
                        $(td).addClass('danger-cell')
                    }
                }
            },
            {
                "targets": 9,
                "data": null,
                "className": "align-middle text-center",
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData == "01/01/1900") {
                        $(td).addClass('danger-cell')
                    }
                }
            },
            {
                "targets": 10,
                "data": null,
                "className": "align-middle text-center",
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData == "01/01/1900") {
                        $(td).addClass('danger-cell')
                    }
                }
            },
            {
                "targets": 11,
                "data": null,
                "className": "align-middle text-center",
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData == "01/01/1900") {
                        $(td).addClass('danger-cell')
                    }
                }
            },
            {
                "targets": 12,
                "data": null,
                "className": "align-middle text-center",
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData == "01/01/1900") {
                        $(td).addClass('danger-cell')
                    }
                }
            },
            {
                "targets": 13,
                "data": null,
                "className": "align-middle text-center",
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData == "01/01/1900") {
                        $(td).addClass('danger-cell')
                    }
                }
            },
            {
                "targets": 14,
                "data": null,
                "className": "align-middle text-center",
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData == "01/01/1900") {
                        $(td).addClass('danger-cell')
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
            $("#dtEstadoInfo thead tr").css({ 'height': "0" });
        },
        initComplete: function (settings, json) {
            $("#dtEstadoInfo thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
    });
}

function ResumenEstadoPresupuesto() {
    $.get("/MonitoreoPIASAR/ListResumenEstadoPresupuesto?cod_dep=" + $("#ddlDepartamento").val() + "&cod_prov=" + $("#ddlProvincia").val() + "&cod_dist=" + $("#ddlDistrito").val() + "&snip=" + $("#txtSnip").val() + "&cui=" + $("#txtCUI").val(), function (data, status) {
        $("#tblEstadoPresupuesto > tbody").empty();

        for (i = 0; i < data.data.length; i++) {

            var bg_class = clase_bg_aleatoria();
            var divOpcion = '<tr>';
            /*==========labels==============*/
            divOpcion = divOpcion + '<td style="width:450px;"><div class="task-contain"><h6 class="' + bg_class + ' d-inline-block text-center"><i class="fa fa-building-o"></i></h6><p class="d-inline-block m-l-20"><strong>' + data.data[i].Localidad + '</strong></br><i class="fa fa-map-marker f-12 m-r-10"></i> ' + data.data[i].CUI + "/" + data.data[i].SNIP + "-" + data.data[i].Departamento + "/" + data.data[i].Provincia + "/" + data.data[i].Distrito + '</p></td>';
            divOpcion = divOpcion + '<td style="width:100px;"><p class="d-inline-block m-r-20">' + data.data[i].PorcentajeAvance + '%</p><div class="progress d-inline-block"><div class="progress-bar ' + bg_class + '" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width:' + data.data[i].PorcentajeAvance + '%"></div></div></td>';
            divOpcion = divOpcion + '</tr>';

            $("#tblEstadoPresupuesto > tbody").append(divOpcion);
        }
    });
}
function VerEstadoPresupuesto() {
    $("#modal-estadopresupuesto").modal({ backdrop: 'static', keyboard: true, show: true });
    $($.fn.dataTable.tables(true)).DataTable()
         .columns.adjust();
    ListEstadoPresupuesto()
}
function ListEstadoPresupuesto() {
    var tabla = $("#dtEstadoPre").DataTable({
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
        info: false,
        ordering: false,
        paging: true,
        pageLength : 12,
        order: [[4, "desc"]],
        ajax: {
            url: "/MonitoreoPIASAR/ListEstadoPresupuesto?cod_dep=" + $("#ddlDepartamento").val() + "&cod_prov=" + $("#ddlProvincia").val() + "&cod_dist=" + $("#ddlDistrito").val() + "&snip=" + $("#txtSnip").val() + "&cui=" + $("#txtCUI").val(),
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
                 title: getNombreFile('rpt_Estado_Presupuesto_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_Estado_Presupuesto_')
             }
        ],
        columns: [
                    { "name": "Departamento", "title": "Departamento", "data": "Departamento", "autowidth": true },
                    { "name": "Provincia", "title": "Provincia", "data": "Provincia", "autowidth": true },
                    { "name": "Distrito", "title": "Distrito", "data": "Distrito", "autowidth": true },
                    { "name": "CUI", "title": "CUI", "data": "CUI", "autowidth": true },
                    { "name": "SNIP", "title": "SNIP", "data": "SNIP", "autowidth": true },
                    { "name": "Proyecto", "title": "Proyecto", "data": "Proyecto", "autowidth": true },
                    { "name": "Localidad", "title": "Localidad", "data": "Localidad", "autowidth": true },
                    { "name": "", "title": "Presupuesto", "data": "Presupuesto", "autowidth": true },
                    { "name": "", "title": "Fecha de<br/> Actualización de<br/>Presupuesto", "data": "Fecha_Actualización_Presupuesto", "autowidth": true }
                    //{ "name": "", "title": "Estado", "data": null, "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 5,
                "data": null,
                "className": "align-middle",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.Proyecto + "</div>";//full.NombreCurso; 
                }
            },
            {
                "targets": 8,
                "data": null,
                "className": "align-middle text-center",
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData == "") {
                        $(td).addClass('danger-cell')
                    }
                }
            },
            {
                "targets": "_all",
                "className": "align-middle text-center",
            }
        ],
        rowsGroup: [
          'Departamento:name',
          'Provincia:name',
          'Distrito:name',
          'CUI:name',
          'SNIP:name',
          'Proyecto:name',
          'Localidad:name'
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
            $("#dtEstadoPre thead tr").css({ 'height': "0" });
        },
        initComplete: function (settings, json) {
            $("#dtEstadoPre thead tr").css({ 'height': "0" });
        },
    });
}

function Indicadores() {
    $.get("/MonitoreoPIASAR/Indicadores", function (data, status) {
        $("#nroObras").html(data.NroObras);
        $("#mtoObras").html("S/." + AbreviarNumero(data.MontoObras));
        $('#mtoObras').prop('title', formatMoney(data.MontoObras));
        $('#mtoObrasNum').html("S/." + formatMoney(data.MontoObras));
        if (data.MtoAutorizacion == "") { $("#mtoAutorizacion").html("S/.0.00"); } else { $("#mtoAutorizacion").html("S/." + AbreviarNumero(data.MtoAutorizacion)); $('#mtoAutorizacion').prop('title', "S/." + formatMoney(data.MtoAutorizacion)); $('#mtoAutorizacionNum').html("S/." + formatMoney(data.MtoAutorizacion)); $('#mtoAutorizacionAnterior').html("S/." + formatMoney(data.MtoAutorizacionAnterior)); $('#fechaAnteriorAutorizacion').html(data.FechaAnterior); $('#fechaActualAutorizacion').html(data.FechaActual) };
        if (data.MtoManifiesto == "") { $("#mtoManifiesto").html("S/.0.00"); } else { $("#mtoManifiesto").html("S/." + AbreviarNumero(data.MtoManifiesto)); $('#mtoManifiesto').prop('title', "S/." + formatMoney(data.MtoManifiesto)); $('#mtoManifiestoNum').html("S/." + formatMoney(data.MtoManifiesto)); $('#mtoManifiestoAnterior').html("S/." + formatMoney(data.MtoManifiestoAnterior)); $('#fechaAnteriorManifiesto').html(data.FechaAnterior); $('#fechaActualRendicion').html(data.FechaActual) }
        if (data.MtoDesembolso == "") { $("#mtoDesembolso").html("S/.0.00"); } else { $("#mtoDesembolso").html("S/." + AbreviarNumero(data.MtoDesembolso)); $('#mtoDesembolso').prop('title', "S/." + formatMoney(data.MtoDesembolso)); $('#mtoDesembolsoNum').html("S/." + formatMoney(data.MtoDesembolso)); $('#mtoDesembolsoAnterior').html("S/." + formatMoney(data.MtoDesembolsoAnterior)); $('#fechaAnteriorDesembolso').html(data.FechaAnterior); $('#fechaActualDesembolso').html(data.FechaActual) }
        if (data.PorcentajeJustificacion == "") { $("#porcentajeJustificado").html("% 0.00"); } else { $("#porcentajeJustificado").html("% " + AbreviarNumero(data.PorcentajeJustificacion));}
        if (data.PorcentajePendienteAutorizacion == "") { $("#PorcentajePendienteAutorizacion").html("% 0.00"); } else { $("#PorcentajePendienteAutorizacion").html("% " + AbreviarNumero(data.PorcentajePendienteAutorizacion)); $('#PorcentajePendienteAutorizacion').prop('title', "S/." + formatMoney(data.PendienteAutorizacion)); $('#mtoPorcentajePendienteAutorizacionNum').html("S/." + formatMoney(data.PendienteAutorizacion)) }
        if (data.PorcentajePendienteRendicion == "") { $("#PorcentajePendienteRendicion").html("% 0.00"); } else { $("#PorcentajePendienteRendicion").html("% " + AbreviarNumero(data.PorcentajePendienteRendicion)); $('#PorcentajePendienteRendicion').prop('title', "S/." + formatMoney(data.PendienteRendicion)); $('#mtoPorcentajePendienteRendicionNum').html("S/." + formatMoney(data.PendienteRendicion)) }

        /**/
        $("#spnMtoGirado").html("S/." + formatMoney(data.MtoDesembolso));
        $("#spnPorGirar").html("S/." + formatMoney(data.MontoObras-data.MtoDesembolso));
        /**/
        if (data.MtoAutorizacionAnterior < data.MtoAutorizacion)
        {
            var diferencia = (data.MtoAutorizacion - data.MtoAutorizacionAnterior);
            var porcentage = 0;
            if (diferencia != 0) { porcentage = (diferencia * 100) / data.MtoAutorizacionAnterior; }
            
            $("#porcentageAutorizacion").html("% " + formatMoney(porcentage));
            $("#porcentageAutorizacion").addClass("text-c-green");
            $("#iEstadoAutorizacion").addClass("fa-long-arrow-up text-c-green");
            $("#diferenciaAutorizacion").html(formatMoney(diferencia));
            $("#diferenciaAutorizacion").addClass("text-c-green");
           
        }
        else if (data.MtoAutorizacionAnterior > data.MtoAutorizacion)
        {
            var diferencia = (data.MtoAutorizacionAnterior - data.MtoAutorizacion);
            var porcentage = 0;
            if (diferencia != 0) { porcentage = (diferencia * 100) / data.MtoAutorizacionAnterior; }

            $("#porcentageAutorizacion").html("% " + formatMoney(porcentage));
            $("#porcentageAutorizacion").addClass("text-danger");
            $("#iEstadoAutorizacion").addClass("fa-long-arrow-down text-danger");
            $("#diferenciaAutorizacion").html(formatMoney(diferencia));
            $("#diferenciaAutorizacion").addClass("text-danger");
        }
        else if (data.MtoAutorizacionAnterior == data.MtoAutorizacion)
        {
            $("#porcentageAutorizacion").html("% 0.00");
            $("#porcentageAutorizacion").addClass("text-c-blue");
            $("#iEstadoAutorizacion").addClass("fa-minus text-c-blue");
            $("#diferenciaAutorizacion").html("0.00");
            $("#diferenciaAutorizacion").addClass("text-c-blue");
        }
        //////////////////
        if (data.MtoManifiestoAnterior < data.MtoManifiesto)
        {
            var diferencia = (data.MtoManifiesto - data.MtoManifiestoAnterior);
            var porcentage = 0;
            if (diferencia != 0) { porcentage = (diferencia * 100) / data.MtoManifiestoAnterior; }

            $("#porcentageRendicion").html("% " + formatMoney(porcentage));
            $("#porcentageRendicion").addClass("text-c-green");
            $("#iEstadoManifiesto").addClass("fa-long-arrow-up text-c-green");
            $("#diferenciaRendicion").html(formatMoney(diferencia));
            $("#diferenciaRendicion").addClass("text-c-green");
        }
        else if (data.MtoManifiestoAnterior > data.MtoManifiesto)
        {
            var diferencia = (data.MtoManifiestoAnterior - data.MtoManifiesto);
            var porcentage = 0;
            if (diferencia != 0) { porcentage = (diferencia * 100) / data.MtoManifiestoAnterior; }

            $("#porcentageRendicion").html("% " + formatMoney(porcentage));
            $("#porcentageRendicion").addClass("text-danger");
            $("#iEstadoManifiesto").addClass("fa-long-arrow-down text-danger");
            $("#diferenciaRendicion").html(formatMoney(diferencia));
            $("#diferenciaRendicion").addClass("text-danger");
        }
        else if (data.MtoManifiestoAnterior == data.MtoManifiesto)
        {
            $("#porcentageRendicion").html("% 0.00");
            $("#porcentageRendicion").addClass("text-c-blue");
            $("#iEstadoManifiesto").addClass("fa-minus text-c-blue");
            $("#diferenciaRendicion").html("0.00");
            $("#diferenciaRendicion").addClass("text-c-blue");
        }
        //////////////////
        if (data.MtoDesembolsoAnterior < data.MtoDesembolso)
        {
            var diferencia = (data.MtoDesembolso - data.MtoDesembolsoAnterior);
            var porcentage = 0;
            if (diferencia != 0) { porcentage = (diferencia * 100) / data.MtoDesembolsoAnterior; }

            $("#porcentageDesembolso").html("% " + formatMoney(porcentage));
            $("#porcentageDesembolso").addClass("text-c-green");
            $("#iEstadoDesembolso").addClass("fa-long-arrow-up text-c-green");
            $("#diferenciaDesembolso").html(formatMoney(diferencia));
            $("#diferenciaDesembolso").addClass("text-c-green");
        }
        else if (data.MtoDesembolsoAnterior > data.MtoDesembolso)
        {
            var diferencia = (data.MtoDesembolsoAnterior - data.MtoDesembolso);
            var porcentage = 0;
            if (diferencia != 0) { porcentage = (diferencia * 100) / data.MtoDesembolsoAnterior; }

            $("#porcentageDesembolso").html("% " + formatMoney(porcentage));
            $("#porcentageDesembolso").addClass("text-danger");
            $("#iEstadoDesembolso").addClass("fa-long-arrow-down text-danger");
            $("#diferenciaDesembolso").html(formatMoney(diferencia));
            $("#diferenciaDesembolso").addClass("text-danger");
        }
        else if (data.MtoDesembolsoAnterior == data.MtoDesembolso)
        {
            $("#porcentageDesembolso").html("% 0.00");
            $("#porcentageDesembolso").addClass("text-c-blue");
            $("#iEstadoDesembolso").addClass("fa-minus text-c-blue");
            $("#diferenciaDesembolso").html("0.00");
            $("#diferenciaDesembolso").addClass("text-c-blue");
        }

    });
}
function IndicadoresFiltro() {
    $.get("/MonitoreoPIASAR/IndicadoresFiltro?cod_dep=" + $("#ddlDepartamento").val() + "&cod_prov=" + $("#ddlProvincia").val() + "&cod_dist=" + $("#ddlDistrito").val() + "&snip=" + $("#txtSnip").val() + "&cui=" + $("#txtCUI").val() + "&anio=" + $("#ddlAnio").val(), function (data, status) {
        $(".anio").html($("#ddlAnio").val());
        //$("#nroObrasFiltro").html(data.NroObras);
        //$("#mtoObrasFiltro").html("S/." + AbreviarNumero(data.MontoObras));
        //$('#mtoObrasFiltro').prop('title', formatMoney(data.MontoObras));
        if (data.MtoDesembolso == "") { $("#mtoDesembolsoFiltro").html("S/.0.00"); } else { $("#mtoDesembolsoFiltro").html("S/." + AbreviarNumero(data.MtoDesembolso)); $('#mtoDesembolsoFiltro').prop('title', "S/." + formatMoney(data.MtoDesembolso)) };
        if (data.MtoAutorizacion == "") { $("#mtoAutorizacionFiltro").html("S/.0.00"); } else { $("#mtoAutorizacionFiltro").html("S/." + AbreviarNumero(data.MtoAutorizacion)); $('#mtoAutorizacionFiltro').prop('title', "S/." + formatMoney(data.MtoAutorizacion)) };
        if (data.MtoAutorizacionGestionada == "") { $("#mtoAutorizacionGestionadaFiltro").html("S/.0.00"); } else { $("#mtoAutorizacionGestionadaFiltro").html("S/." + AbreviarNumero(data.MtoAutorizacionGestionada)); $('#mtoAutorizacionGestionadaFiltro').prop('title', "S/." + formatMoney(data.MtoAutorizacionGestionada)) };
        if (data.MtoManifiesto == "") { $("#mtoManifiestoFiltro").html("S/.0.00"); } else { $("#mtoManifiestoFiltro").html("S/." + AbreviarNumero(data.MtoManifiesto)); $('#mtoManifiestoFiltro').prop('title', "S/." + formatMoney(data.MtoManifiesto)) }
        if (data.MtoManifiestoGestionada == "") { $("#mtoManifiestoGestionadaFiltro").html("S/.0.00"); } else { $("#mtoManifiestoGestionadaFiltro").html("S/." + AbreviarNumero(data.MtoManifiestoGestionada)); $('#mtoManifiestoGestionadaFiltro').prop('title', "S/." + formatMoney(data.MtoManifiestoGestionada)) }
        if (data.PorcentajeJustificacion == "") { $("#porcentajeJustificadoFiltro").html("% 0.00"); } else { $("#porcentajeJustificadoFiltro").html("% " + AbreviarNumero(data.PorcentajeJustificacion)); }
    });
}

function ResumenEstadoActividad() {
    $.get("/MonitoreoPIASAR/ListEstadoActividad?cod_dep=" + $("#ddlDepartamento").val() + "&cod_prov=" + $("#ddlProvincia").val() + "&cod_dist=" + $("#ddlDistrito").val() + "&snip=" + $("#txtSnip").val() + "&cui=" + $("#txtCUI").val(), function (data, status) {
        $("#tblEstadoActividad > tbody").empty();

        for (i = 0; i < data.data.length; i++) {

            var divOpcion = '<tr>';
            /*==========labels==============*/
            divOpcion = divOpcion + '<td style="width:450px;"><div class="project-contain"><h6>' + data.data[i].LOCALIDAD + '</h6><p class="text-muted"><i class="fa fa-map-marker f-12 m-r-10"></i>' + data.data[i].SNIP + "/" + data.data[i].CUI + "-" + data.data[i].DEPARTAMENTO + "/" + data.data[i].PROVINCIA + "/" + data.data[i].DISTRITO + '</p></td>';
            divOpcion = divOpcion + '<td style="text-align: center;">' + data.data[i].fecha_ult_act + '</td>';
            if (data.data[i].estado == 1) {
                divOpcion = divOpcion + '<td style="text-align: center;">' + '<i class="fa fa-check" style="font-size: 30px;color: #4CAF50;"></i>' + '</td>';
            }
            else if (data.data[i].estado == 2) {
                divOpcion = divOpcion + '<td style="text-align: center;">' + '<i class="fa fa-exclamation-triangle" style="font-size: 30px;color: #ffc107;"></i>' + '</td>';
            }
            else if (data.data[i].estado == 3) {
                divOpcion = divOpcion + '<td style="text-align: center;">' + '<i class="fa fa-times" style="font-size: 30px;color: #f44336;"></i>' + '</td>';
            }
            else if (data.data[i].estado == 4) {
                divOpcion = divOpcion + '<td style="text-align: center;">' + '<i class="fa fa-minus-circle" style="font-size: 30px;color: #9e9e9e;"></i>' + '</td>';
            }
            divOpcion = divOpcion + '</tr>';

            $("#tblEstadoActividad > tbody").append(divOpcion);
        }
    });
}

function VerEstadoActividad() {
    $("#modal-estadoactividad").modal({ backdrop: 'static', keyboard: true, show: true });
    $($.fn.dataTable.tables(true)).DataTable()
         .columns.adjust();
    ListEstadoActividad()
}
function ListEstadoActividad() {
    var tabla = $("#dtEstadoActividadList").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        //scrollX: true,
        paging: false,
        info: false,
        ordering: false,
        paging: true,
        order: [[4, "desc"]],
        ajax: {
            url: "/MonitoreoPIASAR/ListEstadoActividad?cod_dep=" + $("#ddlDepartamento").val() + "&cod_prov=" + $("#ddlProvincia").val() + "&cod_dist=" + $("#ddlDistrito").val() + "&snip=" + $("#txtSnip").val() + "&cui=" + $("#txtCUI").val(),
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
                 title: getNombreFile('rpt_Estado_Actividad_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_Estado_Actividad_')
             }
        ],
        columns: [
                    { "name": "", "title": "Departamento", "data": "DEPARTAMENTO", "autowidth": true },
                    { "name": "", "title": "Provincia", "data": "PROVINCIA", "autowidth": true },
                    { "name": "", "title": "Distrito", "data": "DISTRITO", "autowidth": true },
                    { "name": "", "title": "SNIP", "data": "SNIP", "autowidth": true },
                    { "name": "", "title": "CUI", "data": "CUI", "autowidth": true },
                    { "name": "", "title": "Proyecto", "data": "PROYECTO", "autowidth": true },
                    { "name": "", "title": "Localidad", "data": "LOCALIDAD", "autowidth": true },
                    { "name": "", "title": "Monto de Inversión", "data": "MTO_PROYECTO", "autowidth": true },
                    { "name": "", "title": "Total Autorización", "data": "TOTAL_AUTORIZACION", "autowidth": true },
                    { "name": "", "title": "Total Justificación", "data": "TOTAL_MANIFIESTO", "autowidth": true },
                    { "name": "", "title": "Fecha Ult. Act.", "data": "fecha_ult_act", "autowidth": true },
                    { "name": "", "title": "Estado", "data": "estado", "autowidth": true },
                    //{ "name": "", "title": "Estado", "data": null, "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 5,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return "<div class='text-wrap width-200'>" + full.PROYECTO + "</div>";//full.NombreCurso; 
                }
            },
            //{
            //    "targets": 7,
            //    "data": null,
            //    "className": "align-middle text-center",
            //    "mRender": function (data, type, full) {
            //        return formatMoney(full.MTO_PROYECTO);
            //    }
            //},
            //{
            //    "targets": 8,
            //    "data": null,
            //    "className": "align-middle text-center",
            //    "mRender": function (data, type, full) {
            //        return formatMoney(full.TOTAL_AUTORIZACION);
            //    }
            //},
            //{
            //    "targets": 9,
            //    "data": null,
            //    "className": "align-middle text-center",
            //    "mRender": function (data, type, full) {
            //        return formatMoney(full.TOTAL_MANIFIESTO);
            //    }
            //},
            {
                "targets": 11,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.estado == 1) {
                        return "En Actividad";//full.NombreCurso; 
                    }
                    else if (full.estado == 2) {
                        return "Sin Actividad por más de 30 días";//full.NombreCurso; 
                    }
                    else if (full.estado == 3) {
                        return "Sin Actividad por más de 60 días";//full.NombreCurso; 
                    }
                    else if (full.estado == 4) {
                        return "Sin Actividad";//full.NombreCurso; 
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
            $("#dtEstadoActividadList thead tr").css({ 'height': "0" });
        },
        initComplete: function (settings, json) {
            $("#dtEstadoActividadList thead tr").css({ 'height': "0" });
            $(".dataTables_scrollHeadInner").css("width", "100%");
            $(".table").css("width", "100%");
        },
    });
}

function GraficoHistorial() {
    $.get("/MonitoreoPIASAR/GraficoHistorial", function (data, status) {
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartHistorial", am4charts.XYChart);
            chart.language.locale = am4lang_es_ES;
            chart.language.locale["_decimalSeparator"] = ".";
            chart.language.locale["_thousandSeparator"] = ",";
            chart.language.locale["_date_month"] = "MMMM";
            // Increase contrast by taking evey second color
            chart.colors.step = 2;
            // Add data
            chart.data = data;
            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.minGridDistance = 40;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            function createAxisAndSeries(field, name, opposite, bullet) {

                //var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                //if (chart.yAxes.indexOf(valueAxis) != 0) {
                //    valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
                //}

                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "StringFechaActualizacion";
                series.strokeWidth = 3;
                series.yAxis = valueAxis;
                series.name = name;
                series.tooltipText = "{name}: [bold]{valueY}[/]";
                series.sequencedInterpolation = true;
                //series.tensionX = 0.8;
                //series.showOnInit = true;

                var interfaceColors = new am4core.InterfaceColorSet();

                switch (bullet) {
                    case "triangle":
                        var bullet = series.bullets.push(new am4charts.Bullet());
                        bullet.width = 12;
                        bullet.height = 12;
                        bullet.horizontalCenter = "middle";
                        bullet.verticalCenter = "middle";

                        var triangle = bullet.createChild(am4core.Triangle);
                        triangle.stroke = interfaceColors.getFor("background");
                        triangle.strokeWidth = 2;
                        triangle.direction = "top";
                        triangle.width = 12;
                        triangle.height = 12;
                        break;
                    case "rectangle":
                        var bullet = series.bullets.push(new am4charts.Bullet());
                        bullet.width = 10;
                        bullet.height = 10;
                        bullet.horizontalCenter = "middle";
                        bullet.verticalCenter = "middle";

                        var rectangle = bullet.createChild(am4core.Rectangle);
                        rectangle.stroke = interfaceColors.getFor("background");
                        rectangle.strokeWidth = 2;
                        rectangle.width = 10;
                        rectangle.height = 10;
                        break;
                    default:
                        var bullet = series.bullets.push(new am4charts.CircleBullet());
                        bullet.circle.stroke = interfaceColors.getFor("background");
                        bullet.circle.strokeWidth = 2;
                        break;
                }

                valueAxis.renderer.line.strokeOpacity = 1;
                valueAxis.renderer.line.strokeWidth = 2;
                valueAxis.renderer.line.stroke = series.stroke;
                valueAxis.renderer.labels.template.fill = series.stroke;
                valueAxis.renderer.opposite = false;
            }

            createAxisAndSeries("MontoTotalTransferido", "Total Transferencias", false, "circle");
            createAxisAndSeries("MontoTotalAutorizaciones", "Total Autorizaciones", false, "triangle");
            createAxisAndSeries("MontoTotalRendiciones", "Total Rendiciones", false, "rectangle");

            // Add legend
            chart.legend = new am4charts.Legend();

            // Add cursor
            chart.cursor = new am4charts.XYCursor();

        }); // end am4core.ready()
    });
}
function GraficoHistorialPorcentual() {
    $.get("/MonitoreoPIASAR/GraficoHistorial", function (data, status) {
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartHistorialPorcentual", am4charts.XYChart);
            chart.language.locale = am4lang_es_ES;
            chart.language.locale["_decimalSeparator"] = ".";
            chart.language.locale["_thousandSeparator"] = ",";
            chart.language.locale["_date_month"] = "MMMM";
            chart.numberFormatter.numberFormat = "###,###,###.##";

            chart.legend = new am4charts.Legend()
            chart.legend.position = 'top'
            chart.legend.paddingBottom = 20
            chart.legend.labels.template.maxWidth = 95
            // Increase contrast by taking evey second color
            chart.colors.step = 2;
            // Add data
            chart.data = data;

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "Mes";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 50;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "% Comparativo";
            valueAxis.title.fontWeight = 800;
            valueAxis.min = 0;
            valueAxis.max = 100;
            valueAxis.strictMinMax = true;
            valueAxis.renderer.labels.template.adapter.add("text", (text, label) => { return label.dataItem.value + "%"; })

            var series = chart.series.push(new am4charts.ColumnSeries())
            series.dataFields.valueY = 'MontoTransferidoPorcentaje'
            series.dataFields.categoryX = 'Mes'
            series.name = '% Total Transferido'

            series.tooltipText = "% Total Transferido en {categoryX}: [bold]{valueY}% ({MontoTotalTransferido})[/]";
            series.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series.columns.template.stroke = am4core.color("#333");
            series.columns.template.strokeWidth = 2;

            var series2 = chart.series.push(new am4charts.ColumnSeries())
            series2.dataFields.valueY = 'MontoAutorizacionesPorcentaje'
            series2.dataFields.categoryX = 'Mes'
            series2.name = '% Total de Autorizaciones de Gasto'

            series2.tooltipText ="% Total de Autorizaciones de Gasto en {categoryX}: [bold]{valueY}% ({MontoTotalAutorizaciones})[/]";
            series2.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series2.columns.template.stroke = am4core.color("#333");
            series2.columns.template.strokeWidth = 2;

            var series3 = chart.series.push(new am4charts.ColumnSeries())
            series3.dataFields.valueY = 'MontoRendicionesPorcentaje'
            series3.dataFields.categoryX = 'Mes'
            series3.name = '% Total de Rendiciones de Gasto'

            series3.tooltipText = "% Total de Rendiciones de Gasto en {categoryX}: [bold]{valueY}% ({MontoTotalRendiciones})[/]";
            series3.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series3.columns.template.stroke = am4core.color("#333");
            series3.columns.template.strokeWidth = 2;

            chart.cursor = new am4charts.XYCursor();
            chart.cursor.lineX.disabled = true;
            chart.cursor.lineY.disabled = true;

            // Create axes
            //var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            //dateAxis.renderer.minGridDistance = 40;

            //var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            //// Create series
            //function createAxisAndSeries(field, name, opposite, bullet) {

            //    //var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            //    //if (chart.yAxes.indexOf(valueAxis) != 0) {
            //    //    valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
            //    //}

            //    var series = chart.series.push(new am4charts.LineSeries());
            //    series.dataFields.valueY = field;
            //    series.dataFields.dateX = "StringFechaActualizacion";
            //    series.strokeWidth = 3;
            //    series.yAxis = valueAxis;
            //    series.name = name;
            //    series.tooltipText = "{name}: [bold]{valueY}[/]";
            //    series.tensionX = 0.8;
            //    series.showOnInit = true;

            //    var interfaceColors = new am4core.InterfaceColorSet();

            //    switch (bullet) {
            //        case "triangle":
            //            var bullet = series.bullets.push(new am4charts.Bullet());
            //            bullet.width = 12;
            //            bullet.height = 12;
            //            bullet.horizontalCenter = "middle";
            //            bullet.verticalCenter = "middle";

            //            var triangle = bullet.createChild(am4core.Triangle);
            //            triangle.stroke = interfaceColors.getFor("background");
            //            triangle.strokeWidth = 2;
            //            triangle.direction = "top";
            //            triangle.width = 12;
            //            triangle.height = 12;
            //            break;
            //        case "rectangle":
            //            var bullet = series.bullets.push(new am4charts.Bullet());
            //            bullet.width = 10;
            //            bullet.height = 10;
            //            bullet.horizontalCenter = "middle";
            //            bullet.verticalCenter = "middle";

            //            var rectangle = bullet.createChild(am4core.Rectangle);
            //            rectangle.stroke = interfaceColors.getFor("background");
            //            rectangle.strokeWidth = 2;
            //            rectangle.width = 10;
            //            rectangle.height = 10;
            //            break;
            //        default:
            //            var bullet = series.bullets.push(new am4charts.CircleBullet());
            //            bullet.circle.stroke = interfaceColors.getFor("background");
            //            bullet.circle.strokeWidth = 2;
            //            break;
            //    }

            //    valueAxis.renderer.line.strokeOpacity = 1;
            //    valueAxis.renderer.line.strokeWidth = 2;
            //    valueAxis.renderer.line.stroke = series.stroke;
            //    valueAxis.renderer.labels.template.fill = series.stroke;
            //    valueAxis.renderer.opposite = false;
            //}

            //createAxisAndSeries("MontoTransferidoPorcentaje", "% Total Transferido", false, "circle");
            //createAxisAndSeries("MontoAutorizacionesPorcentaje", "% Total Autorizaciones", false, "triangle");
            //createAxisAndSeries("MontoRendicionesPorcentaje", "% Total Rendiciones", false, "rectangle");

            //// Add legend
            //chart.legend = new am4charts.Legend();

            //// Add cursor
            //chart.cursor = new am4charts.XYCursor();

        }); // end am4core.ready()
    });
}

function EstadoFinanciero() {
    $.get("/MonitoreoPIASAR/ListResumenEstadoFinanciero", function (data, status) {
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartEstadoFinanciero", am4charts.PieChart);

            chart.innerRadius = am4core.percent(40);

            chart.legend = new am4charts.Legend();
            chart.legend.valueLabels.template.align = "right";
            chart.legend.valueLabels.template.textAlign = "end";
            // Add data
            chart.data = data;

            // Add and configure Series
            var series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "TotalPorEjecutar";
            series.dataFields.category = "Departamento";
            series.slices.template.stroke = am4core.color("#333");
            series.slices.template.strokeWidth = 2;
            series.ticks.template.disabled = true;
            series.labels.template.disabled = true;
            series.slices.template.propertyFields.fill = "fill";

            var label = chart.seriesContainer.createChild(am4core.Label);
            label.textAlign = "middle";
            label.horizontalCenter = "middle";
            label.verticalCenter = "middle";
            label.adapter.add("text", function (text, target) {
                var total = 0;
                for (var i = 0; i < series.dataItems._values.length; i++) {
                    total = total + series.dataItems._values[i].values.value.value;;
                }
                return "[font-size:14px]Por Ejecutar[/]\n[bold font-size:20px]" + AbreviarNumero(total) + "[/]";
            })

        }); // end am4core.ready()
    });
}
function VerEstadoFinanciero() {
    $("#modal-estadofinanciero").modal({ backdrop: 'static', keyboard: true, show: true });
    $($.fn.dataTable.tables(true)).DataTable()
         .columns.adjust();
    ListEstadoFinanciero();
}
function ListEstadoFinanciero() {
    var tabla = $("#dtEstadoFinanciero").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: false,
        //oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        scrollX: true,
        paging: false,
        info: false,
        ordering: false,
        paging: false,
        //pageLength: 12,
        //order: [[4, "desc"]],
        ajax: {
            url: "/MonitoreoPIASAR/ListResumenEstadoFinancieroCuadro",
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
                 title: getNombreFile('rpt_Estado_Financiero_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_Estado_Financiero_')
             }
        ],
        columns: [
                    { "name": "Departamento", "title": "Departamento", "data": "Departamento", "autowidth": true },
                    { "name": "Por Autorizar", "title": "Pendiente </br>de Autorización", "data": "PendienteAutorizacion", "autowidth": true },
                    { "name": "Por Rendi", "title": "Pendiente </br>de Rendición", "data": "PendienteRendicion", "autowidth": true },
                    { "name": "Por Ejecutar", "title": "Por Ejecutar", "data": "TotalPorEjecutar", "autowidth": true },
                    { "name": "% Por Ejecutar", "title": "% Por Ejecutar", "data": "PorcentajeTotalPorEjecutar", "autowidth": true },
                    { "name": "Acciones", "title": "Ver", "data": null, "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 1,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.PendienteAutorizacion);
                }
            },
            {
                "targets": 2,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.PendienteRendicion);
                }
            },
            {
                "targets": 3,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.TotalPorEjecutar);
                }
            },
            {
                "targets": 4,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.PorcentajeTotalPorEjecutar) + "%";
                }
            },
            {
                "targets": 5,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return '<button class="btn btn-primary btn-icon" style="width: 20px;height: 20px;line-height: 20px;" title="Ver Proyectos" onclick="VerProyectos(\'' + full.Departamento + '\')"><i class="fa fa-search f-18" style="margin-right:0px;"></i></button>';;
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
            $("#dtEstadoFinanciero thead tr").css({ 'height': "0" });
        },
        initComplete: function (settings, json) {
            $("#dtEstadoFinanciero thead tr").css({ 'height': "0" });
            $('#dtEstadoFinanciero tr:last').addClass("f-w-600");
            $('#dtEstadoFinanciero tr:last td:eq(5)').addClass("d-none");
            //$("#dtEstadoFinanciero tr:last").css({ 'background-color': 'rgba(0,0,0,.075)' });
        },
    });
}
function VerProyectos(dep) {
    $("#modal-proyectosestadofinanciero").modal({ backdrop: 'static', keyboard: true, show: true });
    $($.fn.dataTable.tables(true)).DataTable()
         .columns.adjust();
    ListProyectosEstadoFinanciero(dep);
}
function ListProyectosEstadoFinanciero(dep) {
    var tabla = $("#dtProyectosEstadoFinanciero").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: false,
        //oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        scrollX: true,
        paging: false,
        info: false,
        ordering: false,
        paging: false,
        //pageLength: 12,
        //order: [[4, "desc"]],
        ajax: {
            url: "/MonitoreoPIASAR/ListProyectosEstadoFinanciero?dep="+dep,
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
                 title: getNombreFile('rpt_Estado_Financiero_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_Estado_Financiero_')
             }
        ],
        columns: [
                   { "name": "", "title": "Nro.", "data": "Nro", "autowidth": true },
                   //{ "name": "", "title": "SNIP", "data": "Snip", "autowidth": true },
                   //{ "name": "", "title": "CUI", "data": "CUI", "autowidth": true },
                   { "name": "", "title": "Grupo", "data": "Grupo", "autowidth": true },
                   { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                   { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                   { "name": "", "title": "Total </br>Transferido", "data": "Desembolso", "autowidth": true },
                   { "name": "", "title": "Total </br>Autorizado </br>Aprobado", "data": "Autorizacion", "autowidth": true },
                   { "name": "", "title": "% Pendiente </br>de Autorización </br>(Autorizado/Transferido)", "data": "PorcentajePendienteAutorizacion", "autowidth": true },
                   { "name": "", "title": "Monto Pendiente </br> de Autorizar </br>(Total Transf. </br>-</br> Total Aut. Aprob.)", "data": "PendienteAutorizacion", "autowidth": true },
                   { "name": "", "title": "Total </br>Rendido </br>Aprobado", "data": "Manifiesto", "autowidth": true },
                   { "name": "", "title": "% Pendiente </br>de Rendición </br>(Rendido/Autorizado)", "data": "PorcentajePendienteRendicion", "autowidth": true },
                   { "name": "", "title": "Monto Pendiente </br> de Rendición </br>(Total Aut. Aprob.</br> - </br>Total Rend. Aprob.)", "data": "PendienteRendicion", "autowidth": true },
                   { "name": "", "title": "% de Avance </br> Fisico", "data": "PorcentajeAvanceFisico", "autowidth": true },
                   { "name": "", "title": "Liquidador", "data": "Liquidador", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 3,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.Localidad == "TOTAL") {
                        return '<strong>TOTAL</strong>';
                    } else {
                        return full.Localidad;
                    }
                }
            },
            {
                "targets": 4,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.Localidad == "TOTAL") {
                        return '<strong>' + formatMoney(full.Desembolso) + '</strong>';
                    } else {
                        return formatMoney(full.Desembolso);
                    }
                }
            },
            {
                "targets": 5,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.Localidad == "TOTAL") {
                        return '<strong>' + formatMoney(full.Autorizacion) + '</strong>';
                    } else {
                        return formatMoney(full.Autorizacion);
                    }
                }
            },
            {
                "targets": 6,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.Localidad == "TOTAL") {
                        return '';
                    } else {
                        return '% ' + formatMoney(full.PorcentajePendienteAutorizacion);
                    }
                    
                }
            },
            {
                "targets": 7,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.Localidad == "TOTAL") {
                        return '<strong>' + formatMoney(full.PendienteAutorizacion) + '</strong>';
                    } else {
                        return formatMoney(full.PendienteAutorizacion);
                    }
                }
            },
            {
                "targets": 8,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.Localidad == "TOTAL") {
                        return '<strong>' + formatMoney(full.Manifiesto) + '</strong>';
                    } else {
                        return formatMoney(full.Manifiesto);
                    }
                }
            },
            {
                "targets": 9,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.Localidad == "TOTAL") {
                        return '';
                    } else {
                        return '% ' + formatMoney(full.PorcentajePendienteRendicion);
                    }
                }
            },
            {
                "targets": 10,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    if (full.Localidad == "TOTAL") {
                        return '<strong>' + formatMoney(full.PendienteRendicion) + '</strong>';
                    } else {
                        return formatMoney(full.PendienteRendicion);
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
            $("#dtProyectosEstadoFinanciero thead tr").css({ 'height': "0" });
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            //var index = iDisplayIndex + 1;
            //$('td:eq(0)', nRow).html(index);
            //return nRow;
        },
        initComplete: function (settings, json) {
            $("#dtProyectosEstadoFinanciero thead tr").css({ 'height': "0" });
            
            //$('#dtEstadoFinanciero tr:last').addClass("f-w-600")
            //$('#dtEstadoFinanciero tr:last td:eq(5)').addClass("d-none")
        },
    });
}


function GraficoPendienteAutorizacion() {
    $.get("/MonitoreoPIASAR/ListResumenEstadoFinancieroGrafico", function (data, status) {
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartPendienteAutorizacion", am4charts.XYChart);
            chart.language.locale = am4lang_es_ES;
            chart.language.locale["_decimalSeparator"] = ".";
            chart.language.locale["_thousandSeparator"] = ",";
            chart.language.locale["_date_month"] = "MMMM";

            // Increase contrast by taking evey second color
            chart.colors.step = 1;
            // Add data
            chart.data = data;

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "Departamento";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 50;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Total Pendiente de Autorización";

            var series = chart.series.push(new am4charts.ColumnSeries())
            series.dataFields.valueY = 'PendienteAutorizacion'
            series.dataFields.categoryX = 'Departamento'

            series.tooltipText = "Total Pendiente de Autorización en {categoryX}: [bold]{valueY}[/]";
            series.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series.columns.template.stroke = am4core.color("#333");
            series.columns.template.strokeWidth = 2;

            chart.cursor = new am4charts.XYCursor();
            chart.cursor.lineX.disabled = true;
            chart.cursor.lineY.disabled = true;

        }); // end am4core.ready()
    });
}
function GraficoPendienteRendicion() {
    $.get("/MonitoreoPIASAR/ListResumenEstadoFinancieroGrafico", function (data, status) {
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartPendienteRendicion", am4charts.XYChart);
            chart.language.locale = am4lang_es_ES;
            chart.language.locale["_decimalSeparator"] = ".";
            chart.language.locale["_thousandSeparator"] = ",";
            chart.language.locale["_date_month"] = "MMMM";

            // Increase contrast by taking evey second color
            chart.colors.step = 1;
            // Add data
            chart.data = data;

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "Departamento";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 50;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Total Pendiente de Rendición";

            var series = chart.series.push(new am4charts.ColumnSeries())
            series.dataFields.valueY = 'PendienteRendicion'
            series.dataFields.categoryX = 'Departamento'

            series.tooltipText = "Total Pendiente de Rendición en {categoryX}: [bold]{valueY}[/]";
            series.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series.columns.template.stroke = am4core.color("#333");
            series.columns.template.strokeWidth = 2;

            chart.cursor = new am4charts.XYCursor();
            chart.cursor.lineX.disabled = true;
            chart.cursor.lineY.disabled = true;

        }); // end am4core.ready()
    });
}

function GraficoDesembolsoProgramado() {
    $.get("/MonitoreoPIASAR/GraficoDesembolsoProgramado?anio=" + 2021, function (data, status) {//$("#ddlAnioPMD").val()
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartProgramacionMensualDesembolsos", am4charts.XYChart);
            chart.language.locale = am4lang_es_ES;
            chart.language.locale["_decimalSeparator"] = ".";
            chart.language.locale["_thousandSeparator"] = ",";
            chart.language.locale["_date_month"] = "MMMM";
            chart.numberFormatter.numberFormat = "###,###,###.##";

            chart.legend = new am4charts.Legend()
            chart.legend.position = 'top'
            chart.legend.paddingBottom = 20
            chart.legend.labels.template.maxWidth = 95
            // Increase contrast by taking evey second color
            chart.colors.step = 2;
            // Add data
            chart.data = data;

            
            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "MesNombre";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 50;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Total";
            valueAxis.title.fontWeight = 800;
            //valueAxis.min = 0;
            //valueAxis.max = 100;
            valueAxis.strictMinMax = true;
            //valueAxis.renderer.labels.template.adapter.add("text", (text, label) => { return label.dataItem.value + "%"; })

            function CallDetalle(ev) {
                debugger;
                VerDesembolsoProgramado(ev.target.dataItem.dataContext.Mes)
            }

            var series = chart.series.push(new am4charts.ColumnSeries())
            series.dataFields.valueY = 'TotalProgramado'
            series.dataFields.categoryX = 'MesNombre'
            series.name = 'Total Programado'

            series.tooltipText = "Total Programado en {categoryX}: [bold]{valueY}[/]";
            series.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series.columns.template.stroke = am4core.color("#333");
            series.columns.template.strokeWidth = 2;
            series.columns.template.events.on("hit", CallDetalle, this);

            var series2 = chart.series.push(new am4charts.ColumnSeries())
            series2.dataFields.valueY = 'TotalEjecutado'
            series2.dataFields.categoryX = 'MesNombre'
            series2.name = 'Total Ejecutado'

            series2.tooltipText = "Total Ejecutado en {categoryX}: [bold]{valueY}[/]";
            series2.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            series2.columns.template.stroke = am4core.color("#333");
            series2.columns.template.strokeWidth = 2;
            series2.columns.template.events.on("hit", CallDetalle, this);

            chart.cursor = new am4charts.XYCursor();
            chart.cursor.lineX.disabled = true;
            chart.cursor.lineY.disabled = true;

        }); // end am4core.ready()
    });
}

function VerDesembolsoProgramado(mes) {
    $("#modal-ProgramacionMensualDesembolsos").modal({ backdrop: 'static', keyboard: true, show: true });
    var tabla = $("#dtProgramacionMensualDesembolsos").DataTable({
        processing: true,
        filter: true,
        destroy: true,
        searching: true,
        oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        scrollX: true,
        paging: false,
        info: false,
        ordering: true,
        paging: false,
        //pageLength: 12,
        //order: [[4, "desc"]],
        ajax: {
            url: "/MonitoreoPIASAR/ListDesembolsoProgramado?anio=2021&mes=" + mes,
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
                 title: getNombreFile('rpt_ProgramacionMensual_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_ProgramacionMensual_')
             }
        ],
        columns: [
                    { "name": "", "title": "CUI", "data": "CUI", "autowidth": true },
                    { "name": "", "title": "SNIP", "data": "SNIP", "autowidth": true },
                    { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                    { "name": "", "title": "Mes", "data": "MesNombre", "autowidth": true },
                    { "name": "", "title": "RO </br>Programado", "data": "ROProgramado", "autowidth": true },
                    { "name": "", "title": "ROOC </br>Programado", "data": "ROOCProgramado", "autowidth": true },
                    { "name": "", "title": "RO </br>Ejecutado", "data": "RO", "autowidth": true },
                    { "name": "", "title": "ROOC </br>Ejecutado", "data": "ROOC", "autowidth": true },
                    { "name": "", "title": "Total </br>Programado", "data": "TotalProgramado", "autowidth": true },
                    { "name": "", "title": "Total </br>Ejecutado", "data": "TotalEjecutado", "autowidth": true },
                    { "name": "", "title": "Diferencia", "data": "Diferencia", "autowidth": true },
        ],
        columnDefs: [
            {
                "targets": 4,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.ROProgramado);
                }
            },
            {
                "targets":5,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.ROOCProgramado);
                }
            },
            {
                "targets": 6,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.RO);
                }
            },
            {
                "targets": 7,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.ROOC);
                }
            },
             {
                 "targets": 8,
                 "data": null,
                 "className": "align-middle text-center",
                 "mRender": function (data, type, full) {
                     return formatMoney(full.TotalProgramado);
                 }
             },
             {
                 "targets": 9,
                 "data": null,
                 "className": "align-middle text-center",
                 "mRender": function (data, type, full) {
                     return formatMoney(full.TotalEjecutado);
                 }
             },
             {
                 "targets": 10,
                 "data": null,
                 "className": "align-middle text-center",
                 "mRender": function (data, type, full) {
                     return formatMoney(full.Diferencia);
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
            $("#dtProgramacionMensualDesembolsos thead tr").css({ 'height': "0" });
        },
        initComplete: function (settings, json) {
            $("#dtProgramacionMensualDesembolsos thead tr").css({ 'height': "0" });
        },
    });
}

function VerObrasPendientesGiro() {
    $("#modal-PendientesGiro").modal({ backdrop: 'static', keyboard: true, show: true });
    $($.fn.dataTable.tables(true)).DataTable()
        .columns.adjust();
    ListPendientesGiro();
}
function ListPendientesGiro() {
    var tabla = $("#dtPendientesGiro").DataTable({
        processing: true,
        filter: false,
        destroy: true,
        searching: false,
        //oSearch: { "bSmart": false, "bRegex": true },
        //responsive: true,
        fixedColumns: true,
        scrollCollapse: true,
        scrollX: true,
        paging: false,
        info: false,
        ordering: false,
        paging: false,
        //pageLength: 12,
        //order: [[4, "desc"]],
        ajax: {
            url: "/MonitoreoPIASAR/ListMontoGiradoPendiente",
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
                 title: getNombreFile('rpt_PendienteGiro_')
             },
             {
                 text: '<span class="fa fa-clipboard"></span> Copiar',
                 className: 'btn btn-mat btn-warning mr-1 mb-2',
                 extend: 'copy',
                 title: getNombreFile('rpt_PendienteGiro_')
             }
        ],
        columns: [
                   { "name": "", "title": "Nro.", "data": "Nro", "autowidth": true },
                   { "name": "", "title": "SNIP", "data": "Snip", "autowidth": true },
                   { "name": "", "title": "CUI", "data": "CUI", "autowidth": true },
                   { "name": "", "title": "Departamento", "data": "Departamento", "autowidth": true },
                   { "name": "", "title": "Localidad", "data": "Localidad", "autowidth": true },
                   { "name": "", "title": "Costo de Inversión", "data": "Mto_proyecto", "autowidth": true },
                   { "name": "", "title": "Total </br>Transferido", "data": "Desembolso", "autowidth": true },
                   { "name": "", "title": "Monto Pendiente </br> de Transferir", "data": "MontoPendienteTransferir", "autowidth": true },
                   { "name": "", "title": "% Pendiente </br>de Transferir", "data": "PorcentajePendienteTransferir", "autowidth": true },
                   { "name": "", "title": "Liquidador", "data": "Liquidador", "autowidth": true },
        ],
        columnDefs: [

            {
                "targets": 5,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Mto_proyecto);
                }
            },
            {
                "targets": 6,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.Desembolso);
                }
            },
            {
                "targets": 7,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.MontoPendienteTransferir);
                }
            },
            {
                "targets": 8,
                "data": null,
                "className": "align-middle text-center",
                "mRender": function (data, type, full) {
                    return formatMoney(full.PorcentajePendienteTransferir) + "%";
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
            $("#dtPendientesGiro thead tr").css({ 'height': "0" });
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            //var index = iDisplayIndex + 1;
            //$('td:eq(0)', nRow).html(index);
            //return nRow;
        },
        initComplete: function (settings, json) {
            $("#dtPendientesGiro thead tr").css({ 'height': "0" });
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

function clase_bg_aleatoria() {
    var textos = new Array() 
    textos[0] = "bg-c-blue";
    textos[1] = "bg-c-pink";
    textos[2] = "bg-c-yellow";
    textos[3] = "bg-c-green";

    
    aleat = Math.floor(Math.random() * (textos.length - 0) + 0);

    return textos[aleat];
}


function ObtenerInfoSSI(){
    //var i, mes;
    //var uep_anio, uep_desc, mto_dev_uep, fec_act, fec_act_conv;
    //var tot_pf_ini, tot_pf_act, tot_avanc, acum_prog, acum_real, acum_pini, tip_graf;
    //var fecrep = new Date(), mes_proc, mes_abr, mto_max_cr, fec_ejec, fec_ejec_conv;
    //var img_url;
    //var por_mviab, mto_viab, pim_mes, fec_per;

    //$("#divPreload").show();

    //obt_param_rep();
    //cu_enc = 0;
    //ind_img_64 = 0;
    //most_inicio();
    //$('#tb_fye').show();
  
    var cod_unico = '2289970';
    var tip_busc = 'SIAF';

    $.ajax({
        url: "https://ofi5.mef.gob.pe/ssi/ssi/Index?codigo=2202941&tipo=2",
        dataType: "jsonp",
        jsonpCallback: "logResults"
    });
                //$("#divprueba").attr("src", "https://ofi5.mef.gob.pe/invierte/ejecucion/traeListaEjecucionSimplePublica/2202941");
                //$("#divprueba").attr("src", "https://ofi5.mef.gob.pe/ssi/ssi/inviertews/Dashboard/traeDetInvSSI?id=2202941&tipo=SIAF");
                //$("#divprueba").attr("src", "https://ofi5.mef.gob.pe/ssi/ssi/Index?codigo=2202941&tipo=2");

                //$('#divprueba').on('load', function () {
                //    // code will run after iframe has finished loading
                //    debugger;
                //    //alert($("#val_cta").text());
                //    //var colorin = parent.frames[0].document
                //    document.domain = "ofi5.mef.gob.pe";
                //    var iFrame = document.getElementById('divprueba');
                //    iFrameBody = iFrame.contentWindow.document.getElementsByTagName('body')[0];
                //    //var iFrameBody;
                //    //if (iFrame.contentDocument) { // FF
                //    //    iFrameBody = iFrame.contentDocument.getElementsByTagName('body')[0];
                //    //}
                //    //else if (iFrame.contentWindow) { // IE
                //    //    iFrameBody = iFrame.contentWindow.document.getElementsByTagName('body')[0];
                //    //}
                //    //alert(iFrameBody.innerHTML);
                //});

            }
function logResults(json) {
    debugger;
    console.log(json);
}
