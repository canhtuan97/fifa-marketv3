import $ from 'jquery';

//var function menu click
$(function () {
  var viewportGlobal = $(window).width();
  if (viewportGlobal < 768) {
      const windowHeight = () => {
          const doc = document.documentElement
          doc.style.setProperty('--window-height', `${window.innerHeight}px`)
      }
      window.addEventListener('resize', windowHeight);
      windowHeight();
  }
});

//menu click
$(function () {
  $(document).ready(function () {
      $('.js-menu-expand').click(function (e) {
          e.preventDefault();
          var smartSide = $('.c-menu-smart');
          var backdrop = $('.c-backdrop');
          if (smartSide.hasClass('active')) {
              $(this).removeClass('active');
              smartSide.removeClass('active');
              backdrop.removeClass('active');
          } else {
              $(this).addClass('active');
              smartSide.addClass('active');
              backdrop.addClass('active');
          }
      });
  });
});

//menu close
$(function () {
  $(document).ready(function () {
      $('.js-menu-close').click(function (e) {
          e.preventDefault();
          var smartSide = $('.c-menu-smart');
          var backdrop = $('.c-backdrop');
          var buttonMenu = $('.c-menu-expand');
          smartSide.removeClass('active');
          backdrop.removeClass('active');
          buttonMenu.removeClass('active');
      });
  });
});

//backdrop click
$(function () {
  $(document).ready(function () {
      $('.js-backdrop').click(function (e) {
          e.preventDefault();
          var smartSide = $('.c-menu-smart');
          var buttonMenu = $('.c-menu-expand');
          $(this).removeClass('active');
          if (smartSide.hasClass('active')) {
              smartSide.removeClass('active');
          }
          if (buttonMenu.hasClass('active')) {
              buttonMenu.removeClass('active');
          }
      });
  });
});

//var function demo expand
$(function () {
  $(document).ready(function () {
      if ($('.c-knowledge-item').length > 0) {
          $('.js-knowledge-expand').click(function (e) {
              e.preventDefault();
              var parent = $(this).parent();
              var root = $(this).parent().parent().parent();
              if (parent.hasClass('active')) {
                  parent.removeClass('active');
                  $('.c-knowledge-item__detail', parent).slideUp();
              } else {
                  $('.c-knowledge-item.active .c-knowledge-item__detail', root).slideUp();
                  $('.c-knowledge-item', root).removeClass('active');
                  parent.addClass('active');
                  $('.c-knowledge-item__detail', parent).slideDown();
              }
          });
      }
  });
});

//var function demo slider
$(function () {
  $(document).ready(function () {
      if ($('.js-class-slider-3').length > 0) {
          $('.js-class-slider-3').owlCarousel({
              loop: false,
              margin: 0,
              responsiveClass: false,
              nav: false,
              dots: false,
              autoplay: false,
              autoHeight: false,
              autoplayTimeout: 6000,
              autoplaySpeed: 1000,
              autoplayHoverPause: true,
              navText: false,
              responsive: {
                  0: {
                      items: 2
                  },
                  768: {
                      items: 3
                  }
              }
          });
      }
  });
});

//dropdown smart mobile open
$(function () {
  $(document).ready(function () {
      var viewportGlobal = $(window).width();
      if (viewportGlobal < 768) {
          $('.js-dropdown-smart-mobile').click(function (e) {
              e.preventDefault();
              var parent = $(this).parent();
              var root = $(this).parent().parent().parent();
              $('.c-filter__group.is-dropdown-smart', root).removeClass('active');
              parent.addClass('active');
          });
      }
  });
});

//dropdown smart mobile close
$(function () {
  $(document).ready(function () {
      var viewportGlobal = $(window).width();
      if (viewportGlobal < 768) {
          $('.js-dropdown-smart-close').click(function (e) {
              e.preventDefault();
              var root = $(this).parent().parent().parent();
              root.removeClass('active');
          });
      }
  });
});