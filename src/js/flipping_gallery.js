!function ($) {

  var defaults = {

    selector: "> a",
    spacing: 70,
    showMaximum: 3,
    enableScroll: false,
    autoplay: false,
  };



  $.fn.flipping_gallery = function (options) {
    var settings = $.extend({}, defaults, options),
      el = $(this),
      total = el.find(settings.selector).length,
      space = 0,
      scale = 0.5 / total,
      opacity = 1 / total,
      start = [],
      lastAnimation = 0,
      quietPeriod = 500;

    window.flipping_gallery_total = total - 1;
    window.flipping_gallery_current = 0;

    $('a', el).each(function () {
      const i = $(this);
      const data = {
        image: i.attr('data-img') ? i.attr('data-img') : '',
        name: i.attr('data-name') ? i.attr('data-name') : ''
      };

      start.push(data);
    });

    if (total = settings.showMaximum) opacity = 1 / settings.showMaximum
    el.addClass("fg-body")


    $.fn.realignCards = function () {
      var el = $(this);
      var content = $(".content")
      $.each(el.find(settings.selector), function (i) {
        if (i == 0) {
          $(this).addClass("active " + settings.flipDirection)
          el.find(".fg-caption").remove()
          content.find(".fg-caption").remove()
          if ($(this).data("caption")) {
            let out = '';
            content.append("<div class='fg-caption' style='opacity: 0;'>" + $(this).attr("data-caption") + "</div>")
            content.find(".fg-caption").append("<div class='fg-info'></div>")
            content.find(".fg-info").append("<div class='fg-name'>" + $(this).attr("data-name") + "</div> <div class='fg-position'>" + $(this).attr("data-position") + "</div>")
            content.find(".fg-caption").append("<div class='fg-description'>" + $(this).attr("data-description") + "</div>")
            content.find(".fg-caption").append("<div class='fg-social'></div>")


            let arrSocial = [];
            let dataSocial = $(this).attr("data-social-links")
            dataSocial = dataSocial ? dataSocial.split(';') : [];
            dataSocial.forEach(function (e, i) {
              let a = e ? e.split('||') : [];
              a.forEach(function (elem) {
                arrSocial.push(elem)
              })
            });


            let k = 0;
            for (let index = 0; index < arrSocial.length / 2; index++) {
              out += `<a class="social-block" href='${arrSocial[k]}'>${arrSocial[k + 1]}</a>`
              k = k + 2;
            }
            content.find(".fg-social").append(out)

            content.find(".fg-caption").css({
              "opacity": "1"
            });
          }
        }

        space = space + settings.spacing
        new_scale = 1 - (scale * i)
        new_opacity = 1 - (opacity * i)
        if (i >= settings.showMaximum) {
          $(this).css("opacity", 0)
        } else {
          $(this).css("opacity", 1)
        }
        $(this).addClass("animate fg-card").css({
          "z-index": 5 - i,
          "margin-left": space + "px",
          "transform": "scale(" + new_scale + ")",
          "opacity": new_opacity
        });
        $(this).click(function () {
          return false;
        });
      });
      el.find("> .fg-card.active").click(function () {
        if (settings.direction == "forward") {
          el.flipForward();
        } else {
          el.flipBackward();
        }

        return false;
      })
    }

    function hiderCards() {
      if (window.flipping_gallery_current == window.flipping_gallery_total) {
        el.addClass('flipping_back_hide');
      } else {
        el.removeClass('flipping_back_hide');
      }

      if (window.flipping_gallery_current == window.flipping_gallery_total - 1) {
        el.addClass('flipping_subback_hide');
      } else {
        el.removeClass('flipping_subback_hide');
      }
    }

    function generateImagesInButton() {
      const current = window.flipping_gallery_current,
        nav = $('#navigation'),
        prev = $('.prev', nav),
        next = $('.next', nav);

      function imgLine(src) {
        line = '<img src="' + src + '">';
        return line;
      }

      $('.btn-img', prev).html('');
      $('.btn-img', next).html('');

      if (current != 0) {
        prev.removeClass('btn-stop');

        let imgSrc = start[current - 1].image;
        if (imgSrc.length != 0) {
          imgSrc = imgLine(imgSrc);
          $('.btn-img', prev).html(imgSrc);
        }

        $('.btn-img', prev).fadeIn(200);

        let name = start[current - 1].name;
        if (imgSrc.name != 0) {
          $('.btn-name', prev).html(name);
        }
        $('.btn-name', prev).fadeIn(200);

      } else {
        $('.btn-img', prev).fadeOut(200);
        $('.btn-name', prev).fadeOut(200);
        prev.addClass('btn-stop');
      }

      if (current >= window.flipping_gallery_total) {
        $('.btn-img', next).fadeOut(200);
        $('.btn-name', next).fadeOut(200);
        next.addClass('btn-stop');
      } else {

        next.removeClass('btn-stop');

        let imgSrc = start[current + 1].image;
        if (imgSrc.length != 0) {
          imgSrc = imgLine(imgSrc);
          $('.btn-img', next).html(imgSrc);
        }

        $('.btn-img', next).fadeIn(200);

        let name = start[current + 1].name;
        if (imgSrc.name != 0) {
          $('.btn-name', next).html(name);
        }
        $('.btn-name', next).fadeIn(200);
      }



    }

    generateImagesInButton();

    function callbackForward() {
      hiderCards();
      generateImagesInButton();
    }

    $.fn.flipForward = function () {

      if (window.flipping_gallery_current == window.flipping_gallery_total) {
        return false;
      } else {
        window.flipping_gallery_current++;
      }

      callbackForward();

      if (!el.hasClass("animating")) {
        el.addClass("animating")
        el.find(".fg-caption").remove();
        var card = el.find("> .fg-card").first();
        card.addClass("fg-flipping").css({
          "opacity": "0",
          "transform": "scale(1.5)"
        });
        card.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
          var save_card = card.removeClass("animate active fg-flipping [class^='fg-count-'] " + settings.flipDirection).clone();
          card.remove();
          el.append(save_card.hide());

          el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
            space = 0;
            el.realignCards()
          });

          el.find("> .fg-card").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
            el.find("> .fg-card").fadeIn()
            el.removeClass("animating")
          });
        });

      }
    }

    $.fn.flipBackward = function () {
      if (window.flipping_gallery_current == 0) {
        return false;
      } else {
        window.flipping_gallery_current--;
      }

      callbackForward();

      if (!el.hasClass("animating")) {
        el.addClass("animating")
        var prev_card = el.find("> .fg-card").last();
        var new_prev_card = prev_card.clone()
        prev_card.remove()
        el.find(".active").removeClass("active " + settings.flipDirection)
        el.prepend(new_prev_card.attr("style", "").css({
          "opacity": "0",
          "z-index": "99"
        }).hide().addClass("active fg-flipping " + settings.flipDirection))
        el.find("> .fg-card.active").addClass("animate").show().removeClass("fg-flipping").css("opacity", "1")
        space = 0;
        el.realignCards();
        el.find("> .fg-card").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {

          el.removeClass("animating")
        });
      }
    }

    el.realignCards();

  }
}(window.jQuery);

