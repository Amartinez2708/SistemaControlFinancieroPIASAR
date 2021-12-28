

function getNombreFile(nom) {
    var f = new Date();
    var title = nom + f.getDate() + "_" + (f.getMonth() + 1) + "_" + f.getFullYear() + "_" + f.getHours() + "_" + f.getMinutes();
    return title;
}

function ExportarExcel(tabla, nom) {
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