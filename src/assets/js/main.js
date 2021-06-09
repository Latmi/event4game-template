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
  //Сворачиваем селект2 при клике вне области
  // отображаем выбранное значение
  $(document).click(function(event) {
    const $target = $(event.target);
    const $select = $('.js-select2');
    if(!$target.closest('.selected').length && $select.hasClass('collapsed')) {
      $('.js-select2').each(function () {
        if ($(this).hasClass('collapsed')) {
          const val = $(this).find('input').val();
          $(this).find('.value').text(val);
        }
      });
      $select.removeClass('collapsed');
    }
  });

  $('#set-program').submit(function (e) {
    e.preventDefault();
    const data = $(this).serializeArray();
    console.log(data);
  });

  const owlTeamBuilding = $('.team-building-carousel');

  let owlTBItemsSlideBy = 4;
  const windowWidth = $(window).width();
  if (windowWidth < 993 && windowWidth >= 769) {
    owlTBItemsSlideBy = 3;
  }
  if (windowWidth < 769 && windowWidth >= 567) {
    owlTBItemsSlideBy = 2;
  }
  if (windowWidth < 567 && windowWidth >= 320) {
    owlTBItemsSlideBy = 1;
  }


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
        items:1.4,
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
    const index = Math.ceil((e.item.index + 1) / owlTBItemsSlideBy);
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
    onDragged: function(e) {
    const count = e.item.count;
    const index = e.item.index;
      if (index + 2 >= count) {
        owlCases.trigger('to.owl.carousel', [index - 1, 300]);
      }
    },

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
    let index = Math.ceil((e.item.index + 1) / owlTBItemsSlideBy);
    const del = e.item.count % count;


    if (del > 0) {
      if (e.item.index + 1 + del === e.item.count) {
        index++;
      }
      if (e.item.index > 0 && index % owlTBItemsSlideBy === 1) {
        index = e.item.index;
      }
    }
    if ($('.workshop-carousel .owl-next').hasClass('disabled')) {
      index = count;
    }

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
    let index = Math.ceil((e.item.index + 1) / owlTBItemsSlideBy);
    const del = e.item.count % count;

    if (del > 0) {
      if (e.item.index + 1 + del === e.item.count) {
        index++;
      }
      if (e.item.index > 0 && index % owlTBItemsSlideBy === 1) {
        index = e.item.index;
      }
    }

    if ($('.exchange-carousel .owl-next').hasClass('disabled')) {
      index = count;
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

  $('.show-filters').on('click', function() {
    $.fancybox.open( $('.show-filters-content'), {

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

  if ($('.graph-animate').length) {

    const $gearTop = $('.graph-animate .top');
    const $gearLeft = $('.graph-animate .left');
    const $gearBottom = $('.graph-animate .bottom');
    const $gearRight = $('.graph-animate .right');
    const $people = $('.graph-animate .people');
    const $arrow = $('.graph-animate .arrow');

    const gearTop = {};
    const gearLeft = {};
    const gearBottom = {};
    const gearRight = {};
    const people = {};
    const arrow = {};
    gearTop.width = $gearTop.width();
    gearLeft.width = $gearLeft.width();
    gearBottom.width = $gearBottom.width();
    gearRight.width = $gearRight.width();
    people.width = $people.width();
    arrow.width = $arrow.width();

    gearTop.css = {top: $gearTop.css('top').replace('px', ''), left: $gearTop.css('left').replace('px', '')};
    gearLeft.css = {top: $gearLeft.css('top').replace('px', ''), left: $gearLeft.css('left').replace('px', '')};
    gearBottom.css = {top: $gearBottom.css('top').replace('px', ''), left: $gearBottom.css('left').replace('px', '')};
    gearRight.css = {top: $gearRight.css('top').replace('px', ''), left: $gearRight.css('left').replace('px', '')};
    people.css = {top: $people.css('top').replace('px', ''), left: $people.css('left').replace('px', '')};
    arrow.css = {top: $arrow.css('top').replace('px', ''), left: $arrow.css('left').replace('px', '')};

    function resizeGraph(arrElements, arrValues, factor) {
      arrElements.forEach(function (el, index) {
        el.width(arrValues[index].width * factor);
        el.css({top: arrValues[index].css.top * factor, left: arrValues[index].css.left * factor});
      });
    }

    const arElements = [$gearTop, $gearLeft, $gearBottom, $gearRight, $people, $arrow];
    const arValues = [gearTop, gearLeft, gearBottom, gearRight, people, arrow];

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

  }

  if ($('.search input').length) {
    const $reset = $('.reset');
    $('.search input').on('keypress, keyup', function() {
      if ($(this).val().length > 0) {
        $reset.show();
      } else {
        $reset.hide();
      }
    });

    $reset.on('click', function () {
      $(this).hide();
    });
  }

  if ($('.js-select2').length) {
    $('.js-select2').each(function () {
      const label = $(this).find('.init').text();
      $(this).find('.value').text(label);
    });
  }

  $('.js-select2').on('click', function () {
    const self = $(this);
    $('.js-select2').each(function () {
      if ($(this) !== self && $(this).hasClass('collapsed')) {
        const label = $(this).find('input').val();
        $(this).find('.value').text(label);
        $(this).removeClass('collapsed');
      }
    });

    const label = $(this).find('.init').text();

    $(this).toggleClass('collapsed');
    if ($(this).hasClass('collapsed')) {
      $(this).find('.value').text(label);
    }
  });

  $('.js-select2 .option').on('click', function () {
    const val = $(this).text();
      $(this).parent().prev().find('.value').text(val);
      $(this).parent().prev().prev().val(val);
  });

  $('.js-select2 .value ').on('click', function () {
    const label = $(this).text();
    $(this).parent().prev().val(label);
  });

  $('.team-card .filter').hover(
    function() {
      $(this).addClass('collapsed');
      $(this).find('.tags').css({display: 'flex'});
      $('.team-card .filter').each(function () {
        if ($(this).hasClass('collapsed')) {
          $(this).parent().find('.region').hide();
        }
      });
    }, function() {
      $(this).removeClass('collapsed');
      $(this).find('.tags').css({display: 'none'});
      $('.team-card .filter').each(function () {
          $(this).parent().find('.region').css({display: ''});
      });
    }
  );

  $('.team-card .region').hover(
    function() {
      $(this).addClass('collapsed');
      $(this).find('.tags').css({display: 'flex'});
      $('.team-card .region').each(function () {
        if ($(this).hasClass('collapsed')) {
          $(this).parent().find('.filter').hide();
        }
      });
    }, function() {
      $(this).removeClass('collapsed');
      $(this).find('.tags').css({display: 'none'});
      $('.team-card .region').each(function () {
        $(this).parent().find('.filter').css({display: ''});
      });
    }
  );








});
