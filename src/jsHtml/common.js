// side menu show hide start
$('body').on('click', '.menu-btn', function (e) {
    console.log('test');
    e.stopPropagation();
    if ($('nav.global-nav').hasClass('nav-showing')) {
        $('nav.global-nav').removeClass('nav-showing');
        $('div.nav-overlay').fadeOut(400);
        // $('body').css('overflow', 'scroll');
    } else {
        $('nav.global-nav').addClass('nav-showing');
        $('div.nav-overlay').fadeIn(400);
        // $('body').css('overflow', 'hidden');
    }
 });
 
$('body').on('click', '.settings-icon', function (e) {
    e.stopPropagation();
    $('.pagetheme-settings').toggleClass('active');
})

$('body').on('click', '.pagetheme-settings', function (event) {

    event.stopPropagation();

})
$('body').click(function () {

    $('.pagetheme-settings').removeClass('active');
});


$('body').on('click', '.pagetheme-settings ul.theme-list li', function () {
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
    $('.global-nav').removeClass('red  blue');
    $('.global-nav').removeClass('bg1  bg2');
    var theme = $(this).attr('theme')
    $('html').attr('theme', theme);


})

$('body').on('change', '.menuoptions input', function () {

    $('html').attr('menu', $(this).val());

})

$('body').on('click', '.pagetheme-settings ul.color-list li', function () {
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
    var color = $(this).attr('color')
    $('.global-nav').removeClass('red  blue');
    $('.global-nav').addClass(color)


})

$('body').on('click', '.pagetheme-settings ul.background-list li', function () {
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
    var background = $(this).attr('background')
    $('.global-nav').removeClass('bg1  bg2');
    $('.global-nav').addClass(background)

})

function opencustpoup(target) {
    // console.log('working');
    var popupid = "#" + target
    if (!$(popupid).hasClass('popup-active')) {
        $(popupid).addClass('popup-active');
        $('div.ios-nav-overlay').fadeIn(400);
    } else {
        $(popupid).removeClass('popup-active');
        $('div.ios-nav-overlay').fadeOut(400);
    }
};

$('body').on('click', '.menuslider', function () {
    $(this).toggleClass('active')
    $('body').toggleClass('compact')
})

var elem = document.documentElement;
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}


$('body').on('click', '.header-items .lst-header-items li a img', function () {

    if ($(this).hasClass('fullScreen')) {
        openFullscreen();
        $('.header-items .lst-header-items li a img.fullScreen').css('display', 'none')
        $('.header-items .lst-header-items li a img.smallScreen').css('display', 'inline-block')
    } else {
        closeFullscreen();
        $('.header-items .lst-header-items li a img.smallScreen').css('display', 'none')
        $('.header-items .lst-header-items li a img.fullScreen').css('display', 'inline-block')
    }


})
 
$('body').on('click', '.global-nav div.nav-items ul.lst-nav-items li a', function (e) {
    e.stopPropagation();
    if ($(this).hasClass('active')) {
        $(this).parent().find('.active').removeClass('active');
        $(this).parent().find('.mysubnavigation-items').slideUp();

    } else {
        $(this).toggleClass("active");
        $(this).parent().siblings().find('.mysubnavigation-items').slideUp();
        $(this).parent().siblings().find('a.glnv-dropdown').removeClass('active');
        $(this).next('.mysubnavigation-items').slideToggle();
    }
});

// $('body').on('click', '.global-nav div.nav-items ul.lst-nav-items li a.compact', function (e) {
//     e.stopPropagation();
//     if ($(this).hasClass('active')) {
//         $(this).parent().find('.active').removeClass('active')
//         $(this).parent().siblings().find('.mysubnavigation-items').hide()
//         $(this).parent().find('.mysubnavigation-items.compact').css("display","block")

//     } else {
//         $(this).toggleClass("active");
//         $(this).parent().siblings().find('.mysubnavigation-items.compact').toggle()
//         $(this).parent().siblings().find('.mysubnavigation-items').hide()
//         $(this).parent().siblings().find('a.glnv-dropdown').removeClass('active')
//         $(this).next('.mysubnavigation-items').toggle();
//         $(this).next('.mysubnavigation-items.compact').toggle();
//     }
// });
 
//close global navigation
$('body').on('click', 'nav.global-nav .btn-closenav, div.nav-overlay, ul.lst-nav-items>li', function (e) {
    e.stopPropagation();
    $('nav.global-nav').removeClass('nav-showing');
    $('div.nav-overlay').fadeOut(300);
    // $('body').css('overflow', 'auto');
});

$('body').on('click', 'ul.lst-navigation>li>a', function (e) {
    $('ul.lst-navigation li a').removeClass('item-selected');
    //$( this ).addClass( 'item-selected' );
});
// side menu show hide end



function dashboardCarousel() {

    // $('.owl-carousel').owlCarousel({
    //     stagePadding: 50,
    //     loop:true,
    //     rewind : false,
    //     margin:10,
    //     nav:true,
    //     autoWidth:true,
    //     responsive:{
    //         0:{
    //             items:1
    //         },
    //         // 600:{
    //         //     items:3
    //         // },
    //         1000:{
    //             items:3
    //         }
    //     }
    // });

    $('.account-carousel').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    })


    $('.features-owl').owlCarousel({
        loop: true,
        nav: true,
        responsive: {
            0: {
                items: 1


            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    })

    $('.features-slide').owlCarousel({
        loop: true,
        nav: true,
        responsive: {
            0: {
                items: 1
             },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    })

    $('.owl-offers').owlCarousel({
        stagePadding: 50,
        loop: true,
        margin: 10,
        nav: true,
        autoWidth: true,
        responsive: {
            0: {
                items: 1
            },
            // 600:{
            //     items:3
            // },
            1000: {
                items: 3
            }
        }
    });

    $('.owl-rounded-item').owlCarousel({
        stagePadding: 50,
        loop: false,
        margin: 10,
        nav: true,
        autoWidth: true,
        responsive: {
            0: {
                items: 1
            },
            // 600:{
            //     items:3
            // },
            1000: {
                items: 3
            }
        }
    })

    $('.owl-saved-accts').owlCarousel({
        stagePadding: 50,
        loop: false,
        margin: 10,
        nav: true,
        autoWidth: true,
        responsive: {
            0: {
                items: 1
            },
            // 600:{
            //     items:3
            // },
            1000: {
                items: 3
            }
        }
    })
 
    
    /* 
        $('.owl-menuList').owlCarousel({
            stagePadding: 50,
            loop:false,
            rewind : false,
            margin:10,
            nav:true,
            autoWidth:true,
            responsive:{
                0:{
                    items:1
                },
                // 600:{
                //     items:3
                // },
                1000:{
                    items:3
                }
            }
        }); */

}

function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function ShowHidePassword() {
    $('body').on('click', ".show-pwd", function () {
        if ($(this).siblings("input").attr('type') == 'password') {
            $(this).siblings("input").attr('type', 'text');
            $(this).addClass("showing");
        }
        else {
            $(this).siblings("input").attr('type', 'password');
            $(this).removeClass("showing");
        }
    });
}


// input type as number start
function ShowHideNumber() {
    console.log("show hide number");
    $(".show-pwd-number").on('click', function () {
        if ($(this).siblings("input").hasClass("password_number")) {
            $(this).siblings("input").removeClass("password_number");
            $(this).addClass("showing");
        }
        else {
            $(this).siblings("input").addClass("password_number");
            $(this).removeClass("showing");
        }
    });
}
// input type as number end

$(document).ready(function(){

    var mPINEntering = [];
    function getmPINEntered() {
        if (mPINEntering.length == 6) {
            alert('Your Entered PIN is = ' + mPINEntering);
        } else {
            alert('please fill all 6');
        }
    };
    


    // input type as password start
    $(".show-pwd").on('click',function(){
        if($(this).siblings("input").attr('type')=='password') {
            $(this).siblings("input").attr('type','text');
            $(this).addClass("showing");
        }
        else {
            $(this).siblings("input").attr('type','password');
            $(this).removeClass("showing");
        }
    });
    // input type as password end


    // input type as number start
    $(".show-pwd-number").on('click',function(){
        if($(this).siblings("input").attr('type')=='number') {
            $(this).siblings("input").attr('type','password');
            $(this).addClass("showing");
        }
        else {
            $(this).siblings("input").attr('type','number');
            $(this).removeClass("showing");
        }
    });

    // input type as number end



    // toast message start
    $( 'body' ).on( 'click', 'div.toast-messages div.msg-toast', function() {
        setTimeout(function () {
            $( 'div.toast-messages' ).find( '.msg-toast' ).removeClass( 'msg-showing' );
        }, 300);
    } );
    // toast message end


    // // side menu show hide start
    // $( 'body' ).on( 'click', '.menu-btn', function (e) {
    //     $( 'nav.global-nav' ).addClass( 'nav-showing' );
    //     $( 'div.nav-overlay' ).fadeIn( 400 );
    //     $( 'body' ).css( 'overflow', 'hidden' );
    // } );

    //close global navigation
    $( 'body' ).on( 'click touchstart', 'nav.global-nav .btn-closenav, div.nav-overlay', function (e) {
        $( 'nav.global-nav' ).removeClass( 'nav-showing' );
        $( 'div.nav-overlay' ).fadeOut( 300 );
        // $( 'body' ).css( 'overflow', 'auto' );
    } );

    $( 'body').on('click', '.hi-btn-menu' , function(e){
        e.stopPropagation();
        $( 'nav.global-nav' ).removeClass( 'nav-showing' );
        $( 'div.nav-overlay' ).fadeOut( 300 );
        // $( 'body' ).css( 'overflow', 'auto' );
   })


    // ========= for new layout css start ===========
    // $( 'body' ).on( 'click', '.menu-btn', function (e) {
    //     $( 'nav.global-nav1' ).addClass( 'nav-showing' );
    //     $( 'div.nav-overlay' ).fadeIn( 400 );
    //     $( 'body' ).css( 'overflow', 'hidden' );
    // } );
     //close global navigation
    $( 'body' ).on( 'click touchstart', 'nav.global-nav1 .btn-closenav, div.nav-overlay', function (e) {
        $( 'nav.global-nav1' ).removeClass( 'nav-showing' );
        $( 'div.nav-overlay' ).fadeOut( 300 );
        // $( 'body' ).css( 'overflow', 'auto' );
    } );
    // ========= for new layout css end ===========
 
     
    $( 'body' ).on( 'click', 'ul.lst-navigation>li>a', function (e) {
        $( 'ul.lst-navigation li a' ).removeClass( 'item-selected' );
        $( this ).addClass( 'item-selected' );
    } );
    // side menu show hide end


    // Dropdown for User Profile
	$( 'body' ).on( 'click', '.header-items .lst-header-items li .item-user', function (e) {
        $('.global-nav .main-nav .lst-main-nav li a.dropnav, .header-items .lst-header-items li.hil-notification').removeClass('mn-open, nf-open');
        $('.global-nav .main-nav .lst-main-nav li a.dropnav, .header-items .lst-header-items li.hil-alert').removeClass('mn-open, nf-open');
        $('.global-nav .main-nav .lst-main-nav li div.sub-nav, .header-items .lst-header-items li .bm-notification').removeClass('sn-open, nf-showing');
         $('.grid-container .grid-header ul.dt-buttons li').removeClass('.fs-active');
         $('.slidefilter-container').removeClass('.slide-showing');
 
         $( 'div.nav-overlay' ).hide();
        //  $( 'body' ).css({'overflow':'auto'});
         if ( !$(this).parent('li').hasClass('dp-open') ) {
             $(this).parent('li').addClass('dp-open');
             $(this).siblings('div.bm-userprofile').addClass('dp-showing');
         }
         else{
             $(this).parent('li').removeClass('dp-open');
             $(this).siblings('div.bm-userprofile').removeClass('dp-showing');
         }
      });
 
     
 
     // Notification Script
     $( 'body' ).on( 'click', '.header-items .lst-header-items li a.item-notification', function (e) {
         e.stopPropagation();
         $('.header-items .lst-header-items li.hil-user-name').removeClass('dp-open');
         $('.header-items .lst-header-items li.hil-alert').removeClass('nf-open');	
         $('.header-items .lst-header-items li.hil-alert div.bm-notification').removeClass('nf-showing');
         $('.header-items .lst-header-items li .bm-userprofile').removeClass('dp-showing');
         if ( !$(this).parent('li').hasClass('nf-open') ) {
             $(this).parent('li').addClass('nf-open');
             // $( 'body' ).css({'overflow':'hidden'});
             $(this).siblings('div.bm-notification').addClass('nf-showing');
         } else {
             $(this).parent('li').removeClass('nf-open');		
             // $( 'body' ).css({'overflow':'auto'});
             $(this).siblings('div.bm-notification').removeClass('nf-showing');
         }
     });
 
     // Alert Script
     $( 'body' ).on( 'click', '.header-items .lst-header-items li a.item-alert', function (e) {
         e.stopPropagation();
         $('.header-items .lst-header-items li.hil-user-name').removeClass('dp-open');
         $('.header-items .lst-header-items li.hil-notification').removeClass('nf-open');	
         $('.header-items .lst-header-items li.hil-notification div.bm-notification').removeClass('nf-showing');	
         $('.header-items .lst-header-items li .bm-userprofile').removeClass('dp-showing');
         if ( !$(this).parent('li').hasClass('nf-open') ) {
             $(this).parent('li').addClass('nf-open');
             // $( 'body' ).css({'overflow':'hidden'});
             $(this).siblings('div.bm-notification').addClass('nf-showing');
         } else {
             $(this).parent('li').removeClass('nf-open');		
             // $( 'body' ).css({'overflow':'auto'});
             $(this).siblings('div.bm-notification').removeClass('nf-showing');
         }
     });

     $( 'body' ).on( 'click', '.header-items .lst-header-items li a.item-logout1', function (e) {
       $('.header-items .lst-header-items li.hil-user-name').removeClass('dp-open');
        $('.header-items .lst-header-items li.hil-notification').removeClass('nf-open');	
        $('.header-items .lst-header-items li.hil-notification div.bm-notification').removeClass('nf-showing');	
        $('.header-items .lst-header-items li .bm-userprofile').removeClass('dp-showing');
         
    });
 

    // footer hide in devices on keyboard active start
    var _originalSize = $(window).width() + $(window).height();
    $(window).on('resize',function() {
        if ($(window).width() + $(window).height() != _originalSize) {
            console.log("keyboard active");
            $(".footer-container").removeClass("sticky-actions");
        } else {
            console.log("keyboard closed");
            $(".footer-container").addClass("sticky-actions");
        }
    });

    // footer hide in devices on keyboard active end
    

    // hide and show balance in wallet page start
    $(".show-bal").click(function(){
        $(this).parent().toggleClass("showing-balance");
    })
    
    // hide and show balance in wallet page end

    // select language script start
    $(".ux-selection label").click(function(){
        if ( $(this).hasClass(".lang-sel") ) {
            $(".ux-selection label").removeClass("lang-sel");
        }
        else {
            $(".ux-selection label").removeClass("lang-sel");
            $(this).addClass("lang-sel");
        }
    })
    // select language script end


    // //script for arrow toggle accordian start
    // $(".acc-slide .arrow-toggle").click(function(event) {

    //     if (!$(this).parent(".acc-slide").hasClass('slide-active')){
    //         $(".acc-slide").removeClass('slide-active');
    //     }
    //     if (!$(this).parent(".acc-slide").hasClass('slide-active')){
    //         $(this).parent(".acc-slide").addClass('slide-active');
    //         $('.acc-slide-content').slideUp();
    //         $(".acc-slide").children('.acc-slide-content').slideUp();
    //         $(this).parent(".acc-slide").children('.acc-slide-content').slideDown();
    //     }
    //     else if ($(this).parent(".acc-slide").hasClass('slide-active'))
    //     {
    //         $(this).parent(".acc-slide").removeClass('slide-active');
    //         $('.acc-slide-content').slideUp();
    //     }
    // });
    // //script for arrow toggle accordian end
    
      //script for arrow toggle accrodian start
      $("body").on("click" , ".acc-slide .arrow-toggle.custom" ,function(event) {
        if (!$(this).parent(".acc-slide").hasClass('slide-active')){
            $(".acc-slide").removeClass('slide-active');
        }
        if (!$(this).parent(".acc-slide").hasClass('slide-active')){
            $(this).parent(".acc-slide").addClass('slide-active');
            $('.acc-slide-content').slideUp();
            $(".acc-slide").children('.acc-slide-content').slideUp();
            $(this).parent(".acc-slide").children('.acc-slide-content').slideDown();
        }
        else if ($(this).parent(".acc-slide").hasClass('slide-active'))
        {
            $(this).parent(".acc-slide").removeClass('slide-active');
            $('.acc-slide-content').slideUp();
        }
    });
    //script for arrow toggle accordian end

    //contact us
    $(".talk").click(function(){
        $(this).closest(".talkto-us").toggleClass("talk-active");
        $(this).parent(".container").siblings(".talkto-us-details").slideToggle();
    });

    // window resize function
    $( window ).resize(function() {
        fixMapHeight();
        // setChartCanvasHW();
    });
 
    // ripple effect start
    $(".ux-button").click(function(){
        $(".ux-button").removeClass("ripple-btn");
        $(this).addClass("ripple-btn");
        setTimeout( function () {
            $(".ux-button").removeClass("ripple-btn");
        }, 1000 );
    });
    
    // chat bot script other option start
    
    $(".chat-bot-mj").click(function(){
        if (!$(".chat-box").hasClass("chat-box-show")) {
            $(".chat-box").addClass("chat-box-show").animate({'height':'100%'},400);
            $(this).hide();
        }
    });

    $(".chat-hide").click(function(){
        $(".chat-box").removeClass("chat-box-show").animate({'height':'0px'},500); 
        // $(".chat-box").animate({'height':'0px'},400); 
        
        $(".chat-bot-mj").show(); 
    });

    $(".menu-option").click(function () {
        $(".other-menu-options").toggleClass("showup");
    });

    // chat bot script other option end



    // main chat bot script

    // $(".chat-bot-mj").click(function(){
    //     if (!$(".chat-popup").hasClass("chat-popup-show")) {
    //         $(".chat-popup").addClass("chat-popup-show").animate({'height':'100%','width': '300px'},400);
    //         $(this).hide();
    //     }
    // });
    // $(".chat-hide").click(function(){
    //     setTimeout(function(){
    //         $(".chat-popup").removeClass("chat-popup-show");
    //     },400);
    //     $(".chat-popup").animate({'height':'0px','width':'0px'},400);
        
    //     $(".chat-bot-mj").show(); 
    // });
    // main chat bot script end


    // numeric keypad script start
    //mPIN 4 digit - 4 input 
    $('div.mpin-digits input:first').focus();
    $('body').on('keypress', 'div.mpin-digits input[type=password]', function (e) {
        console.log('input = ' + e.which);
        // if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        var keycode =  e.keyCode ? e.keyCode : e.which;
        if (keycode != 0 && (keycode < 48 || keycode > 57)) {
            return false;
        } else {
            var inputs = $(this).closest('div.mpin-digits').find(':input');
            inputs.eq(inputs.index(this) + 1).focus();
        };
        if (keycode == 8) {
            $(this).val('');
            var inputs = $(this).closest('div.mpin-digits').find(':input');
            inputs.eq(inputs.index(this) - 1).focus();
        };
    });
    
    $('body').on('click', 'div.btn-mpin-numbers button.btn-mpin-number', function(e) {
        if (mPINEntering.length == 6) {
            alert('mPINEntering DONE = ' + mPINEntering);
        } else {
            mPINEntering.push($(this).html());
            $('div.mpin-dots-line div.mpin-dot-' + mPINEntering.length).addClass('dot-filled');
        }
    });
    $('body').on('click', 'div.mpin-dots-line button.btn-mpin-fill.btn-mpin-clear', function(e) {
        if (mPINEntering.length == 0) {
            alert('ALL CLEARED');
        } else {
            $('div.mpin-dots-line div.mpin-dot-' + mPINEntering.length).removeClass('dot-filled');
            mPINEntering.pop();
        }
    });
    $('body').on('click', 'div.btn-mpin-numbers button.btn-mpin-fill.btn-checknow', function(e) {
        getmPINEntered();
    });

    // numeric keypad script end
     /* Filter Script  */
    $(".filter-icon").click(function(){
        $(".filter-section").slideToggle();
    });


    // Logout Sample 
    /* -- Logout modal show */
    $( 'body' ).on( 'click', 'a.btn-logout-confirm', function () {
        $( 'div#tm-logoutconfirm' ).show(1);
        $( 'div#tm-logoutconfirm' ).addClass( 'tinymodal-showing' );
    });
    $( 'body' ).on( 'click', 'div#tm-logoutconfirm a.tm-default', function () {
        $( 'div#tm-logoutconfirm' ).removeClass( 'tinymodal-showing' );
    });

    // card account accordian start
    $( 'body' ).on( 'click', 'div.ux-dropdown a.drp-showcontent', function () {
        if ( !$( this ).closest( 'div.ux-dropdown' ).hasClass( 'dropdown-showing' ) ) {
            $( 'div.ux-dropdown' ).removeClass( 'dropdown-showing dropdown-active' );
            $( this ).closest( 'div.ux-dropdown' ).addClass( 'dropdown-showing dropdown-active' );
            // $( this ).search-input
        } else {
            $( this ).closest( 'div.ux-dropdown' ).removeClass( 'dropdown-showing dropdown-active' );
        }
    });
    // card account accordian end


    // set target start
    $(".target a").click(function(){
        $(this).parent().addClass("set");
    })
    $(".target .set-target .cncl-target").click(function(){
        $(this).closest(".target").removeClass("set");
    })
    
    // set target end

    // eye show hide amount balance start 
    $('body').on('click', '.card-actions img,.card-actions svg' , function(){
        $(this).parent().toggleClass('shown');
        $(this).parents('div.drp-box').siblings('div.ux-dropdown-content').find('div.card-actions').toggleClass('shown');
        if($(this).parent().hasClass('shown')){
            var hiddenamt = $(this).parents('.drp-enterdata').find('.entered-data').attr('amt');
            var hiddenindiamt = $(this).parents('div.drp-box').siblings('div.ux-dropdown-content').find('em.entered-data ').attr('amt');
            $(this).parents('.drp-enterdata').find('.entered-data b').text(hiddenamt);
            $(this).parents('div.drp-box').siblings('div.ux-dropdown-content').find('em.entered-data b').text(hiddenamt);
        } else {
            $(this).parents('.drp-enterdata').find('.entered-data b').text('XXXXX.XX');
            $(this).parents('div.drp-box').siblings('div.ux-dropdown-content').find('em.entered-data b').text('XXXXX.XX');
        }

    })

    // range script start
    // $(".range-container").click(function(){
    //     $(this).addClass("ranging");
    // })

    $(".ux-component .ux-dropdown .progress").click(function(){
        $(".ux-component .ux-dropdown").addClass("show-range");
    })
    $(".ux-component .ux-dropdown .range-container .close-target a.btn-targetclose").click(function(){
        $(".ux-component .ux-dropdown").removeClass("show-range");  
    })
}); 


// document ready ====== ends here ============
// showToastMessage( 'TextYouWantToShow', 'TypeofMessage(error|success|warning|info)', automaticallyDismiss(true|false), AfterHowMuchMilisecondsDismiss(1000)  );
 
/* //-- show toast message - Function */
function showToastMessage(messageText, messageType, autoDismiss, dismissDuration) {
    if (messageText == "Product Service Error") messageText = "";
    if (typeof messageType === "undefined" || messageType === null)
        messageType = 'error';
    if (typeof autoDismiss === "undefined" || autoDismiss === null)
        autoDismiss = true;
    if (typeof dismissDuration === "undefined" || dismissDuration === null)
        dismissDuration = 5000;

    var messageHTML = '<div class="msg-toast msg-' + messageType + '"><em>' + messageText + '</em></div>';
    $('body').append('<div class="toast-messages"></div>');
    $('div.toast-messages').html(messageHTML);
    setTimeout(function () {
        $('div.toast-messages').find('.msg-toast').addClass('msg-showing');
    }, 300);
    if (autoDismiss) {
        setTimeout(function () {
            $('div.toast-messages').find('.msg-toast').removeClass('msg-showing');
        }, dismissDuration);
        setTimeout(function () {
            $('div.toast-messages').html('');
        }, dismissDuration + 400);
    } else {
        $('div.toast-messages').find('.msg-toast').addClass('msg-close');
    }
};

// switch tabs js start
function switchOptionsInit() {
    $('body').on('click', 'div.ux-switch-tabs div.ux-switch>.lst-ux-switch>li>a', function () {
        if (!$(this).hasClass('switch-selected')) {
            var switchIndex = $(this).closest('ul.lst-ux-switch li').index();
            $(this).closest('div.ux-switch-tabs').find('div.ux-switch-container div.ux-switch-content').removeClass('content-showing');
            $(this).closest('div.ux-switch-tabs').find('.lst-ux-switch>li>a').removeClass('switch-selected');
            $(this).addClass('switch-selected');
            $(this).closest('div.ux-switch-tabs').find('div.ux-switch-container').children('div.ux-switch-content').eq(switchIndex).addClass('content-showing');
        }
    });
};
 
// switch tabs js end

// map height script
function fixMapHeight() {
    var windowHeight = $(window).height();
    var headerHeight = $('header.global-header').innerHeight();
    var tabsHeight = $('div.ux-switch').innerHeight();
    
    $('div.map-controller').height(windowHeight - (headerHeight + tabsHeight + 70));
}


function footer() {
    if ($(window).width() < 1024) {
        //alert('Less than 1024');
        $("input").focusin(function () {
            $(".sticky-actions").hide();
        });

        //alert('More than 1025');
        $("input").focusout(function () {
            $(".sticky-actions").show();
        });
    }
}

function accountTabChange() {
    $(".ux-button").hide();
    $(".account-details").click(function () {
        $(".ux-button").hide();
    });
    $(".recent-trans").click(function () {
        $(".ux-button").show();
    });
}

function filterToggle() {
    $(".filter-container").hide();
    $(".btn-fliter").click(function () {
        $(".filter-container").slideToggle();
    })
}

function balanceViewToggle() {
    $(".show-bal").click(function () {
        $(this).parent().toggleClass("showing-balance");
    })
}
$(document).on('change', '.language-list input[type=radio]', function () {
    $(this).parents('li').siblings().find('a').removeClass('language-selected')
    $(this).parents('a').addClass('language-selected')

})
$(document).on('change', '.ux-component2  label.toggle input[type=checkbox]', function () {

    if ($(this).prop('checked')) {
        $(this).parents('.drp-box').find('.entered-data').addClass("showing-balance");
    } else {
        $(this).parents('.drp-box').find('.entered-data').removeClass("showing-balance");
    }



});

// footer hide in devices on keyboard active start  
function stickFooter() {
    var _originalSize = $(window).width() + $(window).height();
    $(window).on('resize', function () {

        checkNavMenu();

        if ($(window).width() + $(window).height() != _originalSize) {
            console.log("keyboard active");
            $(".footer-container").removeClass("sticky-actions");
        } else {
            console.log("keyboard closed");
            $(".footer-container").addClass("sticky-actions");
        }
    });
}
// footer hide in devices on keyboard active end
 
// spend analysis doughnut chart script start
function spendDoughnut(label, data) {
    var ctx = document.getElementById("myChartDonut").getContext('2d');
    var mySpendDoughnut = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: label,
            datasets: [{
                // label: '# of Votes',
                data: data,
                backgroundColor: ['#673AB7', '#f44336', '#4CAF50', '#2196F3', '#607D8B', '#673AB7', '#f44336', '#4CAF50', '#2196F3', '#607D8B', '#673AB7', '#f44336']
            }]
        },
        options: {
            cutoutPercentage: 60,
            legend: { display: false }

        }
    });
    document.getElementById("legendSpend").innerHTML = mySpendDoughnut.generateLegend();
};
// spend analysis doughnut chart script end

// spend analysis bar chart script start
function spendBarGraph() {
    var barCanvas = document.getElementById("spendbarChart");

    var densityData = {
        label: false,
        data: [150, 400, 300, 250, 100, 150, 400, 300, 250, 100, 150, 400, 300, 250, 100, 150, 400, 300, 250, 100],
        backgroundColor: ['#673AB7', '#f44336', '#4CAF50', '#2196F3', '#607D8B', '#673AB7', '#f44336', '#4CAF50', '#2196F3', '#607D8B', '#673AB7', '#f44336', '#4CAF50', '#2196F3', '#607D8B', '#673AB7', '#f44336', '#4CAF50', '#2196F3', '#607D8B']
    };

    var barChart = new Chart(barCanvas, {
        type: 'bar',
        data: {
            labels: ["T-Mart", "Levis", "Zara", "Zodiac", "John Player", "T-Mart", "Levis", "Zara", "Zodiac", "John Player", "T-Mart", "Levis", "Zara", "Zodiac", "John Player", "T-Mart", "Levis", "Zara", "Zodiac", "John Player"],
            datasets: [densityData],
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: { display: false },
                    ticks: {
                        autoSkip: false
                    },
                    barPercentage: 0.5
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        autoSkip: false
                    },
                    // gridLines: {display:false}
                    display: false
                }]
            }
        }
    });
}
// spend analysis bar chart script end 

// manage beneficiary footer btn show hides script start
function mngbeneficiary() {
    $(".btntransfer").hide();
    $(".account-details").click(function () {
        $(".btnproceed").show();
        $(".btntransfer").hide();
    });
    $(".recent-trans").click(function () {
        $(".btntransfer").show();
        $(".btnproceed").hide();
    });
}
// manage beneficiary footer btn show hides script end

// manage beneficiary footer btn show hides script start
function mngbeneficiary() {
    $(".btntransfer").hide();
    $(".account-details").click(function(){
        $(".btnproceed").show();
        $(".btntransfer").hide();
    });
    $(".recent-trans").click(function(){
       $(".btntransfer").show(); 
       $(".btnproceed").hide(); 
    });
}
// manage beneficiary footer btn show hides script end



// prepaid or postpaid selection start
function Prepostpaid () {
    $(".billpay-options .ux-selection input[type='radio']").on("click",function(){
        if ($("#mypostpaid").is(":checked")) {
            $(".postpaid-container").show();
            $(".prepaid-container").hide();
        }
        else if ($("#myprepaid").is(":checked")) {
            $(".prepaid-container").show(); 
            $(".postpaid-container").hide();
        }

    })
}

// prepaid or postpaid selection end


function mycardCarousel () {
    $('div.wc-cardlist').owlCarousel({
        margin: 20,
        nav: true,
        autoplay: false,
        autoWidth:true,
        loop: false,
        rewind: false,
        responsive : {
            0:{
                items:1,
                nav:false,
                autoWidth:false,
            },
            600:{
                items:1,
                nav:false,
                autoWidth:false,
            },
            768:{
                items:2,
                nav:false,
                // loop:false
            },
            1024:{
                items:2,
                nav:false,
                // loop:false
            },
            1200:{
                items:2,
                nav:false,
                // loop:false
            },
            1366:{
                items:3,
                nav:false,
                // loop:false
            },
            1400:{
                items:3,
                nav:false,
                // loop:false
            },
            1600:{
                items:3,
                nav:false,
                // loop:false
            }
        }
    });
}

function circleCarousel () {
        $('.features-owl').owlCarousel({
            autoplay: false,
            autoWidth:true,
            loop: false,
            rewind: true,
            nav: true,
            responsive: {
                0: {
                    items: 3
                },
                600: {
                    items:4
                },
                1024:{
                    items:4,
                    nav:false,
                    // loop:false
                },
                1200:{
                    items:4,
                    nav:false,
                    // loop:false
                },
                1366:{
                    items:5,
                    nav:false,
                    // loop:false
                },
                1400:{
                    items:5,
                    nav:false,
                    // loop:false
                },
                1600:{
                    items:6,
                    nav:false,
                    // loop:false
                }
            }
        })
        $('.card-owl').owlCarousel({
            margin: 20,
            autoplay: false,
            autoWidth:false,
            loop: false,
            rewind: false,
             nav:false,
            dots: true,
            items: 1,
            responsive: {
                10000: {
                    dots: true,
                },
            }
        })
        $('.invest-owl').owlCarousel({
            margin: 20,
            autoplay: false,
            autoWidth:false,
            loop: false,
            rewind: false,
             nav:false,
            dots: true,
            items: 4,
            responsive: {
               700: {
                    dots: true,
                    items:2,
                },
                1240: {
                    dots: true,
                    items: 2,
                },
                1440: {
                    dots: true,
                    items: 3,
                },
                10000: {
                    dots: true,
                    items: 4,
                },
               
            }
        })
}

function boxCarousel () {
    $('.feature-owl').owlCarousel({
        autoplay: true,
        autoplayTimeout:3000,
        loop: false,
        // rewind: true,
        nav: true,
        responsive: {
            0: {
                items: 3
            },
            600: {
                items:4
            },
            1024:{
                items:4,
                nav:false,
                // loop:false
            },
            1200:{
                items:4,
                nav:false,
                // loop:false
            },
            1366:{
                items:5,
                nav:false,
                // loop:false
            },
            1400:{
                items:5,
                nav:false,
                // loop:false
            },
            1600:{
                items:6,
                nav:false,
                // loop:false
            }
        }
    })
}



function cdon () {
    var bdata = {
        datasets: [{
            data: [135700.00,435700.00], 
            backgroundColor: ['rgba(0, 180, 240, 1)', 'rgba(13, 94, 165, 1)']
        }],
        labels: [
            'Liabilities',
            'Assets'
        ]
    };
    var ctx = document.getElementById('cdon-sample').getContext('2d');
    var myPieChart = new Chart(ctx,{
        type: 'doughnut',
        data: bdata, 
        options: {
            legend: false,
            cutoutPercentage: 80,
            responsive:true,
            // tooltipTemplate: "<%= value %> Files",
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: function(tooltipItems, data) { 
                        return tooltipItems.yLabel + ' : ' + tooltipItems.xLabel + " Files";
                    }
                }
            },
        }
    });
};

function setChartCanvasHW() {
    var leftContainerH = $( '.account-detail-container' ).height(),
        rightContainerH = leftContainerH,
        legendH = $( '.assets-liabilities-container' ).height(),
        chartH = rightContainerH - legendH;
            $( 'div.chart-container .chartbox' ).css( {
                'height': chartH,
                'width' :chartH-40,
            } );

}

 //ios global navigation more menu
 function createGlobalNavMore () {
    $('body').on('click', 'nav.ios-global-nav .lst-ios-nav li a.initem-more', function () {
        if ( !$(this).hasClass('iosmore-active') ) {
            $(this).addClass('iosmore-active');
            $('div.ios-nav-morelist').addClass('ioslist-active');
            $( 'div.ios-nav-overlay' ).fadeIn( 400 );
            // $( 'body' ).css( 'overflow', 'hidden' );
        } else {
            $(this).removeClass('iosmore-active');
            $('div.ios-nav-morelist').removeClass('ioslist-active');
            $( 'div.ios-nav-overlay' ).fadeOut(  );
            // $( 'body' ).css( 'overflow', 'scroll' );
        }
    });
    $( 'div.ios-nav-overlay' ).click(function(){
        $('a.initem-more').removeClass('iosmore-active');
            $('div.ios-nav-morelist').removeClass('ioslist-active');
            $( this ).fadeOut(  );
            // $( 'body' ).css( 'overflow', 'scroll' );
    })
}

function createFancyScrollbarForNav () {
    $( '.nav-content' ).mCustomScrollbar({
        theme: 'minimal'
    });
    document.querySelector( '.nav-content' ).scrollIntoView({
        behavior: 'smooth'
    });

};
 

// loginContaner();
// // Prelogin container vertically center
// function loginContaner(){
// 	var GheaderH = $( 'header.global-header' ).height(),
// 		LcontainerH = $( 'div.login-container' ).height(),
// 		pageHeight    = window.innerHeight -1 ;

// 		$( 'div.login-container' ).css( {
// 			'height': LcontainerH

// 		} );

// 		$( 'div.full-container' ).css( {
// 			'height': pageHeight - GheaderH

// 		} );
// }

 $("a.rightpannel").click(function() {
    // alert("Hello! I am an alert box!!");
    if( !$( 'aside.notification-panel.sticky-panel' ).hasClass( 'notp-showing' )){
        $( 'aside.notification-panel.sticky-panel' ).addClass( 'notp-showing' );
        $( '.notpanel-overlay' ).fadeIn();
        // $( 'body' ).css( 'overflow', 'hidden' );
    }
    else{
        $( 'aside.notification-panel.sticky-panel' ).removeClass( 'notp-showing' );
        $( '.notpanel-overlay' ).fadeOut();
        // $( 'body' ).css( 'overflow', 'auto' );
    }
 
});

$("aside.notification-panel.sticky-panel div.notp-header a.btn-closenoty").click(function() {
      $( 'aside.notification-panel.sticky-panel' ).removeClass( 'notp-showing' );
        $( '.notpanel-overlay' ).fadeOut();
        // $( 'body' ).css( 'overflow', 'auto' );
    
});

$('label.toggle').click(function() {
    if (! $(this).find('input').is(':checked')) {
        $(this).closest('label').addClass("label-inactive");
    }
    else{
        $(this).closest('label').removeClass("label-inactive");

    }
});

$( ".datepicker1" ).datepicker({
	changeMonth: true,
		changeYear: true,		 
});
 


$('a.show-keyboard').click(function() {
    //  alert("Hello! I am an alert box!!");
      $('.keyboard-section').toggleClass("show");
   
 });

 function dtSample () {
    var tdTblae = $( 'table#dt-sample' ).dataTable({
        // select: true,
        dom: "<'top searchbar'> <'row1'<'col-sm-12'tr>><'row1 ml-0 mr-0 pt-2 pb-2'<'col-sm-12 col-md-5 col-xl-5 col-lg-5' l > <'col-sm-12 col-md-7 col-xl-7 col-lg-7 text-right'ip>>", 
        select: true,
        responsive: true,

       
        language: {
            // search: "Search in table:", 
            zeroRecords: "No matching records found,<br/>try another search term",
            processing: "Loading...", 
            lengthMenu: "Showing _MENU_",
            info: "Showing _START_ to _END_ of <b>_TOTAL_</b> entries",
        }
    });
$("div.exportlinks").html('<div class="row">'
                    + '<div class="col-12 text-align p-0">'
                       + '<button class="ux-linkbutton  primary"> <img src="../assets/images/svg/download.svg" alt="download-icon">Download</button>'
                       + '<button class="ux-linkbutton  ml-2 primary"> <img src="../assets/images/svg/print.svg" alt="print-icon">Print</button>'    
                + '</div> <!--.dt-extras-->');


// dtsetResponsive();
$( 'table#dt-sample' ).wrap( '<div class="restable-box"></div>' );


var tdTblae = $( 'table#min-statment' ).dataTable({
    // select: true,
    dom: "<'row1'<'col-sm-12'tr>><'row1 ml-0 mr-0 pt-3 pb-0 d-none d-md-block d-lg-block d-xl-block'<'col-sm-12 col-md-5 col-xl-5 col-lg-5' l > <'col-sm-12 col-md-7 col-xl-7 col-lg-7 text-right'ip>>", 
    select: true,
    responsive: true,

    language: {
        // search: "Search in table:", 
        zeroRecords: "No matching records found,<br/>try another search term",
        processing: "Loading...", 
        lengthMenu: "Showing _MENU_",
        info: "Showing _START_ to _END_ of <b>_TOTAL_</b> entries",
    }
});
$("div.exportlinks").html('<div class="row">'
                + '<div class="col-12 text-align p-0">'
                   + '<button class="ux-linkbutton  primary"> <img src="../assets/images/svg/download.svg" alt="download-icon">Download</button>'
                   + '<button class="ux-linkbutton  ml-2 primary"> <img src="../assets/images/svg/print.svg" alt="print-icon">Print</button>'    
            + '</div> <!--.dt-extras-->');

// dtsetResponsive();
$( 'table#min-statment' ).wrap( '<div class="restable-box"></div>' );




};


dtSample ();
 function dtSample1 () {
    var tdTblae = $( 'table#dt-sample1' ).dataTable({
        // select: true,
        dom: "<> <'row1'<'col-sm-12'tr>><'row1 ml-0 mr-0 pt-2 pb-2'<'col-sm-12 col-md-5 col-xl-5 col-lg-5' l > <'col-sm-12 col-md-7 col-xl-7 col-lg-7 text-right'ip>>", 
        select: true,
        responsive: true,

        language: {
            // search: "Search in table:", 
            zeroRecords: "No matching records found,<br/>try another search term",
            processing: "Loading...", 
            lengthMenu: "Showing _MENU_",
            info: "Showing _START_ to _END_ of <b>_TOTAL_</b> entries",
        }
    });
$("div.exportlinks").html('<div class="row">'
                    + '<div class="col-12 text-align p-0">'
                       + '<button class="ux-linkbutton  primary"> <img src="../assets/images/svg/download.svg" alt="download-icon">Download</button>'
                       + '<button class="ux-linkbutton  ml-2 primary"> <img src="../assets/images/svg/print.svg" alt="print-icon">Print</button>'    
                + '</div> <!--.dt-extras-->');

// $("div.dtlabel-readonly").html('<span>Opening Balance</span><i>5000</i>');
// $("div.dtlabel-readonly.total-dep").html('<span>Total Deposit</span><i>5000</i>');
// $("div.dtlabel-readonly.total-withdraw").html('<span>Total Withdrawals</span><i>5000</i>');
// $("div.dtlabel-readonly.closing-bal").html('<span>Closing Balance</span><i>5000</i>');

// dtsetResponsive();
$( 'table#dt-sample1' ).wrap( '<div class="restable-box"></div>' );


var tdTblae = $( 'table#min-statment' ).dataTable({
    // select: true,
    dom: "<'row1'<'col-sm-12'tr>><'row1 ml-0 mr-0 pt-3 pb-0 d-none d-md-block d-lg-block d-xl-block'<'col-sm-12 col-md-5 col-xl-5 col-lg-5' l > <'col-sm-12 col-md-7 col-xl-7 col-lg-7 text-right'ip>>", 
    select: true,
    responsive: true,

    language: {
        // search: "Search in table:", 
        zeroRecords: "No matching records found,<br/>try another search term",
        processing: "Loading...", 
        lengthMenu: "Showing _MENU_",
        info: "Showing _START_ to _END_ of <b>_TOTAL_</b> entries",
    }
});
$("div.exportlinks").html('<div class="row">'
                + '<div class="col-12 text-align p-0">'
                   + '<button class="ux-linkbutton  primary"> <img src="../assets/images/svg/download.svg" alt="download-icon">Download</button>'
                   + '<button class="ux-linkbutton  ml-2 primary"> <img src="../assets/images/svg/print.svg" alt="print-icon">Print</button>'    
            + '</div> <!--.dt-extras-->');

// dtsetResponsive();
$( 'table#min-statment' ).wrap( '<div class="restable-box"></div>' );




};


dtSample1 ();

function dtSample2 () {
    var tdTblae = $( 'table#dt-sample2' ).dataTable({
        // select: true,
        dom: "<'row1 ml-0 mr-0 pt-2 pb-1 '<'col-sm-6 col-md-6 col-12 pt-0'l><'col-sm-6 col-md-6 col-12 pt-1'f>> <'row1'<'col-sm-12'tr>><'row1 ml-0 mr-0 pt-3 pb-0'<'col-sm-12 col-md-5 col-xl-5 col-lg-5' i> <'col-sm-12 col-md-7 col-xl-7 col-lg-7 text-right'p>>", 
        select: true,
        responsive: true,

        language: {
            // search: "Search in table:", 
            zeroRecords: "No matching records found,<br/>try another search term",
            processing: "Loading...", 
            lengthMenu: "Showing _MENU_",
            info: "Showing _START_ to _END_ of <b>_TOTAL_</b> entries",
        }
    });
$("div.exportlinks").html('<div class="row">'
                    + '<div class="col-12 text-align p-0">'
                       + '<button class="ux-linkbutton  primary"> <img src="../assets/images/svg/download.svg" alt="download-icon">Download</button>'
                       + '<button class="ux-linkbutton  ml-2 primary"> <img src="../assets/images/svg/print.svg" alt="print-icon">Print</button>'    
                + '</div> <!--.dt-extras-->');
// dtsetResponsive();
$( 'table#dt-sample2' ).wrap( '<div class="restable-box"></div>' );
};


dtSample2 ();

function maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
      object.value = object.value.slice(0, object.maxLength)
  }
    
  function isNumeric (evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode (key);
    var regex = /[0-9]|\./;
    if ( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}


$('.btn-toggle').click(function() {
    $(this).find('.btn').toggleClass('active');  
    
    if ($(this).find('.btn-primary').length>0) {
        $(this).find('.btn').toggleClass('btn-primary');
    }
    if ($(this).find('.btn-danger').length>0) {
        $(this).find('.btn').toggleClass('btn-danger');
    }
    if ($(this).find('.btn-success').length>0) {
        $(this).find('.btn').toggleClass('btn-success');
    }
    if ($(this).find('.btn-info1').length>0) {
        $(this).find('.btn').toggleClass('btn-info1');
    }
    
    $(this).find('.btn').toggleClass('btn-default');
       
});


$('button.ux-button.token').click(function() {
    // alert();
    // console.log('working');
    $('button.ux-button.token').hide();  
    $("div#token1").css("display","block");
});
 

$("select.change").change(function(){
    $("em.info1").text('');
    // console.log('working');
    $(this).find("option:selected").each(function(){
        var optionValue = $(this).attr("value");
        if(optionValue){
            $("button.ux-button.primary1").removeClass('disable');
            $("button.ux-button.primary1").removeAttr('disabled');
            $("em.Communication").text('Before placing Cheque Book request, we recommend you to confirm your communication address updated in the bank records');
            $("em.Alternate").text('You can now order cheque book at an alternate address of your choice (Residential/Office), without submitting address proof.');
            $("button.ux-button.secondary1").removeClass('disable');
            $("button.ux-button.secondary1").removeAttr('disabled');
            $(".box").not("." + optionValue).hide();
            $("." + optionValue).show();
            $(".information").not("." + optionValue).hide();
            $("." + optionValue).show();
        } 
        else{
            $(".box").hide();
            $(".information").hide();
            $("button.ux-button.primary1").attr('disabled' ,'disabled');
            $("button.ux-button.secondary1").attr('disabled' ,'disabled'); 
            $("button.ux-button.primary1").addClass('disable');
            $("button.ux-button.secondary1").addClass('disable');
            $("em.info1").text('Before placing Cheque Book request, we recommend you to confirm your communication address updated in the bank records');
        }
    });
}).change();

$('input[name=addType]').change(function(){
    // console.log('Its working');
    if($(this).val() == "No"){
        $('#add3').show();
        $('#note').show();
    }
    else{
        $('#add3').hide();
        $('#note').hide();
    }
}); 

  
// Before placing Cheque Book request, we recommend you to confirm your communication address updated in the bank records
// You can now order cheque book at an alternate address of your choice (Residential/Office), without submitting address proof. 

$('input[name=addType]').change(function(){
        // console.log('Its working');
        if($(this).val() == "No"){
            $('#add3').show();
            $('#note').show();
        }
        else{
            $('#add3').hide();
            $('#note').hide();
        }
    }); 


  $('input[name=addDate]').change(function(){
        // console.log('Its working');
        if($(this).val() == "Date"){
            $('#Sdate').show();
        }
        else{
            $('#Sdate').hide();
        }
    }); 

    $('input[name=autopayment]').change(function(){
        // console.log('Its working');
        if($(this).val() == "payment"){
            $('#details').show();
        }
        else{
            $('#details').hide();
        }
    }); 


    $('input[name=addCheque]').change(function(){
        // console.log('Its working');
        if($(this).val() == "Single"){
            $('#Scheque').show();
            $('#Mcheque').hide();
        }
        else if($(this).val() == "Multiple"){
            $('#Mcheque').show();
            $('#Scheque').hide();
        }
        else{
            $('#Scheque').hide();
            $('#Mcheque').hide();
        }
    }); 


    // select language script start
 
    $(document).on('change', '.language-list input[type=radio]', function () {
        $(this).parents('li').siblings().find('a').removeClass('language-selected')
        $(this).parents('a').addClass('language-selected')
    
    });

   // fund Transfer       
    $("select.change1").change(function(){
        
        console.log('working');
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            if(optionValue){
                $("button.ux-button.primary1").show();
                $("button.ux-button.secondary1").show();
                $("button.ux-button.primary2").show();
                $("button.ux-button.secondary2").show();
                $(".box1").not("." + optionValue).hide();
                $("." + optionValue).show();
            } 
            else{
                $(".box1").hide();
                $("button.ux-button.primary1").hide();
                $("button.ux-button.secondary1").hide(); 
                $("button.ux-button.primary2").hide(); 
                $("button.ux-button.secondary2").hide(); 
             }
        });
    }).change();



    $('.search-link a').click(function() {
        console.log("Worrking!");
        if ($(this).hasClass('active')) {
            $(".search-box").slideUp();
            $(this).removeClass('active')
            
         } else {
            $(this).addClass('active')
            $(".search-box").slideDown();
        }
    });
   
    $('button.ux-button.statement1').click(function(e) {
        // alert();
        e.preventDefault();
         console.log('working now');
        $("div.grid-container.grid-list").css("display","block");
    });


    
    $("ul.scroll-list li a").click(function(){
        console.log('its working');
    $("ul.scroll-list li a").removeClass("active");
    if (!$(this).hasClass('active') ) {
            $(this).addClass('active');
            // $( 'div.ios-nav-overlay' ).fadeIn( 400 );
            // $( 'body' ).css( 'overflow', 'hidden' );
        } else {
            $(this).removeClass('active');
            // $( 'div.ios-nav-overlay' ).fadeOut(  );
            // $( 'body' ).css( 'overflow', 'auto' );
        }
    });  
  
    $('input[name=addPayment]').change(function(){
        // console.log('Its working');
        if($(this).val() == "prepaid"){
            $('#prepaid').show();
            $('#postpaid').hide();
         }
        else if($(this).val() == "postpaid"){
            $('#postpaid').show();
            $('#prepaid').hide();
        }
        else{
            $('#prepaid').show();
            $('#postpaid').hide();
        }
    }); 


    // $("li.dropdown1").hover(function(e){
    //     e.preventDefault();
    //     e.stopPropagation();
    //     console.log("working!!!!!")
    //       if ( !$( 'ul.lst-global-submenu').hasClass('nf-showing') ) {
    //          $( 'ul.lst-global-submenu').addClass('nf-showing');
    //         //  $( 'div.nav-overlay').fadeIn(100);
    //       } else {
    //          $( 'ul.lst-global-submenu').removeClass('nf-showing');
    //         //  $( 'div.nav-overlay').fadeOut(100);
    //       }
    //  });

    //  $("li.dropdown1").click(function(e){
    //     // e.preventDefault();
    //     // e.stopPropagation();
    //     $( 'li.dropdown1 a.item-links').removeClass('tab-selected');
    //    });
    
       /* -- component - tabs secondary */

       $("nav.tab-pills div.tabs>ul.lst-tabs>li>a").click(function(e){
        if ( !$( this ).hasClass( 'tab-selected' ) ) {
             var selectedIndex = $( this ).parent( 'li' ).index();
             $( this ).closest( 'nav.tab-pills' ).find( 'div.tabs-container' ).children( 'div.tab-content1' ).removeClass( 'tc-showing' );
             $( this ).closest( 'ul.lst-tabs' ).find( 'a' ).removeClass( 'tab-selected' );
             $( this ).addClass( 'tab-selected' );
             $( this ).closest( 'nav.tab-pills' ).find( 'div.tabs-container' ).children( 'div.tab-content1' ).eq( selectedIndex ).addClass( 'tc-showing' );
           }
       } );

       $('#nav-icon1').click(function(){
        console.log('working!'); 
          if($(this).hasClass('open')) {
              $(this).removeClass('open')
              $('.global-nav').removeClass('compact')
              $('.right-main-column').removeClass('compact')
              $('.global-nav div.nav-items ul.lst-nav-items li a svg').removeClass('compact')
              $('.global-nav div.nav-items ul.lst-nav-items li a').removeClass('compact')
              $('.global-nav div.nav-items ul.lst-nav-items li a span.chevron').removeClass('compact')
              $('.global-nav div.nav-footer div.poweredby p').removeClass('compact')
              $('div.mysubnavigation-items').removeClass('compact')

                 
              // $('.global-nav div.nav-items ul').addClass('lst-nav-items')
              // $('.global-nav div.nav-items ul').removeClass('lst-nav-items1')
          } else {
              $(this).addClass('open')
              $('.global-nav').addClass('compact')
              $('.right-main-column').addClass('compact')
              $('.global-nav div.nav-items ul.lst-nav-items li a svg').addClass('compact')
              $('.global-nav div.nav-items ul.lst-nav-items li a').addClass('compact')
              $('.global-nav div.nav-items ul.lst-nav-items li a span.chevron').addClass('compact')
              $('.global-nav div.nav-footer div.poweredby p').addClass('compact')
              $('div.mysubnavigation-items').addClass('compact')
            // $('.global-nav div.nav-items ul').removeClass('lst-nav-items')
              // $('.global-nav div.nav-items ul').addClass('lst-nav-items1')
            } 
       });


//        $('body').click( function() {
//         if($(".lst-global-navigation li.more-link-li  ul.lst-global-submenu").is(":visible")){
//                $(".lst-global-navigation li a.more-link").removeClass('item-selected');
//                $('.lst-global-submenu').hide();
//            }
//   });
 
    //  $("li.dropdownmenu div.nav-overlay").click(function(e){
    //   e.stopPropagation();
    //        $( 'li.dropdownmenu div.bm-notification').removeClass('nf-showing');
    //        $( 'div.nav-overlay').fadeOut(100);
    //    });	
    


    // fund Transfer       
    // $("ul.scroll-list li a").click(function(){
    //      console.log('working');
    //     $(this).find("id").each(function(){
    //         var optionVal = $(this).attr("href" );
    //         if(optionVal){
    //              $(".box1").not("." + optionVal).hide();
    //             $("." + optionVal).show();
    //         } 
    //         else{
    //             $(".box1").hide();
    //           }
    //     });
    // }).click();



    // $( 'ul.language-list li a' ).click(function ( e ) {
	// 	e.stopPropagation();
	// 	 if ( !$( this ).hasClass( 'language-selected' ) ) {
	// 		$( this ).closest( 'ul.language-list' ).find( 'a' ).removeClass( 'language-selected' );
	// 		$( this ).addClass( 'language-selected' );
	 
	// 	 } else {
    //         $( this ).removeClass( 'language-selected' );
	// 	}
	// } );


    // select language script end



   // Latest Code 6-11-2020 

    $( 'body' ).on( 'click', '.header-items .lst-header-items li a.item-settings', function (e) {
        e.stopPropagation();
        $('.header-items .lst-header-items li.hil-user-name').removeClass('dp-open');
        $('.header-items .lst-header-items li.hil-notification').removeClass('nf-open');	
        $('.header-items .lst-header-items li.hil-notification div.bm-notification').removeClass('nf-showing');	
        $('.header-items .lst-header-items li .bm-userprofile').removeClass('dp-showing');
        if( !$( 'aside.notification-panel.sticky-panel' ).hasClass( 'notp-showing' )){
            $( 'aside.notification-panel.sticky-panel' ).addClass( 'notp-showing' );
            $( '.notpanel-overlay' ).fadeIn();
            // $( 'body' ).css( 'overflow', 'hidden' );
        }
        else{
            $( 'aside.notification-panel.sticky-panel' ).removeClass( 'notp-showing' );
            $( '.notpanel-overlay' ).fadeOut();
            // $( 'body' ).css( 'overflow', 'auto' );
        }
    });
    
    $("aside.notification-panel.sticky-panel div.notp-header a.btn-closenoty").click(function() {
          $( 'aside.notification-panel.sticky-panel' ).removeClass( 'notp-showing' );
            $( '.notpanel-overlay' ).fadeOut();
            // $( 'body' ).css( 'overflow', 'auto' );
        
    });

    $("ul.theme-list li").click(function(){
        console.log('its working');
        $("ul.theme-list li").removeClass("active");
        if (!$(this).hasClass('active') ) {
                $(this).addClass('active');
                // $( 'div.ios-nav-overlay' ).fadeIn( 400 );
                // $( 'body' ).css( 'overflow', 'hidden' );
            } else {
                $(this).removeClass('active');
                // $( 'div.ios-nav-overlay' ).fadeOut(  );
                // $( 'body' ).css( 'overflow', 'auto' );
            }
    }); 
    

    
   
function boxCarousel () {
    $('.box-owl').owlCarousel({
        autoplay: false,
        autoplayTimeout:3000,
        loop: false,
        rewind: true,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items:1
            },
            768:{
                items:2,
                nav:false,
                // loop:false
            },
            1024:{
                items:2,
                nav:false,
                // loop:false
            },
            1200:{
                items:2,
                nav:false,
                // loop:false
            },
            1366:{
                items:3,
                nav:false,
                // loop:false
            },
            1400:{
                items:3,
                nav:false,
                // loop:false
            },
            1600:{
                items:3,
                nav:false,
                // loop:false
            }
        }
    })
}


// Latest Code  

function boxCarousel2 () {
    $('.box-owl1').owlCarousel({
        autoplay:false,
        autoplayTimeout:3000,
        loop: false,
        autoWidth:true,
        rewind: true,
        nav: true,
        responsive: {
            0: {
                items:3
            },
            480: {
                items:3
            },
            640: {
                items:4
            },
            768:{
                items:5,
                 nav:true,
                // loop:false
            },
            1024:{
                items:4,
                nav:true,
                // loop:false
            },
            1200:{
                items:4,
                nav:true,
                // loop:false
            },
            1366:{
                items:5,
                nav:true,
                // loop:false
            },
            1400:{
                items:5,
                nav:true,
                // loop:false
            },
            1600:{
                items:6,
                nav:true,
                // loop:false
            }
        }
    })
}


function boxCarousel3 () {
    $('.box-owl3').owlCarousel({
        autoplay:false,
        autoplayTimeout:3000,
        loop: false,
        rewind: true,
        nav: true,
        responsive: {
            0: {
                items:1
            },
            480: {
                items:1
            },
            640: {
                items:2
            },
            768:{
                items:2,
                 nav:true,
                // loop:false
            },
            1024:{
                items:3,
                nav:true,
                // loop:false
            },
            1200:{
                items:3,
                nav:true,
                // loop:false
            },
            1366:{
                items:3,
                nav:true,
                // loop:false
            },
            1400:{
                items:3,
                nav:true,
                // loop:false
            },
            1600:{
                items:4,
                nav:true,
                // loop:false
            }
        }
    })
}


function boxCarousel4 () {
    $('.box-owl4').owlCarousel({
        autoplay:false,
        autoplayTimeout:3000,
        loop: false,
        rewind: true,
        nav:true,
        responsive: {
            0: {
                items:1
            },
            480: {
                items:1
            },
            640: {
                items:1
            },
            768:{
                items:1,
                nav:false,
                // loop:false
            },
            1024:{
                items:1,
                nav:false,
                // loop:false
            },
            1200:{
                items:1,
                nav:false,
                // loop:false
            },
            1366:{
                items:2,
                nav:false,
                // loop:false
            },
            1400:{
                items:2,
                nav:false,
                // loop:false
            },
            1600:{
                items:2,
                nav:false,
                // loop:false
            }
        }
    })
}



// Latest Code  
 
$("button.confirm-btn").click(function(){
    console.log('working');
  if ( !$('div.popup-bottom.confirmation').hasClass('popup-active') ) {
        $('div.popup-bottom.confirmation').addClass('popup-active');
        $( 'div.ios-nav-overlay' ).fadeIn( 400 );
     } else {
        $('div.popup-bottom.confirmation').removeClass('popup-active');
        $( 'div.ios-nav-overlay' ).fadeOut(  );
        
    }
});


$("button#select-account").click(function(e){
    e.preventDefault();
    console.log('working');
  if ( !$('div.popup-bottom.selectaccount').hasClass('popup-active') ) {
        $('div.popup-bottom.selectaccount').addClass('popup-active');
        $( 'div.ios-nav-overlay' ).fadeIn( 400 );
     } else {
        $('div.popup-bottom.selectaccount').removeClass('popup-active');
        $( 'div.ios-nav-overlay' ).fadeOut(  );
        
    }
});

$("button#debit-details").click(function(e){
    e.preventDefault();
    console.log('working');
    $('div.popup-bottom.selectaccount').removeClass('popup-active');
  if ( !$('div.popup-bottom.debitcard-info').hasClass('popup-active') ) {
        $('div.popup-bottom.debitcard-info').addClass('popup-active');
        $( 'div.ios-nav-overlay' ).fadeIn( 400 );
     } else {
        $('div.popup-bottom.debitcard-info').removeClass('popup-active');
        $( 'div.ios-nav-overlay' ).fadeOut(  );
        
    }
});

$("div.popup-bottom button.ux-button-icon").click(function(){
    console.log('working');
     $('div.popup-bottom').removeClass('popup-active');
      $( 'div.ios-nav-overlay' ).fadeOut(  );
});
  
// Latest Code  


    function openCity(evt, cityName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
      }
      
      // Get the element with id="defaultOpen" and click on it

 

    $('a #cross1').click(function() {
        console.log('working');
        $('.popup1').hide();  
     });

   