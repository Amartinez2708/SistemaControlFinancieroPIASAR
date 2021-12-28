function login() {
    if ($("#txtLogin").val() == "") {
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
        $("#Login").hide();
        $("#CargandoLogin").fadeIn(350);
        
        var Usuario = $("#txtLogin").val();
        var Contrasena = $('#txtPassword').val();
        var Periodo = $('#cboPeriodo').val();
        var obj = { Usuario: Usuario, Contrasena: Contrasena, Periodo: Periodo };
            $.ajax({
            type: 'POST',
            url: '/Login/Login',
            dataType: 'json',
            async: true,
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            success: function (acceso) {
                window.setTimeout(function () {
                if (acceso == "Usuario incorrecto o no existe") {
                    $("#Login").show();
                    $("#CargandoLogin").hide();
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
                else if(acceso == "Contraseña incorrecta"){
                    $("#Login").show();
                    $("#CargandoLogin").hide();
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
                else {
                    $("#user").text(acceso.Nombre);
                    if (acceso.Sexo == "F") {
                        $("#imgUser").attr("src", "/Content/Images/user-f.png");
                    } else {
                        $("#imgUser").attr("src", "/Content/Images/user-m.png");
                    }                    
                    window.setTimeout(function () {
                        window.location.href = "Inicio"
                    }, 2000);
                }
                }, 2000);
            },
            error: function (xhr, ajaxOptions, thrownError) {
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