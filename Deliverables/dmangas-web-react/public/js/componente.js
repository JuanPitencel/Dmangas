$(document).ready(function() {

});

var menu = (menu) => {
    for (let index = 0; index < 5; index++) {
        var item = 'menu_' + (index + 1);
        $("#" + item + " a").removeClass('ui_active');
    }
    $("#" + menu + " a").addClass('ui_active');
}

var cargaContenido = (contenido) => {

}

var openModal = (id, from) => {
    switch (from) {
        case "login2":
            $("#" + id).modal('hide')
            break;
        default:
            break;
    }
    $("#" + id).modal('show');
}
var closeModal = (id) => {
    console.log(id);
    $("#" + id).modal('hide');
    //$("#" + id).removeClass('show').css('display', 'none');
}


var aparece = (item) => {
    $("#" + item).css('display', 'block');
}
var desaparece = (item) => {
    $("#" + item).css('display', 'none');
}
var changePartial = (partial) => {
    $("#containterLoginRRSS").load(partial)
}