// Initialize Firebase

var config = {
    apiKey: "AIzaSyAcc11rgCRK5Ygd1WpFX556Sn36HGCI-hA",
    authDomain: "dhwani18-8b03f.firebaseapp.com",
    databaseURL: "https://dhwani18-8b03f.firebaseio.com",
    projectId: "dhwani18-8b03f",
    storageBucket: "dhwani18-8b03f.appspot.com",
    messagingSenderId: "866486690145"
};
firebase.initializeApp(config);


    var providerGoogle = new firebase.auth.GoogleAuthProvider();
    var providerFacebook = new firebase.auth.FacebookAuthProvider();

    function googleSignIn(){
        SignIn(providerGoogle);
    }

    function facebookSignIn(){
        SignIn(providerFacebook);
    }


    function SignIn(provider){  

        firebase.auth().signInWithPopup(provider).then(function(result) {

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;


    // ...
    }).catch(function(error) {

    console.log(error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    document.getElementById("login_failed").innerHTML = "Login Failed.";
    // ...
    });

    
}

function signOut(){
            firebase.auth().signOut().then(function() {
        document.getElementById('login-mob').innerHTML='LOGIN/REGISTER';
        $('#login').css({'background-image':''});

    // Sign-out successful.
}).catch(function(error) {
    // An error happened.

});

}

initApp = function check() {
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    user.getIdToken().then(function(accessToken) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        document.getElementById("displayName").innerHTML=displayName;
        document.getElementById("email").innerHTML=email;
        document.getElementById('profilepic').setAttribute('src',photoURL);
        document.getElementById('login-mob').innerHTML=displayName+'/Profile';
        $('#login').css({'background-image': 'url('+photoURL+')'});
        $('#login').css({'background-size': '100%'});


        localStorage.setItem("accessToken", accessToken);

        var config = {
            headers: {'Content-Type': 'application/json',
        'x-auth-token' : accessToken}
        };

        axios.post('https://api.dhwanicet.org/student/login', {}, config)
        .then(function(response){
            if(response.data.registered===true){
                
                console.log(response.data);
                document.getElementById('unique-id').innerHTML ='D-'+response.data.id;
               

                axios.get('https://api.dhwanicet.org/student/event',config)
                .then(function(response){
                  var eventsJson = response.data;
                    $("#reg_events").html('');
                  eventsJson.forEach(function(item){
                     axios.get('https://api.dhwanicet.org/student/event/'+item.id,config)
                .then(function(response){
                    if(response.data.paid===true)
                      $("#reg_events").append("<div class=\"eachevent\"><h5>"+item.name+"</h5></div><div class=\"paid\"><h5>paid</h5></div>");
                    else
                      $("#reg_events").append("<div class=\"eachevent\"><h5>"+item.name+"</h5></div><div class=\"paid\"><h5>not paid</h5></div>");
                }); 
                  });
                }).catch(function(error){
                  console.log(error);
                });


                $('#logContent').animate({"right":"100%"});
                $('#profile-content').animate({"right":"0%"});
                //window.location.href = "./profile.html";
                }
            else{
                $('#logContent').animate({"right":"0%"});
                $('#profile-content').animate({"right":"-100%"});
                $('#register').animate({"right":"0%"});
                $('#regpage').animate({"right":"100%"});
            }
            });

    }); 

    } else {
        $('#logContent').animate({"right":"0%"});
        $('#profile-content').animate({"right":"-100%"});
        $('#register').animate({"right":"-100%"});
        $('#regpage').animate({"right":"0%"});
        document.getElementById('sign-in-status').textContent = 'Signed IN';
        document.getElementById('login-mob').innerHTML='LOGIN/REGISTER';
        $('#login').css({'background-image':''});

    }
}, function(error) {
    console.log(error);
});
};



window.addEventListener('load', function() {
initApp()
});
var lastActive = "#main";
function regEvent(event){
    var eventName;
    self = this;
    // event = reg.eventid;
    // eventName = reg.eventName;
    // console.log(reg);
    
    // console.log(eventName + "event name ");
    
    axios.get('https://api.dhwanicet.org/public/event/' + event, {}, { 'Content-Type': 'application/json'})
        .then(function(res) 
            {
            eventName = res.data.name;
            eventObj = res.data;
            if(eventObj.group) 
            {
                values = ""
                
                $("input[name='inputs[]']").each(function () {
                    if ($(this).val()) 
                    {
                        values += ($(this).val());
                        values += ',';

                    }                   

                });
                values = values.slice(0, -1);
                groupArray = values

            }
            else
            {
                groupArray = ""
            }
            if (window.innerWidth <= 768) { var anim = 400; } else { var anim = 600; }
            function animateToProfile() {
                $('#main').animate({ "bottom": "100%" }, anim);
                $('#login-content').animate({ "top": "0%" }, anim);
                lastActive = "#login-content";
            }
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    user.getIdToken().then(function (accessToken) {
                        console.log(accessToken);

                        prefilledData =  {
                            eventcode: "dhwani-18-334330",
                            name:user.displayName,
                            emailid:user.email,
                            cq1: user.phoneNumber,
                            ticketname1: eventName,
                            ticketvalue1: 1,
                        }
                        console.log(prefilledData)
                        
                        var config = {
                            headers: {
                                'Content-Type': 'application/json',
                                'x-auth-token': accessToken
                            }
                        };

                        axios.get('https://api.dhwanicet.org/student/event', config)
                        .then( (res) => {
                            registeredEvents = res.data;
                            isAlreadyRegistered = false;
                            isPaid = false;
                            registeredEvents.forEach(
                                (item) => {
                                    if(item.id == event)
                                    {
                                        isAlreadyRegistered = true;
                                        isPaid = item.paid;
                                    }
                            })

                            if(!isAlreadyRegistered)
                            {
                                axios.put('https://api.dhwanicet.org/student/event/' + event, { 'group': groupArray }, config)
                                .then(function (response) {
                                    $("input[name='inputs[]']").each(function () {
                                      $(this).val('');
                                         });
                                    popupWithAutoFill(prefilledData)     
                                    alert('Registration Successful');
                                }).catch(function (error) {
                                    $("input[name='inputs[]']").each(function () {
                                      $(this).val('');
                                         });
                                    console.log('error : ' + error);
                                    alert('Registartion failed : check the fields');
                                });                                
                            }

                            else 
                            {
                                if(isPaid)
                                {
                                    alert("You are already registered!");
                                }
                                else 
                                {
                                    popupWithAutoFill(prefilledData);
                                    alert("You have not yet paid for the event.")
                                }
                            }

                            
                        }
                        )
                        .catch((err) => {
                            console.log(err);
                            
                        })
                    });
                } else {
                    $('#event-content').animate({ "bottom": "100%" }, anim);
                    $('#main').animate({ "bottom": "0%" }, anim);
                    setTimeout(animateToProfile, anim);
                }
            });

            })
        .catch((err) => {
            console.log(err)
            alert(err);
        })
    // console.log(event);
    // if(event.group) 
    // {
    //     console.log("Group event" + event);
    // }

    // if(groupArray == undefined){
    //     groupArray = "";
    // }
    

}


function status(statusMsg){
    function downToggle(callback){
        $("#mSg").append(statusMsg);
        $('#status').animate({"top":"-3px"},600);
        setTimeout(callback,3000);
    }
    function upToggle(callback){
        $('#status').animate({"top":"-36px"},600);
        $("#mSg").html('');
    }
    setTimeout(downToggle(upToggle),600);
}


var imgObj = {};

var lastId;
var toggleclose = false;
var togglelist = false;
function workshopAnimate(id){
    function loadImg(){
        if(imgObj[id]!=''){
            $('#imgLOAD'+id).attr('src',imgObj[id]);
            imgObj[id] = '';
        }
    }
    function toggleClose(){
        if(toggleclose == false){
            $('.close-all').css({"display":"block"});
            toggleclose = true;
        }else{
            $('.close-all').css({"display":"none"});
            toggleclose = false;
        }
    }
    function toggleList(){
        if(togglelist == false){
            $('.list').css({"display":"none"});
            togglelist = true;
        }else{
            $('.list').css({"display":""});
            togglelist = false;
        }
    }
    if(id==9999){
        if(window.innerWidth<=768){
            $('#work'+lastId).animate({"top":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }else{
            $('#work'+lastId).animate({"left":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }
    }else{
        lastId = id;
        if(window.innerWidth<=768){
            $('#work'+id).animate({"top":"60px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }else{
            $('#work'+id).animate({"left":"110px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }
        loadImg();
    }
}


var lastIdComp;
var togglecloseComp = false;
var togglelistComp = false;
function competitionAnimate(id){
    function toggleClose(){
        if(togglecloseComp == false){
            $('.close-all-competition').css({"display":"block"});
            togglecloseComp = true;
        }else{
            $('.close-all-competition').css({"display":"none"});
            togglecloseComp = false;
        }
    }
    function toggleList(){
        if(togglelistComp == false){
            $('.list-competition').css({"display":"none"});
            togglelistComp = true;
        }else{
            $('.list-competition').css({"display":""});
            togglelistComp = false;
        }
    }
    if(id==9999){
        if(window.innerWidth<=768){
            $('#comp'+lastIdComp).animate({"top":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }else{
            $('#comp'+lastIdComp).animate({"left":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }
    }else{
        lastIdComp = id;
        if(window.innerWidth<=768){
            $('#comp'+id).animate({"top":"60px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }else{
            $('#comp'+id).animate({"left":"110px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }
    }
}



var lastIdAnt;
var togglecloseAnt = false;
var togglelistAnt = false;
function antAnimate(id){
    function loadImg(){
        if(imgObj[id]!=''){
            $('#imgLOAD'+id).attr('src',imgObj[id]);
            imgObj[id] = '';
        }
    }
    function toggleClose(){
        if(togglecloseAnt == false){
            $('.close-all-ant').css({"display":"block"});
            togglecloseAnt = true;
        }else{
            $('.close-all-ant').css({"display":"none"});
            togglecloseAnt = false;
        }
    }
    function toggleList(){
        if(togglelistAnt == false){
            $('.list-ant').css({"display":"none"});
            togglelistAnt = true;
        }else{
            $('.list-ant').css({"display":""});
            togglelistAnt = false;
        }
    }
    if(id==9999){
        if(window.innerWidth<=768){
            $('#ant'+lastIdAnt).animate({"top":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }else{
            $('#ant'+lastIdAnt).animate({"left":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }
    }else{
        lastIdAnt = id;
        if(window.innerWidth<=768){
            $('#ant'+id).animate({"top":"60px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }else{
            $('#ant'+id).animate({"left":"110px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0); 
        }
        loadImg();
    }
}

var lastIdDio;
var togglecloseDio = false;
var togglelistDio = false;
function dioAnimate(id){
    function loadImg(){
        if(imgObj[id]!=''){
            $('#imgLOAD'+id).attr('src',imgObj[id]);
            imgObj[id] = '';
        }
    }
    function toggleClose(){
        if(togglecloseDio == false){
            $('.close-all-dio').css({"display":"block"});
            togglecloseDio = true;
        }else{
            $('.close-all-dio').css({"display":"none"});
            togglecloseDio = false;
        }
    }
    function toggleList(){
        if(togglelistDio == false){
            $('.list-dio').css({"display":"none"});
            togglelistDio = true;
        }else{
            $('.list-dio').css({"display":""});
            togglelistDio = false;
        }
    }
    if(id==9999){
        if(window.innerWidth<=768){
            $('#dio'+lastIdDio).animate({"top":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }else{
            $('#dio'+lastIdDio).animate({"left":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }
    }else{
        lastIdDio = id;
        if(window.innerWidth<=768){
            $('#dio'+id).animate({"top":"60px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }else{
            $('#dio'+id).animate({"left":"110px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }
        loadImg();
    }
}

var lastIdNad;
var togglecloseNad = false;
var togglelistNad = false;
function nadAnimate(id){
    function loadImg(){
        if(imgObj[id]!=''){
            $('#imgLOAD'+id).attr('src',imgObj[id]);
            imgObj[id] = '';
        }
    }
    function toggleClose(){
        if(togglecloseNad == false){
            $('.close-all-nad').css({"display":"block"});
            togglecloseNad = true;
        }else{
            $('.close-all-nad').css({"display":"none"});
            togglecloseNad = false;
        }
    }
    function toggleList(){
        if(togglelistNad == false){
            $('.list-nad').css({"display":"none"});
            togglelistNad = true;
        }else{
            $('.list-nad').css({"display":""});
            togglelistNad = false;
        }
    }
    if(id==9999){
        if(window.innerWidth<=768){
            $('#nad'+lastIdNad).animate({"top":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }else{
            $('#nad'+lastIdNad).animate({"left":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }
    }else{
        lastIdNad = id;
        if(window.innerWidth<=768){
            $('#nad'+id).animate({"top":"60px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }else{
            $('#nad'+id).animate({"left":"110px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }
        loadImg();
    }
}


var lastIdCar;
var togglecloseCar = false;
var togglelistCar = false;
function carAnimate(id){
    function loadImg(){
        if(imgObj[id]!=''){
            $('#imgLOAD'+id).attr('src',imgObj[id]);
            imgObj[id] = '';
        }
    }
    function toggleClose(){
        if(togglecloseCar == false){
            $('.close-all-car').css({"display":"block"});
            togglecloseCar = true;
        }else{
            $('.close-all-car').css({"display":"none"});
            togglecloseCar = false;
        }
    }
    function toggleList(){
        if(togglelistCar == false){
            $('.list-car').css({"display":"none"});
            togglelistCar = true;
        }else{
            $('.list-car').css({"display":""});
            togglelistCar = false;
        }
    }
    if(id==9999){
        if(window.innerWidth<=768){
            $('#car'+lastIdCar).animate({"top":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }else{
            $('#car'+lastIdCar).animate({"left":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }
    }else{
        lastIdCar = id;
        if(window.innerWidth<=768){
            $('#car'+id).animate({"top":"60px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }else{
            $('#car'+id).animate({"left":"110px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }
        loadImg();
    }
}



var lastIdKhe;
var togglecloseKhe = false;
var togglelistKhe = false;
function kheAnimate(id){
    function loadImg(){
        if(imgObj[id]!=''){
            $('#imgLOAD'+id).attr('src',imgObj[id]);
            imgObj[id] = '';
        }
    }
    function toggleClose(){
        if(togglecloseKhe == false){
            $('.close-all-khe').css({"display":"block"});
            togglecloseKhe = true;
        }else{
            $('.close-all-khe').css({"display":"none"});
            togglecloseKhe = false;
        }
    }
    function toggleList(){
        if(togglelistKhe == false){
            $('.list-khe').css({"display":"none"});
            togglelistKhe = true;
        }else{
            $('.list-khe').css({"display":""});
            togglelistKhe = false;
        }
    }
    if(id==9999){
        if(window.innerWidth<=768){
            $('#khe'+lastIdKhe).animate({"top":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }else{
            $('#khe'+lastIdKhe).animate({"left":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }
    }else{
        lastIdKhe = id;
        if(window.innerWidth<=768){
            $('#khe'+id).animate({"top":"60px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }else{
            $('#khe'+id).animate({"left":"110px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }
        loadImg();
    }
}


var lastIdMis;
var togglecloseMis = false;
var togglelistMis = false;
function misAnimate(id){
    function loadImg(){
        if(imgObj[id]!=''){
            $('#imgLOAD'+id).attr('src',imgObj[id]);
            imgObj[id] = '';
        }
    }
    function toggleClose(){
        if(togglecloseMis == false){
            $('.close-all-mis').css({"display":"block"});
            togglecloseMis = true;
        }else{
            $('.close-all-mis').css({"display":"none"});
            togglecloseMis = false;
        }
    }
    function toggleList(){
        if(togglelistMis == false){
            $('.list-mis').css({"display":"none"});
            togglelistMis = true;
        }else{
            $('.list-mis').css({"display":""});
            togglelistMis = false;
        }
    }
    if(id==9999){
        if(window.innerWidth<=768){
            $('#mis'+lastIdMis).animate({"top":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }else{
            $('#mis'+lastIdMis).animate({"left":"100%"});
            setTimeout(toggleClose,0);
            setTimeout(toggleList,400);
        }
    }else{
        lastIdMis = id;
        if(window.innerWidth<=768){
            $('#mis'+id).animate({"top":"60px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0);
        }else{
            $('#mis'+id).animate({"left":"110px"});
            setTimeout(toggleClose,400);
            setTimeout(toggleList,0); 
        }
        loadImg();
    }
}




$( window ).on( "load", function() {
    var shiteWidth = window.innerWidth - ((5/100)*window.innerWidth);
    if(window.innerWidth<=768){
        $('#comp1').css({"top":"100%","left":"0","height":window.innerHeight - 120});
        $('#comp2').css({"top":"100%","left":"0","height":window.innerHeight - 120});
        $('#comp3').css({"top":"100%","left":"0","height":window.innerHeight - 120});
        $('#comp4').css({"top":"100%","left":"0","height":window.innerHeight - 120});
        $('#comp5').css({"top":"100%","left":"0","height":window.innerHeight - 120});
        $('#comp6').css({"top":"100%","left":"0","height":window.innerHeight - 120});
    }else{
        $('#comp1').css({"top":"0","left":"100%","width":shiteWidth - 220});
        $('#comp2').css({"top":"0","left":"100%","width":shiteWidth - 220});
        $('#comp3').css({"top":"0","left":"100%","width":shiteWidth - 220});
        $('#comp4').css({"top":"0","left":"100%","width":shiteWidth - 220});
        $('#comp5').css({"top":"0","left":"100%","width":shiteWidth - 220});
        $('#comp6').css({"top":"0","left":"100%","width":shiteWidth - 220});
    }

    function preloader(){
        $("#overlay").animate({"bottom":"100vh"},600);
    }
    setTimeout(preloader,400);




    var toggle = false;


    function resetPage(){
            $("#main").animate({"bottom":"0%"},0);
            $("#main").animate({"right":"100%"},0);
            $("#about-content").animate({"top":"100%"},0);
            $("#about-content").animate({"right":"0%"},0);
            $("#login-content").animate({"top":"100%"},0);
            $("#login-content").animate({"right":"0%"},0);
            $("#proshow-content").animate({"bottom":"100%"},0);
            $("#proshow-content").animate({"right":"0%"},0);
            $("#event-content").animate({"bottom":"100%"},0);
            $("#event-content").animate({"right":"0%"},0);
            $("#contact-content").animate({"right":"100%"},0);
            $("#accomodation-content").animate({"right":"100%"},0);
    }

    if(window.innerWidth<=768){var anim = 400;}else{var anim=600;}

    function animateMenu(callback){
        if(window.innerWidth<=768){var anim = 400;}else{var anim=600;}
        if(toggle==false){
            $("#menu").css("background-image","url('./static/img/close.png')");
            $(lastActive).animate( {"right":"100%"},anim);
            $("#menu-content").animate({"left":"0%"},anim);
            toggle = true;
            callback();
        }else{
            $("#menu").css("background-image","url('./static/img/hamburger.png')");
            $(lastActive).animate( {"right":"0%"},anim );
            $("#menu-content").animate({"left":"100%"},anim);
            toggle = false;
            callback(); 
        }
    }

    $( "#menu" ).on( "click", function() {
        function hello(){

        }
            animateMenu(hello);
    });

    $( "#home" ).on( "click", function() {
        function hello(){

        }
        if(lastActive == "#main"){
            animateMenu(hello);
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(hello);
        }
    });
    $( "#home-mob" ).on( "click", function() {
        function hello(){

        }
        if(lastActive == "#main"){
            animateMenu(hello);
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(hello);
        }
    });
    $( "#about" ).on( "click", function() {
        function animateAbout(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"100%"},anim );
                $("#about-content").animate({"top":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateAbout);
            lastActive = "#about-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateAbout);
            lastActive = "#about-content";
        }
    });
    $( "#about-mob" ).on( "click", function() {
        function animateAbout(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"100%"},anim );
                $("#about-content").animate({"top":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateAbout);
            lastActive = "#about-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateAbout);
            lastActive = "#about-content";
        }
    });
    $( "#proshow" ).on( "click", function() {
        function animateProshow(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"-100%"},anim );
                $("#proshow-content").animate({"bottom":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateProshow);
            lastActive = "#proshow-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateProshow);
            lastActive = "#proshow-content";
        }
    });
    $( "#proshow-mob" ).on( "click", function() {
        function animateProshow(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"-100%"},anim );
                $("#proshow-content").animate({"bottom":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateProshow);
            lastActive = "#proshow-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateProshow);
            lastActive = "#proshow-content";
        }
    });
    $( "#sponsors" ).on( "click", function() {
        window.open('https://sponsors.dhwani.org.in');
    });
    $( "#sponsors-mob" ).on( "click", function() {
        window.open('https://sponsors.dhwani.org.in');
    });
    $( "#contact-fb" ).on( "click", function() {
        window.open('https://facebook.com/dhwanifest');
    });
    $( "#fb" ).on( "click", function() {
        window.open('https://facebook.com/dhwanifest');
    });
    $( "#contact-twitter" ).on( "click", function() {
        window.open('https://twitter.com/dhwanifest');
    });
    $( "#contact-insta" ).on( "click", function() {
        window.open('https://instagram.com/dhwanifest');
    });
    $( "#insta" ).on( "click", function() {
        window.open('https://instagram.com/dhwanifest');
    });
    $( "#contact-youtube" ).on( "click", function() {
        window.open('https://www.youtube.com/channel/UCUGXXOIJVE6jpuQY2EubYTA');
    });
    $( "#you" ).on( "click", function() {
        window.open('https://www.youtube.com/channel/UCUGXXOIJVE6jpuQY2EubYTA');
    });
    $( "#accomodation-link" ).on( "click", function() {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSfc3enWsfODiQrSD7Lylr9j-Vi73By9-yk-d_le80aWj6mMZQ/viewform');
    });
    $( "#spotlight-link" ).on( "click", function() {
        window.open('https://www.yepdesk.com/spotlight');
    });
    $( "#spotlight-link" ).on( "click", function() {
        window.open('https://www.yepdesk.com/spotlight');
    });
    $( "#proshow-link" ).on( "click", function() {
        popup('agamlivecet');
    });


    $( "#contact" ).on( "click", function() {
        function animateContact(){
            setTimeout(function() {
                $("#main").animate( {"right":"-100%"},anim );
                $("#contact-content").animate({"right":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateContact);
            lastActive = "#contact-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateContact);
            lastActive = "#contact-content";
        }
    });
    $( "#contact-mob" ).on( "click", function() {
        function animateContact(){
            setTimeout(function() {
                $("#main").animate( {"right":"-100%"},anim );
                $("#contact-content").animate({"right":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateContact);
            lastActive = "#contact-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateContact);
            lastActive = "#contact-content";
        }
    });
    $( "#accomodation-mob" ).on( "click", function() {
        function animateAccomodation(){
            setTimeout(function() {
                $("#main").animate( {"right":"-100%"},anim );
                $("#accomodation-content").animate({"right":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateAccomodation);
            lastActive = "#accomodation-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateAccomodation);
            lastActive = "#accomodation-content";
        }
    });
    $( "#accomodation" ).on( "click", function() {
        function animateAccomodation(){
            setTimeout(function() {
                $("#main").animate( {"right":"-100%"},anim );
                $("#accomodation-content").animate({"right":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateAccomodation);
            lastActive = "#accomodation-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateAccomodation);
            lastActive = "#accomodation-content";
        }
    });
    $( "#login" ).on( "click", function() {
        initApp();
        function animateLogin(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"100%"},anim );
                $("#login-content").animate({"top":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateLogin);
            lastActive = "#login-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateLogin);
            lastActive = "#login-content";
        }
    });
    $( "#login-mob" ).on( "click", function() {
        initApp();
        function animateLogin(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"100%"},anim );
                $("#login-content").animate({"top":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateLogin);
            lastActive = "#login-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateLogin);
            lastActive = "#login-content";
        }
    });
    $( "#event-mob" ).on( "click", function() {
        function animateEvent(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"-100%"},anim );
                $("#event-content").animate({"bottom":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateEvent);
            console.log('hello');
            lastActive = "#event-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateEvent);
            lastActive = "#event-content";
        }
    });
    $( "#event" ).on( "click", function() {
        function animateEvent(){
            setTimeout(function() {
                $("#main").animate( {"bottom":"-100%"},anim );
                $("#event-content").animate({"bottom":"0%"},anim);            
              }, anim);
        }
        if(lastActive == "#main"){
            animateMenu(animateEvent);
            console.log('hello');
            lastActive = "#event-content";
        }else{
            resetPage();
            lastActive = "#main";
            animateMenu(animateEvent);
            lastActive = "#event-content";
        }
    });


axios.get('https://api.dhwanicet.org/public/event',config)
    .then(function (response) {
        var i;
        var reg = [];
        for (i = 0; i < response.data.length; ++i) {
            if(response.data[i].isWorkshop == true){
                $('#workshops-list').append('<h2 onclick=workshopAnimate('+i+')>'+response.data[i].name+'</h2>');
                $('#workshops-list').css({"height":"+=39"});
                $('#workshops-content').append('<div class="worklist-content" id=work'+i+'></div>');
                $('#work'+i).append('<div class = \"wrapper-event\" id=\"wrapper'+i+'\"></div>');
                $('#wrapper'+i).append('<div class=\"section-event\" id=\"secOne'+i+'\"></div>');
                $('#wrapper'+i).append('<div class=\"section-event\" id=\"secTwo'+i+'\"></div>');
                $('#secOne'+i).append('<div class = \"event-content-img\" id=\"event-img'+i+'\"></div>');
                //$('#secOne'+i).append('<p class = \"event-content-prize\" id=\"event-prizeTwo'+i+'\"></p>');
                //$('#secOne'+i).append('<p class = \"event-content-prize\" id=\"event-prizeThree'+i+'\"></p>');
                $('#secOne'+i).append('<p class = \"event-content-regfee\" id=\"event-regfee'+i+'\"></p>');
                $('#secOne'+i).append('<p class = \"event-content-time\" id=\"event-time'+i+'\"></p>');

                $('#secOne'+i).append('<p class = \"event-content-contact\" id=\"event-contactOne'+i+'\"></p>');
                $('#secOne'+i).append('<p class = \"event-content-contact\" id=\"event-contactTwo'+i+'\"></p>');
                $('#secTwo'+i).append('<h2 class = \"event-content-name\" id=\"event-name'+i+'\"></h2>');
                $('#secTwo'+i).append('<p class = \"event-content-description\" id=\"event-description'+i+'\"></p>');
                $('#secTwo'+i).append('<p class = \"event-content-format\" id=\"event-format'+i+'\"></p>');
                $('#secTwo'+i).append('<div class = \"event-content-button\" id=\"event-button'+i+'\"></div>');
                $('#event-img'+i).append('<img src="" class="event-img-child" id="imgLOAD'+i+'"></img>');
                $('#event-button'+i).append('<button class = "submitbtn buttonReg" onclick="regEvent('+response.data[i].id+')">Register</button>');
                $('#event-regfee'+i).append('REG FEE : ' + response.data[i].regFee);

                $('#event-contactOne'+i).append(response.data[i].contactName1+' : '+response.data[i].contactPhone1);
                $('#event-contactTwo'+i).append(response.data[i].contactName2+' : '+response.data[i].contactPhone2);
                if(response.data[i].contactName2 == null){
                    $('#event-contactTwo'+i).css({"display":"none"});
                }
                $('#event-time'+i).append('TIME : '+response.data[i].time);
                $('#event-name'+i).append(response.data[i].name);
                $('#event-description'+i).append(response.data[i].description);
                $('#event-format'+i).append(response.data[i].format);
                imgObj[i] = response.data[i].image;
                var shiteWidth = window.innerWidth - ((5/100)*window.innerWidth);

                if(window.innerWidth<=768){
                    $('#work'+i).css({"top":"100%","left":"0","height":window.innerHeight - 120});
                }else{
                    $('#work'+i).css({"top":"0","left":"100%","width":shiteWidth - 220});
                }
            }else{
                var shiteWidth = window.innerWidth - ((5/100)*window.innerWidth);
                var play;
                if(response.data[i].category == 'ANT'){
                    $('#ant-list').append('<h2 onclick=antAnimate('+i+')>'+response.data[i].name+'</h2>');
                    if(window.innerWidth<=768){
                        $('#ant-list').css({"height":"+=15"});
                    }else{
                        $('#ant-list').css({"height":"+=39"});
                    }
                    $('#comp1').append('<div class="worklist-content" id=ant'+i+'></div>');
                    if(window.innerWidth<=768){
                        $('#ant'+i).css({"top":"100%","left":"0","height":window.innerHeight - 180});
                    }else{
                        $('#ant'+i).css({"top":"0","left":"100%","width":shiteWidth - 330});
                    }
                    play = '#ant';
                }
                if(response.data[i].category == 'DIO'){
                    $('#dio-list').append('<h2 onclick=dioAnimate('+i+')>'+response.data[i].name+'</h2>');
                    if(window.innerWidth<=768){
                        $('#dio-list').css({"height":"+=15"});
                    }else{
                        $('#dio-list').css({"height":"+=39"});
                    }
                    $('#comp2').append('<div class="worklist-content" id=dio'+i+'></div>');
                    if(window.innerWidth<=768){
                        $('#dio'+i).css({"top":"100%","left":"0","height":window.innerHeight - 180});
                    }else{
                        $('#dio'+i).css({"top":"0","left":"100%","width":shiteWidth - 330});
                    }
                    play = '#dio';
                }
                if(response.data[i].category == 'NAD'){
                    $('#nad-list').append('<h2 onclick=nadAnimate('+i+')>'+response.data[i].name+'</h2>');
                    if(window.innerWidth<=768){
                        $('#nad-list').css({"height":"+=15"});
                    }else{
                        $('#nad-list').css({"height":"+=39"});
                    }
                    $('#comp3').append('<div class="worklist-content" id=nad'+i+'></div>');
                    if(window.innerWidth<=768){
                        $('#nad'+i).css({"top":"100%","left":"0","height":window.innerHeight - 180});
                    }else{
                        $('#nad'+i).css({"top":"0","left":"100%","width":shiteWidth - 330});
                    }
                    play = '#nad';
                }
                if(response.data[i].category == 'CD'){
                    $('#car-list').append('<h2 onclick=carAnimate('+i+')>'+response.data[i].name+'</h2>');
                    if(window.innerWidth<=768){
                        $('#car-list').css({"height":"+=15"});
                    }else{
                        $('#car-list').css({"height":"+=39"});
                    }
                    $('#comp4').append('<div class="worklist-content" id=car'+i+'></div>');
                    if(window.innerWidth<=768){
                        $('#car'+i).css({"top":"100%","left":"0","height":window.innerHeight - 180});
                    }else{
                        $('#car'+i).css({"top":"0","left":"100%","width":shiteWidth - 330});
                    }
                    play = '#car';
                }
                if(response.data[i].category == 'KHE'){
                    $('#khe-list').append('<h2 onclick=kheAnimate('+i+')>'+response.data[i].name+'</h2>');
                    if(window.innerWidth<=768){
                        $('#khe-list').css({"height":"+=15"});
                    }else{
                        $('#khe-list').css({"height":"+=39"});
                    }
                    $('#comp5').append('<div class="worklist-content" id=khe'+i+'></div>');
                    if(window.innerWidth<=768){
                        $('#khe'+i).css({"top":"100%","left":"0","height":window.innerHeight - 180});
                    }else{
                        $('#khe'+i).css({"top":"0","left":"100%","width":shiteWidth - 330});
                    }
                    play = '#khe';
                }
                if(response.data[i].category == 'MIS'){
                    $('#mis-list').append('<h2 onclick=misAnimate('+i+')>'+response.data[i].name+'</h2>');
                    if(window.innerWidth<=768){
                        $('#mis-list').css({"height":"+=15"});
                    }else{
                        $('#mis-list').css({"height":"+=39"});
                    }
                    $('#comp6').append('<div class="worklist-content" id=mis'+i+'></div>');
                    if(window.innerWidth<=768){
                        $('#mis'+i).css({"top":"100%","left":"0","height":window.innerHeight - 180});
                    }else{
                        $('#mis'+i).css({"top":"0","left":"100%","width":shiteWidth - 330});
                    }
                    play = '#mis';
                }


                $(play+i).append('<div class = \"wrapper-event-new\" id=\"wrapper'+i+'\"></div>');
                $('#wrapper'+i).append('<div class=\"section-event\" id=\"secOne'+i+'\"></div>');
                $('#wrapper'+i).append('<div class=\"section-event\" id=\"secTwo'+i+'\"></div>');
                $('#secOne'+i).append('<div class = \"event-content-img\" id=\"event-img'+i+'\"></div>');
                //$('#secOne'+i).append('<p class = \"event-content-prize\" id=\"event-prizeOne'+i+'\"></p>');
                //$('#secOne'+i).append('<p class = \"event-content-prize\" id=\"event-prizeTwo'+i+'\"></p>');
                //$('#secOne'+i).append('<p class = \"event-content-prize\" id=\"event-prizeThree'+i+'\"></p>');
                $('#secOne'+i).append('<p class = \"event-content-regfee\" id=\"event-regfee'+i+'\"></p>');
                $('#secOne'+i).append('<p class = \"event-content-time\" id=\"event-time'+i+'\"></p>');
                $('#secOne'+i).append('<p class = \"event-content-prize\" id=\"event-prize'+i+'\"></p>');
                $('#secOne'+i).append('<p class = \"event-content-contact\" id=\"event-contactOne'+i+'\"></p>');
                $('#secOne'+i).append('<p class = \"event-content-contact\" id=\"event-contactTwo'+i+'\"></p>');
                $('#secTwo'+i).append('<h2 class = \"event-content-name\" id=\"event-name'+i+'\"></h2>');
                $('#secTwo'+i).append('<p class = \"event-content-description\" id=\"event-description'+i+'\"></p>');
                $('#secTwo'+i).append('<p class = \"event-content-format\" id=\"event-format'+i+'\"></p>');
                //dropdown for group events
                if(response.data[i].group==true){
    
                    $('#secTwo'+i).append('<div id=\"inputArea'+i+'\"></div>');
                    for (var j=0; j<response.data[i].maxPerGroup-1; j++) {
                        $('#inputArea'+i).append('<div>Dhwani Id of team member '+(j+2)+' : <div class=\"input-box\"><input name=\"inputs[]\"/><span class=\"unit\">D-</span></div></div>');
                    } 
                    //input fields according to dropdown
                }
                
                $('#secTwo'+i).append('<div class = \"event-content-button\" id=\"event-button'+i+'\"></div>');
                $('#event-img'+i).append('<img src="" class="event-img-child" id="imgLOAD'+i+'"></img>');
                // reg[i] = {
                //     eventid:response.data[i].id,
                //     eventName:response.data[i].name
                // }

                $('#event-button'+i).append('<button class = "submitbtn buttonReg" onclick="regEvent('+response.data[i].id+ ')">Register</button>');
                $('#event-regfee'+i).append('REG FEE : '+response.data[i].regFee);
                if(response.data[i].prize3 != null){ 
                    var prize3 = response.data[i].prize3;
                    prize3 = prize3+'Rs';
                }else{
                    var prize3 = '';
                }
                if(response.data[i].prize2 != null){ 
                    var prize2 = response.data[i].prize2;
                    prize2 = prize2+'Rs';
                }else{
                    var prize2 = '';
                }
                $('#event-prize'+i).append('PRIZE : '+response.data[i].prize1+'Rs  '+prize2+' '+prize3);
                $('#event-contactOne'+i).append(response.data[i].contactName1+' : '+response.data[i].contactPhone1);
                $('#event-contactTwo'+i).append(response.data[i].contactName2+' : '+response.data[i].contactPhone2);
                if(response.data[i].contactName2 == null){
                    $('#event-contactTwo'+i).css({"display":"none"});
                }
                $('#event-time'+i).append('TIME : '+response.data[i].time);
                $('#event-name'+i).append(response.data[i].name);
                $('#event-description'+i).append(response.data[i].description);
                $('#event-format'+i).append(response.data[i].format);
                imgObj[i] = response.data[i].image;
            }
        }
    });



    var workshopsToggle = false;
    var competitionsToggle = false;
    var informalsToggle = false;

    var width = window.innerWidth;
    var height = window.innerHeight;
    if(width>=768){
        width = width - (width *(5/100));
        var balance = width - 930;
        balance = balance / 2;
        $('#workshops').css({"left":balance,"top":"0","bottom":"0"});
        $('#competitions').css({"left":balance+310,"top":"0","bottom":"0"});
        $('#informals').css({"left":balance+620,"top":"0","bottom":"0"});
        $('#workshops-content').css({"left":"100%","top":"0","border-left":"3px solid white","border-top-left-radius":"20px","border-bottom-left-radius":"20px"});
        $('#competitions-content').css({"left":"100%","top":"0","border-left":"3px solid white","border-top-left-radius":"20px","border-bottom-left-radius":"20px"});
        $('#informals-content').css({"left":"100%","top":"0","border-left":"3px solid white","border-top-left-radius":"20px","border-bottom-left-radius":"20px"});
    }else{
        var mobBalance = height - 435;
        mobBalance = mobBalance /2;
        $('#workshops').css({"left":"0","right":"0","top":mobBalance,"width":"140px","height":"140px"});
        $('#competitions').css({"left":"0","right":"0","top":mobBalance + 145,"width":"140px","height":"140px"});
        $('#informals').css({"left":"0","right":"0","top":mobBalance + 290,"width":"140px","height":"140px"});
        $('#workshops-inner').css({"background-image":"url(./static/img/workshops-hover.png)"});
        $('#competitions-inner').css({"background-image":"url(./static/img/competitions-hover.png)"});
        $('#informals-inner').css({"background-image":"url(./static/img/informals-hover.png)"});
        $('#workshops-content').css({"top":"100%","border-top":"3px solid white","border-top-left-radius":"20px","border-top-right-radius":"20px"});
        $('#competitions-content').css({"top":"100%","border-top":"3px solid white","border-top-left-radius":"20px","border-top-right-radius":"20px"});
        $('#informals-content').css({"top":"100%","border-top":"3px solid white","border-top-left-radius":"20px","border-top-right-radius":"20px"});
    }
    $( "#workshops" ).on( "click", function() {
        function displayWorkshop(){
            if(workshopsToggle == false){
                $('#competitions').css({"display":"none"});
                $('#informals').css({"display":"none"});
                workshopsToggle = true;
            }else{
                $('#competitions').css({"display":"block"});
                $('#informals').css({"display":"block"});
                workshopsToggle = false;
            }
        }
        if(width>=768){
            if(workshopsToggle == false){
                $('#workshops').animate({"left":"5px","width":"100px","height":"100px"});
                $('#workshops-content').animate({"left":"110px"});
                $('#workshops-inner').css({"background-image":"url(./static/img/close-big.png)"});
                setTimeout(displayWorkshop,0);
            }else{
                $('#workshops').animate({"left":balance,"width":"300px","height":"300px"});
                $('#workshops-content').animate({"left":"100%"});
                $('#workshops-inner').css({"background-image":""});
                setTimeout(displayWorkshop,400);
            }
        }else{
            if(workshopsToggle == false){
                $('#workshops').animate({"top":"5px","width":"50px","height":"50px"});
                $('#workshops-content').animate({"top":"60px"});
                $('#workshops-inner').css({"background-image":"url(./static/img/close-big.png)"});
                setTimeout(displayWorkshop,0);
            }else{
                $('#workshops').animate({"top":mobBalance,"width":"140px","height":"140px"});
                $('#workshops-content').animate({"top":"100%"});
                $('#workshops-inner').css({"background-image":"url(./static/img/workshops-hover.png)"});
                setTimeout(displayWorkshop,400);
            }
        }
    });
    $( "#competitions" ).on( "click", function() {
        function displayCompetition(){
            if(competitionsToggle == false){
                $('#workshops').css({"display":"none"});
                $('#informals').css({"display":"none"});
                competitionsToggle = true;
            }else{
                $('#workshops').css({"display":"block"});
                $('#informals').css({"display":"block"});
                competitionsToggle = false;
            }
        }
        if(width>=768){
            if(competitionsToggle == false){
                $('#competitions').animate({"left":"5px","width":"100px","height":"100px"});
                $('#competitions-content').animate({"left":"110px"});
                $('#competitions-inner').css({"background-image":"url(./static/img/close-big.png)"});
                setTimeout(displayCompetition,0);
            }else{
                $('#competitions').animate({"left":balance+310,"width":"300px","height":"300px"});
                $('#competitions-content').animate({"left":"100%"});
                $('#competitions-inner').css({"background-image":""});
                setTimeout(displayCompetition,400);
            }
        }else{
            if(competitionsToggle == false){
                $('#competitions').animate({"top":"5px","width":"50px","height":"50px"});
                $('#competitions-content').animate({"top":"60px"});
                $('#competitions-inner').css({"background-image":"url(./static/img/close-big.png)"});
                setTimeout(displayCompetition,0);
            }else{
                $('#competitions').animate({"top":mobBalance+145,"width":"140px","height":"140px"});
                $('#competitions-content').animate({"top":"100%"});
                $('#competitions-inner').css({"background-image":"url(./static/img/competitions-hover.png)"});
                setTimeout(displayCompetition,400);
            }
        }
    });
    $( "#informals" ).on( "click", function() {
        function displayInformal(){
            if(informalsToggle == false){
                $('#competitions').css({"display":"none"});
                $('#workshops').css({"display":"none"});
                informalsToggle = true;
            }else{
                $('#competitions').css({"display":"block"});
                $('#workshops').css({"display":"block"});
                informalsToggle = false;
            }
        }
        if(width>=768){
            if(informalsToggle == false){
                $('#informals').animate({"left":"5px","width":"100px","height":"100px"});
                $('#informals-content').animate({"left":"110px"});
                $('#informals-inner').css({"background-image":"url(./static/img/close-big.png)"});
                setTimeout(displayInformal,0);
            }else{
                $('#informals').animate({"left":balance+620,"width":"300px","height":"300px"});
                $('#informals-content').animate({"left":"100%"});
                $('#informals-inner').css({"background-image":""});
                setTimeout(displayInformal,400);
            }
        }else{
            if(informalsToggle == false){
                $('#informals').animate({"top":"5px","width":"50px","height":"50px"});
                $('#informals-content').animate({"top":"60px"});
                $('#informals-inner').css({"background-image":"url(./static/img/close-big.png)"});
                setTimeout(displayInformal,0);
            }else{
                $('#informals').animate({"top":mobBalance + 290,"width":"140px","height":"140px"});
                $('#informals-content').animate({"top":"100%"});
                $('#informals-inner').css({"background-image":"url(./static/img/informals-hover.png)"});
                setTimeout(displayInformal,400);
            }
        }
    });


});

$( document ).ready(function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    $('#container').css({"width":width,"height":height});

    if(width<=768){
        $('#gradient').css({background: "-webkit-gradient(linear, left top, right top, from(#993300), to(orange))"}).css({
            background: "-moz-linear-gradient(left, #993300 0%, orange 100%)"})
    }else{
        var colors = new Array(
            [62,35,255],
            [60,255,60],
            [255,35,98],
            [45,175,230],
            [255,0,255],
            [255,128,0]);
            
            var step = 0;
            //color table indices for: 
            // current color left
            // next color left
            // current color right
            // next color right
            var colorIndices = [0,1,2,3];
            
            //transition speed
            var gradientSpeed = 0.002;
            
            function updateGradient()
            {
            
            if ( $===undefined ) return;
            
            var c0_0 = colors[colorIndices[0]];
            var c0_1 = colors[colorIndices[1]];
            var c1_0 = colors[colorIndices[2]];
            var c1_1 = colors[colorIndices[3]];
            
            var istep = 1 - step;
            var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
            var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
            var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
            var color1 = "rgb("+r1+","+g1+","+b1+")";
            
            var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
            var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
            var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
            var color2 = "rgb("+r2+","+g2+","+b2+")";
            
            $('#gradient').css({
            background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
                background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
            
            step += gradientSpeed;
            if ( step >= 1 )
            {
                step %= 1;
                colorIndices[0] = colorIndices[1];
                colorIndices[2] = colorIndices[3];
                
                //pick two new target color indices
                //do not pick the same as the current one
                colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
                colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
                
            }
            }
            
            setInterval(updateGradient,10);
            
    }
});


