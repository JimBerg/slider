var settings = $.extend({
            'thumbcontainer': '#thumbSlider',
            'imageContainer': '#imageSlider',
            'prevBtn': '.prevThumb',
            'nextBtn': '.nextThumb',
        }, options);
        var $container = $(this);
        var thumbs = $(this).find('li');
        var max = thumbs.length - 2;
        var thumbsHeight = thumbs.first().height();

        /** initialize - reset position of elements **/
        var init = function() {
            $container.css({ 'position': 'absolute', 'top': thumbsHeight * - 1 });
            thumbs.css('height', thumbsHeight);

            $(settings.prevBtn).bind('click', function(e) {
                getPrev();

                e.preventDefault();
            });

            $(settings.nextBtn).bind('click', function(e) {
                getNext();

                e.preventDefault();
            });

            thumbs.bind('click', function(e) {
                var index = parseInt($(this).attr('data-index'));

                if(index < 0) {
                    getPrev();
                } else if(index > 0) {
                    getNext();
                }
            });

            thumbs.last().prependTo($container);
            thumbs = $container.find('li');
            thumbs.last().clone(true).prependTo($container);
            
            setIndexes();

            /*
            thumbs.css({'position': 'absolute'}).each(function(){
                $(this).css({'top': $(this).data('index') * $(this).height() + $(this).height() });
            });
            */
        };

        var setIndexes = function() {
            $container.css('top', thumbsHeight * -1);

            thumbs = $container.find('li');
            thumbs.each(function(i) {
                $(this).attr('data-index', i-2);
            });
        };

        var getPrev = function() {
            $(settings.imageContainer).cycle(parseInt(thumbs.filter('[data-index="-1"]').attr('data-id')));

            $container.stop(true, true).animate({
                top: 0
            }, 400, function() {
                thumbs.last().remove();
                thumbs = $container.find('li');
                thumbs.last().clone(true).prependTo($container);
                setIndexes();
            });
        };

        var getNext = function() {
            $(settings.imageContainer).cycle(parseInt(thumbs.filter('[data-index="1"]').attr('data-id')));
            $container.stop(true, true).animate({
                top: thumbsHeight * -2   
            }, 400, function() {
                thumbs.first().remove();
                thumbs = $container.find('li');
                thumbs.first().clone(true).appendTo($container);
                setIndexes();
            });
        };
