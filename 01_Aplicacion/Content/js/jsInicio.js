$(document).ready(function () {
    GraficoAreaIntervencion();
});

function GraficoAreaIntervencion() {
    $.get("/Inicio/GraficoAreaIntervencion", function (data, status) {
        // Cargar el mapa y los datos geográficos de Perú
        am4core.ready(function () {
            // Configurar el mapa
            var chart = am4core.create("chartdiv", am4maps.MapChart);
            chart.geodata = am4geodata_peruHigh;

            // Establecer proyección
            chart.projection = new am4maps.projections.Mercator();

            // Crear polígonos (regiones) en el mapa
            var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
            polygonSeries.useGeodata = true;
            polygonSeries.calculateVisualCenter = true;

            // Establecer colores y estilo de las regiones
            var polygonTemplate = polygonSeries.mapPolygons.template;
            //polygonTemplate.tooltipText = "{name}: {value}";
            polygonTemplate.fill = am4core.color("#CCCCCC"); // Color de relleno
            polygonTemplate.stroke = am4core.color("#fff"); // Color del borde
            polygonTemplate.strokeWidth = 0.5; // Ancho del borde
            //polygonTemplate.tooltipHTML = '<div style="text-align: center;"><strong>{name}</strong><br> Valor: {value}</div>';

            // Establecer colores y estilo de los departamentos con value igual a 0
            var zeroValueState = polygonTemplate.states.create("Intervencion");
            zeroValueState.properties.fill = am4core.color("#4f92ff"); // Color de relleno para value = 0

            // Agregar los datos al template de cada polígono
            polygonTemplate.adapter.add("tooltipText", function (text, target) {
                var dep = data.find(x=>x.AreaIntervencion == target.dataItem.dataContext.name.toUpperCase());
                if (dep != undefined) {
                    return "[bold]" + target.dataItem.dataContext.name + ":[/]\n" + dep.NroLocalidadesIntervenidad + " Localidades";
                }
                return "[bold]" + target.dataItem.dataContext.name + ":[/]\n 0 Localidades";
            });

            // Aplicar estado a los polígonos con value = 0
            polygonSeries.events.on("datavalidated", function (ev) {
                polygonSeries.mapPolygons.each(function (polygon) {
                    var dep = data.find(x=>x.AreaIntervencion == polygon.dataItem.dataContext.name.toUpperCase());
                    if (dep != undefined) {
                        if (dep.NroLocalidadesIntervenidad > 0) {
                            polygon.setState("Intervencion"); 
                        } 
                    }
                });
            });
        }); // fin de am4core.ready()
    });
}