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

function verifyInformation(e) {
    e.preventDefault();

    $.get('/viewResponse', function (res) {
        if(res.status == 200) {
            toastr["success"]("Informação recebida!");
            // console.log("res: ", res);

            $("#qtd1").text('Binário recebido e paridade: ' + res.reqInfo);
            $("#information").text('Informação recebida: ' + res.dec);
            $("#infoParidade").text('Quantidade de bits 1: ' + res.count);

        } else {
            toastr["error"]("Informação não recebida!");
        }
    })
}