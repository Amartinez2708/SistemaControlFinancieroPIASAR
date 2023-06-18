$(document).ready(function () {
    chkProyectos();
    $('#campoBusqueda').on('input', function () {
        var valorBuscado = $(this).val().trim().toLowerCase(); // Valor buscado en minúsculas
        $('#chklProyectos li').each(function () {

            var valorElemento = $(this).text().trim().toLowerCase();
            if (valorBuscado != "") {
                if (valorElemento.indexOf(valorBuscado) !== -1) {
                    $(this).removeClass('hidden');
                } else {
                    $(this).addClass('hidden');
                }
            } else {
                $(this).removeClass('hidden');
            }
        });
    });
});

function chkProyectos() {
    $.get("/AsignacionProyectos/chkProyectos", function (data, status) {
        for (var i = 0; i < data.length; i++) {
            $("#chklProyectos").append('<li><input class="border-checkbox" type="checkbox" id="checkbox' + i + '" value="' + data[i].id + '"><label class="border-checkbox-label" for="checkbox' + i + '">' + data[i].text + '</label></li>');
        }
    });
}

function AsignarProyecto() {

}