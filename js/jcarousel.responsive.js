(function($){
    $(function() {
        var jcarousel = $('.jcarousel');
        var orgWidth = jcarousel.find("ul").innerWidth();

        jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var carousel = $(this);
                var width = 0.1 * orgWidth + 1;
                var marginLeft = 0.01 * orgWidth;

                $('.jcarousel').css("width", '96%');
                $('.jcarousel').css("margin-left", '1%');
                carousel.jcarousel('items').css('width', width);
                carousel.jcarousel('items').css('margin-left', marginLeft);
                
                carousel.find("ul").css("width", "20000em");
            })
            .jcarousel({
                wrap: 'circular'
            });

        $('.jcarousel-control-prev')
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .jcarouselControl({
                target: '+=1'
            });
    });
})(jQuery);
