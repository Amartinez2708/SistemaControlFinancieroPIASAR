"use strict";
$(document).ready(function () {
    
    let dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let date = new Date();
    let fechaNum = date.getUTCDate();
    let mes_name = date.getMonth();

    if ($('#SpanFechaInicio').length) {
        $('#SpanFechaInicio').html("<i class='fa fa-calendar' style='font-size:20px'></i> &nbsp;" + dias[date.getDay()] + ", " + fechaNum + " de " + meses[mes_name] + " del " + date.getFullYear());
    }

    $(".autonumber").autoNumeric();
    $(".autonumber-integer").autoNumeric({ vMin: "0", vMax: "999999999" });
    $(".date-pick").datepicker({ format: "dd/mm/yyyy", todayBtn: true, clearBtn: true, todayHighlight: true, autoclose: true });
    //new AutoNumeric('.autonumber', 'dotDecimalCharCommaSeparator');
    //const anElement = AutoNumeric.multiple('.autonumber', 'dotDecimalCharCommaSeparator');
    //new AutoNumeric('.autonumber')
    //const anElement = AutoNumeric.multiple('.autonumber', 0, {
    //    suffixText: "%"
    //});
    // card js start
    $(".card-header-right .close-card").on('click', function() {
        var $this = $(this);
        $this.parents('.card').animate({
            'opacity': '0',
            '-webkit-transform': 'scale3d(.3, .3, .3)',
            'transform': 'scale3d(.3, .3, .3)'
        });

        setTimeout(function() {
            $this.parents('.card').remove();
        }, 800);
    });
    $(".card-header-right .reload-card").on('click', function() {
        var $this = $(this);
        $this.parents('.card').addClass("card-load");
        $this.parents('.card').append('<div class="card-loader"><i class="fa fa-spinner rotate-refresh"></div>');
        setTimeout(function() {
            $this.parents('.card').children(".card-loader").remove();
            $this.parents('.card').removeClass("card-load");
        }, 3000);
    });
    $(".card-header-right .card-option .fa-chevron-left").on('click', function() {
        var $this = $(this);
        if ($this.hasClass('fa-chevron-right')) {
            $this.parents('.card-option').animate({
                'width': '35px',
            });
        } else {
            $this.parents('.card-option').animate({
                'width': '180px',
            });
        }
        $(this).toggleClass("fa-chevron-right").fadeIn('slow');
    });
    $(".card-header-right .minimize-card").on('click', function() {
        var $this = $(this);
        var port = $($this.parents('.card'));
        var card = $(port).children('.card-block').slideToggle();
        $(this).toggleClass("fa-minus").fadeIn('slow');
        $(this).toggleClass("fa-plus").fadeIn('slow');
    });
    $(".card-header-right .full-card").on('click', function() {
        var $this = $(this);
        var port = $($this.parents('.card'));
        port.toggleClass("full-card");
        $(this).toggleClass("fa-window-restore");
    });

    $(".card-header-right .icofont-spinner-alt-5").on('mouseenter mouseleave', function() {
        $(this).toggleClass("rotate-refresh").fadeIn('slow');
    });
    $("#more-details").on('click', function() {
        $(".more-details").slideToggle(500);
    });
    $(".mobile-options").on('click', function() {
        $(".navbar-container .nav-right").slideToggle('slow');
    });
    $(".search-btn").on('click', function() {
        $(".main-search").addClass('open');
        $('.form-control').animate({
            'width': '200px',
        });
    });
    $(".search-close").on('click', function() {
        $('.main-search .form-control').animate({
            'width': '0',
        });
        setTimeout(function() {
            $(".main-search").removeClass('open');
        }, 300);
    });
    $(".header-notification").on('click', function() {
        $(this).children('.show-notification').slideToggle(500);
        $(this).toggleClass('active');

    });
    // card js end
    $(".main-menu").mCustomScrollbar({
        setTop: "1px",
        setHeight: "calc(100% - 90px)",
    });
    /*chatbar js start*/
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    })
        $('[data-toggle="popover"]').popover({
            html: true,
            content: function () {
                return $('#primary-popover-content').html();
            }
        });
});
$(document).ready(function() {
    $(".theme-loader").animate({
        opacity: "0"
    },1000);
    setTimeout(function() {
        $(".theme-loader").remove();
    }, 800);
   
});
function soloNumeros(e) {
    var key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
        e.preventDefault();
    }
}
function soloLetras(e) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (!regex.test(key)) {
        e.preventDefault();
        return false;
    }
}
function soloDecimales(e, field) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 8) return true;
    //if (key == 44) return true;
    if (key > 47 && key < 58) {
        if (field.value === "") return true;
        var existePto = (/[.]/).test(field.value);
        var regexp;
        if (existePto === false) {
            regexp = /.[0-9]{20}$/;
        }
        else {
            regexp = /.[0-9]{2}$/;
        }

        return true;//!(regexp.test(field.value));
    }
    if (key == 46) {
        if (field.value === "") return false;
        regexp = /^[0-9]+$/;
        return regexp.test(field.value);
    }
    return false;
}
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
function MensajeAlerta(mensaje, campo) {
    $.confirm({
        title: 'Alerta!',
        icon: 'fa fa-warning',
        content: mensaje,
        type: 'red',
        buttons: {
            close: {
                text: 'Aceptar',
                btnClass: 'btn-red',
                keys: ['enter']
            }
        },
        onDestroy: function () { $('#' + campo).focus(); }
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
};
function formatMoneyTresDecimales(amount, decimalCount, decimal, thousands) {
    try {
        decimalCount = Math.abs(3);
        decimalCount = isNaN(3) ? 3 : 3;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + "," : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ",") + (decimalCount ? "." + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};

// toggle full screen
function toggleFullScreen() {
    var a = $(window).height() - 10;

    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}
var $window = $(window);
var nav = $('.fixed-button');
    $window.scroll(function(){
        if ($window.scrollTop() >= 200) {
         nav.addClass('active');
     }
     else {
         nav.removeClass('active');
     }
 });

