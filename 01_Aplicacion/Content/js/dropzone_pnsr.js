//==============================================================Dropzone==================================================//


    var dep = $("#txtDepartamento").val();
    var prov = $("#txtProvincia").val();
    var dis = $("#txtDistrito").val();
    var cp = $("#txtCentroPoblado").val();

    var numfiles = 0
    $("#subir").hide();
    $("#cancelar").hide();
    Dropzone.autoDiscover = false;

    var myDropzone = new Dropzone("#dZUpload", {
        url: 'Upload.ashx?dep=' + dep + '&prov=' + prov + '&dis=' + dis + '&cp=' + cp,
        dictDefaultMessage: "Suelta los archivos aquí o haz clic para cargarlos.",
        maxFiles: 4,
        thumbnailWidth: 25,
        thumbnailHeight: 25,
        timeout: 3600000,
        maxFilesize: 50,
        parallelUploads: 4,
        autoQueue: false,
        //autoProcessQueue: false,
        addRemoveLinks: false,
        previewsContainer: "#previews-container",
        previewTemplate: GeneratorPreviewTemplate(),
        clickable: ".fileinput-button"
    });

    myDropzone.on("addedfile", function (file) {
        // Hookup the start button
        var rows = $(".divTableRow .row").length + 1;
        //file.previewElement.appendChild()

        var ext = file.name.split('.').pop();
            if (ext == "pdf") {
                myDropzone.emit("thumbnail", file, "Content/Images/PDF.png");
            } else if (ext.indexOf("doc") != -1) {
                myDropzone.emit("thumbnail", file, "Content/Images/DOC.png");
            } else if (ext.indexOf("xls") != -1) {
                myDropzone.emit("thumbnail", file, "Content/Images/XLSX.png");
            } else {
                myDropzone.emit("thumbnail", file, "Content/Images/HTML.png");
            }
            if (file.size <= 52428800) {
                $("#subir").show();
                $("#cancelar").show();
            }
        file.previewElement.querySelector(".start").onclick = function () { myDropzone.enqueueFile(file); };
    });

    // Update the total progress bar
    myDropzone.on("totaluploadprogress", function (progress) {
        document.querySelector("#total-progress .progress-bar").style.width = progress + "%";
    });

    myDropzone.on("sending", function (file) {
        // Show the total progress bar when upload starts
        document.querySelector("#total-progress").style.opacity = "1";
        // And disable the start button
        file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
    });

    // Hide the total progress bar when nothing's uploading anymore
    myDropzone.on("queuecomplete", function (progress) {
        document.querySelector("#total-progress").style.opacity = "0";
    });
    myDropzone.on("success", function (file, responseText) {
        

        console.log(file);
        console.log(responseText);

        //Agregar campos y asignar id
        var campos = "";
        var rows = $("#previews-container > div.dz-success").length;
        campos = campos + '<input type="text" ID="hdnNombreConfigFile_' + rows + '" class="form-control"/>';
        campos = campos + '<input type="text" ID="hdnNombreRealFile_' + rows + '" class="form-control"/>';
        campos = campos + '<input type="text" ID="hdnNombreTipoFile_' + rows + '" class="form-control"/>';
        campos = campos + '<input type="text" ID="hdnRutaFile_' + rows + '" class="form-control"/>';
        campos = campos + '<input type="text" ID="hdnSizeFile_' + rows + '" class="form-control"/>';
        campos = campos + '<input type="text" ID="hdnResultado_Id_' + rows + '" class="form-control"/>';
        campos = campos + '<input type="text" ID="hdnPregunta_Id_' + rows + '" class="form-control"/>';
        campos = campos + '<input type="text" ID="hdnPreguntaOpcion_Id_' + rows + '" class="form-control"/>';
        file.previewElement.querySelector("#hdnCampos").innerHTML = campos;
        file.previewElement.setAttribute("id", "File_" + rows);
        var datosfile = responseText.split("|");


        $("#hdnNombreConfigFile_" + rows).val(datosfile[0]);
        $("#hdnNombreRealFile_" + rows).val(file.name);
        $("#hdnNombreTipoFile_" + rows).val(datosfile[1]);
        $("#hdnRutaFile_" + rows).val(datosfile[2]);
        $("#hdnSizeFile_" + rows).val(file.previewElement.querySelector(".size").textContent);
        $("#hdnResultado_Id_" + rows).val(0);
        $("#hdnPregunta_Id_" + rows).val(41);
        $("#hdnPreguntaOpcion_Id_" + rows).val(152);
        
        //Modificar vista
        file.previewElement.querySelector("#progressbarfile").innerHTML = '<h5><span class="label label-inverse-success"><i class="fa fa-check" aria-hidden="true"></i>&nbsp;Finalizado</span></h5>';
        file.previewElement.classList.add("dz-success");
        file.previewElement.querySelector("#actions-row .start").style.display = 'None';
        file.previewElement.querySelector("#actions-row .donwload").style.display = '';

    });
    // Setup the buttons for all transfers
    // The "add files" button doesn't need to be setup because the config
    // `clickable` has already been specified.
    document.querySelector("#actions .start").onclick = function () {
        myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
    };
    document.querySelector("#actions .cancel").onclick = function () {
        myDropzone.removeAllFiles(true);
    };


    function GeneratorPreviewTemplate() {
        var Template = '<div class="divTableRow row pregunta40">';
        Template = Template + '<div class="divTableCell col-lg-1 text-center">';
        Template = Template + '<span class="preview"><img data-dz-thumbnail style="width:55px;" /></span>';
        Template = Template + '</div>';
        Template = Template + '<div class="divTableCell col-lg-4">';
        Template = Template + '<p class="name" data-dz-name></p>';
        Template = Template + '<strong class="error text-danger" data-dz-errormessage></strong>';
        Template = Template + '</div>';
        Template = Template + '<div class="divTableCell col-lg-3">';
        Template = Template + '<p class="size" data-dz-size></p>';
        Template = Template + '<div id="progressbarfile">';
        Template = Template + '<div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">';
        Template = Template + '<div class="progress-bar progress-bar-success" style="width: 0%;" data-dz-uploadprogress>';
        Template = Template + '</div>';
        Template = Template + '</div>';
        Template = Template + '</div>';
        Template = Template + '</div>';
        Template = Template + '<div id="actions-row" class="divTableCell col-lg-3 text-center">';
        Template = Template + '<button class="btn btn-primary start">';
        Template = Template + '<i class="fa fa-upload" aria-hidden="true"></i>';
        Template = Template + '<span>Subir</span>';
        Template = Template + '</button>';
        Template = Template + '<button class="btn btn-success donwload" style="display:none;">';
        Template = Template + '<i class="fa fa-download" aria-hidden="true"></i>';
        Template = Template + '<span>Descargar</span>';
        Template = Template + '</button>';
        Template = Template + '<button data-dz-remove class="btn btn-danger cancel">';
        Template = Template + '<i class="fa fa-trash" aria-hidden="true"></i>';
        Template = Template + '<span>Eliminar</span>';
        Template = Template + '</button>';
        Template = Template + '</div>';
        Template = Template + '<div id="hdnCampos" class="divTableCell col-lg-1 text-center">';
        Template = Template + '</div>';
        Template = Template + '</div>';
        return Template;
    }
    
