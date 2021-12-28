$(document).ready(function () {
    $('#hdnIdUsuario').val(getUrlParameter('Id'));

    $('#cboAnio').change(function () {
        $('#spnAnio').html($("#cboAnio").val());
        BuscarSeguimientos()
    });

    $('#cboMes').change(function () {
        $('#txtAcumuladoalFecha').val("");
        $('#spnMes').html($("#cboMes option:selected").text());
        $('#spnAnioMesPE').html($("#cboMes option:selected").text() + " " + $("#cboAnio").val());
        $('#spnAnioMesDA').html($("#cboMes option:selected").text() + " " + $("#cboAnio").val());
        //ListSeguimiento();
        BuscarSeguimientos()
    });

    $('#txtAcumuladoalFecha').change(function () {
        $('#spnFecha').html($("#txtAcumuladoalFecha").val());
        //ListSeguimiento();
        BuscarSeguimientos()
    });

    ListSeguimiento();
});

function BuscarSeguimientos() {
    if ($("#cboAnio").val() == 0) {
        MensajeAlerta('Seleccione el Año antes de Buscar', 'cboAnio');
    }
    else if ($("#cboMes").val() == 0) {
        MensajeAlerta('Seleccione el Mes antes de Buscar', 'cboMes');
    }
    else if ($("#txtAcumuladoalFecha").val() == "") {
        MensajeAlerta('Ingrese una fecha antes de Buscar', 'txtAcumuladoalFecha');
    }
    else {
        $('#spnAnio').html($("#cboAnio").val());
        $('#spnMes').html($("#cboMes option:selected").text());
        $('#spnAnioMesPE').html($("#cboMes option:selected").text() + " " + $("#cboAnio").val());
        $('#spnAnioMesDA').html($("#cboMes option:selected").text() + " " + $("#cboAnio").val());
        $('#spnFecha').html($("#txtAcumuladoalFecha").val());
        ListSeguimiento()
    }
}

function ListSeguimiento() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/SeguimientoEjecucionProyectosInversion/ListSeguimiento?Anio=" + $("#cboAnio").val() + "&Mes=" + $("#cboMes").val() + "&fecha=" + $("#txtAcumuladoalFecha").val(), function (data, status) {

        var first = data[0];

        if (first.AnioEjecucion != 0) {
            let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                $('#spnAnio').html(first.AnioEjecucion);
                $('#spnMes').html(meses[first.Mes - 1]);
                $('#spnAnioMesPE').html(meses[first.Mes - 1] + " " + first.AnioEjecucion);
                $('#spnAnioMesDA').html(meses[first.Mes - 1] + " " + first.AnioEjecucion);
                $('#spnFecha').html(first.FechaString);
        }

        var Index = 1;
        const grupo1 = data.filter(x => x.CodGrupo == 1);
        const grupo2 = data.filter(x => x.CodGrupo == 2);
        const grupo3 = data.filter(x => x.CodGrupo == 3);
        const grupo4 = data.filter(x => x.CodGrupo == 4);

        $("tr[name='row_PC2019']").remove();
        $("tr[name='row_PC2020']").remove();
        $("tr[name='row_C2']").remove();
        $("tr[name='row_CA']").remove();


        var rownumber = 1;
        for (var a = 0; a < grupo1.length; a++) {
            

            var divOpcion = '<tr name="row_PC2019">';

            /*==========labels==============*/
            divOpcion = divOpcion + '<td class="align-middle text-center">' + rownumber + '</td>';
            divOpcion = divOpcion + '<td class="align-middle">' + grupo1[a].dgpp + '</td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text">' + grupo1[a].ProyectoInversion + '<input id="hdIdProyectosSeguimiento_PC2019_' + a + '" type="hidden" class="form-control" value="' + grupo1[a].IdProyectosSeguimiento + '"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="PIM" id="txtPIM_PC2019_' + a + '" type="text" class="form-control" value="' + grupo1[a].PIM + '"  onkeyup="calcularPIM()" /><script>$("#txtPIM_PC2019_' + a + '").autoNumeric();</script></td>';
            /*==========Text==============*/
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="Programado_PC2019" id="txtProgramacion_PC2019_' + a + '" type="text" class="form-control" value="' + grupo1[a].ProgramadoMes + '" onkeyup="calcularProgramado(\'PC2019\',' + a + ')"/><script>$("#txtProgramacion_PC2019_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_PC2019_1" id="txtProgramadoSemana_PC2019_1_' + a + '" type="text" class="form-control" value="' + grupo1[a].ProgramadoSemanaUno + '" onkeyup="calcularProgramadoEjecutado(\'PC2019\',\'Programado\',1,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_PC2019_1_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_PC2019_1" id="txtEjecutadoSemana_PC2019_1_' + a + '" type="text" class="form-control" value="' + grupo1[a].EjecutadoSemanaUno + '" onkeyup="calcularProgramadoEjecutado(\'PC2019\',\'Ejecutado\',1,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_PC2019_1_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_PC2019_2" id="txtProgramadoSemana_PC2019_2_' + a + '" type="text" class="form-control" value="' + grupo1[a].ProgramadoSemanaDos + '" onkeyup="calcularProgramadoEjecutado(\'PC2019\',\'Programado\',2,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_PC2019_2_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_PC2019_2" id="txtEjecutadoSemana_PC2019_2_' + a + '" type="text" class="form-control" value="' + grupo1[a].EjecutadoSemanaDos + '" onkeyup="calcularProgramadoEjecutado(\'PC2019\',\'Ejecutado\',2,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_PC2019_2_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_PC2019_3" id="txtProgramadoSemana_PC2019_3_' + a + '" type="text" class="form-control" value="' + grupo1[a].ProgramadoSemanaTres + '" onkeyup="calcularProgramadoEjecutado(\'PC2019\',\'Programado\',3,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_PC2019_3_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_PC2019_3" id="txtEjecutadoSemana_PC2019_3_' + a + '" type="text" class="form-control" value="' + grupo1[a].EjecutadoSemanaTres + '" onkeyup="calcularProgramadoEjecutado(\'PC2019\',\'Ejecutado\',3,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_PC2019_3_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_PC2019_4" id="txtProgramadoSemana_PC2019_4_' + a + '" type="text" class="form-control" value="' + grupo1[a].ProgramadoSemanaCuatro + '" onkeyup="calcularProgramadoEjecutado(\'PC2019\',\'Programado\',4,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_PC2019_4_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_PC2019_4" id="txtEjecutadoSemana_PC2019_4_' + a + '" type="text" class="form-control" value="' + grupo1[a].EjecutadoSemanaCuatro + '" onkeyup="calcularProgramadoEjecutado(\'PC2019\',\'Ejecutado\',4,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_PC2019_4_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_PC2019_5" id="txtProgramadoSemana_PC2019_5_' + a + '" type="text" class="form-control" value="' + grupo1[a].ProgramadoSemanaCinco + '" onkeyup="calcularProgramadoEjecutado(\'PC2019\',\'Programado\',5,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_PC2019_5_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_PC2019_5" id="txtEjecutadoSemana_PC2019_5_' + a + '" type="text" class="form-control" value="' + grupo1[a].EjecutadoSemanaCinco + '" onkeyup="calcularProgramadoEjecutado(\'PC2019\',\'Ejecutado\',5,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_PC2019_5_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="totalProgramadoFila_PC2019_6" id="txtTotalProgramadoFila_PC2019_6_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo1[a].TotalProgramado) + '" readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="txtAl_CT" id="txtAl_PC2019_7_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo1[a].DevengadoAcumulado) + '" readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="txtDiferencia_CT" id="txtDiferenciaGasto_PC2019_8_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo1[a].DiferenciaGasto) + '" readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="txtPorcentaje_CT" id="txtPorcentajeAvanceGasto_PC2019_9_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo1[a].PorcentajeAvanceGasto) + '" readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><textarea rows="4" id="txtDetalleGasto_PC2019_10_' + a + '" class="form-control" value="' + formatMoney(grupo1[a].DetalleGastoMensual) + '" /></td>';
            divOpcion = divOpcion + '</tr>';
            $("#dtProyecto > tbody > tr").eq(Index).after(divOpcion);
            Index++;
            rownumber++;
        }

        Index = Index + 1;
        rownumber = 1;
        for (var a = 0; a < grupo2.length; a++) {
            var divOpcion = '<tr name="row_PC2020">';

            /*==========labels==============*/
            divOpcion = divOpcion + '<td class="align-middle text-center">' + rownumber + '</td>';
            divOpcion = divOpcion + '<td class="align-middle">' + grupo2[a].dgpp + '</td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text">' + grupo2[a].ProyectoInversion + '<input id="hdIdProyectosSeguimiento_PC2020_' + a + '" type="hidden" class="form-control" value="' + grupo2[a].IdProyectosSeguimiento + '"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="PIM" id="txtPIM_PC2020_' + a + '" type="text" class="form-control" value="' + grupo2[a].PIM + '"  onkeyup="calcularPIM()" /><script>$("#txtPIM_PC2020_' + a + '").autoNumeric();</script></td>';
            /*==========Text==============*/
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="Programado_PC2020" id="txtProgramacion_PC2020_' + a + '" type="text" class="form-control" value="' + grupo2[a].ProgramadoMes + '"  onkeyup="calcularProgramado(\'PC2020\',' + a + ')"/><script>$("#txtProgramacion_PC2020_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_PC2020_1" id="txtProgramadoSemana_PC2020_1_' + a + '" type="text" class="form-control" value="' + grupo2[a].ProgramadoSemanaUno + '"  onkeyup="calcularProgramadoEjecutado(\'PC2020\',\'Programado\',1,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_PC2020_1_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_PC2020_1" id="txtEjecutadoSemana_PC2020_1_' + a + '" type="text" class="form-control" value="' + grupo2[a].EjecutadoSemanaUno + '"  onkeyup="calcularProgramadoEjecutado(\'PC2020\',\'Ejecutado\',1,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_PC2020_1_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_PC2020_2" id="txtProgramadoSemana_PC2020_2_' + a + '" type="text" class="form-control" value="' + grupo2[a].ProgramadoSemanaDos + '"  onkeyup="calcularProgramadoEjecutado(\'PC2020\',\'Programado\',2,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_PC2020_2_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_PC2020_2" id="txtEjecutadoSemana_PC2020_2_' + a + '" type="text" class="form-control" value="' + grupo2[a].EjecutadoSemanaDos + '"  onkeyup="calcularProgramadoEjecutado(\'PC2020\',\'Ejecutado\',2,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_PC2020_2_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_PC2020_3" id="txtProgramadoSemana_PC2020_3_' + a + '" type="text" class="form-control" value="' + grupo2[a].ProgramadoSemanaTres + '"  onkeyup="calcularProgramadoEjecutado(\'PC2020\',\'Programado\',3,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_PC2020_3_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_PC2020_3" id="txtEjecutadoSemana_PC2020_3_' + a + '" type="text" class="form-control" value="' + grupo2[a].EjecutadoSemanaTres + '"  onkeyup="calcularProgramadoEjecutado(\'PC2020\',\'Ejecutado\',3,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_PC2020_3_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_PC2020_4" id="txtProgramadoSemana_PC2020_4_' + a + '" type="text" class="form-control" value="' + grupo2[a].ProgramadoSemanaCuatro + '"  onkeyup="calcularProgramadoEjecutado(\'PC2020\',\'Programado\',4,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_PC2020_4_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_PC2020_4" id="txtEjecutadoSemana_PC2020_4_' + a + '" type="text" class="form-control" value="' + grupo2[a].EjecutadoSemanaCuatro + '"  onkeyup="calcularProgramadoEjecutado(\'PC2020\',\'Ejecutado\',4,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_PC2020_4_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_PC2020_5" id="txtProgramadoSemana_PC2020_5_' + a + '" type="text" class="form-control" value="' + grupo2[a].ProgramadoSemanaCinco + '"  onkeyup="calcularProgramadoEjecutado(\'PC2020\',\'Programado\',5,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_PC2020_5_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_PC2020_5" id="txtEjecutadoSemana_PC2020_5_' + a + '" type="text" class="form-control" value="' + grupo2[a].EjecutadoSemanaCinco + '"  onkeyup="calcularProgramadoEjecutado(\'PC2020\',\'Ejecutado\',5,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_PC2020_5_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="totalProgramadoFila_PC2020_6" id="txtTotalProgramadoFila_PC2020_6_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo2[a].TotalProgramado) + '"  readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="txtAl_CT" id="txtAl_PC2020_7_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo2[a].DevengadoAcumulado) + '" readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="txtDiferencia_CT" id="txtDiferenciaGasto_PC2020_8_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo2[a].DiferenciaGasto) + '" readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="txtPorcentaje_CT" id="txtPorcentajeAvanceGasto_PC2020_9_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo2[a].PorcentajeAvanceGasto) + '" readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><textarea rows="4" id="txtDetalleGasto_PC2020_10_' + a + '" class="form-control" value="' + formatMoney(grupo2[a].DetalleGastoMensual) + '" /></td>';
            divOpcion = divOpcion + '</tr>';
            $("#dtProyecto > tbody > tr").eq(Index).after(divOpcion);
            Index++;
            rownumber++;
        }

        Index = Index + 1;
        rownumber = 1;
        for (var a = 0; a < grupo3.length; a++) {
            var divOpcion = '<tr name="row_C2">';

            /*==========labels==============*/
            divOpcion = divOpcion + '<td class="align-middle text-center">' + rownumber + '</td>';
            divOpcion = divOpcion + '<td class="align-middle">' + grupo3[a].dgpp + '</td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text">' + grupo3[a].ProyectoInversion + '<input id="hdIdProyectosSeguimiento_C2_' + a + '" type="hidden" class="form-control" value="' + grupo3[a].IdProyectosSeguimiento + '"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="PIM" id="txtPIM_C2_' + a + '" type="text" class="form-control" value="' + grupo3[a].PIM + '"  onkeyup="calcularPIM()" /><script>$("#txtPIM_C2_' + a + '").autoNumeric();</script></td>';
            /*==========Text==============*/
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="Programado_C2" id="txtProgramacion_C2_' + a + '" type="text" class="form-control" value="' + grupo3[a].ProgramadoMes + '"  onkeyup="calcularProgramado(\'C2\',' + a + ')"/><script>$("#txtProgramacion_C2_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_C2_1" id="txtProgramadoSemana_C2_1_' + a + '" type="text" class="form-control" value="' + grupo3[a].ProgramadoSemanaUno + '"  onkeyup="calcularProgramadoEjecutado(\'C2\',\'Programado\',1,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_C2_1_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_C2_1" id="txtEjecutadoSemana_C2_1_' + a + '" type="text" class="form-control" value="' + grupo3[a].EjecutadoSemanaUno + '"  onkeyup="calcularProgramadoEjecutado(\'C2\',\'Ejecutado\',1,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_C2_1_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_C2_2" id="txtProgramadoSemana_C2_2_' + a + '" type="text" class="form-control" value="' + grupo3[a].ProgramadoSemanaDos + '"  onkeyup="calcularProgramadoEjecutado(\'C2\',\'Programado\',2,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_C2_2_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_C2_2" id="txtEjecutadoSemana_C2_2_' + a + '" type="text" class="form-control" value="' + grupo3[a].EjecutadoSemanaDos + '"  onkeyup="calcularProgramadoEjecutado(\'C2\',\'Ejecutado\',2,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_C2_2_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_C2_3" id="txtProgramadoSemana_C2_3_' + a + '" type="text" class="form-control" value="' + grupo3[a].ProgramadoSemanaTres + '"  onkeyup="calcularProgramadoEjecutado(\'C2\',\'Programado\',3,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_C2_3_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_C2_3" id="txtEjecutadoSemana_C2_3_' + a + '" type="text" class="form-control" value="' + grupo3[a].EjecutadoSemanaTres+ '"  onkeyup="calcularProgramadoEjecutado(\'C2\',\'Ejecutado\',3,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_C2_3_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_C2_4" id="txtProgramadoSemana_C2_4_' + a + '" type="text" class="form-control" value="' + grupo3[a].ProgramadoSemanaCuatro + '"  onkeyup="calcularProgramadoEjecutado(\'C2\',\'Programado\',4,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_C2_4_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_C2_4" id="txtEjecutadoSemana_C2_4_' + a + '" type="text" class="form-control" value="' + grupo3[a].EjecutadoSemanaCuatro + '"  onkeyup="calcularProgramadoEjecutado(\'C2\',\'Ejecutado\',4,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_C2_4_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_C2_5" id="txtProgramadoSemana_C2_5_' + a + '" type="text" class="form-control" value="' + grupo3[a].ProgramadoSemanaCinco + '"  onkeyup="calcularProgramadoEjecutado(\'C2\',\'Programado\',5,' + a + ',\'CT\')"/><script>$("#txtProgramadoSemana_C2_5_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_C2_5" id="txtEjecutadoSemana_C2_5_' + a + '" type="text" class="form-control" value="' + grupo3[a].EjecutadoSemanaCinco + '"  onkeyup="calcularProgramadoEjecutado(\'C2\',\'Ejecutado\',5,' + a + ',\'CT\')"/><script>$("#txtEjecutadoSemana_C2_5_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="totalProgramadoFila_C2_6" id="txtTotalProgramadoFila_C2_6_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo3[a].TotalProgramado) + '"  readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="txtAl_CT" id="txtAl_C2_7_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo3[a].DevengadoAcumulado) + '" readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="txtDiferencia_CT" id="txtDiferenciaGasto_C2_8_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo3[a].DiferenciaGasto) + '" readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="txtPorcentaje_CT" id="txtPorcentajeAvanceGasto_C2_9_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo3[a].PorcentajeAvanceGasto) + '" readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><textarea rows="4" id="txtDetalleGasto_C2_10_' + a + '" class="form-control" value="' + formatMoney(grupo3[a].DetalleGastoMensual) + '" /></td>';
            divOpcion = divOpcion + '</tr>';
            $("#dtProyecto > tbody > tr").eq(Index).after(divOpcion);
            Index++;
            rownumber++;
        }

        Index = Index + 2;
        rownumber = 1;
        for (var a = 0; a < grupo4.length; a++) {
            var divOpcion = '<tr name="row_CA">';

            /*==========labels==============*/
            divOpcion = divOpcion + '<td class="align-middle text-center">' + rownumber + '</td>';
            divOpcion = divOpcion + '<td class="align-middle">' + grupo4[a].dgpp + '</td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text">' + grupo4[a].ProyectoInversion + '<input id="hdIdProyectosSeguimiento_CA_' + a + '" type="hidden" class="form-control" value="' + grupo4[a].IdProyectosSeguimiento + '"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="PIM" id="txtPIM_CA_' + a + '" type="text" class="form-control" value="' + grupo4[a].PIM + '" onkeyup="calcularPIM()"/><script>$("#txtPIM_CA_' + a + '").autoNumeric();</script></td>';
            /*==========Text==============*/
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="Programado_CA" id="txtProgramacion_CA_' + a + '" type="text" class="form-control" value="' + grupo4[a].ProgramadoMes + '" onkeyup="calcularProgramado(\'CA\',' + a + ')"/><script>$("#txtProgramacion_CA_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_CA_1" id="txtProgramadoSemana_CA_1_' + a + '" type="text" class="form-control" value="' + grupo4[a].ProgramadoSemanaUno + '"  onkeyup="calcularProgramadoEjecutado(\'CA\',\'Programado\',1,' + a + ',\'CA\')"/><script>$("#txtProgramadoSemana_CA_1_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_CA_1" id="txtEjecutadoSemana_CA_1_' + a + '" type="text" class="form-control" value="' + grupo4[a].EjecutadoSemanaUno + '"  onkeyup="calcularProgramadoEjecutado(\'CA\',\'Ejecutado\',1,' + a + ',\'CA\')"/><script>$("#txtEjecutadoSemana_CA_1_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_CA_2" id="txtProgramadoSemana_CA_2_' + a + '" type="text" class="form-control" value="' + grupo4[a].ProgramadoSemanaDos + '"  onkeyup="calcularProgramadoEjecutado(\'CA\',\'Programado\',2,' + a + ',\'CA\')"/><script>$("#txtProgramadoSemana_CA_2_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_CA_2" id="txtEjecutadoSemana_CA_2_' + a + '" type="text" class="form-control" value="' + grupo4[a].EjecutadoSemanaDos + '"  onkeyup="calcularProgramadoEjecutado(\'CA\',\'Ejecutado\',2,' + a + ',\'CA\')"/><script>$("#txtEjecutadoSemana_CA_2_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_CA_3" id="txtProgramadoSemana_CA_3_' + a + '" type="text" class="form-control" value="' + grupo4[a].ProgramadoSemanaTres + '"  onkeyup="calcularProgramadoEjecutado(\'CA\',\'Programado\',3,' + a + ',\'CA\')"/><script>$("#txtProgramadoSemana_CA_3_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_CA_3" id="txtEjecutadoSemana_CA_3_' + a + '" type="text" class="form-control" value="' + grupo4[a].EjecutadoSemanaTres + '"  onkeyup="calcularProgramadoEjecutado(\'CA\',\'Ejecutado\',3,' + a + ',\'CA\')"/><script>$("#txtEjecutadoSemana_CA_3_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_CA_4" id="txtProgramadoSemana_CA_4_' + a + '" type="text" class="form-control" value="' + grupo4[a].ProgramadoSemanaCuatro + '"  onkeyup="calcularProgramadoEjecutado(\'CA\',\'Programado\',4,' + a + ',\'CA\')"/><script>$("#txtProgramadoSemana_CA_4_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_CA_4" id="txtEjecutadoSemana_CA_4_' + a + '" type="text" class="form-control" value="' + grupo4[a].EjecutadoSemanaCuatro + '"  onkeyup="calcularProgramadoEjecutado(\'CA\',\'Ejecutado\',4,' + a + ',\'CA\')"/><script>$("#txtEjecutadoSemana_CA_4_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="ProgramadoSemana_CA_5" id="txtProgramadoSemana_CA_5_' + a + '" type="text" class="form-control" value="' + grupo4[a].ProgramadoSemanaCinco + '"  onkeyup="calcularProgramadoEjecutado(\'CA\',\'Programado\',5,' + a + ',\'CA\')"/><script>$("#txtProgramadoSemana_CA_5_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="EjecutadoSemana_CA_5" id="txtEjecutadoSemana_CA_5_' + a + '" type="text" class="form-control" value="' + grupo4[a].EjecutadoSemanaCinco + '"  onkeyup="calcularProgramadoEjecutado(\'CA\',\'Ejecutado\',5,' + a + ',\'CA\')"/><script>$("#txtEjecutadoSemana_CA_5_' + a + '").autoNumeric();</script></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="totalProgramadoFila_CA_6" id="txtTotalProgramadoFila_CA_6_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo4[a].TotalProgramado) + '"  readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="txtAl_CA" id="txtAl_CA_7_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo4[a].DevengadoAcumulado) + '" readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="txtDiferencia_CA" id="txtDiferenciaGasto_CA_8_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo4[a].DiferenciaGasto) + '" readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><input name="txtPorcentaje_CA" id="txtPorcentajeAvanceGasto_CA_9_' + a + '" type="text" class="form-control" value="' + formatMoney(grupo4[a].PorcentajeAvanceGasto) + '" readonly="readonly"/></td>';
            divOpcion = divOpcion + '<td class="align-middle wrap-text"><textarea rows="4" id="txtDetalleGasto_CA_10_' + a + '" class="form-control" value="' + formatMoney(grupo4[a].DetalleGastoMensual) + '" /></td>';
            divOpcion = divOpcion + '</tr>';
            $("#dtProyecto > tbody > tr").eq(Index).after(divOpcion);
            Index++;
            rownumber++;
        }

        calcularTotales();
        $.unblockUI();
    });
   
}

function calcularTotales() {
    //CALCULAR PIM
    var total = 0;
    var titles = $('input[name^=PIM]').map(function (idx, elem) {
        return $(elem).val();
    }).get();
    for (i = 0; i < titles.length; i++) {
        if (titles[i] != "") {
            total = total + parseFloat(titles[i].replaceAll(",", ""));
        }
    }
    $('#txtTotalPIM_F_0').val(formatMoney(total));
    //FIN CALCULAR PIM

    //CALCULAR PROGRAMADO
    var grupo = "";
    for (var a = 1; a <= 4; a++) {

        if (a == 1) {grupo = "PC2019";}else if (a == 2) {grupo = "PC2020";}else if (a == 3) {grupo = "C2";}else if (a == 4) {grupo = "CA";}

        var total = 0;
        var titles = $('input[name^=Programado_' + grupo + ']').map(function (idx, elem) {
            return $(elem).val();
        }).get();

        for (i = 0; i < titles.length; i++) {
            if (titles[i] != "") {
                total = total + parseFloat(titles[i].replaceAll(",", ""));
            }
        }
        //Llena Subtotales
        if (grupo != "CA") {
            $('#txtTotalProgramacion_' + grupo + '_0').val(formatMoney(total));

            var PC2019 = parseFloat($('#txtTotalProgramacion_PC2019_0').val().replaceAll(",", ""));
            var PC2020 = parseFloat($('#txtTotalProgramacion_PC2020_0').val().replaceAll(",", ""));
            var C2 = parseFloat($('#txtTotalProgramacion_C2_0').val().replaceAll(",", ""));

            $('#txtTotalProgramacion_STCT_0').val(formatMoney(PC2019 + PC2020 + C2));
        } else {
            $('#txtTotalProgramacion_STCA_0').val(formatMoney(total));
        }

        //Llena total
        var STCT = parseFloat($('#txtTotalProgramacion_STCT_0').val().replaceAll(",", ""));
        var STCA = parseFloat($('#txtTotalProgramacion_STCA_0').val().replaceAll(",", ""));

        $('#txtTotalProgramacion_F_1').val(formatMoney(STCT + STCA));


    }   

    //FIN CALCULAR PROGRAMADO

    //CALCULAR PROGRAMADO Y EJECUTADO
    for (var a = 1; a <= 4; a++) {

        if (a == 1) { grupo = "PC2019"; } else if (a == 2) { grupo = "PC2020"; } else if (a == 3) { grupo = "C2"; } else if (a == 4) { grupo = "CA"; }

        /*----------------------------------TOTAL PROGRAMADO COLUMNA--------------------------*/

        var totalP = 0;
        var titlesP = $('input[name^=totalProgramadoFila_' + grupo + '_6]').map(function (idx, elem) {
            return $(elem).val();
        }).get();
        for (i = 0; i < titlesP.length; i++) {
            if (titlesP[i] != "") {
                totalP = totalP + parseFloat(titlesP[i].replaceAll(",", ""));
            }
        }

        $('#txtTotalProgramado_' + grupo + '_6').val(formatMoney(totalP));

        //SUMA SUBTOTAL PROGRAMADO

        //Llena Subtotal columna
        if (grupo != "CA") {

            var PC2019 = parseFloat($('#txtTotalProgramado_PC2019_6').val().replaceAll(",", ""));
            var PC2020 = parseFloat($('#txtTotalProgramado_PC2020_6').val().replaceAll(",", ""));
            var C2 = parseFloat($('#txtTotalProgramado_C2_6').val().replaceAll(",", ""));

            $('#txtTotalProgramado_STCT_6').val(formatMoney(PC2019 + PC2020 + C2));
        } else {
            $('#txtTotalProgramado_STCA_6').val(formatMoney(totalP));
        }

        //LLENA TOTAL PROGRAMADO FINAL
        var totalproCT = parseFloat($('#txtTotalProgramado_STCT_6').val().replaceAll(",", ""));
        var totalproCA = parseFloat($('#txtTotalProgramado_STCA_6').val().replaceAll(",", ""));

        $('#txtTotalProgramado_F_6').val(formatMoney(totalproCT + totalproCA));
        /*----------------------------------FINAL TOTAL PROGRAMADO COLUMNA--------------------------*/

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
                    var titles = $('input[name^=' + tipo + 'Semana_' + grupo + '_' + semana + ']').map(function (idx, elem) {
                        return $(elem).val();
                    }).get();
                    for (q = 0; q < titles.length; q++) {
                        if (titles[q] != "") {
                            total = total + parseFloat(titles[q].replaceAll(",", ""));
                        }
                    }

                    //Llena Subtotal columna
                    if (area == "CT") {
                        $('#txtTotal' + tipo + 'Semana_' + grupo + '_' + semana).val(formatMoney(total));

                        var PC2019 = parseFloat($('#txtTotal' + tipo + 'Semana_PC2019_' + semana).val().replaceAll(",", ""));
                        var PC2020 = parseFloat($('#txtTotal' + tipo + 'Semana_PC2020_' + semana).val().replaceAll(",", ""));
                        var C2 = parseFloat($('#txtTotal' + tipo + 'Semana_C2_' + semana).val().replaceAll(",", ""));

                        $('#txtTotal' + tipo + 'Semana_ST' + area + '_' + semana).val(formatMoney(PC2019 + PC2020 + C2));
                    } else {
                        $('#txtTotal' + tipo + 'Semana_ST' + area + '_' + semana).val(formatMoney(total));
                    }

                    //Llena total columna
                    var STCT = parseFloat($('#txtTotal' + tipo + 'Semana_STCT_' + semana).val().replaceAll(",", ""));
                    var STCA = parseFloat($('#txtTotal' + tipo + 'Semana_STCA_' + semana).val().replaceAll(",", ""));

                    $('#txtTotal' + tipo + 'Semana_F_' + semana).val(formatMoney(STCT + STCA));

                }
            }
        }
    }
    //FIN CALCULAR PROGRAMADO Y EJECUTADO

    //CALCULAR DEVENGADO
    var area = "";
    for (var i = 1; i <= 2; i++) {
        if (i == 1) { area = "CT"; } else if (i == 2) { area = "CA"; }

        var totalaL = 0;
        var titlesaL = $('input[name^=txtAl_' + area + ']').map(function (idx, elem) {
            return $(elem).val();
        }).get();
        for (var a = 0; a < titlesaL.length; a++) {
            if (titlesaL[a] != "") {
                totalaL = totalaL + parseFloat(titlesaL[a].replaceAll(",", ""));
            }
        }

        if (area == "CT") {
            $('#txtTotalAl_STCT_7').val(formatMoney(totalaL));
        } else {
            $('#txtTotalAl_STCA_7').val(formatMoney(totalaL));
        }
    }

    /*CT*/
    var programaciontotalct = parseFloat($('#txtTotalProgramacion_STCT_0').val().replaceAll(",", ""));
    var altotalct = parseFloat($('#txtTotalAl_STCT_7').val().replaceAll(",", ""));

    $('#txtTotalDiferenciaGasto_STCT_8').val(formatMoney(altotalct - programaciontotalct));

    var porcentajestct = 0;
    if (programaciontotalct > 0) { porcentajestct = ((altotalct / programaciontotalct) * 100).toFixed(2); }

    $('#txtTotalPorcentajeAvanceGasto_STCT_9').val(formatMoney(porcentajestct));

    /*CA*/
    var programaciontotalca = parseFloat($('#txtTotalProgramacion_STCA_0').val().replaceAll(",", ""));
    var altotalca = parseFloat($('#txtTotalAl_STCA_7').val().replaceAll(",", ""));

    $('#txtTotalDiferenciaGasto_STCA_8').val(formatMoney(altotalca - programaciontotalca));

    var porcentajestca = 0;
    if (programaciontotalca > 0) { porcentajestca = ((altotalca / programaciontotalca) * 100).toFixed(2); }

    $('#txtTotalPorcentajeAvanceGasto_STCA_9').val(formatMoney(porcentajestca));

    //CALCULAR DEVENGADO FINAL

    $('#txtTotalAl_F_7').val(formatMoney(altotalct + altotalca));

    var programaciontotalF = parseFloat($('#txtTotalProgramacion_F_1').val().replaceAll(",", ""));
    var altotalF = parseFloat($('#txtTotalAl_F_7').val().replaceAll(",", ""));

    $('#txtTotalDiferenciaGasto_F_7').val(formatMoney(altotalF - programaciontotalF));

    var porcentajeF = 0;
    if (programaciontotalF > 0) {
        porcentajeF = ((altotalF / programaciontotalF) * 100).toFixed(2);
    }

    $('#txtTotalPorcentajeAvanceGasto_F_8').val(formatMoney(porcentajeF));

    //FIN CALCULAR DEVENGADO
}

function calcularPIM() {
    var total = 0;
    var titles = $('input[name^=PIM]').map(function (idx, elem) {
        return $(elem).val();
    }).get();
    for (i = 0; i < titles.length; i++) {
        if (titles[i] != "") {
            total = total + parseFloat(titles[i].replaceAll(",", ""));
        }
    }
    $('#txtTotalPIM_F_0').val(formatMoney(total));
}
function calcularProgramado(grupo, fila) {
    
    var total = 0;
    var titles = $('input[name^=Programado_'+grupo+']').map(function (idx, elem) {
        return $(elem).val();
    }).get();
    for (i = 0; i < titles.length; i++) {
        if (titles[i] != "") {
            total = total + parseFloat(titles[i].replaceAll(",", ""));
        }
    }
    //Llena Subtotal
    if (grupo != "CA") {
        $('#txtTotalProgramacion_' + grupo + '_0').val(formatMoney(total));

        var PC2019 = parseFloat($('#txtTotalProgramacion_PC2019_0').val().replaceAll(",", ""));
        var PC2020 = parseFloat($('#txtTotalProgramacion_PC2020_0').val().replaceAll(",", ""));
        var C2 = parseFloat($('#txtTotalProgramacion_C2_0').val().replaceAll(",", ""));

        $('#txtTotalProgramacion_STCT_0').val(formatMoney(PC2019 + PC2020 + C2));
    } else {
        $('#txtTotalProgramacion_STCA_0').val(formatMoney(total));
    }

    //Llena total
    var STCT = parseFloat($('#txtTotalProgramacion_STCT_0').val().replaceAll(",", ""));
    var STCA = parseFloat($('#txtTotalProgramacion_STCA_0').val().replaceAll(",", ""));

    $('#txtTotalProgramacion_F_1').val(formatMoney(STCT + STCA));

    /*---------------------------------CALCULO EN FILA-----------------------------------*/
 
    var programado = parseFloat($("#txtProgramacion_" + grupo + "_" + fila).val().replaceAll(",", ""));
    var al = parseFloat($("#txtAl_" + grupo + "_7_" + fila).val().replaceAll(",", ""));

    $("#txtDiferenciaGasto_" + grupo + "_8_" + fila).val(formatMoney(al - programado));

    var porcentaje = 0;
    if (programado > 0) { porcentaje = ((al / programado) * 100).toFixed(2); }

    $("#txtPorcentajeAvanceGasto_" + grupo + "_9_" + fila).val(formatMoney(porcentaje));

    /*---------------------------------DEVENGADO TOTAL-----------------------------------*/
    
    var area = ""
    if (grupo != "CA") { area = "CT" } else { area = "CA" };

    var totalaL = 0;
    var titlesaL = $('input[name^=txtAl_' + area + ']').map(function (idx, elem) {
        return $(elem).val();
    }).get();
    for (i = 0; i < titlesaL.length; i++) {
        if (titlesaL[i] != "") {
            totalaL = totalaL + parseFloat(titlesaL[i].replaceAll(",", ""));
        }
    }
    //LLENA SUBTOTAL DEVENGADO
    
    $('#txtTotalAl_ST' + area + '_7').val(formatMoney(totalaL));


    var programaciontotalct = parseFloat($('#txtTotalProgramacion_ST' + area + '_0').val().replaceAll(",", ""));
    var altotalct = parseFloat($('#txtTotalAl_ST' + area + '_7').val().replaceAll(",", ""));

    $('#txtTotalDiferenciaGasto_ST' + area + '_8').val(formatMoney(altotalct - programaciontotalct));

    var porcentajestct = 0;
    if (programaciontotalct > 0) { porcentajestct = ((altotalct / programaciontotalct) * 100).toFixed(2); }

    $('#txtTotalPorcentajeAvanceGasto_ST' + area + '_9').val(formatMoney(porcentajestct));


    //var programaciontotalca = parseFloat($('#txtTotalProgramacion_STCA_0').val().replaceAll(",", ""));
    //var altotalca = parseFloat($('#txtTotalAl_STCA_7').val().replaceAll(",", ""));

    //$('#txtTotalDiferenciaGasto_STCA_8').val(formatMoney(altotalca - programaciontotalca));

    //var porcentajestca = 0;
    //if (programaciontotalca > 0) { porcentajestca = ((altotalca / programaciontotalca) * 100).toFixed(2); }

    //$('#txtTotalPorcentajeAvanceGasto_STCA_9').val(formatMoney(porcentajestca));
}
function calcularProgramadoEjecutado(grupo,tipo,semana, fila, area) {
    
    var total = 0;
    var titles = $('input[name^=' + tipo + 'Semana_' + grupo + '_' + semana + ']').map(function (idx, elem) {
        return $(elem).val();
    }).get();
    for (i = 0; i < titles.length; i++) {
        if (titles[i] != "") {
            total = total + parseFloat(titles[i].replaceAll(",", ""));
        }
    }
    
    //Llena Subtotal columna
    if (area == "CT") {
        $('#txtTotal' + tipo + 'Semana_' + grupo + '_' + semana).val(formatMoney(total));

        var PC2019 = parseFloat($('#txtTotal' + tipo + 'Semana_PC2019_' + semana).val().replaceAll(",", ""));
        var PC2020 = parseFloat($('#txtTotal' + tipo + 'Semana_PC2020_' + semana).val().replaceAll(",", ""));
        var C2 = parseFloat($('#txtTotal' + tipo + 'Semana_C2_' + semana).val().replaceAll(",", ""));

        $('#txtTotal' + tipo + 'Semana_ST' + area + '_' + semana).val(formatMoney(PC2019 + PC2020 + C2));
    } else {
        $('#txtTotal' + tipo + 'Semana_ST' + area + '_' + semana).val(formatMoney(total));
    }

    //Llena total columna
    var STCT = parseFloat($('#txtTotal' + tipo + 'Semana_STCT_' + semana).val().replaceAll(",", ""));
    var STCA = parseFloat($('#txtTotal' + tipo + 'Semana_STCA_' + semana).val().replaceAll(",", ""));

    $('#txtTotal' + tipo + 'Semana_F_' + semana).val(formatMoney(STCT + STCA));

   
    /*---------------------------------CALCULO EN FILA-----------------------------------*/

    var MontoProgramadoEjecutado = 0;
    for (var i = 1; i <= 5; i++) {
        MontoProgramadoEjecutado = MontoProgramadoEjecutado + parseFloat($('#txt' + tipo + 'Semana_' + grupo + '_' + i + '_' + fila).val().replaceAll(",", ""));
    }
    if (tipo == "Programado")
    {
        $("#txtTotalProgramadoFila_" + grupo + "_6_" + fila).val(formatMoney(MontoProgramadoEjecutado));
    }
    else
    {
        $("#txtAl_" + grupo + "_7_" + fila).val(formatMoney(MontoProgramadoEjecutado));
    }
   
    var programado = parseFloat($("#txtProgramacion_" + grupo + "_" + fila).val().replaceAll(",", ""));
    var al = parseFloat($("#txtAl_" + grupo + "_7_" + fila).val().replaceAll(",", ""));

    $("#txtDiferenciaGasto_" + grupo + "_8_" + fila).val(formatMoney(al - programado));

    var porcentaje = 0;
    if (programado > 0) { porcentaje = ((al / programado) * 100).toFixed(2); }

    $("#txtPorcentajeAvanceGasto_" + grupo + "_9_" + fila).val(formatMoney(porcentaje));

    /*----------------------------------TOTAL PROGRAMADO COLUMNA--------------------------*/

    var totalP = 0;
    var titlesP = $('input[name^=totalProgramadoFila_' + grupo + '_6]').map(function (idx, elem) {
        return $(elem).val();
    }).get();
    for (i = 0; i < titlesP.length; i++) {
        if (titlesP[i] != "") {
            totalP = totalP + parseFloat(titlesP[i].replaceAll(",", ""));
        }
    }

    $('#txtTotalProgramado_' + grupo + '_6').val(formatMoney(totalP));

    //SUMA SUBTOTAL PROGRAMADO

    //Llena Subtotal columna
    if (area == "CT") {

        var PC2019 = parseFloat($('#txtTotalProgramado_PC2019_6').val().replaceAll(",", ""));
        var PC2020 = parseFloat($('#txtTotalProgramado_PC2020_6').val().replaceAll(",", ""));
        var C2 = parseFloat($('#txtTotalProgramado_C2_6').val().replaceAll(",", ""));

        $('#txtTotalProgramado_STCT_6').val(formatMoney(PC2019 + PC2020 + C2));
    } else {
        $('#txtTotalProgramado_STCA_6').val(formatMoney(totalP));
    }


    /*---------------------------------DEVENGADO-----------------------------------*/
    
    var totalaL = 0;
    var titlesaL = $('input[name^=txtAl_' + area + ']').map(function (idx, elem) {
        return $(elem).val();
    }).get();
    for (i = 0; i < titlesaL.length; i++) {
        if (titlesaL[i] != "") {
            totalaL = totalaL + parseFloat(titlesaL[i].replaceAll(",", ""));
        }
    }

    if (area == "CT") {
        $('#txtTotalAl_STCT_7').val(formatMoney(totalaL));
    } else {
        $('#txtTotalAl_STCA_7').val(formatMoney(totalaL));
    }

    /*CT*/
    var programaciontotalct = parseFloat($('#txtTotalProgramacion_STCT_0').val().replaceAll(",", ""));
    var altotalct = parseFloat($('#txtTotalAl_STCT_7').val().replaceAll(",", ""));

    $('#txtTotalDiferenciaGasto_STCT_8').val(formatMoney(altotalct - programaciontotalct));

    var porcentajestct = 0;
    if (programaciontotalct > 0) { porcentajestct = ((altotalct / programaciontotalct) * 100).toFixed(2); }

    $('#txtTotalPorcentajeAvanceGasto_STCT_9').val(formatMoney(porcentajestct));

    /*CA*/
    var programaciontotalca = parseFloat($('#txtTotalProgramacion_STCA_0').val().replaceAll(",", ""));
    var altotalca = parseFloat($('#txtTotalAl_STCA_7').val().replaceAll(",", ""));

    $('#txtTotalDiferenciaGasto_STCA_8').val(formatMoney(altotalca - programaciontotalca));

    var porcentajestca = 0;
    if (programaciontotalca > 0) { porcentajestca = ((altotalca / programaciontotalca) * 100).toFixed(2); }

    $('#txtTotalPorcentajeAvanceGasto_STCA_9').val(formatMoney(porcentajestca));


    /*---------------------------------DEVENGADO TOTAL-----------------------------------*/
    var totalproCT = parseFloat($('#txtTotalProgramado_STCT_6').val().replaceAll(",", ""));
    var totalproCA = parseFloat($('#txtTotalProgramado_STCA_6').val().replaceAll(",", ""));

    $('#txtTotalProgramado_F_6').val(formatMoney(totalproCT + totalproCA));

    var alct = parseFloat($('#txtTotalAl_STCT_7').val().replaceAll(",", ""));
    var alca = parseFloat($('#txtTotalAl_STCA_7').val().replaceAll(",", ""));

    $('#txtTotalAl_F_7').val(formatMoney(alct + alca));

    var difct = parseFloat($('#txtTotalDiferenciaGasto_STCT_8').val().replaceAll(",", ""));
    var difca = parseFloat($('#txtTotalDiferenciaGasto_STCA_8').val().replaceAll(",", ""));

    $('#txtTotalDiferenciaGasto_F_7').val(formatMoney(difct + difca));

    var programacionF = parseFloat($('#txtTotalProgramacion_F_1').val().replaceAll(",", ""));
    var alF = parseFloat($('#txtTotalAl_F_7').val().replaceAll(",", ""));

    var porcentajefinal = 0;
    if (programacionF > 0) { porcentajefinal = ((alF / programacionF) * 100).toFixed(2); }

    $('#txtTotalPorcentajeAvanceGasto_F_8').val(formatMoney(porcentajefinal));

}

function Guardar() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    if ($("#cboAnio").val() == 0) {
        $.unblockUI();
        MensajeAlerta('Seleccione el Año antes de Guardar', 'cboAnio');
    }
    else if ($("#cboMes").val() == 0) {
        $.unblockUI();
        MensajeAlerta('Seleccione el Mes antes de Guardar', 'cboMes');
    }
    else if ($("#txtAcumuladoalFecha").val() == "") {
        $.unblockUI();
        MensajeAlerta('Ingrese una fecha antes de Guardar', 'txtAcumuladoalFecha');
    }
    else {
        var seguimiento = [];

        $.get("/SeguimientoEjecucionProyectosInversion/ListSeguimiento?Anio=" + $("#cboAnio").val() + "&Mes=" + $("#cboMes").val() + "&fecha=" + $("#txtAcumuladoalFecha").val(), function (data, status) {

            var Index = 1;

            for (var i = 1; i <= 4; i++) {

                var grupo = data.filter(x => x.CodGrupo == i);
                var nomgru = "";
                if (i == 1) {
                    nomgru = "PC2019";
                }
                else if (i == 2) {
                    nomgru = "PC2020";
                }
                else if (i == 3) {
                    nomgru = "C2";
                }
                else if (i == 4) {
                    nomgru = "CA";
                }

                for (var a = 0; a < grupo.length; a++) {
                    var s = {
                        IdProyectosSeguimiento: $('#hdIdProyectosSeguimiento_' + nomgru + '_' + a).val(),
                        CodGrupo: 1,
                        //dgpp:"",
                        //ProyectoInversion:"",
                        //IdSeguimientoEjecucionProyectosInversion:"",
                        AnioEjecucion: $("#cboAnio").val(),
                        Mes: $("#cboMes").val(),
                        PIM: $('#txtPIM_' + nomgru + '_' + a).val().replaceAll(",", ""),
                        Fecha: $("#txtAcumuladoalFecha").val(),
                        //IdProgramadoEjecutadoMensual: "",
                        ProgramadoMes: $('#txtProgramacion_' + nomgru + '_' + a).val().replaceAll(",", ""),
                        ProgramadoSemanaUno: $('#txtProgramadoSemana_' + nomgru + '_1_' + a).val().replaceAll(",", ""),
                        EjecutadoSemanaUno: $('#txtEjecutadoSemana_' + nomgru + '_1_' + a).val().replaceAll(",", ""),
                        ProgramadoSemanaDos: $('#txtProgramadoSemana_' + nomgru + '_2_' + a).val().replaceAll(",", ""),
                        EjecutadoSemanaDos: $('#txtEjecutadoSemana_' + nomgru + '_2_' + a).val().replaceAll(",", ""),
                        ProgramadoSemanaTres: $('#txtProgramadoSemana_' + nomgru + '_3_' + a).val().replaceAll(",", ""),
                        EjecutadoSemanaTres: $('#txtEjecutadoSemana_' + nomgru + '_3_' + a).val().replaceAll(",", ""),
                        ProgramadoSemanaCuatro: $('#txtProgramadoSemana_' + nomgru + '_4_' + a).val().replaceAll(",", ""),
                        EjecutadoSemanaCuatro: $('#txtEjecutadoSemana_' + nomgru + '_4_' + a).val().replaceAll(",", ""),
                        ProgramadoSemanaCinco: $('#txtProgramadoSemana_' + nomgru + '_5_' + a).val().replaceAll(",", ""),
                        EjecutadoSemanaCinco: $('#txtEjecutadoSemana_' + nomgru + '_5_' + a).val().replaceAll(",", ""),
                        TotalProgramado: $('#txtTotalProgramadoFila_' + nomgru + '_6_' + a).val().replaceAll(",", ""),
                        //IdDevengadoMensual: "",
                        
                        DevengadoAcumulado: $('#txtAl_' + nomgru + '_7_' + a).val().replaceAll(",", ""),
                        DiferenciaGasto: $('#txtDiferenciaGasto_' + nomgru + '_8_' + a).val().replaceAll(",", ""),
                        PorcentajeAvanceGasto: $('#txtPorcentajeAvanceGasto_' + nomgru + '_9_' + a).val().replaceAll(",", ""),
                        DetalleGastoMensual: $('#txtDetalleGasto__' + nomgru + '_10_' + a).val(),
                        IdUsuario: $("#hdnIdUsuario").val(),
                    }
                    seguimiento.push(s);
                }
            }

            var obj = { seguimiento: seguimiento }
            $.ajax({
                type: "POST",
                url: "/SeguimientoEjecucionProyectosInversion/GuardarSeguimiento",
                cache: false,
                data: JSON.stringify(obj),
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
        });

    }

}

function ExportarExcel() {

    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });

    $.get("/SeguimientoEjecucionProyectosInversion/ListSeguimiento?Anio=" + $("#cboAnio").val() + "&Mes=" + $("#cboMes").val() + "&fecha=" + $("#txtAcumuladoalFecha").val(), function (data, status) {
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

        var style = "<style>.text-center { vertical-align: middle;text-align: center; white-space:pre-wrap; word-wrap:break-word }; br {mso-data-placement:same-cell;}; .table-bordered {border:2px; border-style:solid; border-color:#333;}.table {width: 100%; max-width: 100%; margin-bottom: 1rem; background-color: transparent;};td{vertical-align: middle; mso-number-format:\@;}</style>";
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html lang="es-pe" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' + style + '</head><body><table>{table}</table></body></html>'
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
        // return function () {
        var table = document.getElementById('Export');
        var ctx = { worksheet: 'Hoja1' || 'Worksheet', table: table.innerHTML }

        //Construct the <a> element
        var link = document.createElement("a");
        link.download = getNombreFile('rpt_SeguimientoVSEjecucion_');
        link.href = uri + base64(format(template, ctx));

        document.body.appendChild(link);
        link.click();

        // Cleanup the DOM
        document.body.removeChild(link);
        delete link;

        //$("#Export").html("");

        $.unblockUI();
    });
}

function getNombreFile(nom) {
    var f = new Date();
    var title = nom + f.getDate() + "_" + (f.getMonth() + 1) + "_" + f.getFullYear() + "_" + f.getHours() + "_" + f.getMinutes();
    return title;
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