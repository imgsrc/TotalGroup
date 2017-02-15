$(function() {

    //Parallax
    $(".main-head").parallax({imageSrc: './img/bg.jpg'});

    //Replace all SVG images with inline SVG
    $('img.img-svg').each(function () {
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');
            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    //equalheights
    $(".service-item h3").equalHeights();

    //waypoints numeric
    $('.adv-item span').waypoint(function () {
        $({blurRadius: 5}).animate({blurRadius: 0}, {
            duration: 1200,
            easing: 'swing',
            step: function () {
                $(".lines").css({
                    "-webkit-filter": "blur(" + this.blurRadius + "px)",
                    "filter": "blur(" + this.blurRadius + "px)"
                });
            }
        });
        var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
        $(".adv-item span").each(function () {
            var tcount = $(this).data("count");
            $(this).animateNumber({
                    number: tcount,
                    easing: 'easeInQuad',
                    "font-size": "3em",
                    numberStep: comma_separator_number_step
                },
                2000);
        });
        this.destroy();
    }, {
        offset: '90%'
    });

	//Magnific Popup
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Загрузка изображения #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">Изображение #%curr%</a> не может быть загружено.'
        }
    });

    var callBack = $('a[href="#callback"]');
    callBack.magnificPopup({
        mainClass: 'my-mfp-zoom-in',
        removalDelay: 300,
        type: 'inline'
    });
    callBack.on('click', function () {
        var dataForm = $(this).data('form');
        var dataText = $(this).data('text');
        $('.form-callback h4').text(dataText);
        $('.form-callback [name=admin-data]').val(dataForm);
    });

    //OwlCarousel
    var owlPart = $('.carousel-part');
    owlPart.owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        autoplay:true,
        autoplayTimeout:1500,
        autoplayHoverPause:true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            560: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });
    owlPart.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY > 0) {
            owlPart.trigger('prev.owl');
        } else {
            owlPart.trigger('next.owl');
        }
        e.preventDefault();
    });
	
	    //E-mail Ajax Send
    $('form').submit(function () { //Change
        var th = $(this);
        $.ajax({
            type: 'POST',
            url: 'mail.php', //Change
            data: th.serialize()
        }).done(function () {
            $('.form-callback .success').addClass('active');
            setTimeout(function () {
                // Done Functions
                $('.form-callback .success').removeClass('active');
                th.trigger('reset');
                $.magnificPopup.close();
            }, 2000);
        });
        return false;
    });

});
