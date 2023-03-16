var max = 0;

$(document).ready(function () {
    if (getUrlParameter('Anio') != "") {
        $('#hdnAnio').val(getUrlParameter('Anio'))
        $('#AnioEjecucion').html(getUrlParameter('Anio'));

        if (getUrlParameter('Anio') == 2022) {
            max = 700;
        } else {
            max = 350;
        }
    };
    ListSeguimiento();
});


function ListSeguimiento() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/MonitoreoObrasContrataPIASAR/ListMonitoreoGeneralPorEquipos?anio=" + $('#hdnAnio').val(), function (data, status) {

        var seguimiento = [];

        $("tr[name='rows']").remove();
        var Index = 1;
        var rownumber = 1;

        var MetaMes_CT = 0.00;
        var ResultadoMes_CT = 0.00;
        //var PorcentajeMes_CT = 0.00;
        var MetaMes_CA = 0.00;
        var ResultadoMes_CA = 0.00;
        //var PorcentajeMes_CA = 0.00;
        var MetaMes_C2 = 0.00;
        var ResultadoMes_C2 = 0.00;
        //var PorcentajeMes_C2 = 0.00;
        var MetaMes_T = 0.00;
        var ResultadoMes_T = 0.00;
        //var PorcentajeMes_T = 0.00;

        for (var a = 0; a < data.length; a++) {


            var divOpcion = '<tr name="rows">';
            /*==========labels==============*/
            divOpcion = divOpcion + '<td class="align-middle text-center">' + rownumber + '</td>';
            divOpcion = divOpcion + '<td class="align-middle" style="background-color:rgb(255,242,204)">' + data[a].MesS + '</td>';
            divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].MetaMes_CT) + '</td>';
            divOpcion = divOpcion + '<td class="align-middle text-center" style="background-color:rgb(252,228,214)">' + formatMoney(data[a].ResultadoMes_CT) + '</td>';
            divOpcion = divOpcion + '<td class="align-middle text-center" style="background-color:rgb(248,203,173)">' + formatMoney(data[a].PorcentajeMes_CT) + '</td>';
            divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].MetaMes_CA) + '</td>';
            divOpcion = divOpcion + '<td class="align-middle text-center" style="background-color:rgb(252,228,214)">' + formatMoney(data[a].ResultadoMes_CA) + '</td>';
            divOpcion = divOpcion + '<td class="align-middle text-center" style="background-color:rgb(248,203,173)">' + formatMoney(data[a].PorcentajeMes_CA) + '</td>';
            divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].MetaMes_C2) + '</td>';
            divOpcion = divOpcion + '<td class="align-middle text-center" style="background-color:rgb(252,228,214)">' + formatMoney(data[a].ResultadoMes_C2) + '</td>';
            divOpcion = divOpcion + '<td class="align-middle text-center" style="background-color:rgb(248,203,173)">' + formatMoney(data[a].PorcentajeMes_C2) + '</td>';
            divOpcion = divOpcion + '<td class="align-middle text-center">' + formatMoney(data[a].MetaMes_T) + '</td>';
            divOpcion = divOpcion + '<td class="align-middle text-center" style="background-color:rgb(252,228,214)">' + formatMoney(data[a].ResultadoMes_T) + '</td>';
            divOpcion = divOpcion + '<td class="align-middle text-center" style="background-color:rgb(248,203,173)">' + formatMoney(data[a].PorcentajeMes_T) + '%</td>';
            divOpcion = divOpcion + '<td class="align-middle text-center"><button class="btn btn-primary btn-icon" title="Ver" onclick="Ver(' + data[a].Mes + ',\'' + data[a].fecha + '\')"><i class="fa fa-search f-18" style="margin-right:0px;"></i></button></td>';
            divOpcion = divOpcion + '</tr>';
            //$("#dtMonitoreo > tbody").eq(Index).after(divOpcion);
            $("#dtMonitoreo").find('tbody').append(divOpcion);
            Index++;
            rownumber++;

            MetaMes_CT = MetaMes_CT + data[a].MetaMes_CT;
            ResultadoMes_CT = ResultadoMes_CT + data[a].ResultadoMes_CT;
            MetaMes_CA = MetaMes_CA + data[a].MetaMes_CA;
            ResultadoMes_CA = ResultadoMes_CA + data[a].ResultadoMes_CA;
            MetaMes_C2 = MetaMes_C2 + data[a].MetaMes_C2;
            ResultadoMes_C2 = ResultadoMes_C2 + data[a].ResultadoMes_C2;
            MetaMes_T = MetaMes_T + data[a].MetaMes_T;
            ResultadoMes_T = ResultadoMes_T + data[a].ResultadoMes_T;

            var s = {
                Mes:data[a].MesAnio,
                CT: data[a].PorcentajeMes_CT,
                CA: data[a].PorcentajeMes_CA,
                C2: data[a].PorcentajeMes_C2
            }
            seguimiento.push(s);
        }

        var PorcentajeMes_CT = ((ResultadoMes_CT / MetaMes_CT) * 100) == Infinity ? 100 : (ResultadoMes_CT / MetaMes_CT) * 100;
        var PorcentajeMes_CA = ((ResultadoMes_CA / MetaMes_CA) * 100) == Infinity ? 100 : (ResultadoMes_CA / MetaMes_CA) * 100;
        var PorcentajeMes_C2 = ((ResultadoMes_C2 / MetaMes_C2) * 100) == Infinity ? 100 : (ResultadoMes_C2 / MetaMes_C2) * 100;
        var PorcentajeMes_T = ((ResultadoMes_T / MetaMes_T) * 100) == Infinity ? 100 : (ResultadoMes_T / MetaMes_T) * 100;

        var divOpcion = '<tr name="rows" style="background-color:rgb(255,242,204)">';
        /*==========labels==============*/
        divOpcion = divOpcion + '<td class="align-middle text-center" colspan="2">Total</td>';
        divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(MetaMes_CT) + '</td>';
        divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(ResultadoMes_CT) + '</td>';
        divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(PorcentajeMes_CT) + '</td>';
        divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(MetaMes_CA) + '</td>';
        divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(ResultadoMes_CA) + '</td>';
        divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(PorcentajeMes_CA) + '</td>';
        divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(MetaMes_C2) + '</td>';
        divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(ResultadoMes_C2) + '</td>';
        divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(PorcentajeMes_C2) + '</td>';
        divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(MetaMes_T) + '</td>';
        divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(ResultadoMes_T) + '</td>';
        divOpcion = divOpcion + '<td class="align-middle">' + formatMoney(PorcentajeMes_T) + '</td>';
        divOpcion = divOpcion + '</tr>';
        //$("#dtMonitoreo > tbody").eq(Index).after(divOpcion);
        $("#dtMonitoreo").find('tbody').append(divOpcion);



        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartSeguimiento", am4charts.XYChart);
            chart.numberFormatter.numberFormat = "###,###,###.##";
            // Add data
            chart.data = seguimiento;

            //Legend
            chart.legend = new am4charts.Legend()
            chart.legend.position = 'bottom'
            chart.legend.paddingBottom = 20
            chart.legend.labels.template.maxWidth = 95
            chart.legend.itemContainers.template.events.on("over", function (event) {
                var segments = event.target.dataItem.dataContext.segments;
                segments.each(function (segment) {
                    segment.isHover = true;
                })
            })

            chart.legend.itemContainers.template.events.on("out", function (event) {
                var segments = event.target.dataItem.dataContext.segments;
                segments.each(function (segment) {
                    segment.isHover = false;
                })
            })

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "Mes";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 50;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "% de Ejecución";
            valueAxis.title.fontWeight = 800;
            valueAxis.min = 0;
            valueAxis.max = max;
            valueAxis.strictMinMax = true;
            valueAxis.renderer.labels.template.adapter.add("text", (text, label) => { return label.dataItem.value + "%"; })

            // Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "CT";
            series.dataFields.categoryX = "Mes";
            series.name = "C1 (Coordinación Técnica)";

            series.tooltipText = "{name} [{categoryX}]: {valueY} %";
            series.legendSettings.valueText = "{valueY}";
            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color("#28a745");

            var bullet = series.bullets.push(new am4charts.CircleBullet());
            series.stroke = am4core.color("#28a745");
            bullet.stroke = am4core.color("#28a745");
            bullet.fill = am4core.color("#28a745");

            var series2 = chart.series.push(new am4charts.LineSeries());
            series2.dataFields.valueY = "CA";
            series2.dataFields.categoryX = "Mes";
            series2.name = "C3 (Coordinación Administrativa)";

            series2.tooltipText = "{name} [{categoryX}]: {valueY} %";
            series2.legendSettings.valueText = "{valueY}";
            series2.tooltip.getFillFromObject = false;
            series2.tooltip.background.fill = am4core.color("#4099ff");

            var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
            series2.stroke = am4core.color("#4099ff");
            bullet2.stroke = am4core.color("#4099ff");
            bullet2.fill = am4core.color("#4099ff");

            var series3 = chart.series.push(new am4charts.LineSeries());
            series3.dataFields.valueY = "C2";
            series3.dataFields.categoryX = "Mes";
            series3.name = "C2 (CT-CA)";

            series3.tooltipText = "{name} [{categoryX}]: {valueY} %";
            series3.legendSettings.valueText = "{valueY}";
            series3.tooltip.getFillFromObject = false;
            series3.tooltip.background.fill = am4core.color("#3f51b5");

            var bullet3 = series3.bullets.push(new am4charts.CircleBullet());
            series3.stroke = am4core.color("#3f51b5");
            bullet3.stroke = am4core.color("#3f51b5");
            bullet3.fill = am4core.color("#3f51b5");

            // Add cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "zoomY";
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = categoryAxis;
            chart.cursor.lineX.strokeWidth = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;

            // Add scrollbar
            //chart.scrollbarX = new am4core.Scrollbar();

            let hs1 = series.segments.template.states.create("hover")
            hs1.properties.strokeWidth = 5;
            series.segments.template.strokeWidth = 1;

            let hs2 = series2.segments.template.states.create("hover")
            hs2.properties.strokeWidth = 5;
            series2.segments.template.strokeWidth = 1;

            let hs3 = series3.segments.template.states.create("hover")
            hs3.properties.strokeWidth = 5;
            series3.segments.template.strokeWidth = 1;

            // Add a guide
            let range = valueAxis.axisRanges.create();
            range.value = 100;
            range.grid.stroke = am4core.color("#396478");
            range.grid.strokeWidth = 2;
            range.grid.strokeOpacity = 1;
            range.grid.strokeDasharray = "3,3";
            range.label.inside = true;
            range.label.text = "Average";
            range.label.fill = range.grid.stroke;
            range.label.verticalCenter = "bottom";

        }); // end am4core.ready()

        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart2 = am4core.create("chartComparativo", am4charts.XYChart);
            chart2.language.locale = am4lang_es_ES;
            chart2.language.locale["_decimalSeparator"] = ".";
            chart2.language.locale["_thousandSeparator"] = ",";
            chart2.language.locale["_date_month"] = "MMMM";
            chart2.numberFormatter.numberFormat = "###,###,###.##";

            chart2.legend = new am4charts.Legend()
            chart2.legend.position = 'top'
            chart2.legend.paddingBottom = 20
            chart2.legend.labels.template.maxWidth = 95
            // Increase contrast by taking evey second color
            //chart.colors.step = 8;
            // Add data
            chart2.data = [{
                "componente": "C1(Coordinación Técnica)",
                "porcentage": PorcentajeMes_CT,
                "monto": ResultadoMes_CT,
                "fill": "#28a745"
            }, {
                "componente": "C2(CT-CA)",
                "porcentage": PorcentajeMes_C2,
                "monto": ResultadoMes_C2,
                "fill": "#3f51b5"
            }, {
                "componente": "C3(Coordinación Administrativa)",
                "porcentage": PorcentajeMes_CA,
                "monto": ResultadoMes_CA,
                "fill": "#4099ff"
            }];


            // Create axes
            var categoryAxis = chart2.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "componente";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 50;

            var valueAxis = chart2.yAxes.push(new am4charts.ValueAxis());
            //valueAxis.title.text = "Total";
            valueAxis.title.fontWeight = 800;
            valueAxis.min = 0;
            valueAxis.max = 120;
            valueAxis.strictMinMax = true;
            valueAxis.renderer.labels.template.adapter.add("text", (text, label) => { return label.dataItem.value + "%"; })

            var series = chart2.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = 'porcentage';
            series.dataFields.categoryX = 'componente';
            series.name = '% Total Ejecutado';
            series.tooltipText = "{categoryX}: [bold]{valueY}% (S/.{monto})[/]";
            series.columns.template.propertyFields.fill = "fill";

            // Add a guide
            let range = valueAxis.axisRanges.create();
            range.value = 100;
            range.grid.stroke = am4core.color("#396478");
            range.grid.strokeWidth = 2;
            range.grid.strokeOpacity = 1;
            range.grid.strokeDasharray = "3,3";
            range.label.inside = true;
            range.label.text = "100%";
            range.label.fill = range.grid.stroke;
            range.label.verticalCenter = "bottom";

            chart2.cursor = new am4charts.XYCursor();
            chart2.cursor.lineX.disabled = true;
            chart2.cursor.lineY.disabled = true;

        }); // end am4core.ready()

        $.unblockUI();
    });

}

function Ver(mes,fecha) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/SeguimientoEjecucionProyectosInversion/ListSeguimiento?Anio=" + $('#hdnAnio').val() + "&Mes=" + mes + "&fecha=" + fecha, function (data, status) {
        var first = data[0];

        if (first.AnioEjecucion != 0) {
            let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            $('#spnAnioExport').html(first.AnioEjecucion);
            $('#spnMesExport').html(meses[first.Mes - 1]);
            $('#spnAnioMesPEExport').html(meses[first.Mes - 1] + " " + first.AnioEjecucion);
            $('#spnAnioMesDAExport').html(meses[first.Mes - 1] + " " + first.AnioEjecucion);
            $('#spnFechaExport').html(first.FechaString);
        }

        $("tr[name='rowExport_PC2019']").remove();
        $("tr[name='rowExport_PC2020']").remove();
        $("tr[name='rowExport_C2']").remove();
        $("tr[name='rowExport_CA']").remove();

        var Index = 1;
        var rownumber = 1;
        var area = "";
        for (var i = 1; i <= 4; i++) {

            var grupo = data.filter(x => x.CodGrupo == i);
            var nomgru = "";
            if (i == 1) {
                nomgru = "PC2019";
                area = "CT";
            }
            else if (i == 2) {
                nomgru = "PC2020";
                Index = Index + 1;
                rownumber = 1;
                area = "CT";
            }
            else if (i == 3) {
                Index = Index + 1;
                rownumber = 1;
                nomgru = "C2";
                area = "CT";
            }
            else if (i == 4) {
                Index = Index + 2;
                rownumber = 1;
                nomgru = "CA";
                area = "CA";
            }


            for (var a = 0; a < grupo.length; a++) {


                var divOpcion = '<tr name="rowExport_' + nomgru + '">';

                /*==========labels==============*/
                divOpcion = divOpcion + '<td class="align-middle text-center">' + rownumber + '</td>';
                divOpcion = divOpcion + '<td class="align-middle">' + grupo[a].dgpp + '</td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text">' + grupo[a].ProyectoInversion + '</td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnPIM" id="spnPIM_' + nomgru + '_' + a + '">' + formatMoney(grupo[a].PIM) + '</span></td>';
                /*==========Text==============*/
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnProgramado_' + nomgru + '" id="spnProgramacion_' + nomgru + '_' + a + '">' + formatMoney(grupo[a].ProgramadoMes) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnProgramadoSemana_' + nomgru + '_1" id="spnProgramadoSemana_' + nomgru + '_1_' + a + '">' + formatMoney(grupo[a].ProgramadoSemanaUno) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnEjecutadoSemana_' + nomgru + '_1" id="spnEjecutadoSemana_' + nomgru + '_1_' + a + '">' + formatMoney(grupo[a].EjecutadoSemanaUno) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnProgramadoSemana_' + nomgru + '_2" id="spnProgramadoSemana_' + nomgru + '_2_' + a + '">' + formatMoney(grupo[a].ProgramadoSemanaDos) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnEjecutadoSemana_' + nomgru + '_2" id="spnEjecutadoSemana_' + nomgru + '_2_' + a + '">' + formatMoney(grupo[a].EjecutadoSemanaDos) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnProgramadoSemana_' + nomgru + '_3" id="spnProgramadoSemana_' + nomgru + '_3_' + a + '">' + formatMoney(grupo[a].ProgramadoSemanaTres) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnEjecutadoSemana_' + nomgru + '_3" id="spnEjecutadoSemana_' + nomgru + '_3_' + a + '">' + formatMoney(grupo[a].EjecutadoSemanaTres) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnProgramadoSemana_' + nomgru + '_4" id="spnProgramadoSemana_' + nomgru + '_4_' + a + '">' + formatMoney(grupo[a].ProgramadoSemanaCuatro) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnEjecutadoSemana_' + nomgru + '_4" id="spnEjecutadoSemana_' + nomgru + '_4_' + a + '">' + formatMoney(grupo[a].EjecutadoSemanaCuatro) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnProgramadoSemana_' + nomgru + '_5" id="spnProgramadoSemana_' + nomgru + '_5_' + a + '">' + formatMoney(grupo[a].ProgramadoSemanaCinco) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnEjecutadoSemana_' + nomgru + '_5" id="spnEjecutadoSemana_' + nomgru + '_5_' + a + '">' + formatMoney(grupo[a].EjecutadoSemanaCinco) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spntotalProgramadoFila_' + nomgru + '_6" id="spnTotalProgramadoFila_' + nomgru + '_6_' + a + '">' + formatMoney(grupo[a].TotalProgramado) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnAl_' + area + '" id="spnAl_' + area + '_7_' + a + '">' + formatMoney(grupo[a].DevengadoAcumulado) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnDiferencia_' + area + '" id="spnDiferenciaGasto_' + area + '_8_' + a + '" >' + formatMoney(grupo[a].DiferenciaGasto) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span name="spnPorcentaje_' + area + '" id="spnPorcentajeAvanceGasto_' + area + '_9_' + a + '">' + formatMoney(grupo[a].PorcentajeAvanceGasto) + '</span></td>';
                divOpcion = divOpcion + '<td class="align-middle wrap-text"><span id="spnDetalleGasto_' + area + '_10_' + a + '">' + grupo[a].DetalleGastoMensual + '</span></td>';
                divOpcion = divOpcion + '</tr>';
                $("#dtExportar > tbody > tr").eq(Index).after(divOpcion);
                Index++;
                rownumber++;
            }
        }

        calcularTotalesExport();

        $.unblockUI();

        $("#modal-seguimiento").modal({ backdrop: 'static', keyboard: true, show: true });
    });

}

function calcularTotalesExport() {

    //CALCULAR PIM
    var total = 0;
    var titles = $('[name^=spnPIM]').map(function (idx, elem) {
        return $(elem).html();
    }).get();
    for (i = 0; i < titles.length; i++) {
        if (titles[i] != "") {
            total = total + parseFloat(titles[i].replaceAll(",", ""));
        }
    }
    $('#spnTotalPIM_F_0').html(formatMoney(total));
    //FIN CALCULAR PIM

    //CALCULAR PROGRAMADO
    var grupo = "";
    for (var a = 1; a <= 4; a++) {

        if (a == 1) { grupo = "PC2019"; } else if (a == 2) { grupo = "PC2020"; } else if (a == 3) { grupo = "C2"; } else if (a == 4) { grupo = "CA"; }

        var total = 0;
        var titles = $('[name^=spnProgramado_' + grupo + ']').map(function (idx, elem) {
            return $(elem).html();
        }).get();

        for (i = 0; i < titles.length; i++) {
            if (titles[i] != "") {
                total = total + parseFloat(titles[i].replaceAll(",", ""));
            }
        }
        //Llena Subtotales
        if (grupo != "CA") {
            $('#spnTotalProgramacion_' + grupo + '_0').html(formatMoney(total));

            var PC2019 = parseFloat($('#spnTotalProgramacion_PC2019_0').html().replaceAll(",", ""));
            var PC2020 = parseFloat($('#spnTotalProgramacion_PC2020_0').html().replaceAll(",", ""));
            var C2 = parseFloat($('#spnTotalProgramacion_C2_0').html().replaceAll(",", ""));

            $('#spnTotalProgramacion_STCT_0').html(formatMoney(PC2019 + PC2020 + C2));
        } else {
            $('#spnTotalProgramacion_STCA_0').html(formatMoney(total));
        }

        //Llena total
        var STCT = parseFloat($('#spnTotalProgramacion_STCT_0').html().replaceAll(",", ""));
        var STCA = parseFloat($('#spnTotalProgramacion_STCA_0').html().replaceAll(",", ""));

        $('#spnTotalProgramacion_F_1').html(formatMoney(STCT + STCA));


    }
    //FIN CALCULAR PROGRAMADO

    //CALCULAR PROGRAMADO Y EJECUTADO
    for (var a = 1; a <= 4; a++) {

        if (a == 1) { grupo = "PC2019"; } else if (a == 2) { grupo = "PC2020"; } else if (a == 3) { grupo = "C2"; } else if (a == 4) { grupo = "CA"; }

        /*----------------------------------TOTAL PROGRAMADO COLUMNA--------------------------*/

        var totalP = 0;
        var titlesP = $('[name^=spntotalProgramadoFila_' + grupo + '_6]').map(function (idx, elem) {
            return $(elem).html();
        }).get();
        for (i = 0; i < titlesP.length; i++) {
            if (titlesP[i] != "") {
                totalP = totalP + parseFloat(titlesP[i].replaceAll(",", ""));
            }
        }

        $('#spnTotalProgramado_' + grupo + '_6').html(formatMoney(totalP));

        //SUMA SUBTOTAL PROGRAMADO

        //Llena Subtotal columna
        if (grupo != "CA") {

            var PC2019 = parseFloat($('#spnTotalProgramado_PC2019_6').html().replaceAll(",", ""));
            var PC2020 = parseFloat($('#spnTotalProgramado_PC2020_6').html().replaceAll(",", ""));
            var C2 = parseFloat($('#spnTotalProgramado_C2_6').html().replaceAll(",", ""));

            $('#spnTotalProgramado_STCT_6').html(formatMoney(PC2019 + PC2020 + C2));
        } else {
            $('#spnTotalProgramado_STCA_6').html(formatMoney(totalP));
        }

        //LLENA TOTAL PROGRAMADO FINAL
        var totalproCT = parseFloat($('#spnTotalProgramado_STCT_6').html().replaceAll(",", ""));
        var totalproCA = parseFloat($('#spnTotalProgramado_STCA_6').html().replaceAll(",", ""));

        $('#spnTotalProgramado_F_6').html(formatMoney(totalproCT + totalproCA));
        /*----------------------------------FINAL TOTAL PROGRAMADO COLUMNA--------------------------*/
    }
    //CALCULAR PROGRAMADO Y EJECUTADO SEMANAL
    for (var a = 1; a <= 4; a++) {

        if (a == 1) { grupo = "PC2019"; } else if (a == 2) { grupo = "PC2020"; } else if (a == 3) { grupo = "C2"; } else if (a == 4) { grupo = "CA"; }
        var semana = 0;
        for (var e = 1; e <= 5; e++) {

            semana = e;
            var tipo = ""

            for (var o = 1; o <= 2; o++) {
                if (o == 1) { tipo = "Programado"; } else if (o == 2) { tipo = "Ejecutado"; }

                var area = "";

                for (var u = 1; u <= 2; u++) {

                    if (u == 1) { area = "CT"; } else if (u == 2) { area = "CA"; }

                    var total = 0;
                    var titles = $('[name^=spn' + tipo + 'Semana_' + grupo + '_' + semana + ']').map(function (idx, elem) {
                        return $(elem).html();
                    }).get();
                    for (i = 0; i < titles.length; i++) {
                        if (titles[i] != "") {
                            total = total + parseFloat(titles[i].replaceAll(",", ""));
                        }
                    }

                    //Llena Subtotal columna
                    if (area == "CT") {
                        $('#spnTotal' + tipo + 'Semana_' + grupo + '_' + semana).html(formatMoney(total));

                        var PC2019 = parseFloat($('#spnTotal' + tipo + 'Semana_PC2019_' + semana).html().replaceAll(",", ""));
                        var PC2020 = parseFloat($('#spnTotal' + tipo + 'Semana_PC2020_' + semana).html().replaceAll(",", ""));
                        var C2 = parseFloat($('#spnTotal' + tipo + 'Semana_C2_' + semana).html().replaceAll(",", ""));

                        $('#spnTotal' + tipo + 'Semana_ST' + area + '_' + semana).html(formatMoney(PC2019 + PC2020 + C2));
                    } else {
                        $('#spnTotal' + tipo + 'Semana_ST' + area + '_' + semana).html(formatMoney(total));
                    }

                    //Llena total columna
                    var STCT = parseFloat($('#spnTotal' + tipo + 'Semana_STCT_' + semana).html().replaceAll(",", ""));
                    var STCA = parseFloat($('#spnTotal' + tipo + 'Semana_STCA_' + semana).html().replaceAll(",", ""));

                    $('#spnTotal' + tipo + 'Semana_F_' + semana).html(formatMoney(STCT + STCA));

                }
            }
        }

    }
    //FIN CALCULAR PROGRAMADO Y EJECUTADO SEMANAL

    //CALCULAR DEVENGADO
    var area = "";
    for (var i = 1; i <= 2; i++) {
        if (i == 1) { area = "CT"; } else if (i == 2) { area = "CA"; }

        var totalaL = 0;
        var titlesaL = $('[name^=spnAl_' + area + ']').map(function (idx, elem) {
            return $(elem).html();
        }).get();
        for (var a = 0; a < titlesaL.length; a++) {
            if (titlesaL[a] != "") {
                totalaL = totalaL + parseFloat(titlesaL[a].replaceAll(",", ""));
            }
        }

        if (area == "CT") {
            $('#spnTotalAl_STCT_7').html(formatMoney(totalaL));
        } else {
            $('#spnTotalAl_STCA_7').html(formatMoney(totalaL));
        }
    }

    /*CT*/
    var programaciontotalct = parseFloat($('#spnTotalProgramacion_STCT_0').html().replaceAll(",", ""));
    var altotalct = parseFloat($('#spnTotalAl_STCT_7').html().replaceAll(",", ""));

    $('#spnTotalDiferenciaGasto_STCT_8').html(formatMoney(altotalct - programaciontotalct));

    var porcentajestct = 0;
    if (programaciontotalct > 0) { porcentajestct = ((altotalct / programaciontotalct) * 100).toFixed(2); }

    $('#spnTotalPorcentajeAvanceGasto_STCT_9').html(formatMoney(porcentajestct));

    /*CA*/
    var programaciontotalca = parseFloat($('#spnTotalProgramacion_STCA_0').html().replaceAll(",", ""));
    var altotalca = parseFloat($('#spnTotalAl_STCA_7').html().replaceAll(",", ""));

    $('#spnTotalDiferenciaGasto_STCA_8').html(formatMoney(altotalca - programaciontotalca));

    var porcentajestca = 0;
    if (programaciontotalca > 0) { porcentajestca = ((altotalca / programaciontotalca) * 100).toFixed(2); }

    $('#spnTotalPorcentajeAvanceGasto_STCA_9').html(formatMoney(porcentajestca));

    //CALCULAR DEVENGADO FINAL

    $('#spnTotalAl_F_7').html(formatMoney(altotalct + altotalca));

    var programaciontotalF = parseFloat($('#spnTotalProgramacion_F_1').html().replaceAll(",", ""));
    var altotalF = parseFloat($('#spnTotalAl_F_7').html().replaceAll(",", ""));

    $('#spnTotalDiferenciaGasto_F_7').html(formatMoney(altotalF - programaciontotalF));

    var porcentajeF = 0;
    if (programaciontotalF > 0) {
        porcentajeF = ((altotalF / programaciontotalF) * 100).toFixed(2);
    }

    $('#spnTotalPorcentajeAvanceGasto_F_8').html(formatMoney(porcentajeF));

    //FIN CALCULAR DEVENGADO
}

function ExportarExcel(tabla,nom) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    var style = "<style>.text-center { vertical-align: middle;text-align: center; white-space:pre-wrap; word-wrap:break-word }; br {mso-data-placement:same-cell;}; .table-bordered {border:2px; border-style:solid; border-color:#333;}.table {width: 100%; max-width: 100%; margin-bottom: 1rem; background-color: transparent;};td{vertical-align: middle; mso-number-format:\@;}</style>";
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html lang="es-pe" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' + style + '</head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    // return function () {
    var table = document.getElementById(tabla);
    var ctx = { worksheet: 'Hoja1' || 'Worksheet', table: table.innerHTML }

    //Construct the <a> element
    var link = document.createElement("a");
    link.download = getNombreFile(nom);
    link.href = uri + base64(format(template, ctx));

    document.body.appendChild(link);
    link.click();

    // Cleanup the DOM
    document.body.removeChild(link);
    delete link;

    //$("#Export").html("");

    $.unblockUI();
}

function getNombreFile(nom) {
    var f = new Date();
    var title = nom + f.getDate() + "_" + (f.getMonth() + 1) + "_" + f.getFullYear() + "_" + f.getHours() + "_" + f.getMinutes();
    return title;
}