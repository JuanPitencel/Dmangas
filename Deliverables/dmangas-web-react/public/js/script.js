var lastScrollTop = 0;
$(document).ready(function () {
    $(".ui_nav ul li a").click(function () {
        $(".ui_nav ul li a").removeClass("ui_active");
        $(this).addClass("ui_active");
    });
});



$(document).ready(function () {
    var slickopts = {
        slidesToShow: 3,
        infinite: true,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: "0",
        arrows: false,
        rtl: false,
        draggable: false,
        variableWidth: true,
        rows: 3, // Removes the linear order. Would expect card 5 to be on next row, not stacked in groups.
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

    $(".ui_latest_updates .carousel").slick(slickopts);
    $(".ui_latest_updates .slick-prev").click(function () {
        $(".ui_latest_updates .carousel").slick("slickPrev");
    });

    $(".ui_latest_updates .slick-next").click(function () {
        $(".ui_latest_updates .carousel").slick("slickNext");
    });
});

$(document).ready(function () {
    var slickopts = {
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

    $(".ui_day_selection .carousel").slick(slickopts);
    $(".ui_day_selection .slick-prev").click(function () {
        $(".ui_day_selection .carousel").slick("slickPrev");
    });

    $(".ui_day_selection .slick-next").click(function () {
        $(".ui_day_selection .carousel").slick("slickNext");
    });
});

$(document).ready(function () {
    var slickopts = {
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: "0",
        arrows: false,
        rtl: false,
        draggable: true,
        rows: 1, // Removes the linear order. Would expect card 5 to be on next row, not stacked in groups.
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
    };

    $(".ui_recommended .carousel").slick(slickopts);
    $(".ui_recommended .slick-prev").click(function () {
        $(".ui_recommended .carousel").slick("slickPrev");
    });

    $(".ui_recommended .slick-next").click(function () {
        $(".ui_recommended .carousel").slick("slickNext");
    });
});

$(document).ready(function () {
    var slickopts = {
        loop: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: "0",
        arrows: false,
        rtl: false,
        draggable: true,
        lazyLoad: "ondemand",
        rows: 2, // Removes the linear order. Would expect card 5 to be on next row, not stacked in groups.
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
                rows: 3, // This doesn't appear to work in responsive (Mac/Chrome)
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                rows: 3, // This doesn't appear to work in responsive (Mac/Chrome)
            },
        },
        ],
    };

    $(".ui_genders .carousel").slick(slickopts);

    $(".ui_genders .slick-prev").click(function () {
        $(".ui_genders .carousel").slick("slickPrev");
    });

    $(".ui_genders .slick-next").click(function () {
        $(".ui_genders .carousel").slick("slickNext");
    });

    $(".ui_header_nav__ul li button").click(function () {
        $(".ui_header_nav__ul li button").removeClass("ui_active");
        $(this).addClass("ui_active");
    });
});

$(".ui_buttons--nav_movil>button").click(function (e) {
    e.preventDefault();
    $(".ui_cols--books > div:first-child").fadeIn();
});

$(".ui_overlay_bar_books").click(function (e) {
    e.preventDefault();
    $(".ui_cols--books > div:first-child").fadeOut();
});

// PAGE PRODUCTS / SECTION ATUN - CABALLA
$(document).ready(function () {
    var action = false,
        clicked = false;
    var Owl = {
        init: function () {
            Owl.carousel();
        },
        carousel: function () {
            var owl;
            owl = $(".owl-carousel.tab").owlCarousel({
                items: 1,
                center: true,
                nav: false,
                dots: true,
                loop: false,
                mouseDrag: false,
                autoplay: false,
                margin: 10,
                dotsContainer: ".ui_header_nav__ul",
            });

            $(".ui_header_nav__ul").on("click", "li", function (e) {
                owl.trigger("to.owl.carousel", [$(this).index(), 300]);
            });
        },
    };
    Owl.init();
});

$(window).scroll(function () {
    if (parseFloat($(window).width()) <= 768) {
        console.log("scrolling")
        $("#footer .ui_nav_movil, #footer-nav-movil, #mobile-options-bottom").hide()

        clearTimeout($.data(this, "scrollCheck"))
        $.data(
            this,
            "scrollCheck",
            setTimeout(
                function () {
                    console.log("stop")
                    $("#footer .ui_nav_movil, #footer-nav-movil, #mobile-options-bottom").show("slow")
                }, 250
            )
        );

        /*var st = $(this).scrollTop()
        if (st > lastScrollTop) {
            $("#footer_movil").hide(500)
        } else {
            $("#footer_movil").show(500)
        }
        lastScrollTop = st*/
    }
});

$(".dropdown-menu li button span").click(function () {
    $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .find("#dropdown_id")
        .html($(this).html().trim());
});

$(".dropdown-menu li button").click(function () {
    $(".dropdown-menu li button").removeClass("ui_active");
    $(this).addClass("ui_active");
});

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" ui_active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " ui_active";
}

var $tabs = $("ul.tabs > li"),
    clickDisabled = false;

$tabs.click(function () {
    if (clickDisabled) {
        return;
    }
    if (!$(this).hasClass("active")) {
        var tabNum = $(this).index();
        var nthChild = tabNum + 1;
        $("ul.tabs > li.active").removeClass("active");
        $(this).addClass("active");
        $("ul.tab > li.active").fadeOut(300, function () {
            $(this).removeClass("active");
            $("ul.tab > li:nth-child(" + nthChild + ")")
                .addClass("active")
                .fadeIn(300);
        });
    }

    clickDisabled = true;
    setTimeout(function () {
        clickDisabled = false;
    }, 500);
});