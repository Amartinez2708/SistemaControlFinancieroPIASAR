$(document).ready(function () {
    $('#txtLogin').keypress(function (e) {
        if (e.keyCode == 13)
            $('#submit').click();
    });
    $('#txtPassword').keypress(function (e) {
        if (e.keyCode == 13)
            $('#submit').click();
    });
});
function login() {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    if ($("#txtLogin").val() == "") {
        $.unblockUI();
        $.confirm({
            title: 'Error',
            content: 'Debe Ingresar su Usuario',
            icon: 'fa fa-frown-o',
            theme: 'modern',
            closeIcon: true,
            closeIconClass: 'fa fa-close',
            animation: 'scale',
            type: 'red',
            buttons: {
                okay: {
                    text: 'Ok',
                    btnClass: 'btn-red'
                }
            }
        });
    }
    else if ($("#txtPassword").val() == "") {
        $.unblockUI();
        $.confirm({
            title: 'Error',
            content: 'Debe Ingresar su Contraseña',
            icon: 'fa fa-frown-o',
            theme: 'modern',
            closeIcon: true,
            closeIconClass: 'fa fa-close',
            animation: 'scale',
            type: 'red',
            buttons: {
                okay: {
                    text: 'Ok',
                    btnClass: 'btn-red'
                }
            }
        });
    }
    else {
        var Usuario = $("#txtLogin").val();
        var Contrasena = $('#txtPassword').val();
        var obj = { Usuario: Usuario, Contrasena: Contrasena };

        $.ajax({
            type: 'POST',
            url: '/Login/Login',
            dataType: 'json',
            async: true,
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            success: function (acceso) {

                if (acceso == "Usuario incorrecto o no existe") {
                    $.unblockUI();
                    $.confirm({
                        title: 'Error',
                        content: acceso,
                        icon: 'fa fa-frown-o',
                        theme: 'modern',
                        closeIcon: true,
                        closeIconClass: 'fa fa-close',
                        animation: 'scale',
                        type: 'red',
                        buttons: {
                            okay: {
                                text: 'Ok',
                                btnClass: 'btn-red',
                                action: function () {
                                    window.location.href = "Login";
                                }
                            }
                        }
                    });
                }
                else if (acceso == "Contraseña incorrecta") {
                    $.unblockUI();
                    $.confirm({
                        title: 'Error',
                        content: acceso,
                        icon: 'fa fa-frown-o',
                        theme: 'modern',
                        closeIcon: true,
                        closeIconClass: 'fa fa-close',
                        animation: 'scale',
                        type: 'red',
                        buttons: {
                            okay: {
                                text: 'Ok',
                                btnClass: 'btn-red',
                                action: function () {
                                    window.location.href = "Login";
                                }
                            }
                        }
                    });
                }
                else
                {
                  location.href = "/Inicio";
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $.unblockUI();
                $.confirm({
                    title: 'Error',
                    content: "Usuario o Contraseña Incorrecto",
                    icon: 'fa fa-frown-o',
                    theme: 'modern',
                    closeIcon: true,
                    closeIconClass: 'fa fa-close',
                    animation: 'scale',
                    type: 'red',
                    buttons: {
                        okay: {
                            text: 'Ok',
                            btnClass: 'btn-red',
                            action: function () {
                                window.location.href = "Login";
                            }
                        }
                    }
                });
            }
        });
    }
}
function redireccionar(ruta) {
    $.blockUI({ message: '<img src="/Content/Images/Ellipsis-2.3s-182px.gif">' });
    window.location.href = ruta;
}