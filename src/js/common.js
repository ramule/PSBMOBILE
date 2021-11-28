var isKeyboardOpen = false;

function disableautocompletion(id1) {
  var passwordControl = document.getElementById(id1);
  passwordControl.setAttribute("autocomplete", "off");
}

$("ul.theme-list li").click(function () {
  $(this).addClass('active')
  $(this).siblings().removeClass('active')

  var theme = $(this).attr('theme')
  localStorage.setItem("theme", theme);
  $('html').attr('theme', theme);
});
$(document).ready(function () {

  var themename = localStorage.getItem("theme");
  $('html').attr('theme', themename)

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
});

// $(document).on('click', '.background-layout li' , function(){
//    var layoutType = $(this).attr('layoutBg');
//    $('html').attr('layout', layoutType)


// })

//############################################# THEME SETTINGS #########################################################

$('body').on('click', '.item-settings', function (e) {

  e.stopPropagation();
  $('#themePanel').toggleClass('notp-showing');
})

$('body').on('click', '.notification-panel', function (event) {
  event.stopPropagation();
});
$('body').click(function () {
  $('#themePanel').removeClass('notp-showing');
});
$('body').on('click', '.themechange li', function () {
  $(this).addClass('active')
  $(this).siblings().removeClass('active')
  var theme = $(this).attr('theme')
  localStorage.setItem("theme", theme);
  $('html').attr('theme', theme)
})

$('body').on('click', '.background-layout li', function () {
  $(this).addClass('active')
  $(this).siblings().removeClass('active')
  var layoutType = $(this).attr('layoutBg');
  $('html').attr('layout', layoutType)

})
$('body').on('click', '.sidebarnavbg li', function () {
  $(this).addClass('active')
  $(this).siblings().removeClass('active')
  var sidenavbg = $(this).attr('sidenavbg');
  $('html').attr('sidenavbg', sidenavbg)

})
$('body').on('click', '.btn-closenoty', function () {
  $('#themePanel').removeClass('notp-showing');

})
//############################################# THEME SETTINGS ENDS #########################################################





// $(document).on('click', '.locate-us .tabHeading span', function(){
//   $('.ux-acc-container .acc-slide .acc-slide-content').addClass('active');
//   $('.ios-nav-overlay').fadeIn();
// })

// $(document).on('click', '.locate-us .filter-header span', function(){
//   $('.ux-acc-container .acc-slide .acc-slide-content').removeClass('active');
//   $('.ios-nav-overlay').fadeOut();
// })
$(document).on('click', '.locate-us .branch-searchresult .branch-lst ul li span.branch-detail a.services', function () {
  $(this).parent().find('.service-list').slideToggle();
  $(this).toggleClass('active');
})

$(document).on('change', '.nightmode  .modebox input', function () {

  if ($(this).prop('checked')) {
    $('html').attr('theme', 'dark')
    localStorage.setItem("theme", 'dark');
  } else {
    $('html').attr('theme', 'default')
    localStorage.setItem("theme", 'default');
  }


})


$(document).on('click', '.registration-container .steps-block span.close', function () {
  $('.steps-block').fadeOut();

})
$(document).on('click', 'ul.step-list li.step-matched em', function () {
  $('.steps-block').fadeIn();

})
$(document).on('click', '.channel-tab li a', function (e) {
  e.preventDefault();
  var tragetId = $(this).attr('href');
  $('.channel-tab li a').removeClass('active');
  $(this).addClass('active');
  $('.creditials-tab-panel .main-pannel').removeClass('active')
  $('.creditials-tab-panel').find(tragetId).addClass('active')

})


$('body').on('click', '.card-actions img,.card-actions svg', function () {
  // $(this).parent().toggleClass('shown');
  // $(this).parents('div.drp-box').siblings('div.ux-dropdown-content').find('div.card-actions').toggleClass('shown');
  // if($(this).parent().hasClass('shown')){
  //     var hiddenamt = $(this).parents('.drp-enterdata').find('strong').text();

  //     var hiddenindiamt = $(this).parents('div.drp-box').siblings('div.ux-dropdown-content').find('em.entered-data ').attr('amt');
  //     $(this).parents('.drp-enterdata').find('.entered-data b').text(hiddenamt);
  //     $(this).parents('div.drp-box').siblings('div.ux-dropdown-content').find('em.entered-data b').text(hiddenamt);
  // } else {
  //     $(this).parents('.drp-enterdata').find('.entered-data b').text('XXXXX.XX');
  //     $(this).parents('div.drp-box').siblings('div.ux-dropdown-content').find('em.entered-data b').text('XXXXX.XX');
  // }

})

// ############################Paybills ####################################

$('body').on('click', 'nav.tab-pills div.tabs>ul.lst-tabs>li>a', function (e) {

  if (!$(this).hasClass('tab-selected')) {
    var selectedIndex = $(this).parent('li').index();
    $(this).closest('nav.tab-pills').find('div.tabs-container').children('div.tab-content1').removeClass('tc-showing');
    $(this).closest('ul.lst-tabs').find('a').removeClass('tab-selected');
    $(this).addClass('tab-selected');
    $(this).closest('nav.tab-pills').find('div.tabs-container').children('div.tab-content1').eq(selectedIndex).addClass('tc-showing');
  }
});


// popupDisable();
function popupDisable() {
  $("input[type='text']").focus(function () {
    alert("Called")
    $(".popup-bottom2").hide();
    $(".info-section").hide();
  });
  $("input[type='text']").focusout(function () {
    $(".popup-bottom2").show();
    $(".info-section").show();
  });
}

$('body').on('change', 'input[name=addPayment]', function () {
  // console.log('Its working');
  if ($(this).val() == "prepaid") {
    $('#prepaid').show();
    $('#postpaid').hide();
  }
  else if ($(this).val() == "postpaid") {
    $('#postpaid').show();
    $('#prepaid').hide();
  }
  else {
    $('#prepaid').show();
    $('#postpaid').hide();
  }
});


$('body').on('hover', 'li.dropdown1', function (e) {
  alert()
  e.preventDefault();
  e.stopPropagation();
  console.log("working!!!!!")
  if (!$('li.dropdown1 div.bm-notification').hasClass('nf-showing')) {
    $('li.dropdown1 div.bm-notification').addClass('nf-showing');
    //  $( 'div.nav-overlay').fadeIn(100);
  } else {
    $('li.dropdown1 div.bm-notification').removeClass('nf-showing');
    //  $( 'div.nav-overlay').fadeOut(100);
  }
});

$('body').on('click', "li.dropdown1", function (e) {
  e.preventDefault();
  e.stopPropagation();
});

/* -- component - tabs secondary */



// ############################Paybills ENDS####################################








// side menu show hide start
$('body').on('click', '.menu-btn', function (e) {
  $('nav.global-nav').addClass('nav-showing');

  $('div.ios-nav-overlay').fadeIn(300);
  // $('body').css('overflow', 'hidden');
});
$('body').on('click', 'div.ios-nav-overlay', function (e) {
  if ( $('nav.global-nav').hasClass('nav-showing')) {
     $('div.ios-nav-overlay').fadeOut(300);
    $('nav.global-nav').removeClass('nav-showing');
  }
})


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

// $$$$$$$$$$$$$$$$$$$Advance search Detailed statement $$$$$$$$$$$$$$$$$$$$$$$$

$('body').on('click', '.search-link a', function () {
  console.log("Worrking!");
  if ($(this).hasClass('active')) {
    $(".search-box").slideUp();
    $(this).removeClass('active')

  } else {
    $(this).addClass('active')
    $(".search-box").slideDown();
  }
});

// $('body').on('click' ,'button.ux-button.statement1' , function(e) {
//     // alert();
//     e.preventDefault();
//      console.log('working now');
//     $("div.grid-container.grid-list").css("display","block");
// });

function dtSample() {
  var tdTblae = $('table#dt-sample').dataTable({
    // select: true,
    dom: "<'row1 ml-0 mr-0 pt-2 pb-1 '<'col-sm-6 col-md-6 col-12 pt-0'l><'col-sm-6 col-md-6 col-12 pt-1'f>> <'row1'<'col-sm-12'tr>><'row1 ml-0 mr-0 pt-3 pb-0'<'col-sm-12 col-md-5 col-xl-5 col-lg-5' <' exportlinks'> > <'col-sm-12 col-md-7 col-xl-7 col-lg-7 text-right'ip>>",
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
  $("div.exportlinks").html('<div class="row">' +
    '<div class="col-12 text-align p-0">' +
    '<button class="ux-linkbutton  primary"> <img src="../assets/images/svg/download.svg" alt="download-icon">Download</button>' +
    '<button class="ux-linkbutton  ml-2 primary"> <img src="../assets/images/svg/print.svg" alt="print-icon">Print</button>' +
    '</div> <!--.dt-extras-->');
  // dtsetResponsive();
  $('table#dt-sample').wrap('<div class="restable-box"></div>');
};


dtSample();





// $$$$$$$$$$$$$$$$$$$Advance search Detailed statement END$$$$$$$$$$$$$$$$$$$$$$$$






$('body').on('click', '.pagetheme-settings ul.background-list li', function () {
  $(this).addClass('active')
  $(this).siblings().removeClass('active')
  var background = $(this).attr('background')
  $('.global-nav').removeClass('bg1  bg2');
  $('.global-nav').addClass(background)

})


$(document).on('click', '#nav-icon1', function () {
  console.log('working!');
  if ($(this).hasClass('open')) {
    $(this).removeClass('open')
    $('body').removeClass('compact')

    console.log('close')

    // $('.global-nav div.nav-items ul').addClass('lst-nav-items')
    // $('.global-nav div.nav-items ul').removeClass('lst-nav-items1')
  } else {
    $(this).addClass('open')
    $('body').addClass('compact')
    console.log('open')
    // $('.global-nav div.nav-items ul').removeClass('lst-nav-items')
    // $('.global-nav div.nav-items ul').addClass('lst-nav-items1')
  }
});

$(document).on('click', '.right-main-column , .compact .global-nav .nav-items .lst-nav-items li .mysubnavigation-items .lst-subnavigation > li > a', function () {
  $('.compact .global-nav .nav-items .lst-nav-items li .mysubnavigation-items ').slideUp();
  $('.compact .global-nav .nav-items .lst-nav-items li a').removeClass('active')
})



var elem = document.documentElement;

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  // if (document.exitFullscreen) {
  //   document.exitFullscreen();
  // } else if (document.mozCancelFullScreen) {
  //   document.mozCancelFullScreen();
  // } else if (document.webkitExitFullscreen) {
  //   document.webkitExitFullscreen();
  // } else if (document.msExitFullscreen) {
  //   document.msExitFullscreen();
  // }
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
// $('body').on('click', '.global-nav div.nav-items ul.lst-nav-items li a', function (e) {
//   e.stopPropagation();
//   if ($(this).hasClass('active')) {
//       // $(this).parent().find('.active').removeClass('active');
//       $(this).parent().find('.mysubnavigation-items').slideUp();

//   } else {
//        $(this).toggleClass("active");
//       $(this).parent().siblings().find('.mysubnavigation-items').slideUp();
//       $(this).parent().siblings().find('a.glnv-dropdown').removeClass('active');
//       $(this).parent().siblings().find('a').removeClass('active');
//       $(this).next('.mysubnavigation-items').slideToggle();
//   }
// });
$('body').on('click', '.global-nav div.nav-items ul.lst-nav-items li a', function (e) {
  if ($(this).hasClass('active')) {
    $(this).parent().find('.active').removeClass('active');
    $(this).parent().find('.mysubnavigation-items').slideUp();
    if (!$(this).hasClass('drilldown')) $(this).parent().siblings().find('a.glnv-dropdown').removeClass('active');
  } else {
    $(this).toggleClass("active");
    $(this).parent().siblings().find('.mysubnavigation-items').slideUp()
    $(this).parent().siblings().find('a.glnv-dropdown').removeClass('active')
    $(this).parent().siblings().find('a').removeClass('active')
    $(this).next('.mysubnavigation-items').slideToggle();
  }
});

//close global navigation


//  $('body').on('click', '.global-nav div.nav-items ul.lst-nav-items li a', function (e) {
//     if($(this).parent().hasClass('drilldown')){

//       $(this).parent().find('.mysubnavigation-items').slideToggle();
//       $(this).parent().siblings().find('.mysubnavigation-items').slideUp();
//       // $(this).parent().siblings().removeClass('active')
//       // $(this).toggleClass('active');

//     }
//  })

$('body').on('click', 'nav.global-nav .btn-closenav, div.nav-overlay, ul.lst-nav-items>li, btn-closeglnav', function (e) {
  console.log(this.id);
  if ($(this).hasClass('drilldown') || $(this).hasClass('fingerprint')) return;

  $('nav.global-nav').removeClass('nav-showing');
  $('div.nav-overlay').fadeOut(300);
  // $('body').css('overflow', 'auto');
});

$('body').on('click', 'ul.lst-navigation>li>a', function (e) {
  $('ul.lst-navigation li a').removeClass('item-selected');
  //$( this ).addClass( 'item-selected' );
});
// side menu show hide end


$('body').on('click', '.global-nav div.nav-items ul.lst-nav-items3 li a', function (e) {
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

$('body').on('click', 'nav.global-nav .btn-closenav, div.nav-overlay, ul.lst-nav-items3>li', function (e) {
  e.stopPropagation();
  $('nav.global-nav').removeClass('nav-showing');
  $('div.nav-overlay').fadeOut(300);
  // $('body').css('overflow', 'auto');
});


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
    } else {
      $(this).siblings("input").attr('type', 'password');
      $(this).removeClass("showing");
    }
  });
}


$('body').on('click', '.tab-main .tab ul li .tablinks', function () {
  $(this).parent().siblings().find('.tablinks').removeClass('active')
  $(this).addClass('active');
  $(this).parents('.tab-main').find('.tabcontent').css('display', 'none')
  $(this).parents('.tab-main').find('#' + $(this).attr('tabfor')).css('display', 'block')
  // $('.tab-main .tabcontent .embed-responsive .popup1').show()

})

$('body').on('click', '.tab-main .tabcontent .embed-responsive .popup1 .modal-header .mh-bottom a', function () {
  $(this).parents('.popup1').hide()


})


// ###################################Aa####################################

var size = 0, sizes = ["fnt-normal", "fnt-large", "fnt-xlarge"];
$('body').on('click', 'a.item-font', function (e) {

  size = size + 1;
  if (size >= sizes.length) {
    size = 0;
  }
  var sizeClass = sizes[size];
  // console.log(size ,'a')  ;
  $('body').attr('class', '').addClass(sizeClass);
  fvaluechange();
});
function fvaluechange() {
  $('body').on('click', 'a.item-font', function (e) {
    $('.show-increase').remove();
    if (!$('body').hasClass('fnt-normal')) {
      if (!$('body').hasClass('fnt-large')) {
        $(this).append('<i class="show-increase">3X</i>');
        // $(this).find('i').addClass('show-increase').text( "3X");
      }
      else if (!$('body').hasClass('fnt-xlarge')) {
        $(this).append('<i class="show-increase">2X</i>');
        // $(this).find('i').addClass('show-increase').text( "2X");
      }

    }

  });
}
// ###################################Aa END####################################

// input type as number start
function ShowHideNumber() {
  console.log("show hide number");
  $(".show-pwd-number").on('click', function () {
    if ($(this).siblings("input").hasClass("password_number")) {
      $(this).siblings("input").removeClass("password_number");
      $(this).addClass("showing");
    } else {
      $(this).siblings("input").addClass("password_number");
      $(this).removeClass("showing");
    }
  });
}
// input type as number end

function toggleLangugae() {
  $(".ux-selection label").click(function () {
    if ($(this).hasClass(".lang-sel")) {
      $(".ux-selection label").removeClass("lang-sel");
    } else {
      $(".ux-selection label").removeClass("lang-sel");
      $(this).addClass("lang-sel");
    }
  })
}

function contactAccordian() {
  //script for arrow toggle accrodian start
  //  $(".acc-slide .arrow-toggle").click(function(event) {

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
  //script for arrow toggle accordian end

  //contact us
  $(".talk").click(function () {
    $(this).closest(".talkto-us").toggleClass("talk-active");
    $(this).parent(".container").siblings(".talkto-us-details").slideToggle();
  });
}

$(document).ready(function () {
  // $('body').on('click', '.acc-slide .arrow-toggle.custom', function () {
  //     $(this).parent().toggleClass('slide-active');
  //     $(this).parent().find('.acc-slide-content').slideToggle();
  //     $(this).parents('li').siblings().find('.acc-slide').removeClass('slide-active')
  //     $(this).parents('li').siblings().find('.acc-slide-content').slideUp()
  // })


  $('body').on('click', 'div.toast-messages div.msg-toast', function () {
    setTimeout(function () {
      $('div.toast-messages').find('.msg-toast').removeClass('msg-showing');
    }, 300);
  });
  //script for arrow toggle accrodian start
  // $("body").on("click", ".acc-slide .arrow-toggle.custom", function (event) {
  //   if (!$(this).parent(".acc-slide").hasClass('slide-active')) {
  //     $(".acc-slide").removeClass('slide-active');
  //   }
  //   if (!$(this).parent(".acc-slide").hasClass('slide-active')) {
  //     $(this).parent(".acc-slide").addClass('slide-active');
  //     $('.acc-slide-content').slideUp();
  //     $(".acc-slide").children('.acc-slide-content').slideUp();
  //     $(this).parent(".acc-slide").children('.acc-slide-content').slideDown();
  //   } else if ($(this).parent(".acc-slide").hasClass('slide-active')) {
  //     $(this).parent(".acc-slide").removeClass('slide-active');
  //     $('.acc-slide-content').slideUp();
  //   }
  // });
  //script for arrow toggle accordian end

  //contact us
  $(".talk").click(function () {
    $(this).closest(".talkto-us").toggleClass("talk-active");
    $(this).parent(".container").siblings(".talkto-us-details").slideToggle();
  });

  // window resize function
  $(window).resize(function () {
    fixMapHeight();
  });
});
// document ready ends
// showToastMessage( 'TextYouWantToShow', 'TypeofMessage(error|success|warning|info)', automaticallyDismiss(true|false), AfterHowMuchMilisecondsDismiss(1000)  );

/* //-- show toast message - Function */
function showToastMessage(messageText, messageType, autoDismiss, dismissDuration) {
  // if (messageText == "Product Service Error") messageText = "";
  // if (typeof messageType === "undefined" || messageType === null)
  //   messageType = 'error';
  // if (typeof autoDismiss === "undefined" || autoDismiss === null)
  //   autoDismiss = true;
  // if (typeof dismissDuration === "undefined" || dismissDuration === null)
  //   dismissDuration = 5000;

  // var messageHTML = '<div class="msg-toast msg-' + messageType + '"><em>' + messageText + '</em></div>';
  // $('body').append('<div class="toast-messages"></div>');
  // $('div.toast-messages').html(messageHTML);
  // setTimeout(function () {
  //   $('div.toast-messages').find('.msg-toast').addClass('msg-showing');
  // }, 300);
  // if (autoDismiss) {
  //   setTimeout(function () {
  //     $('div.toast-messages').find('.msg-toast').removeClass('msg-showing');
  //   }, dismissDuration);
  //   setTimeout(function () {
  //     $('div.toast-messages').html('');
  //   }, dismissDuration + 400);
  // } else {
  //   $('div.toast-messages').find('.msg-toast').addClass('msg-close');
  // }
};

function openModal(id, action) {
  $(id).modal(action);

}
$(document).on('click', 'body', function (e) {

  $('.fund-transfer-wrapp .send-input ul').removeClass('active')
})
$(document).on('click', '.fund-transfer-wrapp .send-input ul li', function (e) {
  e.stopPropagation();

  $('.fund-transfer-wrapp .send-input ul').removeClass('active')
})

$(document).on('click', '.fund-transfer-wrapp .send-input', function (e) {
  e.stopPropagation();
  $('.fund-transfer-wrapp .send-input ul').addClass('active')
})
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
stickFooter();
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

// ripple effect start
function rippleEffect() {
  $('body').on('click', '.ux-button', function () {
    //$(".ux-button").click(function(){
    $(".ux-button").removeClass("ripple-btn");
    $(this).addClass("ripple-btn");
    setTimeout(function () {
      $(".ux-button").removeClass("ripple-btn");
    }, 1000);
  });
}

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
      legend: {
        display: false
      }

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
          gridLines: {
            display: false
          },
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

// numeric keypad script start
var mPINEntering = [];

function numericKeypad(pinLength) {

  // mPIN 4 digit - 4 input
  $('div.mpin-digits input:first').focus();
  $('body').on('keypress', 'div.mpin-digits input[type=password]', function (e) {
    console.log('input = ' + e.which);
    // if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
    var keycode = e.keyCode ? e.keyCode : e.which;
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

  $('div.btn-mpin-numbers button.btn-mpin-number').click(function (e) {
    if (mPINEntering.length < pinLength) {
      mPINEntering.push($(this).html());
      $('div.mpin-dots-line div.mpin-dot-' + mPINEntering.length).addClass('dot-filled');
    }
    /* else {

           } */
  });

  $('div.mpin-dots-line button.btn-mpin-fill.btn-mpin-clear').click(function (e) {
    console.log("inside");
    if (mPINEntering.length != 0) {
      //alert('ALL CLEARED');
      $('div.mpin-dots-line div.mpin-dot-' + mPINEntering.length).removeClass('dot-filled');
      mPINEntering.pop();
    }
    /* else {

           } */
  });

}
// numeric keypad script end

//script for arrow toggle accordian start

//script for arrow toggle accordian end

function checkNavMenu() {
  if ($(window).width() > 991 && sessionStorage.getItem("isLoggedIn") == null) {
    $(".right-main-column").css("margin-left", "0");
    $(".global-header").css("left", "0");
    this.showNavigation = true;
    $(".global-nav").hide();
  } else if ($(window).width() > 991 && sessionStorage.getItem("isLoggedIn") == "true") {
    $(".global-nav").show();
    $(".right-main-column").css("margin-left", "250px");
    $(".global-header").css("left", "250px");
    this.showNavigation = true;
  }
  /*else
  {
      $(".right-main-column").css("margin-left", "0");
      $(".global-header").css("left", "0");
      this.showNavigation = true;
  }*/
}


//var openKeybordPress=null;
var keyPressOn = false;

function virtualKeybord(vartualPass, keyBoardDiv, inputTxt) {
  console.log("vartualPass-->" + vartualPass + "  keyBoardDiv--->" + keyBoardDiv);

  $(function () {
    $("#" + vartualPass)
      // apply keyboard
      .keyboard({
        layout: 'custom',
        customLayout: {
          'default': [
            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            'q w e r t y u i o p [ ] \\',
            'a s d f g h j k l ; \'',
            '{shift} z x c v b n m , . / {clear}'
          ],
          'shift': [
            '~ ! @ # $ % ^ & * ( ) _ + ',
            'Q W E R T Y U I O P { } |',
            'A S D F G H J K L : "',
            '{shift} Z X C V B N M < > ? {clear}'
          ]
        },
        display: {
          // this needs to be set otherwise the scramble
          // extension thinks the "C" is another letter
          // to scramble
          'clear': 'Clear',
          'bksp': 'Delete'
        },
        visible: function (e, kb) {
          // kb.$keyboard.find(".ui-keyboard-clear").addClass("ui-state-active");
        },
        // keyboard always visible
        alwaysOpen: true,
        ignoreEsc: true,
        stayOpen: true,
        // avoid changing the focus (hardware keyboard probably won't work)
        noFocus: true,
        // disable position utility
        position: '',
        // use original input only
        usePreview: false,
        preventPaste: true, // prevent ctrl-v and right click
        // add keyboard to desired div
        appendTo: "#" + keyBoardDiv,
        change: function (e, keyboard, el) {
          // console.log('keyboard value',e.target.value);

        },
        beforeVisible: function (e, keyboard, el) { },
        beforeClose: function (e, keyboard, el, accepted) { },

        // initialize scramble
        initialized: function (e, keyboard, el) {

          setTimeout(function () {
            keyboard.$keyboard = keyboard.scramble_setup(keyboard.$keyboard);

          }, 0);
        },
        validate: function (keyboard, value, isClosing) {
          return true;
        }
      })
      .addScramble({
        targetKeys: /[a-z\d]/i, // keys to randomize
        byRow: true, // randomize by row, otherwise randomize all keys
        randomizeOnce: false, // if false, randomize every time the keyboard open
      });
    $("#" + inputTxt).val("")
    // $("#"+inputTxt).focus();

  });
  //   return keyPressOn;
  isKeyboardOpen = true;
}


/*function vartualKeybord(vartualPass,keyBoardDiv){
    keyPressOn=true;
    $(".keypng")
          // apply keyboard
          .keyboard({
            customLayout : {
                'default': [
                  '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                  'q w e r t y u i o p [ ] \\',
                  'a s d f g h j k l ; \'',
                  '{shift} z x c v b n m , . / {shift}'
                ],
                'shift': [
                  '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                  'Q W E R T Y U I O P { } |',
                  'A S D F G H J K L : "',
                  '{shift} Z X C V B N M < > ? {shift}'
                ]
              },
              appendTo: ".keyBoardDiv",
          });
          return keyPressOn;
}*/

var captchaChecked = false;

function captcha() {
  var verifyCallback = function (response) {
    console.log("captcha :::: " + response);
    captchaChecked = true;
  };
  var widgetId1;


  grecaptcha.render('captchaDiv', {
    'sitekey': '6Le42I8UAAAAAINt8HBuIQRI_KqYZbHBeWJhomil',
    'callback': verifyCallback,
    'theme': 'dark'
  });
}

function showAndHideKeyBoard() {
  $('nav.global-nav').removeClass('nav-showing');
  $('div.nav-overlay').fadeOut(300);
  // $('body').css('overflow', 'auto');
}


function loginCaptcha() {
  var verifyCallback = function (response) {
    console.log("captcha :::: " + response);
    captchaChecked = true;
  };
  var widgetId1;


  grecaptcha.render('logincaptchaDiv', {
    'sitekey': '6Le42I8UAAAAAINt8HBuIQRI_KqYZbHBeWJhomil',
    'callback': verifyCallback,
    'theme': 'light'
  });
}

// function closekeypad(){
// $(document).click(function() {
//     alert(openKeybord);
// if(openKeybord==true){
//     alert("called");
//    // $('#keyBoardDiv').hide();
//     openKeybord=null;
// }
// });
// }

$(document).click(function (e) {
  if (!window.hasOwnProperty('cordova')) {
    // alert("event id-->" + e.target.id)

    if (e.target.id == "pwdKeyboard" || e.target.id == 'pwd_keyboard') {
      passwordKeyboardInit();
    } else if (e.target.id == "userNameKeyboard") {
      userNameKeyboardInit();

    }
    else if (e.target.id == 'userName_keyboard' || $(event.target).hasClass('ui-keyboard-keyset') || e.target.id == 'pwd_keyboard') {

    }
    else if (isKeyboardOpen) {
      closeKeyboards();
    } else {
      /**
       * handle other event
       */
    }
  }
});

function passwordKeyboardInit() {
  var pwdkeyboard = $('#pwd').keyboard().getkeyboard();
  pwdkeyboard.destroy();
  $('#keyBoardDiv').show();
  $('#keyBoardDiv1').hide();
  $('.keyboardoverlay').addClass('active');
  virtualKeybord("pwd", "keyBoardDiv", "pwdTxt");
}

function userNameKeyboardInit() {
  var userNameKeyboard = $('#userName').keyboard().getkeyboard();
  userNameKeyboard.destroy();
  $('#keyBoardDiv1').show();
  $('#keyBoardDiv').hide();
  $('.keyboardoverlay').addClass('active');
  virtualKeybord("userName", "keyBoardDiv1", "userNameTxt");

}

function closeKeyboards() {
  // var pwdkeyboard = $('#pwd').keyboard().getkeyboard();
  // if (pwdkeyboard) {
  //     pwdkeyboard.destroy();
  // }

  // var userNameKeyboard = $('#userName').keyboard().getkeyboard();
  // if (userNameKeyboard) {
  //     userNameKeyboard.destroy();
  // }
  isKeyboardOpen = false;
  $('.keyboardoverlay').removeClass('active');
  $('#keyBoardDiv').hide();
  $('#keyBoardDiv1').hide();
}

function cardCarousel() {
  $('div.wc-cardlist').owlCarousel({
    margin: 20,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    loop: false,
    rewind: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: false
      },
      768: {
        items: 2,
        nav: true,
        // loop:false
      },
      1024: {
        items: 2,
        nav: true,
        // loop:false
      },
      1200: {
        items: 2,
        nav: true,
        // loop:false
      },
      1366: {
        items: 3,
        nav: true,
        // loop:false
      },
      1400: {
        items: 3,
        nav: true,
        // loop:false
      },
      1600: {
        items: 4,
        nav: true,
        // loop:false
      }
    }
  });
}

// uniqueSq();
// function uniqueSq() {
//   $("select").change(function () {

//     $("select option").attr("disabled", "");
//     DisableOptions();

//   });
// }



function DisableOptions() {
  $("select option").filter(function () {
    var bSuccess = false;
    var selectedEl = $(this);
    $("select option:selected").each(function () {

      if ($(this).val() == selectedEl.val()) {
        bSuccess = true;
        return false;
      };
    });
    return bSuccess;

  }).attr("disabled", "disabled");

}




function boxCarousel5() {
  $('.box-owl5').owlCarousel({
    // margin:15,
    autoplay: false,
    // autoWidth:true,
    autoplayTimeout: 3000,
    loop: false,
    rewind: true,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      640: {
        items: 2
      },
      768: {
        items: 2,
        nav: true,
        // loop:false
      },
      1024: {
        items: 3,
        nav: true,
        // loop:false
      },
      1200: {
        items: 3,
        nav: true,
        // loop:false
      },
      1366: {
        items: 3,
        nav: true,
        // loop:false
      },
      1400: {
        items: 3,
        nav: true,
        // loop:false
      },
      1600: {
        items: 4,
        nav: true,
        // loop:false
      }
    }
  })
}

function boxCarousel() {
  $('.box-owl').owlCarousel({
    autoplay: false,
    autoplayTimeout: 3000,
    loop: false,
    rewind: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      768: {
        items: 2,
        nav: false,
        // loop:false
      },
      1024: {
        items: 2,
        nav: false,
        // loop:false
      },
      1200: {
        items: 2,
        nav: false,
        // loop:false
      },
      1366: {
        items: 3,
        nav: false,
        // loop:false
      },
      1400: {
        items: 3,
        nav: false,
        // loop:false
      },
      1600: {
        items: 3,
        nav: false,
        // loop:false
      }
    }
  });

  $("div.ios-nav-overlay").click(function (e) {
    e.stopPropagation();
    // console.log('working');
    // $('div.popup-bottom.mpin-info').removeClass('popup-active');
    // $('div.ios-nav-overlay').fadeOut(400);
  });
  // $(document).ready(function () {
  //   setTimeout(function () {
  //     $("#loginModal").modal('show');
  //   }, 500);
  // });

  $("ul.sim-list li a").click(function () {
    console.log('its working');
    $("ul.sim-list li a").removeClass("active");
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      // $( 'div.ios-nav-overlay' ).fadeIn( 400 );
      // $( 'body' ).css( 'overflow', 'hidden' );
    } else {
      $(this).removeClass('active');
      // $( 'div.ios-nav-overlay' ).fadeOut(  );
      // $( 'body' ).css( 'overflow', 'auto' );
    }
  });


  // $("a.fogot-mpin").click(function () {
  //   // console.log('working');
  //   if (!$('div.popup-bottom.mpin-info').hasClass('popup-active')) {
  //     $('div.popup-bottom.mpin-info').addClass('popup-active');
  //     $('div.ios-nav-overlay').fadeIn(400);
  //   } else {
  //     $('div.popup-bottom.mpin-info').removeClass('popup-active');
  //     $('div.ios-nav-overlay').fadeOut(400);
  //   }
  // });



  $("button.close-btn").click(function () {
    console.log('working');
    $('div.popup-bottom.mpin-info').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });

  // $("input[type='password']").focus(function () {
  // $("nav.ios-global-nav3").css("position", "relative");
  //   $("nav.ios-global-nav3").hide();
  // });

  // $("input[type='password']").blur(function () {
  //    $("nav.ios-global-nav3").css("position", "absolute");
  //   $("nav.ios-global-nav3").show();
  // });

}


// $(document).on('click' ,'button.close-btn' ,function(){

//  $('div.popup-bottom.mpin-info').removeClass('popup-active');
//  $( 'div.ios-nav-overlay' ).fadeOut(400);
// });



$(document).on('click', '.focusInput', function (e) {
  // e.stopPropagation();
  // $('.focusCloseable').removeClass('popup-active')

})

$(document).on('click', 'body', function () {
  // $('.focusCloseable').addClass('popup-active')
})

// hidePopupIfKeyboardOpens();
function hidePopupIfKeyboardOpens() {
  var _originalSize = $(window).width() + $(window).height();
  $(window).resize(function () {
    if ($(window).width() + $(window).height() != _originalSize) {
      console.log("keyboard show up");
      $('.focusCloseable').removeClass('popup-active');
    } else {
      console.log("keyboard closed");
      $('.focusCloseable').addClass('popup-active')
    }
  });
}

function boxCarousel3() {
  $('.box-owl3').owlCarousel({
    autoplay: false,
    autoplayTimeout: 3000,
    loop: false,
    rewind: true,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      640: {
        items: 2
      },
      768: {
        items: 2,
        nav: true,
        // loop:false
      },
      1024: {
        items: 3,
        nav: true,
        // loop:false
      },
      1200: {
        items: 3,
        nav: true,
        // loop:false
      },
      1366: {
        items: 3,
        nav: true,
        // loop:false
      },
      1400: {
        items: 3,
        nav: true,
        // loop:false
      },
      1600: {
        items: 4,
        nav: true,
        // loop:false
      }
    }
  })


  //script for arrow toggle accrodian start
  $("body").on("click", ".acc-slide1 .arrow-toggle.custom", function () {
    if (!$(this).parent(".acc-slide1").hasClass('slide-active')) {
      $(".acc-slide1").removeClass('slide-active');
    }
    if (!$(this).parent(".acc-slide1").hasClass('slide-active')) {
      $(this).parent(".acc-slide1").addClass('slide-active');
      $('.acc-slide-content').slideUp();
      $(".acc-slide1").children('.acc-slide-content').slideUp();
      $(this).parent(".acc-slide1").children('.acc-slide-content').slideDown();
    }
    else if ($(this).parent(".acc-slide1").hasClass('slide-active')) {
      $(this).parent(".acc-slide1").removeClass('slide-active');
      $('.acc-slide-content').slideUp();
    }
  });
  //script for arrow toggle accordian end

  // Check Balance Amount

  $("a.balance-info").click(function () {

    // if ($(this).hasClass("active")) {
    //   $(this).removeClass('active')
    // } else {
    //   $(this).addClass('active')
    // }
  })

  // Check Balance Amount


  $("a.default-btn").click(function () {
    // console.log('working');
    if (!$('div.popup-bottom.default1').hasClass('popup-active')) {
      $('div.popup-bottom.default1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.default1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.default1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });

  $("a.block-debit").click(function () {
    // console.log('working');
    if (!$('div.popup-bottom.block1').hasClass('popup-active')) {
      $('div.popup-bottom.block1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.block1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.block-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    $('div.popup-bottom.block1').removeClass('popup-active');
    if (!$('div.popup-bottom.success1').hasClass('popup-active')) {
      $('div.popup-bottom.success1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.success1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("a.setlimit-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.setlimit1').hasClass('popup-active')) {
      $('div.popup-bottom.setlimit1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.setlimit1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("a.setupi-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.debitcard-info').hasClass('popup-active')) {
      $('div.popup-bottom.debitcard-info').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.debitcard-info').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.debit-details").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    $('div.popup-bottom.debitcard-info').removeClass('popup-active');
    if (!$('div.popup-bottom.success2').hasClass('popup-active')) {
      $('div.popup-bottom.success2').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.success2').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.enable-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.success1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
    $('ul.information-list2 li a.debit1.disable').removeClass('disable');
    $('a.block-debit').hide();
  });

  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.default1').removeClass('popup-active');
    $('div.popup-bottom.block1').removeClass('popup-active');
    $('div.popup-bottom.setlimit1').removeClass('popup-active');
    $('div.popup-bottom.remove1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });

  $("a.remove-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.remove1').hasClass('popup-active')) {
      $('div.popup-bottom.remove1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.remove1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("a.remove-btn1").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.remove2').hasClass('popup-active')) {
      $('div.popup-bottom.remove2').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.remove2').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.submit-btn").click(function (e) {
    e.preventDefault();
    // console.log('working');
    $('div.popup-bottom.success2').removeClass('popup-active');
    $('div.popup-bottom.setlimit1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });

}


// ENd

function moboVerification() {

  $("button.sendsms").click(function () {
    console.log('working');
    if (!$('div.popup-bottom.register1').hasClass('popup-active')) {
      $('div.popup-bottom.register1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.register1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut();

    }
  });

  $("button.info-submit").click(function () {
    console.log('working');
    $('div.popup-bottom.register1').removeClass('popup-active');
    if (!$('div.popup-bottom.register2').hasClass('popup-active')) {
      $('div.popup-bottom.register2').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.register2').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut();

    }
  });

  // $("button.confirm-btn").click(function () {
  //   console.log('working');
  //   if (!$('div.popup-bottom.confirmation').hasClass('popup-active')) {
  //     $('div.popup-bottom.confirmation').addClass('popup-active');
  //     $('div.ios-nav-overlay').fadeIn(400);
  //   } else {
  //     $('div.popup-bottom.confirmation').removeClass('popup-active');
  //     $('div.ios-nav-overlay').fadeOut();

  //   }
  // });

  // $("button.mpin-submit").click(function () {
  //   console.log('working');
  //   if (!$('div.popup-bottom.mpin-success').hasClass('popup-active')) {
  //     $('div.popup-bottom.mpin-success').addClass('popup-active');
  //     $('div.ios-nav-overlay').fadeIn(400);
  //   } else {
  //     $('div.popup-bottom.mpin-success').removeClass('popup-active');
  //     $('div.ios-nav-overlay').fadeOut(400);
  //   }
  // });

}
function getSpasswordElement(index, idName) {
  return document.getElementById('spassword' + index);
}



function getindexElementforALl(index, idName) {
  return document.getElementById(idName + index);
}




function onKeyUpEventforAll(index, event, idName) {
  const eventCode = event.which || event.keyCode;
  if (getindexElementforALl(index, idName).value.length === 1) {
    if (index !== 6) {
      getindexElementforALl(index + 1, idName).focus();
    } else {
      getindexElementforALl(index, idName).blur();
      // Submit code
      console.log('submit code ');
    }
  }
  if (eventCode === 12 && index !== 1) {
    alert()
    getindexElementforALl(index - 1).focus();
  }
}
function onFocusEventAll(index, idName) {
  for (item = 1; item < index; item++) {
    const currentElement = getindexElementforALl(item, idName);
    if (!currentElement.value) {
      currentElement.focus();
      break;
    }
  }
}




function getUpasswordElement(index) {
  return document.getElementById('upassword' + index);
}

function onKeyUp(index, event) {
  const eventCode = event.which || event.keyCode;
  if (getUpasswordElement(index).value.length === 1) {
    if (index !== 6) {
      getUpasswordElement(index + 1).focus();
    } else {
      getUpasswordElement(index).blur();
      // Submit code
      console.log('submit code1 ');
    }
  }
  if (eventCode === 12 && index !== 1) {
    getUpasswordElement(index - 1).focus();
  }
}

function getSpasswordElement(index) {
  return document.getElementById('spassword' + index);
}

function onKeyUpEvent(index, event) {
  const eventCode = event.which || event.keyCode;
  if (getSpasswordElement(index).value.length === 1) {
    if (index !== 6) {
      getSpasswordElement(index + 1).focus();
    } else {
      getSpasswordElement(index).blur();
      // Submit code
      console.log('submit code ');
    }
  }
  if (eventCode === 12 && index !== 1) {
    getSpasswordElement(index - 1).focus();
  }
}
function onFocusEvent(index) {
  for (item = 1; item < index; item++) {
    const currentElement = getSpasswordElement(item);
    if (!currentElement.value) {
      currentElement.focus();
      break;
    }
  }
}
function getCpasswordElement(index) {
  return document.getElementById('cpassword' + index);
}

function onKeyUpEvents(index, event) {
  const eventCode = event.which || event.keyCode;
  if (getCpasswordElement(index).value.length === 1) {
    if (index !== 6) {
      getCpasswordElement(index + 1).focus();
    } else {
      getCpasswordElement(index).blur();
      // Submit code
      console.log('submit code3 ');
    }
  }
  if (eventCode === 12 && index !== 1) {
    getCpasswordElement(index - 1).focus();
  }
}

function onFocus(index) {
  for (item = 1; item < index; item++) {
    const currentElement = getUpasswordElement(item);
    if (!currentElement.value) {
      currentElement.focus();
      break;
    }
  }
}

function onFocusEvents(index) {
  for (item = 1; item < index; item++) {
    const currentElement = getCpasswordElement(item);
    if (!currentElement.value) {
      currentElement.focus();
      break;
    }
  }
}

function selectionList() {

  $("ul.info-list li").click(function () {
    console.log('its working');
    $("ul.info-list li").removeClass("active");
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  $("button.reject-btn").click(function () {
    console.log('working');
    if (!$('div.popup-bottom.reject1').hasClass('popup-active')) {
      $('div.popup-bottom.reject1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.reject1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut();
    }
  });
  $("button.set-btn").click(function (e) {
    e.preventDefault();
    console.log('working');
    $('div.popup-bottom.reminder1').removeClass('popup-active');
    if (!$('div.popup-bottom.success1').hasClass('popup-active')) {
      $('div.popup-bottom.success1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.success1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });
  $("a.block-btn").click(function () {
    // console.log('working');
    if (!$('div.popup-bottom.block1').hasClass('popup-active')) {
      $('div.popup-bottom.block1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.block1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });
  $("button.close-btn").click(function () {
    console.log('working');
    $('div.popup-bottom.reject1').removeClass('popup-active');
    $('div.popup-bottom.reminder1').removeClass('popup-active');
    $('div.popup-bottom.snoozeReminder').removeClass('popup-active');
    $('div.popup-bottom.success1').removeClass('popup-active');
    $('div.popup-bottom.block1').removeClass('popup-active');
    $('div.popup-bottom.blockUPI').removeClass('popup-active');
    $('div.popup-bottom.mpin-info').removeClass('popup-active');
    $('div.popup-bottom.rejectPendingReq').removeClass('popup-active');
    $('div.popup-bottom.logout1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });

  // $("a.reminder-btn").click(function () {
  //   // console.log('working');
  //   if (!$('div.popup-bottom.reminder1').hasClass('popup-active')) {
  //     $('div.popup-bottom.reminder1').addClass('popup-active');
  //     $('div.ios-nav-overlay').fadeIn(400);
  //   } else {
  //     $('div.popup-bottom.reminder1').removeClass('popup-active');
  //     $('div.ios-nav-overlay').fadeOut(400);
  //   }
  // });

  $("#bank").hide();
  $("#other-bank").hide();
  $(document).ready(function () {
    $(".tabs li a").on('click', function (e) {

      e.preventDefault();
      $(' .entry-content').hide();
      $($(this).attr("href")).show();
    });
  });


  $("button#select-account").click(function (e) {
    e.preventDefault();
    console.log('working');
    if (!$('div.popup-bottom.selectaccount').hasClass('popup-active')) {
      $('div.popup-bottom.selectaccount').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.selectaccount').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut();

    }
  });

  $("a#select-account").click(function (e) {
    e.preventDefault();
    console.log('working');
    if (!$('div.popup-bottom.selectaccount').hasClass('popup-active')) {
      $('div.popup-bottom.selectaccount').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.selectaccount').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut();

    }
  });

  $("button#debit-details").click(function (e) {
    e.preventDefault();
    console.log('working');
    $('div.popup-bottom.selectaccount').removeClass('popup-active');
    if (!$('div.popup-bottom.debitcard-info').hasClass('popup-active')) {
      $('div.popup-bottom.debitcard-info').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.debitcard-info').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut();

    }
  });

  $("div.popup-bottom button.ux-button-icon").click(function () {
    console.log('working');
    $('div.popup-bottom').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut();
  });

}

function amount() {
  // $('#amt').autoNumeric('init', { aSign: " ₹ " });

  $("ul.theme-list li").click(function () {
    console.log('its working');
    $("ul.theme-list li").removeClass("active");
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      // $( 'div.ios-nav-overlay' ).fadeIn( 400 );
      // $( 'body' ).css( 'overflow', 'hidden' );
    } else {
      $(this).removeClass('active');
      // $( 'div.ios-nav-overlay' ).fadeOut(  );
      // $( 'body' ).css( 'overflow', 'auto' );
    }
  });
}

function payUpi() {

  //   $("div.responsive1 ul.nav.nav-tabs>li.nav-item2>a").click(function(e){
  //     if($(this).attr('href') === '#selft') {
  //   console.log('fired')
  //   $('button.proceed-btn').show();
  //   $('div.powered-logo.mt-0').removeClass('mt-0');
  //   $('div.tab-show').hide();
  //      }
  //  else if($(this).attr('href') === '#upi') {
  //   $('button.proceed-btn').hide();
  //   $('div.powered-logo').addClass('mt-0');
  //   $('div.tab-show').show();
  //      }
  //  else if($(this).attr('href') === '#account') {
  //   $('button.proceed-btn').hide();
  //   $('div.powered-logo').addClass('mt-0');
  //   $('div.tab-show').show();
  //      }
  //  else if($(this).attr('href') === '#mmid') {
  //   $('button.proceed-btn').hide();
  //   $('div.powered-logo').addClass('mt-0');
  //   $('div.tab-show').show();
  //      }

  //  else{
  // $('button.proceed-btn').hide();
  // $('div.powered-logo').addClass('mt-0');
  // $('div.tab-show').show();
  //  }
  //  } );


  $(document).ready(function () {
    let size_li = $(".payee-list li").length;
    console.log("Size :: ", size_li)
    let x = 9;
    $('.payee-list li:last-child').show();
    $('.payee-list li:lt(' + x + ')').show();
    $('button#loadMore').click(function () {
      x = (x + 5 <= size_li) ? x + 5 : size_li;
      $('.payee-list li:lt(' + x + ')').show();
      $('button#showLess').show();
      if (x == size_li) {
        $('button#loadMore').hide();
      }
      else {
        $('button#loadMore').show();
      }
    });


    $("select.sBranch").on('change', function () {
      $(this).find("option:selected").each(function () {
        var optionValue = $(this).attr("value");
        if (optionValue) {
          $('div.ifsc-code').show();
        } else {
          $('div.ifsc-code').hide();
        }
      });
    });

  });

  /* Button Disable and Enable */

  $('button.verify').attr('disabled', true);
  $('button.verify').addClass('disable');
  $("input[name='upiId']").on('keyup', function () {
    if ($(this).val() != '') {
      $('button.verify').attr('disabled', false);
      $('button.verify').removeClass('disable');
    } else {
      $('button.verify').attr('disabled', true);
      $('button.verify').addClass('disable');
    }
  });


  $('button.proceed1').attr('disabled', true);
  $('button.proceed1').addClass('disable');
  $('button.cancel1').attr('disabled', true);
  $('button.cancel1').addClass('disable');



  // $("div.ux-input input[name='upiId']").on('keyup',function() {
  // 	  if($(this).val() != '') {
  // 		$('div.ux-input label').addClass('active');
  // 	   }else{
  // 		$('div.ux-input label').removeClass('active');
  // 		}
  // 	});

  $("input[name='mobile']").on('keyup', function () {
    if ($(this).val() != '') {
      $('button.proceed1').attr('disabled', false);
      $('button.proceed1').removeClass('disable');
      $('button.cancel1').attr('disabled', false);
      $('button.cancel1').removeClass('disable');
    } else {
      $('button.proceed1').attr('disabled', true);
      $('button.proceed1').addClass('disable');
      $('button.cancel1').attr('disabled', true);
      $('button.cancel1').addClass('disable');
    }
  });
  $("input[name='mmid']").on('keyup', function () {
    if ($(this).val() != '') {
      $('button.proceed1').attr('disabled', false);
      $('button.proceed1').removeClass('disable');
      $('button.cancel1').attr('disabled', false);
      $('button.cancel1').removeClass('disable');
    } else {
      $('button.proceed1').attr('disabled', true);
      $('button.proceed1').addClass('disable');
      $('button.cancel1').attr('disabled', true);
      $('button.cancel1').addClass('disable');
    }
  });
  $("input[name='payeeName']").on('keyup', function () {
    if ($(this).val() != '') {
      $('button.proceed1').attr('disabled', false);
      $('button.proceed1').removeClass('disable');
      $('button.cancel1').attr('disabled', false);
      $('button.cancel1').removeClass('disable');
    } else {
      $('button.proceed1').attr('disabled', true);
      $('button.proceed1').addClass('disable');
      $('button.cancel1').attr('disabled', true);
      $('button.cancel1').addClass('disable');
    }
  });

  $("input[name='accountNum']").on('keyup', function () {
    if ($(this).val() != '') {
      $('button.proceed1').attr('disabled', false);
      $('button.proceed1').removeClass('disable');
      $('button.cancel1').attr('disabled', false);
      $('button.cancel1').removeClass('disable');
    } else {
      $('button.proceed1').attr('disabled', true);
      $('button.proceed1').addClass('disable');
      $('button.cancel1').attr('disabled', true);
      $('button.cancel1').addClass('disable');
    }
  });

  $("input[name='reaccountNum']").on('keyup', function () {
    if ($(this).val() != '') {
      $('button.proceed1').attr('disabled', false);
      $('button.proceed1').removeClass('disable');
      $('button.cancel1').attr('disabled', false);
      $('button.cancel1').removeClass('disable');
    } else {
      $('button.proceed1').attr('disabled', true);
      $('button.proceed1').addClass('disable');
      $('button.cancel1').attr('disabled', true);
      $('button.cancel1').addClass('disable');
    }
  });

  $("select.sBank").on('change', function () {
    $(this).find("option:selected").each(function () {
      var optionValue = $(this).attr("value");
      if (optionValue) {
        $('button.proceed1').attr('disabled', false);
        $('button.proceed1').removeClass('disable');
        $('button.cancel1').attr('disabled', false);
        $('button.cancel1').removeClass('disable');
      } else {
        $('button.proceed1').attr('disabled', true);
        $('button.proceed1').addClass('disable');
        $('button.cancel1').attr('disabled', true);
        $('button.cancel1').addClass('disable');
      }
    });
  });

  $('button.verify').click(function () {
    console.log("Worrking!");
    if ($(this).hasClass('disable')) {
      $('button.verify').attr('disabled', true);
      $('div.userinfo').hide();
      $('div.upiId').show();
    } else {
      $('button.verify').attr('disabled', false);
      $('div.userinfo').show();
      $('div.upiId').hide();
    }
  });
}

function inviteContactList() {
  $("a.status-info").click(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass('active')
    } else {
      $(this).addClass('active')
    }
  })
}
function createGlobalNavMore() {

  payUpi();

  amount();

  selectionList();

  // $("div.responsive1 ul.nav.nav-tabs>li.nav-item2>a").click(function (e) {
  //   if ($(this).attr('href') === '#selft') {
  //     console.log('fired')
  //     $('button.proceed-btn').show();
  //     $('div.powered-logo.mt-0').removeClass('mt-0');
  //   }
  //   else {
  //     $('button.proceed-btn').hide();
  //     $('div.powered-logo').addClass('mt-0');
  //   }
  // });

  $("div.modal-body ul.sim-list li a").click(function () {
    console.log('its working');
    $("div.modal-body ul.sim-list li a").removeClass("active");
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      // $( 'div.ios-nav-overlay' ).fadeIn( 400 );
      // $( 'body' ).css( 'overflow', 'hidden' );
    } else {
      $(this).removeClass('active');
      // $( 'div.ios-nav-overlay' ).fadeOut(  );
      // $( 'body' ).css( 'overflow', 'auto' );
    }
  });


  $("button.filter-btn").click(function () {
    console.log('working');
    if (!$('div.popup-bottom.filter1').hasClass('popup-active')) {
      $('div.popup-bottom.filter1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.filter1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut();
    }
  });
  $("button.close-btn").click(function () {
    console.log('working');
    $('div.popup-bottom.filter1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut();
  });


  //script for arrow toggle accrodian start
  $("body").on("click", ".acc-slide3 .arrow-toggle.custom", function () {
    if (!$(this).parent(".acc-slide3").hasClass('slide-active')) {
      $(".acc-slide3").removeClass('slide-active');
    }
    if (!$(this).parent(".acc-slide3").hasClass('slide-active')) {
      $(this).parent(".acc-slide3").addClass('slide-active');
      $('.acc-slide-content').slideUp();
      $(".acc-slide3").children('.acc-slide-content').slideUp();
      $(this).parent(".acc-slide3").children('.acc-slide-content').slideDown();
    }
    else if ($(this).parent(".acc-slide3").hasClass('slide-active')) {
      $(this).parent(".acc-slide3").removeClass('slide-active');
      $('.acc-slide-content').slideUp();
    }
  });
  //script for arrow toggle accordian end


  $("button.unblock-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.unblock1').hasClass('popup-active')) {
      $('div.popup-bottom.unblock1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.unblock1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.unblock-submit").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    $('div.popup-bottom.unblock1').removeClass('popup-active');
    if (!$('div.popup-bottom.block-success').hasClass('popup-active')) {
      $('div.popup-bottom.block-success').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.block-success').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.unblock1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });

}


function raiseComplaintDetails() {

  $("input[name='transactionAmt']").on('keyup', function () {
    if ($(this).val() != '') {
      ($(this).val('&#x20B9;'));
    } else {

    }
  });

  $("button.complaint-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.success').hasClass('popup-active')) {
      $('div.popup-bottom.success').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.success').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });
}

function mandate() {

  payUpi();

  raiseComplaintDetails();

  $("button.revoke-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');

    if (!$('div.popup-bottom.revoke1').hasClass('popup-active')) {
      $('div.popup-bottom.revoke1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.revoke1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });


  $("button.revoke-btn1").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    $('div.popup-bottom.revoke1').removeClass('popup-active');
    if (!$('div.popup-bottom.success').hasClass('popup-active')) {
      $('div.popup-bottom.success').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.success').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.revoke1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });



  $("a.info-btn").click(function () {
    // console.log('working');
    if (!$('div.popup-bottom.information1').hasClass('popup-active')) {
      $('div.popup-bottom.information1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.information1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.decline-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.decline1').hasClass('popup-active')) {
      $('div.popup-bottom.decline1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.decline1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.decline1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });

  $('#amt').autoNumeric('init', { aSign: " ₹ " });

  $(document).on('change', '.toggle-col.yes  input[type="checkbox"]', function () {
    console.log('Its working')
    // if($(this).prop("checked")){
    // 	$(this).parents('li').find('.qr-container').addClass('disable')
    // }else{
    // 	$(this).parents('li').find('.qr-container').removeClass('disable')
    // 	}
  })

  $("div.ios-nav-overlay").click(function (e) {
    e.stopPropagation();
    // console.log('working');
    // $('div.popup-bottom.information1').removeClass('popup-active');
    // $('div.ios-nav-overlay').fadeOut(400);
  });

}

function showTermcondition() {
  $('div.popup-bottom.register2').addClass('popup-active');
  $('div.ios-nav-overlay').fadeIn(400);
}

function hideTermcondition() {
  $('div.popup-bottom.register2').removeClass('popup-active');
  $('div.ios-nav-overlay').fadeOut();
}

function showWifiModal() {
  $('div.popup-bottom.register1').addClass('popup-active');
  $('div.ios-nav-overlay').fadeIn(400);
}

function hideWifiModal() {
  $('div.popup-bottom.register1').removeClass('popup-active');
  $('div.ios-nav-overlay').fadeOut();
}

function showisMPINEnabledModal() {
  $('div.popup-bottom.isMPINEnabledModal').addClass('popup-active');
  $('div.ios-nav-overlay').fadeIn(400);
}

function hideisMPINEnabledModal() {
  $('div.popup-bottom.isMPINEnabledModal').removeClass('popup-active');
  $('div.ios-nav-overlay').fadeOut();
}

function showBiometricModal() {
  // $("button.confirm-btn").click(function () {
  // console.log('working');
  // if (!$('div.popup-bottom.confirmation').hasClass('popup-active')) {
  $('div.popup-bottom.confirmation').addClass('popup-active');
  $('div.ios-nav-overlay').fadeIn(400);
  // } else {
  // $('div.popup-bottom.confirmation').removeClass('popup-active');
  // $('div.ios-nav-overlay').fadeOut();
  // }
  // });
}

function hideBiometricModal() {
  $('div.popup-bottom.confirmation').removeClass('popup-active');
  $('div.ios-nav-overlay').fadeOut();
}

function showLoginModal() {
  $("#loginModal").modal('show');
}

function hideLoginModal() {
  $("#loginModal").modal('hide');
}

function showNoSimModal() {
  $('div.popup-bottom.noSimModal').addClass('popup-active');
  $('div.ios-nav-overlay').fadeIn(400);
}

function hideNoSimModal() {
  $('div.popup-bottom.noSimModal').removeClass('popup-active');
  $('div.ios-nav-overlay').fadeOut();
}

function showFilterModal() {
  if (!$('div.popup-bottom.filter1').hasClass('popup-active')) {
    $('div.popup-bottom.filter1').addClass('popup-active');
    $('div.ios-nav-overlay').fadeIn(400);
  } else {
    $('div.popup-bottom.filter1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut();
  }
}

function hideFilterModal() {

  $('div.popup-bottom.filter1').removeClass('popup-active');
  $('div.ios-nav-overlay').fadeOut();

}

$(document).on('click', '.ios-nav-overlay', function () {

  // if ($('div.popup-bottom.noVpaExitRetry').hasClass('popup-active')) {
  //   console.log("Working");
  // } else {
  // $(this).fadeOut();
  // $('.popup-bottom').removeClass('popup-active');
  // }

})

function boxCarousel4() {
  $('.box-owl4').owlCarousel({
    autoplay: false,
    autoplayTimeout: 3000,
    loop: false,
    rewind: true,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      640: {
        items: 1
      },
      768: {
        items: 1,
        nav: false,
        // loop:false
      },
      1024: {
        items: 1,
        nav: false,
        // loop:false
      },
      1200: {
        items: 1,
        nav: false,
        // loop:false
      },
      1366: {
        items: 2,
        nav: false,
        // loop:false
      },
      1400: {
        items: 2,
        nav: false,
        // loop:false
      },
      1600: {
        items: 2,
        nav: false,
        // loop:false
      }
    }
  })
  $('button.proceed1').attr('disabled', true);
  $('button.proceed1').addClass('disable');

  $("select.biller").on('change', function () {
    $(this).find("option:selected").each(function () {
      var optionValue = $(this).attr("value");
      if (optionValue) {
        $('button.proceed1').attr('disabled', false);
        $('button.proceed1').removeClass('disable');
      } else {
        $('button.proceed1').attr('disabled', true);
        $('button.proceed1').addClass('disable');
      }
    });
  });

  $("input[name='consumerNumber']").on('keyup', function () {
    if ($(this).val() != '') {
      $('button.proceed1').attr('disabled', false);
      $('button.proceed1').removeClass('disable');
    } else {
      $('button.proceed1').attr('disabled', true);
      $('button.proceed1').addClass('disable');
    }
  });
  $("input[name='shortName']").on('keyup', function () {
    if ($(this).val() != '') {
      $('button.proceed1').attr('disabled', false);
      $('button.proceed1').removeClass('disable');
    } else {
      $('button.proceed1').attr('disabled', true);
      $('button.proceed1').addClass('disable');
    }
  });


  $("ul.info-list li").click(function () {
    console.log('its working');
    $("ul.info-list li").removeClass("active");
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  $("button.filter-btn").click(function () {
    console.log('working');
    if (!$('div.popup-bottom.filter1').hasClass('popup-active')) {
      $('div.popup-bottom.filter1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.filter1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut();
    }
  });

  $("button.close-btn").click(function () {
    console.log('working');
    $('div.popup-bottom.filter1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut();
  });

  $("a.remove-btn").click(function () {
    console.log('working');
    if (!$('div.popup-bottom.delete1').hasClass('popup-active')) {
      $('div.popup-bottom.delete1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.delete1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut();
    }
  });


}

function billRaise() {
  $('button.submit1').attr('disabled', true);
  $('button.submit1').addClass('disable');
  $('button.submit2').attr('disabled', true);
  $('button.submit2').addClass('disable');
  $('button.search1').attr('disabled', true);
  $('button.search1').addClass('disable');

  // $("select.billertype").on('change',function() {
  // 	$(this).find("option:selected").each(function(){
  // 		var optionValue = $(this).attr("value");
  //    if(optionValue){
  // 	   $('button.submit1').removeClass('disable');
  // 	   $('button.submit1').attr('disabled' , false);
  //    }else{
  // 		$('button.submit1').attr('disabled' , true);
  // 		$('button.submit1').addClass('disable');
  //       }
  //    });
  // });


  // $("select.complaints").on('change',function() {
  // 	$(this).find("option:selected").each(function(){
  // 		var optionValue = $(this).attr("value");
  //    if(optionValue){
  // 	  $('div.biller-info').show();
  //    }else{
  // 	$('div.biller-info').hide();
  //       }
  //    });
  //   });

  $("select.complaints").change(function () {
    console.log('working');
    $(this).find("option:selected").each(function () {

      $('input[name=searchby]').change(function () {
        // console.log('Its working');
        if ($(this).val() == "transaction") {
          $('#transaction').show();
          $('#duration').hide();
          $("button.submit2").show();
          $("button.submit1").hide();
          $("button.search1").hide();
        }
        else if ($(this).val() == "duration") {
          $('#duration').show();
          $('#transaction').hide();
          $("button.search1").show();
          $("button.submit1").hide();
          $("button.submit2").hide();
        }
        else {
          $('#transaction').hide();
          $('#duration').hide();
          $("button.submit1").hide();
          $("button.submit2").hide();
          $("button.search1").hide();
        }
      }); var optionValue = $(this).attr("value");
      if (optionValue) {
        $(".complaint-info").not("." + optionValue).hide();
        $("." + optionValue).show();
        $('button.submit1').removeClass('disable');
        $('button.submit1').attr('disabled', false);
        $('button.submit2').removeClass('disable');
        $('button.submit2').attr('disabled', false);
        $('button.search1').removeClass('disable');
        $('button.search1').attr('disabled', false);
      }
      else {
        $(".complaint-info").hide();
        $('button.submit1').attr('disabled', true);
        $('button.submit1').addClass('disable');
        $('button.submit2').attr('disabled', true);
        $('button.submit2').addClass('disable');
        $('button.search1').attr('disabled', true);
        $('button.search1').addClass('disable');
      }
    });
  }).change();

}

function billRaiseTransactionComplaint() {
  $('button.submit1').attr('disabled', true);
  $('button.submit1').addClass('disable');

  $("select.complaints").change(function () {
    console.log('working');
    $(this).find("option:selected").each(function () {
      var optionValue = $(this).attr("value");
      if (optionValue) {
        $(".complaint-info").not("." + optionValue).hide();
        $("." + optionValue).show();
        $('button.submit1').removeClass('disable');
        $('button.submit1').attr('disabled', false);
      }
      else {
        $(".complaint-info").hide();
        $('button.submit1').attr('disabled', true);
        $('button.submit1').addClass('disable');
      }
    });
  }).change();

}

function billPayComplaint() {
  $("button.filter-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.filter1').hasClass('popup-active')) {
      $('div.popup-bottom.filter1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.filter1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $('input[name=search1]').change(function () {
    // console.log('Its working');
    if ($(this).val() == "complaintid") {
      $('#complaint1').show();
      $('#duration1').hide();
    }
    else if ($(this).val() == "duration") {
      $('#duration1').show();
      $('#complaint1').hide();
    }
    else {
      $('#complaint1').show();
      $('#duration1').hide();
    }
  });

  $("button.duration-filter").click(function () {
    // console.log('working');
    $('div.popup-bottom.filter1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
    $('button.filter-btn span').addClass('point');
  });

  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.filter1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });
}

function homeElectricity() {
  // $("input[type='text']").focus(function () {
  //   $(".popup-bottom2").hide();
  //   $(".info-section").hide();
  // });
  // $("input[type='text']").blur(function () {
  //   $(".popup-bottom2").show();
  //   $(".info-section").show();
  // });

  $("input[name='amount']").on('keyup', function () {
    if ($(this).val() != '') {
      $('div.calculate-amt').show();
      // $('button.verify').removeClass('disable');
    } else {
      $('div.calculate-amt').hide();
      // $('button.verify').addClass('disable');
    }
  });


  $('#amt').autoNumeric('init', { aSign: " ₹ " });


}

function electricityPay() {
  $("input[name='consumerNumber']").on('keyup', function () {
    if ($(this).val() != '') {
      $('div.biller-info').show();
      // $('button.verify').removeClass('disable');
    } else {
      $('div.biller-info').hide();
      // $('button.verify').addClass('disable');
    }
  });

  $("button.filter-btn").click(function () {
    console.log('working');
    if (!$('div.popup-bottom.filter1').hasClass('popup-active')) {
      $('div.popup-bottom.filter1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.filter1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut();
    }
  });
  $("button.close-btn").click(function () {
    console.log('working');
    $('div.popup-bottom.filter1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut();
  });

  changeType();

  var input = document.getElementById("input");
  input.addEventListener("focus", changeType);
  input.addEventListener("blur", changeType);
}

function changeType() {
  var input = document.getElementById("input");
  var type = input.getAttribute("type");
  if (type == "tel") {
    input.setAttribute("type", "password");
  } else {
    input.setAttribute("type", "tel");
  }
}

function manageAccountDashboard() {

  boxCarousel5();
  // //script for arrow toggle accrodian start
  // $("body").on("click", ".acc-slide1 .arrow-toggle.custom", function() {
  //     if (!$(this).parent(".acc-slide1").hasClass('slide-active')) {
  //         $(".acc-slide1").removeClass('slide-active');
  //     }
  //     if (!$(this).parent(".acc-slide1").hasClass('slide-active')) {
  //         $(this).parent(".acc-slide1").addClass('slide-active');
  //         $('.acc-slide-content').slideUp();
  //         $(".acc-slide1").children('.acc-slide-content').slideUp();
  //         $(this).parent(".acc-slide1").children('.acc-slide-content').slideDown();
  //     } else if ($(this).parent(".acc-slide1").hasClass('slide-active')) {
  //         $(this).parent(".acc-slide1").removeClass('slide-active');
  //         $('.acc-slide-content').slideUp();
  //     }
  // });
  // //script for arrow toggle accordian end

  // Check Balance Amount

  $("a.balance-info img.refresh-btn").click(function () {
    console.log('Its working');
    if ($(this).parent('a.balance-info').hasClass("active")) {
      $(this).parent('a.balance-info').removeClass('active')
    } else {
      $(this).parent('a.balance-info').addClass('active')
    }
  })

  // Check Balance Amount


  $("a.default-btn").click(function () {
    // console.log('working');
    if (!$('div.popup-bottom.default1').hasClass('popup-active')) {
      $('div.popup-bottom.default1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.default1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.default-btn").click(function () {
    // console.log('working');
    if (!$('div.popup-bottom.default1').hasClass('popup-active')) {
      $('div.popup-bottom.default1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.default1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.default1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });

  $("a.block-debit").click(function () {
    // console.log('working');
    if (!$('div.popup-bottom.block1').hasClass('popup-active')) {
      $('div.popup-bottom.block1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.block1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.block-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    $('div.popup-bottom.block1').removeClass('popup-active');
    if (!$('div.popup-bottom.success1').hasClass('popup-active')) {
      $('div.popup-bottom.success1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.success1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("a.setlimit-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.setlimit1').hasClass('popup-active')) {
      $('div.popup-bottom.setlimit1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.setlimit1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });
  $("button.setlimit-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.setlimit1').hasClass('popup-active')) {
      $('div.popup-bottom.setlimit1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.setlimit1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("a.setupi-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.debitcard-info').hasClass('popup-active')) {
      $('div.popup-bottom.debitcard-info').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.debitcard-info').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.debit-details").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    $('div.popup-bottom.debitcard-info').removeClass('popup-active');
    if (!$('div.popup-bottom.success2').hasClass('popup-active')) {
      $('div.popup-bottom.success2').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.success2').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.enable-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.success1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
    $('ul.information-list2 li a.debit1.disable').removeClass('disable');
    $('a.block-debit').removeClass('danger');
    $('a.block-debit').addClass('primary');
    $('a.block-debit').text('Active');
  });

  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.default1').removeClass('popup-active');
    $('div.popup-bottom.block1').removeClass('popup-active');
    $('div.popup-bottom.setlimit1').removeClass('popup-active');
    $('div.popup-bottom.remove1').removeClass('popup-active');
    $('div.popup-bottom.debitcard-info').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });

  $("a.remove-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.remove1').hasClass('popup-active')) {
      $('div.popup-bottom.remove1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.remove1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("a.remove-btn1").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.remove2').hasClass('popup-active')) {
      $('div.popup-bottom.remove2').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.remove2').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("div.ios-nav-overlay").click(function (e) {
    e.stopPropagation();
    // console.log('working');
    // $('div.popup-bottom.block1').removeClass('popup-active');
    // $('div.popup-bottom.remove2').removeClass('popup-active');
    // $('div.popup-bottom.default1').removeClass('popup-active');
    // $('div.popup-bottom.setlimit1').removeClass('popup-active');
    // $('div.ios-nav-overlay').fadeOut(400);
  });

  $("button.submit-btn").click(function (e) {
    e.preventDefault();
    // console.log('working');
    $('div.popup-bottom.success2').removeClass('popup-active');
    $('div.popup-bottom.setlimit1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });

}

function showNoVPAModal() {
  // $("button.confirm-btn").click(function () {
  // console.log('working');
  $('div.popup-bottom.noVpaExitRetry').addClass('popup-active');
  $('div.ios-nav-overlay').fadeIn(400);
  // } else {
  // $('div.popup-bottom.confirmation').removeClass('popup-active');
  // $('div.ios-nav-overlay').fadeOut();
  // }
  // });
}

function hideNoVPAModal() {
  $('div.popup-bottom.noVpaExitRetry').removeClass('popup-active');
  $('div.ios-nav-overlay').fadeOut();
}

function showMPINSuccessModal() {
  // $("button.mpin-submit").click(function () {
  //   console.log('working');
  if (!$('div.popup-bottom.mpin-success').hasClass('popup-active')) {
    $('div.popup-bottom.mpin-success').addClass('popup-active');
    $('div.ios-nav-overlay').fadeIn(400);
  }
  // else {
  //     $('div.popup-bottom.mpin-success').removeClass('popup-active');
  //     $('div.ios-nav-overlay').fadeOut(400);
  //   }
  // });
}

function hideMPINSuccessModal() {
  $('div.popup-bottom.mpin-success').removeClass('popup-active');
  $('div.ios-nav-overlay').fadeOut(400);
}


function paymentHistory() {
  $("button.filter-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.filter1').hasClass('popup-active')) {
      $('div.popup-bottom.filter1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.filter1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $('input[name=search1]').change(function () {
    // console.log('Its working');
    if ($(this).val() == "transaction") {
      $('#transaction1').show();
      $('#duration1').hide();
    }
    else if ($(this).val() == "duration") {
      $('#duration1').show();
      $('#transaction1').hide();
    }
    else {
      $('#transaction1').show();
      $('#duration1').hide();
    }
  });

  $("button.duration-filter").click(function () {
    // console.log('working');
    $('div.popup-bottom.filter1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
    $('button.filter-btn span').addClass('point');
  });

  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.filter1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });
}


function showMpinModel() {
  if (!$('div.popup-bottom.mpin-info').hasClass('popup-active')) {
    $('div.popup-bottom.mpin-info').addClass('popup-active');
    $('div.ios-nav-overlay').fadeIn(400);
    // } else {
    //   $('div.popup-bottom.mpin-info').removeClass('popup-active');
    //   $('div.ios-nav-overlay').fadeOut(400);
    // }
  }
}

function hideMpinModel() {
  $('div.popup-bottom.mpin-info').removeClass('popup-active');
  $('div.ios-nav-overlay').fadeOut(400);
}

function notification() {
  $("ul.notification-list li").click(function () {
    console.log('its working');
    $("ul.notification-list li").removeClass("active");
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
    }
    else {
      $(this).removeClass('active');
    }
  });
}



function deregister() {
  $("button.deregister-procced").click(function () {
    // console.log('working');
    if (!$('div.popup-bottom.deregister1').hasClass('popup-active')) {
      $('div.popup-bottom.deregister1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.deregister1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.deregister-submit").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    $('div.popup-bottom.deregister1').removeClass('popup-active');
    if (!$('div.popup-bottom.success1').hasClass('popup-active')) {
      $('div.popup-bottom.success1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.success1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.deregister1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });

  $("div.ios-nav-overlay").click(function (e) {
    event.stopPropagation();
    // console.log('working');
    // $('div.popup-bottom.deregister1').removeClass('popup-active');
    // $('div.popup-bottom.success1').removeClass('popup-active');
    // $('div.ios-nav-overlay').fadeOut(400);
  });
}

function changeMpin() {
  $('button.submit1').attr('disabled', true);
  $('button.submit1').addClass('disable');


  $("input[name='npassword']").on('keyup', function () {
    if ($(this).val() != '') {
      $('button.submit1').attr('disabled', false);
      $('button.submit1').removeClass('disable');
    } else {
      $('button.submit1').attr('disabled', true);
      $('button.submit1').addClass('disable');
    }
  });


  $("input[name='cpassword']").on('keyup', function () {
    if ($(this).val() != '') {
      $('button.submit1').attr('disabled', false);
      $('button.submit1').removeClass('disable');
    } else {
      $('button.submit1').attr('disabled', true);
      $('button.submit1').addClass('disable');
    }
  });


  $("button.submit1").click(function () {
    // console.log('working');
    if (!$('div.popup-bottom.mpin-change').hasClass('popup-active')) {
      $('div.popup-bottom.mpin-change').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.mpin-change').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("div.ios-nav-overlay").click(function (e) {
    event.stopPropagation();
    // console.log('working');
    //  $('div.popup-bottom.mpin-change').removeClass('popup-active');
    //  $( 'div.ios-nav-overlay' ).fadeOut(400);
  });


}

function faq() {
  $("body").on("click", ".acc-slide3 .arrow-toggle.custom", function () {
    if (!$(this).parent(".acc-slide3").hasClass('slide-active')) {
      $(".acc-slide3").removeClass('slide-active');
    }
    if (!$(this).parent(".acc-slide3").hasClass('slide-active')) {
      $(this).parent(".acc-slide3").addClass('slide-active');
      $('.acc-slide-content').slideUp();
      $(".acc-slide3").children('.acc-slide-content').slideUp();
      $(this).parent(".acc-slide3").children('.acc-slide-content').slideDown();
    }
    else if ($(this).parent(".acc-slide3").hasClass('slide-active')) {
      $(this).parent(".acc-slide3").removeClass('slide-active');
      $('.acc-slide-content').slideUp();
    }
  });
}

function upiDashboard() {

  $("button.profile-btn").click(function () {
    // console.log('working');
    if (!$('div.popup-bottom.profile1').hasClass('popup-active')) {
      $('div.popup-bottom.profile1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.profile1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  // $("a.delete-btn").click(function () {
  //   // console.log('working');
  //   $('div.popup-bottom.profile1').removeClass('popup-active');
  //   if (!$('div.popup-bottom.delete-profile-pic').hasClass('popup-active')) {
  //     $('div.popup-bottom.delete-profile-pic').addClass('popup-active');
  //     $('div.ios-nav-overlay').fadeIn(400);
  //   } else {
  //     $('div.popup-bottom.delete-profile-pic').removeClass('popup-active');
  //     $('div.ios-nav-overlay').fadeOut(400);
  //   }
  // });

  // Check Balance Amount
  $("a.drp-enterdata.balance-info").click(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass('active')
    } else {
      $(this).addClass('active')
    }
  })
  // Check Balance Amount

  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.logout1').removeClass('popup-active');
    $('div.popup-bottom.profile1').removeClass('popup-active');
    $('div.popup-bottom.delete-profile-pic').removeClass('popup-active');
    $('div.popup-bottom.setLimitPopup').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });
  $("div.ios-nav-overlay").click(function (e) {
    console.log('event ios-nav-overlay ', $(e.target).attr('class'))
    // event.stopPropagation();
    // console.log('working');
    // $('div.popup-bottom.logout1').removeClass('popup-active');
    // $('div.popup-bottom.profile1').removeClass('popup-active');
    // $('div.popup-bottom.delete-profile-pic').removeClass('popup-active');
    // $('div.popup-bottom.successReminder').removeClass('popup-active');
    // $('div.popup-bottom.rejectPendingReq').removeClass('popup-active');
    // $('div.popup-bottom.snoozeReminder').removeClass('popup-active');
    // $('div.popup-bottom.blockUPI').removeClass('popup-active');
    // $('div.popup-bottom.network-info').removeClass('popup-active');
    // $('div.popup-bottom.header-info').removeClass('popup-active');
    // $('div.popup-bottom.show-common-info').removeClass('popup-active');
    // $('div.popup-bottom.show-common-error').removeClass('popup-active');
    // $('div.popup-bottom.collect-setValidity').removeClass('popup-active');
    // $('div.popup-bottom.noVpaExitRetry').removeClass('popup-active');
    // $('div.popup-bottom.information1').removeClass('popup-active');
    // $('div.popup-bottom.createMandatePaymentInfo').removeClass('popup-active');
    // $('div.popup-bottom.requestMandatePaymentInfo').removeClass('popup-active');
    // $('div.popup-bottom.show-biometric-info').removeClass('popup-active');
    // $('.popup-bottom').removeClass('popup-active');
    // $('div.ios-nav-overlay').fadeOut(400);
  });

}

function activeGlobalUpi() {
  $(document).on('change', '.toggle-col.disable1  input[type="checkbox"]', function () {
    $('input[name="startDate"]').parent("div.ux-input.ux-common").addClass('ux-disabled');
    $('input[name="startDate"]').attr('disabled', true);
    $('input[name="startDate"]').addClass('disable');
    console.log('Its working')

    if ($(this).prop("checked")) {
      // $(this).parents('li').find('.qr-container').addClass('disable')
      $('input[name="transactionLimit"]').attr('disabled', false);
      $('input[name="transactionLimit"]').removeClass('disable');
      $('input[name="dayLimit"]').attr('disabled', false);
      $('input[name="dayLimit"]').removeClass('disable');
      $('input[name="startDate"]').attr('disabled', true);
      $('input[name="startDate"]').addClass('disable');
      $('input[name="endDate"]').attr('disabled', false);
      $('input[name="endDate"]').removeClass('disable');
      $('div.ux-input.ux-common').removeClass('ux-disabled');
      $('input[name="startDate"]').parent("div.ux-input.ux-common").addClass('ux-disabled');
      $('div.ux-selection1').removeClass('disabled');
      $('div.ux-selection1 span.checkmark').removeClass('disabled');
      $('input[name="radioboxdemo"]').attr('disabled', false);
      // $('button.btn-active').text('Activate');
      // $('.btn-active').show();
      // $('.btn-active1').hide();
      $('h5.custom-h5').removeClass('disabled');
    } else {
      // $(this).parents('li').find('.qr-container').removeClass('disable')
      //   $('input[type='text']').attr('disabled' , true);
      $('button.proceed1').addClass('disable');
      $('input[name="transactionLimit"]').attr('disabled', true);
      $('input[name="transactionLimit"]').addClass('disable');
      $('input[name="dayLimit"]').attr('disabled', true);
      $('input[name="dayLimit"]').addClass('disable');
      $('input[name="startDate"]').attr('disabled', true);
      $('input[name="startDate"]').addClass('disable');
      $('input[name="endDate"]').attr('disabled', true);
      $('input[name="endDate"]').addClass('disable');
      $('input[name="startDate"]').parent("div.ux-input.ux-common").addClass('ux-disabled');
      $('div.ux-input.ux-common').addClass('ux-disabled');
      $('div.ux-selection1').addClass('disabled');
      $('div.ux-selection1 span.checkmark').addClass('disabled');
      $('input[name="radioboxdemo"]').attr('disabled', true);
      //   $('button.btn-active').text('Update');
      //   $('.btn-active1').show();
      //   $('.btn-active').hide();
      $('h5.custom-h5').addClass('disabled');
    }
  })

}

function updateUpiGlobalSettings() {
  $(document).on('change', '.toggle-col.disable1  input[type="checkbox"]', function () {

    console.log('Its working')
    if (!$(this).prop("checked")) {
      // $(this).parents('li').find('.qr-container').removeClass('disable')
      //   $('input[type='text']').attr('disabled' , true);
      $('button.proceed1').addClass('disable');
      $('input[name="transactionLimit"]').attr('disabled', true);
      $('input[name="transactionLimit"]').addClass('disable');
      $('input[name="dayLimit"]').attr('disabled', true);
      $('input[name="dayLimit"]').addClass('disable');
      $('input[name="startDate"]').attr('disabled', true);
      $('input[name="startDate"]').addClass('disable');
      $('input[name="endDate"]').attr('disabled', true);
      $('input[name="endDate"]').addClass('disable');
      $('div.ux-input.ux-common').addClass('ux-disabled');
      $('div.ux-input.ux-common1').addClass('ux-disabled');
      $('div.ux-selection1').addClass('disabled');
      $('div.ux-selection1 span.checkmark').addClass('disabled');
      $('input[name="radioboxdemo"]').attr('disabled', true);
      //   $('button.btn-active').text('Update');
      //   $('.btn-active1').show();
      //   $('.btn-active').hide();
      $('h5.custom-h5').addClass('disabled');
    } else {
      // $(this).parents('li').find('.qr-container').addClass('disable')
      $('input[name="transactionLimit"]').attr('disabled', false);
      $('input[name="transactionLimit"]').removeClass('disable');
      $('input[name="dayLimit"]').attr('disabled', false);
      $('input[name="dayLimit"]').removeClass('disable');
      $('input[name="startDate"]').attr('disabled', false);
      $('input[name="startDate"]').removeClass('disable');
      $('input[name="endDate"]').attr('disabled', false);
      $('input[name="endDate"]').removeClass('disable');
      $('div.ux-input.ux-common').removeClass('ux-disabled');
      $('div.ux-input.ux-common1').removeClass('ux-disabled');
      $('div.ux-selection1').removeClass('disabled');
      $('div.ux-selection1 span.checkmark').removeClass('disabled');
      $('input[name="radioboxdemo"]').attr('disabled', false);
      // $('button.btn-active').text('Activate');
      // $('.btn-active').show();
      // $('.btn-active1').hide();
      $('h5.custom-h5').removeClass('disabled');
    }
  })

}

function scanQR() {

  $("div.ios-nav-overlay").click(function (e) {
    e.stopPropagation();
    // console.log('working');
    $('div.popup-bottom.UPI-global').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });

  $("button.close-btn").click(function (e) {
    e.stopPropagation();
    //  console.log('working');
    $('div.popup-bottom.UPI-global').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });

}

function gstPay() {
  // $('#amt').autoNumeric('init', { aSign: " ₹ " });

  $("button.pay-btn").click(function () {
    // console.log('working');
    if (!$('div.popup-bottom.alert1').hasClass('popup-active')) {
      $('div.popup-bottom.alert1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.alert1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("div.ios-nav-overlay").click(function (e) {
    e.stopPropagation();
    // // console.log('working');
    // $('div.popup-bottom.alert1').removeClass('popup-active');
    // $('div.ios-nav-overlay').fadeOut(400);
  });


}

function manageBlockUpiId() {
  $("body").on("click", ".acc-slide3 .arrow-toggle.custom", function () {
    if (!$(this).parent(".acc-slide3").hasClass('slide-active')) {
      $(".acc-slide3").removeClass('slide-active');
    }
    if (!$(this).parent(".acc-slide3").hasClass('slide-active')) {
      $(this).parent(".acc-slide3").addClass('slide-active');
      $('.acc-slide-content').slideUp();
      $(".acc-slide3").children('.acc-slide-content').slideUp();
      $(this).parent(".acc-slide3").children('.acc-slide-content').slideDown();
    }
    else if ($(this).parent(".acc-slide3").hasClass('slide-active')) {
      $(this).parent(".acc-slide3").removeClass('slide-active');
      $('.acc-slide-content').slideUp();
    }
  });
  //script for arrow toggle accordian end


  $("button.unblock-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.unblock1').hasClass('popup-active')) {
      $('div.popup-bottom.unblock1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.unblock1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.unblock-submit").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    $('div.popup-bottom.unblock1').removeClass('popup-active');
    if (!$('div.popup-bottom.block-success').hasClass('popup-active')) {
      $('div.popup-bottom.block-success').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.block-success').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.unblock1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });

}

function imgCarousel() {
  $('.img-owl').owlCarousel({
    autoplay: true,
    autoplayTimeout: 4000,
    loop: false,
    rewind: true,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      768: {
        items: 2,
        nav: false,
        // loop:false
      },
      1024: {
        items: 2,
        nav: false,
        // loop:false
      },
      1200: {
        items: 2,
        nav: false,
        // loop:false
      },
      1366: {
        items: 3,
        nav: false,
        // loop:false
      },
      1400: {
        items: 3,
        nav: false,
        // loop:false
      },
      1600: {
        items: 3,
        nav: false,
        // loop:false
      }
    }
  })
}

function smsLoader() {
  // $("ul.sim-list li a").click(function () {
  //   console.log('its working');
  //   $("#sendsmsModal").modal('show');4

  $('.loader').ClassyLoader({
    percentage: 100,
    speed: 20,
    fontSize: '14px',
    diameter: 30,
    lineColor: 'rgba(11,131,224,1)',
    remainingLineColor: 'rgba(200,200,200,0.6)',
    lineWidth: 5
  });
  // });
}

// UPI Forgot Mpin

function forgitMpin() {
  $('input[name=card-number]').keypress(function () {
    console.log(document.getElementById('card').value);
    var rawNumbers = $(this).val().replace(/[^0-9]/gi, '');
    var cardLength = rawNumbers.length;
    if (cardLength !== 0 && cardLength <= 10 && cardLength % 4 == 0) {
      $(this).val($(this).val() + ' ');
    }
    return /\d/.test(String.fromCharCode(event.keyCode));
  });
}

function checkDigit(event) {
  var code = (event.which) ? event.which : event.keyCode;

  if ((code < 48 || code > 57) && (code > 31)) {
    return false;
  }

  return true;
}

function pendingRequest() {

  $("ul.info-list li").click(function () {
    console.log('its working');
    $("ul.info-list li").removeClass("active");
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  $("ul.payment-list li").click(function () {
    console.log('its working');
    $("ul.payment-list li").removeClass("active");
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  $("button.filter-btn").click(function () {
    console.log('working');
    if (!$('div.popup-bottom.filter1').hasClass('popup-active')) {
      $('div.popup-bottom.filter1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.filter1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut();
    }
  });
}

function myProfile() {
  $(function () {
    $('nav.ios-global-nav-custom ul.lst-ios-nav li').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
    });
  })

  $(document).on('change', '.toggle-col.disable  input[type="checkbox"]', function () {

    if ($(this).prop("checked")) {
      $(this).parents('li').find('div.qr-container div.qr-img').addClass('disable');
      $(this).parents('li').find('div.qr-container div.lock-img').removeClass('disable');
      $(this).parents('li').find('div.qr-container div.lock-img').show();
    } else {
      $(this).parents('li').find('div.qr-container div.qr-img').removeClass('disable')
      $(this).parents('li').find('div.qr-container div.lock-img').addClass('disable')
    }
  })

  $("a.delete-btn").click(function (e) {
    e.preventDefault();
    //  console.log('working');
    if (!$('div.popup-bottom.delete1').hasClass('popup-active')) {
      $('div.popup-bottom.delete1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.delete1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.delete1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });



  $(document).on('change', '.toggle-col.dynamic  input[type="checkbox"]', function () {

    if ($(this).prop("checked")) {
      $(this).parents('li').find('.inner2').slideDown()
      //    $('.owl-dots').hide();
      $('.owl-dots').css({ "top": "564px" });
    } else {
      $(this).parents('li').find('.inner2').slideUp()
      //   $('.owl-dots').show();
      $('.owl-dots').css({ "top": "380px" });
    }
  })

  $("div.responsive3 ul.nav.nav-tabs>li.nav-item>a").click(function (e) {
    if ($(this).attr('href') === '#upidetails') {
      console.log('fired')
      $('button.createid-btn').show();
      //   $('div.powered-logo.mt-0').removeClass('mt-0');
    }
    else if ($(this).attr('href') === '#personal') {
      console.log('fired')
      $('button.createid-btn').hide();
      //   $('div.powered-logo').addClass('mt-0');
    }
    else {
      $('button.createid-btn').show();
      // $('div.powered-logo').removeClass('mt-0');
    }
  });

}

function transactionFilter() {

  $('input[name=searchby]').change(function () {
    // console.log('Its working');
    $('#new-upi').hide();
    if ($(this).val() == "all-upi-id") {
      $('#new-upi').hide();
    } else if ($(this).val() == "new-upi-id") {
      $('#new-upi').show();
    } else {
      $('#new-upi').hide();
    }
  });

}

function dashBoardFooterActive() {
  // $("nav.ios-global-nav-custom ul.lst-ios-nav li a").click(function(){
  // 	console.log('its working');
  //    $("nav.ios-global-nav-custom ul.lst-ios-nav li a").removeClass("active");
  // 	if (!$(this).hasClass('active') ) {
  // 		 $(this).addClass('active');
  // 	 } else {
  // 		  $(this).removeClass('active');
  // 	    }
  //  });

  $(function () {
    $('nav.ios-global-nav-custom ul.lst-ios-nav li').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
    });
  })
}

function showQR() {
  $("button.qr-btn").click(function () {
    // console.log('working');
    if (!$('div.popup-bottom.qr-popup').hasClass('popup-active')) {
      $('div.popup-bottom.qr-popup').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.qr-popup').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });


  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.qr-popup').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });
}

function personalDetails() {
  $("a.btn-profile").click(function () {
    // console.log('working');
    if (!$('div.popup-bottom.profile1').hasClass('popup-active')) {
      $('div.popup-bottom.profile1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.profile1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $("a.delete-btn").click(function () {
    // console.log('working');
    // $('div.popup-bottom.profile1').removeClass('popup-active');
    // if ( !$('div.popup-bottom.delete-profile-pic').hasClass('popup-active') ) {
    // 		$('div.popup-bottom.delete-profile-pic').addClass('popup-active');
    // 		$( 'div.ios-nav-overlay' ).fadeIn(400);
    // 	} else {
    // 		$('div.popup-bottom.delete-profile-pic').removeClass('popup-active');
    // 		$( 'div.ios-nav-overlay' ).fadeOut(400);
    //  	}
  });

  $("button.close-btn").click(function () {
    // console.log('working');
    $('div.popup-bottom.profile1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });
}

function toastLiveMessage() {
  $("button.register-btn , button.new-account-btn").click(function () {
    console.log('Yes working');
    showToast('Currently we are Live with UPI Only, Please select UPI icon to register for UPI', 'success', true);
  });
}

function showToast(messageText, messageType, autoDismiss, dismissDuration) {
  if (messageText == "Product Service Error") messageText = "";
  if (typeof messageType === "undefined" || messageType === null)
    messageType = 'error';
  if (typeof autoDismiss === "undefined" || autoDismiss === null)
    autoDismiss = true;
  if (typeof dismissDuration === "undefined" || dismissDuration === null)
    dismissDuration = 5000;

  var messageHTML = '<div class="msg-toast2 msg-' + messageType + '"><em>' + messageText + '</em></div>';
  $('body').append('<div class="toast-messages2"></div>');
  $('div.toast-messages2').html(messageHTML);
  setTimeout(function () {
    $('div.toast-messages2').find('.msg-toast2').addClass('msg-showing');
  }, 300);
  if (autoDismiss) {
    setTimeout(function () {
      $('div.toast-messages2').find('.msg-toast2').removeClass('msg-showing');
    }, dismissDuration);
    setTimeout(function () {
      $('div.toast-messages2').html('');
    }, dismissDuration + 400);
  } else {
    $('div.toast-messages2').find('.msg-toast2').addClass('msg-close');
  }
};

//  Search Contact List Toast

function searchContactList() {

  $(document).on('change', '.toggle-col3.syncContact  input[type="checkbox"]', function () {
    if ($(this).prop("checked")) {
      $('div.popup-bottom.contactSync-popup').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn();
    } else {
      $('div.popup-bottom.contactSync-popup').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut();
    }
  })

  // $("button.cancel-btn").click(function () {
  //   console.log('working');
  //   $('.toggle-col3.syncContact  input[type="checkbox"]').prop("checked", false);
  //   $('div.popup-bottom.contactSync-popup').removeClass('popup-active');
  //   $('div.ios-nav-overlay').fadeOut();
  // });

}
function showToastSearchContactList(messageText, messageType, autoDismiss, dismissDuration) {
  if (messageText == "Product Service Error") messageText = "";
  if (typeof messageType === "undefined" || messageType === null)
    messageType = 'error';
  if (typeof autoDismiss === "undefined" || autoDismiss === null)
    autoDismiss = true;
  if (typeof dismissDuration === "undefined" || dismissDuration === null)
    dismissDuration = 5000;

  var messageHTML = '<div class="msg-toast2 msg-' + messageType + '"><em>' + messageText + '</em></div>';
  $('body').append('<div class="toast-messages2"></div>');
  $('div.toast-messages2').html(messageHTML);
  setTimeout(function () {
    $('div.toast-messages2').find('.msg-toast2').addClass('msg-showing');
  }, 300);
  if (autoDismiss) {
    setTimeout(function () {
      $('div.toast-messages2').find('.msg-toast2').removeClass('msg-showing');
    }, dismissDuration);
    setTimeout(function () {
      $('div.toast-messages2').html('');
    }, dismissDuration + 400);
  } else {
    $('div.toast-messages2').find('.msg-toast2').addClass('msg-close');
  }
};

function searchContactListToast() {
  $("button.Submit-btn").click(function () {
    console.log('Yes working');
    $('div.popup-bottom.contactSync-popup').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut();
    showToastSearchContactList('Sync Completed !', 'success', true);
  });
}

//latest code for my card html page

/************** Wc-cardlist Carousel start **************/
function mycardCarousel() {
  $('div.wc-cardlist').owlCarousel({
    margin: 20,
    nav: true,
    autoplay: false,
    autoWidth: true,
    loop: false,
    rewind: false,
    responsive: {
      0: {
        items: 1,
        nav: false,
        autoWidth: false,
      },
      600: {
        items: 1,
        nav: false,
        autoWidth: false,
      },
      768: {
        items: 2,
        nav: false,
        // loop:false
      },
      1024: {
        items: 2,
        nav: false,
        // loop:false
      },
      1200: {
        items: 2,
        nav: false,
        // loop:false
      },
      1366: {
        items: 2,
        nav: false,
        // loop:false
      },
      1400: {
        items: 2,
        nav: false,
        // loop:false
      },
      1600: {
        items: 3,
        nav: false,
        // loop:false
      }

    }
  });
}
/************** Wc-cardlist Carousel end **************/

/************** box-owl1 start **************/
function boxCarousel2() {
  $('.box-owl1').owlCarousel({
    autoplay: false,
    autoplayTimeout: 3000,
    loop: false,
    autoWidth: true,
    rewind: true,
    nav: true,
    responsive: {
      0: {
        items: 3
      },
      480: {
        items: 3
      },
      640: {
        items: 4
      },
      768: {
        items: 5,
        nav: true,
        // loop:false
      },
      1024: {
        items: 4,
        nav: true,
        // loop:false
      },
      1200: {
        items: 4,
        nav: true,
        // loop:false
      },
      1366: {
        items: 5,
        nav: true,
        // loop:false
      },
      1400: {
        items: 5,
        nav: true,
        // loop:false
      },
      1600: {
        items: 6,
        nav: true,
        // loop:false
      }
    }
  })
}
/************** box-owl1 end **************/


/* -- global notifcation panel */
/* -- Profile panel */
$('body').on('click', '.header-items .lst-header-items li a.item-notification', function (e) {
  if (!$(this).hasClass('noty-active')) {
    $(this).addClass('noty-active');
    $('aside.notification-panel.sticky-panel').addClass('notp-showing');
    $('div.notpanel-overlay').fadeIn();
    $('body').addClass('bgonnf-open');
  }
});

$('body').on('click', 'aside.notification-panel .notp-header a.btn-closenoty, div.notpanel-overlay', function (e) {
  $('.header-items .lst-header-items li a.item-notification').removeClass('noty-active');
  $('aside.notification-panel.sticky-panel').removeClass('notp-showing');
  $('div.notpanel-overlay').fadeOut();
  $('body').removeClass('bgonnf-open');

});







function addPayeAuth() {
  $("button.ux-button.primary.sm-mob").click(function () {
    console.log('Yes working');
    $("#otp-headline").slideDown("slow").css("visibility", "inherit");
    $("div#otp-screen").slideDown("slow").css("display", "block");
  });
  // $("button.ux-button.primary.sm-mob").click(function () {
  //   console.log('Yes working');
  //   $("div#otp-headline").slideDown("slow").css("display","block");
  // });
  // $(document).ready(function(){
  //   $("button.ux-button.primary.sm-mob").click(function(){
  //     $("div#otp-screen").slideUp("slow");
  //   });
  // });
}

function rangeSlider(data) {
  if (data == undefined) return;

  console.log('slider-data' + data);
  var pos_domestic_limit = 0;
  var ecom_domestic_limit = 0;
  var atm_domestic_limit = 0;
  var cont_domestic_limit = 0;
  var pos_international_limit = 0;
  var ecom_international_limit = 0;
  var atm_international_limit = 0;
  var cont_international_limit = 0;
  if (data) {
    console.log(data);
    //console.log(Object.values(data));
    //console.log(data.ECOM_dom_limit);
    if (data.POS_dom_limit) {
      pos_domestic_limit = data.POS_dom_limit;
    }
    if (data.ECOM_dom_limit) {
      ecom_domestic_limit = data.ECOM_dom_limit;
    }
    if (data.ATM_dom_limit) {
      atm_domestic_limit = data.ATM_dom_limit;
    }
    // if(data.POS_dom_limit){
    //   pos_domestic_limit = data.POS_dom_limit;
    // }
    if (data.POS_dom_limit) {
      pos_international_limit = data.POS_int_limit;
    }
    if (data.ECOM_dom_limit) {
      ecom_international_limit = data.ECOM_int_limit;
    }
    if (data.ATM_dom_limit) {
      atm_international_limit = data.ATM_int_limit;
    }
  }

  // Range slider
  $(".limit-slider").slider({
    range: "min",
    value: pos_domestic_limit,
    step: 1,
    min: 0,
    max: data.POS_dom_maxlimit,
    slide: function (event, ui) {
      $("input[name=pos]").val(ui.value);
    }
  });

  $("input[name=pos]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider").slider("value", parseInt(value));
  });

  $(".limit-slider1").slider({
    range: "min",
    value: ecom_domestic_limit,
    step: 1,
    min: 0,
    max: data.ECOM_dom_maxlimit,
    slide: function (event, ui) {
      $("input[name=ecom]").val(ui.value);
    }
  });

  $("input[name=ecom]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider1").slider("value", parseInt(value));
  });

  $(".limit-slider2").slider({
    range: "min",
    value: atm_domestic_limit,
    step: 1,
    min: 0,
    max: data.ATM_dom_maxlimit,
    slide: function (event, ui) {
      $("input[name=atm]").val(ui.value);
    }
  });

  $("input[name=atm]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider2").slider("value", parseInt(value));
  });

  $(".limit-slider3").slider({
    range: "min",
    value: data.CONT_dom_maxlimt,
    step: 1,
    min: 0,
    max: data.CONT_dom_maxlimt,
    slide: function (event, ui) {
      $("input[name=contactLess]").val(ui.value);
    }
  });

  $("input[name=contactLess]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider3").slider("value", parseInt(value));
  });

  //international
  $(".limit-slider-int").slider({
    range: "min",
    value: pos_international_limit,
    step: 1,
    min: 0,
    max: data.POS_int_maxlimit,
    slide: function (event, ui) {
      $("input[name=pos1]").val(ui.value);
    }
  });

  $("input[name=pos1]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider-int").slider("value", parseInt(value));
  });

  $(".limit-slider-int1").slider({
    range: "min",
    value: ecom_international_limit,
    step: 1,
    min: 0,
    max: data.ECOM_int_maxlimit,
    slide: function (event, ui) {
      $("input[name=ecom1]").val(ui.value);
    }
  });

  $("input[name=ecom1]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider-int1").slider("value", parseInt(value));
  });

  $(".limit-slider-int2").slider({
    range: "min",
    value: atm_international_limit,
    step: 1,
    min: 0,
    max: data.ATM_int_maxlimit,
    slide: function (event, ui) {
      $("input[name=atm1]").val(ui.value);
    }
  });

  $("input[name=atm1]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider-int2").slider("value", parseInt(value));
  });

  $(".limit-slider-int3").slider({
    range: "min",
    value: data.CONT_int_maxlimt,
    step: 1,
    min: 0,
    max: data.CONT_int_maxlimt,
    slide: function (event, ui) {
      $("input[name=contactLess1]").val(ui.value);
    }
  });

  $("input[name=contactLess1]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider-int3").slider("value", parseInt(value));
  });
  // end international



  $('body').on('click', '.shortlinks-expander', function (event) {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $(this).prev('.shortlink-control').addClass('show-links');
    } else {
      $(this).removeClass('active');
      $(this).prev('.shortlink-control').removeClass('show-links');
    }
  });
  $('body').on('click', '.mobile-page-list ul li', function (e) {
    console.log('working');
    $('.mobile-page-list ul li').removeClass('active');
    if ($(this).hasClass('active')) {
      $(this).addClass('active');
    } else {
      $(this).addClass('active');
    }
  })



}




function linkAccountConfirmation() {
  $('body').on('click', 'button.confirm-btn1', function () {
    if (!$('div.popup-bottom.confirmation1').hasClass('popup-active')) {
      $('div.popup-bottom.confirmation1').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.confirmation1').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }

  });

  $('body').on('click', 'button.close-btn', function () {
    $('div.popup-bottom.confirmation1').removeClass('popup-active');
    $('div.popup-bottom.opt-verification').removeClass('popup-active');
    $('div.success-acct-link').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });
}

function linkAccountModals() {
  // $('body').on('click', 'button.confirm-btn1', function(){
  //   if (!$('div.popup-bottom.confirmation1').hasClass('popup-active')) {
  //      $('div.popup-bottom.confirmation1').addClass('popup-active');
  //       $('div.ios-nav-overlay').fadeIn(400);
  //    } else {
  //      $('div.popup-bottom.confirmation1').removeClass('popup-active');
  //      $('div.ios-nav-overlay').fadeOut(400);
  //    }

  //    });


  $('body').on('click', 'button.authantication-btn2', function () {
    $('div.popup-bottom.confirmation1').removeClass('popup-active');
    if (!$('div.popup-bottom.opt-verification').hasClass('popup-active')) {
      $('div.popup-bottom.opt-verification').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.opt-verification').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $('body').on('click', 'button.otp-verify-submit', function () {
    $('div.popup-bottom.opt-verification').removeClass('popup-active');
    if (!$('div.popup-bottom.success-acct-link').hasClass('popup-active')) {
      $('div.popup-bottom.success-acct-link').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.success-acct-link').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });


  $('body').on('click', 'button.close-btn', function () {
    $('div.popup-bottom.confirmation1').removeClass('popup-active');
    $('div.popup-bottom.opt-verification').removeClass('popup-active');
    $('div.success-acct-link').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });
}

function delinkAccountModals() {
  $('body').on('click', 'button#selectAcct-submit', function () {
    $('div.popup-bottom.confirmation1').removeClass('popup-active');
    if (!$('div.popup-bottom.opt-verification').hasClass('popup-active')) {
      $('div.popup-bottom.opt-verification').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.opt-verification').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $('body').on('click', 'button.otp-verify-submit', function () {
    $('div.popup-bottom.opt-verification').removeClass('popup-active');
    if (!$('div.popup-bottom.success-acct-link').hasClass('popup-active')) {
      $('div.popup-bottom.success-acct-link').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.success-acct-link').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });


  $('body').on('click', 'button.close-btn', function () {
    $('div.popup-bottom.opt-verification').removeClass('popup-active');
    $('div.success-acct-link').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });
}

function lienEnquiryModal() {
  $('body').on('click', '.flex-container .full-info .ac-info span.link-text a.link-lien', function () {
    $('div.popup-bottom.lien-enquiry').removeClass('popup-active');
    if (!$('div.popup-bottom.lien-enquiry').hasClass('popup-active')) {
      $('div.popup-bottom.lien-enquiry').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.lien-enquiry').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $('body').on('click', 'button.close-btn', function () {
    $('div.popup-bottom.lien-enquiry').removeClass('popup-active');
    // $('div.popup-bottom.lien-enquiry').removeClass('popup-active');
    // $('div.success-acct-link').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });
}


// feedback

// function omniFeedback(){
//   	// star  start
//   $(function() {
//       $("div.star-rating > s").on("click", function(e) {

//       // remove all active classes first, needed if user clicks multiple times
//       $(this).closest('div').find('.active').removeClass('active');

//       $(e.target).parentsUntil("div").addClass('active'); // all elements up from the clicked one excluding self
//       $(e.target).addClass('active');  // the element user has clicked on
//       var numStars = $(e.target).parentsUntil("div").length+1;
//           $('.show-result').text(numStars + (numStars == 1 ? " " : " "));
//           $('#rating').val(numStars + (numStars == 1 ? " " : " "));
//       });
//   });
// }
// star end


$('ul.grid-list1 li div.grid-info2:first-child').click(function (e) {
  e.stopPropagation();
  $(this).parent().siblings().removeClass('active')

  if ($(this).parent().hasClass('active')) {
    $(this).parent().removeClass('active')
  } else {
    $(this).parent().addClass('active')
  }

});

$('ul.grid-list1 li div.grid-info2 button.star-btn').click(function (e) {
  console.log('clicked me!');
  e.stopPropagation();
  // $(this).parent().siblings().removeClass('active')

  if ($(this).hasClass('active')) {
    $(this).removeClass('active')
  } else {
    $(this).addClass('active')
  }

});

// Mobile feedback success alert start
$(document).on('click', 'button.submit-btn1', function () {
  if (!$('div.popup-bottom.confirmation1').hasClass('popup-active')) {
    $('div.popup-bottom.confirmation1').addClass('popup-active');
    $('div.ios-nav-overlay').fadeIn(400);
  } else {
    $('div.popup-bottom.confirmation1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  }
});
$(document).on('click', 'button.close-btn', function () {
  // console.log('working');
  $('div.popup-bottom.confirmation1').removeClass('popup-active');
  $('div.ios-nav-overlay').fadeOut(400);
});
// Mobile feedback success alert end


// desktop feedback success alert start
$(document).ready(function () {

  $(".btn-fb").click(function () {
    if (!$(".feedback-alert").hasClass("success")) {
      $(".feedback-alert").addClass("success");
    }
  })

  $(".alertclose").click(function () {
    $(".feedback-alert").removeClass("success");
  })
});
// desktop feedback success alert End



$('ul.grid-list1 li div.grid-info2:first-child').click(function (e) {
  e.stopPropagation();
  $(this).parent().siblings().removeClass('active')

  if ($(this).parent().hasClass('active')) {
    $(this).parent().removeClass('active')
  } else {
    $(this).parent().addClass('active')
  }

});

$('ul.grid-list1 li div.grid-info2 button.star-btn').click(function (e) {
  console.log('clicked me!');
  e.stopPropagation();
  // $(this).parent().siblings().removeClass('active')

  if ($(this).hasClass('active')) {
    $(this).removeClass('active')
  } else {
    $(this).addClass('active')
  }

});

// Mobile feedback success alert start
$(document).on('click', 'button.submit-btn1', function () {
  if (!$('div.popup-bottom.confirmation1').hasClass('popup-active')) {
    $('div.popup-bottom.confirmation1').addClass('popup-active');
    $('div.ios-nav-overlay').fadeIn(400);
  } else {
    $('div.popup-bottom.confirmation1').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  }
});
$(document).on('click', 'button.close-btn', function () {
  // console.log('working');
  $('div.popup-bottom.confirmation1').removeClass('popup-active');
  $('div.ios-nav-overlay').fadeOut(400);
});
// Mobile feedback success alert end


// desktop feedback success alert start
$(document).ready(function () {

  $(".btn-fb").click(function () {
    if (!$(".feedback-alert").hasClass("success")) {
      $(".feedback-alert").addClass("success");
    }
  })

  $(".alertclose").click(function () {
    $(".feedback-alert").removeClass("success");
  })
});
// desktop feedback success alert End

function dtSample1() {
  var tdTblae = $('table#dt-sample1').dataTable({
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
  $('table#dt-sample1').wrap('<div class="restable-box"></div>');


  var tdTblae = $('table#min-statment').dataTable({
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
  $('table#min-statment').wrap('<div class="restable-box"></div>');




};


dtSample1();

$(document).on('click', ' .advanceSearch', function () {

  $('.advsearch').slideToggle();
  $(this).toggleClass('active');

});

function selectAccountMob() {
  $('body').on('click', 'div.custom-selectbox', function () {
    console.log('its working!')
    if (!$('div.popup-bottom.sel-account').hasClass('popup-active')) {
      $('div.popup-bottom.sel-account').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.sel-account').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $('body').on('click', 'button.close-btn', function () {
    $('div.popup-bottom.sel-account').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });
}

function accountInfoModals() {
  $(document).on('click', '.accinfo-tab li a', function (e) {
    e.preventDefault();
    var href = $(this).attr('href')
    $('.custom-tab').hide();
    $('body').find(href).show();
    $(this).addClass('active')
    $(this).parent().siblings().find('a').removeClass('active')

  });

  $('body').on('click', 'div.custom-selectbox span', function () {
    console.log('its working!')
    if (!$('div.popup-bottom.sel-account').hasClass('popup-active')) {
      $('div.popup-bottom.sel-account').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.sel-account').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  // $('body').on('click', 'div.custom-selectbox2 span', function () {
  //   console.log('its working!')
  //   if (!$('div.popup-bottom.sel-period').hasClass('popup-active')) {
  //     $('div.popup-bottom.sel-period').addClass('popup-active');
  //     $('div.ios-nav-overlay').fadeIn(400);
  //   } else {
  //     $('div.popup-bottom.sel-period').removeClass('popup-active');
  //     $('div.ios-nav-overlay').fadeOut(400);
  //   }
  // });

  // $('body').on('click', 'div.custom-selectbox3 span', function () {
  //   console.log('its working!')
  //   if (!$('div.popup-bottom.sel-count').hasClass('popup-active')) {
  //     $('div.popup-bottom.sel-count').addClass('popup-active');
  //     $('div.ios-nav-overlay').fadeIn(400);
  //   } else {
  //     $('div.popup-bottom.sel-count').removeClass('popup-active');
  //     $('div.ios-nav-overlay').fadeOut(400);
  //   }
  // });


  $('body').on('click', 'a.bal-btn', function () {
    console.log('working!')
    $('div.popup-bottom.interest-popup').removeClass('popup-active');
    if (!$('div.popup-bottom.balance-popup').hasClass('popup-active')) {
      $('div.popup-bottom.balance-popup').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.balance-popup').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  $('body').on('click', 'a.interest-btn', function () {
    console.log('working!')
    $('div.popup-bottom.balance-popup').removeClass('popup-active');
    if (!$('div.popup-bottom.interest-popup').hasClass('popup-active')) {
      $('div.popup-bottom.interest-popup').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.interest-popup').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });

  // $('body').on('click', 'ul.whitelink-list li a.lien-btn', function() {
  //     console.log('working!')
  //     $('div.popup-bottom.lien-enquiry-popup').removeClass('popup-active');
  //     if (!$('div.popup-bottom.lien-enquiry-popup').hasClass('popup-active')) {
  //         $('div.popup-bottom.lien-enquiry-popup').addClass('popup-active');
  //         $('div.ios-nav-overlay').fadeIn(400);
  //     } else {
  //         $('div.popup-bottom.lien-enquiry-popup').removeClass('popup-active');
  //         $('div.ios-nav-overlay').fadeOut(400);
  //     }
  // });

  $('body').on('click', 'ul.line-list li a.lien-btn', function () {
    console.log('working!')
    $('div.popup-bottom.lien-enquiry-popup').removeClass('popup-active');
    if (!$('div.popup-bottom.lien-enquiry-popup').hasClass('popup-active')) {
      $('div.popup-bottom.lien-enquiry-popup').addClass('popup-active');
      $('div.ios-nav-overlay').fadeIn(400);
    } else {
      $('div.popup-bottom.lien-enquiry-popup').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
  });



  $('body').on('click', 'button.close-btn', function () {
    $('div.popup-bottom.sel-account').removeClass('popup-active');
    $('div.popup-bottom.lien-enquiry-popup').removeClass('popup-active');
    $('div.popup-bottom.balance-popup').removeClass('popup-active');
    $('div.popup-bottom.interest-popup').removeClass('popup-active');
    $('div.ios-nav-overlay').fadeOut(400);
  });
}

function myDepositsScript() {
  $('body').on('click', '.grid-list5 li', function (e) {
    console.log('1working');
    var windowSize = $(window).width();
    if (windowSize < 768) {
      $('.grid-list5 li').removeClass('row-selected');
      $(this).toggleClass('row-selected');
    }
  })

  $('body').on('click', '.grid-list6 li', function (e) {
    console.log('2working');
    var windowSize = $(window).width();
    if (windowSize < 768) {
      $('.grid-list6 li').removeClass('row-selected');
      $(this).toggleClass('row-selected');
    }
  })

  $('body').on('click', '.mobile-page-list ul li', function (e) {
    console.log('3working');
    $('.mobile-page-list ul li').removeClass('active');
    if ($(this).hasClass('active')) {
      $(this).addClass('active');
    } else {
      $(this).addClass('active');
    }
  })
}

function debitCardScript(data) {
  if (data == undefined) return;

  console.log('slider-data' + data);
  var pos_domestic_limit = 0;
  var ecom_domestic_limit = 0;
  var atm_domestic_limit = 0;
  var cont_domestic_limit = 0;
  var pos_international_limit = 0;
  var ecom_international_limit = 0;
  var atm_international_limit = 0;
  var cont_international_limit = 0;
  if (data) {
    console.log(data);
    //console.log(Object.values(data));
    //console.log(data.ECOM_dom_limit);
    if (data.POS_dom_limit) {
      pos_domestic_limit = data.POS_dom_limit;
    }
    if (data.ECOM_dom_limit) {
      ecom_domestic_limit = data.ECOM_dom_limit;
    }
    if (data.ATM_dom_limit) {
      atm_domestic_limit = data.ATM_dom_limit;
    }
    // if(data.POS_dom_limit){
    //   pos_domestic_limit = data.POS_dom_limit;
    // }
    if (data.POS_dom_limit) {
      pos_international_limit = data.POS_int_limit;
    }
    if (data.ECOM_dom_limit) {
      ecom_international_limit = data.ECOM_int_limit;
    }
    if (data.ATM_dom_limit) {
      atm_international_limit = data.ATM_int_limit;
    }
  }

  // Range slider
  $(".limit-slider").slider({
    range: "min",
    value: pos_domestic_limit,
    step: 1,
    min: 0,
    max: data.POS_dom_maxlimit,
    slide: function (event, ui) {
      $("input[name=pos]").val(ui.value);
    }
  });

  $("input[name=pos]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider").slider("value", parseInt(value));
  });

  $(".limit-slider1").slider({
    range: "min",
    value: ecom_domestic_limit,
    step: 1,
    min: 0,
    max: data.ECOM_dom_maxlimit,
    slide: function (event, ui) {
      $("input[name=ecom]").val(ui.value);
    }
  });

  $("input[name=ecom]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider1").slider("value", parseInt(value));
  });

  $(".limit-slider2").slider({
    range: "min",
    value: atm_domestic_limit,
    step: 1,
    min: 0,
    max: data.ATM_dom_maxlimit,
    slide: function (event, ui) {
      $("input[name=atm]").val(ui.value);
    }
  });

  $("input[name=atm]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider2").slider("value", parseInt(value));
  });

  $(".limit-slider3").slider({
    range: "min",
    value: data.CONT_dom_maxlimt,
    step: 1,
    min: 0,
    max: data.CONT_dom_maxlimt,
    slide: function (event, ui) {
      $("input[name=contactLess]").val(ui.value);
    }
  });

  $("input[name=contactLess]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider3").slider("value", parseInt(value));
  });

  //international
  $(".limit-slider-int").slider({
    range: "min",
    value: pos_international_limit,
    step: 1,
    min: 0,
    max: data.POS_int_maxlimit,
    slide: function (event, ui) {
      $("input[name=pos1]").val(ui.value);
    }
  });

  $("input[name=pos1]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider-int").slider("value", parseInt(value));
  });

  $(".limit-slider-int1").slider({
    range: "min",
    value: ecom_international_limit,
    step: 1,
    min: 0,
    max: data.ECOM_int_maxlimit,
    slide: function (event, ui) {
      $("input[name=ecom1]").val(ui.value);
    }
  });

  $("input[name=ecom1]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider-int1").slider("value", parseInt(value));
  });

  $(".limit-slider-int2").slider({
    range: "min",
    value: atm_international_limit,
    step: 1,
    min: 0,
    max: data.ATM_int_maxlimit,
    slide: function (event, ui) {
      $("input[name=atm1]").val(ui.value);
    }
  });

  $("input[name=atm1]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider-int2").slider("value", parseInt(value));
  });

  $(".limit-slider-int3").slider({
    range: "min",
    value: data.CONT_int_maxlimt,
    step: 1,
    min: 0,
    max: data.CONT_int_maxlimt,
    slide: function (event, ui) {
      $("input[name=contactLess1]").val(ui.value);
    }
  });

  $("input[name=contactLess1]").keyup(function () {
    // var value = this.value.substring(1);
    var value = this.value;
    console.log(value);
    $(".limit-slider-int3").slider("value", parseInt(value));
  });
  // end international



  $('body').on('click', '.shortlinks-expander', function (event) {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $(this).prev('.shortlink-control').addClass('show-links');
    } else {
      $(this).removeClass('active');
      $(this).prev('.shortlink-control').removeClass('show-links');
    }
  });
  $('body').on('click', '.mobile-page-list ul li', function (e) {
    console.log('working');
    $('.mobile-page-list ul li').removeClass('active');
    if ($(this).hasClass('active')) {
      $(this).addClass('active');
    } else {
      $(this).addClass('active');
    }
  })

  // $('div.show-btn button.refresh-btn').click(function(e) {
  //     console.log('clicked me!');
  //     e.preventDefault();
  //     e.stopPropagation();
  //     // $(this).parent().siblings().removeClass('active')

  //     if($(this).hasClass('active')){
  //         $(this).removeClass('active')
  //     }else{
  //         $(this).addClass('active')
  //     }

  // });
}

function sssCarousel() {
  console.log('carousel');
  $('.social-sec-scheme-owl').owlCarousel({
    autoplay: true,
    autoplayTimeout: 6000,
    loop: true,
    rewind: true,
    nav: false,
    responsive: {
      0: {
        items: 1
      }
    }
  })
}

function emiCalculatorScript() {
  $(".loan-amount").slider({
    range: "min",
    value: 2000000,
    step: 1,
    min: 0,
    max: 5000000,
    slide: function (event, ui) {
      $("input[name=loan-amt]").val('₹' + ui.value);
    }
  });

  $("input[name=loan-amt]").keyup(function () {
    var value = this.value.substring(1);
    console.log(value);
    $(".loan-amount").slider("value", parseInt(value));
  });

  $(".interest-rate").slider({
    range: "min",
    value: 7.5,
    step: 1,
    min: 0,
    max: 20,
    slide: function (event, ui) {
      $("input[name=int-rate]").val('%' + ui.value);
    }
  });

  $("input[name=int-rate]").keyup(function () {
    var value = this.value.substring(1);
    console.log(value);
    $(".interest-rate").slider("value", parseInt(value));
  });

  $(".loan-tenure").slider({
    range: "min",
    value: 20,
    step: 1,
    min: 0,
    max: 30,
    slide: function (event, ui) {
      $("input[name=loan-tenure]").val(ui.value);
    }
  });

  $("input[name=loan-tenure]").keyup(function () {
    var value = this.value.substring(1);
    console.log(value);
    $(".loan-tenure").slider("value", parseInt(value));
  });
}

function loanListScript() {
  $('body').on('click', '.homeloan-list li', function (e) {
    var windowSize = $(window).width();
    if (windowSize < 768) {
      $('.homeloan-list li').removeClass('row-selected');
      $(this).toggleClass('row-selected');
    }
  })
}

$(document).on('click', '.locate-us .branch-searchresult .branch-lst ul li', function () {

  $(this).siblings().removeClass('active')
  $(this).addClass('active');
})


/* Below code is to disable cut copy paste in PSB Retail portal */
// $('body').bind('cut copy paste', function (e) {
//   e.preventDefault();
// });
// side menu show hide end

function showToast(messageText, messageType, autoDismiss, dismissDuration) {
  if (messageText == "Product Service Error") messageText = "";
  if (typeof messageType === "undefined" || messageType === null)
    messageType = 'error';
  if (typeof autoDismiss === "undefined" || autoDismiss === null)
    autoDismiss = true;
  if (typeof dismissDuration === "undefined" || dismissDuration === null)
    dismissDuration = 5000;

  var messageHTML = '<div class="msg-toast msg-' + messageType + '">  <em>' + messageText + '</em> </div>';
  $('body').append('<div class="toast-messages3"></div>');
  $('div.toast-messages3').html(messageHTML);
  setTimeout(function () {
    $('div.toast-messages3').find('.msg-toast').addClass('msg-showing');
  }, 300);
  if (autoDismiss) {
    setTimeout(function () {
      $('div.toast-messages3').find('.msg-toast').removeClass('msg-showing');
    }, dismissDuration);
    setTimeout(function () {
      $('div.toast-messages3').html('');
    }, dismissDuration + 400);
  } else {
    $('div.toast-messages3').find('.msg-toast').addClass('msg-close');
  }
};

// nli

function imgCarousel() {
  $('.img-owl').owlCarousel({
    autoplay: true,
    autoplayTimeout: 4000,
    loop: false,
    rewind: true,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      768: {
        items: 2,
        nav: false,
        // loop:false
      },
      1024: {
        items: 2,
        nav: false,
        // loop:false
      },
      1200: {
        items: 2,
        nav: false,
        // loop:false
      },
      1366: {
        items: 3,
        nav: false,
        // loop:false
      },
      1400: {
        items: 3,
        nav: false,
        // loop:false
      },
      1600: {
        items: 3,
        nav: false,
        // loop:false
      }
    }
  })
}

function slideCarousel() {
  $('.slide-owl').owlCarousel({
    autoplay: true,
    autoplayTimeout: 6000,
    loop: true,
    rewind: true,
    nav: false,
    responsive: {
      0: {
        items: 1
      }
    }
  })
}

function InitVPAUI() {
  $('input[name=payee-type]').change(function () {
    // console.log('Its working');
    if ($(this).val() == "registered-payee") {
      $('#registered').show();
      $('#non-registered').hide();
    } else if ($(this).val() == "non-registered-payee") {
      $('#non-registered').show();
      $('#registered').hide();
    } else {
      $('#registered').show();
      $('#non-registered').hide();
    }
  });

  $('button.verify').attr('disabled', true);
  $('button.verify').addClass('disable');

  // $("input[name='upiId']").on('keyup', function() {
  //     if ($(this).val() != '') {
  //         $('#payee-type-info').hide();
  //         $('#payee-info').show();
  //         $('#btn-section').show();
  //         $('#upi-id-details').show();
  //     } else {
  //         $('#payee-type-info').show();
  //         $('#payee-info').hide();
  //         $('#btn-section').hide();
  //         $('#upi-id-details').hide();
  //     }
  // });


  $('body').on('click', 'div.send-input .placeholder , div.send-input .sendDisplay1 ', function (e) {
    var windowSize = $(window).width();
    if (windowSize >= 768) {
      $(this).parent().find('ul').slideToggle();
    }
  });

  $('body').on('click', 'div#upiInput .placeholder , div#upiInput .sendDisplay1 ', function (e) {
    var windowSize = $(window).width();
    if (windowSize >= 768) {
      $(this).parent().find('ul').slideDown();
    }
  });


  $('body').on('click', 'div.send-input ul li ', function (e) {

    if (!$(this).hasClass('search-payee')) {
      if (!$(this).hasClass('search-input')) {
        var sendername = $(this).find('b span').text();
        var accNo = $(this).find('small').text();
        // $('.sendDisplay').css('display', 'block');
        // $('.placeholder').hide()
        // $('.sendDisplay img').attr('src',imgpath )
        // $('.sendDisplay b').text(sendername + " " + accNo);
        $('.send-input ul').slideUp();
        // $('#payee-type-info').hide();
        $('#payee-info').show();
        $('#btn-section').show();
        $('#upi-id-details').show();
        // $('#upiInput .sendDisplay b').text(accNo);
      }

    }
  });


  $('body').on('click', 'div#upiInput ul li ', function (e) {
    if (!$(this).hasClass('search-payee')) {
      if (!$(this).hasClass('search-input')) {
        var sendername = $(this).find('b span').text();
        var accNo = $(this).find('small').text();
        $('.sendDisplay').css('display', 'block');
        // $('.placeholder').hide()
        // $('.sendDisplay img').attr('src',imgpath )
        $('#upiInput .sendDisplay b').text(sendername);
        $('.upiInput ul').slideUp();
      }

    }
  });

  $('body').on('click', '.ux-selection2 input[type=radio]', function () {
    console.log('checked!');
    if ($(this).attr("checked") !== "checked") {
      $(this).attr("checked", "checked");
      $(this).parents().siblings().find('.ux-selection2 input[type=radio]').removeAttr("checked", "");

      $(this).parents().eq(2).addClass('active');
      $(this).parents().siblings().removeClass('active');
    }
  });

  if ($(window).width() < 768) {
    $('body').on('click', 'div#upiInput', function () {
      console.log('its working!')
      if (!$('div.popup-bottom.sel-account').hasClass('popup-active')) {
        $('div.popup-bottom.sel-account').addClass('popup-active');
        $('div.ios-nav-overlay').fadeIn(400);
      } else {
        $('div.popup-bottom.sel-account').removeClass('popup-active');
        $('div.ios-nav-overlay').fadeOut(400);
      }
    });

    $('body').on('click', 'button.close-btn', function () {
      $('div.popup-bottom.sel-account').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    });

    $("button.submit-btn2").click(function () {
      // console.log('working');
      $('div.popup-bottom.sel-account').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    });
  }



}


