$(document).ready(function () {
    /*const opciones =  {
        rows: 3,
        dots: false,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        // centerMode: false,
        centerPadding: "0",
        // rtl: false, 
        draggable: true,
        variableWidth: true,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 5,
            },
        },
        {
            breakpoint: 776,
            settings: {
                slidesToShow: 4,
                rows: 1, // This doesn't appear to work in responsive (Mac/Chrome)
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                rows: 1, // This doesn't appear to work in responsive (Mac/Chrome)
            },
        },
        ],
        // Removes the linear order. Would expect card 5 to be on next row, not stacked in groups.

    } */
    var opciones = {
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: "0",
        arrows: false,
        rtl: false,
        draggable: true,
        variableWidth: true,
        rows: 1, // Removes the linear order. Would expect card 5 to be on next row, not stacked in groups.
        responsive: [
            {
                breakpoint: 2500,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 776,
                settings: {
                    slidesToShow: 4,
                    rows: 1, // This doesn't appear to work in responsive (Mac/Chrome)
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    //centerMode: true,
                    centerPadding: "20px",
                    rows: 1, // This doesn't appear to work in responsive (Mac/Chrome)
                },
            },
        ],
    };
    var ancho = window.innerWidth;
    if (ancho <= 900) {
        /*--------MOBILE-------*/
        opciones.rows = 1;
        $('.actualization .ui_carrusel').slick(opciones);
        $('.selection_day .ui_carrusel').slick(opciones);
        $('.recomendation .ui_carrusel').slick(opciones);
        // 
        //opciones.rows = 3;
        /*opciones.slidesToShow = 5;
       opciones.slidesToScroll = 5;
       opciones.infinite = true; */
        $('.genero .ui_carrusel').slick(opciones);
    } else {
        /*--------DESKTOP-------*/
        opciones.rows = 3;
        opciones.draggable = false;
        $('.actualization .ui_carrusel').slick(opciones);
        opciones.rows = 1;
        opciones.draggable = true;
        $('.selection_day .ui_carrusel').slick(opciones);
        opciones.slidesToShow = 5;
        $('.recomendation .ui_carrusel').slick(opciones);
        /*   opciones.rows = 2;
          opciones.slidesToShow = 5; */
        opciones.rows = 2;
        $('.genero .ui_carrusel').slick(opciones);
    }



    /* GENERO */


});


