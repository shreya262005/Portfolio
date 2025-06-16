var doc = jQuery(document);

doc.ready(function () {
  "use strict";

  $(window).scrollTop(0);

  var typed = new Typed(".mytext", {
    strings: ["Alex Doe", "Web Developer", "Graphics Designer"],
    smartBackspace: true, // Default value
    loop: true,
    backDelay: 700,
    typeSpeed: 50,
  });

  //nav bar
  $('.navbar-nav').onePageNav({
    currentClass: 'active',
  });


  if ($(window).scrollTop() < 200) {
    $(".navbar-nav").addClass("navbar-nav-bg");
  }
  $(window).scroll(function () {
    var top = $(window).scrollTop();

    if (top >= 200) {
      $("header").addClass("overlay");
      $(".navbar-nav").removeClass("navbar-nav-bg");
    } else if ($("header").hasClass("overlay")) {
      $("header").removeClass("overlay");
    } else {
      $(".navbar-nav").addClass("navbar-nav-bg");
    }
  });

  //education skill experience

  $('.progress-content .skill-progress').each(function () {
    var waypoint = new Waypoint({
      element: this,
      handler: function (direction) {
        var value = $(this.element).attr('data-progress');
        $(this.element).css('width', '' + value + '%');
      },
      offset: '70%'
    })
  });

  //portfolio

  var $grid = $('.portfolio-container').isotope({
    // options
    itemSelector: '.portfolio-item'
  });


  $('.filter li').on('click', function () {

    $('.filter li').removeClass('filter-active');
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
    $(this).addClass('filter-active');
  });

  //Testimonials
  $(".testimonial-container").owlCarousel({

    items: 1,
    autoplay: true,
    rewind: true

  });

});
