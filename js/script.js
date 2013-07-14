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
    		'thumbcontainer': 'thumb-slider'
        }, options );

    	var slides = $(this).find('li');
        var thumbs = $('#'+settings.thumbcontainer).find('li');
		var max = $(thumbs).length - 2;

        /*slides.each(function(index){

        });*/

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
       	
       	thumbs.each(function(index){
			$(this).bind('click',function(event) {
				var dataindex = $(this).data('index');
       			if (dataindex == 1) {
       				var first = $(this).prev().prev();
       				resetDataIndex(-1);	
					$(this).parent().append($(first).clone(true));
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

	$('#full-slider').slide();
})(jQuery);













