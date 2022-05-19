$(document).ready(function () {
    if (getUrlParameter('Anio') != "") {
        $('#hdnAnio').val(getUrlParameter('Anio'))
        $('#AnioEjecucion').html(getUrlParameter('Anio'));
    };
    Indicadores();
    ListEjecucionMes();
});

function Indicadores() {
    $.get("/EjecucionPresupuestalPNSR/Indicadores?anio="+ 2022, function (data, status) {
        $("#mtoTotalPIM").html("S/." + AbreviarNumero(data.mtoTotalPIM));
        $('#mtoTotalPIM').prop('title', formatMoney(data.mtoTotalPIM));
        $("#mtoTotalGastosCorrientes").html("S/." + AbreviarNumero(data.mtoTotalGastosCorrientes));
        $('#mtoTotalGastosCorrientes').prop('title', formatMoney(data.mtoTotalGastosCorrientes));
        $('#mtoTotalGastosCapital').html("S/." + AbreviarNumero(data.mtoTotalGastosCapital));
        $('#mtoTotalGastosCapital').prop('title', formatMoney(data.mtoTotalGastosCapital));
        $('#mtoTotalCertificado').html("S/." + AbreviarNumero(data.mtoTotalCertificado));
        $('#mtoTotalCertificado').prop('title', formatMoney(data.mtoTotalCertificado));
        $('#mtoTotalComprometido').html("S/." + AbreviarNumero(data.mtoTotalComprometido));
        $('#mtoTotalComprometido').prop('title', formatMoney(data.mtoTotalComprometido));
        $('#mtoTotalDevengado').html("S/." + AbreviarNumero(data.mtoTotalDevengado));
        $('#mtoTotalDevengado').prop('title', formatMoney(data.mtoTotalDevengado));
    });
}

function ListEjecucionMes() {
    $.get("/EjecucionPresupuestalPNSR/ListEjecucionMes?anio=" + 2022, function (data, status) {
        am4core.ready(function () {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartSeguimiento", am4charts.XYChart);
            chart.numberFormatter.numberFormat = "###,###,###.##";
            // Add data
            chart.data = data;

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
            categoryAxis.dataFields.category = "MesText";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 50;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "% de Ejecución de Inversiones";
            valueAxis.title.fontWeight = 800;
            valueAxis.min = 0;
            valueAxis.max = 300;
            valueAxis.strictMinMax = true;
            valueAxis.renderer.labels.template.adapter.add("text", (text, label) => { return label.dataItem.value + "%"; })

            // Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "PorcentagePIASAR";
            series.dataFields.categoryX = "MesText";
            series.name = "PIASAR";

            series.tooltipText = "{name} [{categoryX}]: {valueY} %";
            series.legendSettings.valueText = "{valueY}";
            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color("#28a745");

            var bullet = series.bullets.push(new am4charts.CircleBullet());
            series.stroke = am4core.color("#28a745");
            bullet.stroke = am4core.color("#28a745");
            bullet.fill = am4core.color("#28a745");

            var series2 = chart.series.push(new am4charts.LineSeries());
            series2.dataFields.valueY = "PorcentageAR";
            series2.dataFields.categoryX = "MesText";
            series2.name = "AMAZONIA RURAL";

            series2.tooltipText = "{name} [{categoryX}]: {valueY} %";
            series2.legendSettings.valueText = "{valueY}";
            series2.tooltip.getFillFromObject = false;
            series2.tooltip.background.fill = am4core.color("#4099ff");

            var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
            series2.stroke = am4core.color("#4099ff");
            bullet2.stroke = am4core.color("#4099ff");
            bullet2.fill = am4core.color("#4099ff");

            var series3 = chart.series.push(new am4charts.LineSeries());
            series3.dataFields.valueY = "PorcentageUTP";
            series3.dataFields.categoryX = "MesText";
            series3.name = "UTP";

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
    });
}

function VerCuadroDetalle() {
    $("#modal-detalle").modal({ backdrop: 'static', keyboard: true, show: true });
    $($.fn.dataTable.tables(true)).DataTable()
         .columns.adjust();
    //$.get("/EjecucionPresupuestalPNSR/Indicadores?anio=" + 2022, function (data, status) {

    //});
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