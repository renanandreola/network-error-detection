toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "1500",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

function sendInformation(e) {
    e.preventDefault();

    var info = document.getElementById('info').value;
    // var info = $('#info').val()

    if (!info || info == "") {
        toastr["error"]("Informação inválida!");
        return;
    }

    var payload = {
        info: info
    }

    $.post('/send', payload, function (res) {
        try {
            if (res.status == 200) {
                $("#information").text('Informação: ' + res.information);
                $("#infoParidade").text('Quantidade de bits 1: ' + res.qtd1);
                $("#qtd1").text('Binário enviado e paridade: ' + res.infoParidade);

                // console.log("info:", res.information);
                // console.log("infoParidade:", res.infoParidade);
                // console.log("qtd1:", res.qtd1);

                toastr["success"]("Informação enviada!");
                setTimeout(function(){
                    // location.reload();
                },1000);
                // $('form').trigger('reset');
            }
        }
        catch (error) {
            toastr["error"]("Informação não enviada!");
        }
    })
}