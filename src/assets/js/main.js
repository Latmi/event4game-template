"use strict";


$(document).ready(function() {
  $('body').autoPadding({
    source: $('.js-header'),
  });
    //removeIf(production)
    console.log("document ready");
    //endRemoveIf(production)
});



$(function () {

  $('.hamburger').on('click', function () {
    $(this).toggleClass('is-active');
    if ($(this).hasClass('is-active')) {
      $('.hide-menu').show();
    } else {
      $('.hide-menu').hide();
    }
  });



  $('.js-select_item').on('click', function () {
    const $select = $(this).closest('.js-select');
    $select.toggleClass('collapsed');
    const $currentSelectValue = $(this).find('.value span');
    const newValue = $currentSelectValue.text();
    const $firstSelectValue =  $select.find('.js-select_item.init').find('.value span');
    const oldValue = $firstSelectValue.text();
    $currentSelectValue.text(oldValue);
    $firstSelectValue.text(newValue);
    $select.prev().val(newValue);
    if (!$select.hasClass('collapsed')) {
      $select.addClass('selected');
      $('button[type=submit]').show();
    } else {
      $('button[type=submit]').hide();
      $select.removeClass('selected');
    }
    $('input[type=radio][name=category]').each(function () {
      if ($(this).is(':checked')) {
        $(this).prop('checked', false);
        $(this).next().css({backgroundColor: 'transparent', borderColor: 'white'});
      }
    });
  });

  $('input[type=radio][name=category]').on('click', function () {
    $('.js-select[data-name=category]').removeClass('selected');
  });


  //Сворачиваем селект при клике вне области
  $(document).click(function(event) {
    const $target = $(event.target);
    const $select = $('.js-select');
    if(!$target.closest('.js-select_item').length && $select.hasClass('collapsed')) {
      $select.removeClass('collapsed');
    }
  });

  $('#set-program').submit(function (e) {
    e.preventDefault();
    const data = $(this).serializeArray();
    console.log(data);
  });

  const owlTeamBuilding = $('.team-building-carousel');

  const owlTBItemsSlideBy = 4;
  owlTeamBuilding.owlCarousel({
    onChanged: makeCounterOwl,
    onInitialized: makeCounterOwl,

    items: 4.5,
    slideBy: owlTBItemsSlideBy,
    merge:true,
    nav:true,
    dots: false,
    margin: 60,
    responsive:{
      320:{
        items:1.4
      },
      567:{
        items:2.5
      },
      769:{
        items:3
      },
      993:{
        items:4.5
      },
      1000:{
        items: 4.5,
      }
    },

  });

  function makeCounterOwl(e) {
    const count = e.item.count / owlTBItemsSlideBy;
    const index = Math.floor(e.item.index / count) + 1;
    if (count > 1) {
      $('.team-building-carousel .owl-dots')
        .removeClass('disabled')
        .css({marginTop: -38})
        .html(`${index} / ${count}`);
    }

  }

  let initialWidthFirstSlider;
  let initialStageHeight;

  function changeActiveSlide(e) {
    const count = e.item.count;
    const index = e.item.index;


    let widthActive = initialWidthFirstSlider;
    let mtDisabled = widthActive * 0.055;
    $('.cases-carousel .owl-item').each(function (i, el) {

      if (i === index) {

        console.log('widthActive changeActiveSlide()', widthActive);
        console.log('el', $(el).width());
        $(this).removeClass('disabled');
        $(this).addClass('current').css({width: widthActive, marginTop: 0});
      } else {
        $(this).removeClass('current');
        $(this).addClass('disabled').css({width: widthActive * 0.9, marginTop: mtDisabled});

      }
    });

    let htmlDots = '';
    let activeClass = '';
    for(let i = 1; i < count - 1; i++ ) {
      if (i === index + 1) {
        activeClass = ' active';
      } else {
        activeClass = '';
      }
      htmlDots += '<div style="width: '+ ((100 / count + 3) - 2) +'%" class="dot-line'+ activeClass +'" data-count="'+ i +'"></div>';
    }

    $('.cases-carousel .owl-dots')
      .removeClass('disabled')
      .html(htmlDots);

    if (index + 3 >= count) {
      $('.cases-carousel .owl-next').hide();
    } else {
      $('.cases-carousel .owl-next').show();
    }
  }



  function setFirstActiveSlide (e) {
    const count = e.item.count;
    const index = e.item.index;



    let htmlDots = '';
    let activeClass = '';
    for(let i = 1; i < count - 1; i++ ) {
      if (i === index + 1) {
        activeClass = ' active';
      } else {
        activeClass = '';
      }
      htmlDots += '<div style="width: '+ ((100 / count + 3) - 2) +'%" class="dot-line'+ activeClass +'" data-count="'+ i +'"></div>';
    }

    $('.cases-carousel .owl-dots')
      .removeClass('disabled')
      .html(htmlDots);

    let widthActive,
      mtDisabled;
    $('.cases-carousel .owl-item').each(function (index, el) {
      if (index === 0) {
        widthActive = $(this).width();
        initialWidthFirstSlider = widthActive * 1.12;
        mtDisabled = widthActive * 0.095;
        initialStageHeight = $('.owl-carousel .owl-stage').height();

        $(this).addClass('current').css({width: widthActive * 1.12});
      } else {
        $(this).addClass('disabled').css({width: widthActive * 0.95, marginTop: mtDisabled});

      }
      // console.log('el', el);
      // console.log('index', index);
    });
  }


  const owlCases = $('.cases-carousel');

  owlCases.owlCarousel({
    onChanged: changeActiveSlide,
    onInitialized: setFirstActiveSlide,

    items: 2.3,
    slideBy: 1,
    merge:true,
    nav:true,
    dots: false,
    margin: 60,
    responsive:{
      320:{
        items:1.2
      },
      567:{
        items:1.4
      },
      769:{
        items:1.8
      },
      993:{
        items: 2.3
      },
      1000:{
        items: 2.3,
      }
    },

  });


  const owlWorkshop = $('.workshop-carousel');

  owlWorkshop.owlCarousel({
    onChanged: makeCounterOwlWorkshop,
    onInitialized: makeCounterOwlWorkshop,

    items: 4.2,
    slideBy: owlTBItemsSlideBy,
    merge:true,
    nav:true,
    dots: false,
    margin: 40,
    responsive:{
      320:{
        items:1.05
      },
      567:{
        items:2.2
      },
      769:{
        items:3
      },
      993:{
        items:4.2
      },
      1000:{
        items: 4.2,
      }
    },

  });

  function makeCounterOwlWorkshop(e) {
    const count = Math.ceil(e.item.count / owlTBItemsSlideBy);
    let index = Math.ceil(e.item.index / count);
    if (index === 0) {
      index = 1;
    }

    console.log(e.item.count);
    console.log(e.item.index);
    console.log('count', e.item.count / owlTBItemsSlideBy);
    console.log('index', (e.item.index / count));
    if (count > 1) {
      $('.workshop-carousel .owl-dots')
        .removeClass('disabled')
        .css({marginTop: -38})
        .html(`${index} / ${count}`);
    }

  }


  const owlExchange = $('.exchange-carousel');

  owlExchange.owlCarousel({
    onChanged: makeCounterOwlExchange,
    onInitialized: makeCounterOwlExchange,

    items: 4.2,
    slideBy: owlTBItemsSlideBy,
    merge:true,
    nav:true,
    dots: false,
    margin: 40,
    responsive:{
      320:{
        items:1
      },
      567:{
        items:2.2
      },
      769:{
        items:3
      },
      993:{
        items:4.2
      },
      1000:{
        items: 4.2,
      }
    },

  });

  function makeCounterOwlExchange(e) {
    const count = Math.ceil(e.item.count / owlTBItemsSlideBy);
    let index = Math.ceil(e.item.index / count);
    if (index === 0) {
      index = 1;
    }

    if (count > 1) {
      $('.exchange-carousel .owl-dots')
        .removeClass('disabled')
        .css({marginTop: -38})
        .html(`${index} / ${count}`);
    }
  }

  $('.trash').on('click', function() {
    $.fancybox.open( $('.trash-content'), {

    });
  });

  if ($('#show_form_feedback_desc')) {
    $('#show_form_feedback_desc').on('click', function() {
      $.fancybox.open({
        src: '.feedback_desc',
        type: 'inline',
        opts : {
          afterShow : function( instance, current ) {
            $('.modal-type').submit(function (e) {
              e.preventDefault();
              console.log($(this));
              $(this).find('input.required').each(function () {
                if ($(this).val().length <= 0) {
                  $(this).addClass('error');
                }
              });
            });
          }
        }
      });
    });
  }
  if ($('#show_form_feedback')) {
    $('#show_form_feedback').on('click', function() {
      $.fancybox.open({
        src: '.feedback',
        type: 'inline',
        opts : {
          afterShow : function( instance, current ) {
            $('.modal-type').submit(function (e) {
              e.preventDefault();
              console.log($(this));
              $(this).find('input.required').each(function () {
                if ($(this).val().length <= 0) {
                  $(this).addClass('error');
                }
              });
            });
          }
        }
      });
    });
  }
  if ($('#show_form_brief')) {
    $('#show_form_brief').on('click', function() {
      $.fancybox.open({
        src: '.feedback_brief',
        type: 'inline',
        opts : {
          afterShow : function( instance, current ) {
            $('.modal-type').submit(function (e) {
              e.preventDefault();
              console.log($(this));
              $(this).find('input.required').each(function () {
                if ($(this).val().length <= 0) {
                  $(this).addClass('error');
                }
              });
            });
          }
        }
      });
    });
  }

  const $gearTop = $('.graph-animate .top');
  const $gearLeft = $('.graph-animate .left');
  const $gearBottom = $('.graph-animate .bottom');
  const $gearRight = $('.graph-animate .right');
  const $people = $('.graph-animate .people');

  const gearTop = {};
  const gearLeft = {};
  const gearBottom = {};
  const gearRight = {};
  gearTop.width = $gearTop.width();
  gearLeft.width = $gearLeft.width();
  gearBottom.width = $gearBottom.width();
  gearRight.width = $gearRight.width();
  const people= $people.width();

  gearTop.css = {top: $gearTop.css('top').replace('px', ''), left: $gearTop.css('left').replace('px', '')};
  gearLeft.css = {top: $gearLeft.css('top').replace('px', ''), left: $gearLeft.css('left').replace('px', '')};
  gearBottom.css = {top: $gearBottom.css('top').replace('px', ''), left: $gearBottom.css('left').replace('px', '')};
  gearRight.css = {top: $gearRight.css('top').replace('px', ''), left: $gearRight.css('left').replace('px', '')};

  function resizeGraph(arrElements, arrValues, factor) {
    $people.width(people * factor);
    arrElements.forEach(function (el, index) {
      el.width(arrValues[index].width * factor);
      el.css({top: arrValues[index].css.top * factor, left: arrValues[index].css.left * factor});
    });
  }

  const arElements = [$gearTop, $gearLeft, $gearBottom, $gearRight];
  const arValues = [gearTop, gearLeft, gearBottom, gearRight];

  const winWidt = $('body').width() + 15;

  if (winWidt => 1440) {
    resizeGraph(arElements, arValues, 1);
  }
  if (winWidt < 1440 && winWidt > 768) {
    resizeGraph(arElements, arValues, 0.7);
  }
  if (winWidt <= 917 && winWidt > 768) {
    resizeGraph(arElements, arValues, 0.5);
  }
  if (winWidt <= 917 && winWidt > 768) {
    resizeGraph(arElements, arValues, 0.5);
  }
  if (winWidt <= 458 && winWidt > 0) {
    resizeGraph(arElements, arValues, 0.8);
  }


  $(window).resize(function () {

    const windowW = $('body').width() + 15;

    if (windowW => 1440) {
      resizeGraph(arElements, arValues, 1);
    }
    if (windowW < 1440 && windowW > 917) {
      resizeGraph(arElements, arValues, 0.7);
    }
    if (windowW <= 917 && windowW > 768) {
      resizeGraph(arElements, arValues, 0.5);
    }
    if (windowW <= 458 && windowW > 0) {
      resizeGraph(arElements, arValues, 0.8);
    }


  });










});
