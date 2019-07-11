var full_circle = $('#full_circle_id');
var fill_left = $('#fill_left_id');
var fill_right = $('#fill_right_id');
var menu_circle = $('#menu_circle_id');
var aftermovie_icon = $('#aftermovie_icon_id');
var gallery_icon = $('#gallery_icon_id');
var aftermovie_text = $('#aftermovie_text_h1_id');
var gallery_text = $('#gallery_text_h1_id');
var gallery = $('#gallery_id');
var aftermovie = $('#aftermovie_id');
var landing = $('#landing_id');
var eighteen = $('#eighteen_id');
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

//hover event eighteen menu
if(width <= 768){
    var animation_speed_18 = 100;  
}else{
    var animation_speed_18 = 300;
}
// mouse enter
full_circle.mouseenter(function(){
    full_circle.css({
        "background-color": "white"
    });
    fill_left.animate({
        left: "0vh",
    },animation_speed_18);
    fill_right.animate({
        right: "0vh",
    },animation_speed_18);
});
// mouse leave
menu_circle.mouseleave(function(){

    setTimeout(function(){
        full_circle.css({
            "background-color": "rgba(255, 255, 255, 0.719)"
        });
    }, animation_speed_18);

    fill_left.animate({
        left: "25vh",
    },animation_speed_18);
    fill_right.animate({
        right: "25vh",
    },animation_speed_18);
});
// mouse enter and leave fill_left
fill_left.mouseenter(function(){
    fill_left.css({
        "background-color": '#133f1def'
    });
    aftermovie_icon.css({
        "background": "url(./static/img/aftermovie_white.png) no-repeat",
        "background-size": "100% 100%"
    });
    aftermovie_text.css({
        "color": "white"
    });
});
fill_left.mouseleave(function(){
    fill_left.css({
        "background-color": 'white'
    });
    aftermovie_icon.css({
        "background": "url(./static/img/aftermovie_green.png) no-repeat",
        "background-size": "100% 100%"
    });
    aftermovie_text.css({
        "color": "#133f1def"
    });
});
// mouse enter and leave fill_right
fill_right.mouseenter(function(){
    fill_right.css({
        "background-color": '#133f1def'
    });
    gallery_icon.css({
        "background": "url(./static/img/gallery_white.png) no-repeat",
        "background-size": "100% 100%"
    });
    gallery_text.css({
        "color": "white"
    });
});
fill_right.mouseleave(function(){
    fill_right.css({
        "background-color": 'white'
    });
    gallery_icon.css({
        "background": "url(./static/img/gallery_green.png) no-repeat",
        "background-size": "100% 100%"
    });
    gallery_text.css({
        "color": "#133f1def"
    });
});


// mouse click after movie
var currentPage = "landing";
var animation_speed_pages = 600;
var animation_speed_pages_double = 1200;

fill_left.click(function(){
    if(currentPage == "landing"){
        aftermovie.animate({
            left: "0%"
        }, animation_speed_pages);
        landing.animate({
            opacity: "0"
        }, animation_speed_pages);
        setTimeout(function(){
            eighteen.html("X");
        }, animation_speed_pages);
        currentPage = "aftermovie"; 
    }else if(currentPage == "gallery"){
        aftermovie.animate({
            left: "0%"
        }, animation_speed_pages);
        gallery.animate({
            right: "100%"
        }, animation_speed_pages);
        landing.css({
            opacity: "0"
        });
        currentPage = "aftermovie"; 
    }
});
//mouse click gallery
fill_right.click(function(){
    if(currentPage == "landing"){
        gallery.animate({
            right: "0%"
        }, animation_speed_pages);
        landing.animate({
            opacity: "0"
        }, animation_speed_pages);
        setTimeout(function(){
            eighteen.html("X");
        }, animation_speed_pages);
        currentPage = "gallery";
    }else if(currentPage == "aftermovie"){
        aftermovie.animate({
            left: "100%"
        }, animation_speed_pages);
        gallery.animate({
            right: "0%"
        }, animation_speed_pages);
        landing.css({
            opacity: "0"
        });
        currentPage = "gallery";
    }
});
// mouse click eighteen
eighteen.click(function(){
    if(currentPage != "landing"){
        if(currentPage == "aftermovie"){
            aftermovie.animate({
                left: "100%"
            }, animation_speed_pages);
            landing.animate({
                opacity: "1"
            }, animation_speed_pages);
            setTimeout(function(){
                eighteen.html("18");
            }, animation_speed_pages);
        }
        if(currentPage == "gallery"){
            gallery.animate({
                right: "100%"
            }, animation_speed_pages);
            landing.animate({
                opacity: "1"
            }, animation_speed_pages);
            setTimeout(function(){
                eighteen.html("18");
            }, animation_speed_pages);
        }
    }
    currentPage = "landing";
});


/// simple light box gallery
$('.galleryWrapper a').simpleLightbox();

