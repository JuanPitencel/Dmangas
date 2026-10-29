var $ = jQuery.noConflict();
$(document).ready(function () {
    $(".actualization .ui_carrusel .owl-carousel").owlCarousel({
        loop: true,
        autoplay: false,
        autoplayTimeout: 3000,
        margin: 0,
        dots: true,
        nav: true,
        touchDrag: true,
        mouseDrag: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 6,
            },
        },
    });
});

