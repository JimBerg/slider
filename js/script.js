/**
 * Name: slide
 * Description: Imageslider with Thumbnails
 * Author: Jay
 * Date: 13.07.2013
 * ---------------------------------------- */

(function() {

         $.fn.slide = function(options) {
        /** set default values **/
        var settings = $.extend({
            'thumbcontainer': '#thumbSlider',
            'imageContainer': '#imageSlider',
            'prevBtn': '.prevThumb',
            'nextBtn': '.nextThumb',
        }, options);
        var thumbs = $(this).find('li');
        var max = thumbs.length - 2;

        /** initialize - reset position of elements **/
        var init = function() {
            thumbs.css({'position': 'absolute'}).each(function(){
                $(this).css({'top': $(this).data('index') * $(this).height() + $(this).height() });
            });
        };

        /** 
        * reset data index according to movement 
        * increment or decrement index 
        * @param int direction: -1 = prev, 1 = next
        **/
        var resetDataIndex = function(direction) {
            var thumbs = $(settings.thumbcontainer).find('li');
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
        };

        var animateElements = function(direction) {
            thumbs.each(function(index, elem){
                $(this).animate({
                    'top':  ($(this).data('index') + 2) * $(this).height() + (direction * $(this).height())
                }, 400, 'linear', function() {});
            });
        };

        /** 
        * show next element 
        * @param elem - list item
        **/
        var nextElem = function(elem) {
            var thumbs = $(settings.thumbcontainer).find('li');
            var last = thumbs.last();
            resetDataIndex(1);
            $(elem).parent().prepend($(last).clone(true));
            $(last).remove();
        };

        /** 
        * show previous element 
        * @param elem - list item
        **/
        var prevElem = function(elem) {
            var first = $(elem).prev().prev();
            resetDataIndex(-1);
            $(elem).parent().append($(first).clone(true));
            $(first).remove();
        };

        /** click handler for each li - move elem up or down **/ 
        thumbs.each(function(index,elem){
            $(elem).bind('click',function(event) {
                var dataindex = $(this).data('index')   
                var imgId = $(this).data('id');
               
                if (dataindex == 1) {
                    //animateElements(-1);
                    prevElem($(this));
                } else if (dataindex == -1) {
                    //animateElements(1);
                    nextElem($(this));
                }
                $(settings.imageContainer).cycle(imgId);      
                event.preventDefault();
            });
        });

        $(settings.nextBtn).bind('click', function (event) {
            var thumbs = $(settings.thumbcontainer).find('li');
            var last = thumbs.last();
            var imgId = $(settings.thumbcontainer).find('li[data-index="-1"]').data('id');
            thumbs.parent().prepend($(last).clone(true));
            $(last).remove();
            resetDataIndex(1);
            $(settings.imageContainer).cycle(imgId);      
            event.preventDefault();
        });

        $(settings.prevBtn).bind('click', function (event) {
            var thumbs = $(settings.thumbcontainer).find('li');
            var first = thumbs.first();
            var imgId = $(settings.thumbcontainer).find('li[data-index="1"]').data('id');
            
            resetDataIndex(-1);   
            thumbs.parent().append($(first).clone(true));
            first.remove();
            $(settings.imageContainer).cycle(imgId);      
            event.preventDefault();
        });

        //init();
    };
   
    $('#thumb-slider').slide();
})(jQuery);













