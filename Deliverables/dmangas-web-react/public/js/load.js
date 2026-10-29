$(document).ready(function() {
    /*     
    $("#header").load("componente/header.html");
    $("#slider").load("componente/slider.html");
    $("#section_home").load("componente/section_home.html"); 
    */
    $("#buscador_mobile").load("componente/buscador_mobile.html");
    $("#footer").load("componente/footer.html");
    $("[name='my-checkbox']").bootstrapSwitch();
    console.log(window.location.pathname)
    let pathName = window.location.pathname
    if (pathName == "" || pathName == "/") {
        $("#header-default, #ui-slider-home").addClass("home-page")
        $(".icons-other-page").remove()
        //$("#containterLoginRRSS").load("modal/partial/login_rrss.html")
        //$("#containterLogin").load("modal/partial/login.html")
    }
});