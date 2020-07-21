/*

使い方例 :

※例：ページャーある時

<ul class="news-list">
    <li class="item"><a data-href="#news">すべて</a></li>
</ul>

<div id="news">
    <ul class="news-list">
        <li>hogehoge</li>
    </ul>
    <div class="page">
        ページャーのURLの後ろに 該当の id名　+ tab をつける
        <a href="{% CURRENT_PAGER_URL %}#newstab">
    </div>
</div>

$('.news-list')tab({ 'pager' : true });

*/


(function($) {
  $.fn.tab = function(params) {

    var defs = {
      position: 0,
      pager: false,
      pcMinWidth: 769,
      tbMaxWidth: 768,
      spMaxWidth: 480,
      pcHeaderFixed: 0,
      tbHeaderFixed: 0,
      spHeaderFixed: 0
    };
    var config = $.extend({}, defs, params);
    var tab_link = this;
    var params_positon = config.position;
    var tabHash = location.hash;

    //pc tb sp
    if(window.matchMedia( "(min-width: "+config.pcMinWidth+"px)" ).matches) {
      var headerFixed = config.pcHeaderFixed;
    } else if(window.matchMedia( "(max-width: "+config.tbMaxWidth+"px)" ).matches) {
      var headerFixed = config.tbHeaderFixed;
    } else if(window.matchMedia( "(max-width: "+config.spMaxWidth+"px)" ).matches) {
      var headerFixed = config.spHeaderFixed;
    }

    tab_link.find('a').each(function() {
      $(this).css("cursor", "pointer");
    });
    tab_link.each(function() {
      $(this).find('a').each(function() {
        $($(this).attr('data-href')).css("display", "none");
        tab_target = $(this).find('a').attr('data-href');
        if (tabHash == $(this).attr('data-href')) {
          $('html, body').hide();
          $(this).closest(tab_link).find('a').each(function() {
            $($(this).attr('data-href')).css("display", "none");
            $(this).removeClass('current');
          });
          $(tabHash).css("display", "block");
          $(this).addClass('current');
          $(window).on("load", function() {
            $('html, body').show().scrollTop(0);
            var position = tab_link.outerHeight(true);
            var offset = tab_link.offset().top;
            params_positon = offset - params_positon - headerFixed
            $('html, body').animate({
              scrollTop: params_positon,
              easing: 'swing'
            });
          });
          return false;
        } else {
          tab_target02 = $(this).closest(tab_link).children().first().find('a').attr('data-href');
          $(tab_target02).css('display', 'block');
          $(this).closest(tab_link).children().first().find('a').addClass('current');
        }
      });
    });

    tab_target = tab_link.find('a');
    tab_target.on("click", function(e) {
      e.preventDefault();
      $(this).closest(tab_link).find('a').each(function() {
        $($(this).attr('data-href')).css("display", "none");
      });
      $($(this).attr('data-href')).css("display", "block");
      $(this).closest(tab_link).find('a').removeClass('current');
      $(this).addClass('current');
    });

    if (config.pager == true) {
      var urlHash = location.hash;
      var target_id = urlHash.slice(0, -3);
      if (urlHash.slice(-3) == 'tab') {
        tab_link.find('a').each(function() {
          var target = $(this).attr('data-href');
          $(this).removeClass('current');
          if (target == target_id) {
            $(this).addClass('current');
          }
          $(target).css('display', 'none');
        });
        $(target_id).css("display", "block");
      }
    }
    return tab_link;
  };
})(jQuery);
