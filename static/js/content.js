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
var menu = $('#second_menu');
var animator = $('#animator');
var menu_icon = $('#menu_icon');
var menu_content = $('#menu_content');
var menu_home = $('#menu_home');
var menu_gallery = $('#menu_gallery');
var menu_aftermovie = $('#menu_aftermovie');

menu_content.css({
    'display': 'none'
});
menu_icon.attr('src','./static/img/menu.png');


//mouse enter menu
var animation_speed_animator = 150;
menu.mouseenter(function(){
    animator.animate({
        left: "-2vh",
        width: "13vh",
        height: "13vh"
    }, animation_speed_animator);
});
menu.mouseleave(function(){
    animator.animate({
        left: "0vh",
        width: "9vh",
        height: "9vh"
    }, animation_speed_animator);
});
//menu click
var menu_state = false;
menu_icon.click(function(){
    if(menu_state == false){
        if(window.innerHeight>window.innerWidth){
            animator.animate({
                width: window.innerHeight*3,
                height: window.innerHeight*3,
                left: -window.innerWidth/.5
            }, 200);
        }else{
            animator.animate({
                width: window.innerWidth*3,
                height: window.innerWidth*3,
                left: -window.innerWidth/.9
            }, 200);
        }
        setTimeout(function(){         
            landing.css({
                "display":"none"
            });
            gallery.css({
                "display":"none"
            });
            aftermovie.css({
                "display":"none"
            });
            menu_content.css({
                "display":"block"
            });
        }, 200);
        animator.animate({
            opacity: 0
        }, 600);
        menu_icon.attr('src','./static/img/close.png');
        animator.animate({
            opacity: 1,
            left: "0vh",
            width: "9vh",
            height: "9vh"
        }, 0);
        menu_state = true;
    }else if(menu_state == true){
        if(window.innerHeight>window.innerWidth){
            animator.animate({
                width: window.innerHeight*3,
                height: window.innerHeight*3,
                left: -window.innerWidth/.5
            }, 200);
        }else{
            animator.animate({
                width: window.innerWidth*3,
                height: window.innerWidth*3,
                left: -window.innerWidth/.9
            }, 200);
        }
        setTimeout(function(){
            landing.css({
                "display":"block"
            });
            gallery.css({
                "display":"block"
            });
            aftermovie.css({
                "display":"block"
            });
            menu_content.css({
                "display":"none"
            });
        }, 200);
        animator.animate({
            opacity: 0
        }, 600);
        animator.animate({
            opacity: 1,
            left: "0vh",
            width: "9vh",
            height: "9vh"
        }, 0); 
        menu_icon.attr('src','./static/img/menu.png');
        menu_state = false;      
    }
});

//mouse click on menu content
menu_home.click(function(){
    window.location.href = 'https://bloomingreenfestival.com'
});
menu_gallery.click(function(){
    window.location.href = 'https://bloomingreenfestival.com/gallery'
});
menu_aftermovie.click(function(){
    window.location.href = 'https://bloomingreenfestival.com/aftermovie'
});

/// simple light box gallery
$('.galleryWrapper a').simpleLightbox();

