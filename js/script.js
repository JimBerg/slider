/**
 * Name: slide
 * Description: Imageslider with Thumbnails
 * Author: Jay
 * Date: 13.07.2013
 * ---------------------------------------- */

(function() {

    $.fn.slide = function(options) {
        var settings = $.extend({
            'thumbcontainer': 'thumb-slider'
        }, options );

        var thumbs = $('#'+settings.thumbcontainer).find('li');
        var max = $(thumbs).length - 2;

        var resetDataIndex = function(direction) {
            var thumbs = $('#'+settings.thumbcontainer).find('li');
            thumbs.each(function() {
                var dataindex = $(this).data('index');
                if(direction == -1) {
                    if(dataindex > -1) {
                        $(this).data('index', dataindex - 1 );
                        $(this).attr({'data-index': dataindex - 1});
                    } else if(dataindex == -1) {
                        $(this).data('index', max);
                        $(this).attr({'data-index': max});
                    }
                } else if(direction == 1) {
                    if(dataindex < max) {
                        $(this).data('index', dataindex + 1 );
                        $(this).attr({'data-index': dataindex + 1});
                    } else if(dataindex == max) {
                        $(this).data('index', -1 );
                        $(this).attr({'data-index': -1});
                    }
                }
            });
        }

        var animateElements = function() {
            var thumbs = $('#'+settings.thumbcontainer).find('li');
            thumbs.each(function(elem) {
                var moveTop = $(this).offset().top - 34 - 80;
                $(this).animate({
                    top: moveTop
                }, 600, 'linear', function(){});
            });
        }

        thumbs.each(function(index){
            $(this).bind('click',function(event) {
                var dataindex = $(this).data('index');
                if (dataindex == 1) {
                    var first = $(this).prev().prev();
                    //animateElements();
                    resetDataIndex(-1);
                    $(this).parent().append($(first).clone(true)).css({'margin-top': 10});
                    $(first).remove();
                } else if (dataindex == -1) {
                    var thumbs = $('#'+settings.thumbcontainer).find('li');
                    var last = thumbs.last();
                    $(this).parent().prepend($(last).clone(true));
                    $(last).remove();
                    resetDataIndex(1);
                } else {
                    return false;
                }
                event.preventDefault();
            });
        });
    };

    $('#thumb-slider').slide();
})(jQuery);













