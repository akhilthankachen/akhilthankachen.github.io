var pageCount = 1;
var animationSpeed = 200;
var pageNumber = $("#pageNumber");
var rightArrow = $("#rightArrow");
var leftArrow = $("#leftArrow");
var one = $("#one");
var two = $("#two");
var three = $("#three");
var four = $("#four");
var five = $("#five");
var imgIdOne = $("#imgOne");
var imgIdTwo = $("#imgTwo");
var imgIdThree = $("#imgThree");
var imgIdFour = $("#imgFour");
var imgIdFive = $("#imgFive");
var sidebar = $("#sidebar");
var pages = $(".pages");
var backLoadingOne = $("#backLoadingOne");
var backLoadingTwo = $("#backLoadingTwo");
var backLoadingThree = $("#backLoadingThree");
var backLoadingFour = $("#backLoadingFour");
var backLoadingFive = $("#backLoadingFive");
var leftZoomFav = $("#leftZoomFav");
var rightFullFav = $("#rightFullFav");
var leftZoom = $("#leftZoom");
var rightFull = $("#rightFull");
var full = $('#full');
var fullscreen = $('#fullScreen');
var arrowButtons = $('#arrowButtons');
var fullscreenLoading = $('#fullscreenLoading');
var fullscreenImage = $('#fullscreenImage');
var imageHolder = $('imageHolder');
var count = $('#count');
var zoomControls = $('#zoomControls');

var widthPageThree = 0;
var widthPageTwo = 0;
var widthPageOne = 0;

var rightOnePos;
var rightTwoPos;
var rightThreePos;
var rightFourPos;
var rightFivePos;
var leftOnePos;
var leftTwoPos;
var leftThreePos;
var leftFourPos;
var leftFivePos;

var windowWidth = "";
var animationToggleLeft = true;
var animationToggleRight = true;
var sidebarToggle = true;
var fullScreenToggle = false;
var leftZoomToggle = false;
var hideControlsToggle = false;
//rgb(223, 183, 132) loading color



//init all pages
function init(){
    pageCount = 1;
    pageNumber.text(pageCount);
    sidebar.css({"left":"0"});
    sidebarToggle = true;
    arrowButtons.css({"display":"block"});
    count.css({"opacity":"1"});
    arrowButtons.css({"opacity":"1"});
    zoomControls.css({"opacity":"1"});
    four.css({"display":"none"});
    five.css({"display":"none"});
    backLoadingOne.css({"display":"none"});
    backLoadingTwo.css({"display":"block"});
    backLoadingThree.css({"display":"block"});
    backLoadingFour.css({"display":"none"});
    backLoadingFive.css({"display":"none"});

    var pageHeight = $(".pages").height();
    var pageWidth = ((pageHeight * 0.943) * 2480) / 3508;
    widthPageOne = pageWidth;
    var pageTwoWidth = ((pageHeight * .69) * 2480) / 3508;
    widthPageTwo = pageTwoWidth;
    var pageThreeWidth = ((pageHeight * .35) * 2480) / 3508;
    widthPageThree = pageThreeWidth;

    if(window.innerWidth > 1080){
        windowWidth = "full";

        rightOnePos = ((92/100)*pages.width()) - widthPageThree;
        rightTwoPos = ((82/100)*pages.width()) - widthPageTwo;
        rightThreePos = 0;
        rightFourPos = (18/100)*pages.width();
        rightFivePos = (8/100)*pages.width();

        leftOnePos = (8/100)*pages.width();
        leftTwoPos = (18/100)*pages.width();
        leftThreePos = 0;
        leftFourPos = ((82/100)*pages.width()) - widthPageTwo; 
        leftFivePos = ((92/100)*pages.width()) - widthPageThree;

    }else{
        windowWidth = "small";
        rightOnePos = ((96/100)*pages.width()) - widthPageThree;
        rightTwoPos = ((92/100)*pages.width()) - widthPageTwo;
        rightThreePos = 0;
        rightFourPos = (8/100)*pages.width();
        rightFivePos = (4/100)*pages.width();

        leftOnePos = (4/100)*pages.width();
        leftTwoPos = (8/100)*pages.width();
        leftThreePos = 0;
        leftFourPos = ((92/100)*pages.width()) - widthPageTwo; 
        leftFivePos = ((96/100)*pages.width()) - widthPageThree;
    }

    var pageHeight = $(".pages").height();
    var pageWidth = ((pageHeight * 0.943) * 2480) / 3508;
    widthPageOne = pageWidth;
    $("#one").css({
        "height":"90%",
        "width":pageWidth ,
        "display":"inline-block",
        "position":"absolute",
        "margin":"auto",
        "left":leftThreePos,
        "right":rightThreePos,
        "top":"0",
        "bottom":"0",
        "overflow":"hidden",
        "border-radius":"5%",
        "z-index":"99",
        "opacity":"1"
    });
    $("#imgOne").attr('src','./staticmag/img/pages/magazine18-1.jpg');
    var pageTwoWidth = ((pageHeight * .69) * 2480) / 3508;
    widthPageTwo = pageTwoWidth;
    $("#two").css({
        "width":pageTwoWidth,
        "display":"inline-block",
        "position":"absolute",
        "border-radius":"5%",
        "margin":"auto",
        "overflow":"hidden",
        "height":"65%",
        "right":rightFourPos,
        "left":leftFourPos,
        "top":"0",
        "bottom":"0",
        "z-index":"66",
        "opacity":"0.7"
    });
    var pageThreeWidth = ((pageHeight * .35) * 2480) / 3508;
    widthPageThree = pageThreeWidth;
    $("#three").css({
        "height":"35%",
        "width":pageThreeWidth,
        "display":"inline-block",
        "position":"absolute",
        "margin":"auto",
        "right":rightFivePos,
        "left":leftFivePos,
        "top":"0",
        "bottom":"0",
        "overflow":"hidden",
        "z-index":"33",
        "border-radius":"5%",
        "opacity":"0.4"
    });
    if(windowWidth == "full"){
        $("#imgTwo").attr('src','./staticmag/img/pages/magazine18-2.jpg');
        $("#imgThree").attr('src','./staticmag/img/pages/magazine18-3.jpg');
    }else{
        $("#imgTwo").attr('src','');
        $("#imgThree").attr('src','');
        $("#imgTwo").css({"display":"none"});
        $("#imgThree").css({"display":"none"});
    }

    full.css({
        "position":"absolute",
        "margin":"auto",
        "width":"100%",
        "height":"100%",
        "right":"0%"
    });
    fullscreen.css({
        "position":"absolute",
        "display":"none",
        "margin":"auto",
        "width":"100%",
        "height":"100%",
        "right":"-100%",
        "background-color":"white"
    });
    fullscreenImage.css({
        "height":"110%",
        "width":"auto"
    });
    imageHolder.css({
        "height":"100%",
        "width":"auto"
    });
}
//function executes when dom is ready
$( document ).ready(function() {
    //init
    init();
 
});


//button handle

function animateFiveToFour(id,order){
    if(order == 1){
        id.animate({
            height: "65%",
            left: leftFourPos,
            right: rightFourPos,
            opacity:"0.7",
            width: widthPageTwo
        },animationSpeed);
        id.css({"z-index":"66"});
    }else{
        id.animate({
            height: "35%",
            right: rightFivePos,
            left: leftFivePos,
            opacity:"0.4",
            width: widthPageThree
        },animationSpeed);
        id.css({"z-index":"33"});
    }
}

function animateFourToThree(id,order){
    if(order == 1){
        id.animate({
            height: "90%",
            right: rightThreePos,
            left: leftThreePos,
            opacity:"1",
            width: widthPageOne
        },animationSpeed);
        id.css({"z-index":"99"});
    }else{
        id.animate({
            height: "65%",
            right: rightFourPos,
            left: leftFourPos,
            opacity:"0.7",
            width:widthPageTwo
        },animationSpeed);
        id.css({"z-index":"66"});
    }
}

function animateThreeToTwo(id,order){
    if(order == 0){
        id.animate({
            height: "90%",
            right: rightThreePos,
            left: leftThreePos,
            opacity:"1",
            width: widthPageOne
        },animationSpeed);
        id.css({"z-index":"99"});
    }else{
        id.animate({
            height: "65%",
            left: leftTwoPos,
            right: rightTwoPos,
            opacity:"0.7",
            width:widthPageTwo
        },animationSpeed);
        id.css({"z-index":"66"});
    }
}

function animateTwoToOne(id,order){
    if(order == 0){
        id.animate({
            height: "65%",
            left: leftTwoPos,
            right: rightTwoPos,
            opacity:"0.7",
            width: widthPageTwo
        },animationSpeed);
        id.css({"z-index":"66"});
    }else{
        id.animate({
            height: "35%",
            left: leftOnePos,
            right: rightOnePos,
            opacity:"0.4",
            width: widthPageThree
        },animationSpeed);
        id.css({"z-index":"33"});
    }
}

function animateOneToFive(id,order,imgId,count,backLoading){
    if(order == 1){
        //animation first half
        id.animate({
            opacity:"0"
        },animationSpeed/2);

        imgId.attr('src','');
        imgId.css({"display":"none"});
        backLoading.css({"display":"block"});
        //animation second half
        id.animate({
            opacity:"0.4",
            right: rightFivePos,
            left: leftFivePos
        },animationSpeed/2);

        if(windowWidth == "full"){
            imgId.css({"display":"block"});
            imgId.load(function (){
                backLoading.css({"display":"none"});
            }).attr('src','./staticmag/img/pages/magazine18-'+count+'.jpg');
        }
        id.css({"z-index":"33"});

    }else{
        //animation first half
        id.animate({
            opacity:"0"
        },animationSpeed/2);

        imgId.attr('src','');
        imgId.css({"display":"none"});
        backLoading.css({"display":"block"});
        //animation second half
        id.animate({
            opacity:"0.4",
            left: leftOnePos,
            right: rightOnePos
        },animationSpeed/2);

        if(windowWidth == "full"){
            imgId.css({"display":"block"});
            imgId.load(function (){
                backLoading.css({"display":"none"});
            }).attr('src','./staticmag/img/pages/magazine18-'+count+'.jpg');
        }
        id.css({"z-index":"33"});
    }
}

function sidebarAnimation(toggle){
    if(sidebarToggle == true){
        sidebar.animate({
            left: "-30%"
        },animationSpeed);
        sidebarToggle = false;
    }else{
        sidebar.animate({
            left: "0"
        },animationSpeed);
        sidebarToggle = true;
    }
}
function clickRightPrelim(){
    if( pageCount == 1 ){
        $("#four").css({
            "height":"35%",
            "width":widthPageThree,
            "display":"inline-block",
            "position":"absolute",
            "margin":"auto",
            "right":rightFivePos,
            "left":leftFivePos,
            "top":"0",
            "bottom":"0",
            "overflow":"hidden",
            "z-index":"33",
            "border-radius":"5%",
            "opacity":"0"
        });
        animateThreeToTwo(one,1);
        animateFourToThree(two,1);
        animateFiveToFour(three,1);
        animateOneToFive(four,1,imgIdFour,4,backLoadingFour);
        animatePageNumber();
        if(windowWidth == "small"){
            windowSmallControl(imgIdTwo,backLoadingTwo,pageCount,imgIdOne,backLoadingOne);
        }
        sidebarAnimation();
    }else if( pageCount==2 ){
        $("#five").css({
            "height":"35%",
            "width":widthPageThree,
            "display":"inline-block",
            "position":"absolute",
            "margin":"auto",
            "right":rightFivePos,
            "left":leftFivePos,
            "top":"0",
            "bottom":"0",
            "overflow":"hidden",
            "z-index":"33",
            "border-radius":"5%",
            "opacity":"0"
        });
        animateTwoToOne(one,1);
        animateThreeToTwo(two,1);
        animateFourToThree(three,1);
        animateFiveToFour(four,1);
        animateOneToFive(five,1,imgIdFive,5,backLoadingFive);
        animatePageNumber();
        if(windowWidth == "small"){
            windowSmallControl(imgIdThree,backLoadingThree,pageCount,imgIdTwo,backLoadingTwo);
        }
    }
}

function clickLeftPrelim(){
    if(pageCount == 2){
        animateThreeToTwo(one,0);
        animateFourToThree(two,0);
        animateFiveToFour(three,0);
        animateOneToFive(four,0,imgIdFour,4,backLoadingFour);
        setTimeout(function (){
            four.css({"display":"none"});
        },animationSpeed/2);
        animatePageNumberLeft();
        if(windowWidth == "small"){
            windowSmallControl(imgIdOne,backLoadingOne,pageCount,imgIdTwo,backLoadingTwo);
        }
        sidebarAnimation();
    }else if(pageCount == 3){
        animateTwoToOne(one,0);
        animateThreeToTwo(two,0);
        animateFourToThree(three,0);
        animateFiveToFour(four,0);
        animateOneToFive(five,0,imgIdFive,5,backLoadingFive);
        setTimeout(function (){
            five.css({"display":"none"});
        },animationSpeed/2);
        animatePageNumberLeft();
        if(windowWidth == "small"){
            windowSmallControl(imgIdTwo,backLoadingTwo,pageCount,imgIdThree,backLoadingThree);
        }
    }
}

function windowSmallControl(imgIdEnter,backLoadingEnter,count,imgIdLeave,backLoadingLeave){
    imgIdEnter.load(function (){
        backLoadingEnter.css({"display":"none"});
    }).attr('src','./staticmag/img/pages/magazine18-'+count+'.jpg');
    imgIdEnter.css({"display":"block"});
    
    imgIdLeave.css({"display":"none"});
    backLoadingLeave.css({"display":"block"});
}

function animationToggle (side){
    if(side == 1){
        setTimeout(function (){
            animationToggleRight = true;
        },animationSpeed);
    }else{
        setTimeout(function (){
            animationToggleLeft = true;
        },animationSpeed);
    }
}

function clickRightHandle(){
    var num = pageCount%5;
    if(animationToggleRight == true){
        if(num == 3){
            animateFiveToFour(five,1);
            animateFourToThree(four,1);
            animateThreeToTwo(three,1);
            animateTwoToOne(two,1);
            animateOneToFive(one,1,imgIdOne,pageCount+3,backLoadingOne);
            animatePageNumber();
            if(windowWidth == "small"){
                windowSmallControl(imgIdFour,backLoadingFour,pageCount,imgIdThree,backLoadingThree);
            }
        }else if(num == 4){
            animateFiveToFour(one,1);
            animateFourToThree(five,1);
            animateThreeToTwo(four,1);
            animateTwoToOne(three,1);
            animateOneToFive(two,1,imgIdTwo,pageCount+3,backLoadingTwo);
            animatePageNumber();
            if(windowWidth == "small"){
                windowSmallControl(imgIdFive,backLoadingFive,pageCount,imgIdFour,backLoadingFour);
            }
        }else if(num == 0){
            animateFiveToFour(two,1);
            animateFourToThree(one,1);
            animateThreeToTwo(five,1);
            animateTwoToOne(four,1);
            animateOneToFive(three,1,imgIdThree,pageCount+3,backLoadingThree);
            animatePageNumber();
            if(windowWidth == "small"){
                windowSmallControl(imgIdOne,backLoadingOne,pageCount,imgIdFive,backLoadingFive);
            }
        }else if(num == 1){
            animateFiveToFour(three,1);
            animateFourToThree(two,1);
            animateThreeToTwo(one,1);
            animateTwoToOne(five,1);
            animateOneToFive(four,1,imgIdFour,pageCount+3,backLoadingFour);
            animatePageNumber();
            if(windowWidth == "small"){
                windowSmallControl(imgIdTwo,backLoadingTwo,pageCount,imgIdOne,backLoadingOne);
            }
        }else if(num == 2){
            animateFiveToFour(four,1);
            animateFourToThree(three,1);
            animateThreeToTwo(two,1);
            animateTwoToOne(one,1);
            animateOneToFive(five,1,imgIdFive,pageCount+3,backLoadingFive);
            animatePageNumber();
            if(windowWidth == "small"){
                windowSmallControl(imgIdThree,backLoadingThree,pageCount,imgIdTwo,backLoadingTwo);
            }
        }
        animationToggleRight = false;
        animationToggle(1);
    }
}

function clickLeftHandle(){
    var numLeft = pageCount%5;
    if(animationToggleLeft == true){
        if(numLeft == 3){
            animateFiveToFour(four,0);
            animateFourToThree(three,0);
            animateThreeToTwo(two,0);
            animateTwoToOne(one,0);
            animateOneToFive(five,0,imgIdFive,pageCount-3,backLoadingFive);
            animatePageNumberLeft();
            if(windowWidth == "small"){
                windowSmallControl(imgIdTwo,backLoadingTwo,pageCount,imgIdThree,backLoadingThree);
            }
        }else if(numLeft == 4){
            animateFiveToFour(five,0);
            animateFourToThree(four,0);
            animateThreeToTwo(three,0);
            animateTwoToOne(two,0);
            animateOneToFive(one,0,imgIdOne,pageCount-3,backLoadingOne);
            animatePageNumberLeft();
            if(windowWidth == "small"){
                windowSmallControl(imgIdThree,backLoadingThree,pageCount,imgIdFour,backLoadingFour);
            }
        }else if(numLeft == 0){
            animateFiveToFour(one,0);
            animateFourToThree(five,0);
            animateThreeToTwo(four,0);
            animateTwoToOne(three,0);
            animateOneToFive(two,0,imgIdTwo,pageCount-3,backLoadingTwo);
            animatePageNumberLeft();
            if(windowWidth == "small"){
                windowSmallControl(imgIdFour,backLoadingFour,pageCount,imgIdFive,backLoadingFive);
            }
        }else if(numLeft == 1){
            animateFiveToFour(two,0);
            animateFourToThree(one,0);
            animateThreeToTwo(five,0);
            animateTwoToOne(four,0);
            animateOneToFive(three,0,imgIdThree,pageCount-3,backLoadingThree);
            animatePageNumberLeft();
            if(windowWidth == "small"){
                windowSmallControl(imgIdFive,backLoadingFive,pageCount,imgIdOne,backLoadingOne);
            }
        }else if(numLeft == 2){
            animateFiveToFour(three,0);
            animateFourToThree(two,0);
            animateThreeToTwo(one,0);
            animateTwoToOne(five,0);
            animateOneToFive(four,0,imgIdFour,pageCount-3,backLoadingFour);
            animatePageNumberLeft();
            if(windowWidth == "small"){
                windowSmallControl(imgIdOne,backLoadingOne,pageCount,imgIdTwo,backLoadingTwo);
            }
        }
        animationToggleLeft = false;
        animationToggle(0);
    }

}

function animatePageNumber(){
    pageCount++;
    pageNumber.text(pageCount);
}
function animatePageNumberLeft(){
    pageCount--;
    pageNumber.text(pageCount);
}

//arrow keys control
$(document).keydown(function(e) {
    if(e.keyCode == 37){
        leftArrowClick();
    }else if(e.keyCode == 39){
        rightArrowClick();
    }
});
function rightArrowClick(){
    if(pageCount <= 2){
        clickRightPrelim();
    }else if(pageCount >= 154){

    }
    else{
        clickRightHandle();
    }
}
function leftArrowClick(){
    if(pageCount >= 4){
        clickLeftHandle();
    }else if((pageCount < 4) && (pageCount > 1)){
        clickLeftPrelim();
    }
}

rightArrow.click(rightArrowClick);
leftArrow.click(leftArrowClick);

//mouse over

one.mouseenter(function (){
    if(((pageCount%5) == 1) && (windowWidth == "full")){
        one.css({"box-shadow": "0 0 18px rgb(61, 61, 61)","-webkit-box-shadow":"0 0 18px rgb(61, 61, 61)","cursor":"pointer"});
    }
});
one.mouseleave(function (){
    if(windowWidth == "full"){
        one.css({"box-shadow": "","-webkit-box-shadow":""});
    }
});
two.mouseenter(function (){
    if(((pageCount%5) == 2) && (windowWidth == "full")){
        two.css({"box-shadow": "0 0 18px rgb(61, 61, 61)","-webkit-box-shadow":"0 0 18px rgb(61, 61, 61)","cursor":"pointer"});
    }
});
two.mouseleave(function (){
    if(windowWidth == "full"){
        two.css({"box-shadow": "","-webkit-box-shadow":""});
    }
});
three.mouseenter(function (){
    if(((pageCount%5) == 3) && (windowWidth == "full")){
        three.css({"box-shadow": "0 0 18px rgb(61, 61, 61)","-webkit-box-shadow":"0 0 18px rgb(61, 61, 61)","cursor":"pointer"});
    }
});
three.mouseleave(function (){
    if(windowWidth == "full"){
        three.css({"box-shadow": "","-webkit-box-shadow":""});
    }
});
four.mouseenter(function (){
    if(((pageCount%5) == 4) && (windowWidth == "full")){
        four.css({"box-shadow": "0 0 18px rgb(61, 61, 61)","-webkit-box-shadow":"0 0 18px rgb(61, 61, 61)","cursor":"pointer"});
    }
});
four.mouseleave(function (){
    if(windowWidth == "full"){
        four.css({"box-shadow": "","-webkit-box-shadow":""});
    }
});
five.mouseenter(function (){
    if(((pageCount%5) == 0) && (windowWidth == "full")){
        five.css({"box-shadow": "0 0 18px rgb(61, 61, 61)","-webkit-box-shadow":"0 0 18px rgb(61, 61, 61)","cursor":"pointer"});
    }
});
five.mouseleave(function (){
    if(windowWidth == "full"){
        five.css({"box-shadow": "","-webkit-box-shadow":""});
    }
});

// favicon handles

leftZoomFav.mouseenter(function (){
    leftZoom.css({"background-color": "transparent","cursor":"pointer"});
});
leftZoomFav.mouseleave(function (){
    leftZoom.css({"background-color": "white","cursor":"inherit"});
});
rightFullFav.mouseenter(function (){
    rightFull.css({"background-color": "transparent","cursor":"pointer"});
});
rightFullFav.mouseleave(function (){
    rightFull.css({"background-color": "white","cursor":"inherit"});
});

function leftZoomFav_click(){
    // left zoom favicon click handle
    if(!leftZoomToggle){
        arrowButtons.css({"display":"none"});
        fullscreen.css({"display":"block"});
        full.animate({right:"100%"},animationSpeed+100);
        fullscreen.animate({right:"0%"},animationSpeed+100);
        setTimeout(function (){
            fullscreenImage.load(function (){
                fullscreenLoading.css({"display":"none"});
            }).attr('src','./staticmag/img/pages/magazine18-'+pageCount+'.jpg');
            leftZoomFav.attr('src','./staticmag/img/zoomDown.png');
        },animationSpeed+100);
        leftZoomToggle = true;
    }else{
        arrowButtons.css({"display":"block"});
        full.animate({right:"0%"},animationSpeed+100);
        fullscreen.animate({right:"-100%"},animationSpeed+100);
        setTimeout(function (){
            fullscreen.css({"display":"none"});
            fullscreenImage.load(function (){
                fullscreenLoading.css({"display":"block"});
            }).attr('src','');
            leftZoomFav.attr('src','./staticmag/img/zoomUp.png');
        },animationSpeed+100);
        leftZoomToggle = false;
    }

}

function rightFullFav_click(){
    // full screen click- right Favicon
    var elem = document.body;
    if(!fullScreenToggle){
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
        rightFullFav.attr('src','./staticmag/img/minimize.png');
        fullScreenToggle = true;
    }else{
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } 
        rightFullFav.attr('src','./staticmag/img/fullscreen.png');
        fullScreenToggle = false;
    }
}
if (document.addEventListener)
{
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
}
function exitHandler()
{
    imgIdOne.attr('src','');
    imgIdTwo.attr('src','');
    imgIdThree.attr('src','');
    imgIdFour.attr('src','');
    imgIdFive.attr('src','');
    init();
}

leftZoomFav.click(leftZoomFav_click);
rightFullFav.click(rightFullFav_click);

// hiding controls when clicked
function hideControls(){
    if(!hideControlsToggle){
        count.animate({opacity:"0"},animationSpeed);
        zoomControls.animate({opacity:"0"},animationSpeed);
        arrowButtons.animate({opacity:"0"},animationSpeed);
        hideControlsToggle = true;
    }else{
        count.animate({opacity:"1"},animationSpeed);
        zoomControls.animate({opacity:"1"},animationSpeed);
        arrowButtons.animate({opacity:"1"},animationSpeed);
        hideControlsToggle = false;
    }
}
fullscreenImage.click(hideControls);

// swipe right and left detection

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);
var xDown = null;                                                        
var yDown = null;  

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
}; 

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            if(!leftZoomToggle){
                leftArrowClick();
            }
        } else {
            if(!leftZoomToggle){
                rightArrowClick();
            }
        }                       
    } 
    xDown = null;
    yDown = null;                                             
};

// handling click on images

one.click(function (){
    if((pageCount%5) == 1){
        leftZoomFav_click();
    }
});
two.click(function (){
    if((pageCount%5) == 2){
        leftZoomFav_click();
    }
});
three.click(function (){
    if((pageCount%5) == 3){
        leftZoomFav_click();
    }
});
four.click(function (){
    if((pageCount%5) == 4){
        leftZoomFav_click();
    }
});
five.click(function (){
    if((pageCount%5) == 0){
        leftZoomFav_click();
    }
});

//key handle for space and f

$('body').keyup(function(e){
    if(e.keyCode == 32){
        // user has pressed space
        leftZoomFav_click();
    }
    if(e.keyCode == 70){
        // user has pressed space
        rightFullFav_click();
    }
    if(e.keyCode == 72){
        // user has pressed space
        hideControls();
    }
 });